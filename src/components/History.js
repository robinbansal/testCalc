import React from "react";
import "../Css/History.css";

class History extends React.Component {
  render() {
    const historyClassName = this.props.isShowHistory
      ? "history"
      : "history hidden";

    return (
      <div className={historyClassName}>
        <div className="history-list">
          {this.props.history.map((item, index) => {
            return (
              <div key={index} className="history-item">
                <div className="history-item-formula">
                  {item.formula.join("")}
                </div>
                <div
                  className="history-item-result"
                  value={item.result}
                  onClick={this.props.onHistoryItemClicked}
                >
                  ={item.result}
                </div>
                <hr></hr>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default History;
