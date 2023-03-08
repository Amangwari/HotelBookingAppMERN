import "./home.css";
import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Header from "../../Components/Header/Header";
import Featured from "../../Components/featured/Featured";
import Propertylist from "../../Components/propertyList/Propertylist";
import Featureproperties from "../../Components/featureproperties/Featureproperties";
import Maillists from "../../Components/maillists/Maillists";
import Footer from "../../Components/footer/Footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer">
        <Featured />
        <h1 className="homeTitle">Browse By Property Type</h1>
        <Propertylist />
        <h1 className="homeTitle">Homes guests love</h1>
        <Featureproperties />
        <Maillists />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
