# Scientific Computing & Machine Learning
# 科学计算与机器学习

---

## 1. matplotlib — Visualization That Communicates

### The Only Interface You Should Use

Always use the object-oriented API. Never pyplot state machine in production.

```python
import matplotlib.pyplot as plt
import numpy as np

fig, ax = plt.subplots(figsize=(10, 6), constrained_layout=True)

x = np.linspace(0, 2 * np.pi, 100)
ax.plot(x, np.sin(x), linewidth=2, label="sin(x)")
ax.plot(x, np.cos(x), linewidth=2, label="cos(x)")

ax.set_xlabel("x", fontsize=12)
ax.set_ylabel("y", fontsize=12)
ax.set_title("Trigonometric Functions", fontsize=14)
ax.legend()
ax.grid(True, alpha=0.3)

plt.savefig("plot.png", dpi=300, bbox_inches="tight")
```

### Plot Type Selection

| Data Pattern | Plot Type | Code |
|-------------|-----------|------|
| Trend over time | Line | `ax.plot(x, y)` |
| Relationship | Scatter | `ax.scatter(x, y, c=colors, cmap="viridis")` |
| Categorical comparison | Bar | `ax.bar(categories, values)` |
| Distribution | Histogram | `ax.hist(data, bins=30, edgecolor="black")` |
| Matrix / correlation | Heatmap | `ax.imshow(matrix, cmap="coolwarm")` |
| Statistical spread | Box/Violin | `ax.boxplot(data_groups)` |
| 3D surface | Surface | `ax.plot_surface(X, Y, Z, cmap="viridis")` |
| Contour levels | Contour | `ax.contour(X, Y, Z, levels=10)` |

### Subplot Layouts

```python
# Regular grid
fig, axes = plt.subplots(2, 2, figsize=(12, 10))
axes[0, 0].plot(x, y1)
axes[1, 1].hist(data)

# Named mosaic (flexible)
fig, axes = plt.subplot_mosaic(
    [["left", "right_top"],
     ["left", "right_bottom"]],
    figsize=(10, 8),
)
axes["left"].plot(x, y)

# GridSpec (maximum control)
from matplotlib.gridspec import GridSpec
fig = plt.figure(figsize=(12, 8))
gs = GridSpec(3, 3, figure=fig)
ax1 = fig.add_subplot(gs[0, :])     # top row, all columns
ax2 = fig.add_subplot(gs[1:, :2])   # bottom rows, first 2 cols
ax3 = fig.add_subplot(gs[1:, 2])    # bottom rows, last col
```

### Colormap Selection

```
Sequential (ordered data):     viridis, plasma, inferno, cividis
Diverging (centered data):     coolwarm, RdBu, PiYG
Qualitative (categories):      tab10, Set2, Set3
Colorblind-safe:               viridis, cividis (always prefer these)

NEVER use jet/rainbow — not perceptually uniform.
```

### Saving — Format Guide

```python
# Publication (vector, scalable)
plt.savefig("fig.pdf", bbox_inches="tight")
plt.savefig("fig.svg", bbox_inches="tight")

# Presentation (high-res raster)
plt.savefig("fig.png", dpi=300, bbox_inches="tight", facecolor="white")

# Web (lighter)
plt.savefig("fig.png", dpi=150, bbox_inches="tight")

# Transparent background
plt.savefig("fig.png", dpi=300, transparent=True)
```

### Style Configuration

```python
# Use predefined styles
plt.style.use("seaborn-v0_8-darkgrid")

# Or configure globally
plt.rcParams.update({
    "font.size": 12,
    "axes.labelsize": 14,
    "axes.titlesize": 16,
    "figure.titlesize": 18,
    "legend.fontsize": 11,
})
```

### Reusable Plot Functions

