import { Endpoints, KeyInfoUserChangePasswordLocalStorage, Requester } from "../configuration-proxy/ConfigurationProxy"

export interface InfoChangePasswordLocal {
    email: string
    oldPassword: string
}

export interface PayloadChangePassword {
    email: string
    oldPassword: string
    newPassword: string
}

export class ChangePasswordService {
    static saveLocalUserChangePassword(email, oldPassword: string) {
        localStorage
            .setItem(
                KeyInfoUserChangePasswordLocalStorage,
                JSON.stringify(
                    {
                        email,
                        oldPassword
                    }
                )
            )
    }

    static getLocalInfoUserIsChangePassword(): InfoChangePasswordLocal | null {
        const data = localStorage.getItem(KeyInfoUserChangePasswordLocalStorage)
        if (data !== null) {
            return JSON.parse(data) as InfoChangePasswordLocal
        }

        return null
    }

    static removeLocalInfoUserIsChangePassword() {
        localStorage.removeItem(KeyInfoUserChangePasswordLocalStorage)
    }

    static async changePasswordAndGetTokenSession(payloadChangePassword: PayloadChangePassword): Promise<string> {
        try {
            const { data, status } = await Requester.post(Endpoints.CHANGE_PASSWORD, payloadChangePassword)

            if (status !== 200) {
                throw new Error("Falha ao modificar senha! Status do erro: " + status);
            }

            return new Promise((resolve) => resolve(data.token))
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}