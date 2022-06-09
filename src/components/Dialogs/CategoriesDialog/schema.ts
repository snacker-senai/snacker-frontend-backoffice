import * as Yup from 'yup'

export interface ProductsCategoryForm {
    name: string | ''
}

export const ProductsCategoryDialogSchema = Yup.object().shape({
    name: Yup.string().required('Informe o nome!')
})