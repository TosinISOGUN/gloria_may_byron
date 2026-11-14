/**
 * English is the source of every message. Other languages live beside it as `<code>.ts`, with the same
 * keys (the test in src/test/i18n.test.ts fails on a missing or extra key). Words that never change
 * between languages (the artist's name, song titles, award names, platform names) are not here.
 *
 * Placeholders look like {name} and are filled by fmt() in src/i18n/format.ts.
 */
export const en = {
  chrome: {
    skip: "Skip to content",
    home: "{name}, home",
    theme: "Switch between light and dark theme",
    menu: {
      open: "Open menu",
      close: "Close menu",
      main: "Main",
      mobile: "Mobile",
      expand: "Show the {group} pages",
    },
    nav: {
      home: "Home",
      about: "About",
      story: "Her story",
      authenticity: "How the songs are made",
      music: "Music",
      announcements: "Announcements",
      gallery: "Gallery",
      awards: "Awards",
      contact: "Contact",
    },
    navHint: {
      story: "The voice, the vision and the journey",
      authenticity: "Studio recordings, a certificate and written confirmations",
      awards: "Recognition and honors",
      gallery: "Photos and moments",
    },
    footer: {
      pages: "Pages",
      listen: "Listen",
      follow: "Follow",
      copyright: "Copyright © {year} - {name}",
      logoAlt: "{name}, singer and songwriter",
      builtBy: "Website by {name}",
      builtByHelp: "For more information or website building services, contact {email}",
    },
    language: {
      label: "Language",
      title: "Choose a language",
      close: "Close the language list",
      current: "Current language: {name}",
    },
  },
  authenticity: {
    meta: {
      title: "Does Gloria Use AI to Produce Her Songs? | Gloria May Byron",
      description:
        "How Gloria May Byron's songs are made: recordings from the studio, a dated SongSecure certificate, and written confirmations from sound engineers that the songs are human-made.",
    },
    hero: {
      alt: "Gloria May Byron singing into a studio microphone",
      title: "Does Gloria use AI to produce her songs?",
      text: "No. Here is how the songs are made, and the proof.",
    },
    answer: {
      heading: "Made with care, by real people",
      lead: "Every song begins with lyrics Gloria writes herself. She then works with a team of sound engineers to build each one in a professional recording program, and recordings of that work are on this page for anyone to watch.",
      body: "A song takes a great deal of time and effort to make, and a few automated tools touch a release along the way: distributors offer a mastering service, and some cover art has been refined with image tools. This page explains each one, so the full picture is clear.",
      jumps: {
        studio: "Watch the studio sessions",
        certificate: "The certificate",
        platforms: "Written confirmations",
        coverArt: "About cover art",
        screening: "How songs are screened",
        tour: "About live tours",
      },
    },
    studio: {
      heading: "Straight from the studio",
      intro:
        "Screen recordings from a DAW (digital audio workstation), the recording program that Gloria's engineers use to build her songs. Each video is one song's project file while they work on it.",
      showAll: "Show all {count} sessions",
      showFewer: "Show fewer sessions",
      caption: "Studio project file",
      videoLabel: "Recording of the engineers working on {title}",
    },
    translations: {
      p1: "Gloria works with other singers, both local and from around the world, to record translated versions of some of her songs. The aim is simple: the songs reach more people, and listeners can hear them in the language of their hearts and feel the hope they carry.",
      p2: "Many listeners around the world have written to Gloria to say how much they appreciate hearing her songs in their own language, and how much they have gained from them. Each of these versions is another recording to arrange, sing, mix and finish.",
    },
    certificate: {
      heading: "Songs that are properly registered",
      lead: "Gloria makes sure her songs are properly registered. Services such as SongSecure record a digital fingerprint of the audio file together with the date it was uploaded, which gives the song a dated record of who made it.",
      intro:
        "The certificate below is one of many. It is for \"Every Love Story\": it names Gloria May Byron as its creator and gives May 6th, 2025 as the creation date. Its wording says:",
      alt: "SongSecure Certificate of Registration for Every Love Story, created by Gloria May Byron, creation date May 6th, 2025",
      caption: "One example: the SongSecure Certificate of Registration, shown whole.",
    },
    platforms: {
      heading: "Written confirmations",
      lead: "When Tidal and a few other streaming services began showing AI markers next to some of Gloria's releases, she asked the engineers and services involved what the markers meant. Their replies are below, with the words written out beside each picture.",
      written: "The words, written out",
      original: "Original wording (English)",
      translation: "Translation",
      tidalAlt:
        "Cropped email text beginning: On Tidal, please don't worry. Those white AI markers are not about your sound.",
      tidalCaption: "Reply about the labels shown on Tidal.",
      tidalSummary: "What this says: the label related to the cover image, not the recording.",
      engineerAlt:
        "Cropped email text about Tidal, Deezer and YouTube labels that relate to artwork rather than audio",
      engineerCaption: "From the message of the chief sound engineer.",
      signoffAlt:
        "Closing lines of the same email: Your work is excellent. Keep going. James, Chief Sound Engineer",
      signoffCaption: "The closing lines of the same message.",
    },
    screening: {
      heading: "How songs get screened",
      lead: "Gloria has been told by sound engineers that streaming platforms do not have a person listen to every song. Many use third-party software, such as ACRCloud, to screen releases automatically.",
      p1: "That kind of software is not perfect. The engineers told Gloria that it can make mistakes, and that it has even marked older songs written long before AI existed, including well-known hit songs. Because the check is automatic and not done by a person, a mistake can put a marker on a song that people made. This may be another reason why some platforms that once passed Gloria's songs as original have started to mark them.",
      p2: "A screening result does not describe how a song was made. The recordings, the registration certificate and the written confirmations on this page do.",
    },
    moreCertificates: {

      lead: "Two more certificates from the same service, for songs registered on different dates. Each names Gloria May Byron as its creator and carries its own certificate ID and digital fingerprint.",

      littleAlt: "SongSecure Certificate of Registration for Little Birds, original version, created by Gloria May Byron, creation date September 29th, 2026",

      littleCaption: "\"Little Birds\", original version, registered on September 29th, 2026.",

      arabicAlt: "SongSecure Certificate of Registration for Arabic Dreams Of Tomorrow, Arabic special edition, created by Gloria May Byron, creation date October 4th, 2026",

      arabicCaption: "\"Arabic Dreams Of Tomorrow\", Arabic special edition, registered on October 4th, 2026.",

    },

    credits: {

      heading: "Visual producers and web design",

      lead: "The people who work with Gloria on the studio, the visuals and this website.",

      webRole: "Web design and creation",

      studioRole: "Studio producer",

      visualRole: "Visual producer",

      webText: "A tech studio that designs and builds websites and web apps for startups, businesses and brands. It designed and built this website.",

      contactLead: "For a website of your own:",

    },

    mixea: {
      heading: "About mastering",
      body: "Gloria releases through DistroKid, which offers a mastering service called Mixea. It does not write, sing or compose anything. It is a final polish applied to a finished recording before it reaches the stores, and DistroKid describes it as using \"intelligent\" processing. That is a normal step between a studio and your speakers. The song itself is hers.",
      alt: "Cropped email text explaining that Mixea is DistroKid's online mastering service",
      caption: "DistroKid's explanation of Mixea.",
    },
    coverArt: {
      heading: "About the cover art",
      p1: "The cover images are a separate matter from the music. Some of the artwork for Gloria's releases has been refined with AI image tools. That affects the picture on the cover only, and, as the messages above explain, it is the likely reason a streaming service has sometimes shown a label on a release.",
      p2: "Gloria would rather say so openly than leave anyone wondering. Where the artwork is the only element involved, a label describes the picture and says nothing about the song.",
      p3: "Each cover is chosen to carry the feeling of its song: a man weighed down by a hard season, a dancer reaching toward the sun, a girl looking out over the sea, a father and child walking side by side. The artwork gives a song its face. The music inside is its own work, made in the studio as shown above.",
      coverAlt: "Cover artwork for {title}",
    },
    tour: {
      heading: "Many people have asked about live tours",
      paragraphs: [
        "For many years Gloria advocated for victims of historical abuse, among them women and children of many nationalities. She became an award-winning author, wrote countless songs with full copyrights, and took part in published books of poetry and demo CDs. Along the way she found the confidence to write and produce for herself, not for anyone else.",
        "In December 2019, Gloria suffered numerous injuries to her spine and spinal cord at her workplace. They needed intensive, severe surgeries and left her with serious nerve damage, the kind of injury that changes a life physically. She spent the year before her operations mostly confined. In that time she wrote many heartfelt songs, full of deep feeling, that she has only begun to produce.",
        "Gloria has performed at many public venues and private events over the years, and appeared on live broadcasts out of Los Angeles. Today she is preparing to make guest appearances at concerts that other performing artists are planning, when she is invited. Long stretches of heavy, active travel are very hard on her body, so she has found other ways to reach new fans and stay close to the ones she already has.",
        "She loves to collaborate with other artists, in many languages, to bring the best possible vision to her songs. For Gloria it is all about the heart of a song and the real emotion in it, whether that is grief or joy. Every song carries its own message of truth, one that reaches people whatever their nation, language or life.",
        "Out of her own tragedies she reaches for others around the world. She writes with deep understanding, empathy and compassion for people living through trauma or trying times, and she writes words of encouragement she believes are true. Her songs remind us that we are all enduring the trials of these times, and that hope and joy are still worth keeping. She wants you not only to hear her music, but to feel it. Her hope is to spread hope.",
      ],
    },
    contact: {
      heading: "Questions about the songs?",
      lead: "If you want to know what a lyric means, or anything else about how a song came to be, Gloria is happy to hear from you.",
    },
    quotes: {
      tidal: [
        "On Tidal: please don't worry. Those white AI markers are not about your sound. Your files came back clean from DistroKid after they looked at all eighty, and that is the check that counts. What we are seeing more and more is Tidal flagging the artwork rather than the audio. If any of those songs use AI-generated cover images, that is almost certainly what triggered it. A photograph or artwork you made yourself clears it.",
      ],
      engineer: [
        "On Tidal itself, and Deezer and YouTube with it: what we are seeing this month is that all three have started flagging AI-generated artwork across the board, on everyone's releases, regardless of what is in the audio. A cover made with an AI image tool is now enough to put the label on a release on its own. So a flag on those platforms says nothing about your songs, and it is worth checking the artwork before assuming the sound is the cause. Your music videos appearing untagged points the same way.",
        "These platforms keep changing the rules, and each one changes them differently. You cannot babysit all of them, and you should not have to. My advice is to focus on one platform, the one that pays and where your listeners are […] DistroKid has already reviewed your files and passed them, and your songs are listed fine everywhere else. Let Tidal be Tidal.",
      ],
      signoff: "Your work is excellent. Keep going.",
      mixea: [
        "Hi there,",
        "To clarify things.",
        "Mixea is DistroKid’s online mastering service! You can use Mixea to add the final, polishing touch to your work before distributing it to stores.",
        "Mixea mirrors contemporary mastering techniques to provide a series of intelligent, fine tuned results that you can choose between to select the best sounding mastered result for your tracks.",
      ],
      certificate:
        "This transaction validates that Gloria May Byron uploaded \"Every Love Story\" with the file Every Love Story - Pop Verision - zaragurl-6C603-Ver 1-1.wav with the digital fingerprint 573e9d6d2339c8ddbed499ad7d1943354099f89adb6fefe7bdc9f5fff32b2dcd to SongSecure.com, proving their possession of this file on May 6th, 2025.",
    },
  },
  common: {
    listenSpotify: "Listen on Spotify",
    listenTidal: "Listen on Tidal",
    listenDeezer: "Listen on Deezer",
    listenSoundclick: "Listen on SoundClick",
    listenAmazon: "Listen on Amazon Music",
    watchYoutube: "Watch on YouTube",
    readStory: "Read her story",
    readBio: "Read the full bio",
    allAnnouncements: "All announcements",
    followInstagram: "Follow on Instagram",
    viewAllMusic: "View all music",
    viewAllVideos: "View all videos",
    viewMoreAchievements: "View more achievements",
    viewMoreAwards: "View more awards",
    viewFullGallery: "View the full gallery",
    getInTouch: "Get in touch",
    openOn: "Open {title} on {platform}",
    playVideo: "Play {title}",
    lyricVideo: "Lyric video",
    arabicLyricVideo: "Arabic lyric video",
    platformLabel: "{name}: Gloria May Byron",
    scrollPrevious: "Previous: {label}",
    scrollNext: "Next: {label}",
    viewer: {
      label: "Image viewer",
      close: "Close image viewer",
      previous: "Previous image",
      next: "Next image",
    },
  },
  brand: {
    motto: "Where words fail, music speaks.",
    values: ["Love", "Hope", "Peace", "Truth", "Encouragement", "Unity"],
    valuesLabel: "Her values",
    description:
      "Gloria May Byron is an award-winning singer and songwriter whose emotionally driven, story-focused music has reached listeners in over 200 countries.",
  },
  home: {
    meta: { title: "Gloria May Byron | Award-Winning Singer & Songwriter" },
    hero: {
      alt: "Gloria May Byron singing into a studio microphone in warm light",
      lead: "Award-winning singer and songwriter, heard in over 200 countries.",
    },
    about: {
      alt: "Gloria May Byron singing in headphones",
      heading: "Singer-songwriter crafting stories through sound.",
      paragraphs: [
        "Gloria May Byron is an award-winning singer and songwriter known for emotionally resonant music rooted in storytelling, authenticity, and artistic depth. Her work has reached listeners in over 200 countries and continues to earn international recognition for its originality and lyrical strength.",
        "Identifying as Ojibwe Indigenous of Garden River First Nation and based on the Atlantic side of Canada, Gloria's cultural heritage and lived experience play a meaningful role in shaping her sound. Influenced by a multigenerational musical lineage and a commitment to honest expression, her music prioritizes substance over trends and connection over spectacle.",
        "Her work reflects lived experience, cultural identity, and emotional honesty, blending storytelling with sound in a way that resonates beyond genre. Each release is part of an evolving body of work that values meaning, craft, and connection over trends.",
      ],
    },
    news: {
      eyebrow: "Latest news",
      title: "A message to our listeners: New releases and surprise dates",
      teaser:
        "New songs are reaching listeners worldwide, and surprise dates are on the way. Watch Gloria's message and follow along on Instagram.",
      videoLabel: "A message to my fans from Gloria May Byron, about 30 seconds",
    },
    music: { title: "Featured music", sub: "Discover melodies that move you." },
    videos: { title: "Featured videos", sub: "Watch the music come alive." },
    platforms: { title: "Platforms I am available on" },
    behind: {
      title: "Behind the music, behind the magic.",
      countriesLabel: "Over 200 countries",
      countries: "countries where her music is enjoyed.",
      items: [
        { title: "Authentic Sound", text: "Emotional pop rooted in storytelling and connection" },
        {
          title: "Award-Winning Artist",
          text: "Multiple international honors including Global Recognition Awards",
        },
        { title: "Global Reach", text: "Music enjoyed in over 200 countries" },
        { title: "Community First", text: "Fans are friends, and every listener matters" },
      ],
    },
    awards: {
      title: "Awards and global recognition",
      sub: "Recognized internationally for artistic excellence, songwriting, and global listener impact.",
      trophyAlt: "The InterContinental Music Awards trophy",
      crystalAlt: "The Global Recognition Awards crystal trophy",
      multiple: "Multiple",
      multipleText: "awards, from international organizations.",
    },
    gallery: { title: "Gallery", sub: "Frames of melody and moments." },
    press: { title: "As seen on", sub: "Official media recognition and industry features.", more: "And many more media outlets." },
    cta: {
      title: "Let's work together",
      text: "Whether it's a performance, collaboration, or creative project, let's create something meaningful.",
      alt: "Gloria May Byron in a brown coat on a headland above the ocean at dusk",
    },
  },
  about: {
    meta: {
      title: "About | Gloria May Byron",
      description:
        "The voice, the vision, and the story behind the music. Gloria May Byron is an award-recognized independent artist, Ojibwe Indigenous of Garden River First Nation, based on the Atlantic side of Canada.",
    },
    hero: {
      alt: "Gloria May Byron standing in a softly lit room, wearing black",
      title: "About {name}",
      text: "Singer, songwriter, performer.",
    },
    me: {
      heading: "The voice, the vision, and the story behind the music.",
      paragraphs: [
        "Gloria May Byron is an award-recognized independent artist known for emotionally driven, story-focused music that prioritizes authenticity over image. Her work moves beyond genre, centering on meaning, lived experience, and artistic integrity.",
        "She identifies as Ojibwe Indigenous from Garden River First Nation and resides on the Atlantic side of Canada. Her cultural roots strongly influence her creative voice and the themes explored in her music.",
        "Music runs in her family. Gloria's grandmother was a professional opera singer in Europe, and her mother was a singer, though she never pursued music publicly. These influences shaped Gloria's early connection to artistic expression.",
        "She lives with her dogs and her son, Joshua, who is also an artist. Joshua has collaborated with Gloria on multiple works, including the co-written song “Where Silence Sings.”",
        "Gloria has received global recognition for her work and holds certification badges and award crests from organizations such as Global Recognition, Global Music, and InterContinental. These honors acknowledge her achievements and distinguish her within the industry.",
        "Her focus remains on evolving, current releases that reflect her present artistic direction. Gloria May Byron creates as an artist first, guided by substance, emotion, and intention.",
      ],
    },
    portraitDuneAlt: "Gloria May Byron in a cream sweater on a sandy dune at golden hour",
    portraitTruckAlt: "Gloria May Byron leaning out of a teal vintage truck",
    biography: {
      heading: "Global recognition and professional biography",
      sub: "A formally recognized artist with international reach and industry acknowledgment.",
      awardsPhrase: "Global Recognition Awards",
      paragraphs: [
        "Gloria May Byron is an award-winning singer and songwriter whose work has achieved international recognition for artistic excellence, songwriting depth, and listener impact. Her music reaches audiences in over 200 countries worldwide, reflecting a rare ability to connect emotionally across cultures, languages, and personal experiences.",
        "Recognized by respected international awarding bodies, Gloria's artistry has been acknowledged through honors such as the Global Recognition Awards, Global Music Awards, and InterContinental Music Awards. These distinctions celebrate not only technical and creative excellence, but also the authenticity, emotional resonance, and originality that define her musical identity.",
        "Gloria's work has been recognized across multiple categories including songwriting, lyricism, pop and soft pop genres, Christian pop, breakout artistry, and listener impact. These acknowledgments highlight a body of work that balances artistic integrity with meaningful audience connection, positioning her as a distinctive voice within today's global music landscape.",
        "Her recognition reflects a consistent commitment to quality, storytelling, and emotional honesty. Rather than following trends, Gloria's music stands out through sincerity and depth, earning respect from industry professionals and listeners alike.",
      ],
    },
    journey: {
      heading: "Musical journey",
      sub: "From first notes to global listeners.",
      steps: [
        {
          stage: "Early Years",
          title: "Musical Roots",
          text: "Raised in a family of musicians, Gloria developed a deep connection to music from a young age, learning by ear before formal training.",
        },
        {
          stage: "Independent Releases",
          title: "Finding Her Voice",
          text: "Gloria begins sharing original music publicly, shaping her artistic identity and sound.",
        },
        {
          stage: "Global Reach",
          title: "Building a Worldwide Audience",
          text: "Her music connects with listeners across continents, growing a dedicated international following.",
        },
        {
          stage: "International Recognition",
          title: "Award-Winning Work",
          text: "Her songwriting and artistry receive global recognition through multiple international music awards.",
          linkPhrase: "multiple international music awards",
        },
        {
          stage: "The Road to 2026",
          title: "The Next Chapter",
          text: "With new music and collaborations ahead, Gloria and her team look forward to an ambitious and exciting year.",
        },
      ],
    },
    style: {
      alt: "Close portrait of Gloria May Byron with her eyes closed",
      heading: "Style and influences",
      sub: "Inspired by emotion, shaped by experience.",
      paragraphs: [
        "Gloria May Byron's sound is best described as emotional pop with depth and purpose. Her music blends elements of pop, soft pop, and Christian pop, carried by expressive vocals, layered harmonies, and lyrics that speak directly to the listener.",
        "Influenced by a lifelong immersion in music and storytelling, Gloria's songs focus on themes of hope, resilience, faith, love, and personal growth. Her ability to write from lived experience gives her music an intimate quality, one that feels both personal and universally relatable.",
        "Whether performing a stripped-down acoustic piece or a fully produced pop track, Gloria's focus remains the same: authenticity, emotional impact, and meaningful connection.",
      ],
    },
    inspiration: {
      paragraphs: [
        "Gloria is one of Jehovah's Witnesses, and her faith is where much of her songwriting begins. She makes time for personal research of the Bible, which she holds to be God's inspired word, and she has brought truths she found there directly into her songs.",
        "She spends much of her time sharing these truths with friends and neighbors. Through her music she hopes to carry the same message of hope to people far and wide.",
      ],
    },
    explore: {
      title: "Explore my work",
      text: "A collection of songs shaped by emotion, honesty, and connection.",
    },
    portraitsLabel: "Portraits",
  },
  music: {
    madeNote: "Wondering how these songs are made?",
    meta: {
      title: "Music | Gloria May Byron",
      description:
        "Listen to the latest releases and collaborations from Gloria May Byron: featured singles, lyrical videos and every major streaming platform.",
    },
    hero: {
      alt: "Gloria May Byron in a long pale dress singing by candlelight beside a pianist",
      title: "Music by Gloria May Byron",
      text: "Listen to my latest releases and collaborations.",
    },
    featured: { title: "Featured singles", sub: "Selected tracks that define the sound." },
    singles: { title: "Singles", sub: "Original releases, one story at a time." },
    streaming: {
      title: "Featured music",
      sub: "Explore music by Gloria May Byron across major streaming platforms.",
      more: "Want to hear more music?",
      spotifyTitle: "Spotify: This Is Gloria May Byron",
      spotifyHeading: "This Is Gloria May Byron",
      loadSpotify: "Load the Spotify player",
    },
    lyrical: { title: "Lyrical videos", sub: "Where words and melody come together.", more: "More on VEVO & YouTube" },
    available: { title: "Available on", sub: "Listen across all major streaming platforms." },
    more: { title: "Want more?", text: "Discover more music & visuals." },
  },
  announcements: {
    authenticityNews: { title: "How Gloria's songs are made", text: "Gloria has added a page that shows how her songs are made, with recordings from the studio, a registration certificate and written confirmations from sound engineers." },
    meta: {
      title: "Announcements | Gloria May Byron",
      description:
        "News from Gloria May Byron: a new video message to fans about her new releases and surprise dates, her Formula Indie New Entry debut and a message about 2026.",
    },
    hero: {
      alt: "Gloria May Byron in a grey fur coat dancing with friends in falling snow",
      title: "News and announcements",
      text: "Updates, releases and special features from Gloria May Byron.",
    },
    fanMessage: {
      title: "A message to our listeners: New releases and surprise dates",
      text: [
        "Her latest songs are now reaching listeners worldwide, in several languages, and Gloria wants to thank everyone who has tuned in.",
        "It has been a hard year for many, so she closes with a note of warmth: be kind to one another, look after yourselves, and hold on to hope and to who you are.",
        "More is on the way. Surprise dates are being lined up, and Instagram is where each announcement will land first.",
      ],
    },
    formulaIndie: {
      title: "Formula Indie Debut: 19 February 2026",
      text: "Gloria May Byron will debut on Formula Indie New Entry, presented by the European Indie Music Network.",
      flyerAlt:
        "Flyer for Formula Indie New Entry from the European Indie Music Network. Debut day 19 February 2026: Gloria May Byron, Shadows Over Eden, Where did all the mercy go. www.euroindiemusic.info",
    },
    message: {
      title: "Gloria's Intro for 2026: “A Message to my Fans”",
      text: "In this personal message, Gloria shares her vision for 2026 and what fans can expect in the coming year.",
    },
    footer: "Stay tuned for more announcements and upcoming releases.",
    explore: { title: "Explore my work", text: "Discover more music & visuals." },
  },
  gallery: {
    meta: {
      title: "Gallery | Gloria May Byron",
      description:
        "Moments from performances, studio sessions and events: photographs of Gloria May Byron and the artwork for every release.",
    },
    hero: {
      alt: "Gloria May Byron singing with three other vocalists on a lawn under string lights",
      title: "Photo gallery",
      text: "Moments from performances, studio sessions, and events.",
    },
    photos: {
      title: "Photos",
      sub: "A photo gallery featuring Gloria May Byron across live performances and award moments.",
      openPhoto: "Open photo: {alt}",
      alts: [
        "Gloria May Byron with the Global Recognition Awards seal",
        "Gloria May Byron singing with two other vocalists and a male singer",
        "Close portrait of Gloria May Byron with her eyes closed",
        "Gloria May Byron in a pale dress holding a candle beside a piano",
        "Gloria May Byron at a studio microphone in warm light",
        "Gloria May Byron in a white off-shoulder top, long honey hair",
        "Gloria May Byron leaning out of a teal vintage truck",
        "Gloria May Byron with her hair in curlers",
        "Gloria May Byron on a sandy dune at golden hour",
        "Gloria May Byron in a black dress",
        "Gloria May Byron in a brown coat by the ocean at dusk",
        "Gloria May Byron singing in headphones",
        "Gloria May Byron singing at a candlelit microphone",
        "Gloria May Byron with her band in the studio",
        "Gloria May Byron's band and singers around a piano",
        "Gloria May Byron at a studio microphone",
        "Gloria May Byron in a white sundress in a meadow",
        "Gloria May Byron with soft curls in warm light",
      ],
    },
    releases: {
      title: "Releases",
      sub: "Latest music releases",
      openRelease: "Open release artwork: {title}",
      artworkAlt: "Release artwork for {title}",
    },
    cta: {
      title: "Interested in working together?",
      text: "I'd love to hear about your vision and explore how we can bring it to life through music.",
    },
  },
  awards: {
    meta: {
      title: "Awards | Gloria May Byron",
      description:
        "Awards and achievements: Global Recognition Award, four Global Music Awards, two InterContinental Music Awards and a Who's Who in the World listing for Gloria May Byron.",
    },
    hero: {
      alt: "Black and white photograph of Gloria May Byron singing with her eyes closed at a microphone",
      title: "Awards and achievements",
      text: "Recognition, milestones, and notable moments.",
    },
    certs: {
      title: "Certifications and global recognitions",
      sub: "Recognitions earned across platforms and borders.",
      names: [
        "InterContinental Music Awards Winner",
        "Global Music Awards Winner",
        "Global Recognition Awards",
        "Global Music Awards Winner seal",
        "Global Music Awards medal",
      ],
    },
    list: {
      title: "Awards",
      sub: "Gloria May Byron's work has received international recognition, reflecting both artistic excellence and listener impact on a global scale.",
      items: [
        {
          label: "Global Recognition",
          title: "Global Recognition Award",
          text: "Honoring artistic achievement & global reach across the music industry.",
        },
        {
          label: "Breakout Artist",
          title: "Global Music Award: Breakout Artist",
          text: "Celebrating rapid growth & standout presence on the global music scene.",
        },
        {
          label: "Songwriting Excellence",
          title: "Global Music Award: Songwriting",
          text: "Awarded for strong lyrical storytelling & compositional excellence.",
        },
        {
          label: "Lyrical Excellence",
          title: "Global Music Award: Lyricist",
          text: "Recognizing depth, emotion & clarity in songwriting.",
        },
        {
          label: "Pop Music",
          title: "Global Music Award: Pop",
          text: "Honoring versatility & excellence across multiple pop genres.",
        },
        {
          label: "Best Pop Song",
          title: "InterContinental Best Pop: North America",
          text: "Recognized for outstanding pop excellence & international listener impact.",
        },
        {
          label: "Best Dance Song",
          title: "InterContinental Best Dance/Electronic: North America",
          text: "Recognized for originality and performance on the recording “Beautiful Mosaic”.",
        },
      ],
    },
    wall: {
      title: "The awards in pictures",
      sub: "Trophies, certificates and award moments.",
      open: "Open: {alt}",
      items: [
        {
          alt: "Gloria May Byron with the Global Recognition Awards seal behind her",
          title: "The Global Recognition Awards seal",
          note: "Gloria May Byron, 2025",
        },
        {
          alt: "The Global Recognition Awards 2025 winner crystal trophy",
          title: "The crystal trophy",
          note: "Global Recognition Awards, 2025 winner",
        },
        {
          alt: "Global Recognition Award 2025 certificate presented to Gloria May Byron",
          title: "The certificate",
          note: "Global Recognition Award, 2025",
        },
        {
          alt: "The InterContinental Music Awards trophy",
          title: "The trophy",
          note: "InterContinental Music Awards",
        },
        {
          alt: "InterContinental Music Awards certificate for the song Every Love Story, Best Song of North America in Pop, August 2025",
          title: "Every Love Story",
          note: "Best Song of North America in Pop, August 2025",
        },
        {
          alt: "Marquis Who's Who Publications Board certificate approving Gloria May Byron as a subject of biographical record in Who's Who in the World, 2026 to 2027",
          title: "Who's Who in the World",
          note: "Marquis Who's Who, 2026 to 2027",
        },
        {
          alt: "InterContinental Music Awards certificate for the song Beautiful Mosaic, Best Song of North America in Dance and Electronic, August 2026",
          title: "Beautiful Mosaic",
          note: "Best Song of North America in Dance/Electronic, August 2026",
        },
      ],
    },
    highlights: {
      title: "Notable highlights",
      sub: "Key moments that shaped the journey.",
      items: [
        "Music streamed and discovered in 200+ countries globally",
        "Award-winning singer, songwriter, and lyricist",
        "Recognized for both artistic excellence and listener impact",
        "Approved for a biographical record in Who’s Who in the World, 2026 to 2027",
        "Strong global fanbase built on personal connection and authenticity",
        "Active presence across major music platforms including Spotify, Apple Music, YouTube, Deezer, Tidal, and more",
        "Dedicated to continued growth, new releases, and global collaboration heading into 2026",
      ],
    },
    cta: { title: "Let's collaborate", text: "Bookings, performances, and media." },
  },
  contact: {
    meta: {
      title: "Contact | Gloria May Byron",
      description:
        "Contact Gloria May Byron for bookings and live performances, collaborations and creative projects, and media, interviews and press inquiries.",
    },
    hero: {
      title: "Contact",
      text: "For bookings, collaborations, and media inquiries.",
      alt: "Gloria May Byron smiling at a studio microphone",
    },
    touch: {
      title: "Get in touch",
      text: "Whether you're reaching out for bookings, collaborations, or media inquiries, I'd love to hear from you.",
      emailLabel: "Email",
      copy: "Copy email",
      copied: "Email copied",
      copiedStatus: "Email address copied to the clipboard",
    },
    reasons: {
      title: "What you can reach out about",
      text: "Collaborations, bookings, and creative conversations.",
      items: [
        "Bookings and live performances",
        "Collaborations and creative projects",
        "Media, interviews, and press inquiries",
      ],
    },
    follow: {
      title: "Follow and connect",
      text: "Stay close to the music and the moments.",
      platforms: "Music platforms",
      social: "Social media",
    },
    share: {
      title: "Pass the music on",
      text: "Choose a language and a card. Share it with a tap, or save the picture and post it anywhere. Each card has a link and a QR code that open this site in that language.",
      language: "Language",
      card: "Card",
      mottoCard: "Her motto",
      introCard: "Introduction",
      size: "Shape",
      feed: "Feed post",
      story: "Story",
      share: "Share",
      download: "Save picture",
      copy: "Copy caption",
      copied: "Caption copied",
      copiedStatus: "Caption copied to the clipboard",
      link: "Share on",
      hint: "On a computer, save the picture and attach it to your post.",
      appNote: "{app} can't take a post shared from a website. The caption is copied: save the picture, then post both in the {app} app.",
      pasteNote: "Picture copied. In the post box that opens, paste it (Ctrl+V, or Cmd+V on a Mac) to add the card.",
    },
    cta: {
      title: "I'm always open to meaningful collaborations and creative projects",
      text: "Let's create something meaningful and share it with the world.",
    },
  },
  errors: {
    notFound: {
      title: "That page isn't here.",
      text: "It may have moved. The music is still where you left it.",
      home: "Back home",
      music: "Browse the music",
    },
    routeError: {
      title: "This page didn't load.",
      text: "Something went wrong on our end. Try again, or head back home.",
      retry: "Try again",
      home: "Back home",
    },
  },
} as const;

type Widen<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? readonly Widen<U>[]
    : { [K in keyof T]: Widen<T[K]> };

/** The shape every language file must have. */
export type Messages = Widen<typeof en>;
