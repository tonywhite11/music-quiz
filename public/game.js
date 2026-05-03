/* =========================================================
   Blind Test — Game Logic
   ========================================================= */
/* Supabase calls moved to server-side — no client keys exposed */

/* ── Nickname ────────────────────────────────────────────── */
function getPlayerName() {
  return localStorage.getItem('quiz-player-name') || 'Anonymous';
}
function savePlayerName(name) {
  const clean = String(name || '').trim().slice(0, 20) || 'Anonymous';
  localStorage.setItem('quiz-player-name', clean);
  return clean;
}

/* ── Audio routing (browser-only) ────────────────────────── */
// Cleaned version: no robot WebRTC routing, just local browser audio.
const _audioCtx  = new (window.AudioContext || window.webkitAudioContext)();
let _audioElSource = null;
let _masterGain    = null;

function initAudioRouting() {
  if (_audioElSource) return;
  try {
    const el = document.getElementById("preview-audio");
    _audioElSource = _audioCtx.createMediaElementSource(el);
    _masterGain = _audioCtx.createGain();
    const saved = parseFloat(localStorage.getItem('quiz-volume') ?? '1');
    _masterGain.gain.value = saved * 2.0;
    _audioElSource.connect(_masterGain);
    _masterGain.connect(_audioCtx.destination);

    const ttsEl = document.getElementById("tts-audio");
    if (ttsEl) {
      const ttsSrc  = _audioCtx.createMediaElementSource(ttsEl);
      const ttsGain = _audioCtx.createGain();
      ttsGain.gain.value = 2.2;
      ttsSrc.connect(ttsGain);
      ttsGain.connect(_audioCtx.destination);
    }

    // Wire volume slider
    const slider = document.getElementById('volume-slider');
    if (slider) {
      slider.value = Math.round(saved * 100);
      slider.addEventListener('input', () => {
        const v = slider.value / 100;
        if (_masterGain) _masterGain.gain.value = v * 2.0;
        localStorage.setItem('quiz-volume', String(v));
      });
    }
  } catch (e) {
    console.warn("Audio routing:", e);
  }
}

function resumeAudio() {
  if (_audioCtx.state !== "running") return _audioCtx.resume();
  return Promise.resolve();
}
document.addEventListener("click",      resumeAudio, { passive: true });
document.addEventListener("touchstart", resumeAudio, { passive: true });

/* ── Constants ─────────────────────────────────────────── */
const TOTAL_ROUNDS    = 10;
const ROUND_DURATION  = 30;
const CIRCUMFERENCE   = 2 * Math.PI * 38; // timer ring r=38

