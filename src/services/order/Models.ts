export interface OrderWithProducts {
  id: number
  createdAt: string
  table: string
  orderStatus: {
    id: number
    name: string
  }
  productsWithQuantity: ProductsWithQuantity[]
}

export interface ProductsWithQuantity {
  productId: number
  productName: string
  quantity: number
  price: number
  details?: string
}
