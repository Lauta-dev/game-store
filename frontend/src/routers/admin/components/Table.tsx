import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { admin } from "@/metadata"
import { UserToken } from "@/util/GetToken"
import { fetching } from "@/util/fetch"
import { useEffect, useState } from "react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"


interface UserData {
  createAt: string,
  firtName: string,
  lastName: string,
  rol: string,
  userId: string,
  userName: string
}

export function TableUser() {
  const [users, setUsers] = useState<UserData[]>([])
  const [tableHeader, setTableHeader] = useState<string[]>([])
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [user, setUser] = useState<UserData>()
  const [limitInSQL, setLimitInSQL] = useState<number>(5)
  const token = UserToken.getToken()

  async function getUsers(take?:number) {
    const data = await fetching({
      url: admin.getAllUsers(take),
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })

    setUsers(data.json.users)
    setTableHeader(data.json.tableHead)
  }

  useEffect(() => {
    getUsers()
  }, [])

  /* 
    Eliminar usuario de la base de datos

    La API devuelve 3 elementos
      + messaje: string;
      + statusCode: 200 | 404;
      + newUsers?: NewUsers | boolean;
  */
  async function removeUser(userId: string | undefined) {
    if (!userId) return

    const token = UserToken.getToken()

    const { json } = await fetching({
      url: admin.deleteUser,
      method: "DELETE",
      body: { "userId": userId },
      headers: { Authorization: `Bearer ${token}` }
    })

    const { statusCode } = json

    if (statusCode !== 200){
      return
    }

    const { users } = json.newUsers
    setUsers(users)
  }


  return (
    <>
      <section>
        <Button onClick={() => { 
          setLimitInSQL(limitInSQL + 5)
          console.log(limitInSQL)
          getUsers(limitInSQL)
        }}>Cargar más usuarios</Button>
        <Button>Cargar todos los usuarios</Button>
      </section>

      <Table>
        <TableHeader>
          <TableRow>
            {tableHeader && tableHeader.map(head => (
              <TableHead key={head}>{head}</TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {users && users.map(data => (
            <TableRow className="hover:bg-gray-200" key={data.userName}>
              <TableCell>{data.userId}</TableCell>
              <TableCell>{data.userName}</TableCell>
              <TableCell>{data.firtName}</TableCell>
              <TableCell>{data.lastName}</TableCell>
              <TableCell>{data.rol}</TableCell>
              <TableCell>{data.createAt}</TableCell>
              <TableCell>
                <Button variant={"destructive"} onClick={() => {
                    setUser(data)
                    setOpenModal(!openModal)
                  }}>
                  Eliminar
                </Button>
              </TableCell>

              <TableCell>
                <Button variant="destructive">
                  Editar
                </Button>
              </TableCell>
              
            </TableRow>
          ))}
        </TableBody>
        <TableCaption>Cantidad de usuarios: {users.length}</TableCaption>
      </Table>


      <AlertDialog open={openModal}>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Eliminar a: {user?.userName}
                          
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setOpenModal(!openModal)}>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={() => {
                          removeUser(user?.userId)
                          setOpenModal(!openModal)
                        }}>Eliminar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>


    </>
  )
}

