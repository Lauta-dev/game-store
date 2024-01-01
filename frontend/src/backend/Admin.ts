import { authBackendPath } from "../metadata";
import { UserToken } from "../util/GetToken";
import { Devuelve, fetching } from "../util/fetch";

interface asd extends Devuelve {
  json: { statusCode: number, msj: string, authorized: boolean }
}

export class Admin {
  static async isAdmin() {
    const token = UserToken.getToken()

    if (!token) {
      return
    }

    const data: asd = await fetching({
      url: authBackendPath.verifyAdmin,
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })

    if (data.status === 401) return false
    if (data.isError) return false
    if (!data.json) return false

    const { authorized } = data.json

    return authorized
  }
}
