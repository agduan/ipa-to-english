/**
 * IPA → English glosses aligned with Wikipedia "Help:IPA/English" style examples.
 * Multi-word keys are matched longest-first by the tokenizer.
 */
const IPA_LOOKUP = {
  // Affricates & tie-bar variants (longest first handled by sort; keys here unordered)
  t͡ʃ: "ch as in chip",
  t͜ʃ: "ch as in chip",
  d͡ʒ: "j as in jump",
  d͜ʒ: "j as in jump",
  tʃ: "ch as in chip",
  dʒ: "j as in jump",
  ts: "ts as in cats (often in loans)",
  dz: "dz as in ads (often in loans)",

  // Common English diphthongs
  eɪ: "ay as in face",
  aɪ: "eye as in price",
  ɔɪ: "oy as in choice",
  aʊ: "ow as in mouth",
  əʊ: "oh as in goat (British English)",
  oʊ: "oh as in goat (American English)",
  ɪə: "ear as in near (non-rhotic)",
  ɛə: "air as in square (non-rhotic)",
  eə: "air as in square (non-rhotic)",
  ʊə: "ure as in cure (non-rhotic; often merged)",

  // Vowels with length mark (common combinations)
  iː: "ee as in fleece",
  ɑː: "ah as in palm / father",
  ɔː: "aw as in thought (British)",
  uː: "oo as in goose",
  ɜː: "ur as in nurse",
  ɝ: "er as in nurse (American, r-colored)",
  ɚ: "er as in letter (American, unstressed r-colored)",

  // Monophthongs (lexical set style glosses)
  i: "ee as in happy (unstressed / final)",
  ɪ: "i as in kit",
  e: "e as in dress",
  ɛ: "e as in dress",
  æ: "a as in trap",
  ɑ: "ah as in lot/father (varies by accent)",
  ɒ: "o as in lot (British)",
  ʌ: "u as in strut",
  ɔ: "o as in thought (without length; rare alone)",
  ʊ: "oo as in foot",
  u: "oo as in goose (short notation; often written uː)",
  ə: "a as in comma (schwa)",

  // Consonants
  p: "p as in pin",
  b: "b as in bin",
  t: "t as in tin",
  d: "d as in din",
  k: "k as in skin",
  ɡ: "g as in go",
  g: "g as in go (ASCII; IPA prefers ɡ)",
  f: "f as in find",
  v: "v as in voice",
  θ: "th as in thin",
  ð: "th as in this",
  s: "s as in sip",
  z: "z as in zip",
  ʃ: "sh as in ship",
  ʒ: "s as in vision",
  h: "h as in high",
  m: "m as in map",
  n: "n as in nap",
  ŋ: "ng as in sing",
  l: "l as in leaf",
  ɫ: "dark l as in feel",
  ɹ: "r as in red",
  r: "r as in red (ASCII shorthand)",
  j: "y as in yes",
  w: "w as in we",
  ʍ: "wh as in which (wine–whine merger varies)",
  ɾ: "tt/dd as in AmE ladder (voiced tap)",
  ʔ: "glottal stop (as in uh-oh; also t glottaling)",
  ç: "h as in huge (some pronunciations)",
  x: "ch as in loch (voiceless velar fricative)",
  χ: "ch as in Bach (back fricative, loans)",
  ɦ: "h as in ahead (voiced / breathy h)",
  ɬ: "voiceless lateral (Welsh ll; rare)",
  ɮ: "voiced lateral fricative (very rare)",
  β: "v as in Spanish labiodental approximant (loan)",
  ʋ: "v/w intermediate (some loans)",

  // Diacritics & suprasegmentals (Help:IPA style labels)
  "ː": "long (lengthens the preceding vowel)",
  "ˑ": "half-long",
  "ˈ": "primary stress (on following syllable)",
  "ˌ": "secondary stress (on following syllable)",
  ".": "syllable break",
  "|": "minor (foot) break",
  "‖": "major intonation break",

  // Syllabic consonants
  n̩: "syllabic n as in button (common transcription)",
  l̩: "syllabic l as in bottle",
  m̩: "syllabic m",
  ŋ̍: "syllabic ng (marginal)",
  ɹ̩: "syllabic r (American nurse-style)",

  // Combining / alternate vowel letters sometimes seen
  ɐ: "vowel like strut or near-open schwa (varies)",
  ɨ: "reduced vowel between fleece and comma (e.g. roses)",
  ʉ: "rounded ɨ (some transcriptions)",

  // Breathing / release (rare in learner tables)
  "ʰ": "aspiration (h-like release after stop)",
  "ⁿ": "nasal release",
  "ˡ": "lateral release"
};

