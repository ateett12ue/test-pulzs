import React, { useState, useEffect } from "react";
import { LogOutPopUp } from "./LogOutPopUp";
import { Settings } from "./AccountSettings";
import { AvatarDemo } from "./avatar";
import { IoIosArrowDown } from "react-icons/io";
import { useSession, signOut } from "next-auth/react";
import { fetchData } from "../../utils/axios";
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  phonenumber: string;
  emailVerified: boolean;
  image: string;
}
const Account = () => {
  const { data: session, status } = useSession();
  const userId = session?.user.id;

  const [showSettings, setShowSettings] = useState(false);
  const [showLogOut, setShowLogOut] = useState(false);
  const [user, setUser] = useState<User>();

  const [openSettings, setOpenSettings] = useState(false);
  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const toggleLogOut = () => {
    setShowLogOut(!showLogOut);
  };
  const toggleBoth = () => {
    toggleSettings();
    toggleLogOut();
  };

  const toggleOpenSettings = () => {
    setOpenSettings(!openSettings);
    toggleBoth();
  };

  const fetchUserInfo = async () => {
    if (session && userId) {
      try {
        const userData = await fetchData({
          url: `/get-user-info?user_id=${userId}`,
          body: null,
          method: "get",
        });

        setUser(userData?.userInfo);
      } catch (ex) {
        console.log("ex from user", ex);
      }
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, [userId]);

  useEffect(() => {
    fetchUserInfo();
  }, [openSettings]);

  return (
    <div>
      <div className="relative flex mx-2">
        <p>
          <a className="absolute shadow-xl w-full bottom-1 left-0 flex flex-col font-[Inter] justify-start font-normal text-sm text-left m-1 ">
            {showSettings && <Settings setOpenSettings={toggleOpenSettings} />}
            {showLogOut && <LogOutPopUp />}
          </a>
        </p>
      </div>
      <div
        className="flex  flex-row items-center justify-center px-2 h-12 cursor-pointer"
        onClick={toggleBoth}
      >
        <AvatarDemo imageUrl={user?.image} />

        <p className="px-2">{user?.name}</p>

        <IoIosArrowDown />
      </div>
    </div>
  );
};

export default Account;
