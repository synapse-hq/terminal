import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  ColumnDef,
} from "@tanstack/react-table";


import { type Bucket } from './types';
import Link from 'next/link';
import axios from "axios"

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

  return (
    <div className="bucket-scroll">
  <Table>
      <Thead>
        <Tr>
          <Th>
            Subdomain
          </Th>
          <Th>
            Created On
          </Th>
        </Tr>
      </Thead>
      <Tbody>

          {data.map(data =>
            <Tr className="scroll-item">
              <>
                <Td>
                  {data.subdomain}
                </Td>

                <Td>
                  {data.createdAt}
                </Td>
                
                <Td>
                  <Link  href={`/Bucket/${encodeURIComponent(data.subdomain)}`} className="inspect-bucket-link">
                    View Bucket
                  </Link>
                </Td> 
              </>
            </Tr>
          )}
      </Tbody>
    </Table>
    </div>
  );
}

export default DataTable
