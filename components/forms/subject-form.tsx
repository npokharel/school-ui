
"use client";
import * as z from "zod";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { useToast } from "../ui/use-toast";
import { useSession } from "next-auth/react";
import FileUpload from "../file-upload";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "@/components/ui/calendar";

const ImgSchema = z.object({
  fileName: z.string(),
  name: z.string().optional(),
  fileSize: z.number(),
  size: z.number().optional(),
  fileKey: z.string(),
  key: z.string().optional(),
  fileUrl: z.string(),
  url: z.string().optional(),
});
export const IMG_MAX_LIMIT = 3;
const formSchema = z.object({
  subjectName: z.string(),
  subjectDescription: z.string().optional(),
  subjectCode: z.string(),
  classID: z.string(),
  teacherID: z.string(),
  subjectStartDate: z.date(),
  subjectEndDate: z.date(),
  totalCredits: z.number(),
  prerequisites: z.string().optional(),
  assessmentMethod: z.string().optional(),
  additionalAttributes: z.string().optional(),
});

type SubjectFormValues = z.infer<typeof formSchema>;

interface SubjectFormProps {
  initialData: any | null;
}

export const SubjectForm: React.FC<SubjectFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const title = initialData ? "Edit subject" : "Create subject";
  const description = initialData ? "Edit a subject." : "Add a new subject";
  const toastMessage = initialData ? "Subject updated." : "Subject created.";
  const action = initialData ? "Save changes" : "Create";
  const { data: session } = useSession();

  const defaultValues = initialData
    ? initialData
    : {
        subjectName: "",
        subjectDescription: "",
        subjectCode: "",
        classID: "",
        teacherID: "",
        subjectStartDate: null,
        subjectEndDate: null,
        totalCredits: 0,
        prerequisites: "",
        assessmentMethod: "",
        additionalAttributes: "",
      };

  const form = useForm<SubjectFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: SubjectFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        console.log("!update submit data", data);
        // Use the update logic based on your client or API
      } else {
        // Use the create logic based on your client or API
        data = JSON.parse(JSON.stringify(data));
        console.log("submit data", data);
        // const res = await createSubject(data);

        const res = await fetch("http://localhost:8080/api/v1/subject", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${session?.user.access_token}`,
          },
        });

        //const res = await createSubject(data)
        console.log("res ", res);
        if (res.ok) {
          toast({
            variant: "default",
            title: "Success.",
            description: "New Subject added.",
          });
          router.refresh();
          router.push(`/dashboard/subject`);
        }
      }
    } catch (error: any) {
      console.log("the error ", error.message);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    } finally {
      setLoading(false);
    }
  };

  // You can implement the onDelete logic if needed

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          {/* Add your form fields here */}
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
