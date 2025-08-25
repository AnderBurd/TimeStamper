import React from "react";

export default function VideoPlayer({videoFile}){

    return (
        <div>
            <video src={videoFile} controls width="600" autoPlay/>
        </div>

    );

}