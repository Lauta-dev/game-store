import { z } from "zod";
import { FormInput } from "./Create-user";

/**
 * Validar:
 *  El largo de caracteres,
 *  Si todos son strings,
 */

const User = z.object({
	first_name: z
		.string({ required_error: "El nombre es requerido" })
		.max(100, { message: "El nombre tiene que tener maximo 100 caracteres" })
		.min(5, { message: "El nombre tiene que tener minimo 5 caracteres" }),

	last_name: z
		.string({ required_error: "El apellido es requerido" })
		.max(100, { message: "El apellido tiene que tener maximo 100 caracteres" })
		.min(5, { message: "El apellido tiene que tener minimo 5 caracteres" }),

	user_name: z
		.string({ required_error: "El nombre de usuario es requerido" })
		.max(50, {
			message: "El nombre de usuario tiene que tener maximo 50 caracteres",
		})
		.min(5, {
			message: "El nombre de usuario tiene que tener minimo 5 caracteres",
		}),
});

function validation({ first_name, last_name, user_name }: FormInput) {
	return User.safeParse({ first_name, last_name, user_name });
}

export function saveUser({ first_name, last_name, user_name }: FormInput) {
	return validation({
		first_name,
		last_name,
		user_name,
	});
}
