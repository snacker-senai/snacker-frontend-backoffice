import { NavItem } from "../../components/Navbar/Models";

export class NavBarsService {
    static getNavigationBarsByTypeUser(typeUser: string): NavItem[] {
        switch (typeUser) {
            case "Gerente":
                return [
                    {
                        id: 0,
                        icon: 'pi-chart-bar',
                        label: 'Dashboards',
                        linkTo: '/dashboard'
                    },
                    {
                        id: 1,
                        icon: 'pi-users',
                        label: 'Funcionários',
                        linkTo: '/employees'
                    },
                    {
                        id: 2,
                        icon: 'pi-money-bill',
                        label: 'Produtos',
                        linkTo: '/products'
                    },
                    {
                        id: 3,
                        icon: 'pi-clone',
                        label: 'Categorias',
                        linkTo: '/categories'
                    },
                    {
                        id: 4,
                        icon: 'pi-shopping-cart',
                        label: 'Preparo das comidas',
                        linkTo: '/foods'
                    },
                    {
                        id: 5,
                        icon: 'pi-wallet',
                        label: 'Entregas',
                        linkTo: '/deliveries'
                    },
                    {
                        id: 7,
                        icon: 'pi-table',
                        label: 'Mesas',
                        linkTo: '/mesas'
                    }
                ]

            case "Admin":
                return [
                    {
                        id: 6,
                        icon: 'pi-sitemap',
                        label: 'Restaurantes',
                        linkTo: '/restaurants'
                    },
                    {
                        id: 8,
                        icon: 'pi-table',
                        label: 'Categorias de restaurante',
                        linkTo: '/categorias-restaurante'
                    },
                ]
            case "Cozinheiro":
                return [
                    {
                        id: 4,
                        icon: 'pi-shopping-cart',
                        label: 'Preparo das comidas',
                        linkTo: '/foods'
                    },
                ]
            case "Garçom":
                return [
                    {
                        id: 5,
                        icon: 'pi-wallet',
                        label: 'Entregas',
                        linkTo: '/deliveries'
                    },
                ]

            default:
                return []
        }
    }
}