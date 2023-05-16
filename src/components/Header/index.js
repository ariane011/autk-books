import { Row } from "antd";
import React from "react";
import { Container } from "./index.styled";

export const Header = () => {
  return (
    <Container>
      <a href={"/"} style={{ fontSize: 24, fontWeight: 500 }}>
        Autk Books
      </a>
      <Row
        style={{
          display: "flex",
          justifyContent: "center",
          width: "60%",
        }}
      ></Row>
    </Container>
  );
};
