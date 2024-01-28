import BreadCrumb from "@/components/breadcrumb";
import { columns } from "@/components/tables/teacher-tables/columns";
import { TeacherTable } from "@/components/tables/teacher-tables/teacher-table";
import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Teacher } from "@/constants/data";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";
import { getTeachers } from "@/lib/actions";

const breadcrumbItems = [{ title: "Teacher", link: "/dashboard/user" }];

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default async function page({ searchParams }: paramsProps) {
  const page = Number(searchParams.page) || 1;
  const pageLimit = Number(searchParams.limit) || 10;
  const country = searchParams.search || null;
  const offset = (page - 1) * pageLimit;
  const res = await getTeachers()
  const teacherRes = await res.json();
  console.log("teacherRes", teacherRes);
  const teachers: Teacher[] = teacherRes.data;
  const totalUsers = teachers?.length//teacherRes.total; //1000
  const pageCount = Math.ceil(totalUsers / pageLimit);
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`Teacher (${totalUsers})`}
            description="Manage teachers for your school"
          />

          <Link
            href={"/dashboard/teacher/new"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />
        <TeacherTable
          searchKey="country"
          pageNo={page}
          columns={columns}
          totalUsers={totalUsers}
          data={teachers}
          pageCount={pageCount}
        />
      </div>
    </>
  );
}
