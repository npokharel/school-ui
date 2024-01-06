import BreadCrumb from "@/components/breadcrumb";
import { StudentForm } from "@/components/forms/student-form";
import React from "react";

export default function Page() {
  const breadcrumbItems = [
    { title: "Student", link: "/dashboard/student" },
    { title: "Create", link: "/dashboard/student/create" },
  ];
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <BreadCrumb items={breadcrumbItems} />
      <StudentForm
        categories={[
          { _id: "m", name: "Male" },
          { _id: "f", name: "Female" },
          { _id: "o", name: "Others" },
        ]}
        initialData={null}
        key={null}
      />
    </div>
  );
}
