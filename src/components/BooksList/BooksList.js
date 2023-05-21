import { message, List, Button } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BooksList from "../../service/BooksList";
import { Container, StyledTitle } from "./index.styled";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import api from "../../service";

export const BookList = () => {
  const [book, setBook] = useState([]);
  const bookName = useLocation();
  const fetchData = () => {
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
  };

  function addItem(book) {
    api.post("/cart", book).then((response) => {
      console.log(response);
      fetchData();
    });
  }

  return (
    <>
      <Container>
        <StyledTitle>Livros Populares</StyledTitle>
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
                        onClick={() => addItem(book)}
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
