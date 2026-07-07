// Shamiri stub: this module lives in upstream's private EE repo; the public
// repo's components import it. This stub keeps the app buildable with the
// feature disabled/defaulted.

export type DataroomBannerKind = "none" | "image" | "video" | "youtube";

export function classifyDataroomBanner(src?: string | null): {
  kind: DataroomBannerKind;
  src: string | null;
  youtubeId: string | null;
} {
  if (!src) return { kind: "none", src: null, youtubeId: null };
  const yt = src.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{6,})/,
  );
  if (yt) return { kind: "youtube", src, youtubeId: yt[1] };
  if (/\.(mp4|webm|mov|m4v)(\?|$)/i.test(src))
    return { kind: "video", src, youtubeId: null };
  return { kind: "image", src, youtubeId: null };
}
