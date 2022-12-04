import { NavItem } from '../../components/NavbarV2/Models'
import { AuthService } from '../auth/AuthService'

export class NavBarsService {
  static getFirstPageByTypeUser = async () => {
    const user = await AuthService.getInfoUserLogged()

    if (user?.role === 'Gestão') return '/dashboard'
    if (user?.role === 'Admin') return '/restaurants'
    if (user?.role === 'Preparo') return '/foods'
    if (user?.role === 'Entrega') return '/deliveries'

    return '/dashboard'
  }

  static getNavigationBarsByTypeUser(typeUser: string): NavItem[] {
    switch (typeUser) {
      case 'Gestão':
        return [
          {
            id: 0,
            icon: 'fa-solid fa-chart-pie',
            label: 'Dashboards',
            linkTo: '/dashboard',
          },
          {
            id: 1,
            icon: 'fa-solid fa-user-tie',
            label: 'Funcionários',
            linkTo: '/employees',
          },
          {
            id: 2,
            icon: 'fa-solid fa-burger',
            label: 'Produtos',
            linkTo: '/products',
          },
          {
            id: 3,
            icon: 'fa-solid fa-folder-tree',
            label: 'Categorias',
            linkTo: '/categories',
          },
          {
            id: 4,
            icon: 'fa-solid fa-kitchen-set',
            label: 'Preparo das comidas',
            linkTo: '/foods',
          },
          {
            id: 5,
            icon: 'fa-solid fa-truck-fast',
            label: 'Entregas',
            linkTo: '/deliveries',
          },
          {
            id: 7,
            icon: 'fa-solid fa-table',
            label: 'Mesas',
            linkTo: '/mesas',
          },
          {
            id: 10,
            icon: 'fa-solid fa-money-bill',
            label: 'Pedidos',
            linkTo: '/pedidos',
          },
          {
            id: 11,
            icon: 'fa-solid fa-palette',
            label: 'Tema',
            linkTo: '/tema',
          },
        ]

      case 'Admin':
        return [
          {
            id: 6,
            icon: 'fa-solid fa-store',
            label: 'Restaurantes',
            linkTo: '/restaurants',
          },
          {
            id: 8,
            icon: 'fa-solid fa-folder-tree',
            label: 'Categorias de restaurante',
            linkTo: '/categorias-restaurante',
          },
        ]
      case 'Preparo':
        return [
          {
            id: 4,
            icon: 'fa-solid fa-kitchen-set',
            label: 'Preparo das comidas',
            linkTo: '/foods',
          },
        ]
      case 'Entrega':
        return [
          {
            id: 5,
            icon: 'fa-solid fa-truck-fast',
            label: 'Entregas',
            linkTo: '/deliveries',
          },
          {
            id: 10,
            icon: 'fa-solid fa-money-bill',
            label: 'Pedidos',
            linkTo: '/pedidos',
          },
        ]

      default:
        return []
    }
  }
}
