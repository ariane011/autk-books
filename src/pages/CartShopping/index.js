import React, { useEffect, useState } from "react";
import { Container, StyledIcon } from "./index.styled";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { Popconfirm, Table, Tooltip, message } from "antd";
import BooksListCart from "../../service/BookListCart";
import DeleteBookCart from "../../service/DeleteBookCart";
import api from "../../service";
import more from "./../../assets/icons/add.png";
import less from "./../../assets/icons/less.png";
import trash from "./../../assets/icons/delete.png";

export const CartShopping = () => {
  const [cart, setCart] = useState([]);
  const [countQtd, setCountQtd] = useState(1);
  const bookName = useLocation();

  const getBooksCart = () => {
    BooksListCart(bookName.pathname).then((response) => {
      const booksCart = response.data;
      setCart(booksCart);
    });
  };

  useEffect(() => {
    try {
      getBooksCart();
    } catch (error) {
      message.error(
        "Houve um erro ao carregar as informações, tente novamente mais tarde"
      );
    }
  }, [bookName]);

  const removeItem = (item) => {
    console.log("disparou remove item");
    DeleteBookCart(item).then((response) => {
      console.log(response);
      getBooksCart();
    });
  };

  const updateItem = (item, action) => {
    let newQuantity = item.qtd;
    if (action === "decrease") {
      if (newQuantity === 1) {
        return;
      }
      newQuantity -= 1;
    }
    if (action === "increase") {
      newQuantity += 1;
    }
    const newData = {
      ...item,
      qtd: newQuantity,
    };
    console.log(item.qtd);
    console.log("New data", { newData });
    api.put(`/cart/${item.id}`, newData).then((response) => {
      console.log("Response", { response });
      getBooksCart();
    });
  };

  const defaultColumns = [
    {
      title: "Produto",
      dataIndex: "image",
      render: (image) => (
        <img alt="Imagem do produto" src={image} style={{ width: 70 }} />
      ),
      width: "15%",
      editable: false,
    },
    {
      title: "Nome",
      dataIndex: "title",
      width: "20%",
      editable: false,
    },
    {
      title: "Preço",
      dataIndex: "price",
      render: (price) =>
        new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(price),
      width: "15%",
      editable: false,
    },
    {
      render: (index) => (
        <div className="colunm-qtd">
          <button
            className="btn-qtd"
            onClick={() => updateItem(index, "decrease")}
          >
            <StyledIcon>
              <img src={less} alt="Less" />
            </StyledIcon>
          </button>
          <p>{index.qtd}</p>
          <button
            className="btn-qtd"
            onClick={() => updateItem(index, "increase")}
          >
            <StyledIcon>
              <img src={more} alt="More" />
            </StyledIcon>
          </button>
        </div>
      ),
    },
    {
      render: (index, record) =>
        cart.length >= 1 ? (
          <Popconfirm
            title="Tem certeza que deseja excluir?"
            onConfirm={() => removeItem(index.id)}
          >
            <Tooltip placement="bottom" title={"Excluir"}>
              <StyledIcon>
                <img src={trash} alt="Excluir" />
              </StyledIcon>
            </Tooltip>
          </Popconfirm>
        ) : null,
    },
  ];

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
      }),
    };
  });

  return (
    <Container>
      {/* {cart?.map((index) => ( */}
      <>
        <Table
          // components={components}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={cart}
          columns={columns}
          className="table"
        />
        {/* <div key={index.id}>
            <p>{index.qtd}</p>
            <p>{index.title}</p>
            <p>{index.price}</p>
            <img
              className="listBookImage"
              src={index.image}
              alt="Capa do livro"
            />
            <button onClick={() => updateItem(index.qtd, "decrease")}>-</button>
            <button onClick={() => updateItem(index.qtd, "increase")}>+</button>
            <button onClick={() => removeItem(index.id)}>x</button>
          </div> */}
      </>
      {/* ))} */}
    </Container>
  );
};
