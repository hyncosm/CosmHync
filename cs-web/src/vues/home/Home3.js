import React, { useEffect, useState } from "react";
import EcommHeader from "../../components/headers/EcommHeader";
import "./Home3.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import MainFooter from "../../components/footers/MainFooter";
import { api, media } from "../../global";
import useWindowDimensions from "../../components/helpers/useWindowDimensions";

var divsToRender = [];

export default function Home3() {
  const [resultsRender, setResultsRender] = useState([]);
  const { width } = useWindowDimensions();
  const [increment, setIncrement] = useState();

  useEffect(() => {
    setIncrement(width < 850 ? 2 : 3);
  }, [increment, width]);

  useEffect(() => {
    axios
      .get(`${api}/api/product/all`)
      .then((p) => {
        // setProducts(p.data);
        for (var i = 0; i < p.data.length; i += increment) {
          divsToRender.push(
            <div
              style={{
                display: "flex",
                marginBottom: "4vh",
                width: "100%",
                justifyContent: "space-around",
              }}
              key={i}
            >
              {p.data.slice(i, i + increment).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          );
          // setResultsRender([
          //   ...resultsRender,
          //   <div style={{ flexDirection: "row", marginBottom: "4vh" }} key={i}>
          //     {p.data.slice(i, i + 3).map((product) => (
          //       <ProductCard key={product._id} product={product} />
          //     ))}
          //   </div>,
          // ]);
        }
        setResultsRender(divsToRender[0]);
        // setImage(`${media}/files/${p.data.pictures[0]}`);
      })
      .catch((err) => {
        console.log("Error : ", err);
      });
  }, [increment, resultsRender]);
  return (
    <div>
      <EcommHeader />
      <div className="home3ImageContainer">
        <img
          src={require("../../assets/images/backgrounds/21.jpg")}
          className="home3Image"
          alt="img"
        />
        <div className="home3ImageTexts">
          <text className="Home3ImageText1">Bienvenue Sur Notre Boutique</text>
          <text className="Home3ImageText2">
            Des Produits Qui Feront Briller Votre Journée !
          </text>
          <img
            className="home3HeaderImg"
            src={require("../../assets/images/logos/4.png")}
            alt="img"
          />
          <div className="Home3ImageText3Container">
            <text className="Home3ImageText3">Organic All Natural</text>
          </div>
        </div>

        <div className="home3RBContainer">
          <img
            className="home3RBImg"
            src={require("../../assets/images/divs/RoundButtons.PNG")}
            alt="img"
          />
        </div>
        <div className="home3ProductsSellsContainer">
          <div className="home3ProductsTitle">
            <text className="home3ProductsTitleText">Our Best Sells !</text>
          </div>
          <div className="home3ProductsCards">
            {resultsRender ? (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}
              >
                {/* <ProductCard product={product} />
                <ProductCard product={product} />
                <ProductCard product={product} /> */}

                {resultsRender}
              </div>
            ) : null}
          </div>
          <div className="home3ViewMoreButton">
            <Button
              variant="contained"
              color="success"
              component={Link}
              to="/productsList"
            >
              View More
            </Button>
          </div>
        </div>
        <div className="home3CIContainer">
          <img
            className="home3CImg"
            src={require("../../assets/images/backgrounds/3.jpg")}
            alt="img"
          />
          <div className="home3CTextContainer">
            <text className="home3CText">
              It's All About Chemical-Free Products
            </text>
            <div className="home3CBody">
              <div className="home3CBodyLeft"></div>
              <div className="home3CBodyRight">
                <div className="home3CBodyRightTop" />
                <div className="home3CBodyRightBottom">
                  <text className="home3CText2">
                    <i>
                      Produits cosmétiques et de beauté - la boutique en ligne
                      pour tout ce qui est beauté. Cosmétiques et produits de
                      beauté dans notre boutique en ligne - l'endroit idéal pour
                      trouver tout ce dont tu as besoin pour ton maquillage.
                      Nous proposons une large gamme de produits de marque :
                      Maquillage, soins de la peau, soins capillaires et
                      parfums.
                    </i>
                  </text>
                </div>
              </div>
            </div>
            <div className="home3CButtonContainer">
              <div className="home3CButton">
                <text className="home3CButtonText">More About Us</text>
              </div>
            </div>
          </div>
        </div>
        <div className="home3ProductsContainer">
          <div className="home3ProductsTitle">
            <text className="home3ProductsTitleText">
              Our latest products !
            </text>
          </div>
          <div className="home3ProductsCards">
            {resultsRender ? (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}
              >
                {/* <ProductCard product={product} />
                <ProductCard product={product} />
                <ProductCard product={product} /> */}
                {divsToRender[1]}
              </div>
            ) : null}
          </div>
          <div className="home3ViewMoreButton">
            <Button
              variant="contained"
              color="success"
              component={Link}
              to="/productsList"
            >
              View More
            </Button>
          </div>
        </div>

        <div className="home3BottomImageContainer">
          <img
            className="home3BottomImg"
            src={require("../../assets/images/backgrounds/6.jpeg")}
            alt="img"
          />
          <div className="home3BottomTexts">
            <text className="home3BottomH1">Made with essential oils</text>
            <text className="home3BottomH2">
              Luxury Products Delivered within 24H - 48h
            </text>
            <text className="home3BottomH3">
              Unique products with unique discounts
            </text>
          </div>
        </div>
        <MainFooter />
        <div style={{ height: "10vh" }}></div>
      </div>
    </div>
  );
}

function ProductCard({ product }) {
  const { width } = useWindowDimensions();
  return (
    <div className="home3ProductCard">
      <div className="home3ProductCardImageC">
        <img
          src={`${media}/files/${product.pictures[0]}`}
          className="home3ProductCardImage"
          alt="img"
        />
      </div>
      <div className="home3ProductBottom">
        <div className="home3ProductBottomLeft">
          <div className="home3ProductPrice">
            <text className="home3ProductPriceBefore">
              <strike>{product.oldPrice} dh</strike>
            </text>
            <text className="home3ProductPriceAfter">{product.price} dh</text>
          </div>
        </div>
        <div className="home3ProductBottomRight">
          {/* <IconButton color="primary" alt="Save">
            <SaveAltIcon fontSize="small" />
          </IconButton>
          <IconButton color="primary">
            <DownloadIcon fontSize="small" />
          </IconButton>
           */}
          <Button
            size={width < 650 ? "small" : "medium"}
            component={Link}
            to={{
              pathname: "/productDetail",
              search: product._id,
            }}
            variant="contained"
            color="success"
          >
            Details
          </Button>
        </div>
      </div>
    </div>
  );
}
