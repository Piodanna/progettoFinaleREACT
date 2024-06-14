import { useState } from "react";
import { AuthContext } from "./AutoContext";

export function AuthContextProvider({children}){
    const [user, setUser] = useState({
        username: "pio33",
        password: "12345"
    });

    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    );
}