import React from "react";
//import { Input, Button } from "../../components/button";";
import InviteIcon from "../../../icons/InviteIcon";
import HelpIcon from "../../../icons/HelpIcon";
import SearchIcon from "../../../icons/SearchIcon";

interface Props {
  headerTitle: string;
}
const Header = (props: Props) => {
  return (
    <>
      <div className="container mb-2">
        <div className="flex flex-row grow justify-around  lg:justify-between items-center py-3">
          <div className="font-bold lg:ml-4">{props.headerTitle}</div>
          <div className="search-container ">
            <div className="relative w-96 shadow-2xl shadow-slate-400">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <SearchIcon />
              </div>
              <input
                type="search"
                id="search"
                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search pulze"
              />
            </div>
          </div>
          <div className="flex flex-row justify-between px-4">
            <div>
              <button>
                <HelpIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
