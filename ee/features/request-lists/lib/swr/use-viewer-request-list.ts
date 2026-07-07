// Shamiri stub: request lists live in upstream's private EE repo; the viewer
// hook reports the feature as disabled.
export function useViewerRequestList(_args: {
  linkId?: string;
  dataroomId?: string;
  viewerId?: string;
  isPreview?: boolean;
  [key: string]: any;
}): { enabled: boolean; [key: string]: any } {
  return { enabled: false };
}
