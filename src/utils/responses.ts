export interface Response<T> {
  status: "success" | "error";
  message: string;
  data: T | null;
  meta?: Record<string, unknown>;
  code?: string; 
}

export function responseMessage<T>(
  data: T | null,
  message = "OK",
  meta?: Record<string, unknown>
): Response<T> {
  return {
    status: "success",
    message,
    data,
    meta
  };
}

export function errorMessage(
  message: string,
  code? : string,
  meta?: Record<string, unknown>
): Response<null> {
  return {
    status: "error",
    code,
    message,
    data: null,
    meta
  };
}
