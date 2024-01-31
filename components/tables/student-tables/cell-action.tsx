"use client";
import { AlertModal } from "@/components/modal/alert-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Student } from "@/constants/data";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";

interface CellActionProps {
  data: Student;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { data: session } = useSession()
  const { toast } = useToast();

  const onConfirm = async () => {
    setOpen(false)
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/student/${data.id}`,{
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        //@ts-ignore
        Authorization: `Bearer ${session?.user.access_token}`,
      }
    })
    if (res.ok) {
      toast({
        variant: "default",
        title: "Successfully Deleted",
        description: `Student record deleted successfully.`,
      });
      router.push(`/dashboard/student`);
      router.refresh();
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem
            onClick={() => {
              router.push(`/dashboard/student/${data.id}`);
              router.refresh();
            }}
          >
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
