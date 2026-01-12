export interface ApiResponse<T> {
  status: "success" | "error";
  message: string;
  data: T | null;
  meta?: Record<string, unknown>;
  code?: string; 
}

export function apiResponse<T>(
  data: T | null,
  message = "OK",
  meta?: Record<string, unknown>
): ApiResponse<T> {
  return {
    status: "success",
    message,
    data,
    meta
  };
}

export function apiError(
  message: string,
  code? : string,
  meta?: Record<string, unknown>
): ApiResponse<null> {
  return {
    status: "error",
    code,
    message,
    data: null,
    meta
  };
}
