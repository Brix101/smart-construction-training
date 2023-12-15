import { clerkClient } from "@clerk/nextjs"

export default async function UsersPage() {
  const users = await clerkClient.users.getUserList()

  return (
    <>
      <table className="min-w-full border border-gray-300 bg-white">
        <thead>
          <tr>
            <th className="border-b px-4 py-2">First Name</th>
            <th className="border-b px-4 py-2">Last Name</th>
            <th className="border-b px-4 py-2">Emails</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="hover:bg-gray-100">
              <td className="border-b px-4 py-2">{user.firstName}</td>
              <td className="border-b px-4 py-2">{user.lastName}</td>
              <td className="border-b px-4 py-2">
                <ul>
                  {user.emailAddresses.map(email => {
                    return <li key={email.id}>{email.emailAddress}</li>
                  })}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>{" "}
      </table>
    </>
  )
}
