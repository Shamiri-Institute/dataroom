// Shamiri stub: this module lives in upstream's private EE repo; the public
// repo's components import it. This stub keeps the app buildable with the
// feature disabled/defaulted.
// Tone analysis of the brand logo is private; default to "dark" (white chip),
// matching the consumer's own documented default.

export function useLogoTone(_src?: string | null): {
  tone: "light" | "dark";
  imgProps: Record<string, never>;
} {
  return { tone: "dark", imgProps: {} };
}
