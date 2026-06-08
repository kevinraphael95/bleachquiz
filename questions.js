/* ═══════════════════════════════════════════════════
   THAT BLEACH QUIZ — questions.js
════════════════════════════════════════════════════ */

/* ──────────────────────────────
   POOLS ALÉATOIRES
────────────────────────────── */

const ESPADA_POOL = [
  { name: "Coyote Starrk",          numero: 1 },
  { name: "Baraggan Louisenbairn",   numero: 2 },
  { name: "Tia Harribel",            numero: 3 },
  { name: "Ulquiorra Cifer",         numero: 4 },
  { name: "Nnoitra Gilga",           numero: 5 },
  { name: "Grimmjow Jaegerjaquez",   numero: 6 },
  { name: "Zommari Rureaux",         numero: 7 },
  { name: "Szayelaporro Granz",      numero: 8 },
  { name: "Aaroniero Arruruerie",    numero: 9 },
  { name: "Yammy Llargo",            numero: 0 },
];

const DEATH_POOL = [
  { victim: "Kaien Shiba",             killer: "Rukia",        wrong: ["Ichigo",    "Aizen",     "Gin Ichimaru"] },
  { victim: "Yamamoto",                killer: "Yhwach",       wrong: ["Aizen",     "Ichigo",    "Ulquiorra"]   },
  { victim: "Grand Fisher",            killer: "Isshin",       wrong: ["Ichigo",    "Rukia",     "Urahara"]     },
  { victim: "Ulquiorra",               killer: "Ichigo",       wrong: ["Orihime",   "Uryū",      "Grimmjow"]    },
  { victim: "Gin Ichimaru",            killer: "Aizen",        wrong: ["Rangiku",   "Ichigo",    "Tōsen"]       },
  { victim: "Nnoitra Gilga",           killer: "Kenpachi",     wrong: ["Ichigo",    "Byakuya",   "Hitsugaya"]   },
  { victim: "Szayelaporro Granz",      killer: "Mayuri",       wrong: ["Uryū",      "Renji",     "Kenpachi"]    },
  { victim: "Baraggan",                killer: "Hachi",        wrong: ["Soi Fon",   "Yoruichi",  "Urahara"]     },
  { victim: "Zommari Rureaux",         killer: "Byakuya",      wrong: ["Renji",     "Rukia",     "Hitsugaya"]   },
  { victim: "Coyote Starrk",          killer: "Shunsui",      wrong: ["Ukitake",   "Yamamoto",  "Ichigo"]      },
  { victim: "Pesche et Dondochakka",   killer: "Nnoitra",      wrong: ["Grimmjow",  "Ulquiorra", "Tesla"]       },
];

const SHIKAI_POOL = [
  { captain: "Byakuya Kuchiki",          shikai: "Senbonzakura",      wrong: ["Hyōrinmaru",    "Ryūjin Jakka",      "Wabisuke"]         },
  { captain: "Tōshirō Hitsugaya",        shikai: "Hyōrinmaru",        wrong: ["Senbonzakura",  "Zangetsu",          "Ryūjin Jakka"]     },
  { captain: "Yamamoto",                 shikai: "Ryūjin Jakka",      wrong: ["Hyōrinmaru",    "Senbonzakura",      "Gegetsuburi"]      },
  { captain: "Kenpachi Zaraki",          shikai: "Nozarashi",         wrong: ["Senbonzakura",  "Ryūjin Jakka",      "Hyōrinmaru"]      },
  { captain: "Mayuri Kurotsuchi",        shikai: "Ashisogi Jizō",     wrong: ["Senbonzakura",  "Wabisuke",          "Gegetsuburi"]      },
  { captain: "Shunsui Kyōraku",          shikai: "Katen Kyōkotsu",    wrong: ["Senbonzakura",  "Suzumebachi",       "Wabisuke"]         },
  { captain: "Jūshirō Ukitake",          shikai: "Sōgyo no Kotowari", wrong: ["Senbonzakura",  "Ryūjin Jakka",      "Suzumebachi"]      },
  { captain: "Shinji Hirako",            shikai: "Sakanade",          wrong: ["Senbonzakura",  "Gegetsuburi",       "Wabisuke"]         },
  { captain: "Sajin Komamura",           shikai: "Tenken",            wrong: ["Senbonzakura",  "Ryūjin Jakka",      "Gegetsuburi"]      },
  { captain: "Kaname Tōsen",             shikai: "Suzumushi",         wrong: ["Senbonzakura",  "Wabisuke",          "Gegetsuburi"]      },
  { captain: "Retsu Unohana",            shikai: "Minazuki",          wrong: ["Senbonzakura",  "Ashisogi Jizō",     "Sōgyo no Kotowari"]},
  { captain: "Kisuke Urahara",           shikai: "Benihime",          wrong: ["Senbonzakura",  "Zangetsu",          "Wabisuke"]         },
  { captain: "Yoruichi Shihōin",         shikai: "Shunko (pas de zanpakutō)", wrong: ["Tenken", "Benihime",         "Minazuki"]         },
  { captain: "Renji Abarai",             shikai: "Zabimaru",          wrong: ["Senbonzakura",  "Wabisuke",          "Gegetsuburi"]      },
  { captain: "Rangiku Matsumoto",        shikai: "Haineko",           wrong: ["Senbonzakura",  "Zangetsu",          "Wabisuke"]         },
  { captain: "Love Aikawa",              shikai: "Tengumaru",         wrong: ["Sakanade",      "Gegetsuburi",       "Wabisuke"]         },
];

