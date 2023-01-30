import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  ColumnDef,
} from "@tanstack/react-table";


import { type Bucket } from './types';
import Link from 'next/link';

export type DataTableProps<Data extends object> = {
  data: Bucket[];
  columns: ColumnDef<Bucket, any>[];
};

const domain = "https://terminal.diegohernandezramirez.dev/api"

function DataTable<Data extends object>({
  data,
  columns,
}: DataTableProps<Data>) {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  const viewBucket = (e: any) => {
    e.preventDefault();
    let paths = e.target.href.split('/')
    let endpoint = paths[paths.length - 1]
  }

  return (
    <Table>
      <Thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <Tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <Th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </Th>
              );
            })}
          </Tr>
        ))}
      </Thead>
      <Tbody>

          {data.map(data =>
            <Tr>
              <>
                <Td>
                  {data.subdomain}
                </Td>
                <Td>
                  <Link href={`/Bucket/${encodeURIComponent(data.subdomain)}`}>
                    View Bucket
                  </Link>
                </Td>
                <Td>
                  {data.createdAt}
                </Td>
              </>
            </Tr>
          )}
  
        {/* {table.getRowModel().rows.map((row) => (
          <Tr key={row.id}>
            {row.getVisibleCells().map((cell) => {
              return (
                <Td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              );
            })}
          </Tr>
        ))} */}
      </Tbody>
    </Table>
  );
}

export default DataTable
