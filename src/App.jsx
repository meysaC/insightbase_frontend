import { RouterProvider } from "react-router-dom"
import { router } from "@/routes/AppRouter"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { fetchMe } from "@/features/auth/authThunks"

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchMe());
  }, [])

  return <RouterProvider router={router} />
}

export default App
