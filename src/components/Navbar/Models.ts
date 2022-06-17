export interface NavItem {
    id: number
    linkTo: string
    label: string
    icon: string
}

export interface PropsNavBar {
    navigationBars: NavItem[] | null
}