import { RouterProvider } from "react-router-dom"
import { router } from "@/routes/AppRouter"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { boostrapAuth } from "@/features/auth/authThunks" //fetchMe

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(boostrapAuth()); //fetchMe
  }, [])

  return <RouterProvider router={router} />
}

export default App
