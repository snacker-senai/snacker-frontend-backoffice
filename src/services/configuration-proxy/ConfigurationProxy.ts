/* eslint-disable no-restricted-globals */
import axios, { AxiosRequestConfig } from 'axios'

export const KeyTokenLocalStorage = 'accessToken'
export const KeyInfoUserChangePasswordLocalStorage = 'change-password-user'

export const Requester = axios.create({
  baseURL: 'https://senai-snacker-backend.herokuapp.com/api',
})

Requester.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = localStorage.getItem(KeyTokenLocalStorage)

  if (token) {
    config.headers!.authorization = `Bearer ${token}`
    config.headers!['Access-Control-Allow-Origin'] = '*'
  }

  return config
})

Requester.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response.status === 401) {
      location.href = '/login'
      localStorage.removeItem(KeyTokenLocalStorage)
    }
    return error
  },
)

export const Endpoints = {
  EMPLOYEE_FROM_RESTAURANT: '/user/fromrestaurant',
  EMPLOYEE: '/user',
  USER_TYPE: '/usertype',
  LOGIN: '/auth/login',
  PRODUCT_FROM_RESTAURANT: '/product/fromrestaurant',
  PRODUCT: '/product',
  PRODUCT_TOPSELLING: '/product/topselling',
  PRODUCT_CATEGORY_FROM_RESTAURANT: '/productcategory/fromrestaurant',
  PRODUCT_CATEGORY: '/productcategory',
  AUTH_CLAIMS: '/auth/tokenclaims',
  RESTAURANT: '/restaurant',
  RESTAURANT_CATEGORY: '/restaurantcategory',
  CHANGE_PASSWORD: '/auth/changepassword',
  CATEGORY_WITH_PRODUCTS: '/ProductCategory/WithProducts',
  ORDER: '/Order',
  THEME: '/Theme'
}
