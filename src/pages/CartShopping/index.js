import React from "react";
import { Container } from "./index.styled";

export const CartShopping = () => {
  const books = localStorage.getItem("id");
  return (
    <Container>
      <h1>Carrinho de compras</h1>
      <p>{books}</p>
    </Container>
  );
};
