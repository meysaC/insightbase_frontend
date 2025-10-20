import api from "@/services/api"

// Upload document
export const uploadDocument = async (file) => {
    const formData = new FormData()
    formData.append("File", file) // Backend tarafında [FromForm] UploadFileRequest.File eşleşmeli
    formData.append("UserFileName", file.name) //opsiyonel

    const res = await api.post("/documents", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    })
    return res.data
}

// Fetch Documents
export const fetchDocuments = async (page= 1, pageSize= 20) => {
    const res = await api.get(`/Documents?page=${page}&pageSize=${pageSize}`)
    return res.data
}

// Fetch By Id
export const fetchDocumetById = async (id) => {
    const res = await api.get(`/documents/${id}`)
    return res.data
}

export const deleteDocument = async (id) => {
    await api.delete(`/documents/${id}`)
}