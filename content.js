/**
 * IPA → English glosses: Wikipedia Help:IPA/English style — bold lead grapheme and
 * the matching letters in the example word (like **th** as in **th**in).
 */

function glossApprox(lead, word, mark, options = {}) {
  return {
    type: "approx",
    lead,
    word,
    mark,
    which: options.which ?? "first",
    suffix: options.suffix ?? ""
  };
}

function glossPlain(text) {
  return { type: "plain", text };
}

/** @type {Record<string, ReturnType<typeof glossApprox> | ReturnType<typeof glossPlain>>} */
const IPA_LOOKUP = {
  // Affricates & tie-bar variants
  t͡ʃ: glossApprox("ch", "chip", "ch"),
  t͜ʃ: glossApprox("ch", "chip", "ch"),
  d͡ʒ: glossApprox("j", "jump", "j"),
  d͜ʒ: glossApprox("j", "jump", "j"),
  tʃ: glossApprox("ch", "chip", "ch"),
  dʒ: glossApprox("j", "jump", "j"),
  ts: glossApprox("ts", "cats", "ts"),
  dz: glossApprox("dz", "ads", "ds"),

  // Diphthongs
  eɪ: glossApprox("ay", "day", "ay"),
  aɪ: glossApprox("i", "price", "i"),
  ɔɪ: glossApprox("oy", "choice", "oi"),
  aʊ: glossApprox("ow", "mouth", "ou"),
  əʊ: glossApprox("o", "goat", "oa"),
  oʊ: glossApprox("o", "goat", "o"),
  ɪə: glossApprox("ear", "near", "ear"),
  ɛə: glossApprox("air", "square", "are"),
  eə: glossApprox("air", "square", "are"),
  ʊə: glossApprox("ure", "cure", "ure"),

  // Vowels + length
  iː: glossApprox("ee", "fleece", "ee"),
  ɑː: glossApprox("ah", "father", "a"),
  ɔː: glossApprox("aw", "thought", "ough"),
  uː: glossApprox("oo", "goose", "oo"),
  ɜː: glossApprox("ur", "nurse", "ur"),
  ɝ: glossApprox("er", "nurse", "ur"),
  ɚ: glossApprox("er", "letter", "er", { which: "last" }),

  // Monophthongs
  i: glossApprox("ee", "happy", "y"),
  ɪ: glossApprox("i", "kit", "i"),
  e: glossApprox("e", "dress", "e"),
  ɛ: glossApprox("e", "dress", "e"),
  æ: glossApprox("a", "trap", "a"),
  ɑ: glossApprox("ah", "lot", "o"),
  ɒ: glossApprox("o", "lot", "o"),
  ʌ: glossApprox("u", "strut", "u"),
  ɔ: glossApprox("o", "thought", "ough", {
    suffix: " (without length; rare alone)"
  }),
  ʊ: glossApprox("oo", "foot", "oo"),
  u: glossApprox("oo", "goose", "oo", {
    suffix: " (short notation; often written uː)"
  }),
  ə: glossApprox("a", "comma", "a", { which: "last" }),

  // Consonants
  p: glossApprox("p", "pin", "p"),
  b: glossApprox("b", "bin", "b"),
  t: glossApprox("t", "tin", "t"),
  d: glossApprox("d", "din", "d"),
  k: glossApprox("k", "skin", "k"),
  ɡ: glossApprox("g", "go", "g"),
  g: glossApprox("g", "go", "g", { suffix: " (ASCII; IPA prefers ɡ)" }),
  f: glossApprox("f", "find", "f"),
  v: glossApprox("v", "voice", "v"),
  θ: glossApprox("th", "thin", "th"),
  ð: glossApprox("th", "this", "th"),
  s: glossApprox("s", "sip", "s"),
  z: glossApprox("z", "zip", "z"),
  ʃ: glossApprox("sh", "ship", "sh"),
  ʒ: glossApprox("s", "vision", "s"),
  h: glossApprox("h", "high", "h"),
  m: glossApprox("m", "map", "m"),
  n: glossApprox("n", "nap", "n"),
  ŋ: glossApprox("ng", "sing", "ng"),
  l: glossApprox("l", "leaf", "l"),
  ɫ: glossApprox("l", "feel", "l", { which: "last" }),
  ɹ: glossApprox("r", "red", "r"),
  r: glossApprox("r", "red", "r", { suffix: " (ASCII shorthand)" }),
  j: glossApprox("y", "yes", "y"),
  w: glossApprox("w", "we", "w"),
  ʍ: glossApprox("wh", "which", "wh"),
  ɾ: glossApprox("tt", "ladder", "dd"),
  ʔ: glossPlain("glottal stop (as in uh-oh; also t glottaling)"),
  ç: glossApprox("h", "huge", "h"),
  x: glossApprox("ch", "loch", "ch"),
  χ: glossApprox("ch", "Bach", "ch"),
  ɦ: glossApprox("h", "ahead", "h"),
  ɬ: glossPlain("voiceless lateral (Welsh ll; rare)"),
  ɮ: glossPlain("voiced lateral fricative (very rare)"),
  β: glossPlain("v as in Spanish labiodental approximant (loan)"),
  ʋ: glossPlain("v/w intermediate (some loans)"),

  // Diacritics & suprasegmentals
  "ː": glossPlain("long (lengthens the preceding vowel)"),
  "ˑ": glossPlain("half-long"),
  "ˈ": glossPlain("primary stress (on following syllable)"),
  "ˌ": glossPlain("secondary stress (on following syllable)"),
  ".": glossPlain("syllable break"),
  "|": glossPlain("minor (foot) break"),
  "‖": glossPlain("major intonation break"),

  // Syllabic consonants
  n̩: glossApprox("n", "button", "n", { which: "last" }),
  l̩: glossApprox("l", "bottle", "l", { which: "last" }),
  m̩: glossPlain("syllabic m (marginal in English keywords)"),
  ŋ̍: glossPlain("syllabic ng (marginal)"),
  ɹ̩: glossApprox("ur", "nurse", "ur"),

  ɐ: glossPlain("vowel like strut or near-open schwa (varies)"),
  ɨ: glossPlain("reduced vowel between fleece and comma (e.g. roses)"),
  ʉ: glossPlain("rounded ɨ (some transcriptions)"),

  "ʰ": glossPlain("aspiration (h-like release after stop)"),
  "ⁿ": glossPlain("nasal release"),
  "ˡ": glossPlain("lateral release")
};

