import React from "react"
import { useAuth } from "../context/AuthContext"
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children, allowedRoles }) => {
   const { user } = useAuth()

   if (!user)
      return <Navigate to="/login" />

   if (!allowedRoles.includes(user.role))
      return <Navigate to="/unauthorized" />

   return children
}

export default ProtectedRoute