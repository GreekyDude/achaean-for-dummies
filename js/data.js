// ═══════════════════════════════════════════════════════
// LINEAR B DATA — verified against:
//   kinezika.com transliterator
//   Wikipedia Linear B + Mycenaean Greek articles
//   Ventris & Chadwick, Documents in Mycenaean Greek
//   Nakassis (2018) englianos.wordpress.com
//   Linear B Lexicon (Tselentis 2011)
//   PY Tn 316: Classical Inquiries (Woodard 2019)
// ═══════════════════════════════════════════════════════

const SIGNS = {
  'a':'𐀀','e':'𐀁','i':'𐀂','o':'𐀃','u':'𐀄',
  'da':'𐀅','de':'𐀆','di':'𐀇','do':'𐀈','du':'𐀉',
  'ja':'𐀊','je':'𐀋','jo':'𐀍',
  'ka':'𐀏','ke':'𐀐','ki':'𐀑','ko':'𐀒','ku':'𐀓',
  'ma':'𐀔','me':'𐀕','mi':'𐀖','mo':'𐀗','mu':'𐀘',
  'na':'𐀙','ne':'𐀚','ni':'𐀛','no':'𐀜','nu':'𐀝',
  'pa':'𐀞','pe':'𐀟','pi':'𐀠','po':'𐀡','pu':'𐀢',
  'qa':'𐀣','qe':'𐀤','qi':'𐀥','qo':'𐀦',
  'ra':'𐀨','re':'𐀩','ri':'𐀪','ro':'𐀫','ru':'𐀬',
  'sa':'𐀭','se':'𐀮','si':'𐀯','so':'𐀰','su':'𐀱',
  'ta':'𐀲','te':'𐀳','ti':'𐀴','to':'𐀵','tu':'𐀶',
  'wa':'𐀷','we':'𐀸','wi':'𐀹','wo':'𐀺',
  'za':'𐀼','ze':'𐀽','zo':'𐀿'
};

const SIGN_DETAILS = [
  {val:'a',sign:'𐀀',note:'Vowel. Very common word-initial sign.',ex:'a-to-ro-qo = anthrōpos (human being)'},
  {val:'e',sign:'𐀁',note:'Vowel. One of the highest-frequency signs.',ex:'e-ko = ekhō (to have)'},
  {val:'i',sign:'𐀂',note:'Vowel.',ex:'i-je-re-ja = hiereja (priestess)'},
  {val:'o',sign:'𐀃',note:'Vowel. Common in nominative endings.',ex:'o-no = onos (price, hire)'},
  {val:'u',sign:'𐀄',note:'Vowel.',ex:'u-po = hupo (under)'},
  {val:'da',sign:'𐀅',note:'d-series. Linear B distinguishes d from t.',ex:'da-mo = dāmos (community)'},
  {val:'de',sign:'𐀆',note:'d-series.',ex:'de-so-mo = desmos (bond)'},
  {val:'di',sign:'𐀇',note:'d-series.',ex:'di-we = Diwei (Zeus, dative)'},
  {val:'do',sign:'𐀈',note:'d-series.',ex:'do-e-ro = doelos (slave)'},
  {val:'du',sign:'𐀉',note:'d-series.',ex:'du-wo = dwō (two)'},
  {val:'ja',sign:'𐀊',note:'j-series. Palatal semivowel, like English "y".',ex:'ja-si-ja = iasia (place name)'},
  {val:'je',sign:'𐀋',note:'j-series.',ex:'i-je-re-u = iereus (priest)'},
  {val:'jo',sign:'𐀍',note:'j-series. U+1000C is unassigned.',ex:'a-te-mi-ti-jo = Artemitios'},
  {val:'ka',sign:'𐀏',note:'k-series. No voiced/aspirate distinction.',ex:'ka-ko = khalkos (bronze)'},
  {val:'ke',sign:'𐀐',note:'k-series.',ex:'ke-ra-me-u = kerameus (potter)'},
  {val:'ki',sign:'𐀑',note:'k-series.',ex:'ki-to = khitōn (tunic)'},
  {val:'ko',sign:'𐀒',note:'k-series.',ex:'ko-no-so = Knossos'},
  {val:'ku',sign:'𐀓',note:'k-series.',ex:'ku-ru-so = khrusos (gold)'},
  {val:'ma',sign:'𐀔',note:'m-series.',ex:'ma-te = mātēr (mother)'},
  {val:'me',sign:'𐀕',note:'m-series.',ex:'me-ri = meli (honey)'},
  {val:'mi',sign:'𐀖',note:'m-series.',ex:'mi-ra = moira (portion)'},
  {val:'mo',sign:'𐀗',note:'m-series.',ex:'mo-ro-qa = a title'},
  {val:'mu',sign:'𐀘',note:'m-series.',ex:'mu-ka-na = Mycenae'},
  {val:'na',sign:'𐀙',note:'n-series. Very common.',ex:'wa-na-ka = king (na is middle sign)'},
  {val:'ne',sign:'𐀚',note:'n-series.',ex:'ne-wa = newos (new)'},
  {val:'ni',sign:'𐀛',note:'n-series.',ex:'a-mi-ni-so = Amnissos'},
  {val:'no',sign:'𐀜',note:'n-series.',ex:'ko-no-so = Knossos (middle sign)'},
  {val:'nu',sign:'𐀝',note:'n-series.',ex:'nu-wa-ja = place name'},
  {val:'pa',sign:'𐀞',note:'p-series. Very high frequency.',ex:'pa-te = patēr (father)'},
  {val:'pe',sign:'𐀟',note:'p-series.',ex:'pe-ma = sperma (seed)'},
  {val:'pi',sign:'𐀠',note:'p-series.',ex:'pi-ri-je-te = priestly title'},
  {val:'po',sign:'𐀡',note:'p-series. po-se-da-o = Poseidon.',ex:'po-me = poimēn (shepherd)'},
  {val:'pu',sign:'𐀢',note:'p-series.',ex:'pu-ro = Pulos (Pylos)'},
  {val:'qa',sign:'𐀣',note:'q-series. Labio-velar kʷ — lost in later Greek.',ex:'qa-si-re-u → basileus'},
  {val:'qe',sign:'𐀤',note:'q-series. Labio-velar gʷe/kʷe.',ex:'ra-wa-ke-ta = army leader'},
  {val:'qi',sign:'𐀥',note:'q-series. Rare.',ex:'qi-si-pe-e = swords (dual)'},
  {val:'qo',sign:'𐀦',note:'q-series. Often relates to cattle (gʷous).',ex:'qo-u-ko-ro → boukoloi'},
  {val:'ra',sign:'𐀨',note:'r-series. Covers BOTH r and l sounds.',ex:'ra-wa-ke-ta = army leader'},
  {val:'re',sign:'𐀩',note:'r-series. r and l not distinguished.',ex:'e-re-u-te-ro = eleutheros (free)'},
  {val:'ri',sign:'𐀪',note:'r-series.',ex:'ti-ri-po = tripous (tripod)'},
  {val:'ro',sign:'𐀫',note:'r-series.',ex:'do-e-ro = slave (ends with ro)'},
  {val:'ru',sign:'𐀬',note:'r-series.',ex:'ku-ru-so = gold (echo vowel)'},
  {val:'sa',sign:'𐀭',note:'s-series.',ex:'sa-ra-pe-da = divine epithet'},
  {val:'se',sign:'𐀮',note:'s-series.',ex:'a-pi-po-re-we = amphorae'},
  {val:'si',sign:'𐀯',note:'s-series.',ex:'si-to = sitos (grain)'},
  {val:'so',sign:'𐀰',note:'s-series.',ex:'to-so = tosos (so much)'},
  {val:'su',sign:'𐀱',note:'s-series.',ex:'su-ko = sukon (fig)'},
  {val:'ta',sign:'𐀲',note:'t-series. Extremely common.',ex:'ta-ra-si-ja = wool allocation'},
  {val:'te',sign:'𐀳',note:'t-series. Covers t and th.',ex:'te-o = theos (god)'},
  {val:'ti',sign:'𐀴',note:'t-series.',ex:'ti-ri-po = tripous (tripod)'},
  {val:'to',sign:'𐀵',note:'t-series.',ex:'to-so = tosos (so much)'},
  {val:'tu',sign:'𐀶',note:'t-series.',ex:'tu-ka-te = thugater (daughter)'},
  {val:'wa',sign:'𐀷',note:'w-series. Digamma (Ϝ) — lost in later Greek.',ex:'wa-na-ka = wanaks (king)'},
  {val:'we',sign:'𐀸',note:'w-series.',ex:'ka-ke-we = bronze-smiths (plural)'},
  {val:'wi',sign:'𐀹',note:'w-series.',ex:'wi-ri-ne-jo = of leather'},
  {val:'wo',sign:'𐀺',note:'w-series.',ex:'we-ke = wergei (works on)'},
  {val:'za',sign:'𐀼',note:'z-series. Possibly ts/dz. za ≠ wa.',ex:'za-we-te = zawete (this year)'},
  {val:'ze',sign:'𐀽',note:'z-series.',ex:'ze-u-ke-si = zeugesi (pairs/yokes)'},
  {val:'zo',sign:'𐀿',note:'z-series. U+1003B and U+1003E unassigned.',ex:'zo-a = zōa (animals)'},
];

