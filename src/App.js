import React from "react";
import Buttons from "./components/Button";
import DisplayToolbar from "./components/DisplayToolbar";
import * as Calculator from "./components/Calculator-core";
import History from "./components/History";
import "./App.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formula: [],
      history: [],
      input: "0",
      output: "",
      afterCalc: false,
      isShowHistory: false,
    };
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKey);
  }

  componentDidUpdate = (_, prevState) => {
    let numArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    let inputIsNumber = false;

    if (this.state.input.length > 0) {
      [...this.state.input].forEach((i) => {
        if (numArr.indexOf(i) !== -1) {
          inputIsNumber = true;
        }
      });
    }
    if (
      this.state.input != prevState.input &&
      inputIsNumber &&
      this.state.formula.length > 1
    ) {
      this.onEqual();
    }
  };

  handleKey = (event) => {
    let numArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    let { key } = event;
    if (!key) {
      console.log("No key");
      return;
    }
    if (key === "Enter") {
      this.onEqual(false);
      return;
    }
    if (numArr.includes(key)) {
      event.preventDefault();
      this.onDigit({ target: { innerText: key } });
    } else if (key === ".") {
      event.preventDefault();
      this.onDecimal();
    } else if (key === "Backspace") {
      event.preventDefault();
      this.onBackspace();
    } else if (key === "Clear") {
      event.preventDefault();
      this.onClear();
    } else if (["*", "/", "+", "-", "%"].includes(key)) {
      event.preventDefault();
      //this.handleClick(key);
      this.onOperator({ target: { innerText: key } });
    }
  };
  onDigit = ({ target }) => {
    const digit = target.innerText;
    const input = this.state.input;
    // console.log(digit);
    if (this.state.afterCalc) {
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

  // onDecimal = ({ target }) => {
  //   const decimal = target.innerText;
  //   const input = this.state.input;
  //   // console.log(decimal);
  //   if (this.state.afterCalc) {
  //     this.setState({
  //       input: `0${decimal}`,
  //       afterCalc: false,
  //     });
  //   } else if (Calculator.isNotNumber(input)) {
  //     this.setState({
  //       input: `0${decimal}`,
  //       formula: this.state.formula.concat(input),
  //     });
  //   } else if (!input.includes(decimal)) {
  //     this.setState({
  //       input: input.concat(decimal),
  //     });
  //   }
  // };

  onDecimal = () => {
    const { input } = this.state;
    if (input.indexOf(".") === -1) {
      this.setState({ input: input + "." });
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
        numCloseParenthesis + 2 > numOpenParenthesis &&
        numOpenParenthesis === 0
      ) {
        alert("Missing bracket )");
      }
      console.log(numOpenParenthesis);
      console.log(numCloseParenthesis);
      if (
        (Calculator.isNumber(input) || input === ")") &&
        numOpenParenthesis > 0 &&
        numOpenParenthesis > numCloseParenthesis
      ) {
        if (numCloseParenthesis > numOpenParenthesis) {
          alert("Missing bracket");
        }
        this.setState({
          input: parenthesis,
          formula: this.state.formula.concat(input),
          afterCalc: false,
        });
      }
    }
  };

  onClear = () => {
    console.log("CLEAR ALL");
    this.setState({
      formula: [],
      input: "0",
      output: "",
      afterCalc: false,
    });
  };

  onBackspace = () => {
    const input = this.state.input;
    const currentInputLength = input.length;

    // 1. if input is there, clear input on every backspace
    if (input === "Infinity" || input === "-Infinity" || input === "NaN") {
      this.setState({
        input: "0",
        afterCalc: false,
      });
      return;
    } else if (currentInputLength > 1) {
      this.setState({
        input: input.slice(0, currentInputLength - 1),
        afterCalc: false,
      });
      return;
    } else if (input !== "0") {
      this.setState({
        input: "",
        afterCalc: false,
      });
    }
    if (input.slice(0, currentInputLength - 1) == "") {
      const formArr = this.state.formula;
      if (formArr.length > 0) {
        const el = formArr.pop();
        this.setState({ ...this.state, formula: formArr, input: el });
      }
    }
  };

  onEqual = (auto = true) => {
    const finalFormula = this.state.formula.concat(this.state.input);
    // console.log(finalFormula);
    const result = Calculator.evaluate(finalFormula);
    // console.log("R", result);
    if (typeof result == "number") {
      const newHistoryItem = {
        formula: finalFormula,
        result: result,
      };
      // console.log("IN", result);
      if (auto) {
        this.setState((prevState) => {
          return {
            ...prevState,
            output: result + "",
            afterCalc: false,
          };
        });
      } else {
        this.setState((prevState) => {
          return {
            ...prevState,
            input: prevState.output,
            output: "",
            formula: [],
            history: [].concat(newHistoryItem, this.state.history),
            afterCalc: true,
          };
        });
      }
    }
  };
  onHistory = () => {
    this.setState({
      isShowHistory: !this.state.isShowHistory,
    });
  };
  onClearHistory = () => {
    this.setState({
      history: [],
    });
  };
  render() {
    return (
      <div>
        <div className="calculator">
          <DisplayToolbar
            formula={this.state.formula}
            input={this.state.input}
            output={this.state.output}
            onHistory={this.onHistory}
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
            textToCopy={this.state.afterCalc ? this.state.input : ""}
          />

          <History
            isShowHistory={this.state.isShowHistory}
            history={this.state.history}
            onClearHistory={this.onClearHistory}
          />
        </div>
      </div>
    );
  }
}
