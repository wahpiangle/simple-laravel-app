import { useQueryClient, useMutation, useQuery } from "react-query"
import axiosClient from "../axios-client"
import Loader from "../components/Loader"
import { Link } from "react-router-dom"
import toast from "react-hot-toast"

export default function Users() {
    const queryClient = useQueryClient()
    const getUsers = async () => {
        return await axiosClient.get('/users')
            .catch(() => {
                toast.error('Error loading users')
            })
    }

    const deleteUser = useMutation((async (id) => {
        await axiosClient.delete(`/users/${id}`)
            .then(() => {
                toast.success('User deleted')
            })
            .catch(() => {
                toast.error('Error deleting user')
            })
            .finally(()=>{
                queryClient.invalidateQueries('userData')
            })
    }))
    const { isLoading, error, data, isFetching } = useQuery('userData', getUsers);
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
                    { isFetching ? <tbody>
                        <tr>
                            <td colSpan="5" className="text-center">Loading...</td>
                        </tr>
                    </tbody>
                    :
                    <tbody>
                        {data.data.data.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.created_at}</td>
                                <td className="flex gap-1">
                                    <Link to={`/users/${user.id}`} className="btn-edit">Edit</Link>
                                    <button onClick={() => deleteUser.mutate(user.id)} className="btn-delete">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>}
                </table>
            </div>
        </div>
    )
}
