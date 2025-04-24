from flask import Flask, request, jsonify
import os

app = Flask(__name__)

@app.route("/process-video", methods=["POST"])
def process_video():
    video_file = request.files['video']

    upload_path = os.path.join("storedVids", video_file.filename)
    video_file.save(upload_path)

    timestamps = run_detection(upload_path)

    return jsonify({"timestamps": timestamps})

def run_detection(path):
    #Test values
    return ["00:12", "01:03"]  

