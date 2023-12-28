interface LocalStorageInterface {
	name: string;
	body: object;
}

export class LocalStorage {
	save({ name, body }: LocalStorageInterface) {
		const value = localStorage.setItem(name, JSON.stringify(body));
		return value;
	}

	get({ name }: Pick<LocalStorageInterface, "name">) {
		const value = JSON.parse(localStorage.getItem(name) as string);

		if (value === null) {
			return;
		}

		return value;
	}

	remove({ name }: Pick<LocalStorageInterface, "name">) {
		const value = this.get({ name });

		if (value == null || value == undefined) {
			return;
		}

		localStorage.removeItem(name);
	}
}
