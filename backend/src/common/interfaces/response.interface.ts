export interface ApiResponse<T> {
  message: string;
  data: T;
  statusCode?: number;
  errorMessage?: string;
}
