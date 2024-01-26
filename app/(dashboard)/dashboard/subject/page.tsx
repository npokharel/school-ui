import BreadCrumb from "@/components/breadcrumb";
import { columns } from "@/components/tables/subject-tables/columns"; // Adjust the import based on your structure
import { SubjectTable } from "@/components/tables/subject-tables/subject-table"; // Adjust the import based on your structure
import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Subject } from "@/constants/data"; // Assuming you have a Subject type
import { cn } from "@/lib/utils";
import Link from "next/link";
import { getSubjects } from "@/lib/actions"; // Assuming you have a function to fetch subjects

const breadcrumbItems = [{ title: "Subject", link: "/dashboard/subject" }];

type ParamsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default async function SubjectPage({ searchParams }: ParamsProps) {
  // Extract parameters from searchParams
  const page = Number(searchParams.page) || 1;
  const pageLimit = Number(searchParams.limit) || 10;
  const offset = (page - 1) * pageLimit;

  // Fetch subjects
  const res = await getSubjects(); // Adjust the function based on your API
  const subjectRes = await res.json();
  const subjects: Subject[] = subjectRes.data;
  const totalSubjects = subjects?.length; // Adjust this based on your data structure
  const pageCount = Math.ceil(totalSubjects / pageLimit);

  return (
    <>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`Subjects (${totalSubjects})`}
            description="Manage subjects for your school"
          />

          {/* Link to add a new subject */}
          <Link
            href={"/dashboard/subject/new"} 
            className={cn(buttonVariants({ variant: "default" }))}
          >
            Add New Subject
          </Link>
        </div>
        <Separator />

        {/* Display the subject table */}
        <SubjectTable
                    columns={columns}
                    data={subjects}
                    searchKey="yourSearchKey"
                    pageNo={1}
                    totalSubjects={totalSubjects}
                    pageCount={pageCount}
                    pageSizeOptions={[10, 20, 30, 40, 50]}
                    searchParams={{}}
        />
      </div>
    </>
  );
}