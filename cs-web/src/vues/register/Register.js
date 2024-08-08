import axios from "axios";
import { useRef } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import EcommHeader from "../../components/headers/EcommHeader";
import MainFooter from "../../components/footers/MainFooter";
import { api } from "../../global";

export default function Register() {
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
        role: "CLIENT",
      };
      console.log("User : ", user);
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
      <div className="register">
        <EcommHeader />
        <div className="logoSfwContainer">
          <img
            className="logosfwImg"
            src={require("../../assets/images/logos/4.png")}
            alt="img"
          />
        </div>
        <div className="registerWrapper">
          <div className="registerRight">
            <form className="registerBox" onSubmit={handleClick}>
              <input
                placeholder="Username"
                required
                ref={username}
                className="registerInput"
              />
              <input
                placeholder="Email"
                required
                ref={email}
                className="registerInput"
                type="email"
              />
              <input
                placeholder="Password"
                required
                ref={password}
                className="registerInput"
                type="password"
                minLength="6"
              />
              <input
                placeholder="Password confirmation"
                required
                ref={passwordAgain}
                className="registerInput"
                type="password"
              />
              <button className="registerButton" type="submit">
                Sign Up
              </button>
              <button
                className="registerRegisterButton"
                onClick={() => {
                  history("/login");
                }}
              >
                Log into Account
              </button>
            </form>
          </div>
        </div>
        {/* <div className="categoriesTempFooter">
          <img
            className="categoriesTempImgFooter"
            src={require("../../assets/images/footer1.jpg")}
          />
        </div>
         */}
      </div>
      <MainFooter />
      <div style={{ height: "5vh" }}></div>
    </>
  );
}
