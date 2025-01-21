import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { FaUser } from "react-icons/fa";
import Swal from "sweetalert2";


const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users',{
                headers:{
                    authorization:`Bearer ${localStorage.getItem('access-token')}`
                }
            });
            return res.data;
        }
    })
    //make admin 
    const handleMakeAdmin = (user) => {
        axiosSecure.patch(`users/admin/${user._id}`)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Updated!",
                        text: "User role updated successfully.",
                        icon: "success"
                    })
                }
            })

    }


    //delete 
    const handleDeleteUser = (user) => {
        console.log(user);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });

                        }
                    });
            }
        });
    }
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <th>{user.name}</th>
                                <td>{user.email}</td>
                                <td>
                                    {
                                        user.role === 'admin' ? 'ADMIN' : <>
                                            <button
                                                onClick={() => handleMakeAdmin(user)}
                                                className="btn btn-ghost btn-lg bg-gradient-to-l text-green-600">
                                                <FaUser></FaUser>
                                            </button>
                                        </>
                                    }

                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDeleteUser(user)}
                                        className="btn btn-ghost btn-lg text-red-600">
                                        delete
                                    </button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;