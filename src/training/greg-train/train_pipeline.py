
import os
import argparse
from google.cloud import aiplatform
from dotenv import load_dotenv
import sys

class Logger:
    def __init__(self, log_file):
        self.terminal = sys.stdout
        self.log = open(log_file, "a", encoding="utf-8")
    def write(self, message):
        self.terminal.write(message)
        self.log.write(message)
        self.log.flush()
    def flush(self):
        self.terminal.flush()
        self.log.flush()

def run_training_pipeline(project: str, location: str, bucket_uri: str, model_display_name: str):
    print("[LOG] Inicializando pipeline de treinamento...")
    aiplatform.init(project=project, location=location, staging_bucket=bucket_uri)
    job = aiplatform.CustomTrainingJob(
        display_name=model_display_name,
        script_path="templates/train.py",
        container_uri="us-docker.pkg.dev/vertex-ai/training/tf-cpu.2-8:latest",
        requirements=['pandas', 'scikit-learn']
    )
    print("[LOG] Iniciando job de treinamento customizado...")
    model = job.run(
        replica_count=1,
        model_display_name=model_display_name,
        args=["--epochs", "5"],
        environment_variables={"PYTHONHASHSEED": "0"}
    )
    print("[LOG] Upload do modelo para Vertex AI...")
    model.upload()
    print("✅ Modelo treinado e enviado para o Vertex AI")

if __name__ == "__main__":
    load_dotenv()
    parser = argparse.ArgumentParser()
    parser.add_argument('--project', default=os.getenv('GOOGLE_CLOUD_PROJECT'))
    parser.add_argument('--location', default='us-central1')
    parser.add_argument('--bucket_uri', default=os.getenv('GCP_BUCKET_URI'))
    parser.add_argument('--model_display_name', default=os.getenv('MODEL_DISPLAY_NAME'))
    args = parser.parse_args()
    # Redireciona todos os prints para o arquivo de log
    log_file = os.getenv('TRAIN_LOG_FILE', 'train.log')
    sys.stdout = Logger(log_file)
    sys.stderr = sys.stdout
    run_training_pipeline(args.project, args.location, args.bucket_uri, args.model_display_name)
