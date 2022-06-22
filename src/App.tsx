import "primereact/resources/themes/md-light-deeppurple/theme.css"
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./GlobalStyles.css"

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import { Home } from "./pages/Home";
import { Employees } from "./pages/Employees";
import { Products } from "./pages/Products";
import { Categories } from "./pages/Categories";
import { Orders } from "./pages/Orders";
import { Deliveries } from "./pages/Deliveries";
import { PrivateRoute } from "./components/PrivateRoute";
import { MenuProvider } from "./context/MenuContext";
import { Login } from "./pages/Login";
import { Restaurants } from "./pages/Restaurants";
import { Tables } from "./pages/Tables";
import { ChangePassword } from "./pages/ChangePassword";

export default function App() {
  const ComponentDefault = () => {
    return (
      <h1>teste</h1>
    )
  }

  return (
    <div className="principal-container">
      <MenuProvider>
        <Router>
          <Switch>
            <Route exact path="/home"><PrivateRoute menu={-1} children={<Home />} /></Route>
            <Route exact path="/dashboard"><PrivateRoute menu={0} children={<ComponentDefault />} /></Route>
            <Route exact path="/employees"><PrivateRoute menu={1} children={<Employees />} /></Route>
            <Route exact path="/products"><PrivateRoute menu={2} children={<Products />} /></Route>
            <Route exact path="/categories"><PrivateRoute menu={3} children={<Categories />} /></Route>
            <Route exact path="/foods"><PrivateRoute menu={4} children={<Orders />} /></Route>
            <Route exact path="/deliveries"><PrivateRoute menu={5} children={<Deliveries />} /></Route>
            <Route exact path="/restaurants"><PrivateRoute menu={6} children={<Restaurants />} /></Route>
            <Route exact path="/mesas"><PrivateRoute menu={7} children={<Tables />} /></Route>
            <Route exact path="/login" component={Login} />
            <Route exact path="/change-password" component={ChangePassword} />
            <Route path="/"><Redirect to="/login" /></Route>
          </Switch>
        </Router>
      </MenuProvider>
    </div>
  )
}
