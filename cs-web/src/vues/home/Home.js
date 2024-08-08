import React from "react";
import DropButtons from "../../components/headers/DropButtons";
import Header from "../../components/headers/Header";
import SearchBar from "../../components/searchBar/SearchBar";
import CardsContainer from "../../components/cards/CardsContainer";
import ThemesDiv from "../../components/themes/ThemesDiv";
import ProductCardsContainer from "../../components/cardContainers/ProductCardsContainer";
import "./home.css";
import MainFooter from "../../components/footers/MainFooter";
// import { useNavigate } from "react-router-dom";

export default function Home() {
  // const navigate = useNavigate();

  return (
    <div>
      <Header />
      <div className="scroll">
        <DropButtons />
        <SearchBar />
        {/* <CategoryButtonsContainer /> */}
        <div className="categoriesTemp">
          <img
            className="categoriesTempImg"
            src={require("../../assets/images/temp/cattegories.PNG")}
            alt="img"
          />
        </div>
        {/* <div className="categoriesTempx">
        <text className="testText"></text>
      </div> */}
        <div className="categoriesTempx">
          <img
            className="categoriesTempImg1"
            src={require("../../assets/images/temp/blueImg.PNG")}
            alt="img"
          />
        </div>
        <CardsContainer />
        <div className="categoriesTempx">
          <img
            className="categoriesTempImg1"
            src={require("../../assets/images/temp/sameee.PNG")}
            alt="img"
          />
        </div>
        <ThemesDiv />
        <div className="categoriesTemp2">
          <img
            className="categoriesTempImg2"
            src={require("../../assets/images/temp/same.PNG")}
            alt="img"
          />
        </div>
        {/* <div className="categoriesTempy">
        <img
          className="categoriesTempImgy"
          src={require("../../assets/images/temp/same.PNG")}
        />
      </div> */}
        <ProductCardsContainer />
        <div className="categoriesTemp2">
          <img
            className="categoriesTempImg1"
            src={require("../../assets/images/temp/join.PNG")}
            alt="img"
          />
        </div>
        <div className="categoriesTemp2">
          <img
            className="categoriesTempImg1"
            src={require("../../assets/images/temp/easy.PNG")}
            alt="img"
          />
        </div>
        {/* <DarkFooter /> */}
        {/* <div className="categoriesTempFooter">
        <img
          className="categoriesTempImgFooter"
          src={require("../../assets/images/footer1.jpg")}
        />
      </div> */}

        {/* <div style={{ height: "10vh" }}></div> */}
      </div>
      <MainFooter />
    </div>
  );
}
