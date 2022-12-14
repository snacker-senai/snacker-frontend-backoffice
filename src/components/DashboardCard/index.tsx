import './styles.css'

type DashboardCardProps = {
    title: string
    value: string
    icon: React.ReactNode
}

export const DashboardCard = ({ title, value, icon }: DashboardCardProps) => {
    return (
        <div className="dashboardcard">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="dashboardcard-title">{title}</span>
                {icon}
            </div>
            <span className="dashboardcard-value">{value}</span>
        </div>
    )
}