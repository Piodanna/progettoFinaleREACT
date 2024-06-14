import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export function Protected( {children} ){
    const user = useSelector(state => state.user.value);

    if(user.isLogged){
        return <>{children}</>
    }
    else {
        console.log("Here");
        return <Navigate to={"/"} />
    }
}