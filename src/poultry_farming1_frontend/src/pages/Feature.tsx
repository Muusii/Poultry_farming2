import React from "react";
import CreatePoultryRecord from "../components/Poultry/CreatePoultryRecord";
import './Feature.css'
import Broilers from "../components/Poultry/Broilers";
import Layers from "../components/Poultry/Layers";

const FeaturePage = () => {
  return (
    <div className="home-page ">
      < CreatePoultryRecord />
      <br/>
      < Broilers />
      <br/>
      < Layers />
    </div>
  );
};

export default FeaturePage;