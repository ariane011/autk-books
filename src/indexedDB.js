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

// const dbRequest = indexedDB.open("connectDB", 1);

// dbRequest.onerror = function (event) {
//   console.log("The database is opened failed");
// };

// let db;

// dbRequest.onupgradeneeded = function (event) {
//   let db = event.target.result;
//   let objectStore;
//   if (!db.objectStoreNames.contains("users")) {
//     objectStore = db.createObjectStore("users", { keyPath: "id" });
//     objectStore.createIndex("name", "name", { unique: false });
//     objectStore.createIndex("email", "email", { unique: true });
//   }
// };

// export function add(event) {
//   const db = dbRequest.result;
//   const request = db
//     .transaction(["person", "readwrite"])
//     .objectStore("person")
//     .add({ id: 1, name: "Jam", age: 24, email: "jam@example.com" });

//   request.onsuccess = function (event) {
//     console.log("The data has been written successfully");
//   };

//   request.onerror = function (event) {
//     console.log("The data has been written failed");
//   };
// }

//Creating an indexDB - Used to store users information.

//Create a profile database
const database = indexedDB.open("ProfileDatabase", 5);

//Do something if error occurs to create it
database.onerror = function (event) {
  alert("Error creating database");
};

//Create a a constbile to store info that needs to be added to database.
const book1 = { id: 1, name: "Programming" };
//If the database is created run.
database.onsuccess = function (event) {
  const db = event.target.result;

  const transaction = db.transaction(["books"], "readwrite");

  transaction
    .objectStore("books")
    .add({ id: 1, name: "Jam", age: 24, email: "jam@example.com" });
};

// dbRequest.onupgradeneeded = function (event) {
//   let db = event.target.result;
//   let objectStore;
//   if (!db.objectStoreNames.contains("users")) {
//     objectStore = db.createObjectStore("users", { keyPath: "id" });
//     objectStore.createIndex("name", "name", { unique: false });
//     objectStore.createIndex("email", "email", { unique: true });
//   }
// };

//On upgrade needed.
database.onupgradeneeded = function (event) {
  const db = event.target.result;

  alert("Run onupgradeneeded");
  let objectStore;
  //
  if (!db.objectStoreNames.contains("books")) {
    objectStore = db.createObjectStore("books", { keyPath: "id" });
    objectStore.createIndex("name", "name", { unique: false });
    objectStore.createIndex("email", "email", { unique: true });
  }
};
