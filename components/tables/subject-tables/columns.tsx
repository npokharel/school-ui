import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Subject } from "@/constants/data"; 
import { Checkbox } from "@/components/ui/checkbox";

export const columns: ColumnDef<Subject>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "subjectName",
    header: "Subject Name",
  },
  {
    accessorKey: "subjectCode",
    header: "Subject Code",
  },
  {
    accessorKey: "classID",
    header: "Class ID",
  },
  {
    accessorKey: "teacherID",
    header: "Teacher ID",
  },
  {
    accessorKey: "subjectStartDate",
    header: "Start Date",
  },
  {
    accessorKey: "subjectEndDate",
    header: "End Date",
  },
  {
    accessorKey: "totalCredits",
    header: "Total Credits",
  },
  {
    accessorKey: "prerequisites",
    header: "Prerequisites",
  },
  {
    accessorKey: "assessmentMethod",
    header: "Assessment Method",
  },
  {
    accessorKey: "additionalAttributes",
    header: "Additional Attributes",
  },
  
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
