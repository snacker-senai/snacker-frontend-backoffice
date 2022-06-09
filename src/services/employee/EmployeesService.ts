import { Employee } from "./Models";

import { Requester, Endpoints } from '../configuration-proxy/ConfigurationProxy'

export class EmployeesService {

    static async set(employee: Employee) {
        if (employee.id) {
            await Requester
                .put(Endpoints.EMPLOYEE_FROM_RESTAURANT, employee)
                .catch((error) => {
                    console.log(error)
                    throw error
                })

            return
        }

        await Requester
            .post(Endpoints.EMPLOYEE_FROM_RESTAURANT, employee)
            .catch((error) => {
                console.log(error)
                throw error
            })
    }

    static async get(): Promise<Employee[]> {
        const { data, status } = await Requester.get<Employee[]>(Endpoints.EMPLOYEE_FROM_RESTAURANT)
        if (status !== 200) {
            throw new Error("Invoke get employees failed. Status code: " + status);
        }
        return data
    }

    static async del(id?: number) {
        const { status } = await Requester.delete(`${Endpoints.EMPLOYEE}/${id}`)
        if (status !== 204 && status !== 200) {
            throw new Error("Invoke delete employees failed. Status code: " + status);
        }
    }
}