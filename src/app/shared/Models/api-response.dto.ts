export interface ApiResponse<T = any> {
  result: boolean;
  message: string;
  data?: T;
}
