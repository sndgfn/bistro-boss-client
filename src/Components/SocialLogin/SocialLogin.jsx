import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";



const SocialLogin = () => {
    const { googleSignIn } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const navigate=useNavigate();

    const handleGoogleSignIN = () => {
        googleSignIn()
            .then(res => {
                console.log(res.user);
                const userInfo={
                    email:res.user?.email,
                    name:res.user?.displayName
                }
                axiosPublic.post('/users',userInfo)
                .then(res=>{
                    console.log(res.data);
                    navigate('/')
                })
            })
    }
    return (
        <div className="p-8">
            <div className="divider">
                <button onClick={handleGoogleSignIN}>
                    GOOGLE
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;