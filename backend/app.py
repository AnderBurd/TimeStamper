from flask import Flask, request, jsonify
import os
import numpy as np
#OpenCV
import cv2 as cv
#YOLO
from ultralytics import YOLO
from flask_cors import CORS



app = Flask(__name__)

CORS(app)

@app.route("/process-video", methods=["POST"])
def process_video():
    #Takes the video from the post request and saves it in our storedVids folder
    video_file = request.files['video']
    upload_path = os.path.join("storedVids", video_file.filename)
    video_file.save(upload_path)

    timestamps = run_detection(upload_path)

    return jsonify({"timestamps": timestamps})


#Runs YOLO detection on the video
def run_detection(path):
    #Process every n'th frame (Higher number here means faster)
    sampleRate = 30
    cap = cv.VideoCapture(path)

    if not cap.isOpened():
        print("Error opening the video file")
        return []

    #YOLO model
    model = YOLO("yolov8n.pt")
    fps = cap.get(cv.CAP_PROP_FPS)
    frameNumber = 0
    timestamps = []
    PersonFlag = False
    #Used so multiple people entering in the same second doesnt get flagged multiple times
    mostRecentTimeStamp = 0

    while cap.isOpened():
        ret, frame = cap.read()

        # Check if the frame is valid
        if not ret:
            print("Can't receive frame (stream end?). Exiting ...")
            break

        # Downsize the frame to save time (This seems to only save a few seconds on a 10 min video...)
        frame = cv.resize(frame, (640, 360))

        
        frameNumber += 1
        
        #Only process frames at the samplerate
        if(frameNumber % sampleRate == 0):
            #Run Face detection with YOLO
            results = model.predict(frame, verbose = False)
            #Get each detected object in the frame
            boxes = results[0].boxes
            PersonFlagForFrame = False

            if boxes is not None:
                for box in boxes:
                    #Grab all the class id of the objects
                    class_id = int(box.cls[0])
                    #class 0 is human
                    if class_id == 0:
                        PersonFlagForFrame = True
                        break
            
            #If person was found entering frame
            if PersonFlagForFrame and not PersonFlag:
                seconds = frameNumber / fps
                formattedTime = format_seconds(seconds)
                #Check that we havent flagged this second with a entry yet
                if formattedTime not in timestamps:
                    timestamps.append(formattedTime)

            PersonFlag = PersonFlagForFrame

    cap.release()
    return timestamps


#helper function to format the time
def format_seconds(seconds):
    hours = int(seconds // 3600)
    minutes = int((seconds % 3600) // 60)
    secs = int(seconds % 60)
    return f"{hours:02}:{minutes:02}:{secs:02}"

