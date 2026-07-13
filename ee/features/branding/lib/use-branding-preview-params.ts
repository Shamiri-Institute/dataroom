// Shamiri stub: upstream's `use-branding-preview-params` lives in the private
// EE repo. Upstream seeds these values from the URL on first paint and then
// live-updates them over postMessage so its branding editor never reloads the
// preview iframe. Our pinned (fork-era) branding editors rebuild the iframe
// `src` query string on every change instead, so reading the query params on
// each render is all we need.
import { useRouter } from "next/router";

export interface BrandingPreviewParams {
  brandLogo?: string;
  brandColor?: string;
  brandBanner?: string;
  accentColor?: string;
  accentButtonColor?: string;
  applyAccentColorToDataroomView?: string;
  cardLayout?: string;
  showFolderTree?: string;
  ctaLabel?: string;
  ctaUrl?: string;
  viewerHeaderStyle?: string;
  hideFolderIconsInMain?: string;
  welcomeMessage?: string;
}

const PARAM_KEYS: (keyof BrandingPreviewParams)[] = [
  "brandLogo",
  "brandColor",
  "brandBanner",
  "accentColor",
  "accentButtonColor",
  "applyAccentColorToDataroomView",
  "cardLayout",
  "showFolderTree",
  "ctaLabel",
  "ctaUrl",
  "viewerHeaderStyle",
  "hideFolderIconsInMain",
  "welcomeMessage",
];

export function useBrandingPreviewParams(): BrandingPreviewParams {
  const router = useRouter();

  const params: BrandingPreviewParams = {};
  for (const key of PARAM_KEYS) {
    const value = router.query[key];
    if (typeof value === "string" && value !== "") {
      params[key] = value;
    }
  }
  return params;
}
