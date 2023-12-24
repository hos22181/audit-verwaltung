// App.js
import React from "react";
import TableComponent from "./Table"; // Import TableComponent from 'Table.js'
import bro from "./testConnection.js";

function App() {
  return (
    <div className="App">
      <bro/>
      <TableComponent />
    </div>
  );
}

export default App;
