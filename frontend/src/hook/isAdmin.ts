import { Admin } from "@/backend/Admin";
import { useEffect, useState } from "react";

export function useAdmin() {
  const [loading, setLoading] = useState<boolean>(false)
  const [isAdmin, setIsAdmin] = useState<boolean>()

  useEffect(() => {
    async function admin() {
      try {
        setIsAdmin(await Admin.isAdmin())
        
      } catch (error) {
        console.log(error)

      } finally {
        setLoading(true)

      }
    }

    admin()
  }, [])

  return { loading, isAdmin }


}