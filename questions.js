/* ═══════════════════════════════════════
   BANQUES DE QUESTIONS — MODE IMPOSSIBLE
   Tout ce qui suit est un fait canon réel
   (manga + anime + light novels officiels),
   rien n'est inventé.
═══════════════════════════════════════ */

const ESPADA_POOL = [
  { name:"Coyote Starrk",        numero:1 },
  { name:"Baraggan Louisenbairn", numero:2 },
  { name:"Tia Harribel",          numero:3 },
  { name:"Ulquiorra Cifer",       numero:4 },
  { name:"Nnoitra Gilga",         numero:5 },
  { name:"Grimmjow Jaegerjaquez", numero:6 },
  { name:"Zommari Rureaux",       numero:7 },
  { name:"Szayelaporro Granz",    numero:8 },
  { name:"Aaroniero Arruruerie",  numero:9 },
  { name:"Yammy Llargo",          numero:0 },
];

const DEATH_POOL = [
  { victim:"Kaien Shiba",          killer:"Rukia",                              wrong:["Metastacia","Aizen","Gin Ichimaru"] },
  { victim:"Yamamoto",             killer:"Yhwach",                             wrong:["Aizen","Ichigo","Ulquiorra"] },
  { victim:"Grand Fisher",         killer:"Isshin",                             wrong:["Ichigo","Rukia","Urahara"] },
  { victim:"Ulquiorra",            killer:"Ichigo",                             wrong:["Orihime","Uryū","Grimmjow"] },
  { victim:"Gin Ichimaru",         killer:"Aizen",                              wrong:["Rangiku","Ichigo","Tōsen"] },
  { victim:"Nnoitra Gilga",        killer:"Kenpachi",                           wrong:["Ichigo","Byakuya","Nelliel"] },
  { victim:"Szayelaporro Granz",   killer:"Mayuri",                             wrong:["Uryū","Renji","Nemu"] },
  { victim:"Baraggan",             killer:"Hachi",                              wrong:["Soi Fon","Ōmaeda","Yamamoto"] },
  { victim:"Zommari Rureaux",      killer:"Byakuya",                            wrong:["Renji","Rukia","Hitsugaya"] },
  { victim:"Coyote Starrk",        killer:"Shunsui",                            wrong:["Ukitake","Love","Rose"] },
  { victim:"Aizen Sōsuke",         killer:"Personne — il est emprisonné à vie", wrong:["Ichigo","Urahara","Yamamoto"] },
  { victim:"As Nodt",              killer:"Uryū Ishida",                        wrong:["Ichigo","Renji","Chad"] },
  { victim:"Cang Du",              killer:"Chad",                               wrong:["Renji","Ichigo","Rukia"] },
  { victim:"Bambietta Basterbine", killer:"Ikkaku Madarame",                    wrong:["Yumichika","Renji","Rukia"] },
  { victim:"Charlotte Cuulhorne",  killer:"Yumichika Ayasegawa",                wrong:["Ikkaku","Renji","Chad"] },
  { victim:"Yylfordt Granz",       killer:"Renji Abarai",                       wrong:["Ichigo","Chad","Uryū"] },
];

