"use server"

import { auth } from "@/lib/auth"
import { SignIn, SignOut } from "@/components/admin/auth-components"
import ListRoom from "@/components/admin/list-rooms"

const AdminPage = async () => {
  
  const session = await auth()
  if (!session?.user) return <SignIn />

  return (
    <>
      <SignOut />
      <ListRoom />
    </>
  )

};

export default AdminPage;