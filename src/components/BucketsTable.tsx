import { createColumnHelper } from "@tanstack/react-table";
import DataTable from "./BucketDataTable";
import { type Bucket } from './types';
import { useEffect, useState } from 'react';

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
  const [buckets, setBuckets] = useState([]);

  useEffect(() => {
    fetch(`https://bruinooge.dev/api/buckets/mykolas555`, { method: 'GET' })
      .then(response => {
        return response.json();
      }).then(data => {
        setBuckets(data);
      });
  }, [])

  return (
    <DataTable columns={columns} data={buckets}></DataTable>
  )
}

export default BucketsTable