const SORTED_IPA_KEYS = Object.keys(IPA_LOOKUP).sort(
  (a, b) => b.length - a.length
);

function stripDelimiters(text) {
  return text
    .replace(/^\s*[\/\[\(]+/, "")
    .replace(/[\/\]\)]+\s*$/, "")
    .trim();
}

function tokenizeIpa(raw) {
  const text = stripDelimiters(raw.normalize("NFC"));
  const tokens = [];
  let i = 0;

  while (i < text.length) {
    const ch = text[i];
    if (/\s/.test(ch)) {
      i += 1;
      continue;
    }

    let matched = false;
    for (const key of SORTED_IPA_KEYS) {
      if (text.startsWith(key, i)) {
        tokens.push({ symbol: key, description: IPA_LOOKUP[key] });
        i += key.length;
        matched = true;
        break;
      }
    }

    if (!matched) {
      const sym = ch;
      tokens.push({
        symbol: sym,
        description:
          "Unknown or non-IPA symbol — may be punctuation, a different language, or a combined character.",
        unknown: true
      });
      i += 1;
    }
  }

  return tokens;
}

let overlayState = null;

function removeOverlay() {
  overlayState?.teardown?.();
  if (overlayState?.root?.parentNode) {
    overlayState.root.parentNode.removeChild(overlayState.root);
  }
  overlayState = null;
}

function showOverlay(ipaText) {
  removeOverlay();

  const tokens = tokenizeIpa(ipaText);

  const root = document.createElement("div");
  root.id = "ipa-decode-root";

  const backdrop = document.createElement("div");
  backdrop.className = "ipa-decode-backdrop";

  const panel = document.createElement("div");
  panel.className = "ipa-decode-panel";
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-label", "IPA decode");

  const header = document.createElement("div");
  header.className = "ipa-decode-header";

  const title = document.createElement("h2");
  title.className = "ipa-decode-title";
  title.textContent = "IPA → English";

  const closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.className = "ipa-decode-close";
  closeBtn.textContent = "Close";

  header.append(title, closeBtn);

  const body = document.createElement("div");
  body.className = "ipa-decode-body";

  const origLabel = document.createElement("div");
  origLabel.className = "ipa-decode-original-label";
  origLabel.textContent = "Selected IPA";

  const original = document.createElement("p");
  original.className = "ipa-decode-original";
  original.textContent = ipaText;

  const list = document.createElement("ul");
  list.className = "ipa-decode-list";

  for (const t of tokens) {
    const row = document.createElement("li");
    row.className = "ipa-decode-row";

    const sym = document.createElement("span");
    sym.className = "ipa-decode-symbol";
    sym.textContent = t.symbol;

    const desc = document.createElement("span");
    desc.className = "ipa-decode-desc";
    if (t.unknown) desc.classList.add("ipa-decode-unknown");
    desc.textContent = t.description;

    row.append(sym, desc);
    list.append(row);
  }

  const foot = document.createElement("p");
  foot.className = "ipa-decode-footnote";
  foot.textContent =
    "Glosses follow Wikipedia “Help:IPA/English”-style keyword examples; accents differ (British vs American).";

  body.append(origLabel, original, list, foot);
  panel.append(header, body);
  root.append(backdrop, panel);
  document.documentElement.appendChild(root);

  // Position panel (default top-right with margin)
  const margin = 16;
  panel.style.left = `${margin}px`;
  panel.style.top = `${margin}px`;

  closeBtn.addEventListener("click", removeOverlay);

  // Drag from header
  let drag = null;
  header.addEventListener("mousedown", (e) => {
    if (e.button !== 0) return;
    const rect = panel.getBoundingClientRect();
    drag = {
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top
    };
    e.preventDefault();
  });

  const onMove = (e) => {
    if (!drag) return;
    const x = e.clientX - drag.offsetX;
    const y = e.clientY - drag.offsetY;
    const maxX = window.innerWidth - panel.offsetWidth - margin;
    const maxY = window.innerHeight - panel.offsetHeight - margin;
    panel.style.left = `${Math.min(Math.max(margin, x), Math.max(margin, maxX))}px`;
    panel.style.top = `${Math.min(Math.max(margin, y), Math.max(margin, maxY))}px`;
  };

  const onUp = () => {
    drag = null;
  };

  const teardown = () => {
    window.removeEventListener("mousemove", onMove);
    window.removeEventListener("mouseup", onUp);
  };

  window.addEventListener("mousemove", onMove);
  window.addEventListener("mouseup", onUp);

  overlayState = { root, teardown };
}

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type === "IPA_DECODE" && typeof message.text === "string") {
    showOverlay(message.text);
    sendResponse?.({ ok: true });
  }
  return undefined;
});
