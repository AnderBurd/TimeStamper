from flask import Flask

app = Flask(__name__)
@app.route("/")
@app.route("/process-video", methods=["POST"])

video_file = request.files['video']
upload_path = os.path.join("storedVids", video_file.filename)
video_file.save(upload_path)


def hello_world():
    return "<p>Hello world</p>"