import BreadCrumb from "@/components/breadcrumb";
import { StudentForm } from "@/components/forms/student-form";
import React from "react";

export default function Page() {
  const breadcrumbItems = [
    { title: "Student", link: "/dashboard/student" },
    { title: "Create", link: "/dashboard/student/create" },
  ];
  /*const initialData = {
    firstname: "ram",
    middlename: "prasad",
    lastname: "mudbari",
    gender: "f",
    dob: "2022/02/01"
  }*/
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <BreadCrumb items={breadcrumbItems} />
      <StudentForm
        initialData={null}
        key={null}
      />
    </div>
  );
}
