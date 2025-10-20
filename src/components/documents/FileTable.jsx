import React, { useEffect } from 'react'
import { DataTable } from "@/components/ui/basic-data-table";
import { getDocuments } from '@/features/documents/documentSlice';
import { useDispatch, useSelector } from 'react-redux';

const FileTable = () => {
  const { list, loading, pagination } = useSelector((state) => state.documents)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getDocuments({page: 1, pageSize: 20}))
  }, [dispatch])

    const data = [
    {
      id: 1,
      name: "John DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn Doe",
      email: "john@example.com",
      role: "Admin",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "User",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "User",
      status: "Inactive",
    },
    {
      id: 4,
      name: "Alice Brown",
      email: "alice@example.com",
      role: "Moderator",
    },
    {
      id: 5,
      name: "Charlie Wilson",
      email: "charlie@example.com",
      role: "User",
    },
    {
      id: 6,
      name: "Charlie Wilson",
      email: "charlie@example.com",
      role: "User",
    },
    {
      id: 7,
      name: "Charlie Wilson",
      email: "charlie@example.com",
      role: "User",
    },
    {
      id: 8,
      name: "Charlie Wilson",
      email: "charlie@example.com",
      role: "User",
    },
    {
      id: 9,
      name: "Charlie Wilson",
      email: "charlie@example.com",
      role: "User",
    },
    {
      id: 10,
      name: "Charlie Wilson",
      email: "charlie@example.com",
      role: "User",
    },
    {
      id: 11,
      name: "Charlie Wilson",
      email: "charlie@example.com",
      role: "User",
    },
    {
      id: 12,
      name: "Charlie Wilson",
      email: "charlie@example.com",
      role: "User",
    },
    {
      id: 13,
      name: "Charlie Wilson",
      email: "charlie@example.com",
      role: "User",
    },
    {
      id: 14,
      name: "Charlie Wilson",
      email: "charlie@example.com",
      role: "User",
    },
    {
      id: 15,
      name: "Charlie Wilson",
      email: "charlie@example.com",
      role: "User",
    },
  ];

  const columns = [
    // { key: "id", header: "ID", sortable: true },
    { key: "userFileName", header: "Dosya Adı", sortable: true, filterable: true },
    { key: "documentType", header: "Dosya Tipi", sortable: true, filterable: true },
    { key: "createdAt", header: "Oluşturulma Tarihi", sortable: true, filterable: true },
    { key: "legalArea", header: "Hukuk Alanı", sortable: true, filterable: true },
    { key: "ısPublic", header: "Açık mı", sortable: true, filterable: true,
      render: (value) => (value ? "Evet" : "Hayır") },
  ];

{/*data={ data } columns = { columns } searchable itemsPerPage = { 10} */}
  return (
    <div className= "max-w-6xl w-[95%] mx-auto pt-10" > 
      <DataTable 
        data= { list || [] }
        columns={columns}
        searchable
        itemsPerPage={10}
        loading={loading}
        />
     </div>  
  )
}

export default FileTable