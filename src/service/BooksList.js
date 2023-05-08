import api from "./index";

const BooksList = () => {
  return api.get(`/books`);
};

export default BooksList;
