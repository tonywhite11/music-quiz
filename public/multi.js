/* =========================================================
   Blind Test — Multiplayer Client
   ========================================================= */import { supaInsert } from './supabase-client.js';
/* ── THEMES (compact set for multiplayer theme picker) ────── */
const THEMES = [
  { id: 'pop80s',   label: '80s Pop',       emoji: '🎸', tracks: [
    {a:'Michael Jackson',t:'Billie Jean'},{a:'Queen',t:"Don't Stop Me Now"},
    {a:'Cyndi Lauper',t:'Girls Just Want to Have Fun'},{a:'Madonna',t:'Like a Virgin'},
    {a:'A-ha',t:'Take On Me'},{a:'Wham!',t:'Wake Me Up Before You Go-Go'},
    {a:'Duran Duran',t:'Hungry Like the Wolf'},{a:'Culture Club',t:'Karma Chameleon'},
    {a:'Toto',t:'Africa'},{a:'Bon Jovi',t:"Livin' on a Prayer"},
    {a:'Rick Astley',t:'Never Gonna Give You Up'},{a:'Tina Turner',t:"What's Love Got to Do with It"},
    {a:'Prince',t:'Purple Rain'},{a:'George Michael',t:'Careless Whisper'},
    {a:'David Bowie',t:"Let's Dance"},{a:'The Police',t:'Every Breath You Take'},
    {a:'Tears for Fears',t:'Everybody Wants to Rule the World'},
    {a:'Whitney Houston',t:'I Wanna Dance with Somebody'},
    {a:'Michael Jackson',t:'Beat It'},{a:'Eurythmics',t:'Sweet Dreams'},
    {a:'Billy Joel',t:'Uptown Girl'},{a:'Michael Jackson',t:'Thriller'},
  ]},
  { id: 'rock',     label: 'Rock Classic',  emoji: '🤘', tracks: [
    {a:'AC/DC',t:'Back in Black'},{a:'Queen',t:'Bohemian Rhapsody'},
    {a:'The Rolling Stones',t:'Paint It Black'},{a:'Jimi Hendrix',t:'Purple Haze'},
    {a:'Pink Floyd',t:'Wish You Were Here'},{a:'The Doors',t:'Light My Fire'},
    {a:'Aerosmith',t:'Sweet Emotion'},{a:"Guns N' Roses",t:'November Rain'},
    {a:'Led Zeppelin',t:'Whole Lotta Love'},{a:'Deep Purple',t:'Smoke on the Water'},
    {a:'Black Sabbath',t:'Paranoid'},{a:'The Eagles',t:'Hotel California'},
    {a:'Fleetwood Mac',t:'The Chain'},{a:'Tom Petty',t:"Free Fallin'"},
    {a:'Van Halen',t:'Jump'},{a:'The Who',t:"Baba O'Riley"},
    {a:'AC/DC',t:'Highway to Hell'},{a:'Queen',t:'We Will Rock You'},
    {a:'Led Zeppelin',t:'Stairway to Heaven'},{a:"Guns N' Roses",t:"Sweet Child O' Mine"},
    {a:'Aerosmith',t:'Dream On'},{a:'Nirvana',t:'Smells Like Teen Spirit'},
  ]},
  { id: 'pop2000s', label: '2000s Pop',     emoji: '💿', tracks: [
    {a:'Britney Spears',t:'Toxic'},{a:'Justin Timberlake',t:'Cry Me a River'},
    {a:'Beyoncé',t:'Crazy in Love'},{a:'Eminem',t:'Lose Yourself'},
    {a:'OutKast',t:'Hey Ya!'},{a:'The White Stripes',t:'Seven Nation Army'},
    {a:'Coldplay',t:'The Scientist'},{a:'Amy Winehouse',t:'Rehab'},
    {a:'Nelly Furtado',t:'Promiscuous'},{a:'Justin Timberlake',t:'SexyBack'},
    {a:'Alicia Keys',t:"Fallin'"},{a:'Kelly Clarkson',t:'Since U Been Gone'},
    {a:'The Black Eyed Peas',t:'Where Is the Love?'},
    {a:'Christina Aguilera',t:'Beautiful'},{a:"Destiny's Child",t:'Survivor'},
    {a:'Coldplay',t:'Clocks'},{a:'The Killers',t:'Mr. Brightside'},
    {a:'Arctic Monkeys',t:'I Bet You Look Good on the Dancefloor'},
    {a:'Amy Winehouse',t:'Back to Black'},{a:'Gorillaz',t:'Clint Eastwood'},
    {a:'Daft Punk',t:'Harder Better Faster Stronger'},{a:'Eminem',t:'Without Me'},
  ]},
  { id: 'pop2020s', label: '2020s Pop',     emoji: '🚀', tracks: [
    {a:'Olivia Rodrigo',t:'drivers license'},{a:'Dua Lipa',t:'Levitating'},
    {a:'Harry Styles',t:'Watermelon Sugar'},{a:'Billie Eilish',t:'Happier Than Ever'},
    {a:'The Weeknd',t:'Blinding Lights'},{a:'Doja Cat',t:'Say So'},
    {a:'Bad Bunny',t:'Yonaguni'},{a:'Taylor Swift',t:'Anti-Hero'},
    {a:'SZA',t:'Kill Bill'},{a:'Lizzo',t:'About Damn Time'},
    {a:'Olivia Rodrigo',t:'good 4 u'},{a:'Dua Lipa',t:"Don't Start Now"},
    {a:'Harry Styles',t:'As It Was'},{a:'Billie Eilish',t:'bad guy'},
    {a:'The Weeknd',t:'Save Your Tears'},{a:'Lil Nas X',t:'Montero'},
    {a:'Post Malone',t:'Sunflower'},{a:'Taylor Swift',t:'Cruel Summer'},
    {a:'Ariana Grande',t:'7 Rings'},{a:'Sabrina Carpenter',t:'Espresso'},
    {a:'Chappell Roan',t:'Good Luck, Babe!'},{a:'Kendrick Lamar',t:'Not Like Us'},
  ]},
  { id: 'hiphop',   label: 'Hip-Hop 90s',  emoji: '🎤', tracks: [
    {a:'2Pac',t:'California Love'},{a:'The Notorious B.I.G.',t:'Juicy'},
    {a:'Jay-Z',t:'99 Problems'},{a:'Nas',t:'N.Y. State of Mind'},
    {a:'Wu-Tang Clan',t:'C.R.E.A.M.'},{a:'A Tribe Called Quest',t:'Can I Kick It'},
    {a:'Dr. Dre',t:'Still D.R.E.'},{a:'Ice Cube',t:'It Was a Good Day'},
    {a:'Snoop Dogg',t:'Gin and Juice'},{a:'Beastie Boys',t:'Intergalactic'},
    {a:'Lauryn Hill',t:'Everything Is Everything'},
    {a:'2Pac',t:'Dear Mama'},{a:'Jay-Z',t:'Empire State of Mind'},
    {a:'Outkast',t:'Ms. Jackson'},{a:'Missy Elliott',t:'Get Ur Freak On'},
    {a:'Eminem',t:'The Real Slim Shady'},{a:'Fugees',t:'Killing Me Softly'},
    {a:'Snoop Dogg',t:"Drop It Like It's Hot"},{a:'Dr. Dre',t:'The Next Episode'},
    {a:'Outkast',t:'Hey Ya!'},{a:'Jay-Z',t:'Hard Knock Life'},
    {a:'DMX',t:'Ruff Ryders Anthem'},
  ]},
  { id: 'disco',    label: 'Disco',         emoji: '🪩', tracks: [
    {a:'Donna Summer',t:'I Feel Love'},{a:'ABBA',t:'Dancing Queen'},
    {a:'Gloria Gaynor',t:'I Will Survive'},{a:'Chic',t:'Le Freak'},
    {a:'Earth Wind & Fire',t:'September'},{a:'Bee Gees',t:"Stayin' Alive"},
    {a:'Michael Jackson',t:"Don't Stop 'Til You Get Enough"},
    {a:'Sister Sledge',t:'We Are Family'},{a:'Kool & the Gang',t:'Celebration'},
    {a:'Donna Summer',t:'Hot Stuff'},{a:'ABBA',t:'Voulez-Vous'},
    {a:'Bee Gees',t:'Night Fever'},{a:'Chic',t:'Good Times'},
    {a:'Village People',t:'Y.M.C.A.'},{a:'The Trammps',t:'Disco Inferno'},
    {a:'Michael Jackson',t:'Rock with You'},{a:'ABBA',t:'Waterloo'},
    {a:'Earth Wind & Fire',t:'Boogie Wonderland'},{a:'Lipps Inc',t:'Funkytown'},
    {a:'Donna Summer',t:'Last Dance'},{a:'Chic',t:"I Want Your Love"},
  ]},
  { id: 'edm',      label: 'EDM / Electro', emoji: '🎧', tracks: [
    {a:'Daft Punk',t:'One More Time'},{a:'Avicii',t:'Levels'},
    {a:'Calvin Harris',t:'Summer'},{a:'Martin Garrix',t:'Animals'},
    {a:'Deadmau5',t:'Strobe'},{a:'Disclosure',t:'Latch'},
    {a:'Skrillex',t:'Scary Monsters and Nice Sprites'},
    {a:'David Guetta',t:'Titanium'},{a:'Swedish House Mafia',t:"Don't You Worry Child"},
    {a:'Daft Punk',t:'Get Lucky'},{a:'Justice',t:'D.A.N.C.E.'},
    {a:'The Chemical Brothers',t:'Block Rockin\' Beats'},
    {a:"Tiësto",t:'Red Lights'},{a:'Kygo',t:'Firestone'},
    {a:'Daft Punk',t:'Harder Better Faster Stronger'},
    {a:'Avicii',t:'Wake Me Up'},{a:'Calvin Harris',t:'Feel So Close'},
    {a:'Martin Garrix',t:'In the Name of Love'},{a:'Flume',t:'Never Be Like You'},
  ]},
  { id: 'soul',     label: 'Soul / Motown', emoji: '🌟', tracks: [
    {a:'Aretha Franklin',t:'Respect'},{a:'Stevie Wonder',t:'Superstition'},
    {a:'Marvin Gaye',t:"Let's Get It On"},{a:'The Temptations',t:'My Girl'},
    {a:'Otis Redding',t:"Sittin' On The Dock of the Bay"},
    {a:'James Brown',t:'I Got You (I Feel Good)'},
    {a:'Sam Cooke',t:'A Change Is Gonna Come'},{a:'Al Green',t:"Let's Stay Together"},
    {a:'Marvin Gaye',t:"What's Going On"},{a:'Stevie Wonder',t:'Signed Sealed Delivered'},
    {a:'Etta James',t:'At Last'},{a:'Ben E. King',t:'Stand By Me'},
    {a:'Ray Charles',t:'Hit the Road Jack'},{a:'The Jackson 5',t:'I Want You Back'},
    {a:'Aretha Franklin',t:'Think'},{a:'Smokey Robinson',t:'The Tears of a Clown'},
    {a:'Diana Ross',t:"Ain't No Mountain High Enough"},
    {a:'Curtis Mayfield',t:'Move On Up'},{a:'Four Tops',t:"I Can't Help Myself"},
  ]},
  { id: 'reggaeton',label: 'Reggaeton',     emoji: '🔥', tracks: [
    {a:'Daddy Yankee',t:'Gasolina'},{a:'J Balvin',t:'Mi Gente'},
    {a:'Bad Bunny',t:'Dakiti'},{a:'Maluma',t:'Hawái'},
    {a:'Nicky Jam',t:'El Perdón'},{a:'Karol G',t:'Tusa'},
    {a:'Rauw Alejandro',t:'Todo de Ti'},{a:'Ozuna',t:'Taki Taki'},
    {a:'Daddy Yankee',t:'Con Calma'},{a:'Karol G',t:'Provenza'},
    {a:'Bad Bunny',t:'Tití Me Preguntó'},{a:'J Balvin',t:'Ginza'},
    {a:'Anuel AA',t:'China'},{a:'Maluma',t:'Felices los 4'},
    {a:'Don Omar',t:'Danza Kuduro'},{a:'Pitbull',t:'Give Me Everything'},
    {a:'Karol G',t:'MAMIII'},{a:'Bad Bunny',t:'MIA'},
    {a:'Rauw Alejandro',t:'Fantasías'},{a:'Sech',t:'Another Love'},
  ]},
  { id: 'kpop',     label: 'K-Pop',         emoji: '💜', tracks: [
    {a:'BTS',t:'Dynamite'},{a:'BLACKPINK',t:'How You Like That'},
    {a:'TWICE',t:'Cheer Up'},{a:"Girls' Generation",t:'Gee'},
    {a:'BIGBANG',t:'Fantastic Baby'},{a:'SHINee',t:'Ring Ding Dong'},
    {a:'Red Velvet',t:'Bad Boy'},{a:'IU',t:'Celebrity'},
    {a:'Stray Kids',t:"God's Menu"},{a:'aespa',t:'Next Level'},
    {a:'BTS',t:'Boy With Luv'},{a:'BLACKPINK',t:'DDU-DU DDU-DU'},
    {a:'NewJeans',t:'Hype Boy'},{a:'ITZY',t:'DALLA DALLA'},
    {a:'BTS',t:'DNA'},{a:'BTS',t:'Butter'},
    {a:'BLACKPINK',t:'Kill This Love'},{a:'TWICE',t:'Fancy'},
    {a:'aespa',t:'Black Mamba'},{a:'NCT 127',t:'Cherry Bomb'},
  ]},
  { id: 'disney',   label: 'Disney',        emoji: '✨', artistLabel:'Movie', tracks: [
    {a:'Idina Menzel',t:'Let It Go',src:'Frozen'},
    {a:'Elton John',t:'Circle of Life',src:'The Lion King'},
    {a:'Celine Dion',t:'Beauty and the Beast',src:'Beauty and the Beast'},
    {a:'Brad Kane',t:'A Whole New World',src:'Aladdin'},
    {a:'Samuel Wright',t:'Under the Sea',src:'The Little Mermaid'},
    {a:'Randy Newman',t:"You've Got a Friend in Me",src:'Toy Story'},
    {a:'Donny Osmond',t:"I'll Make a Man Out of You",src:'Mulan'},
    {a:'Phil Collins',t:"You'll Be in My Heart",src:'Tarzan'},
    {a:'Lin-Manuel Miranda',t:"We Don't Talk About Bruno",src:'Encanto'},
    {a:'Elton John',t:'Can You Feel the Love Tonight',src:'The Lion King'},
    {a:"Auli'i Cravalho",t:"How Far I'll Go",src:'Moana'},
    {a:'Mandy Moore',t:'I See the Light',src:'Tangled'},
    {a:'Nathan Lane',t:'Hakuna Matata',src:'The Lion King'},
    {a:'Idina Menzel',t:'Into the Unknown',src:'Frozen 2'},
    {a:'Judy Kuhn',t:'Colors of the Wind',src:'Pocahontas'},
    {a:'Alan Menken',t:'Be Our Guest',src:'Beauty and the Beast'},
    {a:'Jodi Benson',t:'Part of Your World',src:'The Little Mermaid'},
    {a:'Susan Egan',t:'Go the Distance',src:'Hercules'},
  ]},
  { id: 'anime',    label: 'Anime',         emoji: '⛩️', artistLabel:'Anime', tracks: [
    {a:'Linked Horizon',t:'Guren no Yumiya',src:'Attack on Titan'},
    {a:'LiSA',t:'Gurenge',src:'Demon Slayer'},
    {a:'LiSA',t:'Crossing Field',src:'Sword Art Online'},
    {a:'Flow',t:'GO',src:'Naruto'},
    {a:'Asian Kung-Fu Generation',t:'Rewrite',src:'Fullmetal Alchemist'},
    {a:'Yui',t:'Again',src:'Fullmetal Alchemist Brotherhood'},
    {a:'King Gnu',t:'Specialz',src:'Jujutsu Kaisen'},
    {a:'Yoko Takahashi',t:"Cruel Angel's Thesis",src:'Neon Genesis Evangelion'},
    {a:'Seatbelts',t:'Tank!',src:'Cowboy Bebop'},
    {a:'TK from Ling Tosite Sigure',t:'Unravel',src:'Tokyo Ghoul'},
    {a:'Burnout Syndromes',t:'Fly High!!',src:'Haikyuu!!'},
    {a:'Ikimono-gakari',t:'Blue Bird',src:'Naruto Shippuden'},
    {a:'Hironobu Kageyama',t:'CHA-LA HEAD-CHA-LA',src:'Dragon Ball Z'},
    {a:'Ado',t:'Utakata Lullaby',src:'One Piece Film: Red'},
    {a:'Porno Graffitti',t:'The Day',src:'My Hero Academia'},
    {a:'Asian Kung-Fu Generation',t:'Haruka Kanata',src:'Naruto'},
    {a:'FLOW',t:'Days',src:'Eureka Seven'},
    {a:'Kalafina',t:'Oath Sign',src:'Fate/Zero'},
  ]},
  { id: 'videogames',label:'Video Games',   emoji: '🎮', artistLabel:'Game', tracks: [
    {a:'Koji Kondo',t:'Super Mario Bros Theme',src:'Super Mario Bros'},
    {a:'Toby Fox',t:'Megalovania',src:'Undertale'},
    {a:'C418',t:'Sweden',src:'Minecraft'},
    {a:'Nobuo Uematsu',t:'One Winged Angel',src:'Final Fantasy VII'},
    {a:'Yoko Shimomura',t:'Simple and Clean',src:'Kingdom Hearts'},
    {a:'Jonathan Coulton',t:'Still Alive',src:'Portal'},
    {a:'Koji Kondo',t:'Gerudo Valley',src:'Zelda Ocarina of Time'},
    {a:"Martin O'Donnell",t:'Halo Theme',src:'Halo'},
    {a:'Nobuo Uematsu',t:"Terra's Theme",src:'Final Fantasy VI'},
    {a:'Darren Korb',t:'Build That Wall',src:'Bastion'},
    {a:'Koji Kondo',t:'Gusty Garden Galaxy',src:'Super Mario Galaxy'},
    {a:'Toby Fox',t:'Hopes and Dreams',src:'Undertale'},
    {a:'Yoko Shimomura',t:'Dearly Beloved',src:'Kingdom Hearts'},
    {a:'Nobuo Uematsu',t:"Aerith's Theme",src:'Final Fantasy VII'},
    {a:'Akira Yamaoka',t:'Promise',src:'Silent Hill 2'},
    {a:'Koji Kondo',t:"Zelda's Lullaby",src:'Zelda Ocarina of Time'},
    {a:'Yasunori Mitsuda',t:'Chrono Trigger Main Theme',src:'Chrono Trigger'},
  ]},
  { id: 'films',    label: 'Films',         emoji: '🎬', artistLabel:'Movie', tracks: [
    {a:'John Williams',t:'The Imperial March',src:'Star Wars'},
    {a:'Hans Zimmer',t:'Time',src:'Inception'},
    {a:'Ennio Morricone',t:'The Good the Bad and the Ugly',src:'The Good the Bad and the Ugly'},
    {a:'John Williams',t:'Indiana Jones Theme',src:'Indiana Jones'},
    {a:'Hans Zimmer',t:"He's a Pirate",src:'Pirates of the Caribbean'},
    {a:'Alan Silvestri',t:'Back to the Future Theme',src:'Back to the Future'},
    {a:'Howard Shore',t:'Concerning Hobbits',src:'Lord of the Rings'},
    {a:'John Williams',t:"Hedwig's Theme",src:'Harry Potter'},
    {a:'Danny Elfman',t:'Batman Theme',src:'Batman'},
    {a:'Hans Zimmer',t:'Interstellar Main Theme',src:'Interstellar'},
    {a:'Nino Rota',t:'The Godfather Theme',src:'The Godfather'},
    {a:'John Williams',t:'Jurassic Park Theme',src:'Jurassic Park'},
    {a:'Celine Dion',t:'My Heart Will Go On',src:'Titanic'},
    {a:'Monty Norman',t:'James Bond Theme',src:'James Bond'},
    {a:'Henry Mancini',t:'Moon River',src:"Breakfast at Tiffany's"},
    {a:'John Williams',t:"Schindler's List Theme",src:"Schindler's List"},
    {a:'Alan Silvestri',t:'Avengers Theme',src:'The Avengers'},
    {a:'Hans Zimmer',t:'Why So Serious',src:'The Dark Knight'},
  ]},
  { id: 'jazz',     label: 'Jazz',          emoji: '🎷', tracks: [
    {a:'Miles Davis',t:'So What'},{a:'Dave Brubeck',t:'Take Five'},
    {a:'Chet Baker',t:'My Funny Valentine'},{a:'Bill Evans',t:'Waltz for Debby'},
    {a:'Louis Armstrong',t:'What a Wonderful World'},
    {a:'Ella Fitzgerald',t:'Summertime'},{a:'Nina Simone',t:'Feeling Good'},
    {a:'Duke Ellington',t:'Mood Indigo'},{a:'John Coltrane',t:'My Favorite Things'},
    {a:'Oscar Peterson',t:'Autumn Leaves'},{a:'Thelonious Monk',t:'Round Midnight'},
    {a:'Charles Mingus',t:'Goodbye Pork Pie Hat'},
    {a:'Herbie Hancock',t:'Cantaloupe Island'},{a:'Art Blakey',t:"Moanin'"},
    {a:'Cannonball Adderley',t:'Mercy Mercy Mercy'},
    {a:'Nina Simone',t:'I Put a Spell on You'},{a:'Chet Baker',t:'Almost Blue'},
    {a:'Miles Davis',t:'Kind of Blue'},
  ]},
  { id: 'classical',label: 'Classical',     emoji: '🎻', tracks: [
    {a:'Beethoven',t:'Für Elise'},{a:'Mozart',t:'Eine kleine Nachtmusik'},
    {a:'Bach',t:'Toccata and Fugue in D minor'},{a:'Vivaldi',t:'Spring'},
    {a:'Chopin',t:'Nocturne Op. 9 No. 2'},{a:'Debussy',t:'Clair de lune'},
    {a:'Satie',t:'Gymnopédie No. 1'},{a:'Tchaikovsky',t:'Swan Lake Theme'},
    {a:'Grieg',t:'In the Hall of the Mountain King'},
    {a:'Brahms',t:'Hungarian Dance No. 5'},{a:'Handel',t:'Hallelujah'},
    {a:'Beethoven',t:'Symphony No. 5'},{a:'Bach',t:'Air on the G String'},
    {a:'Beethoven',t:'Moonlight Sonata'},{a:'Puccini',t:'Nessun Dorma'},
    {a:'Chopin',t:'Ballade No. 1'},{a:'Tchaikovsky',t:'1812 Overture'},
  ]},
  { id: 'country',  label: 'Country',       emoji: '🤠', tracks: [
    {a:'Johnny Cash',t:'Ring of Fire'},{a:'Dolly Parton',t:'Jolene'},
    {a:'Garth Brooks',t:'Friends in Low Places'},{a:'Kenny Rogers',t:'The Gambler'},
    {a:'Willie Nelson',t:'On the Road Again'},{a:'Shania Twain',t:"Man! I Feel Like a Woman!"},
    {a:'Carrie Underwood',t:'Before He Cheats'},{a:'Chris Stapleton',t:'Tennessee Whiskey'},
    {a:'Kacey Musgraves',t:'Rainbow'},{a:'Luke Combs',t:'Beer Never Broke My Heart'},
    {a:'Johnny Cash',t:'Hurt'},{a:'Dolly Parton',t:'I Will Always Love You'},
    {a:'Garth Brooks',t:'The Dance'},{a:'Shania Twain',t:"You're Still the One"},
    {a:'Miranda Lambert',t:'The House That Built Me'},
    {a:'Hank Williams',t:"Your Cheatin' Heart"},{a:'Kenny Rogers',t:'Islands in the Stream'},
  ]},
  { id: 'christmas',label: 'Christmas 🎄',  emoji: '🎅', tracks: [
    {a:'Mariah Carey',t:'All I Want for Christmas Is You'},
    {a:'Wham!',t:'Last Christmas'},
    {a:'Michael Bublé',t:"It's Beginning to Look a Lot Like Christmas"},
    {a:'Frank Sinatra',t:'Jingle Bells'},{a:'Nat King Cole',t:'The Christmas Song'},
    {a:'Bing Crosby',t:'White Christmas'},
    {a:'Brenda Lee',t:"Rockin' Around the Christmas Tree"},
    {a:'Elvis Presley',t:'Blue Christmas'},
    {a:'Andy Williams',t:"It's the Most Wonderful Time of the Year"},
    {a:'Bobby Helms',t:'Jingle Bell Rock'},
    {a:'John Lennon',t:'Happy Xmas (War Is Over)'},
    {a:'Dean Martin',t:'Let It Snow'},{a:'José Feliciano',t:'Feliz Navidad'},
    {a:'Paul McCartney',t:'Wonderful Christmastime'},
    {a:'Slade',t:'Merry Xmas Everybody'},
    {a:'Band Aid',t:'Do They Know It\'s Christmas?'},
    {a:'Chris Rea',t:'Driving Home for Christmas'},
  ]},
  { id: 'pop90s',   label: '90s Pop',       emoji: '📼', tracks: [
    {a:'Backstreet Boys',t:'I Want It That Way'},{a:'NSYNC',t:'Bye Bye Bye'},
    {a:'Spice Girls',t:'Wannabe'},{a:"Destiny's Child",t:'Say My Name'},
    {a:'TLC',t:'No Scrubs'},{a:'No Doubt',t:"Don't Speak"},
    {a:'Mariah Carey',t:'Fantasy'},{a:'Whitney Houston',t:'I Will Always Love You'},
    {a:'Shania Twain',t:"That Don't Impress Me Much"},{a:'Boyzone',t:'Words'},
    {a:'Take That',t:'Back for Good'},{a:'All Saints',t:'Never Ever'},
    {a:'Savage Garden',t:'Truly Madly Deeply'},{a:'Hanson',t:'MMMBop'},
    {a:'Aqua',t:'Barbie Girl'},{a:'Ace of Base',t:'All That She Wants'},
    {a:'Robbie Williams',t:'Angels'},{a:'Celine Dion',t:'My Heart Will Go On'},
    {a:'Boyz II Men',t:'End of the Road'},{a:'En Vogue',t:"Don't Let Go"},
    {a:'Sheryl Crow',t:'All I Wanna Do'},{a:'Alanis Morissette',t:'You Oughta Know'},
  ]},
  { id: 'rnb',      label: 'R&B / Neo-Soul', emoji: '🎤', tracks: [
    {a:'TLC',t:'Waterfalls'},{a:"Destiny's Child",t:'Say My Name'},
    {a:'Whitney Houston',t:'I Will Always Love You'},{a:'Mariah Carey',t:'Fantasy'},
    {a:'Boyz II Men',t:'End of the Road'},{a:'Aaliyah',t:'Try Again'},
    {a:'Usher',t:'Yeah!'},{a:'Alicia Keys',t:"Fallin'"},
    {a:'Beyoncé',t:'Crazy in Love'},{a:'Rihanna',t:'Umbrella'},
    {a:'Mary J Blige',t:'Real Love'},{a:'Lauryn Hill',t:'Doo Wop (That Thing)'},
    {a:"D'Angelo",t:'Brown Sugar'},{a:'Erykah Badu',t:'On & On'},
    {a:'Maxwell',t:'Ascension'},{a:'John Legend',t:'Ordinary People'},
    {a:'Ne-Yo',t:'So Sick'},{a:'Chris Brown',t:'With You'},
    {a:'Janet Jackson',t:"That's the Way Love Goes"},{a:'Brian McKnight',t:'Back at One'},
    {a:'Blackstreet',t:'No Diggity'},{a:'SWV',t:'Weak'},
  ]},
  { id: 'latin',    label: 'Latin Pop',      emoji: '💃', tracks: [
    {a:'Shakira',t:'Waka Waka'},{a:'Enrique Iglesias',t:'Bailando'},
    {a:'Ricky Martin',t:"Livin' la Vida Loca"},{a:'Marc Anthony',t:'Vivir Mi Vida'},
    {a:'Gloria Estefan',t:'Conga'},{a:'Jennifer Lopez',t:'On the Floor'},
    {a:'Juanes',t:'La Camisa Negra'},{a:'Luis Fonsi',t:'Despacito'},
    {a:'Camila Cabello',t:'Havana'},{a:'Shakira',t:"Hips Don't Lie"},
    {a:'Ricky Martin',t:'La Copa de la Vida'},{a:'Jennifer Lopez',t:"Let's Get Loud"},
    {a:'Enrique Iglesias',t:'Hero'},{a:'Carlos Vives',t:'La Bicicleta'},
    {a:'Alejandro Sanz',t:'Corazón Partido'},{a:'Celia Cruz',t:'La Vida Es Un Carnaval'},
    {a:'Maluma',t:'Corazón'},{a:'Pitbull',t:'Give Me Everything'},
    {a:'J Balvin',t:'Con Calma'},{a:'Bad Bunny',t:'MIA'},
    {a:'Ozuna',t:'Taki Taki'},{a:'Karol G',t:'Tusa'},
  ]},
  { id: 'kids',     label: 'Kids & Family',  emoji: '🧸', tracks: [
    {a:'Pinkfong',t:'Baby Shark'},{a:'Pharrell Williams',t:'Happy'},
    {a:'Justin Timberlake',t:"Can't Stop the Feeling"},
    {a:'Tegan and Sara',t:'Everything Is Awesome'},
    {a:'Jason Paige',t:'Pokémon Theme'},{a:'PSY',t:'Gangnam Style'},
    {a:'Los del Rio',t:'Macarena'},{a:'Village People',t:'Y.M.C.A.'},
    {a:'Julie Andrews',t:'Do Re Mi'},{a:'Julie Andrews',t:'Supercalifragilisticexpialidocious'},
    {a:'Bob the Builder',t:'Can We Fix It'},{a:'The Wiggles',t:'Hot Potato'},
    {a:'Idina Menzel',t:'Let It Go'},{a:'Randy Newman',t:"You've Got a Friend in Me"},
    {a:'Lin-Manuel Miranda',t:"We Don't Talk About Bruno"},
    {a:"Auli'i Cravalho",t:"How Far I'll Go"},
    {a:'Elton John',t:'Circle of Life'},{a:'Donny Osmond',t:"I'll Make a Man Out of You"},
    {a:'Nat King Cole',t:'The Christmas Song'},{a:'Raffi',t:'Baby Beluga'},
    {a:'The Singing Kettle',t:'Hokey Cokey'},{a:'American Authors',t:'Best Day of My Life'},
  ]},
  { id: 'random',   label: 'Random Mix',    emoji: '🎲', tracks: null, random: true },
];

