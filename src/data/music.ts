import type { ImageId } from "./images.generated";

const TIDAL_TRACK = "https://tidal.com/track/";

export type Video = {
  /** YouTube video id. */
  id: string;
  title: string;
  credit?: string;
  thumb: ImageId;
};

const v = (id: string, title: string, credit?: string): Video => ({
  id,
  title,
  thumb: `yt-${id}` as ImageId,
  ...(credit !== undefined && { credit }),
});

/** Every video embedded on her site, keyed by YouTube id. */
export const video = {
  boomBitty: v("0ORS_vwazIk", "Boom Bitty Boom BOOM!", "Lyric video"),
  turnItUp: v("G_t-TcDkTz8", "Turn It Up!", "ft. Gloria & The Friends"),
  creatures: v("cs-3gkYDxMk", "Creatures of Wild Wonders"),
  tiredBruised: v("GRITufOh4kc", "Tired & Bruised", "ft. JJ Jamal"),
  butterflies: v("cMiKiRhIcBs", "Butterflies Don't Jive With Snakes", "Lyric video"),
  searchingFlow: v("HwYH0sVpCec", "Searching The Flow", "Lyric video"),
  whichHand: v("uyA1cX4tt8I", "Which Hand Shall We Hold", "Arabic lyric video"),
  reflection: v("y4hHIo3dRgw", "Reflection", "Lyric video"),
  divineTreasure: v("58QEkdTSRnU", "Divine Treasure", "ft. Juan Ruiz"),
  listenArabic: v("7L_C1ZUrB_o", "Listen (Arabic Version)", "Lyric video"),
  creaturesLyric: v("pyxKM5-gkTg", "Creatures Of Wild Wonders", "Lyric video"),
  listen: v("UCGCeEHarKY", "Listen", "ft. Harry & The British Boys UK"),
  tickTock: v("wotDmyOj-UY", "Tick-Tock O'Clock", "ft. Glo & The Gang"),
  safeNFree: v("D_IT4EUDITc", "Safe N Free", "Lyric video"),
  timelessHearts: v("uScIhzN1alo", "Timeless Hearts", "ft. Harry Clarke, AnnaBella & Glo"),
  crimsonBreeze: v("n0FDpzSK1Qc", "Crimson Breeze", "ft. Harry Clarke, Annabella & Glo"),
  electricEscapade: v("J0ki-48CIB4", "Electric Escapade", "ft. AnnaBella Gwen & Glo"),
  snakeMirror: v("uJqTvvaq6DY", "Snake In The Mirror", "ft. Jessica Burton UK"),
  message2026: v("J_rWEOWZPDQ", "A Message to my Fans"),
  // Single-release videos her site uses as the artwork for its Tidal cards.
  heSeesYou: v("cSydHvdrUKY", "He Sees You ~Now!", "ft. Harry Clarke UK"),
  foreverFaithful: v("aVWjpiw14d8", "Forever Faithful", "Special Dance Beats Edition"),
  hindi: v(
    "XQWGNa3OC0U",
    "दिव्य खजाना (Special Hindi Version Divine Treasure)",
    "ft. Jhuwn-Aar India",
  ),
  chasingSun: v("Xo6E93EGpmc", "Chasing The Sun", "Lyric video"),
  shadowsEden: v("RFXVn7Ob4wE", "Shadows Over Eden", "Where did all the mercy go!"),
  punjabi: v("OnV-GDM_ivw", "ਈਡਨ ਉੱਤੇ ਪਰਛਾਵੇਂ (Punjabi Edition 'Shadows Over Eden')"),
  invitation: v("AIh1-2E-sCI", "Invitation", "Lyric video"),
} as const satisfies Record<string, Video>;

export type Single = {
  title: string;
  /** Short line under the title: edition or featured artist. */
  note?: string;
  video: Video;
  /** Tidal track link. Only set when her own link still resolves. */
  tidal?: string;
};

