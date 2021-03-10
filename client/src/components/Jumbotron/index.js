import React from "react";

function Jumbotron({ children }) {
  return (
    <div
      style={{ clear: "both", paddingTop: 20, paddingBottom: 20, textAlign: "center" }}
      className="jumbotron"
    >
      {children}
    </div>
  );
}

export default Jumbotron;
