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
  myId:         null,      // unique client ID (replaces socket.id)
  myName:       null,
  channel:      null,      // Supabase Realtime channel
  guestScores:  null,      // { [id]: score } — used by non-host players
  _joinTimeout: null,      // timeout handle for join attempt
};

/* ── Supabase Realtime ───────────────────────────────────── */
const SUPA_URL = 'https://zqhpmyooctdcrjfniddp.supabase.co';
const SUPA_KEY = 'sb_publishable_BBClJv-XVLplkpCNf0uvOg_mPnECHMC';
const supa = window.supabase.createClient(SUPA_URL, SUPA_KEY);

/* ── Mic permission ──────────────────────────────────────── */
// Prime permission and check Speech API availability early so
// the browser doesn't block recognition mid-round.
async function primeMic() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const micBtn = document.getElementById('mp-mic-btn');
  const noSupport = document.getElementById('mp-mic-no-support');

  if (!SR) {
    if (micBtn)    micBtn.style.display = 'none';
    if (noSupport) noSupport.style.display = 'block';
    return;
  }
  // On iOS Safari getUserMedia is required first to unlock AudioSession
  // for both audio playback AND SpeechRecognition simultaneously.
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    // Keep the stream alive — stopping it revokes mic and breaks recognition on iOS.
    window._micStream = stream;
  } catch (e) {
    console.warn('Mic permission denied:', e);
    if (micBtn)    micBtn.style.display = 'none';
    if (noSupport) { noSupport.textContent = '🎤 Mic access denied — type your answers'; noSupport.style.display = 'block'; }
  }
}

/* ── Speech Recognition ──────────────────────────────────── */
let _recognition = null;

function startMicAnswer() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR || mp.submitted) return;
  stopMicAnswer();

  const rec = new SR();
  rec.lang           = 'en-US';
  rec.interimResults = true;
  rec.continuous     = false;
  rec.maxAlternatives = 1;

  const micBtn   = document.getElementById('mp-mic-btn');
  const micIcon  = document.getElementById('mp-mic-icon');
  const micLabel = document.getElementById('mp-mic-label');

  if (micBtn)   micBtn.classList.add('listening');
  if (micIcon)  micIcon.textContent = '🔴';
  if (micLabel) micLabel.textContent = 'Listening…';

  rec.onresult = (e) => {
    let interim = '', final = '';
    for (let i = e.resultIndex; i < e.results.length; i++) {
      const t = e.results[i][0].transcript;
      if (e.results[i].isFinal) final += t;
      else                      interim += t;
    }
    const heard = (final || interim).trim();
    if (heard) parseVoiceAnswer(heard);
    if (final) {
      stopMicAnswer();
      autoSubmitAfterVoice();
    }
  };

  rec.onerror = (e) => {
    if (e.error === 'no-speech' || e.error === 'aborted') { stopMicAnswer(); return; }
    console.warn('STT error:', e.error);
    stopMicAnswer();
    if (micBtn)   micBtn.classList.add('wrong');
    if (micLabel) micLabel.textContent = 'Try again';
    setTimeout(() => resetMicBtn(), 1500);
  };

  rec.onend = () => { stopMicAnswer(); };

  _recognition = rec;
  try {
    rec.start();
  } catch (e) {
    console.warn('STT start failed:', e);
    stopMicAnswer();
  }

  // iOS: audio may pause when mic activates — auto-resume
  const mpAudio = document.getElementById('mp-audio');
  if (mpAudio) {
    mpAudio.addEventListener('pause', function onPause() {
      if (_recognition && !mp.submitted) {
        setTimeout(() => { if (mpAudio.paused && !mp.submitted) mpAudio.play().catch(() => {}); }, 300);
      } else {
        mpAudio.removeEventListener('pause', onPause);
      }
    });
  }
}

function stopMicAnswer() {
  if (_recognition) {
    try { _recognition.stop(); } catch (_) {}
    _recognition = null;
  }
  resetMicBtn();
}

function resetMicBtn() {
  const micBtn   = document.getElementById('mp-mic-btn');
  const micIcon  = document.getElementById('mp-mic-icon');
  const micLabel = document.getElementById('mp-mic-label');
  if (micBtn)   { micBtn.classList.remove('listening', 'wrong'); }
  if (micIcon)  micIcon.textContent = '🎤';
  if (micLabel) micLabel.textContent = 'Speak Answer';
}

// Parse "Artist by Title" / "Title by Artist" / freeform into fields
function parseVoiceAnswer(transcript) {
  const t = transcript.trim();
  const artistInput = document.getElementById('mp-artist-input');
  const titleInput  = document.getElementById('mp-title-input');
  // Look for "X by Y" pattern
  const byMatch = t.match(/^(.+?)\s+by\s+(.+)$/i);
  if (byMatch) {
    // Could be "Title by Artist" or "Artist by Title" — fill both fields
    titleInput.value  = byMatch[1].trim();
    artistInput.value = byMatch[2].trim();
  } else {
    // Just put everything in title field; user might already have artist typed
    titleInput.value = t;
  }
}

function autoSubmitAfterVoice() {
  if (mp.submitted) return;
  const artist = document.getElementById('mp-artist-input').value.trim();
  const title  = document.getElementById('mp-title-input').value.trim();
  if (artist || title) submitAnswer();
}


  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let c = '';
  for (let i = 0; i < 4; i++) c += chars[Math.floor(Math.random() * chars.length)];
  return c;
}

/* ── Fuzzy answer matching (mirrors server.js) ───────────── */
function norm(s) {
  return String(s).toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ').trim();
}
function lev(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)));
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = a[i-1] === b[j-1]
        ? dp[i-1][j-1]
        : 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
  return dp[m][n];
}
function answerOk(guess, answer) {
  const g = norm(guess), a = norm(answer);
  if (!g || !a) return false;
  if (g === a) return true;
  if (a.length >= 4 && g.includes(a)) return true;
  if (a.length >= 4 && a.includes(g) && g.length >= Math.floor(a.length * 0.6)) return true;
  const tol = a.length <= 5 ? 1 : a.length <= 10 ? 2 : 3;
  return lev(g, a) <= tol;
}
function speedBonus(elapsed) {
  return elapsed <= 10 ? 20 : elapsed <= 20 ? 10 : elapsed <= 25 ? 5 : 0;
}

/* ── Host-side room state ────────────────────────────────── */
const ROOM_ROUNDS   = 10;
const ROOM_DURATION_S = 30;
const REVEAL_PAUSE_MS = 8000;

const hostState = {
  players:        new Map(), // id → { name, avatar, score }
  tracks:         [],
  round:          0,
  phase:          'lobby',   // lobby | starting | playing | revealing | gameover
  roundAnswers:   new Map(), // id → { artistOk, titleOk, pts }
  roundStartTime: null,
  roundTimer:     null,
  replayCount:    0,         // how many times music replayed this round
};

function hostGetScores() {
  const arr = [];
  hostState.players.forEach((p, id) =>
    arr.push({ id, name: p.name, avatar: p.avatar, score: p.score }));
  return arr.sort((a, b) => b.score - a.score);
}

function hostBuildPlayersList() {
  const players = [];
  hostState.players.forEach((p, id) =>
    players.push({ id, name: p.name, avatar: p.avatar, isHost: id === mp.myId, score: p.score }));
  return players;
}

/* ── Broadcast helper ────────────────────────────────────── */
function bcast(event, payload = {}) {
  mp.channel?.send({ type: 'broadcast', event, payload });
}

