import React from "react";
import { Container } from "./index.styled";
import cart from "./../../assets/icons/cart.svg";

export const Header = () => {
  return (
    <Container>
      <div>
        <a href={"/"} style={{ fontSize: 24, fontWeight: 500, marginLeft: 50 }}>
          Autk Books
        </a>
      </div>
      <a href="/cart-shopping">
        <div style={{ margin: "0px 50px 0px auto" }}>
          <img
            src={cart}
            alt="Carrinho"
            style={{ width: 45, display: "flex" }}
          />
        </div>
      </a>
    </Container>
  );
};