/* ── Themes data ────────────────────────────────────────── */
const THEMES = [
  { id: "pop80s",   label: "80s Pop",      emoji: "🎸", bpm: 118, tracks: [
    { a: "Michael Jackson",  t: "Billie Jean" },
    { a: "Queen",            t: "Don't Stop Me Now" },
    { a: "Cyndi Lauper",     t: "Girls Just Want to Have Fun" },
    { a: "Madonna",          t: "Like a Virgin" },
    { a: "A-ha",             t: "Take On Me" },
    { a: "Wham!",            t: "Wake Me Up Before You Go-Go" },
    { a: "Duran Duran",      t: "Hungry Like the Wolf" },
    { a: "Culture Club",     t: "Karma Chameleon" },
    { a: "Toto",             t: "Africa" },
    { a: "Bon Jovi",         t: "Livin' on a Prayer" },
    { a: "Rick Astley",      t: "Never Gonna Give You Up" },
    { a: "Tina Turner",      t: "What's Love Got to Do with It" },
    { a: "Prince",           t: "Purple Rain" },
    { a: "George Michael",   t: "Careless Whisper" },
    { a: "David Bowie",      t: "Let's Dance" },
    { a: "The Police",       t: "Every Breath You Take" },
    { a: "Tears for Fears",  t: "Everybody Wants to Rule the World" },
    { a: "Whitney Houston",  t: "I Wanna Dance with Somebody" },
    { a: "Michael Jackson",  t: "Beat It" },
    { a: "Fleetwood Mac",    t: "Go Your Own Way" },
    { a: "Lionel Richie",    t: "All Night Long" },
    { a: "Bruce Springsteen", t: "Born in the U.S.A." },
    { a: "Madonna",          t: "Material Girl" },
    { a: "Prince",           t: "When Doves Cry" },
    { a: "Michael Jackson",  t: "Thriller" },
    { a: "The Police",       t: "Roxanne" },
    { a: "Duran Duran",      t: "Rio" },
    { a: "Eurythmics",       t: "Sweet Dreams" },
    { a: "Billy Joel",       t: "Uptown Girl" },
    { a: "Human League",     t: "Don't You Want Me" },
    { a: "Talking Heads",    t: "Once in a Lifetime" },
    { a: "Soft Cell",        t: "Tainted Love" },
    { a: "Bananarama",       t: "Cruel Summer" },
    { a: "Kim Carnes",       t: "Bette Davis Eyes" },
    { a: "Irene Cara",       t: "Flashdance" },
    { a: "Olivia Newton-John", t: "Physical" },
    { a: "Pat Benatar",      t: "Hit Me with Your Best Shot" },
    { a: "Joan Jett",        t: "I Love Rock 'n' Roll" },
    { a: "Foreigner",        t: "I Want to Know What Love Is" },
    { a: "Journey",          t: "Don't Stop Believin'" },
  ]},
  { id: "rnb90s",   label: "90s R&B",      emoji: "🎤", bpm: 95, tracks: [
    { a: "TLC",              t: "Waterfalls" },
    { a: "Destiny's Child",  t: "Say My Name" },
    { a: "Whitney Houston",  t: "I Will Always Love You" },
    { a: "Mariah Carey",     t: "Fantasy" },
    { a: "Boyz II Men",      t: "End of the Road" },
    { a: "Aaliyah",          t: "Try Again" },
    { a: "En Vogue",         t: "Don't Let Go" },
    { a: "SWV",              t: "Weak" },
    { a: "Mary J Blige",     t: "Real Love" },
    { a: "Lauryn Hill",      t: "Doo Wop (That Thing)" },
    { a: "Usher",            t: "Nice & Slow" },
    { a: "Janet Jackson",    t: "Together Again" },
    { a: "Brandy",           t: "Have You Ever" },
    { a: "Monica",           t: "The Boy Is Mine" },
    { a: "Ginuwine",         t: "Pony" },
    { a: "D'Angelo",         t: "Brown Sugar" },
    { a: "Erykah Badu",      t: "On & On" },
    { a: "Maxwell",          t: "Ascension" },
    { a: "Jodeci",           t: "Cry for You" },
    { a: "Keith Sweat",      t: "Twisted" },
    { a: "R. Kelly",         t: "I Believe I Can Fly" },
    { a: "TLC",              t: "No Scrubs" },
    { a: "Mariah Carey",     t: "We Belong Together" },
    { a: "Boyz II Men",      t: "I'll Make Love to You" },
    { a: "Aaliyah",          t: "Are You That Somebody" },
    { a: "Whitney Houston",  t: "Exhale (Shoop Shoop)" },
    { a: "Janet Jackson",    t: "That's the Way Love Goes" },
    { a: "Brian McKnight",   t: "Back at One" },
    { a: "Next",             t: "Too Close" },
    { a: "112",              t: "Peaches & Cream" },
    { a: "Destiny's Child",  t: "Jumpin' Jumpin'" },
    { a: "Aaliyah",          t: "One in a Million" },
    { a: "Xscape",           t: "Just Kickin' It" },
    { a: "Total",            t: "Can't You See" },
    { a: "Silk",             t: "Freak Me" },
    { a: "Blackstreet",      t: "No Diggity" },
    { a: "Dru Hill",         t: "In My Bed" },
    { a: "Case",             t: "Touch Me Tease Me" },
    { a: "Joe",              t: "All That I Am" },
    { a: "Faith Evans",      t: "Love Like This" },
  ]},
  { id: "disney",   label: "Disney",        emoji: "✨", bpm: 110, artistLabel: "Movie", artistPlaceholder: "Which movie?", answerMode: "title-only", singleLabel: "Song or Movie", tracks: [
    { a: "Idina Menzel",       t: "Let It Go",                  src: "Frozen" },
    { a: "Elton John",         t: "Circle of Life",             src: "The Lion King" },
    { a: "Celine Dion",        t: "Beauty and the Beast",       src: "Beauty and the Beast" },
    { a: "Brad Kane",          t: "A Whole New World",          src: "Aladdin" },
    { a: "Samuel Wright",      t: "Under the Sea",              src: "The Little Mermaid" },
    { a: "Randy Newman",       t: "You've Got a Friend in Me",  src: "Toy Story" },
    { a: "Jodi Benson",        t: "Part of Your World",         src: "The Little Mermaid" },
    { a: "Donny Osmond",       t: "I'll Make a Man Out of You", src: "Mulan" },
    { a: "Phil Collins",       t: "You'll Be in My Heart",      src: "Tarzan" },
    { a: "Paige O'Hara",       t: "Belle",                      src: "Beauty and the Beast" },
    { a: "Lin-Manuel Miranda", t: "We Don't Talk About Bruno",  src: "Encanto" },
    { a: "Anika Noni Rose",    t: "Almost There",               src: "The Princess and the Frog" },
    { a: "Elton John",         t: "Can You Feel the Love Tonight", src: "The Lion King" },
    { a: "Nathan Lane",        t: "Hakuna Matata",              src: "The Lion King" },
    { a: "Mandy Moore",        t: "I See the Light",            src: "Tangled" },
    { a: "Auli'i Cravalho",    t: "How Far I'll Go",            src: "Moana" },
    { a: "Benjamin Bratt",     t: "Remember Me",               src: "Coco" },
    { a: "Susan Egan",         t: "Go the Distance",            src: "Hercules" },
    { a: "Judy Kuhn",          t: "Colors of the Wind",         src: "Pocahontas" },
    { a: "Aurora",             t: "Into the Unknown",           src: "Frozen 2" },
    { a: "Alan Menken",        t: "Be Our Guest",               src: "Beauty and the Beast" },
    { a: "Christophe Beck",    t: "Surface Pressure",           src: "Encanto" },
  ]},
  { id: "kpop",     label: "K-Pop",         emoji: "💜", bpm: 130, tracks: [
    { a: "BTS",              t: "Dynamite" },
    { a: "BLACKPINK",        t: "How You Like That" },
    { a: "TWICE",            t: "Cheer Up" },
    { a: "Girls' Generation", t: "Gee" },
    { a: "BIGBANG",          t: "Fantastic Baby" },
    { a: "SHINee",           t: "Ring Ding Dong" },
    { a: "Red Velvet",       t: "Bad Boy" },
    { a: "IU",               t: "Celebrity" },
    { a: "Stray Kids",       t: "God's Menu" },
    { a: "aespa",            t: "Next Level" },
    { a: "NCT 127",          t: "Cherry Bomb" },
    { a: "EXO",              t: "Ko Ko Bop" },
    { a: "BTS",              t: "Boy With Luv" },
    { a: "BLACKPINK",        t: "DDU-DU DDU-DU" },
    { a: "TWICE",            t: "TT" },
    { a: "aespa",            t: "Black Mamba" },
    { a: "NewJeans",         t: "Hype Boy" },
    { a: "ITZY",             t: "DALLA DALLA" },
    { a: "MAMAMOO",          t: "HIP" },
    { a: "Monsta X",         t: "Beautiful" },
    { a: "TXT",              t: "Crown" },
    { a: "IU",               t: "Palette" },
    { a: "BTS",              t: "DNA" },
    { a: "BTS",              t: "Butter" },
    { a: "BLACKPINK",        t: "Kill This Love" },
    { a: "TWICE",            t: "Fancy" },
    { a: "EXO",              t: "Love Shot" },
    { a: "NewJeans",         t: "Attention" },
    { a: "ENHYPEN",          t: "Given-Taken" },
    { a: "Stray Kids",       t: "Miroh" },
    { a: "Red Velvet",       t: "Psycho" },
    { a: "WINNER",           t: "Really Really" },
    { a: "SEVENTEEN",        t: "Don't Wanna Cry" },
    { a: "GOT7",             t: "Hard Carry" },
    { a: "2NE1",             t: "I Am the Best" },
    { a: "f(x)",             t: "Electric Shock" },
    { a: "Wonder Girls",     t: "Nobody" },
    { a: "SISTAR",           t: "Alone" },
    { a: "4MINUTE",          t: "Hate" },
    { a: "Hyuna",            t: "Bubble Pop" },
  ]},
  { id: "frenchpop", label: "French Pop",   emoji: "🗼", bpm: 105, tracks: [
    { a: "Stromae",          t: "Papaoutai" },
    { a: "Aya Nakamura",     t: "Djadja" },
    { a: "Christine and the Queens", t: "Tilted" },
    { a: "Indila",           t: "Dernière Danse" },
    { a: "Angèle",           t: "Balance ton quoi" },
    { a: "Hoshi",            t: "Ta Douleur" },
    { a: "Zaz",              t: "Je Veux" },
    { a: "Edith Piaf",       t: "La Vie en Rose" },
    { a: "Nekfeu",           t: "Etoiles" },
    { a: "Stromae",          t: "Alors on Danse" },
    { a: "Eddy de Pretto",   t: "Ego" },
    { a: "Pomme",            t: "Contes" },
    { a: "Daft Punk",        t: "Get Lucky" },
    { a: "Charles Aznavour", t: "La Bohème" },
    { a: "Jacques Brel",     t: "Ne Me Quitte Pas" },
    { a: "France Gall",      t: "Laisse Tomber les Filles" },
    { a: "Joe Dassin",       t: "L'Été indien" },
    { a: "Vianney",          t: "Pas là" },
    { a: "Grand Corps Malade", t: "Funambule" },
    { a: "Véronique Sanson", t: "Amoureuse" },
    { a: "Stromae",          t: "Formidable" },
    { a: "Angèle",           t: "Nombreux" },
    { a: "Aya Nakamura",     t: "Pookie" },
    { a: "Orelsan",          t: "La Fête est Finie" },
    { a: "PNL",              t: "Au DD" },
    { a: "Damso",            t: "Ipséité" },
    { a: "Booba",            t: "Caméléon" },
    { a: "Ninho",            t: "Millions" },
    { a: "Jul",              t: "Bande Organisée" },
    { a: "Maître Gims",      t: "Bella" },
    { a: "Soprano",          t: "Chocolat" },
    { a: "Bigflo & Oli",     t: "La Vraie Vie" },
    { a: "Indila",           t: "Tourner Dans le Vide" },
    { a: "Claudio Capéo",    t: "Un Homme Debout" },
    { a: "Louane",           t: "Avenir" },
    { a: "Zaz",              t: "On Ira" },
    { a: "Patrick Bruel",    t: "Place des Grands Hommes" },
    { a: "Michel Sardou",    t: "La Maladie d'Amour" },
    { a: "Francis Cabrel",   t: "Je l'Aime à Mourir" },
  ]},
  { id: "rock",     label: "Rock Classic",  emoji: "🤘", bpm: 130, tracks: [
    { a: "AC/DC",            t: "Back in Black" },
    { a: "Queen",            t: "Bohemian Rhapsody" },
    { a: "The Rolling Stones", t: "Paint It Black" },
    { a: "Jimi Hendrix",     t: "Purple Haze" },
    { a: "Pink Floyd",       t: "Wish You Were Here" },
    { a: "The Doors",        t: "Light My Fire" },
    { a: "Aerosmith",        t: "Sweet Emotion" },
    { a: "Guns N' Roses",    t: "November Rain" },
    { a: "Led Zeppelin",     t: "Whole Lotta Love" },
    { a: "Deep Purple",      t: "Smoke on the Water" },
    { a: "Black Sabbath",    t: "Paranoid" },
    { a: "Cream",            t: "Sunshine of Your Love" },
    { a: "The Eagles",       t: "Hotel California" },
    { a: "Fleetwood Mac",    t: "The Chain" },
    { a: "Tom Petty",        t: "Free Fallin'" },
    { a: "Lynyrd Skynyrd",   t: "Sweet Home Alabama" },
    { a: "Van Halen",        t: "Jump" },
    { a: "ZZ Top",           t: "Sharp Dressed Man" },
    { a: "The Who",          t: "Baba O'Riley" },
    { a: "Santana",          t: "Smooth" },
    { a: "Bruce Springsteen", t: "Born to Run" },
    { a: "Def Leppard",      t: "Pour Some Sugar on Me" },
    { a: "AC/DC",            t: "Highway to Hell" },
    { a: "Queen",            t: "We Will Rock You" },
    { a: "Led Zeppelin",     t: "Stairway to Heaven" },
    { a: "Pink Floyd",       t: "Another Brick in the Wall" },
    { a: "Guns N' Roses",    t: "Sweet Child O' Mine" },
    { a: "Aerosmith",        t: "Dream On" },
    { a: "The Rolling Stones", t: "Jumpin' Jack Flash" },
    { a: "The Who",          t: "My Generation" },
    { a: "Jimi Hendrix",     t: "All Along the Watchtower" },
    { a: "The Eagles",       t: "Take It Easy" },
    { a: "Fleetwood Mac",    t: "Dreams" },
    { a: "Tom Petty",        t: "American Girl" },
    { a: "Van Halen",        t: "Runnin' with the Devil" },
    { a: "AC/DC",            t: "Thunderstruck" },
    { a: "Queen",            t: "We Are the Champions" },
    { a: "Deep Purple",      t: "Child in Time" },
    { a: "Thin Lizzy",       t: "The Boys Are Back in Town" },
    { a: "Boston",           t: "More Than a Feeling" },
    { a: "Heart",            t: "Barracuda" },
  ]},
  { id: "reggaeton", label: "Reggaeton",    emoji: "🔥", bpm: 95, tracks: [
    { a: "Daddy Yankee",     t: "Gasolina" },
    { a: "J Balvin",         t: "Mi Gente" },
    { a: "Bad Bunny",        t: "Dakiti" },
    { a: "Maluma",           t: "Hawái" },
    { a: "Nicky Jam",        t: "El Perdón" },
    { a: "Karol G",          t: "Tusa" },
    { a: "Rauw Alejandro",   t: "Todo de Ti" },
    { a: "Ozuna",            t: "Taki Taki" },
    { a: "Becky G",          t: "Sin Pijama" },
    { a: "Lunay",            t: "Soltera" },
    { a: "J Balvin",         t: "Ginza" },
    { a: "Bad Bunny",        t: "Soy Peor" },
    { a: "Daddy Yankee",     t: "Con Calma" },
    { a: "Karol G",          t: "Provenza" },
    { a: "Anuel AA",         t: "China" },
    { a: "Ozuna",            t: "El Farsante" },
    { a: "Maluma",           t: "Felices los 4" },
    { a: "Sech",             t: "Another Love" },
    { a: "Jhay Cortez",      t: "No Me Conoce" },
    { a: "Bad Bunny",        t: "Tití Me Preguntó" },
    { a: "Rauw Alejandro",   t: "Fantasías" },
    { a: "Karol G",          t: "MAMIII" },
    { a: "J Balvin",         t: "Safari" },
    { a: "Bad Bunny",        t: "Callaíta" },
    { a: "Ozuna",            t: "Música" },
    { a: "Nicky Jam",        t: "Hasta el Amanecer" },
    { a: "Daddy Yankee",     t: "Rompe" },
    { a: "Don Omar",         t: "Danza Kuduro" },
    { a: "Pitbull",          t: "Give Me Everything" },
    { a: "Wisin & Yandel",   t: "Follow the Leader" },
    { a: "Plan B",           t: "Candy" },
    { a: "Tego Calderón",    t: "Pa' Que Retozen" },
  ]},
  { id: "metal",    label: "Metal",         emoji: "💀", bpm: 160, tracks: [
    { a: "Metallica",        t: "Enter Sandman" },
    { a: "Iron Maiden",      t: "The Trooper" },
    { a: "Black Sabbath",    t: "Paranoid" },
    { a: "Pantera",          t: "Walk" },
    { a: "Megadeth",         t: "Symphony of Destruction" },
    { a: "Judas Priest",     t: "Breaking the Law" },
    { a: "Ozzy Osbourne",    t: "Crazy Train" },
    { a: "Motörhead",        t: "Ace of Spades" },
    { a: "System of a Down", t: "Chop Suey" },
    { a: "Slipknot",         t: "Duality" },
    { a: "Tool",             t: "Schism" },
    { a: "Lamb of God",      t: "Laid to Rest" },
    { a: "Metallica",        t: "Master of Puppets" },
    { a: "Iron Maiden",      t: "Run to the Hills" },
    { a: "Black Sabbath",    t: "War Pigs" },
    { a: "Pantera",          t: "Cowboys from Hell" },
    { a: "Rammstein",        t: "Du Hast" },
    { a: "Slipknot",         t: "Psychosocial" },
    { a: "System of a Down", t: "B.Y.O.B." },
    { a: "Marilyn Manson",   t: "The Beautiful People" },
    { a: "Megadeth",         t: "Peace Sells" },
    { a: "Judas Priest",     t: "Painkiller" },
    { a: "Metallica",        t: "One" },
    { a: "Iron Maiden",      t: "Hallowed Be Thy Name" },
    { a: "Ozzy Osbourne",    t: "Mr. Crowley" },
    { a: "Motörhead",        t: "Killed by Death" },
    { a: "Dio",              t: "Holy Diver" },
    { a: "Saxon",            t: "Wheels of Steel" },
    { a: "Queensrÿche",      t: "Silent Lucidity" },
    { a: "Sepultura",        t: "Roots Bloody Roots" },
    { a: "In Flames",        t: "The Quiet Place" },
    { a: "Killswitch Engage", t: "My Curse" },
    { a: "Bullet for My Valentine", t: "Tears Don't Fall" },
    { a: "Trivium",          t: "Pull Harder on the Strings" },
  ]},
  { id: "anime",    label: "Anime",         emoji: "⛩️", bpm: 128, artistLabel: "Anime", artistPlaceholder: "Which anime?", answerMode: "title-only", singleLabel: "Anime / Show", tracks: [
    { a: "Hironobu Kageyama",        t: "CHA-LA HEAD-CHA-LA",    src: "Dragon Ball Z" },
    { a: "Ikimono-gakari",           t: "Blue Bird",             src: "Naruto Shippuden" },
    { a: "Linked Horizon",           t: "Guren no Yumiya",       src: "Attack on Titan" },
    { a: "LiSA",                     t: "Gurenge",               src: "Demon Slayer" },
    { a: "LiSA",                     t: "Crossing Field",        src: "Sword Art Online" },
    { a: "Flow",                     t: "GO",                    src: "Naruto" },
    { a: "Asian Kung-Fu Generation", t: "Rewrite",               src: "Fullmetal Alchemist" },
    { a: "Porno Graffitti",          t: "The Day",               src: "My Hero Academia" },
    { a: "Yui",                      t: "Again",                 src: "Fullmetal Alchemist Brotherhood" },
    { a: "Ado",                      t: "Utakata Lullaby",       src: "One Piece Film: Red" },
    { a: "King Gnu",                 t: "Specialz",              src: "Jujutsu Kaisen" },
    { a: "Kenshi Yonezu",            t: "Spinning World",        src: "Howl's Moving Castle" },
    { a: "Yoko Takahashi",           t: "Cruel Angel's Thesis",  src: "Neon Genesis Evangelion" },
    { a: "The Sigmas",               t: "We Are!",               src: "One Piece" },
    { a: "Seatbelts",                t: "Tank!",                 src: "Cowboy Bebop" },
    { a: "TK from Ling Tosite Sigure", t: "Unravel",            src: "Tokyo Ghoul" },
    { a: "Burnout Syndromes",        t: "Fly High!!",            src: "Haikyuu!!" },
    { a: "Kalafina",                 t: "Oath Sign",             src: "Fate/Zero" },
    { a: "Nano",                     t: "Rokutousei no Yoru",    src: "Sword Art Online II" },
    { a: "FLOW",                     t: "Days",                  src: "Eureka Seven" },
    { a: "Asian Kung-Fu Generation", t: "Haruka Kanata",         src: "Naruto" },
    { a: "Hiroyuki Sawano",          t: "Before My Body Is Dry", src: "Kill la Kill" },
  ]},
  { id: "jazz",     label: "Jazz",          emoji: "🎷", bpm: 120, tracks: [
    { a: "Miles Davis",      t: "So What" },
    { a: "Dave Brubeck",     t: "Take Five" },
    { a: "Chet Baker",       t: "My Funny Valentine" },
    { a: "Bill Evans",       t: "Waltz for Debby" },
    { a: "Louis Armstrong",  t: "What a Wonderful World" },
    { a: "Ella Fitzgerald",  t: "Summertime" },
    { a: "Nina Simone",      t: "Feeling Good" },
    { a: "Duke Ellington",   t: "Mood Indigo" },
    { a: "John Coltrane",    t: "My Favorite Things" },
    { a: "Oscar Peterson",   t: "Autumn Leaves" },
    { a: "Thelonious Monk",  t: "Round Midnight" },
    { a: "Charles Mingus",   t: "Goodbye Pork Pie Hat" },
    { a: "Herbie Hancock",   t: "Cantaloupe Island" },
    { a: "Art Blakey",       t: "Moanin'" },
    { a: "Lee Morgan",       t: "The Sidewinder" },
    { a: "Cannonball Adderley", t: "Mercy Mercy Mercy" },
    { a: "Wes Montgomery",   t: "Four on Six" },
    { a: "Wayne Shorter",    t: "Footprints" },
    { a: "Chet Baker",       t: "Almost Blue" },
    { a: "Bill Evans",       t: "Peace Piece" },
    { a: "Nina Simone",      t: "I Put a Spell on You" },
    { a: "Miles Davis",      t: "Kind of Blue" },
  ]},
  { id: "videogames", label: "Jeux Vidéo", emoji: "🎮", bpm: 140, artistLabel: "Game", artistPlaceholder: "Which game?", answerMode: "title-only", singleLabel: "Game Name", tracks: [
    { a: "Koji Kondo",       t: "Super Mario Bros Theme",    src: "Super Mario Bros" },
    { a: "Toby Fox",         t: "Megalovania",               src: "Undertale" },
    { a: "C418",             t: "Sweden",                    src: "Minecraft" },
    { a: "Nobuo Uematsu",    t: "One Winged Angel",          src: "Final Fantasy VII" },
    { a: "Yoko Shimomura",   t: "Simple and Clean",          src: "Kingdom Hearts" },
    { a: "Jonathan Coulton", t: "Still Alive",               src: "Portal" },
    { a: "Yasunori Mitsuda", t: "Chrono Trigger Main Theme", src: "Chrono Trigger" },
    { a: "Koji Kondo",       t: "Gerudo Valley",             src: "Zelda Ocarina of Time" },
    { a: "Martin O'Donnell", t: "Halo Theme",                src: "Halo" },
    { a: "Nobuo Uematsu",    t: "Terra's Theme",             src: "Final Fantasy VI" },
    { a: "Masashi Hamauzu",  t: "Lightning's Theme",         src: "Final Fantasy XIII" },
    { a: "Darren Korb",      t: "Build That Wall",           src: "Bastion" },
    { a: "Koji Kondo",       t: "Gusty Garden Galaxy",       src: "Super Mario Galaxy" },
    { a: "Masashi Hamauzu",  t: "Green Hill Zone",           src: "Sonic the Hedgehog" },
    { a: "Toby Fox",         t: "Hopes and Dreams",          src: "Undertale" },
    { a: "Yoko Shimomura",   t: "Dearly Beloved",            src: "Kingdom Hearts" },
    { a: "Nobuo Uematsu",    t: "Liberi Fatali",             src: "Final Fantasy VIII" },
    { a: "Koji Kondo",       t: "Zelda's Lullaby",           src: "Zelda Ocarina of Time" },
    { a: "Nobuo Uematsu",    t: "Aerith's Theme",            src: "Final Fantasy VII" },
    { a: "Yasunori Mitsuda", t: "Corridors of Time",         src: "Chrono Trigger" },
    { a: "Martin O'Donnell", t: "Mjolnir Mix",               src: "Halo 2" },
    { a: "Akira Yamaoka",    t: "Promise",                   src: "Silent Hill 2" },
  ]},
  { id: "films",    label: "Films",         emoji: "🎬", bpm: 100, artistLabel: "Movie", artistPlaceholder: "Which movie?", answerMode: "title-only", singleLabel: "Movie Title", tracks: [
    { a: "John Williams",    t: "The Imperial March",             src: "Star Wars" },
    { a: "Hans Zimmer",      t: "Time",                           src: "Inception" },
    { a: "Ennio Morricone",  t: "The Good the Bad and the Ugly",  src: "The Good the Bad and the Ugly" },
    { a: "Lalo Schifrin",    t: "Mission: Impossible Theme",      src: "Mission Impossible" },
    { a: "John Williams",    t: "Indiana Jones Theme",            src: "Indiana Jones" },
    { a: "Hans Zimmer",      t: "He's a Pirate",                  src: "Pirates of the Caribbean" },
    { a: "Alan Silvestri",   t: "Back to the Future Theme",       src: "Back to the Future" },
    { a: "Howard Shore",     t: "Concerning Hobbits",             src: "Lord of the Rings" },
    { a: "Vangelis",         t: "Chariots of Fire",               src: "Chariots of Fire" },
    { a: "John Williams",    t: "Hedwig's Theme",                 src: "Harry Potter" },
    { a: "Danny Elfman",     t: "Batman Theme",                   src: "Batman" },
    { a: "Hans Zimmer",      t: "Interstellar Main Theme",        src: "Interstellar" },
    { a: "Nino Rota",        t: "The Godfather Theme",            src: "The Godfather" },
    { a: "John Williams",    t: "Jurassic Park Theme",            src: "Jurassic Park" },
    { a: "Celine Dion",      t: "My Heart Will Go On",            src: "Titanic" },
    { a: "Monty Norman",     t: "James Bond Theme",               src: "James Bond" },
    { a: "Henry Mancini",    t: "Moon River",                     src: "Breakfast at Tiffany's" },
    { a: "Henry Mancini",    t: "The Pink Panther Theme",         src: "The Pink Panther" },
    { a: "John Williams",    t: "Schindler's List Theme",         src: "Schindler's List" },
    { a: "Alan Silvestri",   t: "Avengers Theme",                 src: "The Avengers" },
    { a: "Hans Zimmer",      t: "Why So Serious",                 src: "The Dark Knight" },
    { a: "John Williams",    t: "E.T. Flying Theme",              src: "E.T." },
  ]},
  { id: "soul",     label: "Soul / Motown", emoji: "🌟", bpm: 108, tracks: [
    { a: "Aretha Franklin",  t: "Respect" },
    { a: "Stevie Wonder",    t: "Superstition" },
    { a: "Marvin Gaye",      t: "Let's Get It On" },
    { a: "The Temptations",  t: "My Girl" },
    { a: "Otis Redding",     t: "Sittin' On The Dock of the Bay" },
    { a: "James Brown",      t: "I Got You (I Feel Good)" },
    { a: "Diana Ross",       t: "Ain't No Mountain High Enough" },
    { a: "Sam Cooke",        t: "A Change Is Gonna Come" },
    { a: "Al Green",         t: "Let's Stay Together" },
    { a: "Curtis Mayfield",  t: "Move On Up" },
    { a: "Smokey Robinson",  t: "The Tears of a Clown" },
    { a: "Four Tops",        t: "I Can't Help Myself" },
    { a: "Marvin Gaye",      t: "What's Going On" },
    { a: "Stevie Wonder",    t: "Signed Sealed Delivered" },
    { a: "Etta James",       t: "At Last" },
    { a: "Ben E. King",      t: "Stand By Me" },
    { a: "Ray Charles",      t: "Hit the Road Jack" },
    { a: "Wilson Pickett",   t: "Mustang Sally" },
    { a: "The Jackson 5",    t: "I Want You Back" },
    { a: "Gladys Knight",    t: "Midnight Train to Georgia" },
    { a: "Aretha Franklin",  t: "Think" },
    { a: "The Supremes",     t: "Stop! In the Name of Love" },
  ]},
  { id: "edm",      label: "Electro / EDM", emoji: "🎧", bpm: 128, tracks: [
    { a: "Daft Punk",        t: "One More Time" },
    { a: "The Chemical Brothers", t: "Block Rockin' Beats" },
    { a: "Deadmau5",         t: "Strobe" },
    { a: "Avicii",           t: "Levels" },
    { a: "Calvin Harris",    t: "Summer" },
    { a: "Martin Garrix",    t: "Animals" },
    { a: "Disclosure",       t: "Latch" },
    { a: "Skrillex",         t: "Scary Monsters and Nice Sprites" },
    { a: "Bicep",            t: "Glue" },
    { a: "Odesza",           t: "A Moment Apart" },
    { a: "Aphex Twin",       t: "Windowlicker" },
    { a: "Four Tet",         t: "Smile Around the Face" },
    { a: "Daft Punk",        t: "Get Lucky" },
    { a: "David Guetta",     t: "Titanium" },
    { a: "Swedish House Mafia", t: "Don't You Worry Child" },
    { a: "Tiësto",           t: "Red Lights" },
    { a: "Kygo",             t: "Firestone" },
    { a: "Justice",          t: "D.A.N.C.E." },
    { a: "Moderat",          t: "Bad Kingdom" },
    { a: "Röyksopp",         t: "Remind Me" },
    { a: "Bonobo",           t: "Kiara" },
    { a: "Flume",            t: "Never Be Like You" },
  ]},
  { id: "latin",    label: "Latin Pop",     emoji: "💃", bpm: 95, tracks: [
    { a: "Shakira",          t: "Waka Waka" },
    { a: "Enrique Iglesias", t: "Bailando" },
    { a: "Marc Anthony",     t: "Vivir Mi Vida" },
    { a: "Ricky Martin",     t: "Livin' la Vida Loca" },
    { a: "Gloria Estefan",   t: "Conga" },
    { a: "Jennifer Lopez",   t: "On the Floor" },
    { a: "Juanes",           t: "La Camisa Negra" },
    { a: "Rosalía",          t: "Malamente" },
    { a: "Carlos Vives",     t: "La Bicicleta" },
    { a: "Alejandro Sanz",   t: "Corazón Partido" },
    { a: "Celia Cruz",       t: "La Vida Es Un Carnaval" },
    { a: "Marc Anthony",     t: "Valió la Pena" },
    { a: "Shakira",          t: "Hips Don't Lie" },
    { a: "Luis Fonsi",       t: "Despacito" },
    { a: "Camila Cabello",   t: "Havana" },
    { a: "Pitbull",          t: "Give Me Everything" },
    { a: "Ricky Martin",     t: "La Copa de la Vida" },
    { a: "Jennifer Lopez",   t: "Let's Get Loud" },
    { a: "Enrique Iglesias", t: "Hero" },
    { a: "J Balvin",         t: "Con Calma" },
    { a: "Bad Bunny",        t: "MIA" },
    { a: "Maluma",           t: "Corazón" },
  ]},
  { id: "pop2000s", label: "2000s Pop",     emoji: "💿", bpm: 120, tracks: [
    { a: "Britney Spears",   t: "Toxic" },
    { a: "Justin Timberlake", t: "Cry Me a River" },
    { a: "Beyoncé",          t: "Crazy in Love" },
    { a: "Eminem",           t: "Lose Yourself" },
    { a: "OutKast",          t: "Hey Ya!" },
    { a: "The White Stripes", t: "Seven Nation Army" },
    { a: "Coldplay",         t: "The Scientist" },
    { a: "Amy Winehouse",    t: "Rehab" },
    { a: "MGMT",             t: "Kids" },
    { a: "M.I.A.",           t: "Paper Planes" },
    { a: "Lily Allen",       t: "Smile" },
    { a: "Nelly",            t: "Hot in Herre" },
    { a: "Nelly Furtado",    t: "Promiscuous" },
    { a: "Justin Timberlake", t: "SexyBack" },
    { a: "Beyoncé",          t: "Irreplaceable" },
    { a: "Alicia Keys",      t: "Fallin'" },
    { a: "Kelly Clarkson",   t: "Since U Been Gone" },
    { a: "Pink",             t: "Get the Party Started" },
    { a: "The Black Eyed Peas", t: "Where Is the Love?" },
    { a: "Christina Aguilera", t: "Beautiful" },
    { a: "Destiny's Child",  t: "Survivor" },
    { a: "Missy Elliott",    t: "Work It" },
    { a: "Britney Spears",   t: "...Baby One More Time" },
    { a: "Coldplay",         t: "Clocks" },
    { a: "Radiohead",        t: "Karma Police" },
    { a: "White Stripes",    t: "Fell in Love with a Girl" },
    { a: "Franz Ferdinand",  t: "Take Me Out" },
    { a: "The Killers",      t: "Mr. Brightside" },
    { a: "Arctic Monkeys",   t: "I Bet You Look Good on the Dancefloor" },
    { a: "Amy Winehouse",    t: "Back to Black" },
    { a: "Gorillaz",         t: "Clint Eastwood" },
    { a: "Daft Punk",        t: "Harder Better Faster Stronger" },
    { a: "Outkast",          t: "Ms. Jackson" },
    { a: "Jay-Z",            t: "Izzo (H.O.V.A.)" },
    { a: "Eminem",           t: "Without Me" },
  ]},
  { id: "hiphop",   label: "Hip-Hop 90s",   emoji: "🎤", bpm: 90, tracks: [
    { a: "2Pac",             t: "California Love" },
    { a: "The Notorious B.I.G.", t: "Juicy" },
    { a: "Jay-Z",            t: "99 Problems" },
    { a: "Nas",              t: "N.Y. State of Mind" },
    { a: "Wu-Tang Clan",     t: "C.R.E.A.M." },
    { a: "A Tribe Called Quest", t: "Can I Kick It" },
    { a: "Dr. Dre",          t: "Still D.R.E." },
    { a: "Ice Cube",         t: "It Was a Good Day" },
    { a: "Snoop Dogg",       t: "Gin and Juice" },
    { a: "Beastie Boys",     t: "Intergalactic" },
    { a: "De La Soul",       t: "Me Myself and I" },
    { a: "Lauryn Hill",      t: "Everything Is Everything" },
    { a: "2Pac",             t: "Dear Mama" },
    { a: "The Notorious B.I.G.", t: "Big Poppa" },
    { a: "Jay-Z",            t: "Empire State of Mind" },
    { a: "Outkast",          t: "Ms. Jackson" },
    { a: "Missy Elliott",    t: "Get Ur Freak On" },
    { a: "Eminem",           t: "The Real Slim Shady" },
    { a: "DMX",              t: "Ruff Ryders Anthem" },
    { a: "Fugees",           t: "Killing Me Softly" },
    { a: "Snoop Dogg",       t: "Drop It Like It's Hot" },
    { a: "Dr. Dre",          t: "The Next Episode" },
  ]},
  { id: "disco",    label: "Disco",          emoji: "🪩", bpm: 120, tracks: [
    { a: "Donna Summer",     t: "I Feel Love" },
    { a: "ABBA",             t: "Dancing Queen" },
    { a: "Gloria Gaynor",    t: "I Will Survive" },
    { a: "Chic",             t: "Le Freak" },
    { a: "Earth Wind & Fire", t: "September" },
    { a: "Bee Gees",         t: "Stayin' Alive" },
    { a: "Michael Jackson",  t: "Don't Stop 'Til You Get Enough" },
    { a: "Sister Sledge",    t: "We Are Family" },
    { a: "Kool & the Gang",  t: "Celebration" },
    { a: "Rick James",       t: "Super Freak" },
    { a: "KC and the Sunshine Band", t: "Get Down Tonight" },
    { a: "Diana Ross",       t: "Upside Down" },
    { a: "Donna Summer",     t: "Hot Stuff" },
    { a: "ABBA",             t: "Voulez-Vous" },
    { a: "Bee Gees",         t: "Night Fever" },
    { a: "Chic",             t: "Good Times" },
    { a: "Earth Wind & Fire", t: "Boogie Wonderland" },
    { a: "Village People",   t: "Y.M.C.A." },
    { a: "The Trammps",      t: "Disco Inferno" },
    { a: "Michael Jackson",  t: "Rock with You" },
    { a: "Gloria Gaynor",    t: "Never Can Say Goodbye" },
    { a: "Lipps Inc",        t: "Funkytown" },
  ]},
  { id: "grunge",   label: "Grunge",         emoji: "🎸", bpm: 115, tracks: [
    { a: "Nirvana",          t: "Come as You Are" },
    { a: "Pearl Jam",        t: "Alive" },
    { a: "Soundgarden",      t: "Black Hole Sun" },
    { a: "Alice in Chains",  t: "Would?" },
    { a: "Stone Temple Pilots", t: "Plush" },
    { a: "Bush",             t: "Machinehead" },
    { a: "Hole",             t: "Celebrity Skin" },
    { a: "Mad Season",       t: "River of Deceit" },
    { a: "Temple of the Dog", t: "Hunger Strike" },
    { a: "Screaming Trees",  t: "Nearly Lost You" },
    { a: "Mudhoney",         t: "Touch Me I'm Sick" },
    { a: "L7",               t: "Pretend We're Dead" },
    { a: "Nirvana",          t: "Smells Like Teen Spirit" },
    { a: "Pearl Jam",        t: "Jeremy" },
    { a: "Soundgarden",      t: "Spoonman" },
    { a: "Alice in Chains",  t: "Rooster" },
    { a: "Nirvana",          t: "In Bloom" },
    { a: "Pearl Jam",        t: "Black" },
    { a: "Stone Temple Pilots", t: "Creep" },
    { a: "Alice in Chains",  t: "Them Bones" },
    { a: "Soundgarden",      t: "Fell on Black Days" },
    { a: "Bush",             t: "Everything Zen" },
  ]},
  { id: "newwave",  label: "New Wave",        emoji: "📼", bpm: 115, tracks: [
    { a: "Talking Heads",    t: "Psycho Killer" },
    { a: "The Cure",         t: "Love Cats" },
    { a: "Depeche Mode",     t: "Just Can't Get Enough" },
    { a: "Blondie",          t: "Heart of Glass" },
    { a: "New Order",        t: "Blue Monday" },
    { a: "Joy Division",     t: "Love Will Tear Us Apart" },
    { a: "Simple Minds",     t: "Don't You (Forget About Me)" },
    { a: "The Pretenders",   t: "Brass in Pocket" },
    { a: "Echo & the Bunnymen", t: "The Cutter" },
    { a: "Bauhaus",          t: "Bela Lugosi's Dead" },
    { a: "Siouxsie and the Banshees", t: "Hong Kong Garden" },
    { a: "XTC",              t: "Making Plans for Nigel" },
    { a: "The Smiths",       t: "This Charming Man" },
    { a: "Pet Shop Boys",    t: "West End Girls" },
    { a: "Depeche Mode",     t: "Personal Jesus" },
    { a: "New Order",        t: "True Faith" },
    { a: "The Cure",         t: "Boys Don't Cry" },
    { a: "Blondie",          t: "Atomic" },
    { a: "Tears for Fears",  t: "Mad World" },
    { a: "The B-52s",        t: "Rock Lobster" },
    { a: "Talking Heads",    t: "Once in a Lifetime" },
    { a: "Elvis Costello",   t: "Oliver's Army" },
  ]},
  { id: "pop2020s", label: "2020s Pop",      emoji: "🚀", bpm: 118, tracks: [
    { a: "Olivia Rodrigo",   t: "drivers license" },
    { a: "Dua Lipa",         t: "Levitating" },
    { a: "Harry Styles",     t: "Watermelon Sugar" },
    { a: "Billie Eilish",    t: "Happier Than Ever" },
    { a: "The Weeknd",       t: "Blinding Lights" },
    { a: "Doja Cat",         t: "Say So" },
    { a: "Bad Bunny",        t: "Yonaguni" },
    { a: "Taylor Swift",     t: "Anti-Hero" },
    { a: "SZA",              t: "Kill Bill" },
    { a: "Lizzo",            t: "About Damn Time" },
    { a: "Tyler the Creator", t: "EARFQUAKE" },
    { a: "Kendrick Lamar",   t: "N95" },
    { a: "Olivia Rodrigo",   t: "good 4 u" },
    { a: "Dua Lipa",         t: "Don't Start Now" },
    { a: "Harry Styles",     t: "As It Was" },
    { a: "Billie Eilish",    t: "bad guy" },
    { a: "The Weeknd",       t: "Save Your Tears" },
    { a: "Lil Nas X",        t: "Montero" },
    { a: "Post Malone",      t: "Sunflower" },
    { a: "Doja Cat",         t: "Streets" },
    { a: "Taylor Swift",     t: "Cruel Summer" },
    { a: "Ariana Grande",    t: "7 Rings" },
  ]},
  { id: "afrobeats", label: "Afrobeats",     emoji: "🌍", bpm: 100, tracks: [
    { a: "Burna Boy",        t: "Ye" },
    { a: "Wizkid",           t: "Essence" },
    { a: "Davido",           t: "Fall" },
    { a: "Fela Kuti",        t: "Zombie" },
    { a: "Tiwa Savage",      t: "All Over" },
    { a: "Yemi Alade",       t: "Johnny" },
    { a: "Fireboy DML",      t: "Peru" },
    { a: "CKay",             t: "Love Nwantiti" },
    { a: "Omah Lay",         t: "Bad Influence" },
    { a: "Mr Eazi",          t: "Leg Over" },
    { a: "Adekunle Gold",    t: "Orente" },
    { a: "Patoranking",      t: "Girlie O" },
    { a: "Burna Boy",        t: "On the Low" },
    { a: "Wizkid",           t: "Ojuelegba" },
    { a: "Davido",           t: "Assurance" },
    { a: "Burna Boy",        t: "Anybody" },
    { a: "CKay",             t: "Emiliana" },
    { a: "Fireboy DML",      t: "Scatter" },
    { a: "Omah Lay",         t: "Understand" },
    { a: "Fela Kuti",        t: "Lady" },
    { a: "Wizkid",           t: "Come Closer" },
    { a: "Yemi Alade",       t: "Shake" },
  ]},
  { id: "classical", label: "Classical",     emoji: "🎻", bpm: 80, answerMode: "title-only", singleLabel: "Piece Name", tracks: [
    { a: "Beethoven",        t: "Für Elise" },
    { a: "Mozart",           t: "Eine kleine Nachtmusik" },
    { a: "Bach",             t: "Toccata and Fugue in D minor" },
    { a: "Vivaldi",          t: "Spring" },
    { a: "Chopin",           t: "Nocturne Op. 9 No. 2" },
    { a: "Debussy",          t: "Clair de lune" },
    { a: "Satie",            t: "Gymnopédie No. 1" },
    { a: "Tchaikovsky",      t: "Swan Lake Theme" },
    { a: "Grieg",            t: "In the Hall of the Mountain King" },
    { a: "Brahms",           t: "Hungarian Dance No. 5" },
    { a: "Handel",           t: "Hallelujah" },
    { a: "Schubert",         t: "Ave Maria" },
    { a: "Beethoven",        t: "Symphony No. 5" },
    { a: "Mozart",           t: "Symphony No. 40" },
    { a: "Bach",             t: "Air on the G String" },
    { a: "Vivaldi",          t: "Winter" },
    { a: "Beethoven",        t: "Moonlight Sonata" },
    { a: "Tchaikovsky",      t: "1812 Overture" },
    { a: "Verdi",            t: "La Traviata Libiamo" },
    { a: "Puccini",          t: "Nessun Dorma" },
    { a: "Saint-Saëns",      t: "The Swan" },
    { a: "Chopin",           t: "Ballade No. 1" },
  ]},
  { id: "indie",    label: "Indie Folk",     emoji: "🌿", bpm: 88, tracks: [
    { a: "Bon Iver",         t: "Skinny Love" },
    { a: "Fleet Foxes",      t: "White Winter Hymnal" },
    { a: "The Lumineers",    t: "Ho Hey" },
    { a: "Of Monsters and Men", t: "Little Talks" },
    { a: "Sufjan Stevens",   t: "Chicago" },
    { a: "Arcade Fire",      t: "Wake Up" },
    { a: "Feist",            t: "1234" },
    { a: "Jose Gonzalez",    t: "Heartbeats" },
    { a: "Iron & Wine",      t: "Naked as We Came" },
    { a: "First Aid Kit",    t: "Emmylou" },
    { a: "Bright Eyes",      t: "Lua" },
    { a: "Fleet Foxes",      t: "Helplessness Blues" },
    { a: "Bon Iver",         t: "Holocene" },
    { a: "Mumford & Sons",   t: "Little Lion Man" },
    { a: "The Lumineers",    t: "Stubborn Love" },
    { a: "Arcade Fire",      t: "Rebellion (Lies)" },
    { a: "Feist",            t: "Mushaboom" },
    { a: "Of Monsters and Men", t: "Mountain Sound" },
    { a: "Beirut",           t: "Nantes" },
    { a: "Local Natives",    t: "Sun Hands" },
    { a: "Sufjan Stevens",   t: "Death with Dignity" },
    { a: "Gregory Alan Isakov", t: "The Stable Song" },
  ]},
  { id: "country",  label: "Country",        emoji: "🤠", bpm: 92, tracks: [
    { a: "Johnny Cash",      t: "Ring of Fire" },
    { a: "Dolly Parton",     t: "Jolene" },
    { a: "Hank Williams",    t: "Your Cheatin' Heart" },
    { a: "Garth Brooks",     t: "Friends in Low Places" },
    { a: "Kenny Rogers",     t: "The Gambler" },
    { a: "Willie Nelson",    t: "On the Road Again" },
    { a: "Shania Twain",     t: "Man! I Feel Like a Woman!" },
    { a: "Carrie Underwood", t: "Before He Cheats" },
    { a: "Chris Stapleton",  t: "Tennessee Whiskey" },
    { a: "Kacey Musgraves",  t: "Rainbow" },
    { a: "Luke Combs",       t: "Beer Never Broke My Heart" },
    { a: "Zac Brown Band",   t: "Chicken Fried" },
    { a: "Johnny Cash",      t: "Hurt" },
    { a: "Dolly Parton",     t: "I Will Always Love You" },
    { a: "Garth Brooks",     t: "The Dance" },
    { a: "Shania Twain",     t: "You're Still the One" },
    { a: "Carrie Underwood", t: "Jesus Take the Wheel" },
    { a: "Miranda Lambert",  t: "The House That Built Me" },
    { a: "Brad Paisley",     t: "Then" },
    { a: "Kenny Rogers",     t: "Islands in the Stream" },
    { a: "Willie Nelson",    t: "Always on My Mind" },
    { a: "Kacey Musgraves",  t: "Butterflies" },
  ]},
  { id: "christmas", label: "Noël 🎄",       emoji: "🎅", bpm: 105, tracks: [
    { a: "Mariah Carey",     t: "All I Want for Christmas Is You" },
    { a: "Wham!",            t: "Last Christmas" },
    { a: "Michael Bublé",    t: "It's Beginning to Look a Lot Like Christmas" },
    { a: "Frank Sinatra",    t: "Jingle Bells" },
    { a: "Nat King Cole",    t: "The Christmas Song" },
    { a: "Bing Crosby",      t: "White Christmas" },
    { a: "Brenda Lee",       t: "Rockin' Around the Christmas Tree" },
    { a: "Elvis Presley",    t: "Blue Christmas" },
    { a: "Andy Williams",    t: "It's the Most Wonderful Time of the Year" },
    { a: "Bobby Helms",      t: "Jingle Bell Rock" },
    { a: "John Lennon",      t: "Happy Xmas (War Is Over)" },
    { a: "Dean Martin",      t: "Let It Snow" },
    { a: "Ariana Grande",    t: "Santa Tell Me" },
    { a: "José Feliciano",   t: "Feliz Navidad" },
    { a: "Paul McCartney",   t: "Wonderful Christmastime" },
    { a: "Chris Rea",        t: "Driving Home for Christmas" },
    { a: "Slade",            t: "Merry Xmas Everybody" },
    { a: "Band Aid",         t: "Do They Know It's Christmas?" },
    { a: "Nat King Cole",    t: "O Holy Night" },
    { a: "Michael Bublé",    t: "Have Yourself a Merry Little Christmas" },
    { a: "Greg Lake",        t: "I Believe in Father Christmas" },
    { a: "Jackson 5",        t: "Santa Claus Is Coming to Town" },
  ]},
  { id: "bollywood", label: "Bollywood",     emoji: "🎭", bpm: 110, tracks: [
    { a: "A.R. Rahman",      t: "Jai Ho" },
    { a: "Arijit Singh",     t: "Tum Hi Ho" },
    { a: "Lata Mangeshkar",  t: "Lag Ja Gale" },
    { a: "A.R. Rahman",      t: "Chaiyya Chaiyya" },
    { a: "Shreya Ghoshal",   t: "Deewani Mastani" },
    { a: "Sonu Nigam",       t: "Kal Ho Naa Ho" },
    { a: "Udit Narayan",     t: "Pehla Nasha" },
    { a: "Kishore Kumar",    t: "Mere Sapno Ki Rani" },
    { a: "Ankit Tiwari",     t: "Galliyan" },
    { a: "Kumar Sanu",       t: "Tip Tip Barsa Pani" },
    { a: "Alka Yagnik",      t: "Dilbar Dilbar" },
    { a: "Vishal-Shekhar",   t: "Balam Pichkari" },
    { a: "A.R. Rahman",      t: "Dil Se Re" },
    { a: "Arijit Singh",     t: "Phir Le Aya Dil" },
    { a: "Lata Mangeshkar",  t: "Ajeeb Dastan Hai Yeh" },
    { a: "Sonu Nigam",       t: "Sandese Aate Hain" },
    { a: "Kishore Kumar",    t: "Yeh Shaam Mastani" },
    { a: "Kumar Sanu",       t: "Yeh Kaali Kaali Aankhen" },
    { a: "Alka Yagnik",      t: "Tu Hi Re" },
    { a: "Shreya Ghoshal",   t: "Teri Meri" },
    { a: "Arijit Singh",     t: "Ae Dil Hai Mushkil" },
    { a: "A.R. Rahman",      t: "Roja" },
  ]},
  { id: "bossa",    label: "Bossa Nova",      emoji: "🌴", bpm: 130, tracks: [
    { a: "João Gilberto",    t: "The Girl from Ipanema" },
    { a: "Antônio Carlos Jobim", t: "Wave" },
    { a: "Stan Getz",        t: "Corcovado" },
    { a: "Antônio Carlos Jobim", t: "Desafinado" },
    { a: "Caetano Veloso",   t: "Sozinho" },
    { a: "Milton Nascimento", t: "Travessia" },
    { a: "Gal Costa",        t: "Aquarela do Brasil" },
    { a: "Chico Buarque",    t: "A Banda" },
    { a: "Elis Regina",      t: "Como Nossos Pais" },
    { a: "Sergio Mendes",    t: "Mas Que Nada" },
    { a: "Astrud Gilberto",  t: "Fly Me to the Moon" },
    { a: "Vinicius de Moraes", t: "Garota de Ipanema" },
    { a: "João Gilberto",    t: "Chega de Saudade" },
    { a: "Antônio Carlos Jobim", t: "Garota de Ipanema" },
    { a: "Caetano Veloso",   t: "Cucurrucucú Paloma" },
    { a: "Gal Costa",        t: "Baby" },
    { a: "Chico Buarque",    t: "Construção" },
    { a: "Elis Regina",      t: "Águas de Março" },
    { a: "Djavan",           t: "Flor de Lis" },
    { a: "Baden Powell",     t: "Canto de Ossanha" },
    { a: "Roberto Carlos",   t: "Emoções" },
    { a: "Maria Bethânia",   t: "Reconvexo" },
  ]},
  { id: "punk",     label: "Punk Rock",       emoji: "⚡", bpm: 160, tracks: [
    { a: "The Clash",        t: "London Calling" },
    { a: "Sex Pistols",      t: "God Save the Queen" },
    { a: "The Ramones",      t: "Blitzkrieg Bop" },
    { a: "Green Day",        t: "Basket Case" },
    { a: "The Offspring",    t: "Come Out and Play" },
    { a: "Blink-182",        t: "All the Small Things" },
    { a: "NOFX",             t: "Linoleum" },
    { a: "Rancid",           t: "Ruby Soho" },
    { a: "Sum 41",           t: "In Too Deep" },
    { a: "Bad Religion",     t: "Infected" },
    { a: "Pennywise",        t: "Bro Hymn" },
    { a: "The Descendents",  t: "I'm the One" },
    { a: "The Clash",        t: "Should I Stay or Should I Go" },
    { a: "The Ramones",      t: "I Wanna Be Sedated" },
    { a: "Green Day",        t: "American Idiot" },
    { a: "Blink-182",        t: "What's My Age Again?" },
    { a: "The Offspring",    t: "Pretty Fly" },
    { a: "Misfits",          t: "Astro Zombies" },
    { a: "Dead Kennedys",    t: "Holiday in Cambodia" },
    { a: "Social Distortion", t: "Ball and Chain" },
    { a: "The Buzzcocks",    t: "Ever Fallen in Love" },
    { a: "The Stranglers",   t: "No More Heroes" },
  ]},
  { id: "rnb2000s",  label: "2000s R&B",       emoji: "💎", bpm: 95, tracks: [
    { a: "Usher",              t: "Yeah!" },
    { a: "Alicia Keys",        t: "Fallin'" },
    { a: "Rihanna",            t: "Umbrella" },
    { a: "Ne-Yo",              t: "So Sick" },
    { a: "Mario",              t: "Let Me Love You" },
    { a: "Ciara",              t: "Goodies" },
    { a: "Ashanti",            t: "Foolish" },
    { a: "Jennifer Lopez",     t: "Jenny from the Block" },
    { a: "Mary J Blige",       t: "Be Without You" },
    { a: "John Legend",        t: "Ordinary People" },
    { a: "Chris Brown",        t: "Run It!" },
    { a: "Keyshia Cole",       t: "Love" },
    { a: "Usher",              t: "Confessions Part II" },
    { a: "Alicia Keys",        t: "No One" },
    { a: "Rihanna",            t: "We Found Love" },
    { a: "Beyoncé",            t: "Irreplaceable" },
    { a: "Ne-Yo",              t: "Closer" },
    { a: "Trey Songz",         t: "Can't Help But Wait" },
    { a: "Tank",               t: "Please Don't Go" },
    { a: "Omarion",            t: "Ice Box" },
    { a: "Amerie",             t: "1 Thing" },
    { a: "Lloyd",              t: "Get It Shawty" },
  ]},
  { id: "hiphop2000s", label: "2000s Hip-Hop",  emoji: "🔥", bpm: 92, tracks: [
    { a: "50 Cent",            t: "In Da Club" },
    { a: "Kanye West",         t: "Gold Digger" },
    { a: "Lil Wayne",          t: "A Milli" },
    { a: "T.I.",               t: "Whatever You Like" },
    { a: "Ludacris",           t: "Stand Up" },
    { a: "Rick Ross",          t: "Hustlin'" },
    { a: "Drake",              t: "Best I Ever Had" },
    { a: "Kid Cudi",           t: "Pursuit of Happiness" },
    { a: "Wiz Khalifa",        t: "Black and Yellow" },
    { a: "Soulja Boy",         t: "Crank That" },
    { a: "Young Jeezy",        t: "Soul Survivor" },
    { a: "Nelly",              t: "Dilemma" },
    { a: "Kanye West",         t: "Stronger" },
    { a: "Lil Wayne",          t: "Lollipop" },
    { a: "Drake",              t: "Hotline Bling" },
    { a: "Jay-Z",              t: "Empire State of Mind" },
    { a: "T.I.",               t: "Live Your Life" },
    { a: "Fabolous",           t: "Make Me Better" },
    { a: "Young Jeezy",        t: "Go Crazy" },
    { a: "Ludacris",           t: "Money Maker" },
    { a: "50 Cent",            t: "Candy Shop" },
    { a: "Nelly",              t: "Hot in Herre" },
  ]},
  { id: "current",   label: "Current Hits",     emoji: "📱", bpm: 115, tracks: [
    { a: "Sabrina Carpenter",  t: "Espresso" },
    { a: "Chappell Roan",      t: "Good Luck, Babe!" },
    { a: "Billie Eilish",      t: "BIRDS OF A FEATHER" },
    { a: "Kendrick Lamar",     t: "Not Like Us" },
    { a: "Charli XCX",         t: "360" },
    { a: "Beyoncé",            t: "Texas Hold 'Em" },
    { a: "Benson Boone",       t: "Beautiful Things" },
    { a: "Hozier",             t: "Too Sweet" },
    { a: "Post Malone",        t: "I Had Some Help" },
    { a: "Gracie Abrams",      t: "That's So True" },
    { a: "Sabrina Carpenter",  t: "Please Please Please" },
    { a: "Tommy Richman",      t: "MILLION DOLLAR BABY" },
    { a: "Charli XCX",         t: "Brat" },
    { a: "Sabrina Carpenter",  t: "Short n' Sweet" },
    { a: "Billie Eilish",      t: "lunch" },
    { a: "Dua Lipa",           t: "Training Season" },
    { a: "Taylor Swift",       t: "Fortnight" },
    { a: "Ariana Grande",      t: "we can't be friends" },
    { a: "Olivia Rodrigo",     t: "vampire" },
    { a: "SZA",                t: "Snooze" },
    { a: "Tate McRae",         t: "Greedy" },
    { a: "Ice Spice",          t: "Princess Diana" },
  ]},
  { id: "pop90s",   label: "90s Pop",        emoji: "📼", bpm: 115, tracks: [
    { a: "Backstreet Boys",  t: "I Want It That Way" },
    { a: "NSYNC",            t: "Bye Bye Bye" },
    { a: "Spice Girls",      t: "Wannabe" },
    { a: "Destiny's Child",  t: "Say My Name" },
    { a: "TLC",              t: "No Scrubs" },
    { a: "No Doubt",         t: "Don't Speak" },
    { a: "Mariah Carey",     t: "Fantasy" },
    { a: "Whitney Houston",  t: "I Will Always Love You" },
    { a: "Shania Twain",     t: "That Don't Impress Me Much" },
    { a: "Boyzone",          t: "Words" },
    { a: "Take That",        t: "Back for Good" },
    { a: "All Saints",       t: "Never Ever" },
    { a: "Savage Garden",    t: "Truly Madly Deeply" },
    { a: "Hanson",           t: "MMMBop" },
    { a: "Aqua",             t: "Barbie Girl" },
    { a: "Ace of Base",      t: "All That She Wants" },
    { a: "Robbie Williams",  t: "Angels" },
    { a: "Celine Dion",      t: "My Heart Will Go On" },
    { a: "Boyz II Men",      t: "End of the Road" },
    { a: "En Vogue",         t: "Don't Let Go" },
    { a: "Sheryl Crow",      t: "All I Wanna Do" },
    { a: "Alanis Morissette", t: "You Oughta Know" },
    { a: "Coolio",           t: "Gangsta's Paradise" },
    { a: "Hootie and the Blowfish", t: "Hold My Hand" },
    { a: "4 Non Blondes",    t: "What's Up" },
    { a: "Backstreet Boys",  t: "Everybody (Backstreet's Back)" },
    { a: "NSYNC",            t: "Tearin' Up My Heart" },
    { a: "Spice Girls",      t: "Say You'll Be There" },
    { a: "Britney Spears",   t: "...Baby One More Time" },
    { a: "Christina Aguilera", t: "Genie in a Bottle" },
    { a: "Destiny's Child",  t: "Bills, Bills, Bills" },
  ]},
  { id: "kids",     label: "Kids & Family",  emoji: "🧸", bpm: 100, tracks: [
    { a: "Pinkfong",         t: "Baby Shark" },
    { a: "Pharrell Williams", t: "Happy" },
    { a: "Justin Timberlake", t: "Can't Stop the Feeling" },
    { a: "Tegan and Sara",   t: "Everything Is Awesome" },
    { a: "Jason Paige",      t: "Pokémon Theme" },
    { a: "PSY",              t: "Gangnam Style" },
    { a: "Los del Rio",      t: "Macarena" },
    { a: "Village People",   t: "Y.M.C.A." },
    { a: "Julie Andrews",    t: "Do Re Mi" },
    { a: "Julie Andrews",    t: "Supercalifragilisticexpialidocious" },
    { a: "Bob the Builder",  t: "Can We Fix It" },
    { a: "The Wiggles",      t: "Hot Potato" },
    { a: "Idina Menzel",     t: "Let It Go" },
    { a: "Randy Newman",     t: "You've Got a Friend in Me" },
    { a: "Lin-Manuel Miranda", t: "We Don't Talk About Bruno" },
    { a: "Auli'i Cravalho",  t: "How Far I'll Go" },
    { a: "Elton John",       t: "Circle of Life" },
    { a: "Donny Osmond",     t: "I'll Make a Man Out of You" },
    { a: "American Authors", t: "Best Day of My Life" },
    { a: "Raffi",            t: "Baby Beluga" },
    { a: "Owl City",         t: "Fireflies" },
    { a: "Daft Punk",        t: "Around the World" },
  ]},
  { id: "neosoul",  label: "Neo-Soul",           emoji: "🕊️", bpm: 90, tracks: [
    { a: "Erykah Badu",       t: "On & On" },
    { a: "D'Angelo",          t: "Brown Sugar" },
    { a: "Lauryn Hill",       t: "Ex-Factor" },
    { a: "Maxwell",           t: "Ascension (Don't Ever Wonder)" },
    { a: "India.Arie",        t: "Video" },
    { a: "Musiq Soulchild",   t: "Just Friends (Sunny)" },
    { a: "Jill Scott",        t: "A Long Walk" },
    { a: "John Legend",       t: "Ordinary People" },
    { a: "Alicia Keys",       t: "Fallin'" },
    { a: "Frank Ocean",       t: "Thinkin Bout You" },
    { a: "Amy Winehouse",     t: "Back to Black" },
    { a: "H.E.R.",            t: "Focus" },
    { a: "SZA",               t: "The Weekend" },
    { a: "Daniel Caesar",     t: "Get You" },
    { a: "Jhené Aiko",        t: "The Worst" },
    { a: "Childish Gambino",  t: "Redbone" },
    { a: "Leon Bridges",      t: "Coming Home" },
    { a: "Lianne La Havas",   t: "Unstoppable" },
    { a: "Corinne Bailey Rae", t: "Put Your Records On" },
    { a: "Bilal",             t: "Soul Sista" },
  ]},
  { id: "funk",     label: "Funk",               emoji: "🎺", bpm: 108, tracks: [
    { a: "James Brown",       t: "Get Up (I Feel Like Being a) Sex Machine" },
    { a: "Sly & The Family Stone", t: "Higher" },
    { a: "Parliament",        t: "Give Up the Funk (Tear the Roof off the Sucker)" },
    { a: "George Clinton",    t: "Atomic Dog" },
    { a: "Kool & The Gang",   t: "Jungle Boogie" },
    { a: "Earth Wind & Fire", t: "September" },
    { a: "Chic",              t: "Le Freak" },
    { a: "Rick James",        t: "Super Freak" },
    { a: "Prince",            t: "Kiss" },
    { a: "Cameo",             t: "Word Up!" },
    { a: "Tower of Power",    t: "What Is Hip?" },
    { a: "The Gap Band",      t: "Outstanding" },
    { a: "Zapp",              t: "Doo Wa Ditty (Blow That Thing)" },
    { a: "Ohio Players",      t: "Love Rollercoaster" },
    { a: "Bootsy Collins",    t: "Bootzilla" },
    { a: "The Meters",        t: "Cissy Strut" },
    { a: "Stevie Wonder",     t: "Higher Ground" },
    { a: "Michael Jackson",   t: "Don't Stop 'Til You Get Enough" },
    { a: "Bruno Mars",        t: "Uptown Funk" },
    { a: "Mark Ronson",       t: "Feel Right" },
  ]},
  { id: "blues",    label: "Blues",              emoji: "🎸", bpm: 80, tracks: [
    { a: "B.B. King",         t: "The Thrill Is Gone" },
    { a: "Muddy Waters",      t: "Hoochie Coochie Man" },
    { a: "Robert Johnson",    t: "Cross Road Blues" },
    { a: "John Lee Hooker",   t: "Boom Boom" },
    { a: "Howlin' Wolf",      t: "Smokestack Lightning" },
    { a: "Stevie Ray Vaughan", t: "Pride and Joy" },
    { a: "Eric Clapton",      t: "Lay Down Sally" },
    { a: "Buddy Guy",         t: "Damn Right, I've Got the Blues" },
    { a: "Gary Moore",        t: "Still Got the Blues" },
    { a: "Etta James",        t: "I'd Rather Go Blind" },
    { a: "Koko Taylor",       t: "Wang Dang Doodle" },
    { a: "Albert King",       t: "Born Under a Bad Sign" },
    { a: "Joe Cocker",        t: "With a Little Help from My Friends" },
    { a: "The Blues Brothers", t: "Soul Man" },
    { a: "Johnny Winter",     t: "Still Alive and Well" },
    { a: "Susan Tedeschi",    t: "It Hurt So Bad" },
    { a: "Joe Bonamassa",     t: "Sloe Gin" },
    { a: "Derek Trucks",      t: "Anyday" },
    { a: "Taj Mahal",         t: "Fishin' Blues" },
    { a: "Robert Cray",       t: "Smoking Gun" },
  ]},
  { id: "musicals", label: "Musicals",           emoji: "🎭", bpm: 112, answerMode: "title-only", singleLabel: "Song or Musical", tracks: [
    { a: "Original Broadway Cast", t: "Hamilton" },
    { a: "Les Misérables Original Cast", t: "I Dreamed a Dream" },
    { a: "Wicked Original Cast", t: "Defying Gravity" },
    { a: "Grease Original Soundtrack", t: "Summer Nights" },
    { a: "The Lion King Original Soundtrack", t: "Circle of Life" },
    { a: "Mamma Mia Original Cast", t: "Dancing Queen" },
    { a: "Phantom of the Opera Original Cast", t: "The Music of the Night" },
    { a: "Chicago Original Cast", t: "All That Jazz" },
    { a: "Rent Original Cast", t: "Seasons of Love" },
    { a: "West Side Story Original Soundtrack", t: "America" },
    { a: "Cabaret Original Cast", t: "Cabaret" },
    { a: "Hairspray Original Cast", t: "Good Morning Baltimore" },
    { a: "Sweeney Todd Original Cast", t: "The Worst Pies in London" },
    { a: "Into the Woods Original Cast", t: "Children Will Listen" },
    { a: "A Chorus Line Original Cast", t: "What I Did for Love" },
    { a: "Frozen Original Broadway Cast", t: "Let It Go" },
    { a: "Dear Evan Hansen Original Cast", t: "You Will Be Found" },
    { a: "The Greatest Showman", t: "This Is Me" },
    { a: "La La Land Soundtrack", t: "City of Stars" },
    { a: "Moulin Rouge Broadway Cast", t: "Come What May" },
  ]},
  { id: "tvthemes_classic", label: "Classic TV Themes", emoji: "📺", bpm: 100, artistLabel: "Show", artistPlaceholder: "Which TV show?", answerMode: "title-only", singleLabel: "Show Name", tracks: [
    { a: "Neal Hefti",        t: "Batman Theme" },
    { a: "Sherwood Schwartz", t: "Gilligan's Island Theme" },
    { a: "Vic Mizzy",         t: "Get Smart Theme" },
    { a: "Earle Hagen",       t: "The Andy Griffith Show Theme" },
    { a: "Vic Mizzy",         t: "The Addams Family Theme" },
    { a: "George Tipton",     t: "The Munsters Theme" },
    { a: "Lalo Schifrin",     t: "Mission Impossible Theme" },
    { a: "Henry Mancini",     t: "Peter Gunn Theme" },
    { a: "Mike Post",         t: "Hill Street Blues Theme" },
    { a: "Mike Post",         t: "Magnum P.I. Theme" },
    { a: "Jan Hammer",        t: "Miami Vice Theme" },
    { a: "Bob James",         t: "Taxi Theme (Angela)" },
    { a: "Sonny Curtis",      t: "Love Is All Around (Mary Tyler Moore Theme)" },
    { a: "Andrew Gold",       t: "Thank You for Being a Friend" },
    { a: "John Williams",     t: "Where Everybody Knows Your Name (Cheers Theme)" },
    { a: "Mike Post",         t: "The A-Team Theme" },
    { a: "Mike Post",         t: "Law & Order Theme" },
    { a: "Stu Phillips",      t: "Knight Rider Theme" },
    { a: "Johnny Harris",     t: "Danger Man Theme" },
    { a: "John Barry",        t: "The Persuaders Theme" },
  ]},
  { id: "tvthemes_modern", label: "Modern TV Themes",  emoji: "🖥️", bpm: 108, artistLabel: "Show", artistPlaceholder: "Which TV show?", answerMode: "title-only", singleLabel: "Show Name", tracks: [
    { a: "The Rembrandts",    t: "I'll Be There for You (Friends Theme)" },
    { a: "Mark Snow",         t: "The X-Files Theme" },
    { a: "Angelo Badalamenti", t: "Twin Peaks Theme" },
    { a: "Jonathan Wolff",    t: "Seinfeld Theme" },
    { a: "Danny Elfman",      t: "The Simpsons Theme" },
    { a: "DJ Jazzy Jeff & Fresh Prince", t: "The Fresh Prince of Bel-Air Theme" },
    { a: "Ramin Djawadi",     t: "Game of Thrones Theme" },
    { a: "Ramin Djawadi",     t: "Westworld Theme" },
    { a: "Alison Krauss",     t: "Down to the River to Pray (O Brother Where Art Thou)" },
    { a: "Sofi Tukker",       t: "Best Friend (Mr Robot)" },
    { a: "Jeff Russo",        t: "Fargo Theme" },
    { a: "Blake Neely",       t: "Arrow Theme" },
    { a: "Bear McCreary",     t: "Battlestar Galactica Theme" },
    { a: "Alan Silvestri",    t: "ER Theme" },
    { a: "W.G. Snuffy Walden", t: "The West Wing Theme" },
    { a: "David Bowie",       t: "Heroes (Stranger Things)" },
    { a: "Nathan Barr",       t: "True Blood Theme" },
    { a: "Ludwig Göransson",  t: "The Mandalorian Theme" },
    { a: "Christophe Beck",   t: "WandaVision Theme" },
    { a: "Danny Elfman",      t: "Desperate Housewives Theme" },
  ]},
  { id: "70s",      label: "70s Hits",           emoji: "🕺", bpm: 112, tracks: [
    { a: "ABBA",              t: "Dancing Queen" },
    { a: "Fleetwood Mac",     t: "Go Your Own Way" },
    { a: "Led Zeppelin",      t: "Stairway to Heaven" },
    { a: "The Eagles",        t: "Hotel California" },
    { a: "Queen",             t: "Bohemian Rhapsody" },
    { a: "David Bowie",       t: "Heroes" },
    { a: "Elton John",        t: "Rocket Man" },
    { a: "Pink Floyd",        t: "Wish You Were Here" },
    { a: "The Rolling Stones", t: "Angie" },
    { a: "Rod Stewart",       t: "Maggie May" },
    { a: "Cat Stevens",       t: "Wild World" },
    { a: "Donna Summer",      t: "Hot Stuff" },
    { a: "The Bee Gees",      t: "Stayin' Alive" },
    { a: "Gloria Gaynor",     t: "I Will Survive" },
    { a: "Barry White",       t: "Can't Get Enough of Your Love, Babe" },
    { a: "Marvin Gaye",       t: "Let's Get It On" },
    { a: "Stevie Wonder",     t: "Superstition" },
    { a: "Al Green",          t: "Let's Stay Together" },
    { a: "Carly Simon",       t: "You're So Vain" },
    { a: "James Taylor",      t: "Fire and Rain" },
  ]},
  { id: "workout",  label: "Workout / Gym",      emoji: "💪", bpm: 140, tracks: [
    { a: "AC/DC",             t: "Thunderstruck" },
    { a: "Eye of the Tiger", t: "Survivor" },
    { a: "Eminem",            t: "Till I Collapse" },
    { a: "Kanye West",        t: "Stronger" },
    { a: "Daft Punk",         t: "Harder Better Faster Stronger" },
    { a: "The Prodigy",       t: "Firestarter" },
    { a: "Rage Against the Machine", t: "Killing in the Name" },
    { a: "Justice",           t: "D.A.N.C.E." },
    { a: "David Guetta",      t: "Titanium" },
    { a: "Calvin Harris",     t: "Feel So Close" },
    { a: "Martin Garrix",     t: "Animals" },
    { a: "Skrillex",          t: "Bangarang" },
    { a: "Avicii",            t: "Levels" },
    { a: "Chemical Brothers", t: "Block Rockin' Beats" },
    { a: "Nine Inch Nails",   t: "Head Like a Hole" },
    { a: "Linkin Park",       t: "Numb" },
    { a: "Drowning Pool",     t: "Bodies" },
    { a: "Metallica",         t: "Enter Sandman" },
    { a: "Rocky Soundtrack",  t: "Gonna Fly Now" },
    { a: "Freddie Mercury",   t: "Don't Stop Me Now" },
  ]},
  { id: "lofi",     label: "Lo-fi / Chill",      emoji: "☕", bpm: 75, tracks: [
    { a: "Nujabes",           t: "Feather" },
    { a: "Nujabes",           t: "Luv(sic) Part 3" },
    { a: "J Dilla",           t: "So Far to Go" },
    { a: "Kaytranada",        t: "Bus Ride" },
    { a: "BadBadNotGood",     t: "Time Moves Slow" },
    { a: "Toro y Moi",        t: "So Many Details" },
    { a: "Mac DeMarco",       t: "Chamber of Reflection" },
    { a: "Com Truise",        t: "Propagation" },
    { a: "Tycho",             t: "Awake" },
    { a: "Four Tet",          t: "Locked" },
    { a: "Bonobo",            t: "Kong" },
    { a: "Khruangbin",        t: "Maria También" },
    { a: "Mild High Club",    t: "Windowpane" },
    { a: "Men I Trust",       t: "Show Me How" },
    { a: "Unknown Mortal Orchestra", t: "Multi-Love" },
    { a: "Homeshake",         t: "Call Me Up" },
    { a: "Still Woozy",       t: "Goodie Bag" },
    { a: "Rex Orange County", t: "Loving Is Easy" },
    { a: "Clairo",            t: "Pretty Girl" },
    { a: "Snail Mail",        t: "Pristine" },
  ]},
  { id: "random",    label: "Random Mix",        emoji: "🎲", bpm: 110, tracks: null, random: true },
];

