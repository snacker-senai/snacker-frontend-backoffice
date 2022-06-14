import React, { useEffect, useState } from 'react'
import { AuthService } from '../../services/auth/AuthService'
import { NavBarsService } from '../../services/permission-user/NavBarsService'
import { Loading } from '../Loading'
import { Navbar } from '../Navbar'
import { NavItem } from '../Navbar/Models'

interface IPrivateRouteProps {
  children: JSX.Element
}

export const PrivateRoute = ({ children }: IPrivateRouteProps) => {
  const [navItens, setNavItens] = useState<NavItem[] | null>(null)

  const getCurrentUser = async () => {
    const data = await AuthService.getInfoUserLogged()

    if (data) {
        setNavItens(NavBarsService.getNavigationBarsByTypeUser(data.role))
    }
  }

  useEffect(() => {
    getCurrentUser()
  }, [])

  if (navItens) {
    return (
        <>
            <Navbar navigationBars={navItens} />
            {children}
        </>
    )
  }

  return <Loading visible={true} />
}