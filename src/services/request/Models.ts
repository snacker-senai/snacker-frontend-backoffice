import { Product } from '../product/Models'

export interface CategoryWithProducts {
  id: number
  name: string
  products: Product[]
}