/* ── Deezer JSONP ────────────────────────────────────────── */
function deezerSearch(q) {
  return new Promise((resolve) => {
    const cb = `_dz${Date.now()}${Math.random().toString(36).slice(2)}`;
    const script = document.createElement('script');
    const cleanup = () => { delete window[cb]; script.remove(); };
    window[cb] = (data) => { cleanup(); resolve(data?.data?.[0] ?? null); };
    script.onerror = () => { cleanup(); resolve(null); };
    script.src = `https://api.deezer.com/search?q=${encodeURIComponent(q)}&limit=1&output=jsonp&callback=${cb}`;
    document.head.appendChild(script);
    setTimeout(() => { cleanup(); resolve(null); }, 6000);
  });
}

async function enrichTracks(rawTracks) {
  const results = await Promise.all(
    rawTracks.map(({ a, t }) => deezerSearch(`${a} ${t}`))
  );
  return rawTracks.map((raw, i) => ({
    ...raw,
    previewUrl: results[i]?.preview ?? null,
    cover:      results[i]?.album?.cover_medium ?? null,
  })).filter(tr => tr.previewUrl);
}

/* ── State ───────────────────────────────────────────────── */
const mp = {
  roomCode:     null,
  isHost:       false,
  players:      [],
  theme:        null,
  selectedTheme: null,
  enrichedTracks: [],
  totalRounds:  10,
  round:        0,
  roundTimer:   null,
  autoTimer:    null,
  submitted:    false,
  myResult:     null,
  themeFetching: false,
};

