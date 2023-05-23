import api from "./index";

const BooksListCart = () => {
  return api.get(`/cart`);
};

export default BooksListCart;
