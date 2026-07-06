export interface ApiResponse<T = null> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
}

export const apiResponse = {
  success: <T,>(message: string, data?: T): ApiResponse<T> => ({
    success: true,
    message,
    data,
  }),
  error: (
    message: string,
    errors?: Record<string, string[]>
  ): ApiResponse => ({
    success: false,
    message,
    errors,
  }),
};