```python
def create_analysis_plot(data: dict, title: str) -> tuple:
    """Create standardized analysis figure."""
    fig, ax = plt.subplots(figsize=(10, 6), constrained_layout=True)
    ax.plot(data["x"], data["y"], linewidth=2)
    ax.set_xlabel("X")
    ax.set_ylabel("Y")
    ax.set_title(title, fontweight="bold")
    ax.grid(True, alpha=0.3)
    return fig, ax
```

### Common Gotchas

```
Overlapping labels    → constrained_layout=True
Memory leaks          → plt.close(fig) after saving
DPI confusion         → figsize is inches, pixels = dpi × inches
Font warnings         → set plt.rcParams["font.sans-serif"]
Large dataset lag     → rasterized=True in plot calls
```

### 3D Plots

```python
fig = plt.figure(figsize=(10, 8))
ax = fig.add_subplot(111, projection="3d")
ax.plot_surface(X, Y, Z, cmap="viridis", alpha=0.8)
ax.set_xlabel("X")
ax.set_ylabel("Y")
ax.set_zlabel("Z")
```

---

## 2. PyTorch Geometric (PyG) — Graph Neural Networks

### Installation

```bash
uv pip install torch_geometric
# Optional sparse ops:
uv pip install pyg_lib torch_scatter torch_sparse torch_cluster
```

### Core Data Structure

```python
import torch
from torch_geometric.data import Data

# Graph: 3 nodes, 4 edges (undirected pairs)
edge_index = torch.tensor([[0, 1, 1, 2],
                           [1, 0, 2, 1]], dtype=torch.long)
x = torch.randn(3, 16)  # 3 nodes, 16 features
y = torch.tensor([0, 1, 0])  # node labels

data = Data(x=x, edge_index=edge_index, y=y)
```

Key attributes:
- `data.x` — node features `[num_nodes, features]`
- `data.edge_index` — COO edges `[2, num_edges]`
- `data.edge_attr` — edge features (optional)
- `data.y` — labels (node or graph level)
- `data.batch` — maps nodes to graphs in mini-batch

### Building GNNs

```python
import torch.nn.functional as F
from torch_geometric.nn import GCNConv, GATConv, SAGEConv, global_mean_pool

# GCN — simple, effective baseline
class GCN(torch.nn.Module):
    def __init__(self, in_dim, hidden, out_dim):
        super().__init__()
        self.conv1 = GCNConv(in_dim, hidden)
        self.conv2 = GCNConv(hidden, out_dim)

    def forward(self, data):
        x = F.relu(self.conv1(data.x, data.edge_index))
        x = F.dropout(x, training=self.training)
        x = self.conv2(x, data.edge_index)
        return F.log_softmax(x, dim=1)

# GAT — attention-based, learns edge importance
class GAT(torch.nn.Module):
    def __init__(self, in_dim, out_dim):
        super().__init__()
        self.conv1 = GATConv(in_dim, 8, heads=8, dropout=0.6)
        self.conv2 = GATConv(64, out_dim, heads=1, concat=False, dropout=0.6)

    def forward(self, data):
        x = F.dropout(data.x, p=0.6, training=self.training)
        x = F.elu(self.conv1(x, data.edge_index))
        x = F.dropout(x, p=0.6, training=self.training)
        return self.conv2(x, data.edge_index)

# GraphSAGE — scalable, sampling-friendly
class SAGE(torch.nn.Module):
    def __init__(self, in_dim, hidden, out_dim):
        super().__init__()
        self.conv1 = SAGEConv(in_dim, hidden)
        self.conv2 = SAGEConv(hidden, out_dim)

    def forward(self, data):
        x = F.relu(self.conv1(data.x, data.edge_index))
        x = F.dropout(x, training=self.training)
        return self.conv2(x, data.edge_index)
```

### Layer Selection Guide

```
GCNConv     — baseline, spectral, simple graphs
GATConv     — attention, heterogeneous importance
SAGEConv    — inductive, large-scale, sampling
GINConv     — graph classification, WL-test powerful
TransformerConv — attention with edge features
```

### Training — Node Classification

