import BreadCrumb from "@/components/breadcrumb";
import { StudentForm } from "@/components/forms/student-form";
import React from "react";
import { fetchStudentById } from "@/lib/actions";

export default async function Page({ params }: { params: { id: string } }) {
  const breadcrumbItems = [
    { title: "Student", link: "/dashboard/student" },
    { title: "Create", link: "/dashboard/student/create" },
  ];
  const id = params.id
  const student = await fetchStudentById(id)
  console.log('id', id)
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <BreadCrumb items={breadcrumbItems} />
      <StudentForm
        initialData={student}
        key={null}
      />
    </div>
  );
}
