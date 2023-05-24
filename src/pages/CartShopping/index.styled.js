import styled from "styled-components";

export const Container = styled.div`
  padding-bottom: 50px;
  .ant-table-pagination {
    display: none;
  }
  .table {
    margin: 40px;
  }
  .colunm-qtd {
    display: flex;
    justify-content: center;
    text-align: center;
    p {
      margin: 7px;
    }
  }

  .btn-qtd {
    border: none;
    background-color: transparent;
  }
`;

export const StyledIcon = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  img {
    width: 20px;
  }
`;
