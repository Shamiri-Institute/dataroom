// Shamiri stub: upstream's private repo ships a richer error module; the
// public code only needs this error class. Call shape (from
// lib/api/documents/validate-external-url.ts): new PapermarkApiError(code, message).
export class PapermarkApiError extends Error {
  code: string;

  constructor(code: string, message: string) {
    super(message);
    this.name = "PapermarkApiError";
    this.code = code;
  }
}
