import { NavItem } from "../../components/NavbarV2/Models";

export class NavBarsService {
    static getNavigationBarsByTypeUser(typeUser: string): NavItem[] {
        switch (typeUser) {
            case "Gerente":
                return [
                    {
                        id: 0,
                        icon: 'fa-solid fa-chart-pie',
                        label: 'Dashboards',
                        linkTo: '/dashboard'
                    },
                    {
                        id: 1,
                        icon: 'fa-solid fa-user-tie',
                        label: 'Funcionários',
                        linkTo: '/employees'
                    },
                    {
                        id: 2,
                        icon: 'fa-solid fa-burger',
                        label: 'Produtos',
                        linkTo: '/products'
                    },
                    {
                        id: 3,
                        icon: 'fa-solid fa-folder-tree',
                        label: 'Categorias',
                        linkTo: '/categories'
                    },
                    {
                        id: 4,
                        icon: 'fa-solid fa-kitchen-set',
                        label: 'Preparo das comidas',
                        linkTo: '/foods'
                    },
                    {
                        id: 5,
                        icon: 'fa-solid fa-truck-fast',
                        label: 'Entregas',
                        linkTo: '/deliveries'
                    },
                    {
                        id: 7,
                        icon: 'fa-solid fa-table',
                        label: 'Mesas',
                        linkTo: '/mesas'
                    },
                    {
                        id: 8,
                        icon: 'fa-solid fa-users-gear',
                        label: 'Grupo de Usuários',
                        linkTo: '/grupo-usuarios'
                    }
                ]

            case "Admin":
                return [
                    {
                        id: 6,
                        icon: 'fa-solid fa-store',
                        label: 'Restaurantes',
                        linkTo: '/restaurants'
                    },
                    {
                        id: 8,
                        icon: 'fa-solid fa-folder-tree',
                        label: 'Categorias de restaurante',
                        linkTo: '/categorias-restaurante'
                    },
                ]
            case "Cozinheiro":
                return [
                    {
                        id: 4,
                        icon: 'fa-solid fa-kitchen-set',
                        label: 'Preparo das comidas',
                        linkTo: '/foods'
                    },
                ]
            case "Garçom":
                return [
                    {
                        id: 5,
                        icon: 'fa-solid fa-truck-fast',
                        label: 'Entregas',
                        linkTo: '/deliveries'
                    },
                ]

            default:
                return []
        }
    }
}