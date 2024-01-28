import BreadCrumb from "@/components/breadcrumb";
import { columns } from "@/components/tables/classroom-tables/columns";
import { ClassroomTable } from "@/components/tables/classroom-tables/classroom-table";
import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Classroom } from "@/constants/data";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";
import { getClassrooms } from "@/lib/actions";

const breadcrumbItems = [{ title: "Classroom", link: "/dashboard/user" }];

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
  const res = await getClassrooms()
  const classroomRes = await res.json();
  console.log("classroomRes", classroomRes);
  const classrooms: Classroom[] = classroomRes.data;
  const totalUsers = classrooms?.length//classroomRes.total; //1000
  const pageCount = Math.ceil(totalUsers / pageLimit);
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`Classroom (${totalUsers})`}
            description="Manage classrooms for your school"
          />

          <Link
            href={"/dashboard/classroom/new"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />
        <ClassroomTable
          searchKey="country"
          pageNo={page}
          columns={columns}
          totalUsers={totalUsers}
          data={classrooms}
          pageCount={pageCount}
        />
      </div>
    </>
  );
}