const SHIKAI_POOL = [
  { who:"Byakuya Kuchiki",   shikai:"Senbonzakura",             wrong:["Sakanade","Katen Kyōkotsu","Suzumushi"] },
  { who:"Tōshirō Hitsugaya", shikai:"Hyōrinmaru",               wrong:["Senbonzakura","Zangetsu","Ryūjin Jakka"] },
  { who:"Yamamoto",          shikai:"Ryūjin Jakka",             wrong:["Hyōrinmaru","Nozarashi","Katen Kyōkotsu"] },
  { who:"Kenpachi Zaraki",   shikai:"Nozarashi",                wrong:["Tenken","Tengumaru","Zabimaru"] },
  { who:"Mayuri Kurotsuchi", shikai:"Ashisogi Jizō",            wrong:["Suzumushi","Minazuki","Benihime"] },
  { who:"Shunsui Kyōraku",   shikai:"Katen Kyōkotsu",           wrong:["Sōgyo no Kotowari","Sakanade","Benihime"] },
  { who:"Jūshirō Ukitake",   shikai:"Sōgyo no Kotowari",        wrong:["Senbonzakura","Ryūjin Jakka","Suzumebachi"] },
  { who:"Sajin Komamura",    shikai:"Tenken",                   wrong:["Tengumaru","Nozarashi","Zabimaru"] },
  { who:"Kaname Tōsen",      shikai:"Suzumushi",                wrong:["Sakanade","Ashisogi Jizō","Wabisuke"] },
  { who:"Retsu Unohana",     shikai:"Minazuki",                 wrong:["Ashisogi Jizō","Benihime","Katen Kyōkotsu"] },
  { who:"Kisuke Urahara",    shikai:"Benihime",                 wrong:["Sakanade","Wabisuke","Haineko"] },
  { who:"Renji Abarai",      shikai:"Zabimaru",                 wrong:["Senbonzakura","Wabisuke","Gegetsuburi"] },
  { who:"Rangiku Matsumoto", shikai:"Haineko",                  wrong:["Wabisuke","Benihime","Suzumushi"] },
  { who:"Momo Hinamori",     shikai:"Tobiume",                  wrong:["Haineko","Sakanade","Wabisuke"] },
  { who:"Soi Fon",           shikai:"Suzumebachi",              wrong:["Tobiume","Sōgyo no Kotowari","Wabisuke"] },
  { who:"Izuru Kira",        shikai:"Wabisuke",                 wrong:["Haineko","Tobiume","Suzumebachi"] },
];

const STERNRITTER_POOL = [
  { name:"Yhwach",               schrift:"The Almighty",      wrong:["The Balance","The Deathdealing","The Miracle"] },
  { name:"Jugram Haschwalth",    schrift:"The Balance",       wrong:["The Almighty","The Heat","The Iron"] },
  { name:"Askin Nakk Le Vaar",   schrift:"The Deathdealing",  wrong:["The Explode","The Zombie","The Thunderbolt"] },
  { name:"Bambietta Basterbine", schrift:"The Explode",       wrong:["The Glutton","The Ugly","The Superstar"] },
  { name:"Giselle Gewelle",      schrift:"The Zombie",        wrong:["The Heat","The Miracle","The Iron"] },
  { name:"Candice Catnipp",      schrift:"The Thunderbolt",   wrong:["The Deathdealing","The Balance","The Explode"] },
  { name:"Liltotto Lamperd",     schrift:"The Glutton",       wrong:["The Ugly","The Superstar","The Zombie"] },
  { name:"Bazz-B",               schrift:"The Heat",          wrong:["The Iron","The Miracle","The Almighty"] },
  { name:"Gremmy Thoumeaux",     schrift:"The Miracle",       wrong:["The Thunderbolt","The Glutton","The Heat"] },
  { name:"Cang Du",              schrift:"The Iron",          wrong:["The Superstar","The Ugly","The Balance"] },
  { name:"Mask De Masculine",    schrift:"The Superstar",     wrong:["The Glutton","The Heat","The Deathdealing"] },
];

const VIZARD_POOL = [
  { name:"Kensei Muguruma",             shikai:"Tachikaze",       wrong:["Kinshara","Tsunzakigarasu","Kubikiri Orochi"] },
  { name:"Rojuro « Rose » Otoribashi",  shikai:"Kinshara",        wrong:["Tachikaze","Haguro Tonbo","Kubikiri Orochi"] },
  { name:"Mashiro Kuna",                shikai:"Tsunzakigarasu",  wrong:["Tachikaze","Kinshara","Haguro Tonbo"] },
  { name:"Hiyori Sarugaki",             shikai:"Kubikiri Orochi", wrong:["Tsunzakigarasu","Kinshara","Tachikaze"] },
  { name:"Lisa Yadomaru",               shikai:"Haguro Tonbo",    wrong:["Kubikiri Orochi","Tachikaze","Kinshara"] },
];

