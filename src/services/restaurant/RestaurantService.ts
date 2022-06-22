import { Endpoints, Requester } from "../configuration-proxy/ConfigurationProxy";
import { Restaurant } from "../employee/Models";
import { InsertRestaurant, UpdateRestaurant } from "./Models";

export class RestaurantService {
    static async get(): Promise<Restaurant[]> {
        try {
            const { data } = await Requester.get<Restaurant[]>(Endpoints.RESTAURANT)
            return data
        } catch (error: any) {
            console.log(error)
            throw error(error)
        }
    }

    static async insert(payload: InsertRestaurant) {
        try {
            const { data } = await Requester.post(Endpoints.RESTAURANT, payload)
            console.log(data)
        } catch (error: any) {
            console.log(error)
            throw error(error)
        }
    }

    static async update(data: UpdateRestaurant) {
        try {
            await Requester.put(Endpoints.RESTAURANT, data)
        } catch (error: any) {
            console.log(error)
            throw error(error)
        }
    }
}