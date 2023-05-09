import { message, List, Button } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BooksList from "../../service/BooksList";
import { Container, StyledTitle } from "./index.styled";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { addBook } from "../../indexedDB";

export const BookList = () => {
  const [book, setBook] = useState([]);
  const bookName = useLocation();

  const dataObj = {
    id: book.id,
    title: book.title,
    description: book.title,
    price: book.price,
    publisher: book.publisher,
    image: book.image,
    rank: book.rank,
  };

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
        <StyledTitle>{/* <h1>{str}</h1> */}</StyledTitle>
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
                        // className={"buy-" + book.id}
                        // onClick={() => addBook(dataObj)}
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
