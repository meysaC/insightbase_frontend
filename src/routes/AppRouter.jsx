import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import ChatPage from "@/pages/ChatPage";
import ErrorPage from "@/pages/ErrorPage";
import DocumentPage from "@/pages/DocumentPage"
import UserPage from "@/pages/UserPage";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={ <MainLayout /> }  errorElement={ <ErrorPage /> } >
            <Route path="/chats" element={ <ChatPage /> } />
            <Route path="/documents" element={ <DocumentPage /> } />
            <Route path="/users" element={ <UserPage /> } />
        </Route>
    )
)
