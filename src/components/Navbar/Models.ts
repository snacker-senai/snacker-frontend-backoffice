export interface NavItem {
    linkTo: string
    label: string
    icon: string
}

export interface PropsNavBar {
    navigationBars: NavItem[] | null
}