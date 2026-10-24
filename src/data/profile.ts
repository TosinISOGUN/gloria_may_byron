import type { ImageId } from "./images.generated";

export const GRA_URL =
  "https://globalrecognitionawards.org/winners/2025/gloria-may-byron-recognized-with-a-2025-global-recognition-award/";

/** Home page About block, verbatim from her site. */
export const homeAbout = {
  heading: "Singer-songwriter crafting stories through sound.",
  paragraphs: [
    "Gloria May Byron is an award-winning singer and songwriter known for emotionally resonant music rooted in storytelling, authenticity, and artistic depth. Her work has reached listeners in over 200 countries and continues to earn international recognition for its originality and lyrical strength.",
    "Identifying as Ojibwe Indigenous of Garden River First Nation and based on the Atlantic side of Canada, Gloria's cultural heritage and lived experience play a meaningful role in shaping her sound. Influenced by a multigenerational musical lineage and a commitment to honest expression, her music prioritizes substance over trends and connection over spectacle.",
    "Her work reflects lived experience, cultural identity, and emotional honesty, blending storytelling with sound in a way that resonates beyond genre. Each release is part of an evolving body of work that values meaning, craft, and connection over trends.",
  ],
} as const;

/** About page, verbatim from her site. */
export const aboutMe = {
  heading: "The voice, the vision, and the story behind the music.",
  paragraphs: [
    "Gloria May Byron is an award-recognized independent artist known for emotionally driven, story-focused music that prioritizes authenticity over image. Her work moves beyond genre, centering on meaning, lived experience, and artistic integrity.",
    "She identifies as Ojibwe Indigenous from Garden River First Nation and resides on the Atlantic side of Canada. Her cultural roots strongly influence her creative voice and the themes explored in her music.",
    "Music runs in her family. Gloria's grandmother was a professional opera singer in Europe, and her mother was a singer, though she never pursued music publicly. These influences shaped Gloria's early connection to artistic expression.",
    "She lives with her dogs and her son, Joshua, 22, who is also an artist. Joshua has collaborated with Gloria on multiple works, including the co-written song “Where Silence Sings.”",
    "Gloria has received global recognition for her work and holds certification badges and award crests from organizations such as Global Recognition, Global Music, and InterContinental. These honors acknowledge her achievements and distinguish her within the industry.",
    "Her focus remains on evolving, current releases that reflect her present artistic direction. Gloria May Byron creates as an artist first, guided by substance, emotion, and intention.",
  ],
} as const;

export const biography = {
  heading: "Global recognition and professional biography",
  sub: "A formally recognized artist with international reach and industry acknowledgment.",
  paragraphs: [
    "Gloria May Byron is an award-winning singer and songwriter whose work has achieved international recognition for artistic excellence, songwriting depth, and listener impact. Her music reaches audiences in over 200 countries worldwide, reflecting a rare ability to connect emotionally across cultures, languages, and personal experiences.",
    "Recognized by respected international awarding bodies, Gloria's artistry has been acknowledged through honors such as the Global Recognition Awards, Global Music Awards, and InterContinental Music Awards. These distinctions celebrate not only technical and creative excellence, but also the authenticity, emotional resonance, and originality that define her musical identity.",
    "Gloria's work has been recognized across multiple categories including songwriting, lyricism, pop and soft pop genres, Christian pop, breakout artistry, and listener impact. These acknowledgments highlight a body of work that balances artistic integrity with meaningful audience connection, positioning her as a distinctive voice within today's global music landscape.",
    "Her recognition reflects a consistent commitment to quality, storytelling, and emotional honesty. Rather than following trends, Gloria's music stands out through sincerity and depth, earning respect from industry professionals and listeners alike.",
  ],
} as const;

export const journey = {
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
      link: { label: "multiple international music awards", href: GRA_URL },
    },
    {
      stage: "The Road to 2026",
      title: "The Next Chapter",
      text: "With new music and collaborations ahead, Gloria and her team look forward to an ambitious and exciting year.",
    },
  ],
} as const;

export const style = {
  heading: "Style and influences",
  sub: "Inspired by emotion, shaped by experience.",
  paragraphs: [
    "Gloria May Byron's sound is best described as emotional pop with depth and purpose. Her music blends elements of pop, soft pop, and Christian pop, carried by expressive vocals, layered harmonies, and lyrics that speak directly to the listener.",
    "Influenced by a lifelong immersion in music and storytelling, Gloria's songs focus on themes of hope, resilience, faith, love, and personal growth. Her ability to write from lived experience gives her music an intimate quality, one that feels both personal and universally relatable.",
    "Whether performing a stripped-down acoustic piece or a fully produced pop track, Gloria's focus remains the same: authenticity, emotional impact, and meaningful connection.",
  ],
} as const;

