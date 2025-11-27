import { useSession } from 'next-auth/react'

export default async function Page() {
  const { data } = useSession()
  return (
    <div className="p-3">
      <div>Profile</div>
      <p>
        <strong>Email:</strong> {data?.user?.email}
      </p>
    </div>
  )
}
