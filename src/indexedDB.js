// IndexedDB connection (IDBDatabase)

// function createDatabase() {
//   const request = indexedDB.open("AutkBooks", 1);
//   request.onsuccess = (e) => {
//     // Create DB connection
//     return request.result;
//   };
//   request.onerror = (e) => {
//     console.log(`IndexedDB error: ${request.errorCode}`);
//   };
// }
// createDatabase();
// export function addBook(book) {
//   let db = indexedDB.open("AutkBooks", 1);
//   console.log(typeof db);
//   const transaction = db.transaction(["books"], "readwrite");

//   transaction.oncomplete = function (event) {};

//   transaction.onerror = function (event) {};

//   const objectStore = transaction.objectStore("books");

//   // Add new book
//   const request = objectStore.add(book);

//   request.onsuccess = () => {
//     // request.result contains key of the added object
//     // console.log(`New book added, title: ${request.result}`);
//     // db = request.result;
//     console.log("The database is opened successfully");
//     // createDatabase();
//   };

//   request.onerror = (err) => {
//     console.error(`Error to add new book: ${err}`);
//   };
// }

//Create a profile database
const database = indexedDB.open("AutkBooks", 5);

//Do something if error occurs to create it
database.onerror = function (event) {
  alert("Error creating database");
};

//Create a a constbile to store info that needs to be added to database.
const dataObj = {
  id: 1,
  title: "Test",
  description: "...",
  price: 20.9,
  publisher: "Editora",
  image: "url",
};
//If the database is created run.
export function addBook(book) {
  database.onsuccess = function (event) {
    console.log(book);
    const db = event.target.result;

    const transaction = db.transaction(["books"], "readwrite");

    transaction.objectStore("books").add(book);
  };
}
database.onupgradeneeded = function (event) {
  const db = event.target.result;
  let objectStore;
  //
  if (!db.objectStoreNames.contains("books")) {
    objectStore = db.createObjectStore("books", { keyPath: "id" });
    objectStore.createIndex("title", "title", { unique: false });
    objectStore.createIndex("price", "price", { unique: true });
    objectStore.createIndex("image", "image", { unique: true });
  }
};

// addBook(dataObj);