export type Award = {
  label: string;
  title: string;
  text: string;
  badge: ImageId;
};

export const awards: Award[] = [
  {
    label: "Global Recognition",
    title: "Global Recognition Award",
    text: "Honoring artistic achievement & global reach across the music industry.",
    badge: "badgeGra",
  },
  {
    label: "Breakout Artist",
    title: "Global Music Award: Breakout Artist",
    text: "Celebrating rapid growth & standout presence on the global music scene.",
    badge: "badgeGmaWinner",
  },
  {
    label: "Songwriting Excellence",
    title: "Global Music Award: Songwriting",
    text: "Awarded for strong lyrical storytelling & compositional excellence.",
    badge: "badgeGmaGold",
  },
  {
    label: "Lyrical Excellence",
    title: "Global Music Award: Lyricist",
    text: "Recognizing depth, emotion & clarity in songwriting.",
    badge: "badgeGmaMedal",
  },
  {
    label: "Pop Music",
    title: "Global Music Award: Pop",
    text: "Honoring versatility & excellence across multiple pop genres.",
    badge: "badgeGmaWinner",
  },
  {
    label: "Best Pop Song",
    title: "InterContinental Best Pop: North America",
    text: "Recognized for outstanding pop excellence & international listener impact.",
    badge: "badgeIntercontinental",
  },
];

export const notableHighlights = [
  "Music streamed and discovered in 200+ countries globally",
  "Award-winning singer, songwriter, and lyricist",
  "Recognized for both artistic excellence and listener impact",
  "Strong global fanbase built on personal connection and authenticity",
  "Active presence across major music platforms including Spotify, Apple Music, YouTube, Deezer, Tidal, and more",
  "Dedicated to continued growth, new releases, and global collaboration heading into 2026",
] as const;

export const certifications: { name: string; badge: ImageId }[] = [
  { name: "InterContinental Music Awards Winner", badge: "badgeIntercontinental" },
  { name: "Global Music Awards Winner", badge: "badgeGmaWinner" },
  { name: "Global Recognition Awards", badge: "badgeGra" },
  { name: "Global Music Awards Winner seal", badge: "badgeGmaGold" },
  { name: "Global Music Awards medal", badge: "badgeGmaMedal" },
];

export const announcements = {
  heading: "News and announcements",
  sub: "Updates, releases and special features from Gloria May Byron.",
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
} as const;

/** Photographs from her gallery page, in her order (duplicates on her page removed). */
export type Photo = { id: ImageId; alt: string };

export const galleryPhotos: Photo[] = [
  { id: "awardGraBanner", alt: "Gloria May Byron with the Global Recognition Awards seal" },
  { id: "liveTrio", alt: "Gloria May Byron singing with two other vocalists and a male singer" },
  { id: "portraitEyes", alt: "Close portrait of Gloria May Byron with her eyes closed" },
  { id: "liveDress", alt: "Gloria May Byron in a pale dress holding a candle beside a piano" },
  { id: "portraitSpotify", alt: "Gloria May Byron at a studio microphone in warm light" },
  { id: "portraitWhite", alt: "Gloria May Byron in a white off-shoulder top, long honey hair" },
  { id: "portraitTruck", alt: "Gloria May Byron leaning out of a teal vintage truck" },
  { id: "portraitCurls", alt: "Gloria May Byron with her hair in curlers" },
  { id: "portraitDune", alt: "Gloria May Byron on a sandy dune at golden hour" },
  { id: "liveBlack", alt: "Gloria May Byron in a black dress" },
  { id: "portraitOcean", alt: "Gloria May Byron in a brown coat by the ocean at dusk" },
  { id: "headphones", alt: "Gloria May Byron singing in headphones" },
  { id: "studioWide", alt: "Gloria May Byron singing at a candlelit microphone" },
  { id: "groupSelfie", alt: "Gloria May Byron with her band in the studio" },
  { id: "groupStudio", alt: "Gloria May Byron's band and singers around a piano" },
  { id: "portraitMic", alt: "Gloria May Byron at a studio microphone" },
  { id: "portraitDress", alt: "Gloria May Byron in a white sundress in a meadow" },
  { id: "portraitCurlsTwo", alt: "Gloria May Byron with soft curls in warm light" },
];
