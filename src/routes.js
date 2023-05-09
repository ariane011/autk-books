import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home } from "./pages/Home";
import { CartShopping } from "./pages/CartShopping";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path={"/cart-shopping"} exact component={CartShopping} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
