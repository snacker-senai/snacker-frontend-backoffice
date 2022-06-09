import { Endpoints, Requester } from "../configuration-proxy/ConfigurationProxy";
import { ProductCategory } from "../product/Models";
import { ProductsCategorySet } from "./Models";

export class ProductCategoryService {
    static async get(): Promise<ProductCategory[]> {
        try {
            const { data } = await Requester.get<ProductCategory[]>(Endpoints.PRODUCT_CATEGORY_FROM_RESTAURANT)
            return data
        } catch (error: any) {
            console.log(error)
            throw error(error)
        }
    }

    static async set(productCategory: ProductsCategorySet) {
        try {
            if (productCategory.id) {
                await Requester.put(Endpoints.PRODUCT_CATEGORY_FROM_RESTAURANT, productCategory)
                return
            }

            await Requester.post(Endpoints.PRODUCT_CATEGORY_FROM_RESTAURANT, productCategory)
        } catch (error: any) {
            console.log(error)
            throw error
        }
    }

    static async del(id?: number) {
        await Requester.delete(`${Endpoints.PRODUCT_CATEGORY}/${id}`)
    }
}