// Shamiri stub: this module lives in upstream's private EE repo; the public
// repo's lib/api/links/link-data.ts imports it. Reimplemented with the
// obvious precedence: link-level custom meta, then dataroom brand link
// preview, then team brand link preview, then defaults.

export type ResolvedPublicLinkMeta = {
  enableCustomMetatag: boolean;
  metaTitle: string | null;
  metaDescription: string | null;
  metaImage: string | null;
  metaFavicon: string | null;
};

type LinkPreviewBrand = {
  customLinkPreviewEnabled: boolean | null;
  linkPreviewTitle: string | null;
  linkPreviewDescription: string | null;
  linkPreviewImage: string | null;
  linkPreviewFavicon: string | null;
} | null;

export function resolvePublicLinkMeta({
  link,
  teamBrand,
  dataroomBrand,
  defaultTitle,
}: {
  link: {
    enableCustomMetatag: boolean;
    metaTitle: string | null;
    metaDescription: string | null;
    metaImage: string | null;
    metaFavicon: string | null;
  };
  teamBrand: LinkPreviewBrand;
  dataroomBrand: LinkPreviewBrand;
  defaultTitle: string;
}): ResolvedPublicLinkMeta {
  if (link.enableCustomMetatag) {
    return {
      enableCustomMetatag: true,
      metaTitle: link.metaTitle ?? defaultTitle,
      metaDescription: link.metaDescription,
      metaImage: link.metaImage,
      metaFavicon: link.metaFavicon ?? "/favicon.ico",
    };
  }
  const brand = dataroomBrand?.customLinkPreviewEnabled
    ? dataroomBrand
    : teamBrand?.customLinkPreviewEnabled
      ? teamBrand
      : null;
  if (brand) {
    return {
      enableCustomMetatag: true,
      metaTitle: brand.linkPreviewTitle ?? defaultTitle,
      metaDescription: brand.linkPreviewDescription,
      metaImage: brand.linkPreviewImage,
      metaFavicon: brand.linkPreviewFavicon ?? "/favicon.ico",
    };
  }
  return {
    enableCustomMetatag: false,
    metaTitle: defaultTitle,
    metaDescription: null,
    metaImage: null,
    metaFavicon: "/favicon.ico",
  };
}
