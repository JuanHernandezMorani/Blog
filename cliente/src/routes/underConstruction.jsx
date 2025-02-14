import React from "react";
import image from '../images/coding.gif';

const UnderConstruction = () => {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", "width": "100vw" }}>
        <h1>Página en Construcción</h1>
        <p>Estamos trabajando para traer esta sección pronto.</p>
        <img src={image} alt='coding' className="img-fluid"/>
      </div>
    );
  };

  export default UnderConstruction;