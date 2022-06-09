import { FormLogin } from "./Model";

import { Requester, Endpoints, KeyTokenLocalStorage } from '../configuration-proxy/ConfigurationProxy'

export class AuthService {
    static async login(formLogin: FormLogin): Promise<boolean> {
        const { data, status } = await Requester.post<string>(Endpoints.LOGIN, formLogin)
        if (status === 200) {
            localStorage.setItem(KeyTokenLocalStorage, data)
            return true
        }
        return false
    }

    static isLoggedIn(): boolean {
        const token = localStorage.getItem(KeyTokenLocalStorage)
        return (token !== null && token !== undefined)
    }
}
