import { useState, useEffect } from 'react'

const UserList = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const url = 'https://raw.githubusercontent.com/rdappel/courses/master/support-files/ajs/users.json'
                const response = await fetch(url)

                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`)
                }

                const data = await response.json()
                setUsers(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchUsers()
    }, [])

    if (loading) return <div>Loading Users...</div>
    if (error) return <div>Error: {error}</div>

    return (
        <div>
            <ul>
                {users.map(({ id, name, role }) => (
                    <li key={id}>{name} - {role}</li>
                ))}
            </ul>
        </div>
    )
}

export default UserList