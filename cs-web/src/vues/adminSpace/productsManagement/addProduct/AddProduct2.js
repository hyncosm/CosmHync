import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { CircularProgress, Select } from "@material-ui/core";
import "./addProduct.css";
import { addProduct } from "../../../../service/apiCalls";
import { connect } from "react-redux";
import axios from "axios";
import EcommHeader from "../../../../components/headers/EcommHeader";
import { media } from "../../../../global";
import MainFooter from "../../../../components/footers/MainFooter";
import { FormControl, InputLabel, MenuItem } from "@mui/material";

const categories = [
  "Oral",
  "Skin",
  "Hair",
  "Sun",
  "Decorative",
  "Body",
  "Perfume",
  "Accessories",
];

const mapStateToProps = (state) => {
  return {
    user: state.authReducer.user,
  };
};

// var imagesToRender;

function AddProduct2({ user }) {
  const [category, setCategory] = useState("Hair");
  //   const [item, setItem] = useState();
  const productName = useRef();
  const description = useRef();
  const price = useRef();
  const oldPrice = useRef();
  const [image, setImage] = useState();
  //   const [imagePreview, setImagePreview] = useState();
  const { isFetching } = useContext(AuthContext);

  const saveImage = async () => {
    const formData = new FormData();

    formData.append("file", image);
    return await axios
      .post(`${media}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("Image saved successfully !");
        return res.data.files[0].filename;
      })
      .catch((error) => {
        console.log("Error : ", error);
      });
  };

  const handleImageChange = (e) => {
    // Update the state
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    setImage(file);

    reader.onload = () => {
      setImage({
        image: file,
      });
      //   setImagePreview(reader.result);
    };
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const imageId = await saveImage();
    addProduct({
      owner: { id: user._id, name: user.name },
      category: category,
      name: productName.current.value,
      pictures: [imageId],
      description: description.current.value,
      price: price.current.value,
      oldPrice: oldPrice.current.value,
    })
      .then((res) => {
        console.log("Product saved successfully !");
        productName.current.value = "";
        description.current.value = "";
        price.current.value = "";
        oldPrice.current.value = "";
      })
      .catch((error) => {
        console.log("Error : ", error);
      });
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    setCategory(e.target.value);
  };

  return (
    <>
      <div className="addProduct">
        <EcommHeader />
        <div className="addProductWrapper">
          <div className="addProductRight">
            <form className="addProductBox" onSubmit={handleClick}>
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
              <input
                placeholder="Name"
                type="text"
                required
                className="addProductInput"
                ref={productName}
              />
              <input
                placeholder="Old price"
                type="number"
                required
                className="addProductInput"
                ref={oldPrice}
              />
              <input
                placeholder="Price"
                type="number"
                required
                className="addProductInput"
                ref={price}
              />
              <input
                placeholder="Description"
                type="text"
                required
                className="addProductInput"
                ref={description}
              />
              {/* <label className="addProductInputLabel">
              Choose file ...
              <input
                type="file"
                className="addCategoryInputFile"
                onChange={onFileChange}
              />
            </label> */}
              {/* <form
                action={`${media}/upload`}
                method="POST"
                encType="multipart/form-data"
              > */}
              <div>
                <input
                  //   ref={image}
                  onChange={handleImageChange}
                  type="file"
                  name="file"
                  multiple
                  id="input-files"
                />
              </div>
              {/* <button
                onClick={saveImage}
                type="submit"
                className="btn btn-primary"
              >
                Save pictures
              </button> */}
              {/* </form> */}
              <button
                className="addProductRegisterButton"
                onClick={() => {
                  // history.push("/register");
                }}
              >
                {isFetching ? (
                  <CircularProgress color="white" size="20px" />
                ) : (
                  "Add Product"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
      <MainFooter />
    </>
  );
}

export default connect(mapStateToProps)(AddProduct2);
