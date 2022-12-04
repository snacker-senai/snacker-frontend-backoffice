import './styles.css'

interface Props {
    title: string
}

const LayoutEmpty = ({ title }: Props) =>
    <h1 className="layout-empty">{title}</h1>


export default LayoutEmpty