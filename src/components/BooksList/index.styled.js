import styled from "styled-components";

export const StyledTitle = styled.div`
  height: 50px;
  align-items: center;
  font-family: "Roboto";
  font-style: normal;
  margin: 40px;
  h2 {
    font-family: "open-sans", sans-serif;
    font-size: 22px;
    font-weight: bold;
    width: 40%;
    border-bottom: 2px solid rgba(108, 105, 105, 0.3);
    padding-bottom: 0.35em;
    margin-bottom: 0.6em;
    color: #6c6a69;
  }
`;

export const Container = styled.div`
  padding-bottom: 50px;
  font-family: "Roboto";
  font-style: normal;
  margin-bottom: 5%;
  .ant-list-split .ant-list-item {
    border-block-end: none;
    padding-left: 50px;
    padding-right: 20px;
  }
  h4 {
    font-weight: 500;
    font-size: 18px;
    width: max-content;
  }
  p {
    font-size: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: fit-content;
    height: auto;
  }
  .p-description {
    width: 200px;
    height: auto;
  }
  .list {
    margin-top: 10px;
    width: 90%;
  }
  .btn-price {
    margin-top: 12px;
    font-weight: 400;
  }
  .ant-list-pagination {
    display: flex;
    justify-content: center;
  }
  strong {
    font-weight: 500;
  }
`;
