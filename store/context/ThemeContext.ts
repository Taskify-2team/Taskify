import { createContext, useContext } from 'react'

interface ThemeContextValue {
  theme: string
  handleSetTheme: () => void
}

export const ThemeContext = createContext<ThemeContextValue>({
  theme: '',
  handleSetTheme: () => {},
})

export const useLoadTheme = () => {
  const { theme, handleSetTheme } = useContext(ThemeContext)

  return { theme, handleSetTheme }
}
