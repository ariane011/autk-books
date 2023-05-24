import { message, List, Button } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BooksList from "../../service/BooksList";
import { Container, StyledTitle } from "./index.styled";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import AddBookCart from "../../service/AddBookCart";

export const BookList = () => {
  const [book, setBook] = useState([]);
  const bookName = useLocation();

  const getBooks = () => {
    BooksList(bookName.pathname).then((response) => {
      const books = response.data;
      setBook(books);
    });
  };

  useEffect(() => {
    try {
      getBooks();
    } catch (error) {
      message.error(
        "Houve um erro ao carregar as informações, tente novamente mais tarde"
      );
    }
  }, [bookName]);

  function addItem(bookData) {
    AddBookCart(bookData).then((response) => {
      getBooks();
    });
  }

  return (
    <>
      <Container>
        <StyledTitle>
          <h2> Livros Populares</h2>
        </StyledTitle>
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
                          addItem({
                            id: book.id,
                            qtd: 1,
                            title: book.title,
                            image: book.image,
                            price: book.price,
                          })
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
