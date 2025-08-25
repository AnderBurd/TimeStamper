import React, {useState} from 'react';
import './styles/App.css'
import FileUploader from "./components/fileUploader";
import VideoPlayer from "./components/videoPlayer";

function App() {

  const [uploadedVideo, setUploadedVideo] = useState(null);

  return (
    <div className="container">
      <div className="uploader">
        {!uploadedVideo ? (
          <FileUploader setUploadedVideo={setUploadedVideo} />
        ) : (
          <VideoPlayer videoFile={uploadedVideo} />
        )
        }
      </div>
    </div>
  )
}

export default App
