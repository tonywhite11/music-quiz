/* =========================================================
   Blind Test — Multiplayer Client
   ========================================================= */
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
  { id: 'rnb90s',   label: '90s R&B',        emoji: '🎤', tracks: [
    {a:'TLC',t:'Waterfalls'},{a:'Aaliyah',t:'Try Again'},
    {a:'Mary J. Blige',t:'Real Love'},{a:'Boyz II Men',t:'End of the Road'},
    {a:'Whitney Houston',t:'I Will Always Love You'},{a:'Mariah Carey',t:'Fantasy'},
    {a:'SWV',t:'Weak'},{a:'Blackstreet',t:'No Diggity'},
    {a:'En Vogue',t:"Don't Let Go"},{a:'Janet Jackson',t:"That's the Way Love Goes"},
    {a:"Destiny's Child",t:'Say My Name'},{a:'Usher',t:'My Way'},
    {a:'R. Kelly',t:'I Believe I Can Fly'},{a:'Brian McKnight',t:'Back at One'},
    {a:'112',t:'Cupid'},{a:'Monica',t:'The First Night'},
    {a:'Brandy',t:'The Boy Is Mine'},{a:'New Edition',t:'Can You Stand the Rain'},
  ]},
  { id: 'frenchpop',label: 'French Pop',      emoji: '🗼', tracks: [
    {a:'Stromae',t:'Alors On Danse'},{a:'Stromae',t:'Papaoutai'},
    {a:'Edith Piaf',t:'La Vie en Rose'},{a:'Daft Punk',t:'Get Lucky'},
    {a:'Christine and the Queens',t:'Tilted'},{a:'Indochine',t:"L'Aventurier"},
    {a:'Serge Gainsbourg',t:'La Javanaise'},{a:'France Gall',t:'Poupée de cire'},
    {a:'Jacques Brel',t:'Ne me quitte pas'},{a:'Charles Aznavour',t:'La Bohème'},
    {a:'Aya Nakamura',t:'Djadja'},{a:'Angèle',t:'Balance ton quoi'},
    {a:'Claudio Capéo',t:'Un homme debout'},{a:'Camille',t:'Ta douleur'},
    {a:'M',t:'Jeune et con'},{a:'Soprano',t:'Cosca nostra'},
    {a:'Maître Gims',t:'Bella'},{a:'Nekfeu',t:'Étoiles'},
  ]},
  { id: 'metal',    label: 'Metal',           emoji: '💀', tracks: [
    {a:'Metallica',t:'Enter Sandman'},{a:'Iron Maiden',t:'The Trooper'},
    {a:'Black Sabbath',t:'Iron Man'},{a:'Slayer',t:'Raining Blood'},
    {a:'Pantera',t:'Cowboys from Hell'},{a:'Megadeth',t:'Symphony of Destruction'},
    {a:'Judas Priest',t:'Painkiller'},{a:'Motorhead',t:'Ace of Spades'},
    {a:'Ozzy Osbourne',t:'Crazy Train'},{a:'Dio',t:'Holy Diver'},
    {a:'System of a Down',t:'Chop Suey!'},{a:'Tool',t:'Schism'},
    {a:'Slipknot',t:'Duality'},{a:'Lamb of God',t:'Redneck'},
    {a:'Mastodon',t:'Blood and Thunder'},{a:'Gojira',t:'Flying Whales'},
    {a:'Dimmu Borgir',t:'Progenies of the Great Apocalypse'},
    {a:'Nightwish',t:'Ghost Love Score'},
  ]},
  { id: 'grunge',   label: 'Grunge',          emoji: '🎸', tracks: [
    {a:'Nirvana',t:'Smells Like Teen Spirit'},{a:'Pearl Jam',t:'Jeremy'},
    {a:'Soundgarden',t:'Black Hole Sun'},{a:'Alice in Chains',t:'Rooster'},
    {a:'Stone Temple Pilots',t:'Plush'},{a:'Mudhoney',t:'Touch Me I\'m Sick'},
    {a:'Nirvana',t:'Come as You Are'},{a:'Pearl Jam',t:'Even Flow'},
    {a:'Soundgarden',t:'Spoonman'},{a:'Alice in Chains',t:'Would?'},
    {a:'Pixies',t:'Where Is My Mind?'},{a:'Smashing Pumpkins',t:'Bullet with Butterfly Wings'},
    {a:'Hole',t:'Celebrity Skin'},{a:'Bush',t:'Glycerine'},
    {a:'Foo Fighters',t:'Everlong'},{a:'Weezer',t:'Buddy Holly'},
    {a:'Beck',t:'Loser'},{a:'Dinosaur Jr.',t:'Feel the Pain'},
  ]},
  { id: 'newwave',  label: 'New Wave',         emoji: '📼', tracks: [
    {a:'Talking Heads',t:'Psycho Killer'},{a:'The Cure',t:'Boys Don\'t Cry'},
    {a:'Depeche Mode',t:'Personal Jesus'},{a:'New Order',t:'Blue Monday'},
    {a:'Joy Division',t:'Love Will Tear Us Apart'},{a:'The Smiths',t:'There Is a Light That Never Goes Out'},
    {a:'Blondie',t:'Heart of Glass'},{a:'Devo',t:'Whip It'},
    {a:'Siouxsie and the Banshees',t:'Cities in Dust'},{a:'Echo & the Bunnymen',t:'The Killing Moon'},
    {a:'The Clash',t:'Rock the Casbah'},{a:'XTC',t:'Senses Working Overtime'},
    {a:'Gang of Four',t:'Damaged Goods'},{a:'Wire',t:'Three Girl Rhumba'},
    {a:'Elvis Costello',t:'Pump It Up'},{a:'The B-52s',t:'Rock Lobster'},
    {a:'Talking Heads',t:'Once in a Lifetime'},{a:'Gary Numan',t:'Cars'},
  ]},
  { id: 'afrobeats',label: 'Afrobeats',        emoji: '🌍', tracks: [
    {a:'Burna Boy',t:'Ye'},{a:'Wizkid',t:'Essence'},
    {a:'Davido',t:'Fall'},{a:'Tiwa Savage',t:'All Over'},
    {a:'Mr Eazi',t:'Leg Over'},{a:'Yemi Alade',t:'Johnny'},
    {a:'Afroboyz',t:'My Woman'},{a:'Burna Boy',t:'Last Last'},
    {a:'Wizkid',t:"Fever"},{a:'Rema',t:'Calm Down'},
    {a:'Tems',t:'Free Mind'},{a:'Ayra Starr',t:'Rush'},
    {a:'Asake',t:'Joha'},{a:'Davido',t:'Stand Strong'},
    {a:'CKay',t:'Love Nwantiti'},{a:'Fireboy DML',t:'Peru'},
    {a:'Omah Lay',t:'Understand'},{a:'Oxlade',t:'KU LO SA'},
  ]},
  { id: 'indie',    label: 'Indie Folk',       emoji: '🌿', tracks: [
    {a:'Bon Iver',t:'Skinny Love'},{a:'Fleet Foxes',t:'White Winter Hymnal'},
    {a:'Iron & Wine',t:"The Trapeze Swinger"},{a:'The Shins',t:'New Slang'},
    {a:'Sufjan Stevens',t:'Chicago'},{a:'Arcade Fire',t:'Wake Up'},
    {a:'Mumford & Sons',t:'The Cave'},{a:'The Lumineers',t:'Ho Hey'},
    {a:'Of Monsters and Men',t:'Little Talks'},{a:'Daughter',t:'Youth'},
    {a:'Neutral Milk Hotel',t:'In the Aeroplane over the Sea'},
    {a:'Bright Eyes',t:'Lua'},{a:'Elliott Smith',t:'Between the Bars'},
    {a:'Nick Drake',t:'Pink Moon'},{a:'Laura Marling',t:'Rambling Man'},
    {a:'Jose Gonzalez',t:'Heartbeats'},{a:'Beirut',t:'Nantes'},
    {a:'Devendra Banhart',t:'Seahorse'},
  ]},
  { id: 'bollywood',label: 'Bollywood',        emoji: '🎭', tracks: [
    {a:'Arijit Singh',t:'Tum Hi Ho'},{a:'Shreya Ghoshal',t:'Teri Meri'},
    {a:'Udit Narayan',t:'Pehla Nasha'},{a:'Kumar Sanu',t:'Ek Ladki Ko Dekha'},
    {a:'Lata Mangeshkar',t:'Lag Ja Gale'},{a:'Mohammad Rafi',t:'Dum Maro Dum'},
    {a:'Kishore Kumar',t:'Mere Mehboob Qayamat Hogi'},
    {a:'Arijit Singh',t:'Ae Dil Hai Mushkil'},{a:'Sonu Nigam',t:'Kal Ho Naa Ho'},
    {a:'Sunidhi Chauhan',t:'Dhoom Machale'},{a:'Vishal-Shekhar',t:'Desi Girl'},
    {a:'A.R. Rahman',t:'Jai Ho'},{a:'A.R. Rahman',t:'Chaiyya Chaiyya'},
    {a:'Usha Uthup',t:'Darling'},{a:'Shankar-Ehsaan-Loy',t:"Rock On"},
    {a:'Pritam',t:'Tumse Hi'},{a:'Amit Trivedi',t:'Emotional Atyachar'},
  ]},
  { id: 'bossa',    label: 'Bossa Nova',       emoji: '🌴', tracks: [
    {a:'João Gilberto',t:'The Girl from Ipanema'},{a:'Astrud Gilberto',t:'Corcovado'},
    {a:'Antônio Carlos Jobim',t:'Desafinado'},
    {a:'Stan Getz',t:'Samba de Uma Nota Só'},
    {a:'Antônio Carlos Jobim',t:'Água de Beber'},
    {a:'João Gilberto',t:'Chega de Saudade'},{a:'Elis Regina',t:'Águas de Março'},
    {a:'Caetano Veloso',t:'Cucurrucucú Paloma'},
    {a:'Gilberto Gil',t:'Aquele Abraço'},{a:'Milton Nascimento',t:'Travessia'},
    {a:'Gal Costa',t:'Baby'},{a:'Chico Buarque',t:'Construção'},
    {a:'Nara Leão',t:'Garota de Ipanema'},
    {a:'Vinicius de Moraes',t:'La Belle et le Bad Boy'},
    {a:'Joyce Moreno',t:'Feminina'},{a:'Roberto Menescal',t:'O Barquinho'},
  ]},
  { id: 'punk',     label: 'Punk Rock',        emoji: '⚡', tracks: [
    {a:'The Clash',t:'London Calling'},{a:'Sex Pistols',t:'Anarchy in the U.K.'},
    {a:'The Ramones',t:'Blitzkrieg Bop'},{a:'Bad Religion',t:'21st Century Digital Boy'},
    {a:'NOFX',t:'The Decline'},{a:'Pennywise',t:'Bro Hymn'},
    {a:'The Offspring',t:'Come Out and Play'},{a:'Green Day',t:'Basket Case'},
    {a:'Rancid',t:'Time Bomb'},{a:'Dead Kennedys',t:'Holiday in Cambodia'},
    {a:'Buzzcocks',t:'Ever Fallen in Love'},{a:'Wire',t:'12XU'},
    {a:'Black Flag',t:'Rise Above'},{a:'Descendents',t:'Milo Goes to College'},
    {a:'Social Distortion',t:'Story of My Life'},{a:'Lagwagon',t:'May 16'},
    {a:'The Misfits',t:'Halloween'},{a:'Stiff Little Fingers',t:'Alternative Ulster'},
  ]},
  { id: 'rnb2000s', label: '2000s R&B',        emoji: '💎', tracks: [
    {a:'Usher',t:'Yeah!'},{a:'Beyoncé',t:'Crazy in Love'},
    {a:'Alicia Keys',t:"Fallin'"},{a:'Rihanna',t:'Umbrella'},
    {a:'Ne-Yo',t:'So Sick'},{a:'Chris Brown',t:'With You'},
    {a:'Mary J. Blige',t:'Be Without You'},{a:'Ciara',t:'Goodies'},
    {a:'Omarion',t:'Ice Box'},{a:'Mario',t:'Let Me Love You'},
    {a:'Bow Wow',t:'Bounce With Me'},{a:'Nelly',t:"Dilemma"},
    {a:'Ashanti',t:'Always on Time'},{a:'Ja Rule',t:"Put It on Me"},
    {a:'Amerie',t:'1 Thing'},{a:'Keyshia Cole',t:'Love'},
    {a:'Tank',t:'Maybe I Deserve'},{a:'Trey Songz',t:'Say Aah'},
  ]},
  { id: 'hiphop2000s',label:'2000s Hip-Hop',   emoji: '🔥', tracks: [
    {a:'Eminem',t:'Lose Yourself'},{a:'Jay-Z',t:'99 Problems'},
    {a:'Kanye West',t:'Gold Digger'},{a:'50 Cent',t:'In da Club'},
    {a:'Outkast',t:'Hey Ya!'},{a:'Missy Elliott',t:'Work It'},
    {a:'Lil Wayne',t:'Lollipop'},{a:'T.I.',t:'Whatever You Like'},
    {a:'Nelly',t:'Hot in Herre'},{a:'Ludacris',t:'Roll Out'},
    {a:'The Game',t:'How We Do'},{a:'Young Jeezy',t:'Soul Survivor'},
    {a:'Plies',t:'Shawty'},{a:'Fabolous',t:'Breathe'},
    {a:'Lloyd Banks',t:'On Fire'},{a:'Jadakiss',t:'Why'},
    {a:'DMX',t:'Where the Hood At'},{a:'Busta Rhymes',t:"Pass the Courvoisier"},
  ]},
  { id: 'current',  label: 'Current Hits',     emoji: '📱', tracks: [
    {a:'Sabrina Carpenter',t:'Espresso'},{a:'Chappell Roan',t:'Good Luck, Babe!'},
    {a:'Kendrick Lamar',t:'Not Like Us'},{a:'Billie Eilish',t:'Birds of a Feather'},
    {a:'Sabrina Carpenter',t:'Please Please Please'},{a:'Charli XCX',t:'360'},
    {a:'Taylor Swift',t:'Fortnight'},{a:'Ariana Grande',t:'we can\'t be friends'},
    {a:'Post Malone',t:'I Had Some Help'},{a:'Morgan Wallen',t:'Last Night'},
    {a:'SZA',t:'Kill Bill'},{a:'Doja Cat',t:'Paint The Town Red'},
    {a:'Olivia Rodrigo',t:'vampire'},{a:'The Weeknd',t:'Creepin\''},
    {a:'Harry Styles',t:'As It Was'},{a:'Bad Bunny',t:'Un Verano Sin Ti'},
    {a:'Ice Spice',t:'Princess Diana'},{a:'PinkPantheress',t:'Boy\'s a liar Pt. 2'},
  ]},
  { id: 'neosoul',  label: 'Neo-Soul',         emoji: '🕊️', tracks: [
    {a:'Erykah Badu',t:'On & On'},{a:"D'Angelo",t:'Brown Sugar'},
    {a:'Lauryn Hill',t:'Ex-Factor'},{a:'Maxwell',t:'Ascension (Don\'t Ever Wonder)'},
    {a:'India.Arie',t:'Video'},{a:'Musiq Soulchild',t:'Just Friends (Sunny)'},
    {a:'Jill Scott',t:'A Long Walk'},{a:'John Legend',t:'Ordinary People'},
    {a:"Alicia Keys",t:"Fallin'"},{a:'Frank Ocean',t:'Thinkin Bout You'},
    {a:'Amy Winehouse',t:'Back to Black'},{a:'H.E.R.',t:'Focus'},
    {a:'SZA',t:'The Weekend'},{a:'Daniel Caesar',t:'Get You'},
    {a:'Jhené Aiko',t:'The Worst'},{a:'Childish Gambino',t:'Redbone'},
    {a:'Leon Bridges',t:'Coming Home'},{a:'Lianne La Havas',t:'Unstoppable'},
  ]},
  { id: 'funk',     label: 'Funk',             emoji: '🎺', tracks: [
    {a:'James Brown',t:'Get Up (I Feel Like Being a) Sex Machine'},
    {a:"Sly & The Family Stone",t:'Higher'},
    {a:'Parliament',t:'Give Up the Funk'},{a:'George Clinton',t:'Atomic Dog'},
    {a:'Kool & The Gang',t:'Jungle Boogie'},{a:'Earth Wind & Fire',t:'September'},
    {a:'Chic',t:'Le Freak'},{a:'Rick James',t:'Super Freak'},
    {a:'Prince',t:'Kiss'},{a:'Cameo',t:'Word Up!'},
    {a:'Tower of Power',t:'What Is Hip?'},{a:'The Gap Band',t:'Outstanding'},
    {a:'Ohio Players',t:'Love Rollercoaster'},{a:'Bootsy Collins',t:'Bootzilla'},
    {a:'The Meters',t:'Cissy Strut'},{a:'Stevie Wonder',t:'Higher Ground'},
    {a:'Michael Jackson',t:"Don't Stop 'Til You Get Enough"},
    {a:'Bruno Mars',t:'Uptown Funk'},
  ]},
  { id: 'blues',    label: 'Blues',            emoji: '🎸', tracks: [
    {a:'B.B. King',t:'The Thrill Is Gone'},{a:'Muddy Waters',t:'Hoochie Coochie Man'},
    {a:'John Lee Hooker',t:'Boom Boom'},{a:"Howlin' Wolf",t:'Smokestack Lightning'},
    {a:'Stevie Ray Vaughan',t:'Pride and Joy'},{a:'Eric Clapton',t:'Lay Down Sally'},
    {a:'Buddy Guy',t:"Damn Right, I've Got the Blues"},
    {a:'Gary Moore',t:'Still Got the Blues'},{a:'Etta James',t:"I'd Rather Go Blind"},
    {a:'Koko Taylor',t:'Wang Dang Doodle'},{a:'Albert King',t:'Born Under a Bad Sign'},
    {a:'The Blues Brothers',t:'Soul Man'},{a:'Joe Cocker',t:'With a Little Help from My Friends'},
    {a:'Johnny Winter',t:'Still Alive and Well'},
    {a:'Joe Bonamassa',t:'Sloe Gin'},{a:'Robert Cray',t:'Smoking Gun'},
    {a:'Taj Mahal',t:"Fishin' Blues"},{a:'Keb Mo',t:'Am I Wrong'},
  ]},
  { id: 'musicals', label: 'Musicals',         emoji: '🎭', tracks: [
    {a:'Original Broadway Cast',t:'My Shot'},{a:'Les Misérables Original Cast',t:'I Dreamed a Dream'},
    {a:'Wicked Original Cast',t:'Defying Gravity'},{a:'Grease Original Soundtrack',t:'Summer Nights'},
    {a:'Mamma Mia Original Cast',t:'Dancing Queen'},
    {a:'Phantom of the Opera Original Cast',t:'The Music of the Night'},
    {a:'Chicago Original Cast',t:'All That Jazz'},{a:'Rent Original Cast',t:'Seasons of Love'},
    {a:'West Side Story Original Soundtrack',t:'America'},
    {a:'Hairspray Original Cast',t:'Good Morning Baltimore'},
    {a:'A Chorus Line Original Cast',t:'What I Did for Love'},
    {a:'The Greatest Showman',t:'This Is Me'},
    {a:'La La Land Soundtrack',t:'City of Stars'},
    {a:'Dear Evan Hansen Original Cast',t:'You Will Be Found'},
    {a:'Into the Woods Original Cast',t:'Children Will Listen'},
    {a:'Frozen Original Broadway Cast',t:'Let It Go'},
    {a:'Moulin Rouge Broadway Cast',t:'Come What May'},
    {a:'Cabaret Original Cast',t:'Cabaret'},
  ]},
  { id: 'tvthemes_classic',label:'Classic TV Themes',emoji:'📺', artistLabel:'Show', tracks: [
    {a:'Neal Hefti',t:'Batman Theme'},{a:'Sherwood Schwartz',t:"Gilligan's Island Theme"},
    {a:'Vic Mizzy',t:'Get Smart Theme'},{a:'Earle Hagen',t:'The Andy Griffith Show Theme'},
    {a:'Vic Mizzy',t:'The Addams Family Theme'},{a:'George Tipton',t:'The Munsters Theme'},
    {a:'Lalo Schifrin',t:'Mission Impossible Theme'},{a:'Henry Mancini',t:'Peter Gunn Theme'},
    {a:'Mike Post',t:'Hill Street Blues Theme'},{a:'Mike Post',t:'Magnum P.I. Theme'},
    {a:'Jan Hammer',t:'Miami Vice Theme'},{a:'Bob James',t:'Taxi Theme (Angela)'},
    {a:'Sonny Curtis',t:'Love Is All Around (Mary Tyler Moore Theme)'},
    {a:'Andrew Gold',t:'Thank You for Being a Friend'},
    {a:'John Williams',t:"Where Everybody Knows Your Name (Cheers Theme)"},
    {a:'Mike Post',t:'The A-Team Theme'},{a:'Stu Phillips',t:'Knight Rider Theme'},
    {a:'John Barry',t:'The Persuaders Theme'},
  ]},
  { id: 'tvthemes_modern',label:'Modern TV Themes',emoji:'🖥️', artistLabel:'Show', tracks: [
    {a:'The Rembrandts',t:"I'll Be There for You (Friends Theme)"},
    {a:'Mark Snow',t:'The X-Files Theme'},
    {a:'Angelo Badalamenti',t:'Twin Peaks Theme'},
    {a:'Jonathan Wolff',t:'Seinfeld Theme'},
    {a:'Danny Elfman',t:'The Simpsons Theme'},
    {a:'DJ Jazzy Jeff & Fresh Prince',t:'The Fresh Prince of Bel-Air Theme'},
    {a:'Ramin Djawadi',t:'Game of Thrones Theme'},
    {a:'Ramin Djawadi',t:'Westworld Theme'},
    {a:'Jeff Russo',t:'Fargo Theme'},
    {a:"W.G. Snuffy Walden",t:'The West Wing Theme'},
    {a:'Alan Silvestri',t:'ER Theme'},
    {a:'Bear McCreary',t:'Battlestar Galactica Theme'},
    {a:'Ludwig Göransson',t:'The Mandalorian Theme'},
    {a:'Christophe Beck',t:'WandaVision Theme'},
    {a:'Nathan Barr',t:'True Blood Theme'},
    {a:'Danny Elfman',t:'Desperate Housewives Theme'},
    {a:'Blake Neely',t:'Arrow Theme'},
    {a:'Angelo Badalamenti',t:'Laura Palmer\'s Theme'},
  ]},
  { id: '70s',      label: '70s Hits',         emoji: '🕺', tracks: [
    {a:'ABBA',t:'Dancing Queen'},{a:'Fleetwood Mac',t:'Go Your Own Way'},
    {a:'Led Zeppelin',t:'Stairway to Heaven'},{a:'The Eagles',t:'Hotel California'},
    {a:'Queen',t:'Bohemian Rhapsody'},{a:'David Bowie',t:'Heroes'},
    {a:'Elton John',t:'Rocket Man'},{a:'Pink Floyd',t:'Wish You Were Here'},
    {a:'The Rolling Stones',t:'Angie'},{a:'Rod Stewart',t:'Maggie May'},
    {a:'Cat Stevens',t:'Wild World'},{a:'Donna Summer',t:'Hot Stuff'},
    {a:'The Bee Gees',t:"Stayin' Alive"},{a:'Gloria Gaynor',t:'I Will Survive'},
    {a:'Barry White',t:"Can't Get Enough of Your Love, Babe"},
    {a:'Marvin Gaye',t:"Let's Get It On"},{a:'Stevie Wonder',t:'Superstition'},
    {a:'Al Green',t:"Let's Stay Together"},
  ]},
  { id: 'workout',  label: 'Workout / Gym',    emoji: '💪', tracks: [
    {a:"AC/DC",t:'Thunderstruck'},{a:'Survivor',t:'Eye of the Tiger'},
    {a:'Eminem',t:'Till I Collapse'},{a:'Kanye West',t:'Stronger'},
    {a:'Daft Punk',t:'Harder Better Faster Stronger'},{a:'The Prodigy',t:'Firestarter'},
    {a:'Rage Against the Machine',t:'Killing in the Name'},
    {a:'Justice',t:'D.A.N.C.E.'},{a:'David Guetta',t:'Titanium'},
    {a:'Calvin Harris',t:'Feel So Close'},{a:'Martin Garrix',t:'Animals'},
    {a:'Skrillex',t:'Bangarang'},{a:'Avicii',t:'Levels'},
    {a:'Chemical Brothers',t:'Block Rockin\' Beats'},
    {a:'Nine Inch Nails',t:'Head Like a Hole'},{a:'Linkin Park',t:'Numb'},
    {a:'Metallica',t:'Enter Sandman'},{a:'Queen',t:"Don't Stop Me Now"},
  ]},
  { id: 'lofi',     label: 'Lo-fi / Chill',    emoji: '☕', tracks: [
    {a:'Nujabes',t:'Feather'},{a:'Nujabes',t:'Luv(sic) Part 3'},
    {a:'J Dilla',t:'So Far to Go'},{a:'Kaytranada',t:'Bus Ride'},
    {a:'BadBadNotGood',t:'Time Moves Slow'},{a:'Toro y Moi',t:'So Many Details'},
    {a:'Mac DeMarco',t:'Chamber of Reflection'},{a:'Tycho',t:'Awake'},
    {a:'Four Tet',t:'Locked'},{a:'Bonobo',t:'Kong'},
    {a:'Khruangbin',t:'Maria También'},{a:'Mild High Club',t:'Windowpane'},
    {a:'Men I Trust',t:'Show Me How'},
    {a:'Unknown Mortal Orchestra',t:'Multi-Love'},
    {a:'Rex Orange County',t:'Loving Is Easy'},{a:'Clairo',t:'Pretty Girl'},
    {a:'Still Woozy',t:'Goodie Bag'},{a:'Snail Mail',t:'Pristine'},
  ]},
  { id: 'random',   label: 'Random Mix',    emoji: '🎲', tracks: null, random: true },
];

/* ── Dynamic theme search terms (mirrors game.js) ───────── */
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

/* ── iTunes preview search (direct browser call — works cross-network) ─────── */
async function itunesSearch(q) {
  try {
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(q)}&entity=song&limit=3&country=us`;
    const res  = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    const hit  = data.results?.find(r => r.previewUrl) ?? null;
    if (!hit) return null;
    return {
      previewUrl: hit.previewUrl,
      cover:      (hit.artworkUrl100 || '').replace('100x100bb', '300x300bb'),
    };
  } catch { return null; }
}

async function enrichTracks(rawTracks) {
  const results = await Promise.all(rawTracks.map(({ a, t }) => itunesSearch(`${a} ${t}`)));
  return rawTracks.map((raw, i) => ({
    ...raw,
    previewUrl: results[i]?.previewUrl ?? null,
    cover:      results[i]?.cover ?? null,
  })).filter(tr => tr.previewUrl);
}

/* ── Dynamic iTunes track fetcher ───────────────────────────
   Same logic as game.js — picks 4 random terms, fetches iTunes
   limit=50 each, pools unique candidates, returns `count` tracks.
────────────────────────────────────────────────────────────── */
async function fetchThemeTracks(theme, count = 15) {
  const terms = THEME_SEARCH_TERMS[theme.id];
  if (!terms) return null;
  const picked = [...terms].sort(() => Math.random() - 0.5).slice(0, 4);
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
  return [...pool].sort(() => Math.random() - 0.5).slice(0, count).map(r => ({
    a: r.artistName,
    t: r.trackName,
    previewUrl: r.previewUrl,
    cover: (r.artworkUrl100 || '').replace('100x100bb', '300x300bb'),
  }));
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
  // SpeechRecognition is started automatically per-round via startMicAnswer().
  // No pre-permission needed; browser prompts on first rec.start().
}

/* ── Speech Recognition ──────────────────────────────────── */
let _recognition = null;
let _mpArtistFound = false;
let _mpTitleFound  = false;

function resetVoiceChips() {
  _mpArtistFound = false;
  _mpTitleFound  = false;
  const ac = document.getElementById('mp-artist-chip');
  const tc = document.getElementById('mp-title-chip');
  if (ac) { ac.textContent = '🎤 Artist'; ac.classList.remove('found'); }
  if (tc) { tc.textContent = '🎤 Title';  tc.classList.remove('found'); }
}

function updateVoiceChips() {
  const ac = document.getElementById('mp-artist-chip');
  const tc = document.getElementById('mp-title-chip');
  if (ac) { ac.textContent = _mpArtistFound ? '✅ Artist' : '🎤 Artist'; ac.classList.toggle('found', _mpArtistFound); }
  if (tc) { tc.textContent = _mpTitleFound  ? '✅ Title'  : '🎤 Title';  tc.classList.toggle('found', _mpTitleFound); }
}

function showMicCenter(show) {
  const mc      = document.getElementById('mp-mic-center');
  const num     = document.getElementById('mp-timer-num');
  const vc      = document.getElementById('mp-voice-chips');
  const answers = document.getElementById('mp-answer-area');
  if (mc)      mc.classList.toggle('hidden', !show);
  if (num)     num.style.display = show ? 'none' : '';
  if (vc)      vc.classList.toggle('hidden', !show);
  if (answers) answers.style.display = show ? 'none' : 'block';
}

function startMicAnswer() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const noSupport = document.getElementById('mp-mic-no-support');
  if (!SR) {
    if (noSupport) noSupport.style.display = 'block';
    return;
  }
  stopMicAnswer();
  if (mp.submitted) return;

  const rec = new SR();
  rec.lang            = 'en-US';
  rec.interimResults  = true;
  rec.continuous      = true;
  rec.maxAlternatives = 1;

  setMpMicState('listening');
  showMicCenter(true);
  // Hide the "type instead" link while mic is starting fresh
  const typeLink = document.getElementById('mp-type-instead');
  if (typeLink) typeLink.style.display = '';

  rec.onresult = (e) => {
    let interim = '', final = '';
    for (let i = e.resultIndex; i < e.results.length; i++) {
      const t = e.results[i][0].transcript;
      if (e.results[i].isFinal) final += t;
      else                      interim += t;
    }
    const heard = (final || interim).trim();
    if (heard) onMicSpeech(heard);
    if (final && _mpArtistFound && _mpTitleFound) {
      stopMicAnswer();
      autoSubmitAfterVoice();
    }
  };

  rec.onerror = (e) => {
    if (e.error === 'no-speech' || e.error === 'aborted') return;
    if (e.error === 'not-allowed') {
      stopMicAnswer();
      if (noSupport) { noSupport.textContent = '🚫 Allow mic in browser settings'; noSupport.style.display = 'block'; }
      return;
    }
    console.warn('STT error:', e.error);
  };

  rec.onend = () => {
    // Auto-restart unless submitted or stopped intentionally
    if (_recognition === rec && !mp.submitted) {
      try { rec.start(); } catch (_) {}
    }
  };

  _recognition = rec;
  try { rec.start(); } catch (e) { console.warn('STT start failed:', e); stopMicAnswer(); }
}

function stopMicAnswer() {
  const prev = _recognition;
  _recognition = null; // clear first so onend doesn't restart
  if (prev) {
    try { prev.stop(); } catch (_) {}
  }
  showMicCenter(false);
}

/* ── Mic circle state machine (mirrors setAIMicState in game.js) ─────── */
function setMpMicState(s) {
  const btn   = document.getElementById('mp-mic-center-btn');
  const label = document.getElementById('mp-mic-center-label');
  if (!btn) return;
  btn.classList.remove('listening', 'correct', 'wrong');
  if (s === 'listening') {
    btn.classList.add('listening');
    if (label) label.textContent = 'Listening…';
  } else if (s === 'correct') {
    btn.classList.add('correct');
    if (label) label.textContent = 'Got it! ✅';
  } else if (s === 'wrong') {
    btn.classList.add('wrong');
    if (label) label.textContent = 'Try again…';
    setTimeout(() => {
      if (_recognition && !mp.submitted) {
        setMpMicState('listening');
        const lbl = document.getElementById('mp-mic-center-label');
        if (lbl) {
          if (_mpArtistFound && !_mpTitleFound)  lbl.textContent = 'Now say the title! 🎵';
          else if (_mpTitleFound && !_mpArtistFound) lbl.textContent = 'Now say the artist! 🎤';
        }
      }
    }, 1200);
  } else {
    if (label) label.textContent = 'Listening…';
  }
}

/* ── Smart voice answer matching ─────────────────────────── */
// Uses the same fuzzy match as scoring — answers are checked against
// the actual track so the experience mirrors solo AI mode.
function onMicSpeech(transcript) {
  const track = mp.enrichedTracks[mp.round - 1]; // round is 1-based when playing
  if (!track || mp.submitted) return;

  const newArtistOk = !_mpArtistFound && answerOk(transcript, track.a);
  const newTitleOk  = !_mpTitleFound  && answerOk(transcript, track.t);

  if (!newArtistOk && !newTitleOk) {
    setMpMicState('wrong');
    return;
  }

  if (newArtistOk) {
    _mpArtistFound = true;
    document.getElementById('mp-artist-input').value = track.a;
  }
  if (newTitleOk) {
    _mpTitleFound = true;
    document.getElementById('mp-title-input').value = track.t;
  }

  updateVoiceChips();

  if (_mpArtistFound && _mpTitleFound) {
    setMpMicState('correct');
    stopMicAnswer();
    setTimeout(() => autoSubmitAfterVoice(), 700);
  } else {
    setMpMicState('listening');
    const lbl = document.getElementById('mp-mic-center-label');
    if (lbl) {
      lbl.textContent = _mpArtistFound ? 'Now say the title! 🎵' : 'Now say the artist! 🎤';
    }
  }
}

function autoSubmitAfterVoice() {
  if (mp.submitted) return;
  const artist = document.getElementById('mp-artist-input').value.trim();
  const title  = document.getElementById('mp-title-input').value.trim();
  if (artist || title) submitAnswer();
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

/* ── Room code generator ─────────────────────────────────── */
function genRoomCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 4; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
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
    // Dynamic iTunes fetch first — fresh random pool every game
    let enriched = await fetchThemeTracks(theme, 15);
    if (!enriched || enriched.length < 5) {
      // Fallback to hardcoded tracks
      let rawTracks = theme.tracks || [];
      if (theme.random || !rawTracks.length) {
        rawTracks = [];
        const pool = THEMES.filter(t => !t.random && t.tracks);
        pool.forEach(t => {
          const shuffled = [...t.tracks].sort(() => Math.random() - 0.5);
          rawTracks.push(...shuffled.slice(0, 2));
        });
        rawTracks = rawTracks.sort(() => Math.random() - 0.5).slice(0, 30);
      }
      const shuffled = [...rawTracks].sort(() => Math.random() - 0.5).slice(0, 25);
      enriched = await enrichTracks(shuffled);
    }
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
  resetVoiceChips();
  timerStart(startedAt);
  playPreview(previewUrl);
  renderLiveScores(mp.players.map(p => ({ ...p })), new Set());
  showPhase('phase-playing');
  startMicAnswer();
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
  resetVoiceChips();
  stopMicAnswer();
  timerStart(startedAt);
  playPreview(previewUrl);
  // Hide replay banner after 3s
  setTimeout(() => { if (replayBanner) replayBanner.style.display = 'none'; }, 3000);
  startMicAnswer();
}

function onAnswerResult({ forId, artistOk, titleOk, pts }) {
  if (forId !== mp.myId) return;
  mp.myResult  = { artistOk, titleOk, pts };
  mp.submitted = true;
  stopMicAnswer();
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
  if (myEntry && myEntry.score > 0) {
    fetch('/api/scores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name:  myName,
        score: myEntry.score,
        theme: mp.theme?.label || 'Multiplayer',
        combo: 0,
      }),
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

// Mic button — tap to manually re-start listening if needed
document.getElementById('mp-mic-center-btn')?.addEventListener('click', () => {
  if (_recognition) { stopMicAnswer(); return; }
  startMicAnswer();
});

// Leave button — also exposed as window.mpLeaveRoom for lobby phase button
function mpLeaveRoom() {
  stopMicAnswer();
  if (mp.channel) { try { mp.channel.unsubscribe(); } catch (_) {} }
  window.location.href = 'index.html';
}
window.mpLeaveRoom = mpLeaveRoom;

document.getElementById('mp-leave-btn')?.addEventListener('click', mpLeaveRoom);

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
