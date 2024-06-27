import { useState } from "react";
import { Button } from "../../components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/dialog";
import { Input } from "../../components/input";
import { MdGroupAdd } from "react-icons/md";
import { workspace } from "../../dashboard/components/dashboard";
import { WorkspaceProps } from "../components/DropDown";
import toast from "react-hot-toast";
import { fetchData } from "../../utils/axios";
export function Inviting(props: WorkspaceProps) {
  const [inviteEmail, setInviteEmail] = useState("");
  const [openModel, setOpenModel] = useState(false);
  const addMember = async () => {
    try {
      // const response = await fetch(
      //   "http://localhost:8080/api/add-workspace-members",
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       workspace_id: props.selectedWorkspace?.workspace_id,
      //       user_email: inviteEmail,
      //     }),
      //   }
      // );
      const response = await fetchData({
        url: "/add-workspace-members",
        method: "post",
        body: JSON.stringify({
          workspace_id: props.selectedWorkspace?.workspace_id,
          user_email: inviteEmail,
        }),
      });

      if (response) {
        // const data = await response.json();
        // console.log("SendVideo response:", data);
        toast.success("member added successfully");
      } else {
        // const data = await response.json();
        console.error("invite not send", response);
        toast("invite send unsuccessfully", response);
      }
    } catch (error:any) {
      console.error("Error sending video:", error);
      toast.error(error?.error);
    }
    setOpenModel(false);
  };
  return (
    <Dialog open={openModel} onOpenChange={setOpenModel}>
      <DialogTrigger asChild>
        <span className="flex flex-row font-[Inter] font-normal text-sm text-left items-center ml-2 gap-1 ">
          <MdGroupAdd className="" />
          Invite Coworkers
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] flex flex-col justify-center rounded-lg border border-slate-500  min-w-[500px] min-h-[200px] ">
        <DialogHeader>
          <DialogTitle className="font-poppins items-start font-bold ml-[30px] mx-0 text-2xl text-lg">
            Invite co-workers by email
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col  gap-20 mt-10">
          <div className="flex flex-row place-content-between ">
            <Input
              id="name"
              placeholder="Enter name or email"
              className="w-[300px]"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
            />
            <Button
              type="submit"
              className="bg-[#8645FF] hover:bg-[#8645FF] w-[120px] rounded-r-md font-[Inter] font-semibold text-lg"
              onClick={addMember}
            >
              Send
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
