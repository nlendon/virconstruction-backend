export interface AuthPayload {
  email: string;
  password: string;
}

export interface DefResult {
  message: string;
  status: number;
}

export interface SignInPromise {
  status: number,
  id: string,
  full_name: string,
  email: string,
  role: string,
  token: string | null,
  message?: string
}

export interface AdminModelType {
  id: string;
  email: string;
  password: string;
  full_name: string;
  secret: string | null;
  role: string;
  isVerified?: boolean;
  save?: any;
  update?: any;
  destroy?: any;
}