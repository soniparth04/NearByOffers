import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewShopUser = () => {
    const { ownerId } = useParams();
    const [users, setUsers] = useState([]);
    const [shopName, setShopName] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/admin/view-shop-user/${ownerId}`);
                const data = await response.json();
                setUsers(data.users);
                setShopName(data.shopName); // Fetching shop name from response
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, [ownerId]);

    return (
        <div className="container max-auto">
            <div className="px-4">
                <h2 className="text-2xl font-bold my-4">{shopName} Users</h2>
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">S.no</th>
                            <th className="border p-2">User Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map((user, index) => (
                                <tr key={user._id}>
                                    <td className="border p-2 text-center">{index + 1}</td>
                                    <td className="border p-2">
                                        <strong>Name:</strong> {user.name} <br />
                                        <strong>Phone:</strong> {user.phone} <br />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2" className="text-center p-4 text-gray-500">No users found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewShopUser;
