import { FormLogin } from "./Model";

import { Requester, Endpoints, KeyTokenLocalStorage } from '../configuration-proxy/ConfigurationProxy'

export interface UserAuth {
    role: string
    email: string
    restaurantId: number
}

export interface AuthLogin {
    token: string
    changePassword: boolean
}

export enum StatusOfLogin {
    SUCCESS,
    CHANGE_PASSWORD,
    INVALID
}

export class AuthService {
    static async login(formLogin: FormLogin): Promise<StatusOfLogin> {
        let statusLogin = StatusOfLogin.INVALID

        const { data, status } = await Requester.post<AuthLogin>(Endpoints.LOGIN, formLogin)
        if (status === 200) {
            if (data.changePassword) {
                statusLogin = StatusOfLogin.CHANGE_PASSWORD
            } else {
                statusLogin = StatusOfLogin.SUCCESS
                this.setTokenInLocal(data.token)
            }
        }

        return new Promise((resolve) => resolve(statusLogin))
    }

    static setTokenInLocal(token: string) {
        localStorage.setItem(KeyTokenLocalStorage, token)
    }

    static async getInfoUserLogged(): Promise<UserAuth | undefined> {
        const token = localStorage.getItem(KeyTokenLocalStorage)

        if (token !== null && token !== undefined) {
            const { data } = await Requester.get<UserAuth>(Endpoints.AUTH_CLAIMS)
            return data
        }

        return undefined
    }

    static userIsLogged(): boolean {
        const token = localStorage.getItem(KeyTokenLocalStorage)
        return token !== null
    }

    static logoutUser = () => {
        localStorage.removeItem(KeyTokenLocalStorage)
    }
}
