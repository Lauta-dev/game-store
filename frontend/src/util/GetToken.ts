import { LocalStorage } from "./LocalStorage";

export class UserToken {
	static getToken(): string | undefined {
		const getToken = new LocalStorage().get({ name: "token" });

		if (getToken === undefined || getToken === null) {
			return undefined;
		}

		const token = getToken.token;

		return token;
	}

	static removeToken(): void {
		const token = new LocalStorage();
		token.remove({ name: "token" });
	}
}
