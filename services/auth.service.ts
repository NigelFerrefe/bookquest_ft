import { del, get, post, put } from "@/managers/api";
import { AuthResponseModel, Login, Register } from "@/models/user.model";

export const useAuthService = () => {
  const register = async (
    registerData: Register
  ): Promise<AuthResponseModel> => {
    const auth = await post<AuthResponseModel>("/auth/signup", registerData);
    return AuthResponseModel.fromApi(auth);
  };

  const login = async (loginData: Login): Promise<AuthResponseModel> => {
    const auth = await post<AuthResponseModel>("/auth/login", loginData);
    return AuthResponseModel.fromApi(auth);
  };



  return {
    register,
    login
  }
};
