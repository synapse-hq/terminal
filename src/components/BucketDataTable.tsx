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

  
  const scroll = {   
    backgroundColor: "#F5F5F5",
    border: "1px solid #DDDDDD",
    borderRadius: "4px 0 4px 0",
    color: "#3B3C3E",
    fontSize: "12px",
    fontWeight: "bold",
    left: "-1px",
    padding: "10px 7px 5px",
    point: "cursor"
  }

  const withScroll = {
    height: "700px",
    overflow: "scroll",
    overflowX: "hidden",
  }

  return (
    <div style={withScroll}>
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
            <Tr style={scroll}>
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