/* ── Dynamic theme search terms ─────────────────────────────
   fetchThemeTracks() picks 4 random terms, queries iTunes
   limit=50 each, pools ~200 candidates, returns 20 shuffled
   tracks that have a preview URL — different every game.
────────────────────────────────────────────────────────────── */
const THEME_SEARCH_TERMS = {
  pop80s:          ['Michael Jackson','Madonna','Prince','Cyndi Lauper','Whitney Houston','George Michael','Duran Duran','Bon Jovi','Tina Turner','Phil Collins','Lionel Richie','Rick Springfield'],
  rnb90s:          ['TLC','Aaliyah','Mary J Blige','Boyz II Men','Mariah Carey',"Destiny's Child",'Usher','En Vogue','SWV','Blackstreet','Janet Jackson','Brian McKnight'],
  disney:          ['Disney Princess','Lion King soundtrack','Frozen Disney','Little Mermaid Disney','Aladdin Disney','Beauty Beast Disney','Encanto soundtrack','Moana Disney','Tangled Disney','Brave Disney','Pocahontas Disney','Mulan Disney'],
  kpop:            ['BTS kpop','BLACKPINK','EXO kpop','TWICE kpop','Stray Kids','aespa kpop','Red Velvet kpop','NCT 127','IU kpop','G-Dragon','SHINee','Super Junior'],
  frenchpop:       ['Stromae','Edith Piaf','Daft Punk','Christine and the Queens','Indochine','Serge Gainsbourg','Charles Aznavour','Jacques Brel','Aya Nakamura','Angele','France Gall','Camille'],
  rock:            ['AC DC','Led Zeppelin','Rolling Stones','Guns N Roses','Aerosmith','U2','The Police','Bruce Springsteen','Dire Straits','ZZ Top','Tom Petty','Creedence Clearwater Revival'],
  reggaeton:       ['Bad Bunny','J Balvin','Daddy Yankee','Ozuna','Maluma','Nicky Jam','Anuel AA','Karol G','Lunay','Sech','Jhay Cortez','Rauw Alejandro'],
  metal:           ['Metallica','Iron Maiden','Black Sabbath','Slayer','Pantera','Megadeth','Judas Priest','Motorhead','Ozzy Osbourne','System of a Down','Slipknot','Dio'],
  anime:           ['Naruto soundtrack','Dragon Ball Z OST','Attack on Titan OST','One Piece opening','My Hero Academia OST','Sword Art Online OST','Death Note OST','Fullmetal Alchemist OST','Evangelion OST','Demon Slayer OST','Hunter x Hunter OST','Cowboy Bebop OST'],
  jazz:            ['Miles Davis','John Coltrane','Thelonious Monk','Billie Holiday','Louis Armstrong','Ella Fitzgerald','Duke Ellington','Charlie Parker','Bill Evans','Dave Brubeck','Chet Baker','Herbie Hancock'],
  videogames:      ['Mario Nintendo soundtrack','Zelda Nintendo','Final Fantasy OST','Halo OST','Pokemon soundtrack','Sonic video game','Metal Gear OST','Kingdom Hearts OST','Undertale OST','Skyrim OST','Chrono Trigger OST','Doom game OST'],
  films:           ['Hans Zimmer','John Williams film','Ennio Morricone','James Bond theme','Rocky soundtrack','Star Wars OST','Indiana Jones OST','Dark Knight OST','Inception OST','Interstellar OST','Pulp Fiction soundtrack','Top Gun soundtrack'],
  soul:            ['Aretha Franklin','Otis Redding','Sam Cooke','Marvin Gaye','Stevie Wonder','Al Green','James Brown','Ray Charles','Wilson Pickett','Bill Withers','Smokey Robinson','Curtis Mayfield'],
  edm:             ['Daft Punk','Calvin Harris','Avicii','Martin Garrix','David Guetta','Skrillex','Deadmau5','Tiesto','Marshmello','Zedd','Kygo','Swedish House Mafia'],
  latin:           ['Shakira','Marc Anthony','Jennifer Lopez','Ricky Martin','Enrique Iglesias','Bad Bunny','Juan Gabriel','Carlos Vives','Luis Miguel','Gloria Estefan','Selena','Pitbull'],
  pop2000s:        ['Britney Spears','NSYNC','Backstreet Boys','Christina Aguilera','Justin Timberlake','Beyonce','Nelly Furtado','Kelly Clarkson','Pink','Alicia Keys','Rihanna','Amy Winehouse'],
  hiphop:          ['Jay-Z','Nas','Notorious BIG','Tupac','Eminem','Outkast','Kanye West','Kendrick Lamar','Drake','Lil Wayne','Common','Mos Def'],
  disco:           ['ABBA','Bee Gees','Donna Summer','Gloria Gaynor','Chic','Earth Wind Fire','KC Sunshine Band','Diana Ross','Village People','Sister Sledge','Rick James','Sylvester'],
  grunge:          ['Nirvana','Pearl Jam','Soundgarden','Alice in Chains','Stone Temple Pilots','Smashing Pumpkins','Bush','Foo Fighters','Weezer','Beck','Pixies','Mudhoney'],
  newwave:         ['Talking Heads','The Cure','Depeche Mode','New Order','Joy Division','The Smiths','Blondie','Devo','Siouxsie Banshees','Echo Bunnymen','Elvis Costello','Gary Numan'],
  pop2020s:        ['Olivia Rodrigo','Billie Eilish','Dua Lipa','Harry Styles','Doja Cat','SZA','Taylor Swift','Ariana Grande','The Weeknd','Post Malone','Lizzo','Lil Nas X'],
  afrobeats:       ['Burna Boy','Wizkid','Davido','Tiwa Savage','Mr Eazi','Rema','Tems','Ayra Starr','Asake','CKay','Fireboy DML','Omah Lay'],
  classical:       ['Beethoven','Mozart','Bach','Chopin','Vivaldi','Schubert','Brahms','Tchaikovsky','Debussy','Ravel','Liszt','Handel'],
  indie:           ['Bon Iver','Fleet Foxes','The Shins','Sufjan Stevens','Arcade Fire','Mumford Sons','The Lumineers','Of Monsters Men','Neutral Milk Hotel','Bright Eyes','Elliott Smith','Nick Drake'],
  country:         ['Johnny Cash','Dolly Parton','Willie Nelson','Garth Brooks','Shania Twain','Kenny Rogers','George Strait','Tim McGraw','Brad Paisley','Carrie Underwood','Miranda Lambert','Hank Williams'],
  christmas:       ['Mariah Carey Christmas','Frank Sinatra Christmas','Bing Crosby Christmas','Elvis Christmas','Nat King Cole Christmas','Michael Buble Christmas','Dean Martin Christmas','Wham Last Christmas','Brenda Lee Christmas','Jose Feliciano','Eartha Kitt Santa Baby','Christmas classics'],
  bollywood:       ['Arijit Singh','Shreya Ghoshal','Lata Mangeshkar','Mohammad Rafi','Kishore Kumar','Udit Narayan','Sonu Nigam','Sunidhi Chauhan','AR Rahman','Pritam','Amit Trivedi','Vishal Shekhar'],
  bossa:           ['Joao Gilberto','Astrud Gilberto','Antonio Carlos Jobim','Stan Getz bossa','Elis Regina','Caetano Veloso','Gilberto Gil','Milton Nascimento','Gal Costa','Chico Buarque','Nara Leao','Joyce Moreno'],
  punk:            ['The Clash','Sex Pistols','The Ramones','Bad Religion','NOFX','The Offspring','Green Day','Rancid','Dead Kennedys','Black Flag','Social Distortion','The Misfits'],
  rnb2000s:        ['Usher','Beyonce','Alicia Keys','Rihanna','Ne-Yo','Chris Brown','Ciara','Mario','Omarion','Amerie','Keyshia Cole','Trey Songz'],
  hiphop2000s:     ['Eminem','Jay-Z','Kanye West','50 Cent','Outkast','Missy Elliott','Lil Wayne','TI rapper','Nelly','Ludacris','DMX','Busta Rhymes'],
  current:         ['Sabrina Carpenter','Chappell Roan','Kendrick Lamar','Billie Eilish','Charli XCX','Taylor Swift','Ariana Grande','Post Malone','SZA','Doja Cat','Olivia Rodrigo','Bad Bunny'],
  kids:            ['Kidz Bop','Baby Shark','Wheels Bus kids','Disney children songs','Wiggles','Raffi','CoComelon songs','Barney songs','Mother Goose','Sesame Street','Pinkfong','Super Simple Songs'],
  neosoul:         ['Erykah Badu',"D'Angelo",'Lauryn Hill','Maxwell','India Arie','Musiq Soulchild','Jill Scott','John Legend','Frank Ocean','Amy Winehouse','HER singer','Daniel Caesar'],
  funk:            ['James Brown','Parliament Funkadelic','George Clinton','Kool Gang','Earth Wind Fire','Chic','Rick James','Prince funk','Cameo','Tower of Power','Ohio Players','Bootsy Collins'],
  blues:           ['BB King','Muddy Waters','John Lee Hooker','Howlin Wolf','Stevie Ray Vaughan','Eric Clapton blues','Buddy Guy','Gary Moore blues','Etta James','Albert King','Robert Cray','Keb Mo'],
  musicals:        ['Hamilton musical','Les Miserables musical','Wicked musical','Grease soundtrack','Mamma Mia musical','Phantom Opera','Chicago musical','Rent musical','West Side Story','Greatest Showman','La La Land','Dear Evan Hansen'],
  tvthemes_classic:['Batman TV theme','Mission Impossible theme','Peter Gunn Henry Mancini','Hill Street Blues theme','Miami Vice theme','Knight Rider theme','Andy Griffith theme','Addams Family theme','Cheers theme','Magnum PI theme','A-Team theme','Gilligan Island theme'],
  tvthemes_modern: ['Friends TV Rembrandts','X-Files theme','Game of Thrones theme','Seinfeld theme','Simpsons theme','Fresh Prince theme','Twin Peaks theme','Westworld theme','Fargo theme','Mandalorian theme','True Blood theme','Arrow theme'],
  '70s':           ['ABBA','Fleetwood Mac','Led Zeppelin','Eagles Hotel California','Queen','David Bowie','Elton John 70s','Pink Floyd','Rolling Stones 70s','Rod Stewart','Bee Gees','Donna Summer'],
  workout:         ['ACDC Thunderstruck','Survivor Eye Tiger','Eminem Till Collapse','Kanye Stronger','Daft Punk Harder','Prodigy Firestarter','Rage Against Machine','Martin Garrix Animals','Skrillex','Avicii Levels','Linkin Park','Chemical Brothers'],
  lofi:            ['Nujabes','J Dilla','Kaytranada','BadBadNotGood','Toro y Moi','Mac DeMarco','Tycho','Bonobo','Khruangbin','Four Tet','Mild High Club','Men I Trust'],
};

