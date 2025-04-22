"use client";

import { getCurrentUser, getMe } from "@/services/Auth/authServices";
import { IUser, TUser } from "@/types";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface IUserProviderValues {
  user: IUser | null;
  isLoading: boolean;
  setUser: (user: IUser | null) => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isShop: boolean;
  setIsShop: Dispatch<SetStateAction<boolean>>;

  myInfo: TUser | null;
  setMyInfo: Dispatch<SetStateAction<null>>;

}

const UserContext = createContext<IUserProviderValues | undefined>(undefined);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isShop, setIsShop] = useState(false);

  const [myInfo, setMyInfo] = useState(null);

  const handleUser = async () => {
    const user = await getCurrentUser();
    const myInfoData = await getMe();
    console.log(user);
    setUser(user);
    setIsLoading(false);
    setMyInfo(myInfoData);
  };

  useEffect(() => {
    handleUser();
  }, [isLoading]);

  return (
    <UserContext.Provider

      value={{
        user,
        setUser,
        isLoading,
        setIsLoading,
        isShop,
        setIsShop,
        myInfo,
        setMyInfo,
      }}

    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (context == undefined) {
    throw new Error("useUser must be used within the UserProvider context");
  }

  return context;
};

export default UserProvider;
