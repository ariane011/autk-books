import React from "react";
import { Container } from "./index.styled";
import cart from "./../../assets/icons/cart.svg";
import books from "./../../assets/icons/books.svg";

export const Header = () => {
  return (
    <Container>
      <div style={{ display: "flex", alignItems: "center" }}>
        <img src={books} alt="Books" style={{ width: 35, marginLeft: 50 }} />
        <a href={"/"} className="title-logo">
          autk books
        </a>
      </div>
      <a href="/cart-shopping">
        <div style={{ margin: "0px 50px 0px auto" }}>
          <img
            src={cart}
            alt="Carrinho"
            style={{ width: 35, display: "flex" }}
          />
        </div>
      </a>
    </Container>
  );
};
