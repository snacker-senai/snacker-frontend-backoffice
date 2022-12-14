/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from 'react'

export const useFormIsValid = (formik) =>
  useMemo(() => {
    for (var key in formik.values) {
      if (formik.values[key] === '' || formik.values[key] === undefined)
        return false
    }

    return formik.errors !== ''
  }, [formik.values])

export const useResetForm = (visibleForm: boolean, formik: any) =>
  useEffect(() => {
    if (visibleForm) formik.resetForm()
  }, [visibleForm])
