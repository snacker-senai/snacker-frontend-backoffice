import { Endpoints, Requester } from "../configuration-proxy/ConfigurationProxy";
import { RestaurantCategory } from "../employee/Models";

export class RestaurantCategoryService {
    static async get(): Promise<RestaurantCategory[]> {
        try {
            const { data } = await Requester.get<RestaurantCategory[]>(Endpoints.RESTAURANT_CATEGORY)
            return data
        } catch (error: any) {
            console.log(error)
            throw error(error)
        }
    }
}