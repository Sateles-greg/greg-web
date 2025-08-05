import os
from fastapi import FastAPI, UploadFile, File, BackgroundTasks
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
import shutil
import subprocess

load_dotenv()

app = FastAPI()

DATA_DIR = os.path.join(os.path.dirname(__file__), 'data')

@app.post("/upload-dataset")
def upload_dataset(file: UploadFile = File(...)):
    os.makedirs(DATA_DIR, exist_ok=True)
    file_path = os.path.join(DATA_DIR, file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    return {"status": "ok", "filename": file.filename}

@app.post("/train")
def train(background_tasks: BackgroundTasks):
    def run_train():
        subprocess.run(["python", "train_pipeline.py"], cwd=os.path.dirname(__file__))
    background_tasks.add_task(run_train)
    return JSONResponse({"status": "training started"})
