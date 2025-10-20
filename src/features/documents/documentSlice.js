import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    uploadDocument,
    fetchDocuments,
    fetchDocumetById,
    deleteDocument,
} from "./documentService"

// Fetch All
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

// Upload
export const addDocument = createAsyncThunk(
    "documents/upload",
    async (file, thunkAPI) => {
        try {
            return await uploadDocument(file)
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

// Delete
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


        // Remove
        .addCase(removeDocument.fulfilled, (state, action) => {
            state.list = state.list.filter((d) => d.id !== action.payload)
        })
    },
})

export default documentSlice.reducer