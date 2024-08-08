import React, { useContext, useRef, useState, useEffect } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import "./addCategory.css";
import { addCategory } from "../../../service/apiCalls";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/headers/Header";
import axios from "axios";
import { media } from "../../../global";

const mapStateToProps = (state) => {
  return {
    user: state.authReducer.user,
  };
};

function AddCategory({ user }) {
  const [item, setItem] = useState();
  const productName = useRef();
  const description = useRef();
  const { isFetching } = useContext(AuthContext);
  const history = useNavigate();

  useEffect(() => {
    if (user === null) {
      history("/login");
    }
  });

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
        addCategory({
          name: productName.current.value,
          description: description.current.value,
          picture: res.data.imageCreated._id,
        })
          .then((res) => {
            console.log("Category added successfully ", res);
          })
          .catch((error) => {
            console.log("Error : ", error);
          });
      })
      .catch((error) => {
        console.log("Error : ", error);
      });
  };

  return (
    <div className="addCategory">
      <Header />
      <div className="addCategoryWrapper">
        <div className="addCategoryRight">
          <form className="addCategoryBox" onSubmit={handleClick}>
            <input
              placeholder="Name"
              type="text"
              required
              className="addCategoryInput"
              ref={productName}
            />
            <input
              placeholder="Description"
              type="text"
              required
              className="addCategoryInput"
              ref={description}
            />
            <label className="addCategoryInputLabel">
              Choose file ...
              <input
                type="file"
                className="addCategoryInputFile"
                onChange={onFileChange}
              />
            </label>
            <button className="addCategoryRegisterButton" type="submit">
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

export default connect(mapStateToProps)(AddCategory);
