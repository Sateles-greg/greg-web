# Dockerfile para greg-train (Python + FastAPI)
FROM python:3.11-slim
WORKDIR /app
COPY . .
RUN pip install --no-cache-dir fastapi uvicorn python-dotenv google-cloud-aiplatform pandas scikit-learn
EXPOSE 8000
CMD ["uvicorn", "api:app", "--host", "0.0.0.0", "--port", "8000"]
