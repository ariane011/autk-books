import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Books } from "./pages/Books";
import { Home } from "./pages/Home";
import { CartShopping } from "./pages/CartShopping";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path={"/:bookName"} exact component={Books} />
        <Route path={"/CartShopping"} exact component={CartShopping} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
