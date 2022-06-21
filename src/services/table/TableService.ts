import { Requester } from "../configuration-proxy/ConfigurationProxy"
import { Table } from "./Models"

export class TableService {
    static async getAll () {
        const { data } = await Requester.get<Table[]>(`table/FromRestaurant`)

        return data
    }

    static async getQrCode (tableId: number) {
        try {
            const { data } = await Requester.post<string>(`auth/GenerateClientToken/${tableId}`)

            return `https://snacker-frontend-client.vercel.app/authorize/${data}`
        } catch (error) {
            throw error
        }
    }
}