/* ── Socket ──────────────────────────────────────────────── */
const socket = window.io();

/* ── Audio ───────────────────────────────────────────────── */
const audio = document.getElementById('mp-audio');
let audioCtx  = null;
let audioSrc  = null;

function initAudio() {
  if (audioCtx) return;
  try {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    audioSrc = audioCtx.createMediaElementSource(audio);
    const gain = audioCtx.createGain();
    gain.gain.value = 2.0;
    audioSrc.connect(gain);
    gain.connect(audioCtx.destination);
  } catch (e) { /* fallback to native volume */ }
}

document.addEventListener('click', () => { audioCtx?.resume(); }, { once: true, passive: true });

async function playPreview(url) {
  initAudio();
  if (audioCtx?.state === 'suspended') await audioCtx.resume();
  audio.src = url;
  audio.currentTime = 0;
  audio.play().catch(() => {});
}

function stopPreview() {
  audio.pause();
  audio.src = '';
}

/* ── Phase helpers ───────────────────────────────────────── */
function showPhase(id) {
  document.querySelectorAll('.mp-phase').forEach(el => el.classList.remove('active'));
  document.getElementById(id)?.classList.add('active');
}

function showError(msg) {
  const el = document.getElementById('join-error');
  el.textContent = msg;
  el.style.display = 'block';
}

