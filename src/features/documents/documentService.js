import api from "@/services/api"

// Upload document
export const uploadDocument = async (file, metaData) => {
    const formData = new FormData()
    formData.append("file", file) // Backend tarafında [FromForm] UploadFileRequest.File eşleşmeli

    Object.entries(metaData).forEach(([key, value]) => {
        formData.append(key, value)
    })

    const res = await api.post("/Documents", formData, {
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
    const res = await api.get(`/Documents/${id}`)
    return res.data
}

// Update
export const updateDocumentById = async (id, request) => {
    const res = await api.put(`/Documents/${id}`, request) // request json body olarak gidiyor
    return res.data
}

// Delete 
export const deleteDocument = async (id) => {
    await api.delete(`/Documents/${id}`)
}