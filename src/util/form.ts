/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'

export const formIsValid = (formik) => {
  for (var key in formik.values) {
    if (formik.values[key] === '' || formik.values[key] === undefined)
      return false
  }

  return formik.isValid
}

export const useResetForm = (visibleForm: boolean, formik: any) =>
  useEffect(() => {
    if (visibleForm) formik.resetForm()
  }, [visibleForm])
