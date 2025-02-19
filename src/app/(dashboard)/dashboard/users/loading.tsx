import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton"

export default function UsersLoading() {
  return (
    <DataTableSkeleton
      columnCount={6}
      isNewRowCreatable={true}
      isRowsDeletable={true}
    />
  )
}
