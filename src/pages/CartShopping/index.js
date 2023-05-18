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

  const setCart = function (productsCart) {
    localStorage.setItem("cart", JSON.stringify(book));
    // console.log(productsCart.find((product) => product.qtd));
  };
  const itemQtd = book.qtd;
  const setQtd = function (productsCart) {
    localStorage.setItem("cart", itemQtd);
    // console.log(productsCart.find((product) => product.qtd));
  };
  const storageValue = JSON.parse(localStorage.getItem("cart"));
  console.log(storageValue);

  // const convert = Object.keys(storageValue);
  console.log(storageValue);

  function saveEditedNote(qtd) {
    let notesEdit = JSON.parse(localStorage.getItem("cart")).filter(
      (item) => item.noteQtd !== qtd
    );
    console.log(notesEdit);
    // notesEdit.push({
    //   qtd: 1,
    // });
    localStorage.setItem("cart", JSON.stringify(notesEdit));
  }
  return (
    <Container>
      {storageValue?.map((index) => (
        <div key={index.id}>
          <p>{index.qtd}</p>
          <p>{index.title}</p>
          <img src={index.image} alt="Capa do livro" />
          <button
            onClick={() => {
              setCountQtd(countQtd + 1);
              // localStorage.setItem("cart", JSON.stringify(qtd));
              // saveEditedNote();
            }}
          >
            +
          </button>
        </div>
      ))}
    </Container>
  );
};