/* ──────────────────────────────
   UTILITAIRES
────────────────────────────── */
function _pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function _shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

/* ──────────────────────────────
   GÉNÉRATEURS DE QUESTIONS
────────────────────────────── */
function makeEspadaQ(id, opts = {}) {
  const pick = _pick(ESPADA_POOL);
  return {
    id,
    text: `Quel est le numéro d'Espada de ${pick.name} ?`,
    type: "slider",
    min: 0, max: 9, step: 1,
    correct: pick.numero,
    ...opts,
  };
}

function makeDeathQ(id, opts = {}) {
  const pick = _pick(DEATH_POOL);
  const answers = _shuffle([pick.killer, ...pick.wrong.slice(0, 3)]);
  return {
    id,
    text: `Qui a tué ${pick.victim} ?`,
    type: "classic",
    answers,
    correct: answers.indexOf(pick.killer),
    ...opts,
  };
}

function makeShikaiQ(id, opts = {}) {
  const pick = _pick(SHIKAI_POOL);
  const answers = _shuffle([pick.shikai, ...pick.wrong.slice(0, 3)]);
  return {
    id,
    text: `Quel est le Shikai de ${pick.captain} ?`,
    type: "classic",
    answers,
    correct: answers.indexOf(pick.shikai),
    ...opts,
  };
}

/* ──────────────────────────────
   QUESTIONS
────────────────────────────── */
const QUESTIONS = [
  // 1 — Classique piège
  {
    id: 1,
    text: "Combien de temps Ichigo a-t-il mis pour maîtriser le Bankai ?",
    type: "classic",
    answers: ["1 jour", "2 jours", "3 jours", "Il ne l'a jamais maîtrisé"],
    correct: 3,
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
  // 3 — POOL : numéro d'Espada aléatoire
  makeEspadaQ(3),

  // 4 — POOL : qui a tué X ? aléatoire
  makeDeathQ(4),

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
    text: "Combien y a t-il de divisions dans le Gotei 13 ?",
    type: "secret_word",
    secretWord: "13",
    fakeAnswers: ["6", "12", "20", "46"],
    bonusSkip: true,
  },
  // 8 — Mot caché cliquable dans la question
  {
    id: 8,
    text: "Clique sur le mot BANKAI dans cette phrase pour répondre : « Seuls les fools cliquent sur BANKAI »",
    type: "secret_word",
    secretWord: "BANKAI",
    fakeAnswers: ["Shikai", "Bankai", "Reiatsu", "Zanpakutō"],
  },
  // 9 — Drag & drop ordre
  {
    id: 9,
    text: "Remets les arcs dans l'ordre chronologique :",
    type: "drag",
    items: ["Arrancar", "Soul Society", "Fullbring", "Thousand-Year Blood War"],
    correctOrder: ["Soul Society", "Arrancar", "Fullbring", "Thousand-Year Blood War"],
  },
  // 10 — POOL : Shikai d'un capitaine aléatoire
  makeShikaiQ(10, { bonusSkip: true }),

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
  // 16 — POOL : numéro d'Espada aléatoire (2e fois)
  makeEspadaQ(16, { bonusSkip: true }),

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
  // 20 — POOL : qui a tué X ? aléatoire (2e fois)
  makeDeathQ(20),

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

  // 26 — POOL : Shikai aléatoire (3e apparition)
  makeShikaiQ(26),
];
