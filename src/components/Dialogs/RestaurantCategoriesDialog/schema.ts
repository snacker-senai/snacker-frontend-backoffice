import * as Yup from 'yup'

export interface RestaurantCategoriesForm {
    name: string
}

export const RestaurantCategoriesDialogSchema = Yup.object().shape({
    name: Yup.string().required('Informe o nome!')
})