import { message, List, Button } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BooksList from "../../service/BooksList";
import { Container, StyledTitle } from "./index.styled";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { CartContext } from "../../context/cart";

export const BookList = () => {
  const [book, setBook] = useState([]);
  const { productsCart = [] } = useContext(CartContext);
  // const [bookCart, setBookCart] = useState([]);
  const bookName = useLocation();

  const { addProducToCart } = useContext(CartContext);

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

  console.log(book);
  const setCart = function (productsCart) {
    localStorage.setItem("cart", JSON.stringify(productsCart));
  };
  function addItem(book) {
    const bookData = {
      id: book.id,
      qtd: 1,
      title: book.title,
      image: book.image,
      price: book.price,
    };
    if (localStorage.getItem("cart") === null) {
      // Adicionando um array com um objeto no localstorage
      localStorage.setItem("cart", JSON.stringify([bookData]));
    } else {
      // Copiando o array existente no localstorage e adicionando o novo objeto ao final.
      localStorage.setItem(
        "cart",
        // O JSON.parse transforma a string em JSON novamente, o inverso do JSON.strigify
        JSON.stringify([...JSON.parse(localStorage.getItem("cart")), bookData])
      );
    }
  }

  return (
    <>
      <Container>
        <StyledTitle>Livros</StyledTitle>
        <List
          className="list"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 5,
            total: book.length,
          }}
          dataSource={book}
          renderItem={(book) => (
            <List.Item key={book.rank}>
              <List.Item.Meta
                avatar={
                  <img width={167} alt="Capa do livro" src={book.image} />
                }
                title={book.title}
                description={
                  <div>
                    <p className="p-description">{book.description}</p>
                    <p>
                      <strong>Editora:</strong> {book.publisher}
                    </p>
                    <p>
                      <strong>Rank:</strong> {book.rank}
                    </p>
                    <Link to={"/cart-shopping"}>
                      <Button
                        type="primary"
                        shape="round"
                        size={200}
                        className={"buy-" + book.id}
                        onClick={() =>
                          // addProducToCart(book);
                          // setCart([
                          //   {
                          //     id: book.id,
                          //     qtd: 1,
                          //     title: book.title,
                          //     image: book.image,
                          //     price: book.price,
                          //   },
                          // ])
                          addItem(book)
                        }
                      >
                        Compre por{" "}
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(book.price)}
                      </Button>
                    </Link>
                  </div>
                }
              />
            </List.Item>
          )}
        ></List>
      </Container>
    </>
  );
};
