import "primereact/resources/themes/md-light-deeppurple/theme.css"
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./GlobalStyles.css"

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { Navbar } from "./components/Navbar";
import { NavItem } from "./components/Navbar/Models";
import { NavBarsService } from "./services/permission-user/NavBarsService";
import { Employees } from "./pages/Employees";
import { AuthService } from "./services/auth/AuthService";
import { Products } from "./pages/Products";
import { Categories } from "./pages/Categories";

export default function App() {

  const navigationBars: NavItem[] = NavBarsService.getNavigationBarsByTypeUser("Gerente")

  const isLoggedIn = AuthService.isLoggedIn()

  const componentDefault = () => {
    return (
      <h1>teste</h1>
    )
  }

  return (
    <div className="principal-container">

      {isLoggedIn && 
        <>
          <Router>
            <Navbar navigationBars={navigationBars}/>
            <Switch>
              <Route path="/home" component={Home}></Route>
              <Route path="/dashboard" component={componentDefault} />
              <Route path="/employees" component={Employees} />
              <Route path="/products" component={Products} />
              <Route path="/categories" component={Categories} />
              <Route path="/foods" component={componentDefault} />
              <Route path="/deliveries" component={componentDefault} />
              <Route path="/perfil" component={componentDefault} />
              <Route path="/configurations" component={componentDefault} />
              <Route path="/restaurants" component={componentDefault} />

              <Redirect to={'/home'} />
            </Switch>
          </Router>
        </>
      }
      {!isLoggedIn && <Login />}
    </div>
  )
}
