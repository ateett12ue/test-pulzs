"use client";

import { Button } from "../../components/button";
import { AvatarDemo } from "../../dashboard/components/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/dialog";
import { Input } from "../../components/input";
import { IoMdSettings } from "react-icons/io";
import { useEffect, useState } from "react";
import { workspace } from "../../dashboard/components/dashboard";
import toast from "react-hot-toast";
import { WorkspaceProps } from "../../dashboard/components/DropDown";
import { useSession } from "next-auth/react";
import { fetchData } from "../../utils/axios";
export interface WorkspaceMember {
  id: string;
  name: string;
  email: string;
  password: string;
  phonenumber: string;
  emailVerified: boolean;
  image: string;
  role: string;
}
export function WorkSpaceSet(props: WorkspaceProps) {
  const [tab, setTab] = useState(1);
  const [workspaceName, setWorkspaceName] = useState(
    props.selectedWorkspace?.name
  );
  const [workspaceMembers, setWorkspaceMembers] = useState<
    Array<WorkspaceMember>
  >([]);
  const [workspace, setWorkspace] = useState(props.selectedWorkspace);
  const [modelOpen, setModelOpen] = useState(false);
  const { data: session, status } = useSession();
  const userId = session?.user.id;

  useEffect(() => {
    fetchWorkspace();
    fetchWorkspaceMember();
  }, [props.selectedWorkspace, modelOpen]);

  const fetchWorkspaceMember = async () => {
    if (props.selectedWorkspace?.workspace_id) {
      try {
        // const workspaceMemberData = await fetch(
        //   `http://localhost:8080/api/get-workspace-members?workspace_id=${props.selectedWorkspace?.workspace_id}`
        // );
        const workspaceMemberData = await fetchData({
          url: `/get-workspace-members?workspace_id=${props.selectedWorkspace?.workspace_id}`,
          body: null,
          method: "get",
        });
        // const data = await workspaceMemberData.json();
        setWorkspaceMembers(workspaceMemberData.workspaceMembers);
      } catch (ex) {
        console.log("ex from workspace", ex);
        // alert("Error while fetching workspace");
      }
    }
  };

  const fetchWorkspace = async () => {
    if (props.selectedWorkspace?.workspace_id) {
      try {
        const workspaceData = await fetchData({
          url: `/get-workspace?workspace_id=${props.selectedWorkspace?.workspace_id}`,
          body: null,
          method: "get",
        });
        // const data = await workspaceData.json();
        setWorkspace(workspaceData.workspace);
        if (workspaceData.workspace?.name) {
          setWorkspaceName(workspaceData.workspace?.name);
        }
      } catch (ex) {
        console.log("ex from workspace", ex);
        // alert("Error while fetching workspace");
      }
    }
  };

  const updateWorkspaceName = async () => {
    try {
      // const response = await fetch(
      //   "http://localhost:8080/api/update-workspace-name",
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       workspace_id: props.selectedWorkspace?.workspace_id,
      //       workspaceName: workspaceName,
      //     }),
      //   }
      // );

      const response = await fetchData({
        url: `/update-workspace-name`,
        method: "post",
        body: JSON.stringify({
          workspace_id: props.selectedWorkspace?.workspace_id,
          workspaceName: workspaceName,
        }),
      });

      if (response) {
        // const data = await response.json();
        props.updateWorkspace(response.workspaces);
        // console.log("SendVideo response:", data);
        toast("workspace name updated successfully");
      } else {
        console.error("Failed to update workspace name");
        const data = await response.json();
        console.error("Error response:", data.error);
        toast("error", data.error);
      }
    } catch (error:any) {
      console.error("Error sending video:", error);
      toast("error", error?.error);
    }
  };

  const leaveWorkspace = async () => {
    try {
      // const response = await fetch(
      //   "http://localhost:8080/api/leave-workspace",
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       workspace_id: props.selectedWorkspace?.workspace_id,
      //       user_id: userId,
      //     }),
      //   }
      // );

      const response = await fetchData({
        url: "/leave-workspace",
        method: "post",
        body: JSON.stringify({
          workspace_id: props.selectedWorkspace?.workspace_id,
          user_id: userId,
        }),
      });

      if (response) {
        const workspace: workspace = {
          name: "",
          workspace_creator_id: "",
          workspace_id: "",
        };
        props.updateWorkspace(workspace);
        // console.log("SendVideo response:", data);
        toast.success("workspace left successfully");
      } else {
        // const data = await response.json();

        toast.error(response?.error);
      }
      setModelOpen(false);
    } catch (error:any) {
      console.log("Error leaving Workspace", error);
      // toast("Error leaving Workspace");
      toast.error(error?.error);
    }
  };

  const deleteWorkspace = async () => {
    try {
      // const response = await fetch(
      //   "http://localhost:8080/api/delete-workspace",
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       workspace_id: props.selectedWorkspace?.workspace_id,
      //       user_id: userId,
      //     }),
      //   }
      // );
      const response = await fetchData({
        url: "/delete-workspace",
        method: "post",
        body: JSON.stringify({
          workspace_id: props.selectedWorkspace?.workspace_id,
          user_id: userId,
        }),
      });

      if (response) {
        const workspace: workspace = {
          name: "",
          workspace_creator_id: "",
          workspace_id: "",
        };
        props.updateWorkspace(workspace);
        // console.log("SendVideo response:", data);
        toast("workspace deleted successfully");
      } else {
        // const data = await response.json();
        console.log("error in deleting workspace ", response);

        toast(response?.error);
      }
      setModelOpen(false);
    } catch (error:any) {
      console.error("Error deleting Workspace", error);
      toast("Error deleting Workspace", error?.error);
    }
  };
  return (
    <Dialog open={modelOpen} onOpenChange={setModelOpen}>
      <DialogTrigger asChild>
        <span className="flex flex-row font-[Inter] font-normal text-sm text-left items-center ml-2 gap-1">
          <IoMdSettings className="" />
          Workspace Settings
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] flex flex-col justify-center rounded-lg border border-slate-500  min-w-[500px] min-h-[300px] ">
        <DialogHeader>
          <DialogTitle className="font-poppins items-start font-bold ml-[30px] mx-0 text-2xl text-lg">
            Workspace Settings
          </DialogTitle>
        </DialogHeader>
        {/* <div className="flex flex-col gap-20 mt-10">
          <div className="flex flex-row place-content-between ">
            <Input
              id="name"
              placeholder="Enter name or email"
              className="w-[300px]"
            />
            <Button
              type="submit"
              className="bg-[#8645FF] hover:bg-[#8645FF] w-[120px] rounded-r-md font-[Inter] font-semibold text-lg"
            >
              Send
            </Button>
          </div>
          <div className="flex flex-row place-content-between items-center">
            <span className="text-[#474545] text-poppins text-sm font-light">
              Anyone with the link can join the pulse
            </span>
            <Button
              type="submit"
              className="text-white bg-[#8645FF] w-[120px] rounded-r-md font-[Inter] font-semibold text-lg"
            >
              Copy Link
            </Button>
          </div>
        </div> */}
        <div className="flex flex-col">
          <div className="flex flex-row justify-start cursor-pointer text-lg font-semibold border-b-2 border-slate-700">
            <div
              className={
                tab == 1
                  ? "mx-2 border-b-2 border-indigo-700"
                  : "mx-2 font-normal"
              }
              onClick={() => setTab(1)}
            >
              General
            </div>
            <div
              className={
                tab == 2
                  ? "mx-2 border-b-2 border-indigo-700"
                  : "mx-2 font-normal"
              }
              onClick={() => setTab(2)}
            >
              Members
            </div>
          </div>
          <div>
            <div>
              {tab == 1 && (
                <div className="mt-2">
                  <div className="mt-2">
                    <div className="font-semibold">Workspace Name</div>
                    <div className="flex flex-row w-full justify-between mt-4">
                      <div>
                        <Input
                          id="workspace_name"
                          placeholder="Enter your workspace name"
                          className="w-[300px]"
                          value={workspaceName}
                          disabled={workspace?.workspace_creator_id != userId}
                          onChange={(e) => {
                            setWorkspaceName(e.target.value);
                          }}
                        />
                      </div>
                      <div>
                        <Button
                          type="submit"
                          className="text-white bg-[#8645FF] rounded-r-md font-[Inter] font-semibold text-lg w-[120px]"
                          onClick={() => updateWorkspaceName()}
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="flex flex-row w-full justify-between mt-4">
                      <div>
                        <Input
                          id="workspace_link"
                          value={"www.pulze.com"}
                          className="w-[300px]"
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row justify-between mt-8 flex-wrap">
                    <Button
                      type="submit"
                      className="text-white bg-[#DC2626] rounded-r-md font-[Inter] font-semibold text-lg w-[200px]"
                      onClick={leaveWorkspace}
                    >
                      Leave Workspace
                    </Button>
                    {props.selectedWorkspace?.workspace_creator_id ==
                      userId && (
                      <Button
                        type="submit"
                        className="text-white bg-[#DC2626] rounded-r-md font-[Inter] font-semibold text-lg w-[200px]"
                        onClick={deleteWorkspace}
                      >
                        Delete Workspace
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div>
              {tab == 2 && (
                <div>
                  <div className="pl-4">
                    <h3 className="font-medium font-poppins text-lg font-semibold text-[#000000] capitalize mt-4">
                      {workspaceMembers.length} Member
                    </h3>

                    {workspaceMembers.map((workspaceMember) => {
                      return (
                        <div className="flex flex-row mt-6 items-center w-full justify-between">
                          <div className="flex flex-row items-center">
                            <div className="scale-[2]">
                              {" "}
                              <AvatarDemo imageUrl={workspaceMember?.image} />
                            </div>
                            <div className="flex flex-col ml-4">
                              <p className="font-semibold font-poppins text-lg">
                                {workspaceMember?.name}
                              </p>
                              <p className="font-normal font-poppins  text-xs text-[#474545] tracking-wider">
                                {workspaceMember?.email}
                              </p>
                            </div>
                          </div>
                          <div className="font-semibold font-poppins text-base">
                            <p>
                              {workspaceMember?.role == "admin"
                                ? "Admin"
                                : "Member"}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
