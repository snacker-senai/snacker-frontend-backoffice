export interface Table {
    id: number
    number: string
    restaurantId: number
    active: boolean
}

export interface CreateOrUpdateDTO {
    id?: number
    number: string
    active: boolean
}