import React from "react";
import "../Css/DisplayToolbar.css";

export default class DisplayToolbar extends React.Component {
  render() {
    return (
      <div className="display-toolbar">
        <form className="display">
          <textarea
            className="display-formula"
            onChange={this.onTextareaChanged}
            value={this.props.formula.join("") + this.props.input}
          ></textarea>
          <textarea
            disabled
            className="display-input"
            id="display"
            rows="1"
            // onChange={this.props.output}
            value={this.props.output}
          ></textarea>
        </form>
        <div className="toolbar">
          <div
            className="toolbar-item"
            id="view-history"
            onClick={this.props.onHistory}
          >
            {this.props.isShowHistory ? "Keypad" : "History"}
          </div>
          <div>
            <span
              className="toolbar-item"
              onClick={this.props.onBackspace}
              id="backspace"
            >
              <i className="fas fa-backspace"></i>
            </span>
          </div>
        </div>
      </div>
    );
  }
}