/**
 * Singles in the order her Music page lists them. Where her own Tidal link no longer
 * resolves, the single is reached through its video instead (see the build report).
 */
export const singles: Single[] = [
  {
    title: "Creatures Of Wild Wonders",
    video: video.creatures,
    tidal: `${TIDAL_TRACK}479103349/u`,
  },
  { title: "Forever Faithful", note: "Special Dance Beats Edition", video: video.foreverFaithful },
  { title: "Invitation", video: video.invitation, tidal: `${TIDAL_TRACK}500694017/u` },
  { title: "Chasing The Sun", video: video.chasingSun, tidal: `${TIDAL_TRACK}455358545/u` },
  {
    title: "Shadows Over Eden",
    note: "Where did all the mercy go!",
    video: video.shadowsEden,
    tidal: `${TIDAL_TRACK}492737379/u`,
  },
  { title: "He Sees You ~Now!", note: "ft. Harry Clarke UK", video: video.heSeesYou },
  { title: "ਈਡਨ ਉੱਤੇ ਪਰਛਾਵੇਂ", note: "Punjabi Edition 'Shadows Over Eden'", video: video.punjabi },
  {
    title: "दिव्य खजाना",
    note: "Special Hindi Version 'Divine Treasure'",
    video: video.hindi,
    tidal: `${TIDAL_TRACK}488886896/u`,
  },
  { title: "Boom Bitty Boom BOOM!", video: video.boomBitty },
  {
    title: "Turn It Up",
    note: "ft. Gloria & The Friends",
    video: video.turnItUp,
    tidal: `${TIDAL_TRACK}488539312/u`,
  },
  { title: "Tired & Bruised", note: "ft. JJ Jamal", video: video.tiredBruised },
  { title: "Butterflies Don't Jive With Snakes", video: video.butterflies },
  { title: "Searching The Flow", video: video.searchingFlow },
];

/** The two tracks her Music page features first. */
export const featuredSingleTitles = ["Creatures Of Wild Wonders", "Forever Faithful"] as const;

/** Her homepage's featured music row. */
export const homeFeatured = [
  singles[2]!,
  singles[3]!,
  singles[4]!,
  singles[5]!,
  singles[6]!,
  singles[7]!,
];

/** Homepage featured videos, in her order. */
export const homeVideos: Video[] = [
  video.boomBitty,
  video.turnItUp,
  video.creatures,
  video.tiredBruised,
  video.butterflies,
  video.searchingFlow,
];

/** The 12 lyrical videos on her Music page, in her order. */
export const lyricalVideos: Video[] = [
  video.whichHand,
  video.reflection,
  video.divineTreasure,
  video.listenArabic,
  video.creaturesLyric,
  video.listen,
  video.tickTock,
  video.safeNFree,
  video.timelessHearts,
  video.crimsonBreeze,
  video.electricEscapade,
  video.snakeMirror,
];

export type Release = { title: string; art: ImageId };

/** The 23 release covers in her gallery, in her order. */
export const releases: Release[] = [
  "He Sees You Now",
  "Forever Faithful",
  "Timeless Hearts",
  "Divine Treasure",
  "Don't Let Go",
  "All Things Made New",
  "Let Your Kingdom Come",
  "Bass & Beats",
  "Chasing The Sun",
  "Tired & Bruised",
  "Butterflies Don't Jive With Snakes",
  "Searching The Flow",
  "Reflection",
  "يستمع (Special Arabic Version 'Listen')",
  "Listen",
  "Tick-Tock O'Clock",
  "Crimson Breeze",
  "Snake In The Mirror",
  "Hollow Game",
  "I Was A Ship With No Harbor",
  "Let It Rest On Window Panes",
  "New World",
  "A Mother's Love",
].map((title, i) => ({ title, art: `release${String(i + 1).padStart(2, "0")}` as ImageId }));

export const spotifyEmbed =
  "https://open.spotify.com/embed/playlist/37i9dQZF1DZ06evO1mCYVS?utm_source=oembed";
