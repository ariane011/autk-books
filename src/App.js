import { React } from "react";
import { Header } from "./components/Header";
import Routes from "./routes";
import CartProvider from "./context/cart";

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
