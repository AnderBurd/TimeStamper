import React from "react";
import './styles/App.css'
import FileUploader from "./components/fileUploader";
function App() {


  return (
    <div className="container">
      <div className="uploader">
        <FileUploader />
      </div>
    </div>
  )
}

export default App
