import { RouterProvider } from "react-router-dom";
import { AuthProvider, ToastProvider } from "@/app/providers";
import { router } from "@/app/router";

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </AuthProvider>
  );
}
