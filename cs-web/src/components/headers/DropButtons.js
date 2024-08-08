import React from "react";
import { Button } from "@mui/material";
import "./dropButtons.css";

export default function DropButtons() {
  return (
    <div className="container">
      <div className="buttonsContainer">
        <Button>All Products</Button>
        <Button>WordPress</Button>
        <Button>React</Button>
        <Button>HTML</Button>
        <Button>CMS</Button>
        <Button>Plugins</Button>
      </div>
    </div>
  );
}
