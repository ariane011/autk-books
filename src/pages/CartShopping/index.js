import React, { useContext, useEffect, useState } from "react";
import { Container } from "./index.styled";
import { CartContext } from "../../context/cart";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import BooksList from "../../service/BooksList";
import { message } from "antd";

export const CartShopping = () => {
  const { productsCart = [] } = useContext(CartContext);
  const [book, setBook] = useState([]);
  const [countQtd, setCountQtd] = useState(1);
  const bookName = useLocation();

  useEffect(() => {
    try {
      BooksList(bookName.pathname).then((response) => {
        const books = response.data;
        setBook(books);
      });
    } catch (error) {
      message.error(
        "Houve um erro ao carregar as informações, tente novamente mais tarde"
      );
    }
  }, [bookName]);

  return (
    <Container>
      {/* {productsCart.find((item) => item.id === book.id)?.qtd
        ? productsCart.find((item) => item.id === book.id)?.qtd
        : "Seu carrinho está vazio"} */}
      {productsCart.map((index) => (
        <>
          <p key={index.id}>{(index.qtd = countQtd)}</p>
          <p key={index.id}>{index.title}</p>
          <img src={index.image} alt="Capa do livro" />
          <button onClick={() => setCountQtd(countQtd + 1)}>+</button>
        </>
      ))}
    </Container>
  );
};