/* ── Timer ring ──────────────────────────────────────────── */
const CIRCUMFERENCE = 2 * Math.PI * 48; // r=48
const timerRing = document.getElementById('mp-timer-ring');
const timerNum  = document.getElementById('mp-timer-num');
const ROUND_DURATION = 30;

let timerRaf = null;
let timerStartedAt = 0;

function timerUpdate(remaining) {
  const fraction = remaining / ROUND_DURATION;
  timerRing.style.strokeDasharray  = `${CIRCUMFERENCE}`;
  timerRing.style.strokeDashoffset = `${CIRCUMFERENCE * (1 - fraction)}`;
  timerNum.textContent = Math.ceil(remaining);
  const urgent = remaining <= 8;
  timerRing.classList.toggle('urgent', urgent);
  timerNum.classList.toggle('urgent',  urgent);
}

function timerStart(startedAt) {
  timerStartedAt = startedAt;
  if (timerRaf) cancelAnimationFrame(timerRaf);
  const tick = () => {
    const elapsed   = (Date.now() - timerStartedAt) / 1000;
    const remaining = Math.max(0, ROUND_DURATION - elapsed);
    timerUpdate(remaining);
    if (remaining > 0) timerRaf = requestAnimationFrame(tick);
  };
  timerRaf = requestAnimationFrame(tick);
}

