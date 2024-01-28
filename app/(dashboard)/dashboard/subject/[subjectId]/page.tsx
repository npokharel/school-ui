import BreadCrumb from "@/components/breadcrumb";
import { SubjectForm } from "@/components/forms/subject-form";
import React, { useEffect, useState } from "react";
import { fetchSubjectById } from "@/lib/actions";
import { Subject } from "@/constants/data";

interface SubjectPageProps {
  params: {
    subjectId: string;
  };
}

export default function SubjectPage({ params }: SubjectPageProps) {
  const [subject, setSubject] = useState<Subject | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = Number(params.subjectId);
        if (isNaN(id)) {
          console.error("Invalid subject ID");
          return;
        }

        const res: Response | undefined = await fetchSubjectById(id);
        if (!res) {
          console.error("Error fetching subject: Response is undefined");
          return;
        }

        if (!res.ok) {
          console.error(`Error fetching subject: ${res.status}`);
          return;
        }

        const subjectData: Subject = await res.json();
        setSubject(subjectData);
      } catch (error) {
        console.error("Error fetching subject:", error);
      }
    };

    fetchData();
  }, [params.subjectId]);

  // Define breadcrumb items
  const breadcrumbItems = [
    { title: "Subject", link: "/dashboard/subject" },
    { title: "Details", link: `/dashboard/subject/${params.subjectId}` },
  ];

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <BreadCrumb items={breadcrumbItems} />

      {/* Display the SubjectForm with initial data */}
      {subject ? <SubjectForm initialData={subject} key={subject.id} /> : <div>Loading...</div>}
    </div>
  );
}
