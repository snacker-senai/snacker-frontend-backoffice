import { Requester, Endpoints } from "../configuration-proxy/ConfigurationProxy";
import { UserType } from "../employee/Models";

export default class UserTypeService {
    static async get(): Promise<UserType[]> {
        const { data } = await Requester.get<UserType[]>(Endpoints.USER_TYPE)
        return data
    }
}