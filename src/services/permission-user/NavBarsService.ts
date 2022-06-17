import { NavItem } from "../../components/Navbar/Models";

export class NavBarsService {
    static getNavigationBarsByTypeUser(typeUser: string): NavItem[] {
        switch (typeUser) {
            case "Gerente":
                return [
                    {
                        id: 0,
                        icon: 'pi-chart-bar',
                        label: 'Dashboard',
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
                        label: 'Categoria',
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
                        id: 6,
                        icon: 'pi-user',
                        label: 'Perfil',
                        linkTo: '/perfil'
                    },
                    {
                        id: 7,
                        icon: 'pi-cog',
                        label: 'Configurações',
                        linkTo: '/configurations'
                    },
                ]

            case "Admin":
                return [
                    {
                        id: 0,
                        icon: 'pi-sitemap',
                        label: 'Restaurantes',
                        linkTo: '/restaurants'
                    },
                    {
                        id: 0,
                        icon: 'pi-user',
                        label: 'Perfil',
                        linkTo: '/perfil'
                    },
                    {
                        id: 0,
                        icon: 'pi-cog',
                        label: 'Configurações',
                        linkTo: '/configurations'
                    },
                ]
            case "Cozinheiro":
                return [
                    {
                        id: 0,
                        icon: 'pi-shopping-cart',
                        label: 'Preparo das comidas',
                        linkTo: '/foods'
                    },
                    {
                        id: 0,
                        icon: 'pi-user',
                        label: 'Perfil',
                        linkTo: '/perfil'
                    },
                    {
                        id: 0,
                        icon: 'pi-cog',
                        label: 'Configurações',
                        linkTo: '/configurations'
                    }
                ]
            case "Garçom":
                return [
                    {
                        id: 0,
                        icon: 'pi-wallet',
                        label: 'Entregas',
                        linkTo: '/deliveries'
                    },
                    {
                        id: 0,
                        icon: 'pi-user',
                        label: 'Perfil',
                        linkTo: '/perfil'
                    },
                    {
                        id: 0,
                        icon: 'pi-cog',
                        label: 'Configurações',
                        linkTo: '/configurations'
                    }
                ]

            default:
                return []
        }

    }
}