import * as Yup from 'yup'

export interface ProductForm {
    name: string | ''
    description: string | ''
    price: number
    image: string | ''
    active: boolean
    preReady: boolean
    productCategory: any
}

export const ProductDialogSchema = Yup.object().shape({
    name: Yup.string().required('Informe o nome!'),
    description: Yup.string().required('Informe a descrição!'),
    price: Yup.number().required('Informe o preço!'),
    image: Yup.string().required('Informe a imagem!'),
    active: Yup.boolean(),
    preReady: Yup.boolean(),
    productCategory: Yup.object().shape({
        name: Yup.string().required()
    }).required('Informe a categoria do produto!'),
})