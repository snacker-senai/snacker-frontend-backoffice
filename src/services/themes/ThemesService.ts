import { Theme } from '../auth/AuthService'
import { Endpoints, Requester } from '../configuration-proxy/ConfigurationProxy'

export class ThemesService {
  static post = async (themes: Theme) => {
    try {
      await Requester.put<Theme>(Endpoints.THEME, themes)
    } catch (error) {
      throw error
    }
  }
}