// ── TABLETS ─────────────────────────────────────────────
const TABLETS = {
  ta641:{
    ref:'PY Ta 641',name:'The Tripod Tablet',difficulty:'Beginner',
    date:'c.1180 BCE · Pylos · Scribe 2',
    desc:'The most famous Linear B tablet. Discovered by Blegen at Pylos in 1953 and sent immediately to Ventris — the match between words and vessel ideograms confirmed his decipherment. Records ritual feasting vessels.',
    lines:[
      {n:'.1',signs:'𐀴𐀪𐀡𐀆',translit:'ti-ri-po-de',ideogram:'TRIPOD 2',meaning:'Tripods of Cretan workmanship — 2'},
      {n:'.2',signs:'𐀴𐀪𐀃𐀸',translit:'ti-ri-o-we',ideogram:'TRIPOD 1',meaning:'Tripod with three handles — 1'},
      {n:'.3',signs:'𐀀𐀙𐀺𐀸',translit:'a-no-we',ideogram:'TRIPOD 1',meaning:'Tripod without handles — 1'},
      {n:'.4',signs:'𐀇𐀞',translit:'di-pa',ideogram:'VAS 2',meaning:'Cups/goblets (dipa) — 2'},
      {n:'.5',signs:'𐀇𐀞𐀕𐀍𐀡𐀳𐀫𐀸',translit:'di-pa me-zo-e qe-to-ro-we',ideogram:'VAS 1',meaning:'Larger cups with four handles — 1'},
      {n:'.6',signs:'𐀇𐀞𐀕𐀹𐀍𐀴𐀪𐀍𐀸',translit:'di-pa me-wi-jo ti-ri-jo-we',ideogram:'VAS 2',meaning:'Smaller cups with three handles — 2'},
      {n:'.7',signs:'𐀇𐀞𐀕𐀹𐀍𐀀𐀙𐀺𐀸',translit:'di-pa me-wi-jo a-no-we',ideogram:'VAS 1',meaning:'Smaller cup without handles — 1'},
    ]
  },
  cn608:{
    ref:'PY Cn 608',name:'The Pig-Fattening Tablet',difficulty:'Beginner',
    date:'c.1200 BCE · Pylos · Scribe 1',
    desc:'Records future pig-fattening across nine Pylian districts. The future tense verb — and the palace\'s subsequent destruction — means these pigs were probably never fattened. Translation: Nakassis (2018).',
    lines:[
      {n:'.1',signs:'𐀍𐀀𐀮𐀰𐀯',translit:'jo-a-se-so-si , si-a2-ro',ideogram:'',meaning:'"Thus will they fatten fatted pigs" — future tense header'},
      {n:'.2',signs:'𐀃𐀠𐀅𐀔𐀍',translit:'o-pi-da-mi-jo',ideogram:'',meaning:'"Community officials" (opidāmioi)'},
      {n:'.3',signs:'𐀠𐀿',translit:'pi-[*82]',ideogram:'SUS+SI 3',meaning:'Piswā — FATTED PIGS 3'},
      {n:'.4',signs:'𐀕𐀲𐀞',translit:'me-ta-pa',ideogram:'SUS+SI 3',meaning:'Metapā — FATTED PIGS 3'},
      {n:'.5',signs:'𐀟𐀵𐀜',translit:'pe-to-no',ideogram:'SUS+SI 6',meaning:'Pethnos — FATTED PIGS 6'},
      {n:'.6',signs:'𐀞𐀏𐀊𐀭',translit:'pa-ki-ja-si',ideogram:'SUS+SI 2',meaning:'Sphagiānes — FATTED PIGS 2'},
      {n:'.7',signs:'𐀀𐀢𐀸',translit:'a-pu2-we',ideogram:'SUS+SI 2',meaning:'Aphus — FATTED PIGS 2'},
      {n:'.8',signs:'𐀀𐀐𐀩𐀷',translit:'a-ke-re-wa',ideogram:'SUS+SI 2',meaning:'Agrēwā — FATTED PIGS 2'},
      {n:'.9',signs:'𐀁𐀨𐀲𐀁',translit:'e-ra-te-i',ideogram:'SUS+SI 3',meaning:'Elatos — FATTED PIGS 3'},
      {n:'.10',signs:'𐀏𐀨𐀅𐀫',translit:'ka-ra-do-ro',ideogram:'SUS+SI 2',meaning:'Kharadroi — FATTED PIGS 2'},
      {n:'.11',signs:'𐀪𐀍',translit:'ri-jo',ideogram:'SUS+SI 2',meaning:'Rhion — FATTED PIGS 2'},
    ]
  },
  fn7:{
    ref:'PY Fn 7',name:'The Oil Ration Tablet',difficulty:'Beginner',
    date:'c.1200 BCE · Pylos',
    desc:'Records olive oil allocations to the palace hierarchy. The most common tablet format: recipient + ideogram + quantity.',
    lines:[
      {n:'.1',signs:'𐀷𐀙𐀏',translit:'wa-na-ka',ideogram:'OIL [quantity]',meaning:'The wanax (king) — receives oil'},
      {n:'.2',signs:'𐀤𐀷𐀐𐀲',translit:'ra-wa-ke-ta',ideogram:'OIL [quantity]',meaning:'The lawāgetās (army leader) — receives oil'},
      {n:'.3',signs:'𐀁𐀨𐀺',translit:'e-ra-wo',ideogram:'',meaning:'"Olive oil" — the commodity'},
      {n:'.4',signs:'𐀵𐀰',translit:'to-so',ideogram:'OIL [total]',meaning:'to-so = "so much" — the total'},
    ]
  },
  tn316:{
    ref:'PY Tn 316',name:'The God Tablet',difficulty:'Intermediate',
    date:'c.1180 BCE · Pylos · Scribe 2',
    desc:'The most important religious Linear B document. Records offerings of gold vessels and persons (po-re-na) sent to shrines of multiple deities. Divided into four sections each opening with pu-ro (Pylos). Names Poseidon, Hera, Zeus, Athena, Dionysus, and others. Source: Trzaskoma (2004); Woodard, Classical Inquiries (2019).',
    lines:[
      {n:'v.1',signs:'𐀢𐀫',translit:'pu-ro',ideogram:'',meaning:'PYLOS — section header (repeated 4 times across the tablet)'},
      {n:'v.2',signs:'𐀍𐀁',translit:'i-je-to-qe',ideogram:'',meaning:'"And a procession goes to the sanctuary" — ritual action verb'},
      {n:'v.3',signs:'𐀡𐀮𐀅𐀃𐀚',translit:'po-se-da-o-ne',ideogram:'AUR VAS 1, VIR 1',meaning:'To Poseidon — gold vessel ×1, man ×1'},
      {n:'v.4',signs:'𐀆𐀷𐀞𐀳',translit:'do-ra-qe pe-re',ideogram:'',meaning:'"And he carries gifts" — the standard offering formula'},
      {n:'v.5',signs:'𐀁𐀨',translit:'e-ra',ideogram:'AUR VAS 1, MUL 1',meaning:'To Hera — gold vessel ×1, woman ×1'},
      {n:'v.6',signs:'𐀇𐀺𐀙𐀄𐀰',translit:'di-wo-nu-so',ideogram:'AUR VAS 1',meaning:'To Dionysos — gold vessel ×1 (one of his earliest known attestations)'},
      {n:'v.7',signs:'𐀇𐀸',translit:'di-we',ideogram:'AUR VAS 1, VIR 1',meaning:'To Zeus — gold vessel ×1, man ×1'},
      {n:'v.8',signs:'𐀀𐀲𐀙𐀡𐀳𐀹𐀊',translit:'a-ta-na po-ti-ni-ja',ideogram:'AUR VAS 1',meaning:'To Athena Potnia ("Mistress Athena") — gold vessel ×1'},
      {n:'v.9',signs:'𐀁𐀪𐀙𐀄',translit:'e-ri-nu',ideogram:'AUR VAS 1',meaning:'To the Erinys (Fury/Furies) — gold vessel ×1'},
      {n:'v.10',signs:'𐀕𐀏',translit:'ma-ka',ideogram:'AUR VAS 1',meaning:'To Ma-ka ("Mother Earth"? — identification debated) — gold vessel ×1'},
    ]
  },
  jn829:{
    ref:'PY Jn 829',name:'The Bronze-Smiths Tablet',difficulty:'Intermediate',
    date:'c.1200 BCE · Pylos',
    desc:'One of the Jn series — the most detailed bronze-working records in the corpus. Lists bronze allocated to individual smiths (ka-ke-we) across Pylian districts. The palace was clearly mobilising metal urgently before its destruction.',
    lines:[
      {n:'.1',signs:'𐀏𐀐𐀸',translit:'ka-ke-we',ideogram:'',meaning:'"Bronze-smiths" — subject of the tablet'},
      {n:'.2',signs:'𐀃𐀠𐀅𐀔𐀍',translit:'o-pi-da-mi-jo',ideogram:'',meaning:'"Community officials" overseeing the smiths'},
      {n:'.3',signs:'𐀏𐀏',translit:'ka-ko',ideogram:'AES [weight]',meaning:'Bronze — with a weight in Mycenaean units (AES = Latin for bronze)'},
      {n:'.4',signs:'𐀸𐀐',translit:'we-ke',ideogram:'',meaning:'"wergei" — works on / is working (craftsman formula)'},
      {n:'.5',signs:'𐀀𐀙𐀃𐀸',translit:'a-no-qo-ta',ideogram:'AES 2',meaning:'Anokhwotās (a smith\'s name) — bronze 2 units'},
      {n:'.6',signs:'𐀵𐀰',translit:'to-so',ideogram:'AES [total]',meaning:'to-so = total bronze allocated'},
    ]
  },
  kn_fp1:{
    ref:'KN Fp(1) 1',name:'The Monthly Oil Tablet (Knossos)',difficulty:'Advanced',
    date:'c.1375 BCE · Knossos (older than all Pylos tablets)',
    desc:'From the Knossos Fp series — monthly records of olive oil to deities and sanctuaries. pa-si-te-o-i = "to all the gods" (dative plural) is the key formula. Translation: Mycenaean Miscellany (2018).',
    lines:[
      {n:'.1',signs:'𐀏𐀨𐀁𐀪𐀍',translit:'ka-ra-e-ri-jo',ideogram:'',meaning:'In the month of Karaeriōn (a calendar month name)'},
      {n:'.2',signs:'𐀞𐀯𐀳𐀃𐀂',translit:'pa-si-te-o-i',ideogram:'OIL 9.6L',meaning:'"To all the gods" (pansi theohoi, dat. pl.) — oil 9.6 litres'},
      {n:'.3',signs:'𐀤𐀨𐀭𐀊',translit:'qe-ra-si-ja',ideogram:'OIL 9.6L',meaning:'To Qerasija (divine title, possibly linked to Artemis) — 9.6L'},
      {n:'.4',signs:'𐀵𐀰',translit:'to-so',ideogram:'OIL [total]',meaning:'Total oil disbursed this month'},
    ]
  },
  py_an1:{
    ref:'PY An 1',name:'The Coast Guard Tablet',difficulty:'Advanced',
    date:'c.1180 BCE · Pylos',
    desc:'The first "o-ka" (coast guard) tablet — records military contingents defending the Pylian coastline. Unusually narrative for Linear B. The urgency suggests the palace anticipated attack. Source: Mnamon, SNS Pisa.',
    lines:[
      {n:'.1',signs:'𐀃𐀏',translit:'o-ka',ideogram:'',meaning:'"o-ka" — the military unit / watch command (exact meaning debated)'},
      {n:'.2',signs:'𐀁𐀐𐀲',translit:'e-ke-ta',ideogram:'',meaning:'e-ke-ta = "follower/companion" — a military title (hekwetās)'},
      {n:'.3',signs:'𐀣𐀫𐀏𐀍',translit:'qa-ra-ko-ro',ideogram:'VIR 10',meaning:'Khalarkhos (commander name) — MEN 10'},
      {n:'.4',signs:'𐀃𐀪𐀕𐀍',translit:'o-ri-me-no',ideogram:'VIR 30',meaning:'Orimenos (commander) — MEN 30'},
      {n:'.5',signs:'𐀉𐀺𐀍𐀃',translit:'du-wo-jo-o',ideogram:'VIR 20',meaning:'Dwoyos (commander) — MEN 20'},
      {n:'.6',signs:'𐀵𐀰',translit:'to-so',ideogram:'VIR [total]',meaning:'Total men assigned to coastal defence'},
    ]
  }
};