function timerStop() {
  if (timerRaf) { cancelAnimationFrame(timerRaf); timerRaf = null; }
}

/* ── Lobby: build players list ───────────────────────────── */
function renderLobbyPlayers(players) {
  const list = document.getElementById('lobby-players-list');
  const count = document.getElementById('player-count');
  count.textContent = `(${players.length})`;
  list.innerHTML = players.map(p => `
    <li class="player-row">
      <span class="player-avatar">${p.avatar}</span>
      <span class="player-name">${escHtml(p.name)}</span>
      ${p.isHost ? '<span class="host-badge-sm">Host</span>' : ''}
    </li>
  `).join('');
}

/* ── Lobby: build theme grid ─────────────────────────────── */
function buildThemeGrid() {
  const grid = document.getElementById('multi-theme-grid');
  grid.innerHTML = '';
  THEMES.forEach(theme => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'multi-theme-btn';
    btn.dataset.id = theme.id;
    btn.innerHTML = `<span class="te">${theme.emoji}</span><span>${theme.label}</span>`;
    btn.addEventListener('click', () => selectTheme(theme, btn));
    grid.appendChild(btn);
  });
}

async function selectTheme(theme, btn) {
  if (mp.themeFetching) return;

  // Visual selection
  document.querySelectorAll('.multi-theme-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  mp.selectedTheme = theme;

  // Disable start until we have tracks
  document.getElementById('start-game-btn').disabled = true;
  mp.enrichedTracks = [];

  // Show loading indicator
  const loadingDiv = document.getElementById('theme-loading');
  const loadingText = document.getElementById('theme-loading-text');
  loadingDiv.style.display = 'block';
  loadingText.textContent = `Fetching ${theme.label} previews…`;
  mp.themeFetching = true;

  try {
    let rawTracks = theme.tracks;

    // Random mix: pick 2-3 from each theme
    if (theme.random || !rawTracks) {
      rawTracks = [];
      const pool = THEMES.filter(t => !t.random && t.tracks);
      pool.forEach(t => {
        const shuffled = [...t.tracks].sort(() => Math.random() - 0.5);
        rawTracks.push(...shuffled.slice(0, 2));
      });
      rawTracks = rawTracks.sort(() => Math.random() - 0.5).slice(0, 30);
    }

    // Shuffle and limit for faster loading
    const shuffled = [...rawTracks].sort(() => Math.random() - 0.5).slice(0, 25);
    const enriched = await enrichTracks(shuffled);
    mp.enrichedTracks = enriched.slice(0, 13); // keep a few extra beyond 10

    if (mp.enrichedTracks.length >= 5) {
      loadingText.textContent = `✅ ${mp.enrichedTracks.length} tracks ready!`;
      document.getElementById('start-game-btn').disabled = false;
    } else {
      loadingText.textContent = `⚠️ Only ${mp.enrichedTracks.length} previews found — try another theme`;
    }
  } catch (e) {
    loadingText.textContent = '❌ Error fetching tracks. Try again.';
    console.error(e);
  } finally {
    mp.themeFetching = false;
  }
}

/* ── Live scores ─────────────────────────────────────────── */
function renderLiveScores(scores, answeredIds = new Set()) {
  const list = document.getElementById('live-scores-list');
  list.innerHTML = scores.map(p => `
    <div class="live-score-row ${answeredIds.has(p.id) ? 'answered' : ''}">
      <span class="ls-avatar">${p.avatar}</span>
      <span class="ls-name">${escHtml(p.name)}</span>
      <span class="ls-check">${answeredIds.has(p.id) ? '✅' : ''}</span>
      <span class="ls-score">${p.score} pts</span>
    </div>
  `).join('');
}

/* ── Reveal scores ───────────────────────────────────────── */
function renderRevealScores(scores) {
  const medals = ['🥇', '🥈', '🥉'];
  const list = document.getElementById('reveal-scores-list');
  list.innerHTML = scores.map((p, i) => `
    <div class="reveal-score-row">
      <span class="rs-rank">${medals[i] || (i + 1) + '.'}</span>
      <span>${p.avatar}</span>
      <span class="rs-name">${escHtml(p.name)}</span>
      <span class="rs-score">${p.score} pts</span>
    </div>
  `).join('');
}

/* ── Round results ───────────────────────────────────────── */
function renderRoundResults(results) {
  const list = document.getElementById('round-results-list');
  list.innerHTML = results.map(p => `
    <div class="round-result-row">
      <span>${p.avatar}</span>
      <span class="rr-name">${escHtml(p.name)}</span>
      <span class="rr-checks">
        <span title="Artist">${p.artistOk ? '✅' : '❌'}</span>
        <span title="Title">${p.titleOk ? '✅' : '❌'}</span>
      </span>
      <span class="rr-pts">${p.pts > 0 ? '+' + p.pts : '0'} pts</span>
    </div>
  `).join('');
}

/* ── Final leaderboard ───────────────────────────────────── */
function renderGameOver(scores) {
  const medals = ['🥇', '🥈', '🥉'];

  // Podium (top 3)
  const podium = document.getElementById('go-podium');
  const top3 = scores.slice(0, 3);
  podium.innerHTML = top3.map((p, i) => `
    <div class="podium-place">
      <span class="podium-medal">${medals[i] || ''}</span>
      <span class="podium-avatar">${p.avatar}</span>
      <span class="podium-name">${escHtml(p.name)}</span>
      <span class="podium-score">${p.score} pts</span>
      <div class="podium-bar"></div>
    </div>
  `).join('');

  // Full list
  const list = document.getElementById('go-final-list');
  list.innerHTML = scores.map((p, i) => `
    <div class="final-row">
      <span class="fr-rank">${medals[i] || (i + 1) + '.'}</span>
      <span class="fr-avatar">${p.avatar}</span>
      <span class="fr-name">${escHtml(p.name)}</span>
      <span class="fr-score">${p.score} pts</span>
    </div>
  `).join('');
}

/* ── Utility ─────────────────────────────────────────────── */
function escHtml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

/* ── Socket event handlers ───────────────────────────────── */

socket.on('room-created', ({ code, players }) => {
  mp.roomCode = code;
  mp.isHost   = true;
  mp.players  = players;
  document.getElementById('room-code-display').textContent = code;
  renderLobbyPlayers(players);
  document.getElementById('host-controls').style.display = 'block';
  document.getElementById('guest-waiting').style.display = 'none';
  buildThemeGrid();
  showPhase('phase-lobby');
});

socket.on('room-joined', ({ code, players }) => {
  mp.roomCode = code;
  mp.isHost   = false;
  mp.players  = players;
  document.getElementById('room-code-display').textContent = code;
  renderLobbyPlayers(players);
  document.getElementById('host-controls').style.display = 'none';
  document.getElementById('guest-waiting').style.display = 'block';
  showPhase('phase-lobby');
});

socket.on('error', ({ message }) => {
  showError(message);
});

socket.on('players-update', ({ players }) => {
  mp.players = players;
  renderLobbyPlayers(players);

  // Update host badge on playing screen if needed
  if (mp.isHost) return;
  const me = players.find(p => p.isHost);
  // Check if we became host
  const mySocket = socket.id;
  const iAmHost = players.find(p => p.id === mySocket && p.isHost);
  if (iAmHost && !mp.isHost) {
    mp.isHost = true;
    // Show host-only controls if in lobby
    document.getElementById('host-controls').style.display = 'block';
    document.getElementById('guest-waiting').style.display = 'none';
    buildThemeGrid();
  }
});

socket.on('host-changed', ({ hostId }) => {
  if (socket.id === hostId) {
    mp.isHost = true;
    // Show skip button if playing
    const skipBtn = document.getElementById('mp-skip-btn');
    const nextBtn = document.getElementById('mp-next-btn');
    if (skipBtn) skipBtn.style.display = 'block';
    if (nextBtn) nextBtn.style.display = 'block';
    document.getElementById('auto-advance-msg').style.display = 'none';
  }
});

socket.on('game-start', ({ themeId, themeLabel, themeEmoji, totalRounds }) => {
  mp.totalRounds = totalRounds;
  mp.round       = 0;
  mp.submitted   = false;
  mp.theme = { id: themeId, label: themeLabel, emoji: themeEmoji };

  document.getElementById('mp-theme-tag').textContent = `${themeEmoji} ${themeLabel}`;
  document.getElementById('loading-phase-text').textContent = `${themeEmoji} ${themeLabel} — Get ready!`;
  showPhase('phase-loading');
});

socket.on('round-start', ({ round, total, previewUrl, startedAt }) => {
  mp.round     = round;
  mp.submitted = false;
  mp.myResult  = null;

  // Reset answer UI
  document.getElementById('mp-artist-input').value = '';
  document.getElementById('mp-title-input').value  = '';
  document.getElementById('mp-artist-check').textContent = '';
  document.getElementById('mp-title-check').textContent  = '';
  document.getElementById('mp-answer-area').style.display = 'block';
  document.getElementById('mp-answered-banner').style.display = 'none';
  document.getElementById('mp-round-label').textContent = `Round ${round} / ${total}`;

  // Host skip button
  document.getElementById('mp-skip-btn').style.display = mp.isHost ? 'block' : 'none';

  // Start timer
  timerStart(startedAt);

  // Play audio
  playPreview(previewUrl);

  // Clear live scores answered status
  renderLiveScores(mp.players.map(p => ({ ...p })), new Set());

  showPhase('phase-playing');
});

socket.on('answer-result', ({ artistOk, titleOk, pts }) => {
  mp.myResult  = { artistOk, titleOk, pts };
  mp.submitted = true;

  // Show check marks
  document.getElementById('mp-artist-check').textContent = artistOk ? '✅' : '❌';
  document.getElementById('mp-title-check').textContent  = titleOk  ? '✅' : '❌';

  // Hide form, show banner
  document.getElementById('mp-answer-area').style.display = 'none';
  document.getElementById('mp-answered-banner').style.display = 'block';
  document.getElementById('mp-answered-banner').innerHTML =
    `${artistOk && titleOk ? '🎉' : artistOk || titleOk ? '👍' : '😅'} 
     ${pts > 0 ? `+${pts} pts` : 'No points'} — Waiting for others…`;
});

socket.on('score-update', ({ scores, answeredCount, totalPlayers }) => {
  mp.players = scores;
  // Build answered set — we can't know exactly who answered from just count,
  // so we highlight rows where score changed. For simplicity just show answered count.
  renderLiveScores(scores, new Set());
  // Show answering progress on the live scores title
  const title = document.querySelector('#live-scores-wrap .live-scores-title');
  if (title) title.textContent = `Live Scores (${answeredCount}/${totalPlayers} answered)`;
});

socket.on('round-end', ({ round, correctArtist, correctTitle, cover, results, scores }) => {
  timerStop();
  stopPreview();

  // Reveal phase
  const coverImg  = document.getElementById('mp-cover-img');
  const coverPlac = document.getElementById('mp-cover-placeholder');
  if (cover) {
    coverImg.src          = cover;
    coverImg.style.display = 'block';
    coverPlac.style.display = 'none';
  } else {
    coverImg.style.display  = 'none';
    coverPlac.style.display = 'flex';
  }

  document.getElementById('mp-correct-artist').textContent = correctArtist;
  document.getElementById('mp-correct-title').textContent  = correctTitle;

  renderRoundResults(results);
  renderRevealScores(scores);

  // Next round controls
  const nextBtn = document.getElementById('mp-next-btn');
  const autoMsg = document.getElementById('auto-advance-msg');
  if (mp.isHost) {
    nextBtn.style.display = 'block';
    autoMsg.style.display = 'none';
  } else {
    nextBtn.style.display = 'none';
    autoMsg.style.display = 'block';
    startAutoCountdown(8);
  }

  showPhase('phase-reveal');
});

socket.on('game-end', ({ scores }) => {
  timerStop();
  stopPreview();
  if (mp.autoTimer) { clearInterval(mp.autoTimer); mp.autoTimer = null; }
  renderGameOver(scores);
  showPhase('phase-gameover');

  // Save this player's score to Supabase
  const myName  = mp.myName || localStorage.getItem('quiz-player-name') || 'Anonymous';
  const myEntry = scores.find(p => p.name === myName);
  if (myEntry && myEntry.score > 0 && mp.theme?.id) {
    supaInsert('quiz_scores', {
      player_name: myName,
      theme_id:    mp.theme.id,
      theme_label: mp.theme.label || 'Multiplayer',
      score:       myEntry.score,
      mode:        'multi',
    }).catch(() => {}); // silently ignore network errors
  }
});

/* ── Auto-advance countdown (guest) ─────────────────────── */
function startAutoCountdown(secs) {
  if (mp.autoTimer) clearInterval(mp.autoTimer);
  let remaining = secs;
  document.getElementById('auto-countdown').textContent = remaining;
  mp.autoTimer = setInterval(() => {
    remaining--;
    const el = document.getElementById('auto-countdown');
    if (el) el.textContent = remaining;
    if (remaining <= 0) { clearInterval(mp.autoTimer); mp.autoTimer = null; }
  }, 1000);
}

/* ── DOM bindings ────────────────────────────────────────── */

// Join phase
document.getElementById('create-room-btn').addEventListener('click', () => {
  initAudio();
  const name = document.getElementById('player-name-input').value.trim();
  if (!name) return showError('Please enter your name first.');
  document.getElementById('join-error').style.display = 'none';
  mp.myName = name;
  localStorage.setItem('quiz-player-name', name);
  socket.emit('create-room', { name });
});

document.getElementById('join-room-btn').addEventListener('click', () => {
  initAudio();
  const name = document.getElementById('player-name-input').value.trim();
  const code = document.getElementById('join-code-input').value.trim();
  if (!name) return showError('Please enter your name first.');
  if (code.length !== 4) return showError('Enter the 4-letter room code.');
  document.getElementById('join-error').style.display = 'none';
  mp.myName = name;
  localStorage.setItem('quiz-player-name', name);
  socket.emit('join-room', { name, code });
});

// Pre-fill name from localStorage if available
(function () {
  const saved = localStorage.getItem('quiz-player-name');
  if (saved) document.getElementById('player-name-input').value = saved;
})();

// Allow Enter key on code input to join
document.getElementById('join-code-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') document.getElementById('join-room-btn').click();
});
document.getElementById('player-name-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const code = document.getElementById('join-code-input').value.trim();
    if (code.length === 4) document.getElementById('join-room-btn').click();
    else document.getElementById('create-room-btn').click();
  }
});

