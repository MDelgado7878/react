import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/header";
import "./styles.css"
import FirstForm from "./FirstForm";
import Footer from "./components/footer";

const App = () => {
  return (
    <div>
      <Header />
      <FirstForm />
      <Footer/>
    </div>
  );
}


export default App;