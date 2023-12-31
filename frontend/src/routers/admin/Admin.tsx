import { useEffect, useState } from "react";
import { Route, Router } from "wouter";
import { Admin } from "../../backend/Admin";
import { Users } from "./Users";
import { TableUser } from "./components/Table";

function AdminAccess() {
  return (
    <>
      <Users />
    </>
  )
}

export function AdminPath() {
  const [isAdmin, setIsAdmin] = useState<boolean>()

  useEffect(() => {
    async function admin() {
      return setIsAdmin(await Admin.isAdmin())
    }

    admin()
  }, [])

  return (
    <Router base="/admin">
      {
        isAdmin
          ? <>
            <AdminAccess />
            <Route path="/users" component={TableUser} />
          </>
          : isAdmin === undefined || isAdmin === null ? null : "NO"
      }

    </Router>
  )
}
