import './styles.css'

const Home = () => {
    const logo = require('../../assets/home.png')

    return (
        <main className="principal-main">
            <div className="content">
                <h1 className="title">Snacker</h1>
                <p>Sistema responsável por gerenciar todos os seus pedidos, disponibilizando a gerência dos produtos, funcionários e suas respectivas configurações.</p>
            </div>
            <img src={logo} alt="Logo do snacker backoffice" />
        </main>
    )
}

export { Home }