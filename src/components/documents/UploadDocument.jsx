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
 import { addDocument } from "@/features/documents/documentSlice"
import { FilePlus } from "lucide-react"
import FileUpload from '@/components/documents/FileUpload';


const UploadDocument = () => {
    const dispatch = useDispatch()
    const [ selectedFiles, setSelectedFiles ] = useState([])

    const handleFileSelect = (files) => {
        console.log("Child'dan gelen files:", files)
        setSelectedFiles(files)
    }

    const [formData, setFormData] = useState({
        userFileName: "",
        documentType: "",
        legalArea: "",
        isPublic: false,
    })

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target 
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }))
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()

        if(selectedFiles.length === 0 ) {
            console.error("Lütfen bir dosya seçin.")
            return
        }

        try {
            const uploadData = new FormData()
            uploadData.append("file", selectedFiles[0]) // ilk dosyayı alıyoruz
            uploadData.append("UserFileName", formData.userFileName)
            uploadData.append("DocumentType", formData.documentType)
            uploadData.append("LegalArea", formData.legalArea)
            uploadData.append("IsPublic", formData.isPublic.toString()) // form data string olarak yolluyor, c# bool bekliyorsa doğru parse eder ama emin olmak için 

            console.log("Gönderilen FormData:", [...uploadData.entries()])

            await dispatch(addDocument({
                file: selectedFiles[0],
                metaData: {
                    UserFileName: formData.userFileName,
                    DocumentType: formData.documentType,
                    LegalArea: formData.LegalArea,
                    IsPublic: formData.isPublic,
                }
            }))


            alert("Dosya yükleme isteği gönderildi.")
        } catch (error) {
            console.log("Upload document failed", error)
        }
    }

  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button variant="outline" size="lg" className="mb-2">
                Yeni Dosya Ekle
                <FilePlus />
            </Button>
        </DialogTrigger>

        <DialogContent>
            <DialogHeader>
                <DialogTitle>Dosya Yükle</DialogTitle>
                <DialogDescription>
                    Yeni dosyayı buradan yükleyebilirsiniz.
                </DialogDescription>
            </DialogHeader>

            <FileUpload  onFileSelect={handleFileSelect} />

            <form onSubmit={handleSubmit} className='space-y-4' >

            <div>
                <Label htmlFor="userFileName" className="userFilename pb-2" >Dosya Adı</Label>
                <Input 
                    id="userFileName"
                    name="userFileName"
                    value={formData.userFileName}
                    onChange={handleChange}
                    placeholder="Dosya adı giriniz."
                />
            </div>


            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    id="isPublic"
                    name="isPublic"
                    checked={formData.isPublic}
                    onChange={handleChange}
                    />
                <Label htmlFor="isPublic">Herkese Açık</Label>
            </div>


            <DialogFooter>
                <Button type="submit">Yükle</Button>
            </DialogFooter>

            </form>

        </DialogContent>
    </Dialog>
  )
}

export default UploadDocument