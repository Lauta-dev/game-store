import { useEffect, useState } from "react";
import { Admin } from "../../backend/Admin";
import { Link } from "wouter";

export function Users() {
  const [isAdmin, setIsAdmin] = useState<boolean>()

  useEffect(() => {
    async function admin() {
      return setIsAdmin(await Admin.isAdmin())
    }

    admin()
  }, [])

  if (isAdmin === undefined || isAdmin === null) return

  if (!isAdmin) {
    // Ver una forma de llevar al usuario a / 
    return <><h1>Us, no debe estar aquí</h1></>
  }

  return (
    <>
      <Link href="/admin/users">Ver usuarios</Link>
    </>
  )
}
