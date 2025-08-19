import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";
import { useAuthService } from "@/services/auth.service";
import { useMemo } from "react";
import { setBearerToken } from "@/managers/api";
interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onRegister?: (name: string, email: string, password: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<void>;
  loading?: boolean;
}

const TOKEN_KEY = "my-jwt";
export const API_URL =
  process.env.API_URL || "https://bookquest-bk.vercel.app/";
const AuthContext = createContext<AuthProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { register: serviceRegister, login: serviceLogin } = useAuthService();
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: null,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  // Cargar token al iniciar la app
  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await SecureStore.getItemAsync(TOKEN_KEY);
        if (token) {
          setBearerToken(token);
          setAuthState({ token, authenticated: true });
        } else {
          setAuthState({ token: null, authenticated: false });
        }
      } catch (error) {
        console.error("Error loading token", error);
        setAuthState({ token: null, authenticated: false });
      } finally {
        setLoading(false);
      }
    };
    loadToken();
  }, []);

  useEffect(() => {
    if (authState.token) {
      setBearerToken(authState.token);
    } else {
      setBearerToken("");
    }
  }, [authState.token]);

  const register = async (name: string, email: string, password: string) => {
    try {
      const result = await serviceRegister({ name, email, password });
      if (result?.authToken) {
        await SecureStore.setItemAsync(TOKEN_KEY, result.authToken);
        setBearerToken(result.authToken);
        setAuthState({ token: result.authToken, authenticated: true });
      }
      return result;
    } catch (error) {
      return { error: true, msg: (error as Error).message };
    }
  };

  // Login
  const login = async (email: string, password: string) => {
    try {
      const result = await serviceLogin({ email, password });
      const token = result.authToken;
      if (!token) return { error: true, msg: "No token returned" };

      await SecureStore.setItemAsync(TOKEN_KEY, token);
      setBearerToken(token);
      // Garantizar que React aplica el estado antes de navegar
      await new Promise((resolve) => setTimeout(resolve, 0));

      setAuthState({ token, authenticated: true });
      return { error: false };
    } catch (error) {
      return { error: true, msg: (error as Error).message };
    }
  };

const logout = async () => {
  // Borrar token del storage
  await SecureStore.deleteItemAsync(TOKEN_KEY);
  console.log("Token eliminado de SecureStore");

  // Limpiar token de los headers usando tu helper
  setBearerToken(null);

  // Resetear estado de auth
  setAuthState({
    token: null,
    authenticated: false,
  });

  router.replace("/auth");
};


  const value = useMemo(
    () => ({
      onRegister: register,
      onLogin: login,
      onLogout: logout,
      authState,
      loading,
    }),
    [register, login, logout, authState, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
