import BreadCrumb from "@/components/breadcrumb";
import { columns } from "@/components/tables/student-tables/columns";
import { StudentTable } from "@/components/tables/student-tables/student-table";
import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Student } from "@/constants/data";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";
import { getStudents } from "@/lib/actions";

const breadcrumbItems = [{ title: "Student", link: "/dashboard/user" }];

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
  const res = await getStudents()
  const studentRes = await res.json();
  console.log("employeeRes", studentRes);
  const students: Student[] = studentRes.data;
  const totalUsers = students?.length//studentRes.total; //1000
  const pageCount = Math.ceil(totalUsers / pageLimit);
  // console.log("students", students);
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`Student (${totalUsers})`}
            description="Manage students for your school"
          />

          <Link
            href={"/dashboard/student/new"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />
        <StudentTable
          searchKey="country"
          pageNo={page}
          columns={columns}
          totalUsers={totalUsers}
          data={students}
          pageCount={pageCount}
        />
      </div>
    </>
  );
}