/* ── Channel setup ───────────────────────────────────────── */
function setupChannel(code) {
  if (mp.channel) { mp.channel.unsubscribe(); mp.channel = null; }
  const ch = supa.channel(`game:${code}`, {
    config: {
      broadcast: { self: false },
      presence:  { key: mp.myId },
    },
  });
  mp.channel = ch;

  // Presence: update lobby player list
  const syncPlayers = () => {
    const players = presenceToPlayers();
    mp.players = players;
    const phase = document.querySelector('.mp-phase.active')?.id;
    if (phase === 'phase-lobby') renderLobbyPlayers(players);
  };
  ch.on('presence', { event: 'sync' },  syncPlayers);
  ch.on('presence', { event: 'join' },  syncPlayers);
  ch.on('presence', { event: 'leave' }, syncPlayers);

  // Join handshake
  ch.on('broadcast', { event: 'join-request' }, ({ payload }) => hostHandleJoinRequest(payload));
  ch.on('broadcast', { event: 'join-ack' },     ({ payload }) => guestHandleJoinAck(payload));
  ch.on('broadcast', { event: 'join-error' },   ({ payload }) => guestHandleJoinError(payload));
  ch.on('broadcast', { event: 'players-update' },({ payload }) => onPlayersUpdate(payload));

  // Game flow
  ch.on('broadcast', { event: 'game-start' },   ({ payload }) => onGameStart(payload));
  ch.on('broadcast', { event: 'round-start' },  ({ payload }) => onRoundStart(payload));
  ch.on('broadcast', { event: 'submit-answer' },({ payload }) => hostHandleAnswer(payload));
  ch.on('broadcast', { event: 'answer-result' },({ payload }) => onAnswerResult(payload));
  ch.on('broadcast', { event: 'score-update' }, ({ payload }) => onScoreUpdate(payload));
  ch.on('broadcast', { event: 'round-end' },    ({ payload }) => onRoundEnd(payload));
  ch.on('broadcast', { event: 'replay-music' }, ({ payload }) => onReplayMusic(payload));
  ch.on('broadcast', { event: 'game-end' },     ({ payload }) => onGameEnd(payload));

  return ch;
}

function presenceToPlayers() {
  if (!mp.channel) return mp.players;
  const state = mp.channel.presenceState();
  const players = [];
  for (const [key, presences] of Object.entries(state)) {
    const p = presences[0];
    if (!p) continue;
    players.push({
      id:     key,
      name:   String(p.name   || 'Player'),
      avatar: String(p.avatar || '🎵'),
      isHost: !!p.isHost,
      score:  mp.isHost
        ? (hostState.players.get(key)?.score ?? 0)
        : (mp.guestScores?.[key] ?? 0),
    });
  }
  return players.sort((a, b) => (b.isHost ? 1 : 0) - (a.isHost ? 1 : 0));
}

