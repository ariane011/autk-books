import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 80px;
  background-color: #ff6b6b;
  justify-content: space-between;
  margin: auto;
  .title-logo {
    font-size: 22px;
    margin-left: 5px;
    font-weight: 600;
    font-family: "Comfortaa", cursive;
  }
  a {
    text-decoration: none;
    color: white;
    font-family: "Roboto";
  }
  .ant-input-affix-wrapper {
    border-radius: 15px;
  }
`;
