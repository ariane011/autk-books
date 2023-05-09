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

const request = indexedDB.open("AutkBooks", 1);

request.onerror = function (event) {
  console.log("The database is opened failed");
};

let db;

request.onsuccess = function (event) {
  db = request.result;
  console.log("The database is opened successfully");
  add();
};

request.onupgradeneeded = function (event) {
  db = event.target.result;
  let objectStore;
  if (!db.objectStoreNames.contains("users")) {
    objectStore = db.createObjectStore("users", { keyPath: "id" });
    objectStore.createIndex("name", "name", { unique: false });
    objectStore.createIndex("email", "email", { unique: true });
  }
};

function add() {
  const request = db
    .transaction(["person"], "readwrite")
    .objectStore("person")
    .add({ id: 1, name: "Jam", age: 24, email: "jam@example.com" });

  request.onsuccess = function (event) {
    console.log("The data has been written successfully");
  };

  request.onerror = function (event) {
    console.log("The data has been written failed");
  };
}
