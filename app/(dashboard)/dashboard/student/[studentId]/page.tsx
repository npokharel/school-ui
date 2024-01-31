import BreadCrumb from "@/components/breadcrumb";
import { StudentForm } from "@/components/forms/student-form";
import React from "react";
import { Student } from "@/constants/data";
import { getById } from "@/lib/actions";

export default async function Page({ params }: { params: { studentId: number } }) {
  const breadcrumbItems = [
    { title: "Student", link: "/dashboard/student" },
    { title: "Create", link: "/dashboard/student/create" },
  ];
  const id = params.studentId
  const res = await getById("student",id)
  // @ts-ignore
  const studentRes = await res.json();
  const student : Student = studentRes.data
  if(student){
    // @ts-ignore
    student.image = [student?.image]
    student.dob = new Date(student.dob)
  }
  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems} />
      {/* eslint-disable-next-line react/jsx-no-undef */}
      <StudentForm
        initialData={student}
        key={null}
      />
    </div>
  );
}
