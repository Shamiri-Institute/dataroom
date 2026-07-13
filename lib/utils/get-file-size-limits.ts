type FileSizeLimits = {
  video: number;
  document: number;
  image: number;
  excel: number;
  maxFiles: number;
  maxPages: number;
};

type PartialFileSizeLimits = Partial<{
  [K in keyof FileSizeLimits]: FileSizeLimits[K] | null;
}>;

const resolveFileSizeLimit = (
  limit: number | null | undefined,
  fallback: number,
) => (limit === null ? Infinity : limit ?? fallback);

export function getFileSizeLimits({
  limits,
  isFree,
  isTrial,
}: {
  limits?: { fileSizeLimits?: PartialFileSizeLimits } | null;
  isFree: boolean;
  isTrial: boolean;
}): FileSizeLimits {
  // Shamiri: self-hosted deployment — no plan-based limits.
  // Upstream (papermark) defaults were plan-gated:
  //   video: 500, document: isFree && !isTrial ? 100 : 350,
  //   image: isFree && !isTrial ? 30 : 100, excel: 40,
  //   maxFiles: 150, maxPages: isFree && !isTrial ? 100 : 500
  const defaultLimits: FileSizeLimits = {
    video: 500, // 500MB
    document: 1000, // 1000MB
    image: 1000, // 1000MB
    excel: 40, // 40MB
    maxFiles: 500,
    maxPages: 500,
  };

  // If no custom limits are set, return default limits
  if (!limits?.fileSizeLimits) {
    return defaultLimits;
  }

  // Merge custom limits with defaults
  return {
    video: resolveFileSizeLimit(limits.fileSizeLimits.video, defaultLimits.video),
    document: resolveFileSizeLimit(
      limits.fileSizeLimits.document,
      defaultLimits.document,
    ),
    image: resolveFileSizeLimit(limits.fileSizeLimits.image, defaultLimits.image),
    excel: resolveFileSizeLimit(limits.fileSizeLimits.excel, defaultLimits.excel),
    maxFiles: resolveFileSizeLimit(
      limits.fileSizeLimits.maxFiles,
      defaultLimits.maxFiles,
    ),
    maxPages: resolveFileSizeLimit(
      limits.fileSizeLimits.maxPages,
      defaultLimits.maxPages,
    ),
  };
}

// Helper function to get size limit for a specific file type
export function getFileSizeLimit(
  fileType: string,
  limits: FileSizeLimits,
): number {
  if (fileType.startsWith("video/")) {
    return limits.video;
  }
  if (fileType.startsWith("image/")) {
    return limits.image;
  }
  if (
    fileType.startsWith(
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ) ||
    fileType.startsWith("application/vnd.ms-excel") ||
    fileType.startsWith("application/vnd.oasis.opendocument.spreadsheet")
  ) {
    return limits.excel;
  }
  return limits.document;
}