/* ── Visual animation note ───────────────────────────────── */
// Robot dance datasets removed. The standalone version uses CSS/body classes
// and the canvas visualizer instead of physical robot motion.

/* ── State ──────────────────────────────────────────────── */
const state = {
  mode: "free",
  openaiKey: null,
  theme: null,
  tracks: [],       // [{a, t, previewUrl, cover}]
  round: 0,
  rounds: [],       // [{artistCorrect, titleCorrect, pts, elapsed, track}]
  score: 0,
  timerValue: ROUND_DURATION,
  timerRaf: null,
  timerStart: null,
  roundStartTime: null,
  submitted: false,
  combo: 0,              // current correct streak
  maxCombo: 0,           // best streak this game
  hintsUsed: 0,          // total hint uses this game
  danceInterval: null,
  listeningPhase: null,  // "theme" | "playing" | null  (AI mode only)
  aiArtistFound: false,  // AI mode: artist confirmed by voice this round
  aiTitleFound:  false,  // AI mode: title confirmed by voice this round
};

// Pending theme when user spoke but hasn't confirmed yet (AI mode)
let _pendingTheme = null;

/* ── Browser-only animation stubs ────────────────────────── */
// Original AI DJ robot controls were removed. These no-op functions
// keep the quiz logic intact while the app runs fully in the browser.
function startRobotIdle() {}
function stopRobotIdle() {}
function robotDance(_bpm) { document.body.classList.add("beat-active"); }
function stopRobotDance() { document.body.classList.remove("beat-active"); }
function robotIdle() { stopRobotDance(); }
function robotReact(correct, _resumeDance = false) {
  document.body.classList.remove("answer-correct", "answer-wrong");
  document.body.classList.add(correct ? "answer-correct" : "answer-wrong");
  setTimeout(() => document.body.classList.remove("answer-correct", "answer-wrong"), 600);
}
function startRobotWobble() { document.body.classList.add("host-speaking"); }
function stopRobotWobble() { document.body.classList.remove("host-speaking"); }

