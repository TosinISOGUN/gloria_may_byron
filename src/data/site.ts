import type { ImageId } from "./images.generated";

export const SITE_URL = "https://gloriamaybyron.com";

export const site = {
  name: "Gloria May Byron",
  tagline: "Love ~ Hope ~ Peace ~ Truth ~ Encouragement ~ Unity",
  motto: "Where words fail, music speaks.",
  email: "Gloriamaybyron@gmail.com",
  description:
    "Gloria May Byron is an award-winning singer and songwriter whose emotionally driven, story-focused music has reached listeners in over 200 countries.",
} as const;

export type NavItem = {
  label: string;
  to: "/" | "/about" | "/music" | "/announcements" | "/gallery" | "/awards" | "/contact";
};

export const nav: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Music", to: "/music" },
  { label: "Announcements", to: "/announcements" },
  { label: "Gallery", to: "/gallery" },
  { label: "Awards", to: "/awards" },
  { label: "Contact", to: "/contact" },
];

export type Platform = { name: string; url: string; logo: ImageId };

/** Streaming platforms, in the order her site lists them. */
export const platforms: Platform[] = [
  {
    name: "Spotify",
    url: "https://open.spotify.com/artist/2o5nZXJREjfPe31SmoWavA",
    logo: "platformSpotify",
  },
  { name: "VEVO", url: "https://www.youtube.com/@GloriaMayByronVEVO", logo: "platformVevo" },
  { name: "YouTube", url: "https://www.youtube.com/@GloriaMayByronVEVO", logo: "platformYoutube" },
  {
    name: "Apple Music",
    url: "https://music.apple.com/ca/artist/gloria-may-byron/1810003561",
    logo: "platformApple",
  },
  { name: "Tidal", url: "https://tidal.com/artist/57016790", logo: "platformTidal" },
  { name: "Deezer", url: "https://www.deezer.com/us/artist/319401991", logo: "platformDeezer" },
  {
    name: "SoundClick",
    url: "https://www.soundclick.com/GloriaMayByron",
    logo: "platformSoundclick",
  },
  {
    name: "Amazon Music",
    url: "https://music.amazon.com/artists/B0F5YLMCN7/gloria-may-byron",
    logo: "platformAmazon",
  },
];

export const spotifyUrl = platforms[0]!.url;

export type Social = { name: string; url: string };

export const socials: Social[] = [
  { name: "Instagram", url: "https://www.instagram.com/butterflys_n_tides" },
  { name: "X (Twitter)", url: "https://x.com/byron99196" },
  { name: "TikTok", url: "https://www.tiktok.com/@glo40556" },
];

export type PressLogo = { name: string; logo: ImageId };

export const press: PressLogo[] = [
  { name: "Fox News", logo: "pressFox" },
  { name: "NBC News", logo: "pressNbc" },
  { name: "CBS", logo: "pressCbs" },
  { name: "International Business Times", logo: "pressIbt" },
  { name: "Associated Press", logo: "pressAp" },
  { name: "Barchart", logo: "pressBarchart" },
  { name: "Today Musicians", logo: "pressToday" },
];

export const highlights = [
  { title: "Authentic Sound", text: "Emotional pop rooted in storytelling and connection" },
  {
    title: "Award-Winning Artist",
    text: "Multiple international honors including Global Recognition Awards",
  },
  { title: "Global Reach", text: "Music enjoyed in over 200 countries" },
  { title: "Community First", text: "Fans are friends, and every listener matters" },
] as const;