/* Fracción : subordonnés directs des Espada — niveau très obscur */
const FRACCION_POOL = [
  { member:"Shawlong Kūfang",     boss:"Grimmjow Jaegerjaquez", wrong:["Nnoitra Gilga","Zommari Rureaux","Baraggan Louisenbairn"] },
  { member:"Edrad Liones",        boss:"Grimmjow Jaegerjaquez", wrong:["Ulquiorra Cifer","Tia Harribel","Aaroniero Arruruerie"] },
  { member:"Nakeem Grindina",     boss:"Grimmjow Jaegerjaquez", wrong:["Coyote Starrk","Szayelaporro Granz","Baraggan Louisenbairn"] },
  { member:"Yylfordt Granz",      boss:"Grimmjow Jaegerjaquez", wrong:["Ulquiorra Cifer","Nnoitra Gilga","Tia Harribel"] },
  { member:"Di Roy Rinker",       boss:"Grimmjow Jaegerjaquez", wrong:["Zommari Rureaux","Coyote Starrk","Aaroniero Arruruerie"] },
  { member:"Franceska Mila Rose", boss:"Tia Harribel",          wrong:["Baraggan Louisenbairn","Nnoitra Gilga","Grimmjow Jaegerjaquez"] },
  { member:"Sung-Sun",            boss:"Tia Harribel",          wrong:["Ulquiorra Cifer","Coyote Starrk","Zommari Rureaux"] },
  { member:"Emilou Apacci",       boss:"Tia Harribel",          wrong:["Aaroniero Arruruerie","Szayelaporro Granz","Grimmjow Jaegerjaquez"] },
  { member:"Ggio Vega",           boss:"Baraggan Louisenbairn", wrong:["Tia Harribel","Nnoitra Gilga","Coyote Starrk"] },
  { member:"Charlotte Cuulhorne", boss:"Baraggan Louisenbairn", wrong:["Grimmjow Jaegerjaquez","Zommari Rureaux","Ulquiorra Cifer"] },
  { member:"Findorr Calius",      boss:"Baraggan Louisenbairn", wrong:["Aaroniero Arruruerie","Tia Harribel","Coyote Starrk"] },
  { member:"Choe Neng Poww",      boss:"Baraggan Louisenbairn", wrong:["Szayelaporro Granz","Grimmjow Jaegerjaquez","Nnoitra Gilga"] },
  { member:"Nirgge Parduoc",      boss:"Baraggan Louisenbairn", wrong:["Coyote Starrk","Grimmjow Jaegerjaquez","Aaroniero Arruruerie"] },
];

function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
function shuffle(arr){ return [...arr].sort(()=>Math.random()-0.5); }

function mcQuestion(text, correctAnswer, wrongAnswers, explain){
  const answers = shuffle([correctAnswer, ...wrongAnswers]);
  return { type:'mc', text, answers, correct:answers.indexOf(correctAnswer), explain };
}

function makeEspadaQ(){
  const p = pick(ESPADA_POOL);
  return { type:'num', text:`Quel est le numéro d'Espada de ${p.name} ?`, min:0, max:9, correct:p.numero,
    explain:`${p.name} portait le numéro ${p.numero} chez les Espada.` };
}
function makeDeathQ(){
  const p = pick(DEATH_POOL);
  return mcQuestion(`Qui a tué ${p.victim} ?`, p.killer, p.wrong, `${p.victim} : ${p.killer}.`);
}
function makeShikaiQ(){
  const p = pick(SHIKAI_POOL);
  return mcQuestion(`Quel est le Shikai de ${p.who} ?`, p.shikai, p.wrong, `Le Shikai de ${p.who} est ${p.shikai}.`);
}
function makeSternritterQ(){
  const p = pick(STERNRITTER_POOL);
  return mcQuestion(`Quel est le blason (Schrift) de ${p.name} ?`, p.schrift, p.wrong, `${p.name} porte le blason « ${p.schrift} ».`);
}
function makeVizardQ(){
  const p = pick(VIZARD_POOL);
  return mcQuestion(`Quel est le Shikai de ${p.name}, l'un des Vizards ?`, p.shikai, p.wrong, `Le Shikai de ${p.name} est ${p.shikai}.`);
}
function makeFraccionQ(){
  const p = pick(FRACCION_POOL);
  return mcQuestion(`${p.member} est un Fracción — sous les ordres de quel Espada sert-il/elle ?`, p.boss, p.wrong, `${p.member} appartient au Fracción de ${p.boss}.`);
}

