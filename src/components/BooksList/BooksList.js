import { message, List, Button } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BooksList from "../../service/BooksList";
import { Container, StyledTitle } from "./index.styled";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import AddBookCart from "../../service/AddBookCart";
import BooksListCart from "../../service/BookListCart";
import UpdateBookCart from "../../service/UpdateBookCart";

export const BookList = () => {
  const [book, setBook] = useState([]);
  const [bookCart, setBookCart] = useState([]);
  const [contem, setContem] = useState(false);
  const bookName = useLocation();

  const getBooks = () => {
    BooksList(bookName.pathname).then((response) => {
      const books = response.data;
      setBook(books);
    });
  };

  const getCart = (bookData) => {
    BooksListCart(bookData).then((response) => {
      const booksCart = response.data;
      setBookCart(booksCart);
    });
  };

  const getBookListCart = (bookData) => {
    let find = bookCart.findIndex((item) => item.id === bookData.id);
    if (find !== -1) {
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    try {
      getBooks();
      getCart();
    } catch (error) {
      message.error(
        "Houve um erro ao carregar as informações, tente novamente mais tarde"
      );
    }
  }, [bookName]);

  const updateItem = (item) => {
    let newQtd = item.qtd;
    newQtd += 1;
    const newData = {
      ...item,
      qtd: newQtd,
    };
    UpdateBookCart(item.id, newData).then((response) => {
      getBooks();
    });
  };

  function addItem(bookData) {
    if (!getBookListCart(bookData)) {
      updateItem(bookData);
    } else {
      AddBookCart(bookData).then((response) => {
        getBooks();
      });
    }
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
