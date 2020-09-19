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
            value={this.props.formula.join("")}
          ></textarea>
          <textarea
            className="display-input"
            id="display"
            rows="1"
            onChange={this.onTextareaChanged}
            value={this.props.input}
          ></textarea>
        </form>
        <div className="toolbar">
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