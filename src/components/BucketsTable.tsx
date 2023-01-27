import { createColumnHelper } from "@tanstack/react-table";
import DataTable from "./BucketDataTable";
import { type Bucket } from './types'

const defaultData: Bucket[] = [
  { name: "bucket1", owner: "yusuf", updatedAt: new Date().toDateString() },
];

const columnHelper = createColumnHelper<Bucket>();

const columns = [
  columnHelper.accessor("name", {
    cell: (info) => info.getValue(),
    header: "Name",
  }),
  columnHelper.accessor("owner", {
    cell: (info) => info.getValue(),
    header: "Owner",
  }),
  columnHelper.accessor("updatedAt", {
    cell: (info) => info.getValue(),
    header: "Updated At",
  }),
];


const BucketsTable = () => {
  return (
    <DataTable columns={columns} data={defaultData}></DataTable>
  )
}

export default BucketsTable
