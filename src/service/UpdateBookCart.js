import api from "./index";

const UpdateBookCart = (item, newData) => {
  return api.put(`/cart/${item}`, newData);
};

export default UpdateBookCart;