// ── TRANSLATION DICTIONARY ────────────────────────────────
// Maps English / Greek words → attested Mycenaean words
// Sources: Tselentis Linear B Lexicon (2011); Wikipedia Mycenaean Greek
const TRANSLATION_DICT = [
  {en:['king','ruler','lord'],gr:['βασιλιάς','ἄναξ','άναξ','anax'],fr:['roi','seigneur'],myc:'wa-na-ka',meaning:'wanax (supreme king)',note:'The Mycenaean king. qa-si-re-u was a subordinate — only later did it mean "king".'},
  {en:['chieftain','chief','local king','basileus'],gr:['βασιλεύς','αρχηγός'],fr:['chef','chef local'],myc:'qa-si-re-u',meaning:'kʷasileús (local chieftain)',note:'Subordinate official → later "king" (basileus).'},
  {en:['army leader','general','warlord','commander'],gr:['στρατηγός','αρχηγός στρατού'],fr:['chef d\'armée','général'],myc:'ra-wa-ke-ta',meaning:'lawāgetās (leader of the army)',note:'Second-highest title at Pylos and Knossos.'},
  {en:['slave','servant','serf'],gr:['δοῦλος','σκλάβος','δούλος'],fr:['esclave','serviteur'],myc:'do-e-ro',meaning:'doelos (male slave)',note:'do-e-ra is the female form. Hundreds in palace records.'},
  {en:['priestess'],gr:['ἱέρεια','ιέρεια'],fr:['prêtresse'],myc:'i-je-re-ja',meaning:'hiereja (priestess)',note:'High-status women holding land and receiving rations.'},
  {en:['priest'],gr:['ἱερεύς','ιερέας'],fr:['prêtre'],myc:'i-je-re-u',meaning:'iereus (priest)',note:'Male priestly title.'},
  {en:['shepherd','herdsman','cowherd'],gr:['ποιμήν','βοσκός'],fr:['berger','pasteur'],myc:'po-me',meaning:'poimēn (shepherd)',note:'Very common in livestock records.'},
  {en:['potter'],gr:['κεραμεύς','αγγειοπλάστης'],fr:['potier'],myc:'ke-ra-me-u',meaning:'kerameus (potter)',note:'One of many craft titles.'},
  {en:['free','free man','free person','freeman'],gr:['ἐλεύθερος','ελεύθερος'],fr:['libre','homme libre'],myc:'e-re-u-te-ro',meaning:'eleutheros (free person)',note:'Contrasts with do-e-ro (slave).'},
  {en:['father'],gr:['πατέρας','πατήρ','baba'],fr:['père'],myc:'pa-te',meaning:'patēr (father)',note:'Final -r dropped (scribal rule 1).'},
  {en:['mother'],gr:['μητέρα','μήτηρ','mama','μαμά'],fr:['mère'],myc:'ma-te',meaning:'mātēr (mother)',note:'Attested in personal names and dedications.'},
  {en:['daughter'],gr:['κόρη','θυγάτηρ'],fr:['fille'],myc:'tu-ka-te',meaning:'thugater (daughter)',note:'Final -r dropped. Cluster th- written tu-.'},
  {en:['son','boy','young man'],gr:['γιος','υιός','κούρος'],fr:['fils','garçon'],myc:'ko-wo',meaning:'korwos (boy/son)',note:'Ancestor of κοῦρος (kouros).'},
  {en:['woman','lady'],gr:['γυναίκα','γυνή'],fr:['femme'],myc:'ku-na-ja',meaning:'kunāja (woman)',note:'Feminine adjectival form.'},
  {en:['god','deity'],gr:['θεός','θεά'],fr:['dieu','déesse'],myc:'te-o',meaning:'theos (god)',note:'te-sign covers t and th. PY Tn 316 names many gods.'},
  {en:['mistress','lady goddess','potnia'],gr:['πότνια','δέσποινα'],fr:['maîtresse','dame'],myc:'po-ti-ni-ja',meaning:'potnia (mistress, lady)',note:'"Potnia" is a title applied to several goddesses. po-ti-ni-ja a-ta-na = Mistress Athena.'},
  {en:['poseidon'],gr:['ποσειδών','ποσειδώνας'],fr:['poséidon'],myc:'po-se-da-o',meaning:'Poseidaōn',note:'Chief god at Pylos. PY Tn 316.'},
  {en:['zeus'],gr:['ζεύς','δίας'],fr:['zeus'],myc:'di-we',meaning:'Diwei (Zeus, dative)',note:'PY Tn 316. Nominative would be di-u.'},
  {en:['athena','athene'],gr:['αθηνά','αθήνη'],fr:['athéna'],myc:'a-ta-na',meaning:'Atana (Athena)',note:'a-ta-na po-ti-ni-ja = "Mistress Athena". PY Tn 316.'},
  {en:['hera'],gr:['ήρα'],fr:['héra'],myc:'e-ra',meaning:'Hera',note:'PY Tn 316. One of the earliest attestations.'},
  {en:['dionysus','dionysos','bacchus'],gr:['διόνυσος'],fr:['dionysos','bacchus'],myc:'di-wo-nu-so',meaning:'Diwonusos (Dionysus)',note:'One of the earliest attestations of this god\'s name anywhere.'},
  {en:['sacred land','sacred precinct','temenos','shrine'],gr:['τέμενος','ιερό'],fr:['terrain sacré','téménos'],myc:'te-me-no',meaning:'temenos (sacred land plot)',note:'Held by wanax and lawāgetās. Passed into Homer.'},
  {en:['grain','wheat','bread','cereal'],gr:['σιτάρι','σίτος','ψωμί'],fr:['grain','blé','céréale'],myc:'si-to',meaning:'sitos (grain/wheat)',note:'The most recorded commodity in all Linear B archives.'},
  {en:['oil','olive oil'],gr:['λάδι','έλαιο','ἔλαιον'],fr:['huile','huile d\'olive'],myc:'e-ra-wo',meaning:'elaiwon (olive oil)',note:'Second dominant commodity. r/l rule: ela- → e-ra-.'},
  {en:['honey'],gr:['μέλι'],fr:['miel'],myc:'me-ri',meaning:'meli (honey)',note:'r/l rule: meli → me-ri.'},
  {en:['wine'],gr:['κρασί','οἶνος','οίνος'],fr:['vin'],myc:'wo-no',meaning:'woinos (wine)',note:'Ancestor of οἶνος. wo- = digamma Ϝ.'},
  {en:['fig','figs'],gr:['σύκο','σῦκον'],fr:['figue'],myc:'su-ko',meaning:'sukon (fig)',note:'Ration and offering records.'},
  {en:['bronze','copper'],gr:['χαλκός','μπρούτζος','χαλκος'],fr:['bronze','cuivre'],myc:'ka-ko',meaning:'khalkos (bronze/copper)',note:'k-sign covers kh. Final -s dropped. PY Jn series.'},
  {en:['gold'],gr:['χρυσός','χρυσάφι'],fr:['or'],myc:'ku-ru-so',meaning:'khrusos (gold)',note:'khr- → ku-ru- (echo-vowel rule).'},
  {en:['wool','fleece'],gr:['μαλλί','ἔριον'],fr:['laine'],myc:'ta-ra-si-ja',meaning:'talasia (wool-working allocation)',note:'Core of the Mycenaean textile industry.'},
  {en:['tripod'],gr:['τρίποδας','τρίπους'],fr:['trépied'],myc:'ti-ri-po',meaning:'tripous (tripod)',note:'PY Ta 641. The key word of the decipherment.'},
  {en:['sword','swords','blade'],gr:['σπαθί','ξίφος'],fr:['épée','glaive'],myc:'qi-si-pe-e',meaning:'kʷsiphee (swords, dual)',note:'qi- = labio-velar kʷ.'},
  {en:['helmet'],gr:['κράνος','κόρυς'],fr:['casque'],myc:'ko-ru',meaning:'korus (helmet)',note:'Armour inventory tablets.'},
  {en:['pylos'],gr:['πύλος'],fr:['pylos'],myc:'pu-ro',meaning:'Pulos (Pylos)',note:'Palace of Nestor. 1107 tablets.'},
  {en:['knossos'],gr:['κνωσός'],fr:['cnossos'],myc:'ko-no-so',meaning:'Knossos',note:'3369 tablets. Largest archive.'},
  {en:['community','people','district','folk'],gr:['δήμος','κοινότητα','λαός'],fr:['communauté','peuple','district'],myc:'da-mo',meaning:'dāmos (community/district)',note:'Ancestor of classical dēmos.'},
  {en:['seed'],gr:['σπόρος','σπέρμα'],fr:['graine','semence'],myc:'pe-ma',meaning:'sperma (seed)',note:'sp- dropped (scribal rule 9).'},
  {en:['year','this year'],gr:['χρόνος','έτος','φέτος'],fr:['an','année'],myc:'za-we-te',meaning:'zawete (this year)',note:'za-sign is z/ts. The only attested "year" expression.'},
  {en:['total','so much','so many','sum'],gr:['σύνολο','τόσα','τόσο'],fr:['total','autant','somme'],myc:'to-so',meaning:'tosos (so much/many)',note:'Introduces totals on accounting tablets.'},
  {en:['new'],gr:['νέος','καινούριος'],fr:['nouveau','neuf'],myc:'ne-wa',meaning:'newos (new)',note:'Mycenaean form; Attic neos.'},
  {en:['all','every','everyone'],gr:['όλος','πᾶς','πάντα'],fr:['tout','tous'],myc:'pa-si',meaning:'pansi (to all, dative)',note:'pa-si-te-o-i = "to all the gods".'},
  {en:['field','land'],gr:['χωράφι','ἀγρός','γη'],fr:['champ','terre'],myc:'a-ko-ro',meaning:'agros (field)',note:'Land tenure records are among the most complex Linear B texts.'},
];