/* ── In-game help modal ──────────────────────────────────── */
(function () {
  const modal    = document.getElementById("help-modal");
  const openBtn  = document.getElementById("help-btn");
  const closeBtn = document.getElementById("help-modal-close");
  if (!modal || !openBtn) return;
  openBtn.addEventListener("click",  () => modal.classList.remove("hidden"));
  closeBtn.addEventListener("click", () => modal.classList.add("hidden"));
  modal.addEventListener("click", (e) => { if (e.target === modal) modal.classList.add("hidden"); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") modal.classList.add("hidden"); });
})();

/* ── iTunes preview search (server proxy) ───────────────── */
async function enrichTracks(rawTracks) {
  const results = await Promise.all(
    rawTracks.map(async ({ a, t }) => {
      try {
        const res = await fetch(`/api/preview-search?q=${encodeURIComponent(a + ' ' + t)}`);
        return res.ok ? await res.json() : null;
      } catch { return null; }
    })
  );
  return rawTracks.map((raw, i) => ({
    ...raw,
    previewUrl: results[i]?.previewUrl ?? null,
    cover:      results[i]?.cover      ?? null,
  })).filter(tr => tr.previewUrl);
}

/* ── Dynamic iTunes track fetcher ───────────────────────────
   Picks 4 random search terms for the genre, fetches iTunes
   (limit=50 each) → pools ~200 unique candidates → returns
   `count` shuffled tracks already containing previewUrl+cover.
   Returns null on failure so caller can fall back to enrichTracks.
────────────────────────────────────────────────────────────── */
async function fetchThemeTracks(theme, count = 20) {
  const terms = THEME_SEARCH_TERMS[theme.id];
  if (!terms) return null;
  const picked = shuffle([...terms]).slice(0, 4);
  const allResults = await Promise.all(picked.map(async term => {
    try {
      const url = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=song&limit=50&country=us`;
      const res = await fetch(url);
      if (!res.ok) return [];
      const data = await res.json();
      return data.results || [];
    } catch { return []; }
  }));
  const seen = new Set();
  const pool = allResults.flat().filter(r => {
    if (!r.previewUrl || !r.trackId || seen.has(r.trackId)) return false;
    seen.add(r.trackId);
    return true;
  });
  if (pool.length < 8) return null;
  return shuffle(pool).slice(0, count).map(r => ({
    a: r.artistName,
    t: r.trackName,
    previewUrl: r.previewUrl,
    cover: (r.artworkUrl100 || '').replace('100x100bb', '300x300bb'),
  }));
}

/* ── Sound effects (Web Audio API) ─────────────────────── */
function sfx(type) {
  try {
    if (_audioCtx.state !== 'running') return;
    if (type === 'correct' || type === 'wrong') {
      const osc = _audioCtx.createOscillator();
      const gain = _audioCtx.createGain();
      osc.connect(gain); gain.connect(_audioCtx.destination);
      if (type === 'correct') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(660, _audioCtx.currentTime);
        osc.frequency.linearRampToValueAtTime(880, _audioCtx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.14, _audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0, _audioCtx.currentTime + 0.22);
        osc.start(_audioCtx.currentTime); osc.stop(_audioCtx.currentTime + 0.22);
      } else {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(200, _audioCtx.currentTime);
        osc.frequency.linearRampToValueAtTime(130, _audioCtx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.1, _audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0, _audioCtx.currentTime + 0.22);
        osc.start(_audioCtx.currentTime); osc.stop(_audioCtx.currentTime + 0.22);
      }
    } else if (type === 'combo') {
      [523, 659, 784, 1047].forEach((f, i) => {
        const o = _audioCtx.createOscillator();
        const g = _audioCtx.createGain();
        o.connect(g); g.connect(_audioCtx.destination);
        o.type = 'sine'; o.frequency.value = f;
        const t = _audioCtx.currentTime + i * 0.07;
        g.gain.setValueAtTime(0.13, t); g.gain.linearRampToValueAtTime(0, t + 0.13);
        o.start(t); o.stop(t + 0.14);
      });
    } else if (type === 'timeout') {
      const osc = _audioCtx.createOscillator();
      const gain = _audioCtx.createGain();
      osc.connect(gain); gain.connect(_audioCtx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(380, _audioCtx.currentTime);
      osc.frequency.linearRampToValueAtTime(200, _audioCtx.currentTime + 0.45);
      gain.gain.setValueAtTime(0.13, _audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0, _audioCtx.currentTime + 0.48);
      osc.start(_audioCtx.currentTime); osc.stop(_audioCtx.currentTime + 0.5);
    }
  } catch (_) { /* silent */ }
}

/* ── Combo badge ─────────────────────────────────────────── */
function updateComboBadge() {
  const badge = document.getElementById('combo-badge');
  if (!badge) return;
  const c = state.combo;
  if (c < 2) { badge.classList.add('hidden'); return; }
  badge.classList.remove('hidden', 'hot', 'fire');
  if (c >= 5)      badge.classList.add('fire');
  else if (c >= 3) badge.classList.add('hot');
  badge.textContent = `🔥 ×${c}`;
}

/* ── Hints ───────────────────────────────────────────────── */
function useHint(field) {
  const track = state.tracks[state.round];
  if (!track || state.submitted) return;
  const answer = field === 'artist' ? (track.src ?? track.a) : track.t;
  const input  = document.getElementById(`${field}-input`);
  if (input && !input.value) input.value = answer.slice(0, 3) + '…';
  const btn = document.getElementById(`hint-${field}`);
  if (btn) btn.disabled = true;
  state.hintsUsed++;
}

/* ── OpenAI ─────────────────────────────────────────────── */
async function generateTracksAI(theme) {
  const res = await fetch("/api/generate-tracks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ theme }),
  });
  if (!res.ok) throw new Error(`AI server error ${res.status}`);
  const json = await res.json();
  return json.tracks;
}

/* ── Voice AI (TTS + STT) ───────────────────────────────── */

async function speak(text) {
  if (state.mode !== "openai") return;
  try {
    await resumeAudio();
    const res = await fetch("/api/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    if (!res.ok) { console.error("TTS API error", res.status); return; }
    const blob = URL.createObjectURL(await res.blob());
    return new Promise((resolve) => {
      const el = document.getElementById("tts-audio");
      el.src = blob;
      const done = () => { URL.revokeObjectURL(blob); resolve(); };
      el.onended = done;
      el.onerror = (e) => { console.warn("TTS element error:", e); done(); };
      el.play().catch(e => { console.warn("TTS autoplay blocked:", e); done(); });
    });
  } catch (e) { console.error("TTS error:", e); }
}

// STT: Web Speech API + real microphone access.
let _recognition = null;

function startListening(phase) {
  if (state.mode !== "openai") return;
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) {
    setAIThemeMicState("error");
    return;
  }
  stopListening();
  // Native SpeechRecognition (Chrome / Safari / Firefox) manages mic access
  // internally — it does NOT go through navigator.mediaDevices.getUserMedia.
  // Swapping getUserMedia here caused the speech engine to lose its music stream
  // whenever it re-queried the API during the 5-second window.

  const rec = new SR();
  rec.lang            = "en-US";
  rec.interimResults  = true;
  rec.continuous      = true;
  rec.maxAlternatives = 1;

  rec.onresult = (e) => {
    let interim = "", final = "";
    for (let i = e.resultIndex; i < e.results.length; i++) {
      const t = e.results[i][0].transcript;
      if (e.results[i].isFinal) final += t;
      else                      interim += t;
    }
    const heard = (final || interim).trim();

    if (phase === "theme") {
      // Show live transcript while user speaks
      const el = document.getElementById("ai-theme-transcript");
      if (el && heard) { el.textContent = `"${heard}"`; el.classList.remove("hidden"); }
      if (final) onThemeSpeech(final.trim());
    }

    if (phase === "playing" && final) {
      onAnswerSpeech(final.trim());
    }
  };

  rec.onerror = (e) => {
    if (e.error === "no-speech" || e.error === "aborted") return;
    console.warn("STT error:", e.error);
    if (phase === "theme") setAIThemeMicState("idle");
  };

  rec.onend = () => {
    // Auto-restart for continuous listening
    if (state.listeningPhase && !state.submitted) {
      try { _recognition?.start(); } catch (_) {}
    }
  };

  state.listeningPhase = phase;
  _recognition = rec;
  try {
    rec.start();
  } catch (e) {
    console.warn("STT start:", e);
    if (phase === "theme") setAIThemeMicState("idle");
  }
}

function stopListening() {
  state.listeningPhase = null;
  if (_recognition) {
    try { _recognition.stop(); } catch (_) {}
    _recognition = null;
  }
}

/* ── AI Theme UI state machine ──────────────────────────── */
// States for the big mic button on the theme page
function setAIThemeMicState(s) {
  const btn   = document.getElementById("ai-theme-mic-btn");
  const label = document.getElementById("ai-theme-mic-label");
  if (!btn) return;
  btn.classList.toggle("listening", s === "listening");
  if (s === "listening") {
    label.textContent = "Listening…";
  } else if (s === "error") {
    label.textContent = "Voice not supported";
  } else {
    label.textContent = "Touch & speak";
  }
}

// AI theme ring timer (30 s countdown)
let _aiThemeTimerRaf  = null;
let _aiThemeTimerStart = null;
const AI_THEME_DURATION = 30;

function startAIThemeTimer() {
  stopAIThemeTimer();
  const ring = document.getElementById("ai-theme-ring");
  if (ring) ring.style.strokeDashoffset = "0"; // full ring
  _aiThemeTimerStart = performance.now();

  const tick = (now) => {
    const elapsed   = (now - _aiThemeTimerStart) / 1000;
    const remaining = Math.max(0, AI_THEME_DURATION - elapsed);
    const fraction  = remaining / AI_THEME_DURATION;
    if (ring) ring.style.strokeDashoffset = String(CIRCUMFERENCE * (1 - fraction));
    if (remaining <= 0) {
      // Timed out — reset to idle
      stopListening();
      setAIThemeMicState("idle");
      const tr = document.getElementById("ai-theme-transcript");
      if (tr) { tr.textContent = "Didn't catch that — tap to try again"; tr.classList.remove("hidden"); }
      return;
    }
    _aiThemeTimerRaf = requestAnimationFrame(tick);
  };
  _aiThemeTimerRaf = requestAnimationFrame(tick);
}

function stopAIThemeTimer() {
  if (_aiThemeTimerRaf) { cancelAnimationFrame(_aiThemeTimerRaf); _aiThemeTimerRaf = null; }
}

/* ── AI Playing phase mic state machine ─────────────────── */
function setAIMicState(s) {
  const btn   = document.getElementById("ai-play-mic-btn");
  const label = document.getElementById("ai-play-label");
  const icon  = document.getElementById("ai-play-mic-icon");
  if (!btn) return;

  btn.classList.remove("listening", "correct", "wrong");

  if (s === "listening") {
    btn.classList.add("listening");
    label.textContent = "Listening…";
    // Swap icon to "mic on"
    if (icon) icon.innerHTML = `
      <rect x="9" y="2" width="6" height="12" rx="3" fill="currentColor"/>
      <path d="M5 11a7 7 0 0 0 14 0" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
      <line x1="12" y1="18" x2="12" y2="22" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
      <line x1="8"  y1="22" x2="16" y2="22" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>`;
  } else if (s === "correct") {
    btn.classList.add("correct");
    label.textContent = "Got it! ✅";
    if (icon) icon.innerHTML = `<text x="12" y="17" text-anchor="middle" font-size="18" fill="currentColor">✅</text>`;
  } else if (s === "wrong") {
    btn.classList.add("wrong");
    label.textContent = "Try again…";
    if (icon) icon.innerHTML = `<text x="12" y="17" text-anchor="middle" font-size="18" fill="currentColor">❌</text>`;
    // Auto return to listening after shake, restore guidance label if partial found
    setTimeout(() => {
      if (state.listeningPhase === "playing") {
        setAIMicState("listening");
        const lbl = document.getElementById("ai-play-label");
        if (lbl) {
          if (state.aiArtistFound && !state.aiTitleFound) lbl.textContent = "Now say the title! 🎵";
          else if (state.aiTitleFound && !state.aiArtistFound) lbl.textContent = "Now say the artist! 🎤";
        }
      }
    }, 1300);
  } else {
    // idle
    label.textContent = "Touch & speak";
    if (icon) icon.innerHTML = `
      <rect x="9" y="2" width="6" height="12" rx="3" fill="currentColor"/>
      <path d="M5 11a7 7 0 0 0 14 0" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
      <line x1="12" y1="18" x2="12" y2="22" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
      <line x1="8"  y1="22" x2="16" y2="22" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>`;
  }
}

// ── Theme matching ──

function matchThemeFromSpeech(transcript) {
  const norm = transcript.toLowerCase().replace(/[^a-z0-9 ]/g, " ").trim();
  for (const th of THEMES) {
    const lbl = th.label.toLowerCase().replace(/[^a-z0-9 ]/g, " ").trim();
    if (norm === lbl || norm.includes(lbl)) return th;
    if (lbl.split(" ").some(w => w.length > 3 && norm.includes(w))) return th;
  }
  const kw = {
    "80s": "pop80s", "eighty": "pop80s", "eighties": "pop80s",
    "90s": "rnb90s", "nineties": "rnb90s",
    "hip hop": "hiphop", "hiphop": "hiphop", "rap": "hiphop",
    "disney": "disney",
    "film": "films", "movie": "films", "cinema": "films",
    "anime": "anime", "manga": "anime",
    "video game": "videogames", "videogame": "videogames", "gaming": "videogames",
    "french": "french",
    "electro": "electronic", "electronic": "electronic", "techno": "electronic",
    "jazz": "jazz", "latin": "latin",
    "afro": "afrobeats", "afrobeats": "afrobeats",
    "classic": "classical", "classical": "classical",
    "indie": "indie", "folk": "indie",
    "country": "country",
    "christmas": "christmas", "noel": "christmas", "xmas": "christmas",
    "bollywood": "bollywood", "bossa": "bossa", "punk": "punk",
    "random": "random",
  };
  for (const [k, id] of Object.entries(kw)) {
    if (norm.includes(k)) return THEMES.find(t => t.id === id) || null;
  }
  return null;
}

async function onThemeSpeech(transcript) {
  stopListening();
  stopAIThemeTimer();

  // Update transcript display while we classify
  const tr = document.getElementById("ai-theme-transcript");
  if (tr) { tr.textContent = `"${transcript}" — searching…`; tr.classList.remove("hidden"); }

  let theme = matchThemeFromSpeech(transcript);

  if (!theme && state.openaiKey) {
    try {
      const list = THEMES.map(t => ({ id: t.id, label: t.label }));
      const res  = await fetch("/api/classify-theme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ themes: list, transcript }),
      });
      const j  = await res.json();
      const id = String(j.id || "none").trim().toLowerCase().replace(/[^a-z0-9]/g, "");
      theme = THEMES.find(t => t.id === id) || null;
    } catch (e) { console.warn("Theme classification:", e); }
  }

  if (theme) {
    // Show confirm state
    _pendingTheme = theme;
    showAIThemeConfirm(theme);
  } else {
    // Not recognised — reset mic, let user try again
    if (tr) { tr.textContent = `"${transcript}" — not recognised, try again`; tr.classList.remove("hidden"); }
    setAIThemeMicState("idle");
    // Reset ring to full so next tap starts fresh
    const ring = document.getElementById("ai-theme-ring");
    if (ring) ring.style.strokeDashoffset = "0";
  }
}

function showAIThemeConfirm(theme) {
  document.getElementById("ai-theme-listen-state").classList.add("hidden");
  const confirmEl = document.getElementById("ai-theme-confirm-state");
  confirmEl.classList.remove("hidden");

  const card = document.getElementById("ai-confirm-card");
  card.innerHTML = `<span class="ai-confirm-emoji">${theme.emoji}</span>
                    <span class="ai-confirm-label">${theme.label}</span>`;
}

function resetAIThemeToListen() {
  _pendingTheme = null;
  document.getElementById("ai-theme-confirm-state").classList.add("hidden");
  document.getElementById("ai-theme-listen-state").classList.remove("hidden");
  const tr = document.getElementById("ai-theme-transcript");
  if (tr) tr.classList.add("hidden");
  setAIThemeMicState("idle");
  const ring = document.getElementById("ai-theme-ring");
  if (ring) ring.style.strokeDashoffset = "0";
}

function onAnswerSpeech(transcript) {
  const track = state.tracks[state.round];
  if (!track || state.submitted) return;

  const answerMode = state.theme?.answerMode || 'both';

  if (answerMode === 'title-only') {
    if (state.aiTitleFound) return;
    const singleOk = isCorrect(transcript, track.src ?? track.t)
                  || !!(track.src && isCorrect(transcript, track.t));
    if (!singleOk) { setAIMicState("wrong"); robotReact(false, true); return; }
    state.aiTitleFound = true;
    document.getElementById("title-input").value = track.src ?? track.t;
    updateAIVoiceStatus();
    robotReact(true, true);
    setAIMicState("correct");
    stopListening();
    setTimeout(() => submitAnswer(), 800);
    return;
  }

  const artistAnswer = track.src ?? track.a;

  // Only check fields not yet confirmed this round
  const newArtistOk = !state.aiArtistFound && isCorrect(transcript, artistAnswer);
  const newTitleOk  = !state.aiTitleFound  && isCorrect(transcript, track.t);

  if (!newArtistOk && !newTitleOk) {
    // Nothing new found — shake mic, keep listening
    setAIMicState("wrong");
    robotReact(false, true);
    return;
  }

  // Mark new fields as found and fill hidden inputs for scoring
  if (newArtistOk) {
    state.aiArtistFound = true;
    document.getElementById("artist-input").value = artistAnswer;
  }
  if (newTitleOk) {
    state.aiTitleFound = true;
    document.getElementById("title-input").value = track.t;
  }

  updateAIVoiceStatus();
  robotReact(true, true); // nod

  if (state.aiArtistFound && state.aiTitleFound) {
    // Both confirmed — ✅ and auto-advance
    setAIMicState("correct");
    stopListening();
    setTimeout(() => submitAnswer(), 800);
  } else {
    // One found — prompt for the other
    setAIMicState("listening");
    const label = document.getElementById("ai-play-label");
    if (label) {
      label.textContent = state.aiArtistFound
        ? "Now say the title! 🎵"
        : "Now say the artist! 🎤";
    }
  }
}

function updateAIVoiceStatus() {
  const answerMode = state.theme?.answerMode || 'both';
  const artistChip = document.getElementById("ai-artist-status");
  const titleChip  = document.getElementById("ai-title-status");
  if (answerMode === 'title-only') {
    const label = state.theme?.singleLabel || 'Song Title';
    if (artistChip) artistChip.style.display = 'none';
    if (titleChip) {
      titleChip.style.display = '';
      titleChip.textContent = state.aiTitleFound ? `\u2705 ${label}` : `\ud83c\udfa4 ${label}`;
      titleChip.classList.toggle("found", state.aiTitleFound);
    }
  } else {
    if (artistChip) {
      artistChip.style.display = '';
      artistChip.textContent = state.aiArtistFound ? "\u2705 Artist" : "\ud83c\udfa4 Artist";
      artistChip.classList.toggle("found", state.aiArtistFound);
    }
    if (titleChip) {
      titleChip.textContent = state.aiTitleFound ? "\u2705 Title" : "\ud83c\udfa4 Title";
      titleChip.classList.toggle("found", state.aiTitleFound);
    }
  }
}

/* ── Answer checking ────────────────────────────────────── */
function normalize(s) {
  return s
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function levenshtein(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
  return dp[m][n];
}

function isCorrect(guess, answer) {
  const ng = normalize(guess), na = normalize(answer);
  if (!ng || !na) return false;
  if (ng === na) return true;
  if (na.length >= 4 && ng.includes(na)) return true;
  if (na.length >= 4 && na.includes(ng) && ng.length >= Math.floor(na.length * 0.6)) return true;
  const tol = na.length <= 5 ? 1 : na.length <= 10 ? 2 : 3;
  return levenshtein(ng, na) <= tol;
}

/* ── Scoring ─────────────────────────────────────────────── */
function timeBonus(elapsed) {
  if (elapsed <= 10) return 20;
  if (elapsed <= 20) return 10;
  if (elapsed <= 25) return 5;
  return 0;
}

/* ── Visualizer ─────────────────────────────────────────── */
const vizCanvas = document.getElementById("visualizer");
const vizCtx = vizCanvas.getContext("2d");
let vizRaf = null;
let vizBpm = 120;
let vizPlaying = false;

function vizStart(bpm) {
  vizBpm = bpm;
  vizPlaying = true;
  vizLoop();
}
function vizStop() {
  vizPlaying = false;
  if (vizRaf) { cancelAnimationFrame(vizRaf); vizRaf = null; }
  vizDrawIdle();
}
function vizLoop() {
  if (!vizPlaying) return;
  vizDraw();
  vizRaf = requestAnimationFrame(vizLoop);
}
function vizDraw() {
  const W = vizCanvas.width, H = vizCanvas.height;
  vizCtx.clearRect(0, 0, W, H);
  const cx = W / 2, cy = H / 2;
  const outerR = Math.min(W, H) * 0.44;
  const innerR = outerR * 0.62;
  const segs = 60;
  const now = performance.now();
  const beatMs = Math.max(200, 60000 / vizBpm);
  const beatPhase = (now % beatMs) / beatMs;

  for (let i = 0; i < segs; i++) {
    const t = i / segs;
    const angle = t * Math.PI * 2 - Math.PI / 2;
    const w1 = Math.sin((t * 4 + beatPhase * 2) * Math.PI) * 0.5 + 0.5;
    const w2 = Math.sin((t * 8 - beatPhase * 3) * Math.PI) * 0.3 + 0.3;
    const w3 = Math.sin((t * 2 + beatPhase * 0.5) * Math.PI * 2) * 0.2 + 0.2;
    const intensity = Math.min(1, w1 + w2 + w3) * 0.9;
    const r = innerR + (outerR - innerR) * (0.25 + 0.75 * intensity);
    const alpha = 0.2 + intensity * 0.8;
    vizCtx.strokeStyle = i % 3 < 2
      ? `rgba(255,77,184,${alpha})`
      : `rgba(0,215,215,${alpha})`;
    vizCtx.lineWidth = 3.5;
    vizCtx.lineCap = "round";
    vizCtx.beginPath();
    vizCtx.moveTo(cx + Math.cos(angle) * innerR, cy + Math.sin(angle) * innerR);
    vizCtx.lineTo(cx + Math.cos(angle) * r,      cy + Math.sin(angle) * r);
    vizCtx.stroke();
  }

  const glow = 0.4 + 0.6 * Math.sin(beatPhase * Math.PI * 2);
  vizCtx.strokeStyle = `rgba(255,77,184,${glow * 0.25})`;
  vizCtx.lineWidth = 1.5;
  vizCtx.beginPath();
  vizCtx.arc(cx, cy, outerR + 5, 0, Math.PI * 2);
  vizCtx.stroke();
}
function vizDrawIdle() {
  const W = vizCanvas.width, H = vizCanvas.height;
  vizCtx.clearRect(0, 0, W, H);
  const cx = W / 2, cy = H / 2;
  const outerR = Math.min(W, H) * 0.44;
  const innerR = outerR * 0.62;
  for (let i = 0; i < 60; i++) {
    const angle = (i / 60) * Math.PI * 2 - Math.PI / 2;
    const r = innerR + (outerR - innerR) * 0.12;
    vizCtx.strokeStyle = "rgba(255,77,184,0.12)";
    vizCtx.lineWidth = 2;
    vizCtx.lineCap = "round";
    vizCtx.beginPath();
    vizCtx.moveTo(cx + Math.cos(angle) * innerR, cy + Math.sin(angle) * innerR);
    vizCtx.lineTo(cx + Math.cos(angle) * r,      cy + Math.sin(angle) * r);
    vizCtx.stroke();
  }
}

/* ── Timer ──────────────────────────────────────────────── */
const timerRing = document.getElementById("timer-ring");
const timerText = document.getElementById("timer-text");

function timerUpdate(val) {
  const fraction = val / ROUND_DURATION;
  timerRing.style.strokeDashoffset = CIRCUMFERENCE * (1 - fraction);
  timerText.textContent = Math.ceil(val);
  const urgent = val <= 8;
  timerRing.classList.toggle("urgent", urgent);
  timerText.classList.toggle("urgent", urgent);
}

function timerStart() {
  state.timerValue = ROUND_DURATION;
  state.timerStart = performance.now();
  timerUpdate(ROUND_DURATION);

  const tick = (now) => {
    if (state.submitted) return;
    const elapsed = (now - state.timerStart) / 1000;
    const remaining = Math.max(0, ROUND_DURATION - elapsed);
    state.timerValue = remaining;
    timerUpdate(remaining);
    if (remaining <= 0) {
      submitAnswer(true);
    } else {
      state.timerRaf = requestAnimationFrame(tick);
    }
  };
  state.timerRaf = requestAnimationFrame(tick);
}

function timerStop() {
  if (state.timerRaf) { cancelAnimationFrame(state.timerRaf); state.timerRaf = null; }
}

/* ── Audio ──────────────────────────────────────────────── */
const audio = document.getElementById("preview-audio");

// iOS AudioSession: activating the microphone (SpeechRecognition) can interrupt
// the playback session and pause the audio element. Auto-resume so the song keeps
// playing while the user speaks.
audio.addEventListener("pause", () => {
  if (state.listeningPhase === "playing" && !state.submitted) {
    // Small delay lets the browser settle the audio session before resuming
    setTimeout(() => {
      if (!state.submitted && audio.paused) audio.play().catch(() => {});
    }, 300);
  }
});

async function playPreview(url) {
  await resumeAudio(); // must be running before audio routes through the graph
  
  audio.src = url;
  audio.currentTime = 0;
  audio.play().catch(() => {});
}
function stopPreview() {
  audio.pause();
  audio.src = "";
  
}

/* ── Wake Lock — keep screen on while playing ────────────── */
let _wakeLock = null;

async function requestWakeLock() {
  if (!("wakeLock" in navigator)) return;
  try {
    _wakeLock = await navigator.wakeLock.request("screen");
    // Auto re-acquire if the OS releases it (tab hidden then shown again)
    _wakeLock.addEventListener("release", () => { _wakeLock = null; });
  } catch (e) { /* not supported or permission denied — ignore */ }
}

// Keep screen awake for the entire session — re-acquire whenever the tab becomes visible.
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible" && _wakeLock === null) {
    requestWakeLock();
  }
});

/* ── Phase management ────────────────────────────────────── */
function showPhase(id) {
  document.querySelectorAll(".phase").forEach((el) => el.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

/* ── Notes (background effect) ──────────────────────────── */
function spawnNotes() {
  const layer = document.getElementById("notes-layer");
  if (!layer) return;
  [
    { left: "8%",  delay: "0s",   color: "pink", char: "♪", size: 18 },
    { left: "72%", delay: "2.1s", color: "cyan", char: "♫", size: 22 },
    { left: "42%", delay: "4.3s", color: "pink", char: "♬", size: 16 },
    { left: "85%", delay: "1.0s", color: "cyan", char: "♩", size: 20 },
  ].forEach(({ left, delay, color, char, size }) => {
    const el = document.createElement("span");
    el.className = `note note-${color}`;
    el.textContent = char;
    el.style.cssText = `left:${left};animation-delay:${delay};font-size:${size}px`;
    layer.appendChild(el);
  });
}

/* ── Progress dots ───────────────────────────────────────── */
function buildProgressDots() {
  const wrap = document.getElementById("progress-dots");
  wrap.innerHTML = "";
  for (let i = 0; i < TOTAL_ROUNDS; i++) {
    const dot = document.createElement("div");
    dot.className = "progress-dot" + (i === state.round ? " current" : "");
    dot.id = `dot-${i}`;
    wrap.appendChild(dot);
  }
}

function updateProgressDot(index, result) {
  const dot = document.getElementById(`dot-${index}`);
  if (!dot) return;
  dot.classList.remove("current");
  if (result === "won") dot.classList.add("won");
  else if (result === "partial") dot.classList.add("partial");
  else dot.classList.add("lost");
  const next = document.getElementById(`dot-${index + 1}`);
  if (next) next.classList.add("current");
}

/* ── Points popup ────────────────────────────────────────── */
function showPointsPopup(pts) {
  const el = document.getElementById("points-popup");
  el.textContent = pts > 0 ? `+${pts}` : "0";
  el.classList.remove("hidden", "show");
  void el.offsetWidth;
  el.classList.add("show");
  setTimeout(() => el.classList.remove("show"), 1500);
}

/* ── Theme selection ─────────────────────────────────────── */
function buildThemeGrid() {
  const grid = document.getElementById("themes-grid");
  grid.innerHTML = "";
  THEMES.forEach((theme) => {
    const card = document.createElement("button");
    card.className = "theme-card";
    card.type = "button";
    card.tabIndex = 0;
    card.innerHTML = `<span class="theme-emoji">${theme.emoji}</span>
                      <span class="theme-label">${theme.label}</span>`;
    card.addEventListener("click", () => selectTheme(theme));
    grid.appendChild(card);
  });

  if (state.mode === "openai") {
    // Show AI voice UI
    document.getElementById("ai-theme-ui").classList.remove("hidden");

    // Reset confirm state in case of play-again
    resetAIThemeToListen();

    // AI DJ greets and asks for theme (fire-and-forget)
    speak("Hello! Ready to play the music quiz? What kind of theme would you like — Disney, Rock, Pop, or any genre you want!");
  }
}

async function onCustomTheme() {
  const input = document.getElementById("custom-theme-input");
  const label = input.value.trim();
  if (!label) return;
  const fakeTheme = { id: "custom", label, emoji: "✨", bpm: 110, tracks: null, custom: true };
  await selectTheme(fakeTheme);
}

async function selectTheme(theme) {
  // Unlock AudioContext and media element NOW — still within the user gesture stack.
  // Without this, audio.play() fails silently after the async track-loading awaits.
  _audioCtx.resume();
  audio.load(); // resets element state, primes autoplay permission on iOS/Safari

  stopListening(); // stop theme-listening if active
  stopAIThemeTimer();

  // Save nickname at game-start time (in case user didn't blur the input)
  const nameInput = document.getElementById("player-name-solo");
  if (nameInput && nameInput.value.trim()) savePlayerName(nameInput.value);

  state.theme = theme;
  document.getElementById("header-theme").textContent = theme.label;
  document.getElementById("playing-theme").textContent = theme.label;
  showPhase("phase-loading");
  if (state.mode === "openai") speak(`${theme.label}! Let's go!`); // fire-and-forget, plays during loading

  try {
    let enriched;
    if (theme.custom && state.mode === "openai") {
      // OpenAI mode: GPT generates the track list, then we look each one up
      const rawTracks = await generateTracksAI(theme.label);
      enriched = await enrichTracks(rawTracks.slice(0, Math.min(rawTracks.length, 40)));
    } else {
      // Dynamic iTunes fetch first — fresh random pool every game
      enriched = await fetchThemeTracks(theme, 25);
      if (!enriched || enriched.length < 8) {
        // Fallback: hardcoded list + server-proxy enrichment
        let rawTracks;
        if (theme.random) {
          const pool = THEMES
            .filter(t => !t.random && t.tracks)
            .map(t => t.tracks[Math.floor(Math.random() * t.tracks.length)]);
          rawTracks = shuffle(pool);
        } else {
          rawTracks = shuffle([...theme.tracks]);
        }
        enriched = await enrichTracks(rawTracks.slice(0, Math.min(rawTracks.length, 40)));
      }
    }
    if (enriched.length < 3) {
      alert("Couldn't load enough tracks. Try another theme.");
      showPhase("phase-theme");
      return;
    }
    // Shuffle then deduplicate by artist so no artist appears twice in a game
    state.tracks = dedupByArtist(shuffle(enriched), TOTAL_ROUNDS);
    state.round = 0;
    state.rounds = [];
    state.score = 0;
    buildProgressDots();
    startRound();
  } catch (err) {
    console.error(err);
    alert(`Error loading tracks: ${err.message}`);
    showPhase("phase-theme");
  }
}

/* ── Round ───────────────────────────────────────────────── */
function startRound() {
  state.submitted = false;

  // Reset hint buttons
  const hintArtist = document.getElementById('hint-artist');
  const hintTitle  = document.getElementById('hint-title');
  if (hintArtist) hintArtist.disabled = false;
  if (hintTitle)  hintTitle.disabled  = false;

  // Reset hidden answer inputs (still needed for submitAnswer scoring)
  document.getElementById("artist-input").value = "";
  document.getElementById("title-input").value = "";
  document.getElementById("artist-check").textContent = "";
  document.getElementById("title-check").textContent = "";
  document.getElementById("artist-input").className = "answer-input";
  document.getElementById("title-input").className = "answer-input";
  // Reset reveal artist row visibility (may have been hidden in title-only mode)
  const artistRevealRowReset = document.querySelector('.score-row:first-child');
  if (artistRevealRowReset) artistRevealRowReset.style.display = '';

  document.getElementById("round-label").textContent = `Round ${state.round + 1} / ${TOTAL_ROUNDS}`;

  // Configure input fields based on answerMode
  const answerMode  = state.theme?.answerMode || 'both';
  const artistGroup = document.getElementById('artist-group');
  const titleLblEl  = document.querySelector('label[for="title-input"]');
  if (answerMode === 'title-only') {
    const singleLabel = state.theme?.singleLabel || 'Song Title';
    if (artistGroup) artistGroup.style.display = 'none';
    if (titleLblEl)  titleLblEl.textContent = singleLabel;
    document.getElementById("title-input").placeholder = singleLabel + '?';
    if (hintArtist) hintArtist.style.display = 'none';
  } else {
    // Dynamic artist label (free mode)
    const artistLabel       = state.theme?.artistLabel ?? "Artist";
    const artistPlaceholder = state.theme?.artistPlaceholder ?? "Who?";
    if (artistGroup) artistGroup.style.display = '';
    document.querySelector('label[for="artist-input"]').textContent = artistLabel;
    document.getElementById("artist-input").placeholder = artistPlaceholder;
    if (titleLblEl) titleLblEl.textContent = 'Title';
    document.getElementById("title-input").placeholder = 'What song?';
    if (hintArtist) hintArtist.style.display = '';
  }

  if (state.mode === "openai") {
    // AI mode: mic in centre, voice status chips, no text inputs
    state.aiArtistFound = false;
    state.aiTitleFound  = false;
    document.getElementById("answer-area").classList.add("hidden");
    document.getElementById("ai-play-hint").classList.remove("hidden");
    document.getElementById("timer-text").classList.add("hidden");
    document.getElementById("ai-mic-center").classList.remove("hidden");
    setAIMicState("idle");
    updateAIVoiceStatus(); // reset chips to 🎤 Artist / 🎤 Title
  } else {
    document.getElementById("answer-area").classList.remove("hidden");
    document.getElementById("ai-play-hint").classList.add("hidden");
    document.getElementById("timer-text").classList.remove("hidden");
    document.getElementById("ai-mic-center").classList.add("hidden");
  }

  showPhase("phase-playing");

  const track = state.tracks[state.round];
  if (!track) { showGameOver(); return; }

  state.roundStartTime = performance.now();
  playPreview(track.previewUrl);
  vizStart(state.theme?.bpm ?? 120);
  robotDance(state.theme?.bpm ?? 120);
  timerStart();

  if (state.mode !== "openai") {
    const focusEl = answerMode === 'title-only'
      ? document.getElementById("title-input")
      : document.getElementById("artist-input");
    if (focusEl) focusEl.focus();
  }
}

/* ── Live input feedback ─────────────────────────────────── */
function updateInputFeedback(field) {
  const input = document.getElementById(`${field}-input`);
  const check = document.getElementById(`${field}-check`);
  const val = input.value.trim();
  if (!val) { check.textContent = ""; input.className = "answer-input"; return; }
  const track = state.tracks[state.round];
  const answer = field === "artist"
    ? (track?.src ?? track?.a)
    : track?.t;
  if (isCorrect(val, answer)) {
    check.textContent = "✅";
    input.classList.add("correct");
    input.classList.remove("wrong");
  } else {
    check.textContent = "";
    input.classList.remove("correct", "wrong");
  }
}

/* ── Submit ─────────────────────────────────────────────── */
function submitAnswer(timedOut = false) {
  if (state.submitted) return;
  state.submitted = true;

  stopListening(); // AI mode: stop voice input
  if (timedOut && state.mode === "openai") setAIMicState("idle");
  timerStop();
  stopPreview();
  vizStop();

  const elapsed = Math.min(ROUND_DURATION, (performance.now() - state.roundStartTime) / 1000);
  const track = state.tracks[state.round];
  const artistGuess = document.getElementById("artist-input").value.trim();
  const titleGuess  = document.getElementById("title-input").value.trim();

  const answerMode = state.theme?.answerMode || 'both';
  let artistOk, titleOk, bonus, baseRound;
  if (answerMode === 'title-only') {
    // Single answer in title field — accept src (movie/game/show) OR track title
    const singleOk = isCorrect(titleGuess, track.src ?? track.t)
                  || !!(track.src && isCorrect(titleGuess, track.t));
    artistOk  = false;
    titleOk   = !!singleOk;
    bonus     = titleOk ? timeBonus(elapsed) : 0;
    baseRound = (titleOk ? 100 : 0) + bonus;
  } else {
    artistOk  = isCorrect(artistGuess, track.src ?? track.a);
    titleOk   = isCorrect(titleGuess, track.t);
    bonus     = (artistOk || titleOk) ? timeBonus(elapsed) : 0;
    baseRound = (artistOk ? 50 : 0) + (titleOk ? 50 : 0) + bonus;
  }

  // Combo streak
  const anyCorrect = artistOk || titleOk;
  if (anyCorrect) {
    state.combo++;
    state.maxCombo = Math.max(state.maxCombo, state.combo);
  } else {
    state.combo = 0;
  }
  const comboMult = state.combo >= 5 ? 2.0 : state.combo >= 3 ? 1.5 : 1.0;
  const pts = Math.round(baseRound * comboMult);

  state.rounds.push({ artistOk, titleOk, pts, elapsed, track, combo: state.combo, comboMult });
  state.score += pts;
  document.getElementById("header-score").textContent = `${state.score} pts`;
  updateComboBadge();

  const dotResult = artistOk && titleOk ? "won" : pts > 0 ? "partial" : "lost";
  updateProgressDot(state.round, dotResult);

  // Sound effects
  if (timedOut)       sfx('timeout');
  else if (anyCorrect) {
    sfx('correct');
    if (state.combo >= 3) setTimeout(() => sfx('combo'), 220);
  } else {
    sfx('wrong');
  }

  robotReact(artistOk || titleOk);
  showReveal(track, artistOk, titleOk, bonus, pts, comboMult);
}

/* ── Reveal ─────────────────────────────────────────────── */
function showReveal(track, artistOk, titleOk, bonus, pts, comboMult = 1.0) {
  document.getElementById("album-cover").src = track.cover || "";
  const answerMode = state.theme?.answerMode || 'both';
  const artistRevealRow = document.querySelector(".score-row:first-child");

  if (answerMode === 'title-only') {
    // Single-answer mode: show the correct answer as the "title" field
    const correctAnswer = track.src ?? track.t;
    const extraInfo     = (track.src && track.t && track.src !== track.t) ? ` \u2014 ${track.t}` : '';
    document.getElementById("reveal-artist").textContent = '';
    document.getElementById("reveal-title").textContent  = correctAnswer + extraInfo;
    if (artistRevealRow) artistRevealRow.style.display = 'none';
    document.getElementById("title-result").textContent = titleOk ? "\u2705" : "\u274c";
    document.getElementById("title-pts").textContent    = titleOk ? "100 pts" : "0 pts";
  } else {
    document.getElementById("reveal-artist").textContent = track.src ?? track.a;
    document.getElementById("reveal-title").textContent  = track.t;
    if (artistRevealRow) artistRevealRow.style.display = '';
    document.getElementById("artist-result").textContent = artistOk ? "\u2705" : "\u274c";
    document.getElementById("title-result").textContent  = titleOk  ? "\u2705" : "\u274c";
    document.getElementById("artist-pts").textContent = artistOk ? "50 pts" : "0 pts";
    document.getElementById("title-pts").textContent  = titleOk  ? "50 pts" : "0 pts";
    // Sync reveal label to theme type
    document.querySelector(".score-row:first-child .score-row-label").textContent =
      state.theme?.artistLabel ?? "Artist";
  }
  document.getElementById("bonus-pts").textContent  = `+${bonus} pts`;

  // Combo row
  const comboRow   = document.getElementById("combo-row");
  const comboPtsEl = document.getElementById("combo-pts");
  if (comboRow && comboPtsEl) {
    if (comboMult > 1.0) {
      comboPtsEl.textContent = `×${comboMult.toFixed(1)} (🔥${state.combo}-streak)`;
      comboRow.classList.remove("hidden");
    } else {
      comboRow.classList.add("hidden");
    }
  }

  document.getElementById("round-total-pts").textContent = `${pts} pts`;

  const nextBtn = document.getElementById("next-btn");
  const isLast = state.round >= TOTAL_ROUNDS - 1;
  nextBtn.textContent = isLast ? "See Results 🏆" : "Next Round →";

  showPhase("phase-revealing");
  showPointsPopup(pts);
  robotIdle();

  // AI mode: auto-advance after a short pause (user just needs to see the reveal)
  if (state.mode === "openai") {
    setTimeout(() => {
      if (!document.getElementById("phase-revealing").classList.contains("active")) return;
      state.round++;
      if (state.round >= TOTAL_ROUNDS || state.round >= state.tracks.length) {
        showGameOver();
      } else {
        startRound();
      }
    }, 2500);
  }
}

/* ── Leaderboard (server-side API) ───────────────────────── */
async function fetchLeaderboard(themeLabel) {
  try {
    const res = await fetch(`/api/leaderboard?theme=${encodeURIComponent(themeLabel || '')}`);
    if (!res.ok) return [];
    const data = await res.json();
    return data.map(r => ({
      u: r.name, n: r.name, s: r.score,
      d: r.created_at ? r.created_at.slice(0, 10) : '',
    }));
  } catch { return []; }
}
async function saveScore({ displayName, themeId, themeLabel, score }) {
  if (!themeId || themeId === 'random' || !score) return null;
  try {
    const res = await fetch('/api/scores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name:  displayName || 'Anonymous',
        score,
        theme: themeLabel || themeId,
        combo: state.maxCombo,
      }),
    });
    const json = await res.json();
    const el = document.getElementById('leaderboard-save-status');
    if (el) {
      el.textContent = json.ok ? '✓ Saved' : '⚠ Save failed';
      el.className   = `leaderboard-save-status ${json.ok ? 'ok' : 'err'}`;
    }
    return json.ok ? fetchLeaderboard(themeLabel || themeId) : null;
  } catch (_) {
    const el = document.getElementById('leaderboard-save-status');
    if (el) { el.textContent = '⚠ Save failed'; el.className = 'leaderboard-save-status err'; }
    return null;
  }
}

function renderLeaderboard(entries, themeId, currentUsername) {
  const section = document.getElementById("leaderboard-section");
  const list    = document.getElementById("game-leaderboard-list");
  const label   = document.getElementById("leaderboard-theme-label");
  if (!section || !list) return;

  const theme = THEMES.find(t => t.id === themeId);
  if (label) label.textContent = theme ? `${theme.emoji} ${theme.label}` : "Theme";

  if (!entries?.length) {
    list.innerHTML = `<li class="lb-empty">No scores yet — be the first! 🎉</li>`;
    section.classList.remove("hidden");
    return;
  }

  const medals   = ["🥇", "🥈", "🥉"];
  const TOP      = 5;
  const top5     = entries.slice(0, TOP);
  const userRank = currentUsername ? entries.findIndex(e => e.u === currentUsername) : -1;
  const userInTop = userRank >= 0 && userRank < TOP;

  const rowHtml = (e, i) => {
    const isMe    = e.u === currentUsername;
    const rankCls = i === 0 ? "gold" : i === 1 ? "silver" : i === 2 ? "bronze" : "";
    const avatar  = e.a
      ? `<img class="lb-avatar" src="${e.a}" alt="${e.n}" loading="lazy">`
      : `<div class="lb-avatar-placeholder">👤</div>`;
    return `<li class="lb-row${isMe ? " lb-me" : ""}">
      <span class="lb-rank ${rankCls}">${medals[i] ?? i + 1}</span>
      ${avatar}
      <span class="lb-name">${e.n}${isMe ? " 👈" : ""}</span>
      <span class="lb-score">${e.s} pts</span>
      <span class="lb-date">${e.d ? formatLbDate(e.d) : ""}</span>
    </li>`;
  };

  let html = top5.map(rowHtml).join("");

  // Show "···" + user's row if they're outside top 5
  if (currentUsername && !userInTop && userRank >= 0) {
    html += `<li class="lb-row lb-ellipsis"><span class="lb-ellipsis-dots">· · ·</span></li>`;
    html += rowHtml(entries[userRank], userRank);
  } else if (currentUsername && userRank < 0 && entries.length >= TOP) {
    // User not on board at all
    html += `<li class="lb-row lb-ellipsis"><span class="lb-ellipsis-dots">· · ·</span></li>`;
    html += `<li class="lb-row lb-me lb-not-ranked">
      <span class="lb-rank">—</span>
      <div class="lb-avatar-placeholder">👤</div>
      <span class="lb-name">You 👈</span>
      <span class="lb-score">not ranked</span>
      <span class="lb-date"></span>
    </li>`;
  }

  list.innerHTML = html;
  section.classList.remove("hidden");
}

/* ── Profile modal removed ─────────────────────────────── */
async function showProfileModal() {}

/* ── Achievements ────────────────────────────────────────── */
function computeAchievements() {
  const list = [];
  const perfect = state.rounds.filter(r => r.artistOk && r.titleOk).length;
  const fast    = state.rounds.filter(r => r.elapsed <= 10 && (r.artistOk || r.titleOk)).length;
  if (perfect === TOTAL_ROUNDS)  list.push({ text: '🏆 Perfect Game!', cls: 'gold' });
  else if (perfect >= 8)          list.push({ text: `⭐ ${perfect}/10 Perfect`, cls: 'gold' });
  else if (perfect >= 5)          list.push({ text: `✨ ${perfect} Perfect Rounds`, cls: '' });
  if (state.maxCombo >= 5)        list.push({ text: `🔥 ${state.maxCombo}× Combo!`, cls: 'gold' });
  else if (state.maxCombo >= 3)   list.push({ text: `🔥 ${state.maxCombo}× Streak`, cls: '' });
  if (fast >= 5)                  list.push({ text: `⚡ Speed Demon (${fast})`, cls: 'cyan' });
  if (state.hintsUsed === 0 && perfect >= 5) list.push({ text: '💡 No Hints Needed', cls: 'cyan' });
  if (state.score >= 1000)        list.push({ text: '💎 1000+ Points', cls: 'gold' });
  return list;
}

/* ── Share score ─────────────────────────────────────────── */
function shareScore() {
  const theme = state.theme?.label || 'Music Quiz';
  const text  = `🎵 I scored ${state.score} pts on AI Music Quiz!\nTheme: ${theme}${state.maxCombo > 1 ? `\nBest combo: ×${state.maxCombo}` : ''}\n${location.origin}`;
  if (navigator.share) {
    navigator.share({ title: 'AI Music Quiz', text }).catch(() => {});
  } else {
    navigator.clipboard?.writeText(text).then(() => {
      const btn = document.getElementById('share-btn');
      if (btn) { const orig = btn.textContent; btn.textContent = '✅ Copied!'; setTimeout(() => { btn.textContent = orig; }, 2000); }
    }).catch(() => {});
  }
}

/* ── Game over ─────────────────────────────────────────── */
function showGameOver() {
  const total = state.score;
  document.getElementById("final-score").textContent = total;

  setTimeout(() => {
    document.getElementById("score-bar-fill").style.width = `${(total / 1200) * 100}%`;
  }, 100);

  // Badges
  const badges = [];
  if (total === 1200) badges.push({ cls: "badge-gold",   text: "🏆 Perfect Score!" });
  else if (total >= 900) badges.push({ cls: "badge-gold",   text: "🥇 Expert" });
  else if (total >= 600) badges.push({ cls: "badge-silver", text: "🥈 Good Ear!" });
  else if (total >= 300) badges.push({ cls: "badge-pink",   text: "🎵 Getting There" });
  if (state.rounds.filter((r) => r.artistOk && r.titleOk).length >= 5)
    badges.push({ cls: "badge-gold", text: "⭐ 5+ Perfect Rounds" });
  const badgeArea = document.getElementById("badge-area");
  badgeArea.innerHTML = badges
    .map((b) => `<span class="badge ${b.cls}">${b.text}</span>`)
    .join("");

  // Recap
  const recap = document.getElementById("rounds-recap");
  recap.innerHTML = state.rounds.map((r, i) => {
    const cls = r.pts >= 100 ? "full" : r.pts > 0 ? "partial" : "zero";
    return `<div class="recap-row">
      <span class="recap-round-num">#${i + 1}</span>
      <span class="recap-song">${r.track.a} — ${r.track.t}</span>
      <span class="recap-pts ${cls}">${r.pts} pts</span>
    </div>`;
  }).join("");

  showPhase("phase-gameover");

  // Achievements
  const achievements = computeAchievements();
  const achSection = document.getElementById("achievements-section");
  const achList    = document.getElementById("achievements-list");
  if (achSection && achList && achievements.length) {
    achList.innerHTML = achievements.map((a, i) =>
      `<span class="achievement-chip ${a.cls || ''}" style="animation-delay:${i * 0.08}s">${a.text}</span>`
    ).join("");
    achSection.classList.remove("hidden");
  }

  // Stats line
  const statsLine = document.getElementById("stats-line");
  if (statsLine) {
    const parts = [];
    if (state.maxCombo > 1) parts.push(`Best combo: ×${state.maxCombo}`);
    if (state.hintsUsed > 0) parts.push(`Hints used: ${state.hintsUsed}`);
    statsLine.textContent = parts.join("  ·  ");
  }

  // Wire share + manual submit buttons
  document.getElementById("share-btn")?.addEventListener("click", shareScore);
  document.getElementById("submit-score-btn")?.addEventListener("click", () => {
    const name    = getPlayerName();
    const themeId = state.theme?.id;
    if (themeId && themeId !== 'random' && total > 0) {
      saveScore({ displayName: name, themeId, themeLabel: state.theme?.label, score: total })
        .then(entries => { if (Array.isArray(entries)) renderLeaderboard(entries, themeId, name); });
    }
  });

  // AI mode: head wobble + rich spoken summary
  if (state.mode === "openai") {
    const username = getPlayerName();
    const themeForSpeech = state.theme?.id;
    const scoreForSpeech = total;

    // Compute streak
    let maxStreak = 0, cur = 0;
    for (const r of state.rounds) {
      if (r.artistOk || r.titleOk) { cur++; maxStreak = Math.max(maxStreak, cur); }
      else cur = 0;
    }
    const perfectRounds = state.rounds.filter(r => r.artistOk && r.titleOk).length;

    (async () => {
      // Start wobble while fetching rank, stop after speaking
      startRobotWobble();

      let rankText = "";
      if (username && themeForSpeech && themeForSpeech !== "random") {
        try {
          const entries = await fetchLeaderboard(themeForSpeech);
          const rank = entries.findIndex(e => e.u === username) + 1;
          if (rank === 1)      rankText = " You're number one on the leaderboard! Incredible!";
          else if (rank === 2) rankText = " You're second on the leaderboard! Amazing work!";
          else if (rank === 3) rankText = " You're third on the leaderboard! Well done!";
          else if (rank > 3)   rankText = ` You're ranked number ${rank} on the leaderboard.`;
        } catch (_) {}
      }

      let streakText = "";
      if (maxStreak >= 5)      streakText = ` Impressive — ${maxStreak} correct answers in a row!`;
      else if (maxStreak >= 3) streakText = ` Nice streak of ${maxStreak} in a row!`;

      let scoreComment = "";
      if (scoreForSpeech >= 900)      scoreComment = " Fantastic result!";
      else if (scoreForSpeech >= 600) scoreComment = " Great job!";
      else if (scoreForSpeech >= 300) scoreComment = " Good effort!";

      await speak(
        `Game over! You scored ${scoreForSpeech} points.${scoreComment}${streakText}${rankText}`
      );
      stopRobotWobble();
      startRobotIdle();
    })();
  }

  // Leaderboard — load current data, then save if logged in
  const themeId = state.theme?.id;
  if (themeId && themeId !== "random") {
    const section = document.getElementById("leaderboard-section");
    const list    = document.getElementById("game-leaderboard-list");
    if (section && list) {
      section.classList.remove("hidden");
      list.innerHTML = `<li class="lb-loading">Loading leaderboard…</li>`;
      document.getElementById("leaderboard-theme-label").textContent =
        `${state.theme.emoji} ${state.theme.label}`;

      const username    = getPlayerName();
      const displayName = username;
      const themeLabel  = state.theme.label;

      // Show current leaderboard immediately, then auto-save and refresh
      fetchLeaderboard(themeLabel).then(entries => {
        renderLeaderboard(entries, themeId, username);

        if (username && total > 0) {
          saveScore({ displayName, themeId, themeLabel, score: total })
            .then(updatedEntries => {
              if (Array.isArray(updatedEntries)) {
                renderLeaderboard(updatedEntries, themeId, username);
              }
            });
        }
      });
    }
  }
}

/* ── Helpers ─────────────────────────────────────────────── */
const _MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
function formatLbDate(iso) {
  // iso = "2026-04-22"
  const parts = iso.split("-");
  if (parts.length < 3) return iso;
  const m = parseInt(parts[1], 10) - 1;
  const d = parseInt(parts[2], 10);
  return `${_MONTHS[m] ?? parts[1]} ${d}`;
}

// Pick up to `limit` tracks ensuring each artist appears at most once.
// Falls back to allowing repeats only if there aren't enough unique artists.
function dedupByArtist(arr, limit) {
  const seen = new Set();
  const picked = [];
  for (const t of arr) {
    const key = (t.a || '').toLowerCase().trim();
    if (!seen.has(key)) { seen.add(key); picked.push(t); }
    if (picked.length >= limit) break;
  }
  // Fallback: fill remaining slots from leftovers if we fell short
  if (picked.length < limit) {
    for (const t of arr) {
      if (!picked.includes(t)) { picked.push(t); }
      if (picked.length >= limit) break;
    }
  }
  return picked;
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/* ── Init ────────────────────────────────────────────────── */
function init() {
  // Parse URL params
  const params = new URLSearchParams(location.search);
  state.mode = params.get("mode") || "free";
  state.openaiKey = state.mode === "openai" ? "server" : null;

  // Nickname input — pre-fill from localStorage and save on change
  const nameInput = document.getElementById("player-name-solo");
  if (nameInput) {
    nameInput.value = getPlayerName() === 'Anonymous' ? '' : getPlayerName();
    nameInput.addEventListener("change", () => savePlayerName(nameInput.value));
    nameInput.addEventListener("blur",   () => savePlayerName(nameInput.value));
  }

  spawnNotes();
  buildThemeGrid();
  vizDrawIdle();

  // Wiring
  document.getElementById("artist-input").addEventListener("input", () => updateInputFeedback("artist"));
  document.getElementById("title-input").addEventListener("input",  () => updateInputFeedback("title"));

  document.getElementById("artist-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter") document.getElementById("title-input").focus();
  });
  document.getElementById("title-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter") submitAnswer();
  });
  document.getElementById("submit-btn").addEventListener("click", () => submitAnswer());
  document.getElementById("skip-btn").addEventListener("click",   () => submitAnswer(true));

  // Hint buttons (free mode)
  document.getElementById("hint-artist")?.addEventListener("click", () => useHint("artist"));
  document.getElementById("hint-title")?.addEventListener("click",  () => useHint("title"));

  document.getElementById("next-btn").addEventListener("click", () => {
    state.round++;
    if (state.round >= TOTAL_ROUNDS || state.round >= state.tracks.length) {
      showGameOver();
    } else {
      startRound();
    }
  });

  document.getElementById("play-again-btn").addEventListener("click", () => {
    state.round = 0;
    state.rounds = [];
    state.score = 0;
    state.combo = 0;
    state.maxCombo = 0;
    state.hintsUsed = 0;
    document.getElementById("header-score").textContent = "0 pts";
    document.getElementById("header-theme").textContent = "Blind Test";
    stopListening();
    stopAIThemeTimer();
    buildThemeGrid();
    showPhase("phase-theme");
  });

  // AI theme mic button — tap to start 30s recording
  document.getElementById("ai-theme-mic-btn")?.addEventListener("click", () => {
    if (state.listeningPhase === "theme") return; // already listening
    const tr = document.getElementById("ai-theme-transcript");
    if (tr) tr.classList.add("hidden");
    setAIThemeMicState("listening");
    startAIThemeTimer();
    startListening("theme");
  });

  // GO! button — confirm chosen theme, speak it, load
  document.getElementById("ai-go-btn")?.addEventListener("click", () => {
    if (!_pendingTheme) return;
    selectTheme(_pendingTheme);
  });

  // Try again — reset to listen state
  document.getElementById("ai-retry-btn")?.addEventListener("click", () => {
    resetAIThemeToListen();
  });

  // AI play mic button — tap to start listening for this round
  document.getElementById("ai-play-mic-btn")?.addEventListener("click", () => {
    if (state.submitted) return;
    if (state.listeningPhase === "playing") return; // already listening
    setAIMicState("listening");
    startListening("playing");
  });

  // Robot/profile wiring removed for standalone browser app.

  // Custom theme btn (wired inside buildThemeGrid when mode=openai)

  // Keep screen awake for the whole session.
  requestWakeLock();

  // Wire browser-only audio routing.
  initAudioRouting();
}

init();
