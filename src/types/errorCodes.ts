export const ERROR_CODES = {
  VALIDATION_ERROR: "E01",
  CLIENT_NOT_FOUND: "E02",
  INVALID_HEADER: "E03",
  INVALID_BODY: "E04",
  INVALID_QUERY: "E05",
  INTERNAL_SERVER_ERROR: "E06"
} as const;

export type ErrorCode = keyof typeof ERROR_CODES;