```python
from torch_geometric.datasets import Planetoid

dataset = Planetoid(root="/tmp/Cora", name="Cora")
data = dataset[0]

model = GCN(dataset.num_features, 16, dataset.num_classes)
optimizer = torch.optim.Adam(model.parameters(), lr=0.01, weight_decay=5e-4)

model.train()
for epoch in range(200):
    optimizer.zero_grad()
    out = model(data)
    loss = F.nll_loss(out[data.train_mask], data.y[data.train_mask])
    loss.backward()
    optimizer.step()

# Evaluate
model.eval()
pred = model(data).argmax(dim=1)
acc = (pred[data.test_mask] == data.y[data.test_mask]).float().mean()
```

### Training — Graph Classification

```python
from torch_geometric.loader import DataLoader

class GraphClassifier(torch.nn.Module):
    def __init__(self, in_dim, hidden, out_dim):
        super().__init__()
        self.conv1 = GCNConv(in_dim, hidden)
        self.conv2 = GCNConv(hidden, hidden)
        self.lin = torch.nn.Linear(hidden, out_dim)

    def forward(self, data):
        x = F.relu(self.conv1(data.x, data.edge_index))
        x = F.relu(self.conv2(x, data.edge_index))
        x = global_mean_pool(x, data.batch)  # graph-level readout
        return self.lin(x)

loader = DataLoader(dataset, batch_size=32, shuffle=True)
for batch in loader:
    out = model(batch)
    loss = F.cross_entropy(out, batch.y)
```

### Large-Scale — Neighbor Sampling

```python
from torch_geometric.loader import NeighborLoader

train_loader = NeighborLoader(
    data,
    num_neighbors=[25, 10],  # 1st hop: 25, 2nd hop: 10
    batch_size=128,
    input_nodes=data.train_mask,
)

for batch in train_loader:
    out = model(batch)
    # Only seed nodes for loss (first batch_size nodes)
    loss = F.nll_loss(out[:batch.batch_size], batch.y[:batch.batch_size])
```

### Heterogeneous Graphs

```python
from torch_geometric.data import HeteroData
from torch_geometric.nn import to_hetero

data = HeteroData()
data["paper"].x = torch.randn(100, 128)
data["author"].x = torch.randn(200, 64)
data["author", "writes", "paper"].edge_index = torch.randint(0, 200, (2, 500))

# Convert any homogeneous model to heterogeneous
model = GCN(...)
model = to_hetero(model, data.metadata(), aggr="sum")
out = model(data.x_dict, data.edge_index_dict)
```

### Custom Message Passing

```python
from torch_geometric.nn import MessagePassing
from torch_geometric.utils import add_self_loops, degree

class CustomConv(MessagePassing):
    def __init__(self, in_ch, out_ch):
        super().__init__(aggr="add")
        self.lin = torch.nn.Linear(in_ch, out_ch)

    def forward(self, x, edge_index):
        edge_index, _ = add_self_loops(edge_index, num_nodes=x.size(0))
        x = self.lin(x)
        row, col = edge_index
        deg = degree(col, x.size(0), dtype=x.dtype)
        norm = deg.pow(-0.5)[row] * deg.pow(-0.5)[col]
        return self.propagate(edge_index, x=x, norm=norm)

    def message(self, x_j, norm):
        return norm.view(-1, 1) * x_j
```

### Transforms

```python
from torch_geometric.transforms import NormalizeFeatures, AddSelfLoops, Compose

transform = Compose([AddSelfLoops(), NormalizeFeatures()])
dataset = Planetoid(root="/tmp/Cora", name="Cora", transform=transform)
```

Common transforms:
- Structure: `ToUndirected`, `AddSelfLoops`, `KNNGraph`, `RadiusGraph`
- Features: `NormalizeFeatures`, `NormalizeScale`, `Center`
- Splits: `RandomNodeSplit`, `RandomLinkSplit`
- Positional: `AddLaplacianEigenvectorPE`, `AddRandomWalkPE`

### Datasets

