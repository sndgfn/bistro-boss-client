import { useContext, useEffect, useState } from 'react';
// import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { AuthContext } from '../../Providers/AuthProvider';
import Swal from 'sweetalert2';
import 'animate.css'; // Ensure animate.css is imported for animations
import SocialLogin from "../../Components/SocialLogin/SocialLogin";


const Login = () => {
    const [disabled, setDisabled] = useState(false); // Set default to false since captcha is disabled
    const navigate = useNavigate();
    const location = useLocation();
    const { signIn } = useContext(AuthContext);
    const from = location.state?.from?.pathname || '/';

    // useEffect(() => {
    //     loadCaptchaEnginge(6); // Load captcha with 6 characters
    // }, []);

    const handleLogin = async (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value.trim();
        const password = form.password.value.trim();

        if (!email || !password) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Email and password are required.',
            });
            return;
        }

        try {
            const result = await signIn(email, password);
            Swal.fire({
                icon: 'success',
                title: 'Login Successful',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown',
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp',
                },
            });
            navigate(from, { replace: true });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: error.message || 'Something went wrong. Please try again.',
            });
        }
    };

    // const handleValidateCaptcha = (e) => {
    //     const userCaptchaValue = e.target.value.trim();
    //     if (validateCaptcha(userCaptchaValue)) {
    //         setDisabled(false);
    //     } else {
    //         setDisabled(true);
    //     }
    // };

    return (
        <>
            <Helmet>
                <title>Bistro Boss | Login</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col md:flex-row-reverse">
                    <div className="text-center md:w-1/2 lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
                            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                    <div className="card md:w-1/2 max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="email"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="password"
                                    className="input input-bordered"
                                    required
                                />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">
                                        Forgot password?
                                    </a>
                                </label>
                            </div>
                            {/* <div className="form-control">
                                <label className="label">
                                    <LoadCanvasTemplate />
                                </label>
                                <input
                                    onChange={handleValidateCaptcha}
                                    type="text"
                                    name="captcha"
                                    placeholder="Type the captcha above"
                                    className="input input-bordered"
                                    required
                                />
                            </div> */}
                            <div className="form-control mt-6">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={disabled}
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                        <p>
                            <small>
                                New Here? <Link to="/signup">Create an account</Link>
                            </small>
                        </p>
                        <SocialLogin></SocialLogin>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
