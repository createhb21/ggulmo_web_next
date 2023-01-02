import React, {
  useEffect,
  useState,
  createContext,
  useMemo,
  startTransition,
} from "react";
import { useRouter } from "next/router";

import type { UserModel } from "@/types";
import { Auth } from "@/utils/auth";
import { PathStorage } from "@/utils/pathStorage";

export const auth = new Auth();

const prevPathStorage = new PathStorage("prev_path");
const redirectPathStorage = new PathStorage("sign_in_redirect");

interface AuthContextValue {
  auth: Auth;
  initializing: boolean;
  user: UserModel | null;
  error: { message: string } | null;
  redirectPathStorage: PathStorage;
  prevPathStorage: PathStorage;
}

export const AuthContext = createContext({} as AuthContextValue);

AuthContext.displayName = "AuthContext";

export function useAuth() {
  const contextValue = React.useContext(AuthContext);

  if (!contextValue) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return contextValue;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const [user, setUser] = useState<UserModel | null>(null);
  const [error, setError] = useState<{ message: string } | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    auth.resolveUser().onAuthStateChanged((_user: UserModel | null, _error) => {
      startTransition(() => {
        if (_user) {
          setUser(_user);
          setError(null);
        } else {
          setUser(null);
          if (_error) {
            setError(_error);
          }
        }
        setInitializing(false);
      });
    });
  }, []);

  useEffect(() => {
    if (router.asPath !== redirectPathStorage.getPath()) {
      prevPathStorage.setPath(redirectPathStorage.getPath());
      redirectPathStorage.setPath(router.asPath);
    }
  }, [router.asPath]);

  const value = useMemo(
    () => ({
      user,
      error,
      auth,
      initializing,
      prevPathStorage,
      redirectPathStorage,
    }),
    [error, initializing, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
