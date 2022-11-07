import { Endpoints, Requester } from '../configuration-proxy/ConfigurationProxy'
import { CategoryWithProducts } from './Models'

export class RequestService {
  static async get(): Promise<CategoryWithProducts[]> {
    const { data } = await Requester.get<CategoryWithProducts[]>(
      Endpoints.CATEGORY_WITH_PRODUCTS,
    )

    return data
  }
}
