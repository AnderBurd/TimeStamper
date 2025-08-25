import React, {useCallback, useState} from 'react';
import {useDropzone} from "react-dropzone"
import "../styles/fileUploader.css"


export default function fileUploader({setUploadedVideo}){
    const [timeStamps,setTimeStamps] = useState("No timestamps here")

    const onDrop = useCallback(acceptedFiles=>{
        //Our video file
        const file = acceptedFiles[0];
        //Store file as object URL
        setUploadedVideo(URL.createObjectURL(file));


        const formData = new FormData();
        formData.append('video', file)

        fetch('http://localhost:5000/process-video', {
        method: 'POST',
        body: formData,
        })
        .then(res => res.json())
        .then(data => {
        setTimeStamps(JSON.stringify(data));
      });
    }, [])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
    <div>
        
        <div {...getRootProps()} className='uploader'>
            <input {...getInputProps()} />
            {
                isDragActive ?
                <p>Drop the files here ...</p> :
                <p>Drag 'n' drop some files here, or click to select files</p>
            }
        </div>
        
        <p>{timeStamps !== "No timestamps here" ? timeStamps : null}</p>
    </div>
   ) 
}