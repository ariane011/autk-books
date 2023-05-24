import styled from "styled-components";

export const Container = styled.div`
  padding-bottom: 100px;
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

export const StyledTableFooter = styled.div`
  display: grid;
  justify-content: flex-end;
  align-items: flex-end;
  margin-right: 50px;
  .btn-finish {
    background-color: #ff793f;
    height: 40px;
    font-weight: 500;
    font-size: 16px;
    &:hover {
      background-color: #fd9644;
    }
  }
  p {
    font-size: 16px;
    font-weight: 500;
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
