import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ViewShopOwner = () => {

    const [owners, setOwners] = useState([]);

    useEffect(() => {
        const fetchOwners = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/admin/view-owner");
                const data =await response.json();
                setOwners(data);
            }catch (error){
                console.error("Error fetching owners:", error);
            }
        };
        fetchOwners();
    }, []);

    return (
       <div className="container max-auto">
        <div className="px-4">
            <h2 className="text-2xl font-bold my-4">All Shop Owners</h2>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">S.no</th>
                        <th className="border p-2">Shop owner detail</th>
                    </tr>
                </thead>
                <tbody>
                    {owners.length > 0 ? (
                        owners.map((owner , index) => (
                            <tr key={owner._id}>
                                <td className="border p-2 text-center" > {index + 1 }</td>
                                <td className="border p-2 " > <strong>Name:- </strong> 
                                {owner.name} <br /> 
                                <strong> Phone:-</strong> {owner.phone} <br /> 
                                <strong> shopName:- </strong> {owner.shopName} <br /> 
                                <strong> Email id:- </strong> {owner.email} <br /> 
                                <strong> City:- </strong> {owner.city} <br /> 
                                <strong> state:- </strong> {owner.state} <br /> 
                                <strong> Country:- </strong> {owner.country} <br /> 
                                <Link to={`/Offeerwhisky-admin/viewshopowner/viewusers/${owner._id}`} className="text-blue-500 underline">View Users</Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center p-4 text-gray-500">No users found</td>
                        </tr>
                    )}
                </tbody>

            </table>
        </div>
            
        </div>
    )
}

export default ViewShopOwner;