import { Divider, Table } from "antd";
import React from "react";

export const TableCart = (columns, data) => {
  return (
    <>
      <Divider>Middle size table</Divider>
      <Table columns={columns} dataSource={data} size="small" />
    </>
  );
};
