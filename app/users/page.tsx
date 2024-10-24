import React from 'react'
import Button from '../components/Button';

interface User {
  id: number;
  name: string;
  email: string;
}
const UsersPage = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users', 
    {cache: 'no-store'});
  const users: User[] = await res.json();
  
  // Fetch users from Database
  const dbRes = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/userRoutes`);
  if (!dbRes.ok) {
    console.error('Error fetching database users:', dbRes.statusText);
    return []; // or handle the error as needed
  }
  const dbUsers: User[] = await dbRes.json();
  if (!dbUsers) {
    console.warn('No users found in the database.');
  }  

  return (
    <div>
      <h1>API Users</h1>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Save to DB</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => <tr key={user.id}>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>
            <Button user={user}>Save User</Button>
          </td>
          </tr>)}
        </tbody>
      </table>

      <h1>Database Users</h1>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {dbUsers.length > 0 ? (
            dbUsers.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2}>No users found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  
    
    
  )
}

export default UsersPage