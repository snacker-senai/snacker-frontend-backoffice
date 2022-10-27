import React, { createContext, useContext, useState, useEffect } from 'react'
import { Theme } from '../services/auth/AuthService'


interface IAuthProviderProps {
    children: React.ReactNode
}

interface IMenuContextProps {
  theme: Theme
  setTheme(value: Theme): void
}

const defaultTheme = localStorage.getItem('theme') ? JSON.parse(localStorage.getItem('theme')!) : {
    color: '#525252',
    fontColor: '#fff',
    secondaryColor: '#fff',
    secondaryFontColor: '#fff',
    tertiaryFontColor: '#fff'
}

export const ThemeContext = createContext({} as IMenuContextProps)

export const ThemeProvider = ({ children }: IAuthProviderProps) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme)

  useEffect(() => {
    document.documentElement.style.setProperty('--theme-color', theme.color)
    document.documentElement.style.setProperty('--theme-fontColor', theme.fontColor)
    document.documentElement.style.setProperty('--theme-secondaryColor', theme.secondaryColor)
    document.documentElement.style.setProperty('--theme-secondaryFontColor', theme.secondaryFontColor)
  }, [theme])

  return (
    <ThemeContext.Provider value={{
        theme,
        setTheme
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)