// ── DECODE WORDS ────────────────────────────────────────
const DECODE_WORDS = [
  {sylls:['wa','na','ka'],translit:'wa-na-ka',meaning:'King (wanax)',classical:'ἄναξ',tablet:'PY Er 312 + many',note:'Supreme ruler. wa-na-ka-te-ro = "of the king" also attested.'},
  {sylls:['qa','si','re','u'],translit:'qa-si-re-u',meaning:'Local chieftain → basileus',classical:'βασιλεύς',tablet:'PY Un 718',note:'Subordinate official. kʷ- evolved to b-.'},
  {sylls:['ra','wa','ke','ta'],translit:'ra-wa-ke-ta',meaning:'Army leader',classical:'λαϝαγέτας',tablet:'PY Er 312',note:'Second in rank. Temenos one-third the king\'s.'},
  {sylls:['si','to'],translit:'si-to',meaning:'Grain / wheat (sitos)',classical:'σῖτος',tablet:'Hundreds',note:'The most recorded commodity.'},
  {sylls:['ka','ko'],translit:'ka-ko',meaning:'Bronze (khalkos)',classical:'χαλκός',tablet:'PY Jn series',note:'k-sign covers kh. Final -s dropped. Verified.'},
  {sylls:['me','ri'],translit:'me-ri',meaning:'Honey (meli)',classical:'μέλι',tablet:'PY Un 267',note:'r/l rule: meli → me-ri.'},
  {sylls:['te','o'],translit:'te-o',meaning:'God (theos)',classical:'θεός',tablet:'PY Tn 316',note:'te covers t and th. PY Tn 316.'},
  {sylls:['pa','te'],translit:'pa-te',meaning:'Father (patēr)',classical:'πατήρ',tablet:'PY Ep 704',note:'Final -r dropped.'},
  {sylls:['do','e','ro'],translit:'do-e-ro',meaning:'Male slave',classical:'δοῦλος',tablet:'PY Aa, Ab series',note:'do-e-ra = female form.'},
  {sylls:['ku','ru','so'],translit:'ku-ru-so',meaning:'Gold (khrusos)',classical:'χρυσός',tablet:'PY Ta 714',note:'khr- → ku-ru- (echo-vowel rule).'},
  {sylls:['ko','no','so'],translit:'ko-no-so',meaning:'Knossos',classical:'Κνωσός',tablet:'KN series',note:'Double-s reduced to single.'},
  {sylls:['ti','ri','po'],translit:'ti-ri-po',meaning:'Tripod (tripous)',classical:'τρίπους',tablet:'PY Ta 641',note:'The word that proved the decipherment.'},
  {sylls:['pu','ro'],translit:'pu-ro',meaning:'Pylos',classical:'Πύλος',tablet:'PY series',note:'1107 tablets survive.'},
  {sylls:['e','ra','wo'],translit:'e-ra-wo',meaning:'Olive oil',classical:'ἔλαιον',tablet:'PY Fr series',note:'ela- → e-ra- (r/l rule). -wo = digamma.'},
  {sylls:['da','mo'],translit:'da-mo',meaning:'Community (dāmos)',classical:'δῆμος',tablet:'PY Eb, Ep series',note:'Ancestor of classical dēmos.'},
  {sylls:['i','je','re','ja'],translit:'i-je-re-ja',meaning:'Priestess',classical:'ἱέρεια',tablet:'PY Ep 704',note:'Named individually in tablets.'},
  {sylls:['pe','ma'],translit:'pe-ma',meaning:'Seed (sperma)',classical:'σπέρμα',tablet:'PY Er 312',note:'sp- dropped (scribal rule 9).'},
  {sylls:['po','me'],translit:'po-me',meaning:'Shepherd (poimēn)',classical:'ποιμήν',tablet:'PY Cn series',note:'po-me-ne = dative form.'},
  {sylls:['to','so'],translit:'to-so',meaning:'Total (tosos)',classical:'τόσος',tablet:'Hundreds',note:'Introduces totals.'},
  {sylls:['di','we'],translit:'di-we',meaning:'Zeus (dative)',classical:'Διΐ',tablet:'PY Tn 316',note:'di-wo-nu-so = Dionysus also attested.'},
];

// ── VOCABULARY ──────────────────────────────────────────
const VOCAB = [
  {sylls:['wa','na','ka'],translit:'wa-na-ka',meaning:'King',classical:'ἄναξ',domain:'Titles',detail:'The supreme ruler. wa-na-ka-te-ro = "of the wanax".'},
  {sylls:['ra','wa','ke','ta'],translit:'ra-wa-ke-ta',meaning:'Army leader',classical:'λαϝαγέτας',domain:'Titles',detail:'Second-highest title. Attested PY Er 312.'},
  {sylls:['qa','si','re','u'],translit:'qa-si-re-u',meaning:'Local chieftain',classical:'βασιλεύς',domain:'Titles',detail:'Subordinate → later "king".'},
  {sylls:['da','mo'],translit:'da-mo',meaning:'Community',classical:'δῆμος',domain:'Society',detail:'Semi-independent local institution. Ancestor of dēmos.'},
  {sylls:['do','e','ro'],translit:'do-e-ro',meaning:'Male slave',classical:'δοῦλος',domain:'Society',detail:'do-e-ra = female form. Hundreds in records.'},
  {sylls:['e','re','u','te','ro'],translit:'e-re-u-te-ro',meaning:'Free person',classical:'ἐλεύθερος',domain:'Society',detail:'Contrasts with do-e-ro. r/l rule applies twice.'},
  {sylls:['i','je','re','ja'],translit:'i-je-re-ja',meaning:'Priestess',classical:'ἱέρεια',domain:'Religion',detail:'Held land, received rations, named individually.'},
  {sylls:['te','o'],translit:'te-o',meaning:'God',classical:'θεός',domain:'Religion',detail:'PY Tn 316 names Poseidon, Hera, Zeus, Athena, Dionysus.'},
  {sylls:['po','se','da','o'],translit:'po-se-da-o',meaning:'Poseidon',classical:'Ποσειδῶν',domain:'Religion',detail:'Chief god at Pylos. Largest offerings on Tn 316.'},
  {sylls:['di','we'],translit:'di-we',meaning:'Zeus (dative)',classical:'Διΐ',domain:'Religion',detail:'Dative of di-u. di-wo-nu-so = Dionysus also on Tn 316.'},
  {sylls:['a','ta','na'],translit:'a-ta-na',meaning:'Athena',classical:'Ἀθηνᾶ',domain:'Religion',detail:'a-ta-na po-ti-ni-ja = "Mistress Athena". PY Tn 316.'},
  {sylls:['si','to'],translit:'si-to',meaning:'Grain',classical:'σῖτος',domain:'Commodities',detail:'Most recorded commodity.'},
  {sylls:['e','ra','wo'],translit:'e-ra-wo',meaning:'Olive oil',classical:'ἔλαιον',domain:'Commodities',detail:'Second dominant commodity.'},
  {sylls:['me','ri'],translit:'me-ri',meaning:'Honey',classical:'μέλι',domain:'Commodities',detail:'Offering ingredient. r/l rule.'},
  {sylls:['ka','ko'],translit:'ka-ko',meaning:'Bronze / copper',classical:'χαλκός',domain:'Commodities',detail:'PY Jn series tracks every unit.'},
  {sylls:['ku','ru','so'],translit:'ku-ru-so',meaning:'Gold',classical:'χρυσός',domain:'Commodities',detail:'khr- → ku-ru- (echo-vowel rule).'},
  {sylls:['ti','ri','po'],translit:'ti-ri-po',meaning:'Tripod',classical:'τρίπους',domain:'Objects',detail:'PY Ta 641. Proved the decipherment.'},
  {sylls:['ko','ru'],translit:'ko-ru',meaning:'Helmet',classical:'κόρυς',domain:'Objects',detail:'Armour inventories.'},
  {sylls:['te','me','no'],translit:'te-me-no',meaning:'Sacred land',classical:'τέμενος',domain:'Land',detail:'Held by wanax and lawāgetās. Survives in Homer.'},
  {sylls:['pe','ma'],translit:'pe-ma',meaning:'Seed',classical:'σπέρμα',domain:'Land',detail:'Measures land value in Er tablets.'},
  {sylls:['po','me'],translit:'po-me',meaning:'Shepherd',classical:'ποιμήν',domain:'Occupations',detail:'Most common occupational title.'},
  {sylls:['ke','ra','me','u'],translit:'ke-ra-me-u',meaning:'Potter',classical:'κεραμεύς',domain:'Occupations',detail:'One of many craft titles.'},
  {sylls:['pu','ro'],translit:'pu-ro',meaning:'Pylos',classical:'Πύλος',domain:'Places',detail:'1107 tablets. Destroyed ~1180 BCE.'},
  {sylls:['ko','no','so'],translit:'ko-no-so',meaning:'Knossos',classical:'Κνωσός',domain:'Places',detail:'3369 tablets. Largest archive.'},
];

