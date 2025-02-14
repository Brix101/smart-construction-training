import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Shell } from "@/components/shell"

export default function UsersLoading() {
  return (
    <Shell variant="sidebar">
      <PageHeader separated>
        <PageHeaderHeading size="sm">Users</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          View and manage users
        </PageHeaderDescription>
      </PageHeader>
      <section
        id="user-users-info"
        aria-labelledby="user-users-info-heading"
        className="w-full overflow-hidden"
      >
        <DataTableSkeleton
          columnCount={6}
          isNewRowCreatable={true}
          isRowsDeletable={true}
        />
      </section>
    </Shell>
  )
}
