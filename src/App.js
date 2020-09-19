import React from "react";
import Buttons from "./components/Button";
import DisplayToolbar from "./components/DisplayToolbar";
import * as Calculator from "./components/Calculator-core";
import "./App.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formula: [],
      input: "0",
      afterCalc: false,
    };
  }

  onDigit = ({ target }) => {
    const digit = target.innerText;
    const input = this.state.input;

    if (this.state.afterCalculation) {
      this.setState({
        input: digit,
        afterCalc: false,
      });
    } else if (input === "0") {
      this.setState({
        input: digit,
      });
    } else if (Calculator.isNotNumber(input)) {
      this.setState({
        input: digit,
        formula: this.state.formula.concat(input),
      });
    } else {
      this.setState({
        input: input.concat(digit),
      });
    }
  };

  onDecimal = ({ target }) => {
    const decimal = target.innerText;
    const input = this.state.input;

    if (this.state.afterCalculation) {
      this.setState({
        input: `0${decimal}`,
        afterCalc: false,
      });
    } else if (Calculator.isNotNumber(input)) {
      this.setState({
        input: `0${decimal}`,
        formula: this.state.formula.concat(input),
      });
    } else if (!input.includes(decimal)) {
      this.setState({
        input: input.concat(decimal),
      });
    }
  };

  onOperator = ({ target }) => {
    const operator = target.innerText;
    const input = this.state.input;

    if (Calculator.isOperator(input)) {
      this.setState({
        input: operator,
        afterCalc: false,
      });
    } else if (input !== "(") {
      this.setState({
        formula: this.state.formula.concat(this.state.input),
        input: operator,
        afterCalc: false,
      });
    }
  };

  onParenthesis = ({ target }) => {
    const parenthesis = target.innerText;
    const input = this.state.input;

    if (parenthesis === "(") {
      if (
        (Calculator.isNumber(input) && input !== "0") ||
        (Calculator.isNumber(input) &&
          input === "0" &&
          this.state.formula.length > 0) ||
        input === ")"
      ) {
        this.setState({
          input: parenthesis,
          formula: this.state.formula.concat([input, "*"]),
          afterCalc: false,
        });
      } else if (Calculator.isOperator(input) || input === "(") {
        this.setState({
          input: parenthesis,
          formula: this.state.formula.concat(input),
          afterCalc: false,
        });
      } else if (
        Calculator.isNumber(input) &&
        input === "0" &&
        this.state.formula.length === 0
      ) {
        this.setState({
          input: parenthesis,
          afterCalc: false,
        });
      }
    } else {
      const arrayOpenParenthesis = this.state.formula.join("").match(/\(/g);
      const numOpenParenthesis = arrayOpenParenthesis
        ? arrayOpenParenthesis.length
        : 0;

      const arrayCloseParenthesis = this.state.formula.join("").match(/\)/g);
      const numCloseParenthesis = arrayCloseParenthesis
        ? arrayCloseParenthesis.length
        : 0;

      if (
        (Calculator.isNumber(input) || input === ")") &&
        numOpenParenthesis > 0 &&
        numOpenParenthesis > numCloseParenthesis
      ) {
        this.setState({
          input: parenthesis,
          formula: this.state.formula.concat(input),
          afterCalc: false,
        });
      }
    }
  };

  onClear = () => {
    this.setState({
      formula: [],
      input: "0",
      afterCalc: false,
    });
  };

  onBackspace = () => {
    const input = this.state.input;
    const formula = this.state.formula;
    const currentInputLength = input.length;

    if (input === "Infinity" || input === "-Infinity" || input === "NaN") {
      this.setState({
        input: "0",
        afterCalc: false,
      });
    } else if (currentInputLength > 1) {
      this.setState({
        input: input.slice(0, currentInputLength - 1),
        afterCalc: false,
      });
    } else if (input !== "0") {
      this.setState({
        input: "0",
        afterCalc: false,
      });
    } else if (formula.length > 0) {
      this.setState({
        input: formula[formula.length - 1],
        formula: formula.slice(0, formula.length - 1),
        afterCalc: false,
      });
    }
  };

  onEqual = () => {
    const finalFormula = this.state.formula.concat(this.state.input);
    const result = Calculator.evaluate(finalFormula);

    if (!Number.isNaN(result)) {
      const newHistoryItem = {
        formula: finalFormula,
        result: result,
      };

      this.setState({
        input: result + "",
        formula: [],
        history: [].concat(newHistoryItem, this.state.history),
        afterCalc: true,
      });
    }
  };

  render() {
    return (
      <div>
        <div className="calculator">
          <DisplayToolbar
            formula={this.state.formula}
            input={this.state.input}
            onBackspace={this.onBackspace}
            isShowHistory={this.state.isShowHistory}
          />

          <Buttons
            onClear={this.onClear}
            onEqual={this.onEqual}
            onDecimal={this.onDecimal}
            onDigit={this.onDigit}
            onOperator={this.onOperator}
            onParenthesis={this.onParenthesis}
          />
        </div>
      </div>
    );
  }
}
