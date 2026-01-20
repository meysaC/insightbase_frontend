import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import AuthLayout from "@/layouts/AuthLayout";
import ChatPage from "@/pages/ChatPage";
import ErrorPage from "@/pages/ErrorPage";
import DocumentPage from "@/pages/DocumentPage"
import UserPage from "@/pages/UserPage";
import SignUpPage from "@/pages/SignUpPage";
import HomePage from "@/pages/HomePage";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
        <Route path="/" element={ <MainLayout /> }  errorElement={ <ErrorPage /> } >
            <Route path="/" element={ <HomePage /> } />
            <Route path="/chats" element={ <ChatPage /> } />
            <Route path="/documents" element={ <DocumentPage /> } />
            <Route path="/users" element={ <UserPage /> } />
            <Route path="/users" element={ <UserPage /> } />
            {/* <Route path="/signup" element={ <SignUpPage /> } /> */}
        </Route>

        <Route path="/" element={ <AuthLayout /> }  errorElement={ <ErrorPage /> } >
            <Route path="/" element={ <HomePage /> } />
            <Route path="/signup" element={ <SignUpPage /> } />
        </Route>
        </>
    )
)
