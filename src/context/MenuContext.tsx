import React, { createContext, useContext, useState } from 'react'


interface IAuthProviderProps {
    children: React.ReactNode
}

interface IMenuContextProps {
  selectedMenu: number
  setSelectedMenu(value: number): void
}

export const MenuContext = createContext({} as IMenuContextProps)

export const MenuProvider = ({ children }: IAuthProviderProps) => {
  const [selectedMenu, setSelectedMenu] = useState(0)

  return (
    <MenuContext.Provider value={{
      selectedMenu,
      setSelectedMenu
    }}>
      {children}
    </MenuContext.Provider>
  )
}

export const useMenu = () => useContext(MenuContext)