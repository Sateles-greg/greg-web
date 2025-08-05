# Greg Train - Ambiente de Treinamento de IA

Este módulo permite treinar modelos personalizados para o Greg usando Google Cloud Vertex AI.

## 🧱 Pré-requisitos

1. Conta Google Cloud com faturamento ativo.
2. API Vertex AI habilitada.
3. Bucket no Google Cloud Storage (GCS) para artefatos.
4. SDK `google-cloud-aiplatform` instalado:

```bash
pip install google-cloud-aiplatform
```

## 🔐 Configuração do ambiente

1. Crie um arquivo `.env` com:

```env
GOOGLE_CLOUD_PROJECT=seu-projeto
GCP_BUCKET_URI=gs://seu-bucket
MODEL_DISPLAY_NAME=greg-personalizado
GOOGLE_APPLICATION_CREDENTIALS=keys/greg-service-account.json
```

1. Autentique-se (modo local):

```bash
gcloud auth application-default login
```

**OU**, para ambientes automatizados:

- Gere uma chave de serviço (JSON) em IAM & Admin do GCP
- Salve em `keys/greg-service-account.json`

O código Python irá detectar essa variável automaticamente:

```python
import os
from google.auth import exceptions
try:
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = os.getenv("GOOGLE_APPLICATION_CREDENTIALS", "keys/greg-service-account.json")
except exceptions.DefaultCredentialsError as e:
    print("Erro ao carregar credenciais do Google Cloud:", e)
```

## 📂 Estrutura de dados esperada

```text
/data
├── train.csv
└── test.csv
```

- Use CSV com colunas bem definidas
- Alvos claramente separados (ex: `label`, `target`)

## 🚀 Executando o treinamento

```bash
python train_pipeline.py \
  --project=$GOOGLE_CLOUD_PROJECT \
  --bucket_uri=$GCP_BUCKET_URI \
  --model_display_name=$MODEL_DISPLAY_NAME
```

## 📊 Monitoramento

- Progresso no Console do GCP: Vertex AI > Pipelines
- Logs via `gcloud logging read`
- O pipeline emite logs via WebSocket para o frontend (ver monitor.html)

## 📦 Estrutura do módulo

- `train_pipeline.py`: Pipeline principal de treinamento
- `api.py`: API para envio de datasets e agendamento de jobs
- `templates/`: Templates de pré-processamento, treinamento e deploy
- `config.yaml`: Exemplo de configuração
- `data/`: Dados de entrada

## 🔒 Segurança

- Use variáveis de ambiente para credenciais
- Transporte seguro (HTTPS) recomendado
- Nunca versionar arquivos JSON de credenciais no Git
- Proteja a pasta `keys/` com `.gitignore`
