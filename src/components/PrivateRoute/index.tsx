/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useMenu } from '../../context/MenuContext'
import { AuthService } from '../../services/auth/AuthService'
import { NavBarsService } from '../../services/permission-user/NavBarsService'
import { Loading } from '../Loading'
import { NavItem } from '../NavbarV2/Models'
import { NavbarV2 } from '../NavbarV2'
import { useTheme } from '../../context/ThemeContext'
import { useHistory } from 'react-router'

interface IPrivateRouteProps {
  children: JSX.Element
  menu: number
}

export const PrivateRoute = ({ children, menu }: IPrivateRouteProps) => {
  const [navItens, setNavItens] = useState<NavItem[] | null>(null)
  const { setSelectedMenu } = useMenu()
  const { setTheme } = useTheme()
  const history = useHistory()

  const getCurrentUser = async () => {
    const data = await AuthService.getInfoUserLogged()

    if (data) {
      setTheme(data.theme)
      setNavItens(NavBarsService.getNavigationBarsByTypeUser(data.role))
    }else {
      history.push('/login')
    }
  }

  useEffect(() => {
    getCurrentUser()
  }, [])

  useEffect(() => {
    setSelectedMenu(menu)
  }, [children])



  if (navItens) {
    return (
      <>
        <NavbarV2 navigationBars={navItens} />
        {children}
      </>
    )
  }

  return <Loading visible={true} />
}
