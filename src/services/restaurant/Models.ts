import { Address, Person, RestaurantCategory } from "../employee/Models"

export interface InsertRestaurant {
    name: string
    description: string
    address: Address
    restaurantCategoryId: number
    active: boolean
    person: Person
    user: {
        email: string
    }
}

export interface UpdateRestaurant {
    id?: number
    name: string
    description: string
    address: Address
    addressId?: number
    restaurantCategoryId: number
    active: boolean
}