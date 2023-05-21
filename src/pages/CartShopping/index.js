import React, { useEffect, useState } from "react";
import { Container } from "./index.styled";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import BooksList from "../../service/BooksList";
import { message } from "antd";

export const CartShopping = () => {
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
      {book?.map((index) => (
        <div key={index.id}>
          <p>{index.qtd}</p>
          <p>{index.title}</p>
          <p>{index.price}</p>
          <img
            className="listBookImage"
            src={index.image}
            alt="Capa do livro"
          />
          <button>+</button>
        </div>
      ))}
    </Container>
  );
};
