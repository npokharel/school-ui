import BreadCrumb from "@/components/breadcrumb";
import { TeacherForm } from "@/components/forms/teacher-form";
import React from "react";
import { fetchTeacherById } from "@/lib/actions";
import { Teacher } from "@/constants/data";
export default async function Page({ params }: { params: { teacherId: number } }) {
  const breadcrumbItems = [
    { title: "Teacher", link: "/dashboard/teacher" },
    { title: "Create", link: "/dashboard/teacher/create" },
  ];
  const id = params.teacherId
  const res = await fetchTeacherById(id)
  // @ts-ignore
  const teacherRes = await res.json();
  const teacher : Teacher = teacherRes.data
  if(teacher){
    // @ts-ignore
    teacher.image = [teacher?.image]
    teacher.dob = new Date(teacher.dob)
  }

  console.log("teacher ", teacher)
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <BreadCrumb items={breadcrumbItems} />
      <TeacherForm
        initialData={teacher}
        key={null}
      />
    </div>
  );
}
