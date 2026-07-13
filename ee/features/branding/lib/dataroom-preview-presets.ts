// Shamiri stub: upstream's `dataroom-preview-presets` lives in the private EE
// repo. It supplies the fixed "Example Virtual Data Room" dataset rendered by
// `pages/room_ppreview_demo.tsx` (the branding editor's dataroom preview).
// The shapes mirror what that page feeds into ViewFolderTree, FolderCard, and
// DocumentCard: folders are Prisma `DataroomFolder` rows; documents carry a
// `folderName` (the page derives folder ids from it) plus the DRDocument
// fields DocumentCard expects.
import type { DataroomFolder } from "@prisma/client";

import type { DocumentVersion } from "@/components/view/viewer/dataroom-viewer";

export interface PreviewDocument {
  id: string;
  name: string;
  dataroomDocumentId: string;
  folderName: string | null;
  downloadOnly: boolean;
  canDownload: boolean;
  hierarchicalIndex: string | null;
  versions: DocumentVersion[];
}

export interface DataroomPreviewDataset {
  folders: DataroomFolder[];
  documents: PreviewDocument[];
}

const PREVIEW_DATAROOM_ID = "preview-dataroom";
const PREVIEW_UPDATED_AT = new Date("2026-06-01T12:00:00Z");

function previewFolder(
  id: string,
  name: string,
  path: string,
  orderIndex: number,
): DataroomFolder {
  return {
    id,
    name,
    path,
    parentId: null,
    icon: null,
    color: null,
    dataroomId: PREVIEW_DATAROOM_ID,
    orderIndex,
    hierarchicalIndex: String(orderIndex),
    createdAt: PREVIEW_UPDATED_AT,
    updatedAt: PREVIEW_UPDATED_AT,
  };
}

function previewVersion(id: string, type: string): DocumentVersion[] {
  return [
    {
      id,
      type,
      versionNumber: 1,
      hasPages: type === "pdf",
      isVertical: false,
      updatedAt: PREVIEW_UPDATED_AT,
      fileSize: 1_400_000,
    },
  ];
}

function previewDocument(
  id: string,
  name: string,
  folderName: string | null,
  hierarchicalIndex: string,
  type: string = "pdf",
): PreviewDocument {
  return {
    id,
    name,
    dataroomDocumentId: `drd-${id}`,
    folderName,
    downloadOnly: false,
    canDownload: true,
    hierarchicalIndex,
    versions: previewVersion(`v-${id}`, type),
  };
}

export function getDataroomPreviewDataset(): DataroomPreviewDataset {
  return {
    folders: [
      previewFolder("folder-financials", "Financials", "/financials", 1),
      previewFolder("folder-legal", "Legal", "/legal", 2),
      previewFolder("folder-product", "Product", "/product", 3),
    ],
    documents: [
      previewDocument("doc-overview", "Company Overview", null, "0.1"),
      previewDocument(
        "doc-income",
        "Income Statement FY2026",
        "Financials",
        "1.1",
      ),
      previewDocument("doc-captable", "Cap Table", "Financials", "1.2", "sheet"),
      previewDocument(
        "doc-incorporation",
        "Certificate of Incorporation",
        "Legal",
        "2.1",
      ),
      previewDocument("doc-roadmap", "Product Roadmap", "Product", "3.1"),
    ],
  };
}
