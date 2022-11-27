import { ColorsThemes } from '../pages/Themes'

export const getColorsVariablesCss = (): ColorsThemes => {
  const styles = getComputedStyle(document.documentElement)

  return {
    primaryBackgroundColor: styles.getPropertyValue('--theme-color'),
    secondaryBackgroundColor: styles.getPropertyValue('--theme-secondaryColor'),
    primaryFontColor: styles.getPropertyValue('--theme-fontColor'),
    secondaryFontColor: styles.getPropertyValue('--theme-secondaryFontColor'),
    thirdFontColor: styles.getPropertyValue('--theme-tertiaryFontColor'),
  }
}
