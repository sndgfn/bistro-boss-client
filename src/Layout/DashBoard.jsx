import { FaAd, FaBook, FaCalendar, FaHome, FaList, FaSearch, FaShoppingCart, FaUser, FaUtensils, FaVoicemail } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";



const DashBoard = () => {

    const [cart] = useCart();
    const [isAdmin] = useAdmin();
    // const isAdmin=true;

    return (
        <div className="flex">
            {/* dashboard side bar  */}
            <div className="w-64 min-h-screen bg-orange-500">
                <ul className="menu p-4 text-black ">
                    {
                        isAdmin ?
                            <>
                                <li>
                                    <NavLink to="/dashboard/adminHome">
                                        <FaHome></FaHome>
                                        Admin Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/addItems">
                                        <FaUtensils></FaUtensils>
                                        Add Items</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/manageItems">
                                        <FaList></FaList>
                                        Manage items</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/booing">
                                        <FaBook></FaBook>
                                        Manage Bookings</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/users">
                                        <FaUser></FaUser>
                                        All Users</NavLink>
                                </li>
                            </> :
                            <>
                                <li>
                                    <NavLink to="/dashboard/userHome">
                                        <FaHome></FaHome>
                                        User Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/history">
                                        <FaCalendar></FaCalendar>
                                        Not History</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/cart">
                                        <FaShoppingCart></FaShoppingCart>
                                        My Cart ({cart.length})</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/review">
                                        <FaAd></FaAd>
                                        Add a Review</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/paymentHistory">
                                        <FaList></FaList>
                                        Real Payment History</NavLink>
                                </li>
                            </>
                    }

                    <div className="mt-32 divider divider-primary">Primary</div>
                    {/* shared dashboard navlinks */}
                    <li>
                        <NavLink to="/">
                            <FaHome></FaHome>
                            Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/order/salad">
                            <FaSearch></FaSearch>
                            Menu</NavLink>
                    </li>
                    <li>
                        <NavLink to="/order/contact">
                            <FaVoicemail></FaVoicemail>
                            User Home</NavLink>
                    </li>
                </ul>
            </div>
            {/* dashboard content */}
            <div className="flex-1 p-4">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashBoard;