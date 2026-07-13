// Shamiri stub: this module lives in upstream's private EE repo; the public
// repo's components import it. This stub keeps the app buildable with the
// feature disabled/defaulted.

export type DataroomCardLayout = "LIST" | "GRID" | "COMPACT";
export type DataroomViewerHeaderStyle = "DEFAULT" | "SPLIT" | "NOTION";

const CARD_LAYOUTS: DataroomCardLayout[] = ["LIST", "GRID", "COMPACT"];
const HEADER_STYLES: DataroomViewerHeaderStyle[] = ["DEFAULT", "SPLIT", "NOTION"];

export function asDataroomCardLayout(value: unknown): DataroomCardLayout {
  return CARD_LAYOUTS.includes(value as DataroomCardLayout)
    ? (value as DataroomCardLayout)
    : "LIST";
}

export function asDataroomViewerHeaderStyle(
  value: unknown,
): DataroomViewerHeaderStyle {
  return HEADER_STYLES.includes(value as DataroomViewerHeaderStyle)
    ? (value as DataroomViewerHeaderStyle)
    : "DEFAULT";
}
