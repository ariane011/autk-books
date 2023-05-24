import { React } from "react";
import { Header } from "./components/Header";
import Routes from "./routes";
import "antd/dist/reset.css";

function App() {
  return (
    <>
      <Header />
      <Routes />
    </>
  );
}

export default App;
