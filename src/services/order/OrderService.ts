import { Requester } from "../configuration-proxy/ConfigurationProxy"
import { OrderWithProducts } from "./Models"

export class OrderService {
    static async getOrderByStatusId (statusId: number) {
        try {
            const { data } = await Requester.get<OrderWithProducts[]>(`/order/ByStatus/${statusId}`)
            return data
        } catch (error: any) {
            console.log(error)
            throw error
        }
    }

    static async setOrderStatusByOrderId (orderId: number, statusId: number) {
        try {
            const { data } = await Requester.put(`/order/changeStatus/${orderId}/${statusId}`)

            return data
        } catch (error) {
            throw error
        }
    }
}