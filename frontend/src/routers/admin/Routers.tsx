import { Route } from "wouter";
import { TableUser } from "./components/Table";

export function RouterAdmin() {
  return (
    <>
      <Route path="/users" component={TableUser} />
    </>
  )
}