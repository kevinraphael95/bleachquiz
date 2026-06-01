/* ═══════════════════════════════════════════════════
   THE IMPOSSIBLEACH QUIZ — questions.js
   Banque de questions — éditable librement
   Chaque question suit le schéma :
   {
     id          : number
     text        : string
     type        : "classic" | "slider" | "colors" | "drag" | "hidden" | "avoid" | "word_cluster" | "secret_word"
     comment     : string   (affiché après bonne réponse, optionnel)
     ...champs spécifiques au type (voir exemples)
   }
════════════════════════════════════════════════════ */

const QUESTIONS = [
  // 1 — Classique piège
  {
    id: 1,
    text: "Combien de temps Ichigo a-t-il mis pour maîtriser le Bankai ?",
    type: "classic",
    answers: ["3 jours", "1 semaine", "10 ans", "Il ne l'a jamais maîtrisé"],
    correct: 0,
    comment: "3 jours selon Yoruichi, c'est normalement censé prendre 10 ans minimum. Ichigo est juste cheaté."
  },
  // 2 — Piège de lecture
  {
    id: 2,
    text: "Quel est le vrai nom du Zanpakutō de Rukia ?",
    type: "classic",
    answers: ["Sode no Shirayuki", "Shirofuki", "Hyōrinmaru", "Zangetsu"],
    correct: 0,
    comment: "Sode no Shirayuki — « La manche de la neige blanche ». Hyōrinmaru c'est Tōshirō, ne pas confondre."
  },
  // 3 — Slider (nombre)
  {
    id: 3,
    text: "Quel est le numéro d'Espada d'Ulquiorra ?",
    type: "slider",
    min: 0, max: 9, step: 1,
    correct: 4,
    comment: "Ulquiorra est le 4ème Espada. Mais attention — son vrai pouvoir se révèle en Segunda Etapa."
  },
  // 4 — Classique
  {
    id: 4,
    text: "Qui a tué Kaien Shiba ?",
    type: "classic",
    answers: ["Ichigo", "Rukia", "Aizen", "Gin"],
    correct: 1,
    comment: "Rukia l'a tué de ses propres mains — sous l'emprise d'un Hollow. Une des scènes les plus déchirantes."
  },
  // 5 — Piège logique absurde
  {
    id: 5,
    text: "Qu'est-ce qu'un Shinigami fait quand il dort ?",
    type: "classic",
    answers: [
      "Il purrifie les âmes en rêve",
      "Il n'a pas besoin de dormir",
      "Il retourne à la Soul Society",
      "La même chose que toi en ce moment"
    ],
    correct: 3,
    comment: "Tu lisais pas la question, hein ? La réponse c'était toi. Concentre-toi."
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
    comment: "Violet/mauve profond. L'Hōgyoku illumine Aizen d'une aura violette inquiétante. Magnifique et terrifiant."
  },
  // 7 — Classique piège de logique
  {
    id: 7,
    text: "Combien y a-t-il de divisions dans le Gotei 13 ?",
    type: "classic",
    answers: ["10", "11", "12", "13"],
    correct: 3,
    comment: "13 divisions. C'est dans le nom. Gotei 13 = 護廷十三隊. Tu as failli tomber dans le panneau."
  },
  // 8 — Mot caché cliquable dans la question
  {
    id: 8,
    text: "Clique sur le mot BANKAI dans cette phrase pour répondre : « Seuls les fools cliquent sur BANKAI »",
    type: "secret_word",
    secretWord: "BANKAI",
    comment: "Bravo. Tu as su reconnaître l'évidence dans le chaos."
  },
  // 9 — Drag & drop ordre
  {
    id: 9,
    text: "Remets les arcs dans l'ordre chronologique :",
    type: "drag",
    items: ["Arrancar", "Soul Society", "Fullbring", "Thousand-Year Blood War"],
    correctOrder: ["Soul Society", "Arrancar", "Fullbring", "Thousand-Year Blood War"],
    comment: "Soul Society → Arrancar → Fullbring → TYBW. Tu connais ton Bleach !"
  },
  // 10 — Classique
  {
    id: 10,
    text: "Quel est le Shikai de Byakuya Kuchiki ?",
    type: "classic",
    answers: ["Senbonzakura", "Hyōrinmaru", "Ryūjin Jakka", "Wabisuke"],
    correct: 0,
    comment: "Senbonzakura — « Mille cerisiers ». Mille pétales d'acier. Le plus beau Zanpakutō de la série."
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
    comment: "L'ignore. La vraie réponse était d'ignorer la question. Bienvenu dans l'Impossible Quiz."
  },
  // 12 — Cluster multi-select
  {
    id: 12,
    text: "Quels personnages font partie de la Division Zéro ?",
    type: "word_cluster",
    words: ["Ichibe Hyōsube", "Senjumaru Shutara", "Gremmy Thoumeaux", "Tenjirō Kirinji", "Lille Barro", "Kirio Hikifune"],
    correct: ["Ichibe Hyōsube", "Senjumaru Shutara", "Tenjirō Kirinji", "Kirio Hikifune"],
    multi: true,
    comment: "Gremmy et Lille sont des Sternritter, pas de la Division Zéro. Les 4 autres sont bien les Royal Guard."
  },
  // 13 — Classique piège visuel
  {
    id: 13,
    text: "Qui dit « Aizen-sama » dans Bleach ?",
    type: "classic",
    answers: ["Gin Ichimaru", "Tōsen Kaname", "Tout le monde ci-dessus", "Grimmjow"],
    correct: 2,
    comment: "Gin ET Tōsen tous les deux. Donc « tout le monde ci-dessus » était la bonne réponse."
  },
  // 14 — Hidden (trouver le bon parmi les faux)
  {
    id: 14,
    text: "Trouve et clique sur le Zanpakutō caché parmi les imposteurs :",
    type: "hidden",
    decoys: ["GETSUO", "ZANPAKTU", "SENBONZAKUTA", "HYŌRIMARU"],
    correct_text: "ZANGETSU",
    comment: "Zangetsu. Le seul correctement orthographié. Les autres étaient des pièges typographiques."
  },
  // 15 — Classique
  {
    id: 15,
    text: "Quel est le vrai nom de famille d'Ichigo ?",
    type: "classic",
    answers: ["Kurosaki", "Shiba", "Quincy", "Hollow"],
    correct: 0,
    comment: "Kurosaki. Mais il est techniquement aussi un Shiba par le sang maternel. Et un Quincy. Et un Hollow. Il est tout."
  },
  // 16 — Slider
  {
    id: 16,
    text: "Yamamoto est le capitaine-commandant depuis combien de millénaires ?",
    type: "slider",
    min: 0, max: 5, step: 1,
    correct: 1,
    comment: "Environ 1 millénaire — plus de 1000 ans. Le vieux Yama a tout vu. Et il a quand même perdu son bras."
  },
  // 17 — Piège de logique totale
  {
    id: 17,
    text: "Combien de fois Ichigo a-t-il dit « Je dois protéger mes amis » dans Bleach ?",
    type: "classic",
    answers: ["42", "138", "Trop pour compter", "Zéro, il agit juste"],
    correct: 2,
    comment: "On ne peut pas compter. Mais si on pouvait, le nombre briserait les lois de la Soul Society."
  },
  // 18 — Classique
  {
    id: 18,
    text: "Quel Sternritter porte l'épithète « The Miracle » ?",
    type: "classic",
    answers: ["Askin Nakk Le Vaar", "Gremmy Thoumeaux", "Pernida Parnkgjas", "BG9"],
    correct: 1,
    comment: "Gremmy Thoumeaux — « The Miracle ». Son pouvoir : tout ce qu'il imagine devient réel. Absolu."
  },
  // 19 — Avoid (souris)
  {
    id: 19,
    text: "Clique sur le bon bouton sans toucher les autres…",
    type: "avoid",
    targetLabel: "RÉPONSE",
    trapLabel: "FAUX",
    comment: "Tu as su éviter les pièges. Comme Yoruichi évite tout le monde. Avec classe."
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
    comment: "Yhwach — le Roi des Quincy. Père de tous les Quincy, fils du Roi des Âmes. L'ennemi ultime. Et tu as gagné. BANKAI COMPLET."
  }
];
