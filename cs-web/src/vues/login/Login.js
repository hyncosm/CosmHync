import { useContext, useRef } from "react";
import "./login.css";
import { loginCall } from "../../service/apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import MainFooter from "../../components/footers/MainFooter";
import EcommHeader from "../../components/headers/EcommHeader";

const mapStateToProps = (state) => {
  return {
    user: state.authReducer.user,
  };
};

function Login({ dispatch }) {
  const email = useRef();
  const password = useRef();
  const { isFetching } = useContext(AuthContext);
  const history = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    ).then((response) => {
      if (response === "SUCCESS") {
        console.log("Logged in");
        history("/home");
      } else {
        console.log(response);
      }
    });
  };

  return (
    <div>
      <div className="login">
        <EcommHeader />
        <div className="logoSfwContainer">
          <img
            className="logosfwImg"
            src={require("../../assets/images/logos/4.png")}
            alt="img"
          />
        </div>
        <div className="loginWrapper">
          <div className="loginRight">
            <form className="loginBox" onSubmit={handleClick}>
              <input
                placeholder="Email"
                type="email"
                required
                className="loginInput"
                ref={email}
              />
              <input
                placeholder="Password"
                type="password"
                required
                minLength="6"
                className="loginInput"
                ref={password}
              />
              <button
                className="loginButton"
                type="submit"
                disabled={isFetching}
              >
                {isFetching ? (
                  <CircularProgress color="white" size="20px" />
                ) : (
                  "Log In"
                )}
              </button>
              <span className="loginForgot">Forgot Password?</span>
              <button
                className="loginRegisterButton"
                onClick={() => {
                  history("/register");
                }}
              >
                {isFetching ? (
                  <CircularProgress color="white" size="20px" />
                ) : (
                  "Create a New Account"
                )}
              </button>
            </form>
          </div>
        </div>
        {/* <div className="categoriesTempFooter">
        <img
          className="categoriesTempImgFooter"
          src={require("../../assets/images/footer1.jpg")}
        />
      </div> */}
      </div>
      <MainFooter />
      <div style={{ height: "5vh" }}></div>
    </div>
  );
}

export default connect(mapStateToProps)(Login);
