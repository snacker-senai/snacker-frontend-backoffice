import { NavItem } from "../../components/Navbar/Models";

export class NavBarsService {
    static getNavigationBarsByTypeUser(typeUser: string): NavItem[] {
        switch (typeUser) {
            case "Gerente":
                return [
                    {
                        icon: 'pi-chart-bar',
                        label: 'Dashboard',
                        linkTo: '/dashboard'
                    },
                    {
                        icon: 'pi-users',
                        label: 'Funcionários',
                        linkTo: '/employees'
                    },
                    {
                        icon: 'pi-money-bill',
                        label: 'Produtos',
                        linkTo: '/products'
                    },
                    {
                        icon: 'pi-clone',
                        label: 'Categoria',
                        linkTo: '/categories'
                    },
                    {
                        icon: 'pi-shopping-cart',
                        label: 'Preparo das comidas',
                        linkTo: '/foods'
                    },
                    {
                        icon: 'pi-wallet',
                        label: 'Entregas',
                        linkTo: '/deliveries'
                    },
                    {
                        icon: 'pi-user',
                        label: 'Perfil',
                        linkTo: '/perfil'
                    },
                    {
                        icon: 'pi-cog',
                        label: 'Configurações',
                        linkTo: '/configurations'
                    },
                ]

            case "Admin":
                return [
                    {
                        icon: 'pi-sitemap',
                        label: 'Restaurantes',
                        linkTo: '/restaurants'
                    },
                    {
                        icon: 'pi-user',
                        label: 'Perfil',
                        linkTo: '/perfil'
                    },
                    {
                        icon: 'pi-cog',
                        label: 'Configurações',
                        linkTo: '/configurations'
                    },
                ]
            case "Cozinheiro":
                return [
                    {
                        icon: 'pi-shopping-cart',
                        label: 'Preparo das comidas',
                        linkTo: '/foods'
                    },
                    {
                        icon: 'pi-user',
                        label: 'Perfil',
                        linkTo: '/perfil'
                    },
                    {
                        icon: 'pi-cog',
                        label: 'Configurações',
                        linkTo: '/configurations'
                    }
                ]
            case "Garçom":
                return [
                    {
                        icon: 'pi-wallet',
                        label: 'Entregas',
                        linkTo: '/deliveries'
                    },
                    {
                        icon: 'pi-user',
                        label: 'Perfil',
                        linkTo: '/perfil'
                    },
                    {
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