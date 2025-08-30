import React, {useState} from 'react';
import './styles/App.css'
import FileUploader from "./components/fileUploader";
import VideoPlayer from "./components/videoPlayer";

function App() {

  const [uploadedVideo, setUploadedVideo] = useState(null);
  //Contains the timestamps that we get in FileUploader
  const [timeStamps, setTimeStamps] = useState("No timestamps here")

  return (
    <div className="container">
        {!uploadedVideo ? (
          <div className="uploader">
          <FileUploader setUploadedVideo={setUploadedVideo} setTimeStamps = {setTimeStamps} />
          </div>
        ) : (
          <VideoPlayer videoFile={uploadedVideo} />
        )
        }
        <p>{timeStamps !== "No timestamps here" ? timeStamps : null}</p>
        

    </div>
  )
}

export default App
