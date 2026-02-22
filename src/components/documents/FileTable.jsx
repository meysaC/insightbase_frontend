import React, { useEffect } from 'react'
import { DataTable } from "@/components/ui/basic-data-table";
import { getDocuments, removeDocument } from '@/features/documents/documentSlice';
import { useDispatch, useSelector } from 'react-redux';
import UpdateDocument from './UpdateDocument';
import UploadDocument from './UploadDocument';
import { Trash } from "lucide-react"
import { Button } from '../ui/dialog-1';
import { useAuth } from '@/hooks/useAuth';
import { formatDateTR } from '@/utils/date';

const FileTable = () => {
  const { list, loading, pagination } = useSelector((state) => state.documents) 
  const dispatch = useDispatch()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if(isAuthenticated) {
      dispatch(getDocuments({page: 1, pageSize: 20}))
    }
  }, [isAuthenticated, dispatch])

  const handleDelete = (id) => {
    const confirmed = window.confirm("Bu dosyayı silmek istediğinize emin misiniz?")
    if(confirmed) {
      dispatch(removeDocument(id))
    }
  }

  const columns = [
    { key: "userFileName", header: "Dosya Adı", sortable: true, filterable: true },
    // { key: "documentType", header: "Dosya Tipi", sortable: true, filterable: true },
    { key: "createdAt", header: "Oluşturulma Tarihi", sortable: true, filterable: true, 
        render: (value) => formatDateTR(value)
      },
    { key: "legalArea", header: "Hukuk Alanı", sortable: true, filterable: true,
        render: (value) => value == "undefined" ? "Belirtilmemiş" : value
     },
    { 
      key: "isPublic", header: "Açık mı", sortable: true, filterable: false,
      render: (value) => (value ? "Evet" : "Hayır")
    },
    { key: "filePath", header: "Dosya Yolu", 
      render: (_, row) => (
        <button 
          onClick={() => window.open(row.filePath, "_blank")}
          className="text-blue-400 underline"
        >
          Görüntüle
        </button>
      ) 
    },
    {
      key: "actions", header: "İşlemler",
      render: (_, row) => (
        <div className="flex items-center gap-3">
           <UpdateDocument document={row} />   {/* <── id ve diğer bilgileri buradan alır */}
           <Button variant="outline" size="sm" onClick={() => handleDelete(row.id)}>
              <Trash />
           </Button>
        </div>
      )
    }
  ];

{/*data={ data } columns = { columns } searchable itemsPerPage = { 10} */}
  return (
    <div className= "max-w-6xl w-[95%] mx-auto pt-10" > 
      <UploadDocument />
      <DataTable 
        data={ list || [] }
        columns={columns}
        searchable
        itemsPerPage={10}
        loading={loading}
        />
     </div>  
  )
}

export default FileTable