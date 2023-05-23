import api from "./index";

const DeleteBookCart = (item) => {
  return api.delete(`/cart/${item}`);
};

export default DeleteBookCart;
