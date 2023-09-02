import { useQuery } from "react-query"
import axiosClient from "../axios-client"
import Loader from "../components/Loader"
import { Link } from "react-router-dom"

export default function Users() {
    const getUsers = async() =>{
        return await axiosClient.get('/users')
            .catch(() => {
                console.log('error')
            })
    }
    const { isLoading, error, data } = useQuery('userData', getUsers);

    if (isLoading) return <Loader />

    if (error) return <div>Error</div>
    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="font-semibold text-lg">Users</h1>
                <Link to="/users/new" className="btn-add">Add new</Link>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Create Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.data.data.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.created_at}</td>
                                <td className="flex gap-1">
                                    <Link to={`/users/${user.id}`} className="btn-edit">Edit</Link>
                                    <button className="btn-delete">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
