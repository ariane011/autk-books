import api from "./index";

const AddBookCart = (bookData) => {
  return api.post(`/cart`, bookData);
};

export default AddBookCart;