/* Questions fixes (faits canon très pointus) */
const FIXED_QUESTIONS = [
  mcQuestion(
    "Qui était réellement le « vieil homme » qu'Ichigo appelait Zangetsu, avant la guerre des mille ans ?",
    "La manifestation de son pouvoir Quincy",
    ["Son véritable esprit de Zanpakutō Shinigami", "Son Hollow intérieur déguisé", "L'esprit du Roi des Âmes"],
    "Révélé pendant la guerre des mille ans : le « Zangetsu » qu'Ichigo connaissait était en réalité la manifestation de son héritage Quincy."
  ),
  mcQuestion(
    "Pourquoi Bleach s'est-il terminé de façon aussi abrupte dans le Weekly Shōnen Jump ?",
    "Le manga a chuté dans les sondages de popularité du magazine",
    ["Tite Kubo est tombé malade", "L'éditeur a annulé la série sans raison", "Kubo avait prévu cette fin depuis le début"],
    "Bleach a été précipité vers sa fin après une chute dans les classements de popularité hebdomadaires du Jump."
  ),
  {
    type:'multi',
    text:"Sélectionne uniquement les membres originels du groupe des Vizards :",
    options:["Shinji Hirako","Kensei Muguruma","Rojuro Otoribashi","Mashiro Kuna","Hiyori Sarugaki","Lisa Yadomaru","Love Aikawa","Hachigen Ushōda","Ichigo Kurosaki","Byakuya Kuchiki","Tōshirō Hitsugaya","Retsu Unohana"],
    correct:["Shinji Hirako","Kensei Muguruma","Rojuro Otoribashi","Mashiro Kuna","Hiyori Sarugaki","Lisa Yadomaru","Love Aikawa","Hachigen Ushōda"],
    explain:"Les 8 Vizards originels : Shinji, Kensei, Rose, Mashiro, Hiyori, Lisa, Love et Hachigen."
  },
  mcQuestion(
    "Quel est le nom de la technique Quincy permettant de voler un Bankai ?",
    "Sklaverei",
    ["Blut Vene", "Vollständig", "Auswählen"],
    "Sklaverei est la technique Quincy utilisée pendant la guerre des mille ans pour sceller et voler un Bankai."
  ),
  mcQuestion(
    "Qu'est-ce qui a permis à Ichigo de retrouver ses pouvoirs après les avoir perdus suite à Mugetsu ?",
    "Le Fullbring, via Kūgo Ginjō et le groupe Xcution",
    ["Un entraînement supplémentaire avec Urahara", "L'intervention directe du Roi des Âmes", "La fusion avec son Hollow intérieur"],
    "Ichigo a réveillé un Fullbring latent grâce au groupe Xcution avant de récupérer ses vrais pouvoirs de Shinigami."
  ),
  mcQuestion(
    "Dans quel district du Rukongai Renji et Rukia ont-ils grandi ensemble avant d'entrer au Gotei 13 ?",
    "Inuzuri",
    ["Junrinan", "Kusajishi", "Nishikizuta"],
    "Renji et Rukia (et leur groupe d'enfants abandonnés) ont grandi dans Inuzuri, l'un des districts les plus pauvres du Rukongai."
  ),
  mcQuestion(
    "Comment s'appelle la technique du Shikai de Soi Fon qui tue instantanément si elle touche deux fois le même point ?",
    "Nigeki Kesshatsu",
    ["Sanku Kajō", "Ichigeki Hissatsu", "Kūkyū Zesshō"],
    "Suzumebachi tue en frappant deux fois exactement le même endroit : c'est le Nigeki Kesshatsu."
  ),
  mcQuestion(
    "Quel est le nom de la technique Quincy permettant de voler et absorber les pouvoirs d'un Hollow ou d'un Shinigami ?",
    "Auswählen",
    ["Sklaverei", "Vollständig", "Gintō"],
    "Auswählen est la technique de vol de pouvoir utilisée par certains Sternritter, notamment Askin et Yhwach."
  ),
  mcQuestion(
    "Combien de Mod-Souls (Konpaku Modifiés) Kisuke Urahara a-t-il fabriqués à l'origine, dont Kon fait partie ?",
    "100",
    ["10", "50", "1000"],
    "Urahara en a créé 100 ; la Soul Society en a ordonné la destruction, seul Kon a survécu, caché dans une peluche."
  ),
  mcQuestion(
    "Quel élément est associé à Tiburón, le Zanpakutō de Tia Harribel ?",
    "Eau",
    ["Feu", "Foudre", "Glace"],
    "Tiburón confère à Harribel un pouvoir lié à l'eau, à l'image de son thème requin."
  ),
  mcQuestion(
    "Sur combien de lettres est basé le système de blasons (Schrift) des Sternritter ?",
    "26",
    ["10", "13", "52"],
    "Le système des Sternritter repose sur les 26 lettres de l'alphabet."
  ),
  mcQuestion(
    "Que renforce précisément le Blut Vene chez un Quincy ?",
    "La défense",
    ["L'attaque", "La vitesse", "La perception spirituelle"],
    "Blut Vene renforce la défense ; Blut Arterie renforce l'attaque."
  ),
  mcQuestion(
    "Pourquoi Kenpachi Zaraki porte-t-il un cache-œil ?",
    "Pour sceller une partie de son immense Reiatsu",
    ["Il a perdu son œil au combat", "Pour intimider ses adversaires", "C'est une blessure de naissance"],
    "Le cache-œil de Kenpachi n'a rien d'esthétique : il contient une partie de son Reiatsu écrasant."
  ),
  mcQuestion(
    "Quel est le nom du fragment du Roi des Âmes révélé pendant la guerre des mille ans, lié au clan Shiba ?",
    "Mimihagi",
    ["Ōetsu Nimaiya", "Ichibe Hyōsube", "Yhwach"],
    "Mimihagi est un fragment du Roi des Âmes vénéré et protégé par le clan Shiba."
  ),
  mcQuestion(
    "Quel est le titre du light novel officiel qui sert de suite directe à la fin du manga Bleach ?",
    "Can't Fear Your Own World",
    ["Spirits Are Forever With You", "We Do Not Know Yet", "Bleach: Unmasked"],
    "Écrit par Ryōhgo Narita, « Can't Fear Your Own World » prolonge l'histoire après le dernier chapitre du manga."
  ),
  mcQuestion(
    "Quel light novel officiel Bleach raconte la rencontre entre le jeune Kenpachi Zaraki et Yachiru, avant le début de la série ?",
    "We Do Not Know Yet",
    ["Can't Fear Your Own World", "Spirits Are Forever With You", "Bleach: Bad Vibes Only"],
    "« We Do Not Know Yet », de Makoto Matsubara, est un préquel centré sur la rencontre de Kenpachi et Yachiru."
  ),
];

/* Assemble : mélange de pools aléatoires + questions fixes */
function buildQuizSet(){
  const pool = [
    makeEspadaQ, makeDeathQ, makeShikaiQ, makeSternritterQ, makeVizardQ, makeFraccionQ,
    makeEspadaQ, makeDeathQ, makeShikaiQ, makeSternritterQ, makeFraccionQ,
  ];
  const generated = pool.map(fn => fn());
  return shuffle([...FIXED_QUESTIONS, ...generated]);
}
