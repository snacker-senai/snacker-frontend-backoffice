import { FormikProps } from 'formik'

export const useValidateInput = (formik: FormikProps<any>) => {
    const isFormFieldValid = (name: string) => {
        return !!(formik.touched[name] && formik.errors[name])
    }

    const getFormErrorMessage = (name: string): string | undefined => {
        return isFormFieldValid(name) ? formik.errors[name]?.toString() : ''
    }

    return {
        isFormFieldValid,
        getFormErrorMessage
    }
}