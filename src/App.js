import { React } from "react";
import { Header } from "./components/Header";
import Routes from "./routes";
import CartProvider from "./context/cart";
import "antd/dist/reset.css";

function App() {
  return (
    <>
      <CartProvider>
        <Header />
        <Routes />
      </CartProvider>
    </>
  );
}

export default App;
