import { message, List, Button } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BooksList from "../../service/BooksList";
import { Container, StyledTitle } from "./index.styled";

export const BookList = () => {
  const [book, setBook] = useState([]);
  const bookName = useLocation();

  useEffect(() => {
    try {
      BooksList(bookName.pathname).then((response) => {
        const books = response.data;
        setBook(books);
        console.log(books);
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
        <StyledTitle>{/* <h1>{str}</h1> */}</StyledTitle>
        <List
          className="list"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 5,
            // total: book.num_results,
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
                    <p>{book.description}</p>
                    <p>
                      <strong>Editora:</strong> {book.publisher}
                    </p>
                    <p>
                      <strong>Rank:</strong> {book.rank}
                    </p>
                    <a
                      href={book.amazon_product_url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Button
                        type="primary"
                        shape="round"
                        size={200}
                        className="btn-price"
                      >
                        Compre por{" "}
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(book.price)}
                      </Button>
                    </a>
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
