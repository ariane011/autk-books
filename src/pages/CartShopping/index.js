import React, { useEffect, useState } from "react";
import { Container, StyledIcon, StyledTableFooter } from "./index.styled";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { Button, Popconfirm, Table, Tooltip, message } from "antd";
import BooksListCart from "../../service/BookListCart";
import DeleteBookCart from "../../service/DeleteBookCart";
import more from "./../../assets/icons/add.png";
import less from "./../../assets/icons/less.png";
import trash from "./../../assets/icons/delete.png";
import UpdateBookCart from "../../service/UpdateBookCart";
import { StyledTitle } from "../../components/BooksList/index.styled";

export const CartShopping = () => {
  const [cart, setCart] = useState([]);
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
    DeleteBookCart(item).then((response) => {
      getBooksCart();
    });
  };

  const updateItem = (item, action) => {
    let newQtd = item.qtd;
    if (action === "decrease") {
      if (newQtd === 1) {
        return;
      }
      newQtd -= 1;
    }
    if (action === "increase") {
      newQtd += 1;
    }
    const newData = {
      ...item,
      qtd: newQtd,
    };
    UpdateBookCart(item.id, newData).then((response) => {
      getBooksCart();
    });
  };

  const subTotalCart = () => {
    let sum = 0;
    for (let item of cart) {
      sum += item.price * item.qtd;
    }
    return sum;
  };

  const subTotal = subTotalCart();

  const discountCard = (calcDiscount) => {
    let percentageTwoBooks = 0.05;
    let percentageThreeBooks = 0.1;
    let percentageFourBooks = 0.2;
    let percentageFiveBooks = 0.25;
    if (cart.length === 2) {
      let calcPercentage = subTotal * percentageTwoBooks;
      calcDiscount = calcPercentage;
    }
    if (cart.length === 3) {
      let calcPercentage = subTotal * percentageThreeBooks;
      calcDiscount = calcPercentage;
    }
    if (cart.length === 4) {
      let calcPercentage = subTotal * percentageFourBooks;
      calcDiscount = calcPercentage;
    }
    if (cart.length >= 5) {
      let calcPercentage = subTotal * percentageFiveBooks;
      calcDiscount = calcPercentage;
    }
    return calcDiscount;
  };

  const discount = discountCard();
  const totalDiscount = subTotal - discount;

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
      title: "Quantidade",
      render: (index) => (
        <div className="colunm-qtd">
          <button
            className="btn-qtd"
            onClick={() => updateItem(index, "decrease")}
          >
            <StyledIcon>
              <img src={less} alt="Menos" />
            </StyledIcon>
          </button>
          <p>{index.qtd}</p>
          <button
            className="btn-qtd"
            onClick={() => updateItem(index, "increase")}
          >
            <StyledIcon>
              <img src={more} alt="Mais" />
            </StyledIcon>
          </button>
        </div>
      ),
    },
    {
      title: "Total",
      render: (index) => {
        let calc = index.price * index.qtd;
        return new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(calc);
      },
      width: "15%",
      editable: false,
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
      <StyledTitle>
        <h2 font> Seus Produtos</h2>
      </StyledTitle>
      <Table
        rowClassName={() => "editable-row"}
        bordered
        dataSource={cart}
        columns={columns}
        className="table"
        scroll={{
          y: 300,
        }}
        footer={() => (
          <StyledTableFooter>
            <div>
              <p>
                {discount ? (
                  <>
                    Subtotal:{" "}
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(subTotal)}
                  </>
                ) : (
                  ""
                )}
              </p>
            </div>
            <div>
              <p style={{ color: "green", fontStyle: "italic" }}>
                {discount ? (
                  <>
                    Desconto aplicado:{" "}
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(discount)}
                  </>
                ) : (
                  ""
                )}
              </p>
            </div>
            <div>
              <p>
                {discount ? (
                  <>
                    Total com desconto:{" "}
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(totalDiscount)}
                  </>
                ) : (
                  <>
                    Total:{" "}
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(subTotal)}
                  </>
                )}
              </p>
            </div>
            <div>
              <Button type="primary" size={320} className="btn-finish">
                Finalizar Compra
              </Button>
            </div>
          </StyledTableFooter>
        )}
      />
    </Container>
  );
};
