import axios from "axios";
import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../../global";
import MainFooter from "../../components/footers/MainFooter";
import EcommHeader from "../../components/headers/EcommHeader";
import "./informationsForm.css";

export default function InformationsForm() {
  const { search } = useLocation();
  const name = useRef();
  const number = useRef();
  const city = useRef();
  const history = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    const sale = {
      name: name.current.value,
      number: number.current.value,
      city: city.current.value,
      product: search.slice(1),
      role: "CLIENT",
    };
    try {
      await axios.post(`${api}/api/sale/add`, { sale: sale });
      alert("Commande enregistrée !");
      setTimeout(() => {}, 3000);
      history("/home");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div className="informationsFormContainer">
        <EcommHeader />
        <div className="infoFormWrapper">
          <div className="infoFormRight">
            <form className="infoFormBox" onSubmit={handleClick}>
              <input
                placeholder="Nom"
                required
                ref={name}
                className="infoFormInput"
              />
              <input
                placeholder="Numero de téléphone"
                required
                ref={number}
                className="infoFormInput"
              />
              <input
                placeholder="Ville"
                required
                ref={city}
                className="infoFormInput"
              />
              <button className="infoFormButton" type="submit">
                Valider la commande
              </button>
            </form>
          </div>
        </div>
      </div>
      <MainFooter />
    </div>
  );
}
