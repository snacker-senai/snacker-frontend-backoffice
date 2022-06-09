import { Endpoints, Requester } from "../configuration-proxy/ConfigurationProxy";
import { Product, ProductSet } from "./Models";

export class ProductService {
    static async get(): Promise<Product[]> {
        try {
            const { data } = await Requester.get<Product[]>(Endpoints.PRODUCT_FROM_RESTAURANT)
            return data
        } catch (error: any) {
            console.log(error)
            throw error
        }
    }

    static async set(product: ProductSet) {
        try {
            if (product.id) {
                await Requester.put(Endpoints.PRODUCT_FROM_RESTAURANT, product)
                return
            }

            await Requester.post(Endpoints.PRODUCT_FROM_RESTAURANT, product)
        } catch (error: any) {
            console.log(error)
            throw error
        }
    }

    static async del(id?: number) {
        await Requester.delete(`${Endpoints.PRODUCT}/${id}`)
    }
}