/* ── Host: join-request handler ──────────────────────────── */
function hostHandleJoinRequest({ playerId, name, avatar }) {
  if (!mp.isHost) return;
  const safeName = String(name || 'Player').trim().replace(/[<>"']/g, '').slice(0, 20) || 'Player';
  if (hostState.phase !== 'lobby') {
    bcast('join-error', { forId: playerId, message: 'Game already in progress.' });
    return;
  }
  if (hostState.players.size >= 8) {
    bcast('join-error', { forId: playerId, message: 'Room is full (max 8).' });
    return;
  }
  hostState.players.set(playerId, { name: safeName, avatar: String(avatar || '🎵'), score: 0 });
  const players = hostBuildPlayersList();
  bcast('join-ack',      { forId: playerId, code: mp.roomCode, players });
  bcast('players-update',{ players });
  mp.players = players;
  renderLobbyPlayers(players);
}

/* ── Host: answer handler ────────────────────────────────── */
function hostHandleAnswer({ playerId, artist, title }) {
  if (!mp.isHost || hostState.phase !== 'playing') return;
  if (hostState.roundAnswers.has(playerId)) return;
  const tr = hostState.tracks[hostState.round];
  if (!tr) return;
  const elapsed  = (Date.now() - hostState.roundStartTime) / 1000;
  const artistOk = answerOk(artist,  tr.src ?? tr.a);
  const titleOk  = answerOk(title,   tr.t);
  const bonus    = (artistOk || titleOk) ? speedBonus(elapsed) : 0;
  const pts      = (artistOk ? 100 : 0) + (titleOk ? 100 : 0) + bonus;
  hostState.roundAnswers.set(playerId, { artistOk, titleOk, pts });
  const player = hostState.players.get(playerId);
  if (player) player.score += pts;
  bcast('answer-result', { forId: playerId, artistOk, titleOk, pts });
  const answeredCount = hostState.roundAnswers.size;
  const totalPlayers  = hostState.players.size;
  const scores = hostGetScores();
  bcast('score-update', { scores, answeredCount, totalPlayers });
  onScoreUpdate({ scores, answeredCount, totalPlayers });

  // All players answered — check for replay or end
  if (answeredCount >= totalPlayers) {
    if (hostState.roundTimer) { clearTimeout(hostState.roundTimer); hostState.roundTimer = null; }
    const allWrong = [...hostState.roundAnswers.values()].every(a => a.pts === 0);
    const timeLeft = ROOM_DURATION_S - ((Date.now() - hostState.roundStartTime) / 1000);
    if (allWrong && timeLeft > 8 && hostState.replayCount < 2) {
      hostReplayMusic();
    } else {
      hostEndRound();
    }
  }
}

/* ── Host: game flow ─────────────────────────────────────── */
function hostStartRound() {
  if (hostState.round >= hostState.tracks.length || hostState.round >= ROOM_ROUNDS) {
    hostEndGame(); return;
  }
  hostState.phase        = 'playing';
  hostState.roundAnswers = new Map();
  hostState.roundStartTime = Date.now();
  hostState.replayCount  = 0;
  const tr = hostState.tracks[hostState.round];
  const payload = {
    round:      hostState.round + 1,
    total:      Math.min(ROOM_ROUNDS, hostState.tracks.length),
    previewUrl: tr.previewUrl,
    startedAt:  hostState.roundStartTime,
  };
  bcast('round-start', payload);
  onRoundStart(payload); // host processes own round-start
  hostState.roundTimer = setTimeout(() => hostEndRound(), ROOM_DURATION_S * 1000);
}

function hostReplayMusic() {
  hostState.replayCount++;
  hostState.roundAnswers = new Map(); // reset so everyone can answer again
  hostState.roundStartTime = Date.now();
  const tr = hostState.tracks[hostState.round];
  const payload = { previewUrl: tr.previewUrl, startedAt: hostState.roundStartTime };
  bcast('replay-music', payload);
  onReplayMusic(payload); // host processes own replay
  // Give full duration again for the replay
  if (hostState.roundTimer) { clearTimeout(hostState.roundTimer); hostState.roundTimer = null; }
  hostState.roundTimer = setTimeout(() => hostEndRound(), ROOM_DURATION_S * 1000);
}

function hostEndRound() {
  if (hostState.roundTimer) { clearTimeout(hostState.roundTimer); hostState.roundTimer = null; }
  if (hostState.phase !== 'playing') return;
  hostState.phase = 'revealing';
  const tr = hostState.tracks[hostState.round];
  const results = [];
  hostState.players.forEach((p, id) => {
    const ans = hostState.roundAnswers.get(id) || { artistOk: false, titleOk: false, pts: 0 };
    results.push({ id, name: p.name, avatar: p.avatar, artistOk: ans.artistOk, titleOk: ans.titleOk, pts: ans.pts });
  });
  const payload = {
    round:         hostState.round + 1,
    correctArtist: tr.src ?? tr.a,
    correctTitle:  tr.t,
    cover:         tr.cover || null,
    results,
    scores:        hostGetScores(),
  };
  bcast('round-end', payload);
  onRoundEnd(payload); // host processes own round-end
  hostState.round++;
  const hasMore = hostState.round < Math.min(ROOM_ROUNDS, hostState.tracks.length);
  hostState.roundTimer = setTimeout(() => {
    if (hostState.phase === 'revealing') {
      hasMore ? hostStartRound() : hostEndGame();
    }
  }, REVEAL_PAUSE_MS);
}

function hostEndGame() {
  if (hostState.roundTimer) { clearTimeout(hostState.roundTimer); hostState.roundTimer = null; }
  hostState.phase = 'gameover';
  const payload = { scores: hostGetScores() };
  bcast('game-end', payload);
  onGameEnd(payload);
  setTimeout(() => { mp.channel?.unsubscribe(); mp.channel = null; }, 5 * 60 * 1000);
}

/* ── Guest: join handlers ────────────────────────────────── */
function guestHandleJoinAck({ forId, code, players }) {
  if (forId !== mp.myId) return;
  if (mp._joinTimeout) { clearTimeout(mp._joinTimeout); mp._joinTimeout = null; }
  mp.players = players;
  mp.guestScores = {};
  players.forEach(p => { mp.guestScores[p.id] = p.score || 0; });
  document.getElementById('room-code-display').textContent = code;
  renderLobbyPlayers(players);
  document.getElementById('host-controls').style.display = 'none';
  document.getElementById('guest-waiting').style.display = 'block';
  showPhase('phase-lobby');
}

function guestHandleJoinError({ forId, message }) {
  if (forId !== mp.myId) return;
  if (mp._joinTimeout) { clearTimeout(mp._joinTimeout); mp._joinTimeout = null; }
  mp.channel?.unsubscribe();
  mp.channel = null;
  showError(message || 'Could not join room.');
}

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

/* ── Broadcast event handlers ────────────────────────────── */

function onPlayersUpdate({ players }) {
  mp.players = players;
  if (!mp.isHost && mp.guestScores) {
    players.forEach(p => { mp.guestScores[p.id] = p.score || 0; });
  }
  const phase = document.querySelector('.mp-phase.active')?.id;
  if (phase === 'phase-lobby') renderLobbyPlayers(players);
}

function onGameStart({ themeId, themeLabel, themeEmoji, totalRounds }) {
  mp.totalRounds = totalRounds;
  mp.round       = 0;
  mp.submitted   = false;
  mp.theme = { id: themeId, label: themeLabel, emoji: themeEmoji };
  document.getElementById('mp-theme-tag').textContent = `${themeEmoji} ${themeLabel}`;
  document.getElementById('loading-phase-text').textContent = `${themeEmoji} ${themeLabel} — Get ready!`;
  showPhase('phase-loading');
}

function onRoundStart({ round, total, previewUrl, startedAt }) {
  mp.round     = round;
  mp.submitted = false;
  mp.myResult  = null;
  document.getElementById('mp-artist-input').value = '';
  document.getElementById('mp-title-input').value  = '';
  document.getElementById('mp-artist-check').textContent = '';
  document.getElementById('mp-title-check').textContent  = '';
  document.getElementById('mp-answer-area').style.display = 'block';
  document.getElementById('mp-answered-banner').style.display = 'none';
  document.getElementById('mp-replay-banner').style.display = 'none';
  document.getElementById('mp-round-label').textContent = `Round ${round} / ${total}`;
  document.getElementById('mp-skip-btn').style.display = mp.isHost ? 'block' : 'none';
  const micBtn = document.getElementById('mp-mic-btn');
  if (micBtn) micBtn.disabled = false;
  resetMicBtn();
  timerStart(startedAt);
  playPreview(previewUrl);
  renderLiveScores(mp.players.map(p => ({ ...p })), new Set());
  showPhase('phase-playing');
}

function onReplayMusic({ previewUrl, startedAt }) {
  // Reset submissions so everyone can answer again
  mp.submitted = false;
  mp.myResult  = null;
  document.getElementById('mp-artist-input').value = '';
  document.getElementById('mp-title-input').value  = '';
  document.getElementById('mp-artist-check').textContent = '';
  document.getElementById('mp-title-check').textContent  = '';
  document.getElementById('mp-answer-area').style.display = 'block';
  document.getElementById('mp-answered-banner').style.display = 'none';
  const replayBanner = document.getElementById('mp-replay-banner');
  if (replayBanner) { replayBanner.style.display = 'block'; }
  const micBtn = document.getElementById('mp-mic-btn');
  if (micBtn) micBtn.disabled = false;
  resetMicBtn();
  stopMicAnswer();
  timerStart(startedAt);
  playPreview(previewUrl);
  // Hide replay banner after 3s
  setTimeout(() => { if (replayBanner) replayBanner.style.display = 'none'; }, 3000);
}

function onAnswerResult({ forId, artistOk, titleOk, pts }) {
  if (forId !== mp.myId) return;
  mp.myResult  = { artistOk, titleOk, pts };
  mp.submitted = true;
  stopMicAnswer();
  const micBtn = document.getElementById('mp-mic-btn');
  if (micBtn) micBtn.disabled = true;
  document.getElementById('mp-artist-check').textContent = artistOk ? '✅' : '❌';
  document.getElementById('mp-title-check').textContent  = titleOk  ? '✅' : '❌';
  document.getElementById('mp-answer-area').style.display = 'none';
  document.getElementById('mp-answered-banner').style.display = 'block';
  document.getElementById('mp-answered-banner').innerHTML =
    `${artistOk && titleOk ? '🎉' : artistOk || titleOk ? '👍' : '😅'} 
     ${pts > 0 ? `+${pts} pts` : 'No points'} — Waiting for others…`;
}

function onScoreUpdate({ scores, answeredCount, totalPlayers }) {
  mp.players = scores;
  if (!mp.isHost && mp.guestScores) {
    scores.forEach(p => { mp.guestScores[p.id] = p.score || 0; });
  }
  renderLiveScores(scores, new Set());
  const title = document.querySelector('#live-scores-wrap .live-scores-title');
  if (title) title.textContent = `Live Scores (${answeredCount}/${totalPlayers} answered)`;
}

function onRoundEnd({ round, correctArtist, correctTitle, cover, results, scores }) {
  timerStop();
  stopPreview();
  const coverImg  = document.getElementById('mp-cover-img');
  const coverPlac = document.getElementById('mp-cover-placeholder');
  if (cover) {
    coverImg.src = cover;
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
}

function onGameEnd({ scores }) {
  timerStop();
  stopPreview();
  if (mp.autoTimer) { clearInterval(mp.autoTimer); mp.autoTimer = null; }
  renderGameOver(scores);
  showPhase('phase-gameover');
  const myName  = mp.myName || localStorage.getItem('quiz-player-name') || 'Anonymous';
  const myEntry = scores.find(p => p.name === myName);
  if (myEntry && myEntry.score > 0 && mp.theme?.id) {
    supaInsert('quiz_scores', {
      player_name: myName,
      theme_id:    mp.theme.id,
      theme_label: mp.theme.label || 'Multiplayer',
      score:       myEntry.score,
      mode:        'multi',
    }).catch(() => {});
  }
}

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

// Create room
document.getElementById('create-room-btn').addEventListener('click', async () => {
  initAudio();
  const name = document.getElementById('player-name-input').value.trim();
  if (!name) return showError('Please enter your name first.');
  document.getElementById('join-error').style.display = 'none';
  mp.myId   = Math.random().toString(36).substring(2, 11);
  mp.myName = name;
  mp.isHost = true;
  localStorage.setItem('quiz-player-name', name);
  primeMic(); // request mic permission early

  const code = genRoomCode();
  mp.roomCode = code;

  // Reset host state
  Object.assign(hostState, {
    players: new Map([[mp.myId, { name, avatar: '🎧', score: 0 }]]),
    tracks: [], round: 0, phase: 'lobby',
    roundAnswers: new Map(), roundTimer: null, roundStartTime: null,
  });

  const ch = setupChannel(code);
  ch.subscribe(async (status) => {
    if (status === 'SUBSCRIBED') {
      await ch.track({ name, avatar: '🎧', isHost: true });
      document.getElementById('room-code-display').textContent = code;
      mp.players = [{ id: mp.myId, name, avatar: '🎧', isHost: true, score: 0 }];
      renderLobbyPlayers(mp.players);
      document.getElementById('host-controls').style.display = 'block';
      document.getElementById('guest-waiting').style.display = 'none';
      buildThemeGrid();
      showPhase('phase-lobby');
    }
  });
});

document.getElementById('join-room-btn').addEventListener('click', async () => {
  initAudio();
  const name = document.getElementById('player-name-input').value.trim();
  const code = document.getElementById('join-code-input').value.trim().toUpperCase().slice(0, 4);
  if (!name) return showError('Please enter your name first.');
  if (code.length !== 4) return showError('Enter the 4-letter room code.');
  document.getElementById('join-error').style.display = 'none';
  mp.myId   = Math.random().toString(36).substring(2, 11);
  mp.myName = name;
  mp.isHost = false;
  mp.guestScores = {};
  mp.roomCode = code;
  localStorage.setItem('quiz-player-name', name);
  primeMic(); // request mic permission early

  const ch = setupChannel(code);

  // Timeout if the host never acks
  mp._joinTimeout = setTimeout(() => {
    mp._joinTimeout = null;
    ch.unsubscribe();
    mp.channel = null;
    showError('Room not found. Check the code and try again.');
  }, 6000);

  ch.subscribe(async (status) => {
    if (status === 'SUBSCRIBED') {
      await ch.track({ name, avatar: '🎵', isHost: false });
      bcast('join-request', { playerId: mp.myId, name, avatar: '🎵' });
    }
  });
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

// Start game (host only)
document.getElementById('start-game-btn').addEventListener('click', () => {
  if (!mp.enrichedTracks.length) return;
  hostState.tracks = mp.enrichedTracks
    .filter(t => t && typeof t.previewUrl === 'string' && t.previewUrl.startsWith('https://'))
    .map(t => ({
      a:          String(t.a   || '').slice(0, 100),
      t:          String(t.t   || '').slice(0, 100),
      src:        t.src ? String(t.src).slice(0, 100) : undefined,
      previewUrl: t.previewUrl,
      cover:      typeof t.cover === 'string' && t.cover.startsWith('https://') ? t.cover : null,
    }))
    .slice(0, ROOM_ROUNDS + 3);

  if (hostState.tracks.length < 1) {
    showError('No valid previews found. Try a different theme.');
    return;
  }

  const theme = mp.selectedTheme
    ? { id: mp.selectedTheme.id, label: mp.selectedTheme.label, emoji: mp.selectedTheme.emoji }
    : { id: '', label: 'Music Quiz', emoji: '🎵' };

  hostState.round = 0;
  hostState.phase = 'starting';
  hostState.players.forEach(p => { p.score = 0; });

  const totalRounds = Math.min(ROOM_ROUNDS, hostState.tracks.length);
  const startPayload = { themeId: theme.id, themeLabel: theme.label, themeEmoji: theme.emoji, totalRounds };
  bcast('game-start', startPayload);
  onGameStart(startPayload);
  document.getElementById('start-game-btn').disabled = true;
  setTimeout(() => hostStartRound(), 2000);
});

// Mic button
document.getElementById('mp-mic-btn').addEventListener('click', () => {
  if (_recognition) { stopMicAnswer(); return; }
  startMicAnswer();
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
  if (mp.isHost) {
    hostHandleAnswer({ playerId: mp.myId, artist, title });
  } else {
    bcast('submit-answer', { playerId: mp.myId, artist, title });
  }
}

// Skip round (host only)
document.getElementById('mp-skip-btn').addEventListener('click', () => {
  if (mp.isHost) hostEndRound();
});

// Next round (host only)
document.getElementById('mp-next-btn').addEventListener('click', () => {
  if (!mp.isHost) return;
  document.getElementById('mp-next-btn').style.display = 'none';
  if (hostState.roundTimer) { clearTimeout(hostState.roundTimer); hostState.roundTimer = null; }
  const hasMore = hostState.round < Math.min(ROOM_ROUNDS, hostState.tracks.length);
  if (hasMore) { hostStartRound(); } else { hostEndGame(); }
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