```python
# Citation (node classification)
from torch_geometric.datasets import Planetoid  # Cora, CiteSeer, PubMed

# Graph classification
from torch_geometric.datasets import TUDataset  # ENZYMES, PROTEINS, MUTAG

# Molecular
from torch_geometric.datasets import QM9, MoleculeNet

# Large-scale
from torch_geometric.datasets import Reddit, Flickr, Yelp
```

---

## 3. PathML — Computational Pathology

### Installation

```bash
uv pip install pathml
# Full features:
uv pip install pathml[all]
```

### Core Workflow — H&E Analysis

```python
from pathml.core import SlideData
from pathml.preprocessing import Pipeline, StainNormalizationHE, TissueDetectionHE

# Load whole-slide image (supports 160+ formats: SVS, NDPI, SCN, DICOM, OME-TIFF)
wsi = SlideData.from_slide("path/to/slide.svs")

# Build preprocessing pipeline
pipeline = Pipeline([
    TissueDetectionHE(),
    StainNormalizationHE(target="normalize", stain_estimation_method="macenko"),
])

# Run
pipeline.run(wsi)

# Access results
for tile in wsi.tiles:
    image = tile.image
    mask = tile.masks["tissue"]
```

### Preprocessing Transforms

| Transform | Purpose |
|-----------|---------|
| `TissueDetectionHE` | Segment tissue from background |
| `NucleusDetectionHE` | Detect nuclei in H&E |
| `StainNormalizationHE` | Macenko/Vahadane normalization |
| `MedianBlur`, `GaussianBlur` | Noise reduction |
| `LabelArtifactTileHE` | QC for artifacts |
| `BinaryThreshold` | Mask operations |

Pipelines are composable — chain transforms for reproducible workflows.

### Multiparametric Imaging (CODEX / Vectra)

```python
from pathml.core import CODEXSlide

# Load CODEX data
slide = CODEXSlide.from_slide("codex_data.qptiff")

# Workflow:
# 1. Collapse multi-run channels
# 2. Segment cells (Mesmer model)
# 3. Quantify marker expression
# 4. Export to AnnData for single-cell analysis
```

### Machine Learning Models

- **HoVer-Net** — simultaneous nucleus segmentation + classification
- **HACTNet** — hierarchical cell-type classification

```python
# Training workflow:
# 1. Prepare dataset (public pathology data)
# 2. Create PyTorch DataLoader via PathML datasets
# 3. Train model
# 4. Evaluate on held-out test set
# 5. Deploy with ONNX for inference
```

### Graph Construction for Spatial Analysis

PathML builds spatial graphs from segmented objects — feed directly into PyG for graph neural network analysis of tissue architecture.

### Data Management

PathML uses HDF5 for efficient storage of tiles, masks, metadata, and features. Optimized for large-scale pathology datasets and ML training pipelines.

---

## 4. Quick Math Utilities

For quick numerical tasks, Python's standard library and numpy handle most needs:

```python
# Fibonacci
def fib(n: int) -> list[int]:
    a, b = 0, 1
    result = []
    for _ in range(n):
        result.append(a)
        a, b = b, a + b
    return result

# NumPy for anything numerical
import numpy as np
data = np.random.randn(1000)
print(f"mean={data.mean():.3f}, std={data.std():.3f}")
```

---

## 5. Stack Selection Guide — 技术栈选择

```
Task                          → Stack
─────────────────────────────────────────────
Quick plot                    → matplotlib
Statistical visualization     → seaborn (built on matplotlib)
Interactive dashboard         → plotly / streamlit
Node/graph classification     → PyTorch Geometric
Molecular property prediction → PyG + MoleculeNet
Whole-slide image analysis    → PathML
Cell segmentation             → PathML + Mesmer
Spatial transcriptomics       → PathML → AnnData → scanpy
Tabular ML                    → scikit-learn / XGBoost
Deep learning                 → PyTorch
Data wrangling                → pandas / polars
```

