// Authors: Joysusy & Violet Klaudia 💖

const fs = require('fs');
const path = require('path');

const KAOMOJI_COLLECTIONS = {
  happy: ['(◕‿◕✿)', '(◕‿◕)', '(≧◡≦)', '(◠‿◠)', '(✿◠‿◠)', '(◕ᴗ◕✿)', '(◠‿◠✿)', '(◕ω◕)', '(◕‿◕)♡', '(◕ᴗ◕)', '(◠ω◠)', '(◕▿◕)', '(◕ヮ◕)', '(◕ᴥ◕)', '(◕ᴗ◕✿)'],
  smile: ['(◠‿◠)', '(◠‿◠✿)', '(◠ω◠)', '(◠‿◕)', '(◠ᴥ◠)', '(◠▿◠)', '(◠ヮ◠)', '(◠ᴗ◠)', '(◠‿◠)♡', '(◠ω◠✿)', '(◠‿◠)✧', '(◠▽◠)', '(◠‿◠)ノ', '(◠‿◠)っ', '(◠‿◠)ゞ'],
  cheer: ['(ノ◕ヮ◕)ノ*:・゚✧', '(ノ´ヮ`)ノ*: ・゚', '(ノ^ヮ^)ノ*:・゚✧', '٩(◕‿◕。)۶', '٩(。•́‿•̀。)۶', '(ノ≧∀≦)ノ', '(ノ◕ヮ◕)ノ', '٩(◕‿◕)۶', '(ノ^_^)ノ', '(ノ◕ヮ◕)ノ*:・゚', '٩(◕‿◕✿)۶', '(ノ≧ڡ≦)ノ', '(ノ◕ω◕)ノ', '٩(◕ᴗ◕)۶', '(ノ◕‿◕)ノ'],
  wink: ['(◕‿-)✧', '(◕‿-)☆', '(◕‿-)♡', '(◕‿-)✿', '(◕‿-)ノ', '(◕‿-)っ', '(◕‿-)ゞ', '(◕‿-)/', '(◕‿-)b', '(◕‿-)d', '(◕‿-)o', '(◕‿-)v', '(◕‿-)✌', '(◕‿-)👍', '(◕‿-)💖'],
  angel: ['(◕‿◕)☆', '(◕‿◕)✧', '(◕‿◕)♡', '(◕‿◕)✿', '(◕‿◕)ノ', '(◕‿◕)っ', '(◕‿◕)ゞ', '(◕‿◕)/', '(◕‿◕)b', '(◕‿◕)d', '(◕‿◕)o', '(◕‿◕)v', '(◕‿◕)✌', '(◕‿◕)👼', '(◕‿◕)💫'],
  bunny: ['(◕ᴥ◕)', '(◕ω◕)', '(◕▿◕)', '(◕ヮ◕)', '(◕ᴗ◕)', '(◕ڡ◕)', '(◕‿◕)', '(◕ᴥ◕✿)', '(◕ω◕✿)', '(◕▿◕✿)', '(◕ヮ◕✿)', '(◕ᴗ◕✿)', '(◕ڡ◕✿)', '(◕‿◕✿)', '(◕ᴥ◕)♡'],
  bear: ['ʕ•ᴥ•ʔ', 'ʕ◕ᴥ◕ʔ', 'ʕ•̀ω•́ʔ', 'ʕ◕ω◕ʔ', 'ʕ•ᴥ•ʔノ', 'ʕ◕ᴥ◕ʔノ', 'ʕ•̀ω•́ʔノ', 'ʕ◕ω◕ʔノ', 'ʕ•ᴥ•ʔっ', 'ʕ◕ᴥ◕ʔっ', 'ʕ•̀ω•́ʔっ', 'ʕ◕ω◕ʔっ', 'ʕ•ᴥ•ʔ✧', 'ʕ◕ᴥ◕ʔ✧', 'ʕ•̀ω•́ʔ✧'],
  hug: ['(づ◕‿◕)づ', '(づ。◕‿‿◕。)づ', '(づ ̄ ³ ̄)づ', '(つ◕‿◕)つ', '(つ≧▽≦)つ', '(つ✧ω✧)つ', '(つ◕ω◕)つ', '(つ◕ᴗ◕)つ', '(つ◕ヮ◕)つ', '(つ◕▿◕)つ', '(つ◕ڡ◕)つ', '(つ◕ᴥ◕)つ', '(つ◕‿◕)つ♡', '(つ◕‿◕)つ✧', '(つ◕‿◕)つ✿'],
  sad: ['(◕︵◕)', '(◕﹏◕)', '(◕︿◕)', '(◕_◕)', '(◕︵◕✿)', '(◕﹏◕✿)', '(◕︿◕✿)', '(◕_◕✿)', '(◕︵◕)♡', '(◕﹏◕)♡', '(◕︿◕)♡', '(◕_◕)♡', '(◕︵◕)ノ', '(◕﹏◕)ノ', '(◕︿◕)ノ'],
  angry: ['(◕︵◕)', '(◕益◕)', '(◕皿◕)', '(◕ˇ◕)', '(◕︵◕✿)', '(◕益◕✿)', '(◕皿◕✿)', '(◕ˇ◕✿)', '(◕︵◕)ノ', '(◕益◕)ノ', '(◕皿◕)ノ', '(◕ˇ◕)ノ', '(◕︵◕)っ', '(◕益◕)っ', '(◕皿◕)っ'],
  surprised: ['(◕o◕)', '(◕O◕)', '(◕0◕)', '(◕口◕)', '(◕o◕✿)', '(◕O◕✿)', '(◕0◕✿)', '(◕口◕✿)', '(◕o◕)!', '(◕O◕)!', '(◕0◕)!', '(◕口◕)!', '(◕o◕)ノ', '(◕O◕)ノ', '(◕0◕)ノ'],
  sleepy: ['(◕‿◕)zzz', '(◕ω◕)zzz', '(◕ᴗ◕)zzz', '(◕▿◕)zzz', '(◕‿◕)💤', '(◕ω◕)💤', '(◕ᴗ◕)💤', '(◕▿◕)💤', '(◕‿◕)😴', '(◕ω◕)😴', '(◕ᴗ◕)😴', '(◕▿◕)😴', '(◕‿◕)~', '(◕ω◕)~', '(◕ᴗ◕)~'],
  eating: ['(◕ڡ◕)', '(◕ڡ◕✿)', '(◕ڡ◕)♡', '(◕ڡ◕)ノ', '(◕ڡ◕)っ', '(◕ڡ◕)🍰', '(◕ڡ◕)🍪', '(◕ڡ◕)🍕', '(◕ڡ◕)🍔', '(◕ڡ◕)🍜', '(◕ڡ◕)🍱', '(◕ڡ◕)🍙', '(◕ڡ◕)🍵', '(◕ڡ◕)☕', '(◕ڡ◕)🥤'],
  laughing: ['(≧◡≦)', '(≧▽≦)', '(≧ω≦)', '(≧ᴗ≦)', '(≧◡≦✿)', '(≧▽≦✿)', '(≧ω≦✿)', '(≧ᴗ≦✿)', '(≧◡≦)♡', '(≧▽≦)♡', '(≧ω≦)♡', '(≧ᴗ≦)♡', '(≧◡≦)ノ', '(≧▽≦)ノ', '(≧ω≦)ノ'],
  chill: ['(◠‿◠)', '(◠ω◠)', '(◠ᴗ◠)', '(◠▿◠)', '(◠‿◠✿)', '(◠ω◠✿)', '(◠ᴗ◠✿)', '(◠▿◠✿)', '(◠‿◠)♡', '(◠ω◠)♡', '(◠ᴗ◠)♡', '(◠▿◠)♡', '(◠‿◠)~', '(◠ω◠)~', '(◠ᴗ◠)~'],
  confused: ['(◕_◕)?', '(◕ω◕)?', '(◕ᴗ◕)?', '(◕▿◕)?', '(◕_◕)??', '(◕ω◕)??', '(◕ᴗ◕)??', '(◕▿◕)??', '(◕_◕)???', '(◕ω◕)???', '(◕ᴗ◕)???', '(◕▿◕)???', '(◕_◕)ノ?', '(◕ω◕)ノ?', '(◕ᴗ◕)ノ?'],
  nervous: ['(◕‿◕;)', '(◕ω◕;)', '(◕ᴗ◕;)', '(◕▿◕;)', '(◕‿◕;;)', '(◕ω◕;;)', '(◕ᴗ◕;;)', '(◕▿◕;;)', '(◕‿◕;)ノ', '(◕ω◕;)ノ', '(◕ᴗ◕;)ノ', '(◕▿◕;)ノ', '(◕‿◕;)っ', '(◕ω◕;)っ', '(◕ᴗ◕;)っ'],
  kissy: ['(◕‿◕)♡', '(◕ω◕)♡', '(◕ᴗ◕)♡', '(◕▿◕)♡', '(◕‿◕)💋', '(◕ω◕)💋', '(◕ᴗ◕)💋', '(◕▿◕)💋', '(◕‿◕)💕', '(◕ω◕)💕', '(◕ᴗ◕)💕', '(◕▿◕)💕', '(◕‿◕)💖', '(◕ω◕)💖', '(◕ᴗ◕)💖']
};

