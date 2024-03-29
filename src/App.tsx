import "primereact/resources/themes/md-light-deeppurple/theme.css"
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./GlobalStyles.css"

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

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
import { RestaurantCategories } from "./pages/RestaurantCategories";
import { Dashboards } from "./pages/Dashboards";
import { ThemeProvider } from "./context/ThemeContext";
import Request from "./pages/Request";
import Themes from "./pages/Themes";

export default function App() {
  return (
    <div className="principal-container">
      <MenuProvider>
        <ThemeProvider>
          <Router>
            <Switch>
              <Route exact path="/dashboard"><PrivateRoute menu={0} children={<Dashboards />} /></Route>
              <Route exact path="/employees"><PrivateRoute menu={1} children={<Employees />} /></Route>
              <Route exact path="/products"><PrivateRoute menu={2} children={<Products />} /></Route>
              <Route exact path="/categories"><PrivateRoute menu={3} children={<Categories />} /></Route>
              <Route exact path="/foods"><PrivateRoute menu={4} children={<Orders />} /></Route>
              <Route exact path="/deliveries"><PrivateRoute menu={5} children={<Deliveries />} /></Route>
              <Route exact path="/restaurants"><PrivateRoute menu={6} children={<Restaurants />} /></Route>
              <Route exact path="/mesas"><PrivateRoute menu={7} children={<Tables />} /></Route>
              <Route exact path="/categorias-restaurante"><PrivateRoute menu={8} children={<RestaurantCategories />} /></Route>
              <Route exact path="/pedidos"><PrivateRoute menu={10} children={<Request />} /></Route>
              <Route exact path="/tema"><PrivateRoute menu={11} children={<Themes />} /></Route>
              <Route exact path="/login" component={Login} />
              <Route exact path="/change-password" component={ChangePassword} />
              <Route path="/"><Redirect to="/login" /></Route>
            </Switch>
          </Router>
        </ThemeProvider>
      </MenuProvider>
    </div>
  )
}
