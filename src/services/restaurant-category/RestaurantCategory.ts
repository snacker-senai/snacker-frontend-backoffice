import { Endpoints, Requester } from "../configuration-proxy/ConfigurationProxy";
import { RestaurantCategory } from "../employee/Models";
import { CreateOrUpdateDTO } from "./Models";

export class RestaurantCategoryService {
    static async get (): Promise<RestaurantCategory[]> {
        try {
            const { data } = await Requester.get<RestaurantCategory[]>(Endpoints.RESTAURANT_CATEGORY)
            return data
        } catch (error: any) {
            console.log(error)
            throw error(error)
        }
    }

    static async createOrUpdate (category: CreateOrUpdateDTO): Promise<RestaurantCategory> {
        if (category.id) {
            const { data } = await Requester.put('/RestaurantCategory', category) 
            return data
        }

        const { data } = await Requester.post('/RestaurantCategory', {
            name: category.name,
            active: true
        })

        return data
    }
}