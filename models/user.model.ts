import { z } from "zod";

//API schema

export const AuthResponseSchema = z.object({
  authToken: z.string(),
});

export const RegisterSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Email is invalid"),
  password: z.string("Password is required").min(8, "Password must be at least 8 characters long"),
});

export const LoginSchema = z.object({
  email: z.email("Email is invalid"),
  password: z.string("Password is required").min(8, "Password must be at least 8 characters long"),
});

//Conversion to client-side type
export type AuthResponse = z.infer<typeof AuthResponseSchema>;
export type Register = z.infer<typeof RegisterSchema>;
export type Login = z.infer<typeof LoginSchema>;

export class AuthResponseModel {
  constructor(private readonly authResponse: AuthResponse) {
    this.authResponse = authResponse;
  }

  static fromApi(authResponse: any) {
    try {
      const validatedAuthResponse = AuthResponseSchema.parse(authResponse);
      return new AuthResponseModel(validatedAuthResponse);
    } catch (error) {
      throw new Error("Invalid credentials", { cause: error });
    }
  }

  get authToken() {
    return this.authResponse.authToken;
  }
}