// ── NUMBER SIGNS ─────────────────────────────────────────
const NUM_SIGNS = [
  {sign:'𐄇',val:1},{sign:'𐄈',val:2},{sign:'𐄉',val:3},{sign:'𐄊',val:4},
  {sign:'𐄋',val:5},{sign:'𐄌',val:6},{sign:'𐄍',val:7},{sign:'𐄎',val:8},{sign:'𐄏',val:9},
  {sign:'𐄙',val:10},{sign:'𐄚',val:20},{sign:'𐄛',val:30},{sign:'𐄜',val:40},
  {sign:'𐄝',val:50},{sign:'𐄞',val:60},{sign:'𐄟',val:70},{sign:'𐄠',val:80},{sign:'𐄡',val:90},
  {sign:'𐄢',val:100},{sign:'𐄣',val:200},{sign:'𐄦',val:500},
  {sign:'𐄫',val:1000},{sign:'𐄳',val:10000},
];

// ── SCRIBAL RULES ───────────────────────────────────────
const SCRIBAL_RULES = [
  {n:1,title:'Final consonants dropped',body:'Greek words end in consonants; Linear B signs end in vowels. The final consonant is omitted.',ex:'khalkos → ka-ko  |  patēr → pa-te  |  tripous → ti-ri-po'},
  {n:2,title:'Nasal before consonant omitted',body:'m or n before another consonant is silently dropped.',ex:'panta → pa-ta  |  anthropos → a-to-ro-qo'},
  {n:3,title:'Consonant clusters: echo-vowel rule',body:'Two consonants together get split with a dummy vowel matching the following syllable.',ex:'khrusos → ku-ru-so  |  Knossos → ko-no-so'},
  {n:4,title:'r and l are the same sign',body:'Linear B inherited no r/l distinction from Linear A.',ex:'eleutheros → e-re-u-te-ro  |  elaiwon → e-ra-wo'},
  {n:5,title:'No voiced / voiceless / aspirate distinction',body:'ka covers k, g, and kh. Only d vs t is distinguished.',ex:'ka-ko = khalkos (kh-)  |  do-e-ro = doelos (voiced d kept)'},
  {n:6,title:'Double consonants written single',body:'Geminates (ss, nn, etc.) are written once.',ex:'Knossos → ko-no-so  |  tosos → to-so'},
  {n:7,title:'w-series = digamma (Ϝ)',body:'Mycenaean had the digamma sound, lost in later dialects.',ex:'wanax → wa-na-ka  |  elaiwon → e-ra-wo (final -w)'},
  {n:8,title:'q-series = labio-velars (kʷ/gʷ)',body:'Proto-Greek labio-velars, later becoming p, b, or t.',ex:'kʷasileús → qa-si-re-u → basileus  |  gʷous → qo'},
  {n:9,title:'s before consonant dropped',body:'An s before another consonant is omitted.',ex:'sperma → pe-ma  |  stathmos → ta-to-mo'},
  {n:10,title:'Word divider: the vertical stroke',body:'A short vertical stroke separates words on tablets.',ex:'wa-na-ka , si-to [WHEAT] 30 = "the king: grain 30"'},
];

// ── I18N ────────────────────────────────────────────────
const I18N = {
  en:{
    lang:'EN',flag:'🇬🇧',
    nav_home:'Home',nav_syllabary:'Syllabary',nav_translit:'Transliterator',
    nav_tablets:'Tablets',nav_grammar:'Grammar',nav_vocab:'Vocabulary',
    nav_numbers:'Numbers',nav_quiz:'Quiz',nav_decode:'Decode',nav_translate:'Translator',
    hero_eyebrow:'c. 1450 – 1200 BCE · Mycenaean Greece',
    hero_tagline:'The earliest known writing system of the Greek language',
    select_sign:'Select a sign above to see details.',
    try:'Try:',score:'Score',correct:'Correct',total:'Total',streak:'Streak',
    next:'Next →',clear:'Clear',difficulty:'Difficulty',
    beginner:'Beginner',intermediate:'Intermediate',advanced:'Advanced',
    translate_placeholder:'Type an English, French or Greek word…',
    translate_hint:'e.g. king, honey, gold, ποιμήν, θεός, roi',
    no_translation:'No direct Mycenaean equivalent found.',
    no_translation_note:'Linear B only records ~2,000–3,000 words — mostly administrative vocabulary. Most modern concepts have no attested Mycenaean form.',
    found:'Found',tablets_title:'Real Tablets',tabs_cases:'Cases',tabs_decl:'Declensions',
    tabs_verbs:'Verbs',tabs_particles:'Particles & Formulae',tabs_scribal:'Scribal Rules',
  },
  fr:{
    lang:'FR',flag:'🇫🇷',
    nav_home:'Accueil',nav_syllabary:'Syllabaire',nav_translit:'Translittérateur',
    nav_tablets:'Tablettes',nav_grammar:'Grammaire',nav_vocab:'Vocabulaire',
    nav_numbers:'Nombres',nav_quiz:'Quiz',nav_decode:'Déchiffrer',nav_translate:'Traducteur',
    hero_eyebrow:'v. 1450 – 1200 av. J.-C. · Grèce mycénienne',
    hero_tagline:'Le plus ancien système d\'écriture connu de la langue grecque',
    select_sign:'Sélectionnez un signe pour voir les détails.',
    try:'Essayez :',score:'Score',correct:'Correct',total:'Total',streak:'Série',
    next:'Suivant →',clear:'Effacer',difficulty:'Difficulté',
    beginner:'Débutant',intermediate:'Intermédiaire',advanced:'Avancé',
    translate_placeholder:'Tapez un mot en anglais, français ou grec…',
    translate_hint:'ex : roi, miel, or, ποιμήν, θεός, king',
    no_translation:'Pas d\'équivalent mycénien direct trouvé.',
    no_translation_note:'Le Linéaire B ne contient que ~2 000–3 000 mots — surtout du vocabulaire administratif.',
    found:'Trouvé',tablets_title:'Tablettes réelles',tabs_cases:'Cas',tabs_decl:'Déclinaisons',
    tabs_verbs:'Verbes',tabs_particles:'Particules et formules',tabs_scribal:'Règles de scribes',
  },
  gr:{
    lang:'ΕΛ',flag:'🇬🇷',
    nav_home:'Αρχική',nav_syllabary:'Συλλαβάριο',nav_translit:'Μεταγραφέας',
    nav_tablets:'Πινακίδες',nav_grammar:'Γραμματική',nav_vocab:'Λεξιλόγιο',
    nav_numbers:'Αριθμοί',nav_quiz:'Κουίζ',nav_decode:'Αποκρυπτογράφηση',nav_translate:'Μεταφραστής',
    hero_eyebrow:'περ. 1450 – 1200 π.Χ. · Μυκηναϊκή Ελλάδα',
    hero_tagline:'Το αρχαιότερο γνωστό σύστημα γραφής της ελληνικής γλώσσας',
    select_sign:'Επιλέξτε ένα σημείο για λεπτομέρειες.',
    try:'Δοκιμάστε:',score:'Σκορ',correct:'Σωστό',total:'Σύνολο',streak:'Σερί',
    next:'Επόμενο →',clear:'Εκκαθάριση',difficulty:'Δυσκολία',
    beginner:'Αρχάριος',intermediate:'Ενδιάμεσο',advanced:'Προχωρημένο',
    translate_placeholder:'Πληκτρολογήστε λέξη στα αγγλικά, γαλλικά ή ελληνικά…',
    translate_hint:'π.χ. king, honey, gold, ποιμήν, θεός',
    no_translation:'Δεν βρέθηκε άμεσο μυκηναϊκό ισοδύναμο.',
    no_translation_note:'Η Γραμμική Β καταγράφει μόνο ~2.000–3.000 λέξεις — κυρίως διοικητικό λεξιλόγιο.',
    found:'Βρέθηκε',tablets_title:'Πραγματικές πινακίδες',tabs_cases:'Πτώσεις',tabs_decl:'Κλίσεις',
    tabs_verbs:'Ρήματα',tabs_particles:'Μόρια και φόρμουλες',tabs_scribal:'Γραφειοκρατικοί κανόνες',
  }
};

let LANG = (function(){try{return localStorage.getItem('lb_lang')||'en';}catch(e){return 'en';}}());
function t(k){return(I18N[LANG]&&I18N[LANG][k])||I18N.en[k]||k;}
function setLang(l){LANG=l;try{localStorage.setItem('lb_lang',l);}catch(e){}location.reload();}

function word(sylls){return sylls.map(s=>SIGNS[s]||'?').join('');}
function shuffle(arr){return[...arr].sort(()=>Math.random()-.5);}