// Copy invite link
document.getElementById('copy-link-btn').addEventListener('click', () => {
  const url = `${location.origin}/lobby.html?join=${mp.roomCode}`;
  navigator.clipboard.writeText(url).then(() => {
    const btn = document.getElementById('copy-link-btn');
    btn.textContent = '✅ Copied!';
    setTimeout(() => { btn.innerHTML = '&#128279;&nbsp; Copy invite link'; }, 2000);
  }).catch(() => {
    prompt('Share this link:', `${location.origin}/lobby.html?join=${mp.roomCode}`);
  });
});

// Start game (host)
document.getElementById('start-game-btn').addEventListener('click', () => {
  if (!mp.enrichedTracks.length) return;
  socket.emit('start-game', {
    tracks: mp.enrichedTracks,
    theme:  mp.selectedTheme
      ? { id: mp.selectedTheme.id, label: mp.selectedTheme.label, emoji: mp.selectedTheme.emoji }
      : null,
  });
  document.getElementById('start-game-btn').disabled = true;
});

// Submit answer
document.getElementById('mp-submit-btn').addEventListener('click', submitAnswer);
document.getElementById('mp-artist-input').addEventListener('keydown', e => { if (e.key === 'Enter') submitAnswer(); });
document.getElementById('mp-title-input').addEventListener('keydown',  e => { if (e.key === 'Enter') submitAnswer(); });

function submitAnswer() {
  if (mp.submitted) return;
  const artist = document.getElementById('mp-artist-input').value.trim();
  const title  = document.getElementById('mp-title-input').value.trim();
  if (!artist && !title) return;
  socket.emit('submit-answer', { artist, title });
}

// Skip (host)
document.getElementById('mp-skip-btn').addEventListener('click', () => {
  socket.emit('skip-round');
});

// Next round (host)
document.getElementById('mp-next-btn').addEventListener('click', () => {
  socket.emit('next-round');
  document.getElementById('mp-next-btn').style.display = 'none';
});

// Play again
document.getElementById('go-play-again').addEventListener('click', () => {
  location.reload();
});

/* ── Auto-fill ?join=CODE from URL ───────────────────────── */
(function checkJoinParam() {
  const params = new URLSearchParams(location.search);
  const code   = params.get('join');
  if (code) {
    document.getElementById('join-code-input').value = code.toUpperCase();
    document.getElementById('player-name-input').focus();
  }
})();
