import styled from "styled-components";

export const StyledTitle = styled.div`
  width: 100%;
  background-color: #f2f3f8;
  height: 50px;
  /* display: flex; */
  align-items: center;
  font-family: "Roboto";
  font-style: normal;
  h1 {
    font-size: 24px;
    color: #010311;
    padding-left: 50px;
    font-weight: 700;
    width: 100%;
  }
`;

export const Container = styled.div`
  font-family: "Roboto";
  font-style: normal;
  margin-bottom: 5%;
  .ant-list-split .ant-list-item {
    border-block-end: none;
    padding-left: 50px;
    padding-right: 20px;
  }
  h2 {
    font-size: 20px;
    text-decoration-line: underline;
    color: #5062f0;
    line-height: 23px;
    font-weight: 400;
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
    /* display: flex; */
    width: 200px;
    height: auto;
  }
  .list {
    margin-top: 10px;
    width: 90%;
  }
  .btn-layout {
    background-color: transparent;
    border: none;
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
  .ant-select-selector,
  .ant-pagination-options {
    display: none;
  }
  .grid1:hover,
  .grid2:hover {
    filter: invert(39%) sepia(65%) saturate(914%) hue-rotate(202deg)
      brightness(93%) contrast(104%);
  }
`;
