import * as Yup from 'yup'

export interface TablesForm {
    number: string
}

export const TablesDialogSchema = Yup.object().shape({
    number: Yup.string().required('Informe o número!')
})