import moment from "moment";
import { Endpoints, Requester } from "../configuration-proxy/ConfigurationProxy";
import { Product, ProductSet, ProductsFilterDashboard } from "./Models";

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

    static async filterProdutctsDashboard(initialDate: Date, finalDate: Date) {
        try {
            const initialDateFormat = moment(initialDate).format().toString()
            const finalDateFormat = moment(finalDate).format().toString()

            const pathParms = `initialDate=${initialDateFormat}&finalDate=${finalDateFormat}`

            const { data, status } = await Requester.get<ProductsFilterDashboard[]>(`${Endpoints.PRODUCT_TOPSELLING}?${pathParms}`)

            if (status !== 200) {
                throw new Error("Falha ao buscar os produtos no dashboard. Status do erro: " + status);
            }

            if (data.length > 10) {
                return data.splice(0, 10)
            }

            return data
        } catch (error: any) {
            console.log(error)
            throw new Error(error)
        }
    }
}