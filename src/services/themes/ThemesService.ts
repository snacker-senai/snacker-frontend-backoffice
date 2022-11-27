import { ColorsThemes } from '../../pages/Themes'
import { AuthService } from '../auth/AuthService'
import { Endpoints, Requester } from '../configuration-proxy/ConfigurationProxy'
import { Themes } from './Models'

export class ThemesService {
  static post = async (colors: ColorsThemes, icon: string) => {
    try {
      const infoUserLogged = await AuthService.getInfoUserLogged().finally()

      await Requester.put<Themes>(Endpoints.THEME, {
        color: colors.primaryBackgroundColor,
        secondaryColor: colors.secondaryBackgroundColor,
        fontColor: colors.primaryFontColor,
        secondaryFontColor: colors.secondaryFontColor,
        tertiaryFontColor: colors.thirdFontColor,
        icon,
        restaurantId: infoUserLogged?.restaurantId,
        id: infoUserLogged?.themeId,
      })
    } catch (error) {
      throw error
    }
  }
}
