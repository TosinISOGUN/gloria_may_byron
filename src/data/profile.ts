import type { ImageId } from "./images.generated";

/**
 * The words on every page live in src/i18n/messages (so each can be translated). What stays here is
 * what does not change between languages: images, links and the order they come in.
 */

export const GRA_URL =
  "https://globalrecognitionawards.org/winners/2025/gloria-may-byron-recognized-with-a-2025-global-recognition-award/";

/** The badge for each entry of `awards.list.items`, in the same order. */
export const awardBadges: ImageId[] = [
  "badgeGra",
  "badgeGmaWinner",
  "badgeGmaGold",
  "badgeGmaMedal",
  "badgeGmaWinner",
  "badgeIntercontinental",
  "badgeIntercontinental",
];

/** The badge for each name in `awards.certs.names`, in the same order. */
export const certificationBadges: ImageId[] = [
  "badgeIntercontinental",
  "badgeGmaWinner",
  "badgeGra",
  "badgeGmaGold",
  "badgeGmaMedal",
];

/** The photographs of the gallery, in order; `gallery.photos.alts` describes each one in the same order. */
export const galleryPhotoIds: ImageId[] = [
  "awardGraBanner",
  "liveTrio",
  "portraitEyes",
  "liveDress",
  "portraitSpotify",
  "portraitWhite",
  "portraitTruck",
  "portraitCurls",
  "portraitDune",
  "liveBlack",
  "portraitOcean",
  "headphones",
  "studioWide",
  "groupSelfie",
  "groupStudio",
  "portraitMic",
  "portraitDress",
  "portraitCurlsTwo",
];

/** Image and where it hangs on the awards wall, for each entry of `awards.wall.items`. */
export const awardWall: { id: ImageId; place: string; tilt: string }[] = [
  { id: "awardGraBanner", place: "col-span-2 lg:col-span-7", tilt: "-1.4deg" },
  { id: "awardCrystal", place: "lg:col-span-5 lg:mt-28", tilt: "1.6deg" },
  { id: "awardGraCert", place: "lg:col-span-4 lg:-mt-6", tilt: "1.2deg" },
  { id: "awardTrophy", place: "lg:col-span-4 lg:mt-16", tilt: "-1.8deg" },
  { id: "awardIcCert", place: "lg:col-span-4", tilt: "1.4deg" },
  { id: "awardWhosWho", place: "col-span-2 lg:col-span-7", tilt: "-1.2deg" },
  {
    id: "awardIcMosaic",
    place: "col-span-2 mx-auto w-4/5 sm:w-3/5 lg:col-span-5 lg:mt-24 lg:w-full",
    tilt: "1.5deg",
  },
];
