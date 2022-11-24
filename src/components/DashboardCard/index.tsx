import './styles.css'

type DashboardCardProps = {
    title: string
    value: string
    icon: React.ReactNode
    backgroundColor: string
}

export const DashboardCard = ({ title, value, icon, backgroundColor }: DashboardCardProps) => {
    return (
        <div className="dashboardcard" style={{ backgroundColor }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="dashboardcard-title">{title}</span>
                {icon}
            </div>
            <span className="dashboardcard-value">{value}</span>
        </div>
    )
}