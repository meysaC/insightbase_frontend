import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    uploadDocument,
    fetchDocuments,
    fetchDocumetById,
    updateDocumentById,
    deleteDocument,
} from "./documentService"

// Fetch All Document
export const getDocuments = createAsyncThunk(
    "documents/fetchAll",
    async ({page = 1, pageSize = 20}, thunkAPI) => {
        try {
            return await fetchDocuments(page, pageSize)
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

// Fetch Document
export const getDocument = createAsyncThunk(
    "documents/document",
    async (id, thunkAPI) => {
        try {
            return await fetchDocumetById(id)
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

// Upload Document
export const addDocument = createAsyncThunk(
    "documents/upload",
    async ({ file, metaData }, thunkAPI) => {
        try {
            return await uploadDocument(file, metaData)
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

// Update Document
export const updateDocument = createAsyncThunk(
    "documents/update",
    async({id, request}, thunkAPI) => {
        try {
            return await updateDocumentById(id, request)
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message)
        }
    }
)

// Delete Document
export const removeDocument = createAsyncThunk(
    "documents/delete",
    async (id, thunkAPI) => {
        try {
            await deleteDocument(id);
            return id
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

const documentSlice = createSlice({
    name: "documents",
    initialState: {
        list: [],
        loading: false,
        error: null,
        pagination: { page: 1, totalPages: 1, totalCount: 0},
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

        // Fetch All
        .addCase(getDocuments.pending, (state) => {
            state.loading = true
        })
        .addCase(getDocuments.fulfilled, (state, action) => {
            state.loading = false
            state.list = action.payload.items || action.payload.Items || []
            state.pagination = {
                page: action.payload.page,
                totalPages: action.payload.totalPages,
                totalCount: action.payload.totalCount,
            }
        })
        .addCase(getDocuments.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })


        // Fetch Document
        .addCase(getDocument.pending, (state) => {
            state.loading = true
        })
        .addCase(getDocument.fulfilled, (state, action) => {
            state.loading = false
            state.list = action.payload.items || action.payload.Items || []
        })
        .addCase(getDocument.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })


        // Upload
        .addCase(addDocument.fulfilled, (state, action) => {
            state.list.push(action.payload)
        })

        // Update
        .addCase(updateDocument.fulfilled, (state, action) => {
            const updatedDoc = action.payload
            const index = state.list.findIndex(doc => doc.id === updatedDoc.id)
            if ( index !== -1)
            {
                state.list[index] = updatedDoc
            } else {
                state.list.push(updatedDoc)
            }
        })

        // Remove
        .addCase(removeDocument.fulfilled, (state, action) => {
            state.list = state.list.filter((d) => d.id !== action.payload)
        })
    },
})

export default documentSlice.reducer