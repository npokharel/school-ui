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
import { useSession} from "next-auth/react";
import FileUpload from "../file-upload";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
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
  firstname: z
    .string()
    .min(3, { message: "First Name must be at least 3 characters" }),
  middlename: z.string().optional(),
  lastname: z.string(),
  gender: z.string(),
  dob: z.date(),
  image: z
    .array(ImgSchema)
    .max(IMG_MAX_LIMIT, { message: "You can only add up to 3 images" })
    .min(1, { message: "At least one image must be added." }),
  community: z.string().optional(),
  ethnicity: z.string().optional(),
  religion: z.string().optional()
  // price: z.coerce.number(),
  // category: z.string().min(1, { message: "Please select a category" }),
});

type ClassroomFormValues = z.infer<typeof formSchema>;

interface ClassroomFormProps {
  initialData: any | null;
  categories?: any;
}

export const ClassroomForm: React.FC<ClassroomFormProps> = ({initialData}) => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const title = initialData ? "Edit classroom" : "Create classroom";
  const description = initialData ? "Edit a classroom." : "Add a new classroom";
  const toastMessage = initialData ? "Classroom updated." : "Classroom created.";
  const action = initialData ? "Save changes" : "Create";
  const { data: session } = useSession()

  const defaultValues = initialData
    ? initialData
    : {
      classId: "",
      classname: "",
      classdiscription: "",
      classcapacity: "",
      classcode: null,
      image: [],
    };

  const form = useForm<ClassroomFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  console.log("initial data ", initialData)

  const onSubmit = async (data: ClassroomFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        console.log("!update submit data", data)
        // await axios.post(`/api/products/edit-product/${initialData._id}`, data);
      } else {
        // const res = await axios.post(`/api/products/create-product`, data);
        // console.log("product", res);
        data = JSON.parse(JSON.stringify(data))
        console.log("submit data", data)
        // const res = await addClassroom(data);

        const res = await fetch(`http://localhost:8080/api/v1/classrooom`,{
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${session?.user.access_token}`,
          }
        })

        //const res = await addClassroom(data)
        console.log("res ", res)
        if(res.ok) {
          toast({
            variant: "default",
            title: "Success.",
            description: "New Classroom added.",
          });
          router.refresh();
          router.push(`/dashboard/classroom`);
        }
      }

      /*toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });*/
    } catch (error: any) {
      console.log("the error ", error.message)
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      //   await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
      router.refresh();
      router.push(`/${params.storeId}/products`);
    } catch (error: any) {
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  // const triggerImgUrlValidation = () => form.trigger("imgUrl");

  return (
    <>
      {/* <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      /> */}
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="md:grid md:grid-cols-3 gap-8">
            {/* <FormField
              control={form.control}
              name="classId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ClassId</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="ClassId"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="classname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Class Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Class Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="classdiscription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Class Discription</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Class Discription"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="classcapacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Class Capacity</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Class Capacity"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="classcode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Class Code</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Class Code"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            {/*<FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a Gender"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                       @ts-ignore
                      {categories.map((category) => (
                        <SelectItem key={category._id} value={category._id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>

              )}
            />*/}
            
            
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <FileUpload
                      onChange={field.onChange}
                      //@ts-ignore
                      value={field.value}
                      onRemove={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            

          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