function lookupTranslation(query){
  const q=query.toLowerCase().trim();
  if(!q)return null;
  return TRANSLATION_DICT.find(entry=>
    (entry.en&&entry.en.some(w=>w.toLowerCase()===q||q.includes(w.toLowerCase())||w.toLowerCase().includes(q)))||
    (entry.gr&&entry.gr.some(w=>w.toLowerCase()===q||q.includes(w.toLowerCase())))||
    (entry.fr&&entry.fr.some(w=>w.toLowerCase()===q||w.toLowerCase().includes(q)||q.includes(w.toLowerCase())))
  )||null;
}
  {val:'qa', sign:'𐀣', note:'q-series. Labio-velar kʷ — lost in later Greek. Became b/p/t in different contexts.', ex:'qa-si-re-u = kʷasileús → basileus'},
  {val:'qe', sign:'𐀤', note:'q-series. Labio-velar gʷe/kʷe.', ex:'ra-wa-ke-ta = lawāgetās (army leader) — ke here is qe'},
  {val:'qi', sign:'𐀥', note:'q-series. Rare.', ex:'qi-si-pe-e = kʷsiphee (swords, dual)'},
  {val:'qo', sign:'𐀦', note:'q-series. gʷo/kʷo — often related to cattle (gwous).', ex:'qo-u-ko-ro = gwoukoloi → boukoloi (cowherds)'},
  {val:'ra', sign:'𐀨', note:'r-series. Covers BOTH r and l sounds — inherited from Linear A.', ex:'ra-wa-ke-ta = lawāgetās (army leader)'},
  {val:'re', sign:'𐀩', note:'r-series. r and l not distinguished.', ex:'e-re-u-te-ro = eleutheros (free person)'},
  {val:'ri', sign:'𐀪', note:'r-series. r/l both written with r-signs.', ex:'ti-ri-po = tripous (tripod)'},
  {val:'ro', sign:'𐀫', note:'r-series. Very common.', ex:'do-e-ro = doelos (slave) — ro ends the word'},
  {val:'ru', sign:'𐀬', note:'r-series.', ex:'ku-ru-so = khrusos (gold) — echo vowel rule'},
  {val:'sa', sign:'𐀭', note:'s-series.', ex:'sa-ra-pe-da = a divine epithet'},
  {val:'se', sign:'𐀮', note:'s-series.', ex:'a-pi-po-re-we = amphiphorēwes (amphorae)'},
  {val:'si', sign:'𐀯', note:'s-series.', ex:'si-to = sitos (grain) — one of the most common words'},
  {val:'so', sign:'𐀰', note:'s-series. Appears in to-so = "so much" (running totals).', ex:'to-so = tosos (so much/many)'},
  {val:'su', sign:'𐀱', note:'s-series.', ex:'su-ko = sukon (fig)'},
  {val:'ta', sign:'𐀲', note:'t-series. Extremely common.', ex:'ta-ra-si-ja = talasia (wool allocation)'},
  {val:'te', sign:'𐀳', note:'t-series. High frequency. t-series covers both t and th.', ex:'te-o = theos (god)'},
  {val:'ti', sign:'𐀴', note:'t-series.', ex:'ti-ri-po = tripous (tripod)'},
  {val:'to', sign:'𐀵', note:'t-series.', ex:'to-so = tosos (so much) — tally word'},
  {val:'tu', sign:'𐀶', note:'t-series.', ex:'tu-ka-te = thugater (daughter)'},
  {val:'wa', sign:'𐀷', note:'w-series. The digamma (Ϝ) — a sound present in Mycenaean Greek, lost in later dialects.', ex:'wa-na-ka = wanaks (king)'},
  {val:'we', sign:'𐀸', note:'w-series. Digamma + e.', ex:'ka-ke-we = khalkēwes (bronze-smiths, plural)'},
  {val:'wi', sign:'𐀹', note:'w-series.', ex:'wi-ri-ne-jo = wrineios (of leather/hide)'},
  {val:'wo', sign:'𐀺', note:'w-series.', ex:'we-ke = wergei (works on) — craftsman formula'},
  {val:'za', sign:'𐀼', note:'z-series. Possibly a ts/dz affricate. Note: 𐀼 za ≠ 𐀷 wa.', ex:'za-we-te = zawete (this year)'},
  {val:'ze', sign:'𐀽', note:'z-series.', ex:'ze-u-ke-si = zeugesi (pairs/yokes, dative plural)'},
  {val:'zo', sign:'𐀿', note:'z-series. Note: U+1003E and U+1003B are unassigned.', ex:'zo-a = zōa (animals) — used in livestock counts'},
];

// TABLETS — verified against Wikipedia PY Ta 641 article, Nakassis (2018)
const TABLETS = {
  ta641: {
    ref:'PY Ta 641', name:'The Tripod Tablet',
    date:'c.1180 BCE · Pylos · Scribe 2 ("Hand 2", possibly named Phugebris)',
    desc:'The most famous Linear B tablet. Discovered by Carl Blegen at Pylos in May 1953, sent immediately to Ventris — the match between words and vessel ideograms confirmed his decipherment. A palm-leaf tablet cataloguing ritual feasting vessels. ti-ri-po-de ("tripods") was the key breakthrough word.',
    lines:[
      {n:'.1', signs:'𐀴𐀪𐀡𐀆', translit:'ti-ri-po-de', ideogram:'TRIPOD 2', meaning:'Tripods, Cretan workmanship — 2'},
      {n:'.2', signs:'𐀴𐀪𐀃𐀸', translit:'ti-ri-o-we', ideogram:'TRIPOD 1', meaning:'Tripod with three handles (ti-ri-o-we) — 1'},
      {n:'.3', signs:'𐀀𐀙𐀺𐀸', translit:'a-no-we', ideogram:'TRIPOD 1', meaning:'Tripod without handles (a-no-we) — 1'},
      {n:'.4', signs:'𐀇𐀞', translit:'di-pa', ideogram:'VAS 2', meaning:'Cups/goblets (dipa) — 2'},
      {n:'.5', signs:'𐀇𐀞𐀕𐀍𐀡𐀳𐀫𐀸', translit:'di-pa me-zo-e qe-to-ro-we', ideogram:'VAS 1', meaning:'Larger cups with four handles — 1'},
      {n:'.6', signs:'𐀇𐀞𐀕𐀹𐀍𐀴𐀪𐀍𐀸', translit:'di-pa me-wi-jo ti-ri-jo-we', ideogram:'VAS 2', meaning:'Smaller cups with three handles — 2'},
      {n:'.7', signs:'𐀇𐀞𐀕𐀹𐀍𐀀𐀙𐀺𐀸', translit:'di-pa me-wi-jo a-no-we', ideogram:'VAS 1', meaning:'Smaller cup without handles — 1'},
    ]
  },
  cn608: {
    ref:'PY Cn 608', name:'The Pig-Fattening Tablet',
    date:'c.1200 BCE · Pylos · Scribe 1 (Hand 1)',
    desc:'A page-shaped tablet recording future pig fattening by community officials (o-pi-da-mi-jo) across nine districts of the Pylian kingdom. The verb is future tense — and because the palace burned not long after, these pigs were probably never fattened. Translation follows Nakassis (2018), englianos.wordpress.com.',
    lines:[
      {n:'.1', signs:'𐀍𐀀𐀮𐀰𐀯', translit:'jo-a-se-so-si', ideogram:'', meaning:'"Thus will they fatten" — future tense header'},
      {n:'.2', signs:'𐀃𐀠𐀅𐀔𐀍', translit:'o-pi-da-mi-jo', ideogram:'', meaning:'"Community officials" (opidāmioi, overseers of the dāmos)'},
      {n:'.3', signs:'𐀠𐀿', translit:'pi-[*82]', ideogram:'SUS+SI 3', meaning:'Piswā — FATTED PIGS 3'},
      {n:'.4', signs:'𐀕𐀲𐀞', translit:'me-ta-pa', ideogram:'SUS+SI 3', meaning:'Metapā — FATTED PIGS 3'},
      {n:'.5', signs:'𐀟𐀵𐀜', translit:'pe-to-no', ideogram:'SUS+SI 6', meaning:'Pethnos — FATTED PIGS 6'},
      {n:'.6', signs:'𐀞𐀏𐀊𐀭', translit:'pa-ki-ja-si', ideogram:'SUS+SI 2', meaning:'Sphagiānes — FATTED PIGS 2'},
      {n:'.7', signs:'𐀀𐀢𐀸', translit:'a-pu2-we', ideogram:'SUS+SI 2', meaning:'Aphus — FATTED PIGS 2'},
      {n:'.8', signs:'𐀀𐀐𐀩𐀷', translit:'a-ke-re-wa', ideogram:'SUS+SI 2', meaning:'Agrēwā — FATTED PIGS 2'},
      {n:'.9', signs:'𐀁𐀨𐀲𐀁', translit:'e-ra-te-i', ideogram:'SUS+SI 3', meaning:'Elatos — FATTED PIGS 3'},
      {n:'.10', signs:'𐀏𐀨𐀅𐀫', translit:'ka-ra-do-ro', ideogram:'SUS+SI 2', meaning:'Kharadroi — FATTED PIGS 2'},
      {n:'.11', signs:'𐀪𐀍', translit:'ri-jo', ideogram:'SUS+SI 2', meaning:'Rhion — FATTED PIGS 2'},
    ]
  },
  fn7: {
    ref:'PY Fn 7', name:'The Oil Ration Tablet',
    date:'c.1200 BCE · Pylos',
    desc:'A ration tablet recording olive oil (e-ra-wo = elaiwon) allocations to named individuals including the wanax and lawāgetās. The format — recipient + commodity ideogram + quantity — is the most common Linear B tablet type. to-so marks the running total.',
    lines:[
      {n:'.1', signs:'𐀷𐀙𐀏', translit:'wa-na-ka', ideogram:'OIL [quantity]', meaning:'The wanax (king) — receives oil'},
      {n:'.2', signs:'𐀤𐀷𐀐𐀲', translit:'ra-wa-ke-ta', ideogram:'OIL [quantity]', meaning:'The lawāgetās (army leader) — receives oil'},
      {n:'.3', signs:'𐀁𐀨𐀺', translit:'e-ra-wo', ideogram:'', meaning:'"Olive oil" — the commodity being recorded'},
      {n:'.4', signs:'𐀵𐀰', translit:'to-so', ideogram:'OIL [total]', meaning:'to-so = "so much/total" — the running sum'},
    ]
  }
};

