import React, { createContext, useContext, useState } from 'react'
import { UserAuth } from '../services/auth/AuthService'

interface IAuthProviderProps {
    children: React.ReactNode
}

interface IAuthContextProps {
  user?: UserAuth
  setUser(value: UserAuth): void
}

export const AuthContext = createContext({} as IAuthContextProps)

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [user, setUser] = useState<UserAuth>()

  return (
    <AuthContext.Provider value={{
      user,
      setUser
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)