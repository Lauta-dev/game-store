import { createContext } from "react";

export const UserContext = createContext(null);

export const UserProvider = async ({ children }: { children: any }) => {
	return (
		<UserContext.Provider value={{ pa: "asd" }}>
			{children}
		</UserContext.Provider>
	);
};
