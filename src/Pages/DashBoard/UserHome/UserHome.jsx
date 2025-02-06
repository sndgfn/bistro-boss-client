import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";


const UserHome = () => {
    const { user } = useContext(AuthContext)
    return (
        <div>

        </div>
    );
};

export default UserHome;