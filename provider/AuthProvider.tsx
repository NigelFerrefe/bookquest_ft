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
  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await SecureStore.getItemAsync(TOKEN_KEY);

        if (token) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
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

const register = async (name: string, email: string, password: string) => {
  try {
    const result = await serviceRegister({ name, email, password });
    if (result?.authToken) {
      // Guardar token y actualizar estado como antes
      await SecureStore.setItemAsync(TOKEN_KEY, result.authToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${result.authToken}`;
      setAuthState({ token: result.authToken, authenticated: true });
    }
    return result;
  } catch (error) {
    return { error: true, msg: (error as Error).message };
  }
};


const login = async (email: string, password: string) => {
  try {
    const result = await serviceLogin({ email, password });
    if (result?.authToken) {
      await SecureStore.setItemAsync(TOKEN_KEY, result.authToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${result.authToken}`;
      setAuthState({ token: result.authToken, authenticated: true });
    }
    return result;
  } catch (error) {
    return { error: true, msg: (error as Error).message };
  }
};


  const logout = async () => {
    //Delete token from storage
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    //console.log("Token eliminado de SecureStore");
    //Update HTTP headers
    delete axios.defaults.headers.common["Authorization"];
    //Reset auth state
    setAuthState({
      token: null,
      authenticated: false,
    });
    const tokenAfterDelete = await SecureStore.getItemAsync(TOKEN_KEY);
    console.log("Token después de borrar:", tokenAfterDelete);
    router.replace("/auth");
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
