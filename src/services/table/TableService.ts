import { Requester } from "../configuration-proxy/ConfigurationProxy"
import { CreateOrUpdateDTO, Table } from "./Models"

export class TableService {
    static async getAll () {
        const { data } = await Requester.get<Table[]>(`table/FromRestaurant`)

        return data
    }

    static async getQrCode (tableId: number) {
        try {
            const { data } = await Requester.post<string>(`auth/GenerateClientToken/${tableId}`)

            return `https://snacker-frontend-client-five.vercel.app//authorize/${data}`
        } catch (error) {
            throw error
        }
    }

    static async createOrUpdate (table: CreateOrUpdateDTO): Promise<Table> {
        if (table.id) {
            const { data } = await Requester.put('table/FromRestaurant', {
                ...table
            })

            return data
        }

        const { data } = await Requester.post('table/FromRestaurant', {
            number: table.number,
            active: true
        })

        return data
    }
}