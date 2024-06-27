import { CreatingWorkspace } from "../../workspace/components/creatingWorkspace";
import { Inviting } from "./Inviting";
import { WorkSpaceSet } from "../../workspace/components/workspaceset";
import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { workspace } from "./dashboard";
import {
  AlarmClockOffIcon,
  ChevronDown,
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";
import { FaCheck } from "react-icons/fa6";
import { Button } from "@/app/components/button";
// import { DropdownMenuShortcut } from "@/app/components/dropdown";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
  DropdownMenuShortcut,
} from "../../components/dropdown";
import LoadingSpinner from "./LoadingSpinner";

interface Props {
  allWorkspaces: Array<workspace>;
  selectedWorkspace: workspace;
  setSelectedWorkspace: (workspace: workspace) => void;
}

export interface WorkspaceProps {
  selectedWorkspace: workspace;
  updateWorkspace: (workspace: workspace) => void;
}
const DropDown = (props: Props) => {
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(true);

  console.log("selectedWorkspace in dropdown:", props.selectedWorkspace);

  useEffect(() => {
    if (props.selectedWorkspace) {
      setLoading(false);
    }
  }, [props.selectedWorkspace]);
  return (
    <div className="flex flex-col w-full text-[#0F172A]">
      <div
        className="flex flex-row justify-center items-center cursor-pointer w-full "
        onClick={() => setToggle(!toggle)}
      >
        {/* <WorkSpaceSelectingDropDown /> */}

        <DropdownMenu>
          <DropdownMenuTrigger asChild className="border-0 border-none">
            <Button className="flex justify-center gap-3 h-10 sm:w-[82%] md:w-[86%]  lg:w-[87%] bg-white relative text-[#0F172A] font-semibold border-none border-0 hover:bg-white">
              {loading ? (
                <LoadingSpinner />
              ) : (
                `${props.selectedWorkspace?.name}'s team` || "Select WorkSpace"
              )}
              {/* {props.selectedWorkspace?.name} */}
              {loading ? "" : <ChevronDown />}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>WorkSpaces</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {props.allWorkspaces.map((workspace: workspace) => (
                <DropdownMenuItem
                  className="cursor-pointer hover:bg-purple-200"
                  key={workspace.workspace_id}
                  onClick={() => props.setSelectedWorkspace(workspace)}
                >
                  {workspace.name}'s team
                  {workspace.workspace_id ===
                    props.selectedWorkspace?.workspace_id && (
                    <FaCheck className="ml-auto" />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup className="flex flex-col gap-2">
              {/* <DropdownMenuItem
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
                className=""
              > */}
              <div className="cursor-pointer flex justify-start hover:bg-purple-200">
                <WorkSpaceSet
                  selectedWorkspace={props.selectedWorkspace}
                  updateWorkspace={props.setSelectedWorkspace}
                />
              </div>

              {/* </DropdownMenuItem> */}
              {/* <DropdownMenuItem> */}
              <div className="cursor-pointer flex justify-start hover:bg-purple-200">
                <Inviting
                  selectedWorkspace={props.selectedWorkspace}
                  updateWorkspace={props.setSelectedWorkspace}
                />
              </div>

              {/* </DropdownMenuItem> */}
              <div className="cursor-pointer flex justify-start hover:bg-purple-200">
                {/* <DropdownMenuItem> */}
                {/* <a className=""> */}
                <CreatingWorkspace
                  selectedWorkspace={props.selectedWorkspace}
                  updateWorkspace={props.setSelectedWorkspace}
                />
                {/* </a> */}
              </div>
              {/* </DropdownMenuItem> */}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* <button className="flex flex-row items-center justify-center text-[#0F172A] font-poppins bg-white  w-full h-10 font-semibold relative"> */}
        {/* <Button
          className="flex  h-10 sm:w-[82%] md:w-[86%]  lg:w-[87%] bg-white relative text-[#0F172A] font-semibold"
          size="lg"
        >
          {props.selectedWorkspace?.name}
          <IoIosArrowDown />
        </Button> */}
      </div>
      <>
        {/* {toggle && (
          <div className="flex flex-col justify-center items-center absolute top-40 border-2 border-[#8645FF] rounded-md shadow-xl shadow-[#8645FF] bg-[#8645FF] opacity-100 z-40 w-[200px]">
            {props.allWorkspaces.map((workspace: workspace) => {
              return (
                <div
                  className="flex flex-row justify-center items-center cursor-pointer text-slate-50	"
                  onClick={() => {
                    props.setSelectedWorkspace(workspace);
                    setToggle(false);
                  }}
                >
                  <div className="mx-4">{workspace.name}</div>
                  {workspace.workspace_id ==
                  props.selectedWorkspace?.workspace_id ? (
                    <div>
                      <FaCheck />
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              );
            })}
          </div>
        )} */}

        {/* <div className="flex flex-col relative z-10">
          <p>
            <a className="flex flex-row items-center absolute top-16 cursor-pointer font-normal text-sm  font-[Inter] text-left my-3">
              <WorkSpaceSet
                selectedWorkspace={props.selectedWorkspace}
                updateWorkspace={props.setSelectedWorkspace}
              />
            </a>
          </p>
          <p>
            <a className="flex flex-row font-[Inter] cursor-pointer absolute top-20 font-normal text-sm text-left items-center  mx-3 my-6">
              <Inviting
                selectedWorkspace={props.selectedWorkspace}
                updateWorkspace={props.setSelectedWorkspace}
              />
            </a>
          </p>
          <p>
            <a className="flex flex-row font-[Inter] cursor-pointer absolute top-24 font-normal text-sm text-left items-center mx-3 my-9 ">
              <CreatingWorkspace
                selectedWorkspace={props.selectedWorkspace}
                updateWorkspace={props.setSelectedWorkspace}
              />
            </a>
          </p>
        </div> */}
      </>
    </div>
  );
};

export default DropDown;