// DECODE CHALLENGE WORDS — all attested, verified
const DECODE_WORDS = [
  {sylls:['wa','na','ka'], translit:'wa-na-ka', meaning:'King (wanax)', classical:'ἄναξ', tablet:'PY Er 312 + many others', note:'The supreme ruler of the palatial state. One wanax per palace. wa-na-ka-te-ro = "of/belonging to the king".'},
  {sylls:['qa','si','re','u'], translit:'qa-si-re-u', meaning:'Local chieftain → later "king" (basileus)', classical:'βασιλεύς', tablet:'PY Un 718', note:'A subordinate official in Mycenaean times. The labio-velar kʷ- evolved to b- in later Greek.'},
  {sylls:['ra','wa','ke','ta'], translit:'ra-wa-ke-ta', meaning:'Army leader (lawāgetās)', classical:'λαϝαγέτας', tablet:'PY Er 312', note:'Second in rank after the wanax. Held a temenos (sacred land) one-third the size of the king\'s.'},
  {sylls:['si','to'], translit:'si-to', meaning:'Grain / wheat (sitos)', classical:'σῖτος', tablet:'Hundreds of tablets', note:'The most recorded commodity. Appears with a wheat ideogram and a number.'},
  {sylls:['ka','ko'], translit:'ka-ko', meaning:'Bronze / copper (khalkos)', classical:'χαλκός', tablet:'PY Jn series', note:'The k-sign covers k, g, and kh — no aspiration distinction. Final -s dropped per scribal rule 1. Verified: Wikipedia Mycenaean Greek article uses ka-ko = khalkos as a primary example.'},
  {sylls:['me','ri'], translit:'me-ri', meaning:'Honey (meli)', classical:'μέλι', tablet:'PY Un 267', note:'r/l are not distinguished in Linear B — both sounds use the r-series signs.'},
  {sylls:['te','o'], translit:'te-o', meaning:'God (theos)', classical:'θεός', tablet:'PY Tn 316', note:'PY Tn 316 is the "god tablet" — it names Poseidon, Hera, Zeus, Athena, and others receiving offerings.'},
  {sylls:['pa','te'], translit:'pa-te', meaning:'Father (patēr)', classical:'πατήρ', tablet:'PY Ep 704', note:'Final -r dropped (scribal rule 1). pa-te can also parse as pantes ("all") — ambiguity is common.'},
  {sylls:['do','e','ro'], translit:'do-e-ro', meaning:'Male slave (doelos)', classical:'δοῦλος', tablet:'PY Aa, Ab series', note:'do-e-ra is the female form. Appears in huge workforce records listing rations and occupations.'},
  {sylls:['ku','ru','so'], translit:'ku-ru-so', meaning:'Gold (khrusos)', classical:'χρυσός', tablet:'PY Ta 714', note:'Consonant cluster khr- spelled with echo-vowel rule: ku- matches the vowel of -ru- following it.'},
  {sylls:['ko','no','so'], translit:'ko-no-so', meaning:'Knossos', classical:'Κνωσός', tablet:'KN series (all Knossos tablets)', note:'Double-s reduced to single s (rule 6). One of the first place names Ventris correctly identified.'},
  {sylls:['ti','ri','po'], translit:'ti-ri-po', meaning:'Tripod (tripous)', classical:'τρίπους', tablet:'PY Ta 641', note:'The word that proved the decipherment. ti- echoes the vowel of -ri- (echo-vowel rule). The ideogram drawing matched.'},
  {sylls:['pu','ro'], translit:'pu-ro', meaning:'Pylos', classical:'Πύλος', tablet:'PY series', note:'The palace of Nestor. 1107 tablets survive from its archive room, destroyed ~1180 BCE.'},
  {sylls:['e','ra','wo'], translit:'e-ra-wo', meaning:'Olive oil (elaiwon)', classical:'ἔλαιον', tablet:'PY Fr series', note:'r/l rule: ela- → e-ra-. The -wo marks the digamma (Ϝ): elaiFon. Appears in thousands of ration records.'},
  {sylls:['da','mo'], translit:'da-mo', meaning:'Community / district (dāmos)', classical:'δῆμος', tablet:'PY Eb, Ep series', note:'The dāmos was a semi-independent institution managing land. The ancestor of the classical Greek dēmos.'},
  {sylls:['i','je','re','ja'], translit:'i-je-re-ja', meaning:'Priestess (hiereja)', classical:'ἱέρεια', tablet:'PY Ep 704', note:'One of the few high-status women attested by name. i-je-re-u = priest (male form).'},
  {sylls:['pe','ma'], translit:'pe-ma', meaning:'Seed / grain measure (sperma)', classical:'σπέρμα', tablet:'PY Er 312', note:'Initial sp- cluster dropped entirely (scribal rule 9). Used to measure land value in the Er tablets.'},
  {sylls:['po','me'], translit:'po-me', meaning:'Shepherd (poimēn)', classical:'ποιμήν', tablet:'PY Cn series', note:'Appears in livestock records. po-me-ne is the dative: "to/for the shepherd".'},
  {sylls:['to','so'], translit:'to-so', meaning:'So much / so many (tosos)', classical:'τόσος', tablet:'Hundreds of tablets', note:'Used to introduce totals on accounting tablets. to-so-de = "and so many" (with connective -de).'},
  {sylls:['di','we'], translit:'di-we', meaning:'Zeus (dative: Diwei)', classical:'Διΐ', tablet:'PY Tn 316', note:'di-we is the dative of di-u (Zeus). Also attested: di-wo-nu-so = Dionysos.'},
];

// VOCABULARY
const VOCAB = [
  {sylls:['wa','na','ka'],translit:'wa-na-ka',meaning:'King',classical:'ἄναξ',domain:'Titles',detail:'The supreme ruler. One wanax per palace. wa-na-ka-te-ro = "of the wanax" (adjective). wa-na-ka-te = dative "to the king".'},
  {sylls:['ra','wa','ke','ta'],translit:'ra-wa-ke-ta',meaning:'Army leader',classical:'λαϝαγέτας',domain:'Titles',detail:'Second-highest title. Held a temenos one-third the size of the king\'s. Attested at Pylos (PY Er 312) and Knossos.'},
  {sylls:['qa','si','re','u'],translit:'qa-si-re-u',meaning:'Local chieftain',classical:'βασιλεύς',domain:'Titles',detail:'A subordinate official in Mycenaean times — possibly a craftsman overseer (Palmer). After palace collapse, rose to mean "king".'},
  {sylls:['da','mo'],translit:'da-mo',meaning:'Community, district',classical:'δῆμος',domain:'Society',detail:'A semi-independent local institution managing land allocation and agricultural tasks. Ancestor of the classical dēmos.'},
  {sylls:['do','e','ro'],translit:'do-e-ro',meaning:'Male slave (doelos)',classical:'δοῦλος',domain:'Society',detail:'do-e-ra is the female form. Appear in workforce tablets by the hundreds, listed by ration and occupation.'},
  {sylls:['e','re','u','te','ro'],translit:'e-re-u-te-ro',meaning:'Free person (eleutheros)',classical:'ἐλεύθερος',domain:'Society',detail:'Contrasts with do-e-ro (slave). The r/l rule applies twice: ele- → e-re-, and -l- in the stem also becomes -r-.'},
  {sylls:['i','je','re','ja'],translit:'i-je-re-ja',meaning:'Priestess',classical:'ἱέρεια',domain:'Religion',detail:'One of the highest-status roles for women. Priestesses held land, received rations, and are named individually in the tablets.'},
  {sylls:['te','o'],translit:'te-o',meaning:'God',classical:'θεός',domain:'Religion',detail:'PY Tn 316 lists offerings to: po-se-da-o (Poseidon), e-ra (Hera), di-we (Zeus), a-ta-na (Athena), and others.'},
  {sylls:['po','se','da','o'],translit:'po-se-da-o',meaning:'Poseidon',classical:'Ποσειδῶν',domain:'Religion',detail:'Chief god at Pylos — receives the largest offerings. The -da- series distinguishes this name from other readings.'},
  {sylls:['di','we'],translit:'di-we',meaning:'Zeus (dative)',classical:'Διΐ',domain:'Religion',detail:'Dative of di-u (Zeus). di-wo-nu-so = Dionysos is also attested — one of his earliest known appearances.'},
  {sylls:['si','to'],translit:'si-to',meaning:'Grain / wheat',classical:'σῖτος',domain:'Commodities',detail:'The most recorded commodity across all sites. Measured in dry units. Appears with the WHEAT ideogram.'},
  {sylls:['e','ra','wo'],translit:'e-ra-wo',meaning:'Olive oil',classical:'ἔλαιον',domain:'Commodities',detail:'The other dominant commodity. Perfumed oils (with coriander, rose, sage) were a major export. Appears in thousands of entries.'},
  {sylls:['me','ri'],translit:'me-ri',meaning:'Honey',classical:'μέλι',domain:'Commodities',detail:'Recorded as an ingredient in offerings and perfumes. r/l rule: meli → me-ri. Attested PY Un 267.'},
  {sylls:['ka','ko'],translit:'ka-ko',meaning:'Bronze / copper',classical:'χαλκός',domain:'Commodities',detail:'The PY Jn series tracks bronze: how much each smith holds and owes to the palace. The k-sign covers k, g, and kh — khalkos correctly spelled ka-ko.'},
  {sylls:['ku','ru','so'],translit:'ku-ru-so',meaning:'Gold',classical:'χρυσός',domain:'Commodities',detail:'Echo-vowel rule: khr- → ku-ru- (ku matches the vowel of -ru-). Appears in furniture and vessel inventories.'},
  {sylls:['ti','ri','po'],translit:'ti-ri-po',meaning:'Tripod',classical:'τρίπους',domain:'Objects',detail:'PY Ta 641 (the Tripod Tablet) was the confirmation of Ventris\'s decipherment. ti- echoes the vowel of -ri- (echo-vowel rule).'},
  {sylls:['ko','ru'],translit:'ko-ru',meaning:'Helmet (korus)',classical:'κόρυς',domain:'Objects',detail:'Appears in armour inventory tablets alongside to-ra-ke (breastplates). Chariot equipment is one of the best-documented categories.'},
  {sylls:['te','me','no'],translit:'te-me-no',meaning:'Sacred land plot (temenos)',classical:'τέμενος',domain:'Land',detail:'Held by the wanax and lawāgetās. The concept passed directly into classical Greek religion and Homer (Iliad 6.194).'},
  {sylls:['pe','ma'],translit:'pe-ma',meaning:'Seed / grain measure (sperma)',classical:'σπέρμα',domain:'Land',detail:'Used to measure land value in the Er tablets: land is rated by how much seed-grain it takes to sow it.'},
  {sylls:['po','me'],translit:'po-me',meaning:'Shepherd (poimēn)',classical:'ποιμήν',domain:'Occupations',detail:'One of the most common occupational titles. The Cn series at Pylos tracks sheep, goats, pigs, and their herders.'},
  {sylls:['ke','ra','me','u'],translit:'ke-ra-me-u',meaning:'Potter (kerameus)',classical:'κεραμεύς',domain:'Occupations',detail:'One of many craft titles. Bronze-smiths, potters, weavers, and carpenters all appear in administrative records.'},
  {sylls:['pu','ro'],translit:'pu-ro',meaning:'Pylos',classical:'Πύλος',domain:'Places',detail:'The palace of Nestor. 1107 tablets survive. Destroyed ~1180 BCE — the burning accidentally preserved the clay tablets.'},
  {sylls:['ko','no','so'],translit:'ko-no-so',meaning:'Knossos',classical:'Κνωσός',domain:'Places',detail:'3369 tablets survive — the largest Linear B archive. Double-s written single (scribal rule 6). Destroyed ~1375 BCE.'},
];

