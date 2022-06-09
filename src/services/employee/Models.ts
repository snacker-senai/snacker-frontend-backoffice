export interface Employee {
    id?: number
    email: string
    password: string
    userType?: UserType
    userTypeId: number
    person: Person
    personId?: number
}

export interface UserType {
    id?: number
    name: string
}

export interface Person {
    id?: number 
    name: string
    birthDate: Date | undefined
    phone: string
    document: string
    restaurantId?: number
    address: Address
    addressId?: number
}

export interface Restaurant {
    name: string
    description: string
    address: Address
    addressId: number
    restaurantCategory: RestaurantCategory
    restaurantCategoryId: number
}

export interface Address {
    id?: number
    cep: string
    street: string
    district: string
    city: string
    number: string
    country: string
    state: string
}

export interface RestaurantCategory {
    name: string
}