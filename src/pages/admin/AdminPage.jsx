import React, { useContext } from 'react'
import { UserContext } from '../../contexts/UserProvider'

export default function AdminPage() {
  const { user, loading} = useContext(UserContext);
  console.log("userdd:", user);
  return (
    <div>
      AdminPage
    </div>
  )
}
