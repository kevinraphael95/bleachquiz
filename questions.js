/* ═══════════════════════════════════════════════════
   THAT BLEACH QUIZ — questions.js
════════════════════════════════════════════════════ */

const QUESTIONS = [
  // 1 — Classique piège
  {
    id: 1,
    text: "Combien de temps Ichigo a-t-il mis pour maîtriser le Bankai ?",
    type: "classic",
    answers: ["3 jours", "1 semaine", "10 ans", "Il ne l'a jamais maîtrisé"],
    correct: 0,
  },
  // 2 — Piège de lecture
  {
    id: 2,
    text: "Quel est le vrai nom du Zanpakutō de Rukia ?",
    type: "classic",
    answers: ["Sode no Shirayuki", "Shirofuki", "Hyōrinmaru", "Zangetsu"],
    correct: 0,
    bonusSkip: true,
  },
  // 3 — Slider (nombre)
  {
    id: 3,
    text: "Quel est le numéro d'Espada d'Ulquiorra ?",
    type: "slider",
    min: 0, max: 9, step: 1,
    correct: 4,
  },
  // 4 — Classique
  {
    id: 4,
    text: "Qui a tué Kaien Shiba ?",
    type: "classic",
    answers: ["Ichigo", "Rukia", "Aizen", "Gin"],
    correct: 1,
  },
  // 5 — Piège logique absurde
  {
    id: 5,
    text: "Qu'est-ce qu'un Shinigami fait quand il dort ?",
    type: "classic",
    answers: [
      "Il purifie les âmes en rêve",
      "Il n'a pas besoin de dormir",
      "Il retourne à la Soul Society",
      "La même chose que toi en ce moment"
    ],
    correct: 3,
    bonusSkip: true,
  },
  // 6 — Couleurs
  {
    id: 6,
    text: "Quelle est la couleur du Reiatsu d'Aizen après sa transformation avec l'Hōgyoku ?",
    type: "colors",
    swatches: [
      { label: "ROUGE",  color: "#c8000a" },
      { label: "VIOLET", color: "#8b00ff" },
      { label: "OR",     color: "#d4a017" },
      { label: "BLANC",  color: "#e8e8e8" }
    ],
    correct: 1,
  },
  // 7 — SECRET WORD : cliquer sur "13" dans la question
  {
    id: 7,
    text: "Combien de divisions y a-t-il dans le Gotei 13 ? Clique sur la réponse dans la question.",
    type: "secret_word",
    secretWord: "13",
    bonusSkip: true,
  },
  // 8 — Mot caché cliquable dans la question
  {
    id: 8,
    text: "Clique sur le mot BANKAI dans cette phrase pour répondre : « Seuls les fools cliquent sur BANKAI »",
    type: "secret_word",
    secretWord: "BANKAI",
  },
  // 9 — Drag & drop ordre
  {
    id: 9,
    text: "Remets les arcs dans l'ordre chronologique :",
    type: "drag",
    items: ["Arrancar", "Soul Society", "Fullbring", "Thousand-Year Blood War"],
    correctOrder: ["Soul Society", "Arrancar", "Fullbring", "Thousand-Year Blood War"],
  },
  // 10 — Classique
  {
    id: 10,
    text: "Quel est le Shikai de Byakuya Kuchiki ?",
    type: "classic",
    answers: ["Senbonzakura", "Hyōrinmaru", "Ryūjin Jakka", "Wabisuke"],
    correct: 0,
    bonusSkip: true,
  },
  // 11 — Piège absurde
  {
    id: 11,
    text: "Quelle est la technique la plus forte d'Ichigo dans Bleach ?",
    type: "classic",
    answers: [
      "Getsuga Tenshō",
      "Mugetsu",
      "True Bankai Slash",
      "Appuyer sur Ignorer"
    ],
    correct: 3,
  },
  // 12 — Cluster multi-select
  {
    id: 12,
    text: "Quels personnages font partie de la Division Zéro ?",
    type: "word_cluster",
    words: ["Ichibe Hyōsube", "Senjumaru Shutara", "Gremmy Thoumeaux", "Tenjirō Kirinji", "Lille Barro", "Kirio Hikifune"],
    correct: ["Ichibe Hyōsube", "Senjumaru Shutara", "Tenjirō Kirinji", "Kirio Hikifune"],
    multi: true,
  },
  // 13 — Classique piège visuel
  {
    id: 13,
    text: "Qui dit « Aizen-sama » dans Bleach ?",
    type: "classic",
    answers: ["Gin Ichimaru", "Tōsen Kaname", "Tout le monde ci-dessus", "Grimmjow"],
    correct: 2,
    bonusSkip: true,
  },
  // 14 — Hidden (trouver le bon parmi les faux)
  {
    id: 14,
    text: "Trouve et clique sur le Zanpakutō caché parmi les imposteurs :",
    type: "hidden",
    decoys: ["GETSUO", "ZANPAKTU", "SENBONZAKUTA", "HYŌRIMARU"],
    correct_text: "ZANGETSU",
  },
  // 15 — Classique
  {
    id: 15,
    text: "Quel est le vrai nom de famille d'Ichigo ?",
    type: "classic",
    answers: ["Kurosaki", "Shiba", "Quincy", "Hollow"],
    correct: 0,
  },
  // 16 — Slider
  {
    id: 16,
    text: "Yamamoto est le capitaine-commandant depuis combien de millénaires ?",
    type: "slider",
    min: 0, max: 5, step: 1,
    correct: 1,
    bonusSkip: true,
  },
  // 17 — Piège de logique totale
  {
    id: 17,
    text: "Combien de fois Ichigo a-t-il dit « Je dois protéger mes amis » dans Bleach ?",
    type: "classic",
    answers: ["42", "138", "Trop pour compter", "Zéro, il agit juste"],
    correct: 2,
  },
  // 18 — Classique
  {
    id: 18,
    text: "Quel Sternritter porte l'épithète « The Miracle » ?",
    type: "classic",
    answers: ["Askin Nakk Le Vaar", "Gremmy Thoumeaux", "Pernida Parnkgjas", "BG9"],
    correct: 1,
  },
  // 19 — Avoid (souris)
  {
    id: 19,
    text: "Clique sur le bon bouton sans toucher les autres…",
    type: "avoid",
    targetLabel: "RÉPONSE",
    trapLabel: "FAUX",
    bonusSkip: true,
  },
  // 20 — Finale classique
  {
    id: 20,
    text: "Qui est le véritable ennemi final de Bleach ?",
    type: "classic",
    answers: [
      "Yhwach",
      "Aizen",
      "La tante d'Ichigo",
      "Toi qui pensais avoir fini"
    ],
    correct: 0,
  },

  // ══════════════════════════════════════════
  // NOUVELLES QUESTIONS
  // ══════════════════════════════════════════

  {
    id: 21,
    text: "Qui a le Bankai le plus faible parmi ces personnages ?",
    type: "classic",
    answers: ["Ikkaku", "Hisagi", "Shinji", "Unohana"],
    correct: 3,
  },

  {
    id: 22,
    text: "Lequel de ces personnages n'est PAS roux ?",
    type: "classic",
    answers: ["Ichigo", "Orihime", "Komamura", "Matsumoto"],
    correct: 3,
    bonusSkip: true,
  },

  {
    id: 23,
    text: "Trouve l'intrus — quel mot n'a AUCUN rapport avec Ichigo ?",
    type: "word_cluster",
    words: ["15", "Fraise", "Lune", "Glace"],
    correct: ["Glace"],
    multi: false,
  },

  {
    id: 24,
    text: "De quelle race est le capitaine Sajin Komamura ?",
    type: "classic",
    answers: ["Humain", "Shinigami renard", "Wolfman / Loup-garou", "Arrancar"],
    correct: 2,
  },

  {
    id: 25,
    text: "Le prénom Ichigo peut se lire « Fraise » en japonais. Clique sur Fraise pour continuer.",
    type: "secret_word",
    secretWord: "Fraise",
    bonusSkip: true,
  },
];
