import React from "react";
import "../Css/Button.css";

class Buttons extends React.Component {
  render() {
    return (
      <div className="buttons">
        <button id="parenthesis-open">(</button>
        <button id="parenthesis-close">)</button>
        <button id="modulo">%</button>
        <button id="clear">AC</button>

        <button id="seven">7</button>
        <button id="eight">8</button>
        <button id="nine">9</button>
        <button id="divide">/</button>

        <button id="four">4</button>
        <button id="five">5</button>
        <button id="six">6</button>
        <button id="multiply">*</button>

        <button id="one">1</button>
        <button id="two">2</button>
        <button id="three">3</button>
        <button id="subtract">-</button>

        <button id="zero">0</button>
        <button id="decimal">.</button>
        <button id="equals">=</button>
        <button id="add">+</button>
      </div>
    );
  }
}

export default Buttons;
