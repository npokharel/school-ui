import BreadCrumb from "@/components/breadcrumb";
import { StaffForm } from "@/components/forms/staff-form";
import React from "react";
import { fetchStaffById } from "@/lib/actions";
import { Staff } from "@/constants/data";
export default async function Page({ params }: { params: { staffId: number } }) {
  const breadcrumbItems = [
    { title: "Staff", link: "/dashboard/staff" },
    { title: "Create", link: "/dashboard/staff/create" },
  ];
  const id = params.staffId
  const res = await fetchStaffById(id)
  // @ts-ignore
  const staffRes = await res.json();
  const staff : Staff = staffRes.data
  if(staff){
    // @ts-ignore
    staff.image = [staff?.image]
    staff.dob = new Date(staff.dob)
  }

  console.log("staff ", staff)
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <BreadCrumb items={breadcrumbItems} />
      <StaffForm
        initialData={staff}
        key={null}
      />
    </div>
  );
}
