import React, { useState } from 'react'
import { Dialog,
        DialogTrigger,
        DialogContent,
        DialogHeader,
        DialogTitle,
        DialogDescription,
        DialogFooter,
        Button,
        Input,
        Label,
 } from "@/components/ui/dialog-1"
import { useDispatch } from 'react-redux'
import { updateDocument } from "@/features/documents/documentSlice"
import { Pencil } from "lucide-react"
import { formatDateTR } from '@/utils/date';
import { Checkbox } from '@/components/ui/checkbox';

// document propu alıyoruz,
const UpdateDocument = ({ document }) => {
  const dispatch = useDispatch()
  const [ openModal, setOpenModal ] = useState(false)

  const [formData, setFormData] = useState({
    id: document?.id || "",
    userFileName: document?.userFileName || "",
    documentType: document?.documentType == "undefined" || "" || null 
                                          ? "Belirtilmemiş" 
                                          : document?.documentType,
    legalArea: document?.legalArea == "undefined" || "" || null 
                                    ? "Belirtilmemiş" 
                                    : document?.legalArea,
    createdAt: document?.createdAt || "",
    updatedAt: document?.updatedAt || "",
    isPublic: document?.isPublic || false,
  })

  const handlechange = (e) => {
    const { name, value, type, checked } = e.target 
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      await dispatch(updateDocument( {id: document.id, request: formData}))
      setOpenModal(false)
    } catch (error) {
      console.log("Update document failed", error)
    }
  }

  return (
        <Dialog open={openModal} onOpenChange={setOpenModal} >
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" onClick={() => setOpenModal(true)} >
              <Pencil className='h-4 w-4'/>
            </Button>
          </DialogTrigger>

        {/* Modal İçeriği */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dosyayı Güncelle</DialogTitle>
            <DialogDescription>
              {document?.fileName} dosya üzerinde değişiklik yapabilirsiniz.
            </DialogDescription>
          </DialogHeader>--

          <form onSubmit={handleSubmit} className='space-y-4'> 
            <div>
              <Label className="userFileName pb-2">Dosya Adı</Label>
              <Input 
                  id="userFileName"
                  name="userFileName"
                  value={formData.userFileName}
                  onChange={handlechange}
                  />
            </div>
            <div>
              <Label className="documentType pb-2">Döküman Tipi</Label>
              <Input 
                  id="documentType"
                  name="documentType"
                  value={formData.documentType}
                  onChange={handlechange}
                  />
            </div>
            <div>
              <Label className="legalArea pb-2">Hukuk Alanı</Label>
              <Input 
                  id="legalArea"
                  name="legalArea"
                  value={formData.legalArea}
                  onChange={handlechange}
                  />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="createdAt pb-2">Oluşturulma Tarihi</Label>
                <Input 
                    id="createdAt"
                    name="createdAt"
                    value={formatDateTR(formData.createdAt)}
                    disabled
                    />
              </div>
              <div>
                <Label className="legalArea pb-2">Güncellenme Tarihi</Label>
                <Input 
                    id="updatedAt"
                    name="updatedAt"
                    value={formatDateTR(formData.updatedAt)}
                    disabled
                    />
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="flex items-center gap-2">
                <Label className="isPublic">Herkese açık mı?</Label>
                <Checkbox 
                  id="isPublic"
                  checked={formData.isPublic}
                  onCheckedChange={(checked) => 
                    setFormData({...formData, isPublic: checked})
                  }
                />
              </div>
            </div>

            <DialogFooter>
              <Button type="submit">Kaydet</Button>
            </DialogFooter>

          </form>
        </DialogContent>
        </Dialog>

  )
}
export default UpdateDocument