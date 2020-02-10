import React, { Component } from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import Style from "./Loader.module.css";

export default class App extends Component {
  state = {};

  render() {
    return (
      <div className={Style.Loader}>
        <Loader
          type="ThreeDots"
          color="#FFB1B1"
          height={100}
          width={100}
          timeout={2000}
        />
      </div>
    );
  };
}
