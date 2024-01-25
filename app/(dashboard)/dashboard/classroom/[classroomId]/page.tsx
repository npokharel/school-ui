import BreadCrumb from "@/components/breadcrumb";
 import { ClassroomForm } from "@/components/forms/classroom-form";
import React from "react";
 import { fetchClassroomById } from "@/lib/actions";
import { Classroom } from "@/constants/data";
export default async function Page({ params }: { params: { classroomId: number } }) {
  const breadcrumbItems = [
    { title: "Classroom", link: "/dashboard/classroom" },
    { title: "Create", link: "/dashboard/classroom/create" },
  ];
  const id = params.classroomId
  const res = await fetchClassroomById(id)
  // @ts-ignore
  const classroomRes = await res.json();
  const classroom : Classroom = classroomRes.data
  if(classroom){
    // @ts-ignore
    classroom.image = [classroom?.image]
  }

  console.log("classroom ", classroom)
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <BreadCrumb items={breadcrumbItems} />
      <ClassroomForm
        initialData={classroom}
        key={null}
      />
    </div>
  );
}