const SORTED_IPA_KEYS = Object.keys(IPA_LOOKUP).sort(
  (a, b) => b.length - a.length
);

function appendGloss(container, gloss) {
  if (gloss.type === "plain") {
    container.textContent = gloss.text;
    return;
  }

  const { lead, word, mark, which, suffix } = gloss;
  const strongOpen = document.createElement("strong");
  strongOpen.className = "ipa-decode-strong";
  strongOpen.textContent = lead;
  container.append(strongOpen, document.createTextNode(" as in "));

  const idx =
    which === "last" ? word.lastIndexOf(mark) : word.indexOf(mark);

  if (mark === "" || idx === -1) {
    container.append(document.createTextNode(word));
  } else {
    const strongWord = document.createElement("strong");
    strongWord.className = "ipa-decode-strong";
    strongWord.textContent = mark;
    container.append(
      document.createTextNode(word.slice(0, idx)),
      strongWord,
      document.createTextNode(word.slice(idx + mark.length))
    );
  }

  if (suffix) {
    container.append(document.createTextNode(suffix));
  }
}

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
        tokens.push({ symbol: key, gloss: IPA_LOOKUP[key] });
        i += key.length;
        matched = true;
        break;
      }
    }

    if (!matched) {
      tokens.push({
        symbol: ch,
        gloss: glossPlain(
          "Unknown or non-IPA symbol — may be punctuation, a different language, or a combined character."
        ),
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
    appendGloss(desc, t.gloss);

    row.append(sym, desc);
    list.append(row);
  }

  const foot = document.createElement("p");
  foot.className = "ipa-decode-footnote";
  foot.textContent =
    "Bold letters match Wikipedia-style keyword highlighting; accents differ (British vs American).";

  body.append(origLabel, original, list, foot);
  panel.append(header, body);
  root.append(backdrop, panel);
  document.documentElement.appendChild(root);

  const margin = 16;
  panel.style.left = `${margin}px`;
  panel.style.top = `${margin}px`;

  closeBtn.addEventListener("click", removeOverlay);

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
