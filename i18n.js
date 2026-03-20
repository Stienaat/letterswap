// ===============================
//  i18n.js — Letterswap Taalmodule
// ===============================

// ---- 1. Translation map ----
const translations = {
  nl: {
    toolbar: {
      newWord: "Nieuw woord",
      newGame: "Nieuw spel",
      showSolution: "Bekijk de oplossing",
      language: "Taal",
      info: "Info"
    },
    time: "Tijd",
    Points: "Score",
    top: "Topscore",
    hints: "Max aantal toegelaten hints is bereikt!",
    language: "Kies een taal.",
    confirmNewGame: "Wil je een nieuw spel?",
    confirmYes: "Ja",
    confirmNo: "Neen",
    defaultMessage: "Hoe speel je dit spel ?  → Klik op info.",
    modalInfoTitle: "Hoe speel je dit spel?",
    modalInfoBody: `• Ieder spel is altijd oplosbaar.<br>
    • Vorm met de letters uit de bovenste rij een woord van 10 letters in de onderste.<br>
    • Klik op een letter en wissel die van plaats.<br>
    • Hou een letter even ingedrukt voor een hint. Die letter wordt dan op de correcte positie gezet.<br>
    • De Joker geeft U een vervangwoord.<br><br>
    - 1 strafpunt per minuut speeltijd.<br>
    - 2 strafpunt per hint.<br>
    - 5 strafpunten per Joker.<br>
    - 10 strafpunten gevraagde "oplossing".<br><br>
    * Reset de topscore door erop te dubbelklikken !<br><br>
    Belangrijk:<br>
    Er worden geen meervouden, verkleinwoorden of vervoegingen gebruikt.`
  },

  en: {
    toolbar: {
      newWord: "New word",
      newGame: "New game",
      showSolution: "Show solution",
      language: "Language",
      info: "Info"
    },
    time: "Time",
    Points: "Pts",
    top: "Top",
    hints: "You have reached the max. hints!",
    language: "Language",
    confirmNewGame: "Do you want a restart?",
    confirmYes: "Yes",
    confirmNo: "No",
    defaultMessage: "How to play?  → Click info.",
    modalInfoTitle: "How to play this game?",
    modalInfoBody: `
    • Every puzzle is always solvable.<br>
    • Form 10 horizontal words of 10 letters.<br>
    • Click two letters to swap them.<br>
    • Green letters are already correct and cannot be moved.<br>
    • Hold a letter briefly to get a hint.<br>
    • That letter becomes an extra green tile.<br><br>
    • 1 penalty point per swap.<br>
    • 10 penalty points per hint.<br><br>
    Important:<br>
    Plural forms, diminutives and verb conjugations are not used.`
  },

  fr: {
    toolbar: {
      newWord: "Nouveau mot",
      newGame: "Nouveau jeu",
      showSolution: "Solution",
      language: "Langue",
      info: "Info"
    },
    time: "Temps",
    Points: "Pts",
    top: "Top",
    hints: "Vous avez atteint le max. d'aides",
    language: "Langue",
    confirmNewGame: "Voulez-vous recommencer?",
    confirmYes: "Oui",
    confirmNo: "Non",
    defaultMessage: "Comment jouer?  →  Cliquez sur info.",
    modalInfoTitle: "Comment jouer ce jeu?",
    modalInfoBody: `• Chaque puzzle est toujours solvable.<br>
    • Formez 10 mots horizontaux de 10 lettres.<br>
    • Cliquez sur deux lettres pour les échanger.<br>
    • Les lettres vertes sont déjà correctes et ne peuvent plus bouger.<br>
    • Maintenez une lettre un instant pour obtenir un indice.<br>
    • Cette lettre devient alors une tuile verte supplémentaire.<br><br>
    • 1 point de pénalité par échange.<br>
    • 10 points de pénalité per indice.<br><br>
    Important:<br>
    Pas de pluriels, diminutifs ou conjugaisons.`
  },

  de: {
    toolbar: {
      newWord: "Neues Wort",
      newGame: "Neues Spiel",
      showSolution: "Lösung",
      language: "Sprache",
      info: "Info"
    },
    time: "Zeit",
    Points: "Pkt",
    top: "Top",
    hints: "Sie haben das Maximum an Hilfe erreicht!",
    language: "Sprache",
    confirmNewGame: "Möchten Sie ein neues Spiel?",
    confirmYes: "Ja",
    confirmNo: "Nein",
    defaultMessage: "Wie spielt man das?  →  Klicken Sie auf Info.",
    modalInfoTitle: "Wie spielt man das?",
    modalInfoBody: `
    • Jedes Puzzle ist immer lösbar.<br>
    • Bilden Sie 10 horizontale Wörter mit 10 Buchstaben.<br>
    • Klicken Sie zwei Buchstaben an, um sie zu tauschen.<br>
    • Grüne Buchstaben sind bereits korrekt und können nicht bewegt werden.<br>
    • Halten Sie einen Buchstaben kurz gedrückt für einen Hinweis.<br>
    • Dieser Buchstabe wird dann ein zusätzliches grünes Feld.<br><br>
    • 1 Strafpunkt pro Tausch.<br>
    • 10 Strafpunkte pro Hinweis.<br><br>
    Wichtig:<br>
    Keine Pluralformen, Verkleinerungen oder Verbformen.`
  }
};


// ---- 2. Normalize language ----
let currentLang = (localStorage.getItem("lang") || "nl").toLowerCase();


// ---- 3. Toolbar translations ----
function applyToolbarTranslations(t) {
  if (!t || !t.toolbar) return;

  document.getElementById("lev1").textContent = t.toolbar.newWord;
  document.getElementById("lev2").textContent = t.toolbar.newGame;
  document.getElementById("lev3").textContent = t.toolbar.showSolution;
  document.getElementById("lev4").textContent = t.toolbar.language;
  document.getElementById("lev5").textContent = t.toolbar.info;
}


// ---- 4. Apply all translations ----
function applyTranslations() {

  const t = translations[currentLang];
  if (!t) return;

  // data-i18n elements
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    const value = t[key];

    if (!value) {
      console.warn(`Missing translation for key '${key}' in '${currentLang}'`);
      return;
    }

    if (el.hasAttribute("data-i18n-html")) {
      el.innerHTML = value;
    } else {
      el.textContent = value;
    }
  });

  // Toolbar
  applyToolbarTranslations(t);

  // Vlag
  const langImg = document.querySelector("#langBtn img");
  if (langImg) langImg.src = `images/${currentLang.toUpperCase()}.png`;

  // Default message
  const msg = document.getElementById("messageText");
  if (msg && msg.textContent.trim() === "") {
    msg.textContent = t.defaultMessage;
  }
}


// ---- 5. Change language ----
function setLanguage(lang) {
  lang = lang.toLowerCase();
  if (!translations[lang]) return;

  currentLang = lang;
  localStorage.setItem("lang", lang);

  applyTranslations();
}


// ---- 6. Initialize ----
document.addEventListener("DOMContentLoaded", applyTranslations);


// ---- 7. Export ----
window.i18n = {
  get currentLang() { return currentLang; },
  translations,
  setLanguage,
  applyTranslations
};
