import { FormLogin } from "./Model";

import { Requester, Endpoints, KeyTokenLocalStorage } from '../configuration-proxy/ConfigurationProxy'

export interface UserAuth {
    role: string
    email: string
    restaurantId: number
}

export class AuthService {
    static async login(formLogin: FormLogin): Promise<boolean> {
        const { data, status } = await Requester.post<{ token: string }>(Endpoints.LOGIN, formLogin)

        if (status === 200) {
            localStorage.setItem(KeyTokenLocalStorage, data.token)
            return true
        }
        return false
    }

    static async getInfoUserLogged(): Promise<UserAuth | undefined> {
        const token = localStorage.getItem(KeyTokenLocalStorage)

        if (token !== null && token !== undefined) {
            const { data } = await Requester.get<UserAuth>(Endpoints.AUTH_CLAIMS)
            return data
        }

        return undefined
    }
}
