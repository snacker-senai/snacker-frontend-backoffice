import { Restaurant } from "../employee/Models"

export interface ProductSet {
    id?: number
    name: string
    description: string
    price: number
    image: string
    active: boolean
    productCategoryId: number
}

export interface Product {
    name: string
    description: string
    price: number
    image: string
    productCategory: ProductCategory
    productCategoryId: number
    restaurant: Restaurant
    restaurantId: number
    active: boolean
    id?: number
}

export interface ProductCategory {
    name: string
    id: number
    active: boolean
}
