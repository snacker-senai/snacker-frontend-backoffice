import { Restaurant } from "../employee/Models"

export interface ProductSet {
    id?: number
    name: string
    description: string
    price: number
    image: string
    active: boolean
    productCategoryId: number
    preReady: boolean
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
    preReady: boolean
    id?: number
}

export interface ProductCategory {
    name: string
    id: number
    active: boolean
}

export interface ProductsFilterDashboard {
    id: number
    name: string
    quantity: number
}