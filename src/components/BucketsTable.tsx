import React from "react"

import { createColumnHelper } from "@tanstack/react-table";
import DataTable from "./BucketDataTable";
import { type Bucket } from '../types';

const columnHelper = createColumnHelper<Bucket>();


const columns = [
  columnHelper.accessor("subdomain", {
    cell: (info) => info.getValue(),
    header: "subdomain",
  }),
  columnHelper.accessor("owner", {
    cell: (info) => info.getValue(),
    header: "Owner",
  }),
  columnHelper.accessor("createdAt", {
    cell: (info) => info.getValue(),
    header: "Updated At",
  }),
];

type BucketTableProp = {
  buckets: Bucket[],
}

const BucketsTable = (props: BucketTableProp) => {
  return (
    <DataTable columns={columns} data={props.buckets}></DataTable>
  )
}

export default BucketsTable
