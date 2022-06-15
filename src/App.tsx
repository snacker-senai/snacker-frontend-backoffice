import "primereact/resources/themes/md-light-deeppurple/theme.css"
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./GlobalStyles.css"

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Home } from "./pages/Home";
import { Employees } from "./pages/Employees";
import { Products } from "./pages/Products";
import { Categories } from "./pages/Categories";
import { Orders } from "./pages/Orders";
import { Deliveries } from "./pages/Deliveries";
import { PrivateRoute } from "./components/PrivateRoute";
import { MenuProvider } from "./context/MenuContext";

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
            <Route path="/home"><PrivateRoute menu={-1} children={<Home />} /></Route>
            <Route path="/dashboard"><PrivateRoute menu={0} children={<ComponentDefault />} /></Route>
            <Route path="/employees"><PrivateRoute menu={1} children={<Employees />} /></Route>
            <Route path="/products"><PrivateRoute menu={2} children={<Products />} /></Route>
            <Route path="/categories"><PrivateRoute menu={3} children={<Categories />} /></Route>
            <Route path="/foods"><PrivateRoute menu={4} children={<Orders />} /></Route>
            <Route path="/deliveries"><PrivateRoute menu={5} children={<Deliveries />} /></Route>
            <Route path="/perfil"><PrivateRoute menu={6} children={<ComponentDefault />} /></Route>
            <Route path="/configurations"><PrivateRoute menu={7} children={<ComponentDefault />} /></Route>
            <Route path="/restaurants"><PrivateRoute menu={8} children={<ComponentDefault />} /></Route>
          </Switch>
        </Router>
      </MenuProvider>
    </div>
  )
}
