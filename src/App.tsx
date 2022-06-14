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

export default function App() {
  const ComponentDefault = () => {
    return (
      <h1>teste</h1>
    )
  }

  return (
    <div className="principal-container">
      <Router>
        <Switch>
          <Route path="/home"><PrivateRoute children={<Home />} /></Route>
          <Route path="/dashboard"><PrivateRoute children={<ComponentDefault />} /></Route>
          <Route path="/employees"><PrivateRoute children={<Employees />} /></Route>
          <Route path="/products"><PrivateRoute children={<Products />} /></Route>
          <Route path="/categories"><PrivateRoute children={<Categories />} /></Route>
          <Route path="/foods"><PrivateRoute children={<Orders />} /></Route>
          <Route path="/deliveries"><PrivateRoute children={<Deliveries />} /></Route>
          <Route path="/perfil"><PrivateRoute children={<ComponentDefault />} /></Route>
          <Route path="/configurations"><PrivateRoute children={<ComponentDefault />} /></Route>
          <Route path="/restaurants"><PrivateRoute children={<ComponentDefault />} /></Route>
        </Switch>
      </Router>
    </div>
  )
}
