import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { api, media } from "../../global";
import MainFooter from "../../components/footers/MainFooter";
import EcommHeader from "../../components/headers/EcommHeader";
import "./productsList.css";
import useWindowDimensions from "../../components/helpers/useWindowDimensions";

var divsToRender = [];

const categories = [
  "Oral",
  "Skin",
  "Hair",
  "Sun",
  "Decorative",
  "Body",
  "Perfume",
  "Accessories",
  "All",
];

export default function ProductsList() {
  const { width } = useWindowDimensions();
  const [increment, setIncrement] = useState();
  const [resultsRender, setResultsRender] = useState([]);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    setIncrement(width < 850 ? 2 : 3);
  }, [increment, width]);

  useEffect(() => {
    axios
      .get(`${api}/api/product/all`)
      .then((response) => {
        for (var i = 0; i < response.data.length; i += increment) {
          divsToRender.push(
            <div
              style={{
                display: "flex",
                marginBottom: "4vh",
                width: "100%",
                justifyContent: "space-evenly",
              }}
              key={i}
            >
              {response.data.slice(i, i + increment).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          );
          setResultsRender(divsToRender);
        }
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  }, [increment, resultsRender]);

  const handleCategoryChange = (e) => {
    e.preventDefault();
    setCategory(e.target.value);
  };

  return (
    <div className="productsListContainer">
      <EcommHeader />
      <div className="productsListHeaderText">
        <text className="productsListHeaderTextTitle">Sentez la beauté</text>
        <text className="productsListHeaderTextDesc">
          Trouvez des produits qui vous conviennent le plus ! Et bien de nouvau
          produits ajoutés quotidienement pour être à la hauteur de vos
          attentes.
        </text>
      </div>
      <div className="productsListBody">
        <div className="productsListBodyHeader">
          <text className="productsListBodyTitle">Our products</text>
          <div className="productsListBodyFilter">
            {/* <text className="productsListBodyFilterTitle">Filter</text> */}
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                // labelId="demo-simple-select-label"
                // id="demo-simple-select"
                // noderef={category}
                value={category}
                label="Category"
                onChange={handleCategoryChange}
              >
                {categories &&
                  categories.map((category) => {
                    return (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="productsListCards">
          {/* {products && products !== null ? (
            <div>
              {products.map((p) => {
                return <ProductCard key={p._id} product={p} />;
              })}
            </div>
          ) : null} */}
          {resultsRender}
        </div>
      </div>
      <MainFooter />
      <div style={{ height: "10vh" }}></div>
    </div>
  );
}

function ProductCard({ product }) {
  return (
    <div className="productListProductCard">
      <div className="productListProductCardImageC">
        <img
          src={`${media}/files/${product.pictures[0]}`}
          className="productListProductCardImage"
          alt="img"
        />
      </div>
      <div className="productListProductBottom">
        <div className="productListProductBottomLeft">
          <div className="productListProductPrice">
            <text className="productListProductPriceBefore">
              <strike>{product.oldPrice} dh</strike>
            </text>
            <text className="productListProductPriceAfter">
              {product.price} dh
            </text>
          </div>
        </div>
        <div className="productListProductBottomRight">
          {/* <IconButton color="primary" alt="Save">
              <SaveAltIcon fontSize="small" />
            </IconButton>
            <IconButton color="primary">
              <DownloadIcon fontSize="small" />
            </IconButton>
             */}
          <Button
            component={Link}
            to={{
              pathname: "/productDetail",
              search: product._id,
            }}
            variant="contained"
            color="success"
          >
            Buy
          </Button>
        </div>
      </div>
    </div>
  );
}
