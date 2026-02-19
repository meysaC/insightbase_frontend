import { RouterProvider } from "react-router-dom"
import { router } from "@/routes/AppRouter"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { bootstrapAuth } from "@/features/auth/authThunks" //fetchMe

function App() {
  const dispatch = useDispatch()
const { isInitialized } = useSelector((state) => state.auth); //, user, error

  useEffect(() => {
    dispatch(bootstrapAuth()); //fetchMe
  }, [])

  //   // ✅ Debug: Bootstrap sonuçlarını logla
  // useEffect(() => {
  //   if (isInitialized) {
  //     console.log("✅ Bootstrap completed:", { 
  //       authenticated: !!user, 
  //       user,
  //       error 
  //     });
  //   }
  // }, [isInitialized, user, error]);

    // Loading state
  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-slate-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-500 mx-auto mb-4"></div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return <RouterProvider router={router} />
}

export default App
