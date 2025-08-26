import React, {useState} from 'react';
import './styles/App.css'
import FileUploader from "./components/fileUploader";
import VideoPlayer from "./components/videoPlayer";

function App() {

  const [uploadedVideo, setUploadedVideo] = useState(null);

  return (
    <div className="container">
        {!uploadedVideo ? (
          <div className="uploader">
          <FileUploader setUploadedVideo={setUploadedVideo} />
          </div>
        ) : (
          <VideoPlayer videoFile={uploadedVideo} />
        )
        }

    </div>
  )
}

export default App
