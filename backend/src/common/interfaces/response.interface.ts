export interface ApiResponse<T> {
  message: string;
  data: T;
  statusCode?: number;
  errorMessage?: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: 'USER' | 'ADMIN'; // Replace with your actual Role enum
  createdAt: Date;
  updatedAt: Date;
}
