import { Router, useLocation } from "wouter";
import { Users } from "./Users";
import { useAdmin } from "@/hook/isAdmin";
import { RouterAdmin } from "./Routers";

export function AdminPath() {
  const { isAdmin, loading } = useAdmin()

  if (!useLocation()[0].startsWith("/admin")) {
    return
  }

  return (
    <Router base="/admin">
      {!loading && "Cargando"}
      {loading && !isAdmin && "No tenes permiso de esta aca"}
      
      {isAdmin && loading && (
        <>
          <Users />
          <RouterAdmin />
        </>
      )}

  
    </Router>
  )
}
