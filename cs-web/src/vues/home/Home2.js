import { Button } from "@mui/material";
import React from "react";
import CategoryCardsContainer from "../../components/cardContainers/CategoryCardsContainer";
import MainFooter from "../../components/footers/MainFooter";
import Header from "../../components/headers/Header";
import PricePlans from "../../components/pricePlans/PricePlans";
import "./home2.css";

export default function () {
  return (
    <div className="home2Container">
      <Header />
      <div className="home2Texts">
        <text className="home2TextsH1">L'abonnement créatif illimité</text>
        <text className="home2TextsH2">
          Téléchargements illimités de créativité. Pour seulement 5.50 $US par
          mois.
        </text>
      </div>
      <CategoryCardsContainer />
      <div className="home2ButtonContainer">
        <Button variant="outlined" color="error">
          View more
        </Button>
      </div>
      <div className="home2WhyUs">
        <text className="home2WhyUsTitle">Pourquoi Verify</text>
        <div className="home2WhyUsElements">
          <div className="home2WhyUsElement">
            <img
              className="home2WhyUsElementImg"
              src={require("../../assets/images/icons/téléchargé.png")}
              alt="img"
            />
            <text className="home2WhyUsElementText">
              Téléchargement illimité
            </text>
            <text className="home2WhyUsElementDescription">
              Liberté de jouer, d'expérimenter et de créer.
            </text>
          </div>
          <div className="home2WhyUsElement">
            <img
              className="home2WhyUsElementImg"
              src={require("../../assets/images/icons/picsIcon.jpg")}
              alt="img"
            />
            <text className="home2WhyUsElementText">
              Produits toujours en dispo
            </text>
            <text className="home2WhyUsElementDescription">
              Tous les actifs dont vous avez besoin en un abonnement unique.
            </text>
          </div>
          <div className="home2WhyUsElement">
            <img
              className="home2WhyUsElementImg"
              src={require("../../assets/images/icons/licenseIcon.png")}
              alt="img"
            />
            <text className="home2WhyUsElementText">License simple</text>
            <text className="home2WhyUsElementDescription">
              Tous les actifs sont couverts par notre licence commerciale à vie.
            </text>
          </div>
          <div className="home2WhyUsElement">
            <img
              className="home2WhyUsElementImg"
              src={require("../../assets/images/icons/resilitionIcon.jpg")}
              alt="img"
            />
            <text className="home2WhyUsElementText">
              Résiliation à tout moment
            </text>
            <text className="home2WhyUsElementDescription">
              Nous croyons en la liberté de création - sans aucune obligation.
            </text>
          </div>
        </div>
      </div>
      <PricePlans />
      <MainFooter />
    </div>
  );
}
