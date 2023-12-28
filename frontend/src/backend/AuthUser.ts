import { authBackendPath } from "../metadata";
import { UserToken } from "../util/GetToken";
import { fetching } from "../util/fetch";

interface UserDataCreate {
	username: string;
	firstname: string;
	lastname: string;
}

export class AuthUser {
	static async loginUser(username: string): Promise<any> {
		const authUser = await fetching({
			url: authBackendPath.login,
			method: "POST",
			body: { userName: username },
		});

		return authUser;
	}

	static async createUser({ username, lastname, firstname }: UserDataCreate) {
		const createUser = await fetching({
			url: authBackendPath.create,
			method: "POST",
			body: { firtName: firstname, lastName: lastname, userName: username },
		});

		return createUser;
	}

	static async verifyUser () {
		const token = UserToken.getToken()

		const verify = await fetching({
			url: authBackendPath.verify,
			method: "GET",
			headers: { Authorization: `Bearer ${token}` },
		})

		if (verify.isError && verify.status === 401) {
			return false
		}

		return true
	}
}
