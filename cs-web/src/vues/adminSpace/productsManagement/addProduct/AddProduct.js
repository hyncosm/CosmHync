import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import "./addProduct.css";
import { addProduct } from "../../../../service/apiCalls";
import { connect } from "react-redux";
import axios from "axios";
import EcommHeader from "../../../../components/headers/EcommHeader";
import { media } from "../../../../global";

const mapStateToProps = (state) => {
  return {
    user: state.authReducer.user,
  };
};

function AddProduct({ user }) {
  // const [category, setCategory] = useState("Themes");
  const [item, setItem] = useState();
  const productName = useRef();
  const description = useRef();
  const price = useRef();
  const oldPrice = useRef();
  const { isFetching } = useContext(AuthContext);

  // useState(() => {
  //   getCategories()
  //     .then((response) => {
  //       setCategories(response.data);
  //     })
  //     .catch((error) => {
  //       console.log("error", error);
  //     });
  // });

  const onFileChange = (event) => {
    // Update the state
    setItem(event.target.files[0]);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("image", item);
    axios
      .post(`${media}/upload/image`, formData, {})
      .then((res) => {
        console.log("image added successfully ", res.data.imageCreated);
        addProduct({
          owner: { id: user._id, name: user.name },
          // category: category,
          name: productName.current.value,
          pictures: [res.data.imageCreated._id],
          description: description.current.value,
          price: price.current.value,
          oldPrice: oldPrice.current.value,
        })
          .then((res) => {
            console.log(res);
          })
          .catch((error) => {
            console.log("Error : ", error);
          });
      })
      .catch((error) => {
        console.log("Error : ", error);
      });
  };

  // const handleChange = (e) => {
  //   e.preventDefault();
  //   setCategory(e.target.value);
  // };

  return (
    <div className="addProduct">
      <EcommHeader />
      <div className="addProductWrapper">
        <div className="addProductRight">
          <form className="addProductBox" onSubmit={handleClick}>
            {/* <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                // labelId="demo-simple-select-label"
                // id="demo-simple-select"
                // noderef={category}
                value={category}
                label="Category"
                onChange={handleChange}
              >
                {categories &&
                  categories.map((category) => {
                    return (
                      <MenuItem key={category._id} value={category.name}>
                        {category.name}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl> */}
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
            <label className="addProductInputLabel">
              Choose file ...
              <input
                type="file"
                className="addCategoryInputFile"
                onChange={onFileChange}
              />
            </label>
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
  );
}

export default connect(mapStateToProps)(AddProduct);