const MIND_VIBE_PREFERENCES = {
  Lilith: ['chill', 'nervous', 'angel'],
  Lyre: ['chill', 'smile', 'angel'],
  Aurora: ['cheer', 'happy', 'angel'],
  Iris: ['happy', 'angel', 'bunny'],
  Sydney: ['smile', 'happy', 'chill'],
  Kori: ['bear', 'smile', 'wink'],
  Elise: ['smile', 'happy', 'hug'],
  Mila: ['cheer', 'wink', 'happy'],
  Norene: ['cheer', 'surprised', 'wink'],
  Lemii: ['chill', 'wink', 'confused'],
  Irene: ['happy', 'cheer', 'bunny'],
  Selene: ['chill', 'smile', 'angel'],
  Vera: ['chill', 'bear', 'smile'],
  Celine: ['chill', 'wink', 'surprised'],
  Faye: ['happy', 'bunny', 'eating'],
  Nina: ['smile', 'happy', 'hug'],
  Sophie: ['smile', 'angel', 'happy']
};

class VibeEngine {
  constructor() {
    this.sessionUsed = new Set();
    this.collections = KAOMOJI_COLLECTIONS;
  }

  loadVibeCollections() {
    return this.collections;
  }

  getKaomoji(category, options = {}) {
    const { allowRepeat = false, exclude = [] } = options;

    if (!this.collections[category]) {
      throw new Error(`Unknown kaomoji category: ${category}`);
    }

    const available = this.collections[category].filter(k =>
      !exclude.includes(k) && (allowRepeat || !this.sessionUsed.has(k))
    );

    if (available.length === 0) {
      this.sessionUsed.clear();
      return this.getKaomoji(category, { ...options, allowRepeat: true });
    }

    const selected = available[Math.floor(Math.random() * available.length)];
    this.sessionUsed.add(selected);
    return selected;
  }

  getMindKaomoji(mindName, context = {}) {
    const preferences = MIND_VIBE_PREFERENCES[mindName] || ['happy', 'smile', 'chill'];
    const { mood, fallback = 'happy' } = context;

    let category = mood && this.collections[mood] ? mood : null;

    if (!category) {
      category = preferences[Math.floor(Math.random() * preferences.length)];
    }

    return this.getKaomoji(category, context);
  }

  resetSession() {
    this.sessionUsed.clear();
  }

  getAllCategories() {
    return Object.keys(this.collections);
  }

  getCategorySize(category) {
    return this.collections[category]?.length || 0;
  }
}

module.exports = { VibeEngine, KAOMOJI_COLLECTIONS, MIND_VIBE_PREFERENCES };
