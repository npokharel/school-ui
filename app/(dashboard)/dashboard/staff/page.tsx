import BreadCrumb from "@/components/breadcrumb";
import { columns } from "@/components/tables/staff-tables/columns";
import { StaffTable } from "@/components/tables/staff-tables/staff-table";
import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Staff } from "@/constants/data";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";
import { getStaffs } from "@/lib/actions";

const breadcrumbItems = [{ title: "Staff", link: "/dashboard/user" }];

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
    const res = await getStaffs()
    const staffRes = await res.json();
    console.log("staffRes", staffRes);
    const staffs: Staff[] = staffRes.data;
    const totalUsers = staffs?.length//staffRes.total; //1000
    const pageCount = Math.ceil(totalUsers / pageLimit);
    return (
      <>
        <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
          <BreadCrumb items={breadcrumbItems} />
  
          <div className="flex items-start justify-between">
            <Heading
              title={`Staff (${totalUsers})`}
              description="Manage staff for your school"
            />
  
            <Link
              href={"/dashboard/staff/new"}
              className={cn(buttonVariants({ variant: "default" }))}
            >
              <Plus className="mr-2 h-4 w-4" /> Add New
            </Link>
          </div>
          <Separator />
          <StaffTable
            searchKey="country"
            pageNo={page}
            columns={columns}
            totalUsers={totalUsers}
            data={staffs}
            pageCount={pageCount}
          />
        </div>
      </>
    );
  }