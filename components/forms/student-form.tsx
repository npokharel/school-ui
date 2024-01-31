"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl, FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import FileUpload from "../file-upload";
import { useToast } from "../ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useSession } from "next-auth/react";

const ImgSchema = z.object({
  fileName: z.string(),
  name: z.string(),
  fileSize: z.number(),
  size: z.number(),
  fileKey: z.string(),
  key: z.string(),
  fileUrl: z.string(),
  url: z.string(),
});
export const IMG_MAX_LIMIT = 2;
const formSchema = z.object({
  id: z.number().optional(),
  firstname: z
    .string()
    .min(3, { message: "First Name must be at least 3 characters" }),
  middlename: z.string().optional(),
  lastname: z.string(),
  gender: z.string(),
  dob: z.string()
    .refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
      message: "Start date should be in the format YYYY-MM-DD",
    }),
  image: z
    .array(ImgSchema)
    .max(IMG_MAX_LIMIT, { message: "You can only add up to 3 images" })
    .min(0, { message: "At least one image must be added." }),
  //.min(1, { message: "At least one image must be added." }),
  community: z.string().optional(),
  ethnicity: z.string().optional(),
  religion: z.string().optional(),
  nationality: z.string().optional(),
  country: z.string(),
  province: z.string().optional(),
  district: z.string().optional(),
  municipality: z.string().optional(),
  city: z.string().optional(),
  mobile: z.string().optional(),
  email: z.string().optional(),
  address: z.string().optional(),
  tempAddress: z.string().optional(),
  // price: z.coerce.number(),
  // category: z.string().min(1, { message: "Please select a category" }),
});

type StudentFormValues = z.infer<typeof formSchema>;

interface StudentFormProps {
  initialData: any | null
}

export const StudentForm: React.FC<StudentFormProps> = ({
  initialData
}) => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const title = initialData ? "Edit student" : "Create student";
  const description = initialData ? "Edit a student." : "Add a new student";
  const toastMessage = initialData ? "Student updated." : "Student created.";
  const action = initialData ? "Save changes" : "Create";
  const { data: session } = useSession()

  console.log("initial data ", initialData)

  const defaultValues = initialData
    ? initialData
    : {
        name: "",
        description: "",
        price: 0,
        image: [],
        category: "",
      };

  const form = useForm<StudentFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: StudentFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        console.log("!update submit data", data)
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/student/${initialData.id}`,{
          method: 'PUT',
          body: JSON.stringify(data),
          headers: {
            'content-type': 'application/json',
            //@ts-ignore
            Authorization: `Bearer ${session?.user.access_token}`,
          }
        })
        if(res.ok) {
          toast({
            variant: "default",
            title: "Update Successfully.",
            description: `Student ${initialData.firstname} updated successfully.`,
          });
          router.refresh();
          router.push(`/dashboard/student`);
        }
      } else {
        data = JSON.parse(JSON.stringify(data))
        console.log("submit data", data)
        // const res = await addStudent(data);

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/student`,{
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'content-type': 'application/json',
            //@ts-ignore
            Authorization: `Bearer ${session?.user.access_token}`,
          }
        })

        //const res = await addStudent(data)
        console.log("res ", res)
        if(res.ok) {
          toast({
            variant: "default",
            title: "Success.",
            description: "New Student added.",
          });
          router.refresh();
          router.push(`/dashboard/student`);
        }
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
      console.log(error)
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
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="First name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="middlename"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Middle Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Middle Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Last Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
              name="gender"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-row space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="m" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Male
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="f" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Female
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="o" />
                        </FormControl>
                        <FormLabel className="font-normal">Other</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      disabled={loading}
                      {...field}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/*<FormField
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
            />*/}
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Images</FormLabel>
                  <FormControl>
                    <FileUpload
                      onChange={field.onChange}
                      value={field.value}
                      onRemove={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="community"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Community</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Community"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ethnicity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ethnicity</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Ethnicity"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="religion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Religion</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Religion"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/*<div className="">
              <h2 className="text-sm font-medium leading-none">Address Information</h2>
              <FormLabel>Address Information</FormLabel>


            </div>*/}
            <FormLabel>Address Information</FormLabel>
            <Separator className="col-span-3 mb-0 mt-0"/>

            <FormField
              control={form.control}
              name="nationality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nationality</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nationality"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Country"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="province"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Province</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Province"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="district"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>District</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="District"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="municipality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Municipality</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Municipality"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="City"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Mobile"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Permanent Address</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tempAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Temporary Address</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Temporary Address"
                      {...field}
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
