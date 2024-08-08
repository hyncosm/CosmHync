import axios from "axios";
import { useRef } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import Header from "../../components/headers/Header";
import { api } from "../../global";

export default function RegisterAsSeller() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
        role: "SELLER",
      };
      try {
        await axios.post(`${api}/api/auth/register`, user);
        history("/home");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <Header />
      <div className="register">
        <div className="logoSfwContainer">
          <img
            className="logosfwImg"
            src={require("../../assets/images/sfw.png")}
            alt="img"
          />
        </div>
        <div className="loginWrapper">
          <div className="loginRight">
            <form className="loginBox" onSubmit={handleClick}>
              <input
                placeholder="Username"
                required
                ref={username}
                className="loginInput"
              />
              <input
                placeholder="Email"
                required
                ref={email}
                className="loginInput"
                type="email"
              />
              <input
                placeholder="Password"
                required
                ref={password}
                className="loginInput"
                type="password"
                minLength="6"
              />
              <input
                placeholder="Password Again"
                required
                ref={passwordAgain}
                className="loginInput"
                type="password"
              />
              <button className="loginButton" type="submit">
                Sign Up
              </button>
              <button
                className="loginRegisterButton"
                onClick={() => {
                  history("/login");
                }}
              >
                Log into Account
              </button>
            </form>
          </div>
        </div>
        <div className="categoriesTempFooter">
          <img
            className="categoriesTempImgFooter"
            src={require("../../assets/images/footer1.jpg")}
            alt="img"
          />
        </div>
      </div>
    </>
  );
}
