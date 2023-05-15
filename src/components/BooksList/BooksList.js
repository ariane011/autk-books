import { message, List, Button } from "antd";
import React, { Children, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BooksList from "../../service/BooksList";
import { Container, StyledTitle } from "./index.styled";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { CartContext } from "../../context/cart";

export const BookList = () => {
  const [book, setBook] = useState([]);
  const [bookCart, setBookCart] = useState([]);
  const bookName = useLocation();

  const {
    productsCart = [],
    addProducToCart,
    removeProductToCart,
    clearCart,
  } = useContext(CartContext);

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
    <>
      <Container>
        <StyledTitle>{JSON.stringify(productsCart)}</StyledTitle>
        <h3>
          {productsCart.find((item) => item.id === book.id)?.qtd
            ? productsCart.find((item) => item.id === book.id)?.qtd
            : 0}
        </h3>

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
                        onClick={() => addProducToCart(book.id)}
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