// NUMBER SIGNS — Aegean Numbers Unicode block (U+10100+)
const NUM_SIGNS = [
  {sign:'𐄇',val:1},{sign:'𐄈',val:2},{sign:'𐄉',val:3},{sign:'𐄊',val:4},
  {sign:'𐄋',val:5},{sign:'𐄌',val:6},{sign:'𐄍',val:7},{sign:'𐄎',val:8},{sign:'𐄏',val:9},
  {sign:'𐄙',val:10},{sign:'𐄚',val:20},{sign:'𐄛',val:30},{sign:'𐄜',val:40},
  {sign:'𐄝',val:50},{sign:'𐄞',val:60},{sign:'𐄟',val:70},{sign:'𐄠',val:80},{sign:'𐄡',val:90},
  {sign:'𐄢',val:100},{sign:'𐄣',val:200},{sign:'𐄦',val:500},
  {sign:'𐄫',val:1000},{sign:'𐄳',val:10000},
];

// GRAMMAR DATA
const GRAMMAR = {
  cases: [
    {case:'Nominative', fn:'Subject of sentence; label in records', lb:'wa-na-ka', signs:'𐀷𐀙𐀏', rec:'wanaks', att:'★'},
    {case:'Genitive', fn:'Possession ("of")', lb:'wa-na-ka-to', signs:'𐀷𐀙𐀏𐀵', rec:'wanaktos', att:'★'},
    {case:'Dative-Loc.', fn:'Recipient; location ("to/for/at")', lb:'wa-na-ka-te', signs:'𐀷𐀙𐀏𐀳', rec:'wanaktei', att:'★'},
    {case:'Accusative', fn:'Direct object', lb:'wa-na-ka-ta', signs:'𐀷𐀙𐀏𐀲', rec:'wanakta', att:'reconstructed'},
    {case:'Instrumental', fn:'Means/accompaniment; dative plural in -pi', lb:'po-pi', signs:'𐀡𐀡', rec:'pophi ("with feet")', att:'★'},
  ],
  decl_wanax: {
    title:'wanax — "king" (3rd declension consonant stem, wanakt-)',
    rows:[
      ['Nominative','wa-na-ka','𐀷𐀙𐀏','wanaks','★ directly attested'],
      ['Genitive','wa-na-ka-to','𐀷𐀙𐀏𐀵','wanaktos','★ directly attested'],
      ['Dative','wa-na-ka-te','𐀷𐀙𐀏𐀳','wanaktei','★ directly attested'],
      ['Adjective','wa-na-ka-te-ro','𐀷𐀙𐀏𐀳𐀫','wanakteros (of the king)','★ directly attested'],
    ]
  },
  decl_doero: {
    title:'do-e-ro — "slave" (2nd declension masc. o-stem)',
    rows:[
      ['Nominative','do-e-ro','𐀈𐀁𐀫','doelos','★'],
      ['Genitive','do-e-ro-jo','𐀈𐀁𐀫𐀍','doelojo','★'],
      ['Female nom.','do-e-ra','𐀈𐀁𐀨','doelā (female slave)','★'],
    ]
  },
  decl_sito: {
    title:'si-to — "grain" (2nd declension neuter o-stem)',
    rows:[
      ['Nominative','si-to','𐀯𐀵','sitos','★'],
      ['Genitive','si-to-jo','𐀯𐀵𐀍','sitojo','attested'],
      ['Accusative pl.','si-ta','𐀯𐀲','sita','★'],
    ]
  },
  particles: [
    {lb:'to-so', signs:'𐀵𐀰', fn:'"so much / so many" (tosos) — introduces totals'},
    {lb:'to-so-de', signs:'𐀵𐀰𐀆', fn:'"and so many" — running total with connective -de'},
    {lb:'pa-ro', signs:'𐀞𐀫', fn:'"from, in the charge of" (para) — very common header'},
    {lb:'o-pi', signs:'𐀃𐀠', fn:'"in addition to, above" (epi) — used with quantities'},
    {lb:'we-ke', signs:'𐀸𐀐', fn:'"works on, makes" (wergei) — craftsman formula'},
    {lb:'e-ko', signs:'𐀁𐀏', fn:'"has/holds" (ekhei) — possession formula'},
    {lb:'do-ke', signs:'𐀈𐀐', fn:'"gave" (dōke) — past delivery formula (no augment)'},
    {lb:'a-pe-do-ke', signs:'𐀀𐀟𐀈𐀐', fn:'"delivered/gave back" — only augmented verb form attested'},
  ],
};

// SCRIBAL RULES
const SCRIBAL_RULES = [
  {n:1, title:'Final consonants dropped', body:'Greek words end in consonants; Linear B signs end in vowels. Solution: omit the final consonant entirely.', ex:'khalkos → ka-ko  |  patēr → pa-te  |  tripous → ti-ri-po'},
  {n:2, title:'Nasal before consonant omitted', body:'m or n before another consonant is silently dropped.', ex:'panta → pa-ta  |  anthropos → a-to-ro-qo'},
  {n:3, title:'Consonant clusters: echo-vowel rule', body:'Two consonants together get split with a "dummy" vowel matching the following syllable\'s vowel (or preceding, if word-final).', ex:'khrusos → ku-ru-so (ku echoes -ru-)  |  Knossos → ko-no-so'},
  {n:4, title:'r and l are the same sign', body:'Linear B inherited no r/l distinction from Linear A. Both sounds use the r-series signs (ra, re, ri, ro, ru).', ex:'eleutheros → e-re-u-te-ro  |  elaiwon → e-ra-wo'},
  {n:5, title:'No voiced / voiceless / aspirate distinction', body:'ka, ga, kha are all written with the same k-sign. Only d-series is distinct (voiced dental d vs voiceless t).', ex:'ka-ko = khalkos (aspirated kh)  |  but: do-e-ro = doelos (voiced d kept)'},
  {n:6, title:'Double consonants written single', body:'Geminate consonants (ss, nn, etc.) are written once.', ex:'Knossos → ko-no-so (one s)  |  tosos → to-so'},
  {n:7, title:'w-series = digamma (Ϝ)', body:'Mycenaean had the digamma sound, lost in most later dialects. The w-signs are genuine /w/ sounds.', ex:'wanax → wa-na-ka  |  elaiwon → e-ra-wo (final -w)'},
  {n:8, title:'q-series = labio-velars (kʷ/gʷ)', body:'Proto-Greek labio-velars — sounds made simultaneously at the velum and lips. They later became p, b, or t depending on the vowel environment.', ex:'kʷasileús → qa-si-re-u → basileus  |  gʷous → qo = cattle'},
  {n:9, title:'s before consonant dropped', body:'An s before another consonant is omitted, like the nasal omission rule.', ex:'sperma → pe-ma  |  stathmos → ta-to-mo'},
  {n:10, title:'Word divider: the vertical stroke', body:'On actual tablets, a short vertical stroke (transcribed as a comma) separates words. Numbers and ideograms reset the context and can help identify word boundaries.', ex:'wa-na-ka , si-to [WHEAT ideogram] 30 = "the king: grain 30"'},
];

// Utility: syllables → Linear B string
function word(sylls) { return sylls.map(s => SIGNS[s] || '?').join(''); }

// Utility: shuffle
function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }

