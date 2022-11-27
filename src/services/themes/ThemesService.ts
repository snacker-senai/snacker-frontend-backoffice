import { ColorsThemes } from '../../pages/Themes'
import { AuthService } from '../auth/AuthService'
import { Endpoints, Requester } from '../configuration-proxy/ConfigurationProxy'
import { Themes } from './Models'

export class ThemesService {
  static post = async (colors: ColorsThemes, icon: string) => {
    try {
      const infoUserLogged = await AuthService.getInfoUserLogged().finally()

      await Requester.post<Themes>(Endpoints.THEME, {
        ...colors,
        icon,
        restaurantId: infoUserLogged?.restaurantId,
      })
    } catch (error) {
      throw error
    }
  }
}
