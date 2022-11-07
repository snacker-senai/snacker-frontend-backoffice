import { Endpoints, Requester } from '../configuration-proxy/ConfigurationProxy'
import { OrderWithProducts, ProductsWithQuantity } from './Models'

export class OrderService {
  static setOrder = async (
    tableId: number,
    products: ProductsWithQuantity[],
  ) => {
    try {
      await Requester.post(Endpoints.ORDER, {
        productsWithQuantity: products,
        tableId: tableId,
      })
    } catch (error) {
      throw error
    }
  }

  static async getOrderByStatusId(statusId: number) {
    try {
      const { data } = await Requester.get<OrderWithProducts[]>(
        `/order/ByStatus/${statusId}`,
      )
      return data
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async setOrderStatusByOrderId(orderId: number, statusId: number) {
    try {
      const { data } = await Requester.put(
        `/order/changeStatus/${orderId}/${statusId}`,
      )

      return data
    } catch (error) {
      throw error
    }
  }

  static async getOrdersByTableId(
    tableId: number,
  ): Promise<OrderWithProducts[]> {
    try {
      const { data } = await Requester.get(`/Order/ByTable/${tableId}`)

      return data
    } catch (error) {
      throw error
    }
  }

  static async closeBillByTableId(tableId: number) {
    try {
      await Requester.put(`/Order/CloseBill/${tableId}`)
    } catch (error) {
      throw error
    }
  }
}
