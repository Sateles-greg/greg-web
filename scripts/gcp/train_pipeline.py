# scripts/gcp/train_pipeline.py

import os
from dotenv import load_dotenv
from google.cloud import aiplatform

load_dotenv()

def run_training_pipeline(
    project_id: str,
    location: str,
    display_name: str,
    template_uri: str,
    dataset_path: str
):
    """
    Simula o envio de um job de treinamento para o Vertex AI Pipelines.

    Args:
        project_id (str): O ID do seu projeto GCP.
        location (str): A região do GCP para executar o pipeline (ex: 'us-central1').
        display_name (str): O nome de exibição para esta execução do pipeline.
        template_uri (str): O URI do template do pipeline compilado no Cloud Storage.
                            (Para esta simulação, usamos um valor de exemplo).
        dataset_path (str): O caminho no Cloud Storage para o dataset de treinamento.
    """
    print("--- Iniciando Envio de Job de Treinamento para o Vertex AI (Simulação) ---")

    # Validação dos parâmetros
    if not all([project_id, location, display_name, template_uri, dataset_path]):
        print("❌ ERRO: Todos os parâmetros são obrigatórios.")
        return

    print(f"Projeto: {project_id}")
    print(f"Região: {location}")
    print(f"Nome do Job: {display_name}")
    print(f"Template do Pipeline: {template_uri}")
    print(f"Caminho do Dataset: {dataset_path}")

    try:
        # Inicializa o cliente do Vertex AI
        aiplatform.init(project=project_id, location=location)

        # Configuração do job do pipeline
        job = aiplatform.PipelineJob(
            display_name=display_name,
            template_path=template_uri,
            pipeline_root=f"gs://{project_id}-vertex-ai-pipelines/root", # Um bucket para os artefatos do pipeline
            parameter_values={
                "project": project_id,
                "dataset_gcs_path": dataset_path
            }
        )

        print("\nSimulando o envio do job para a API do Vertex AI...")
        # A linha abaixo é a que realmente enviaria o job.
        # Para evitar custos, vamos apenas simular a chamada.
        # job.submit() 
        
        print("\n✅ SIMULAÇÃO BEM-SUCEDIDA!")
        print("   - O job de pipeline foi configurado corretamente.")
        print("   - Em um cenário real, o comando 'job.submit()' seria chamado aqui.")
        print("   - Você pode monitorar a execução no console do Vertex AI.")
        print("\n--- Simulação de Treinamento Concluída ---")

    except Exception as e:
        print(f"❌ ERRO durante a configuração do pipeline: {e}")
        print("   Verifique se as credenciais estão corretas e se o Vertex AI está ativado.")

if __name__ == "__main__":
    # --- Parâmetros de Exemplo ---
    # Substitua pelos seus valores reais em um ambiente de produção
    
    PROJECT_ID = os.environ.get("GOOGLE_CLOUD_PROJECT", "greg-simbiotico")
    
    # Em um cenário real, este seria o caminho para o arquivo JSON compilado do seu pipeline
    # que você teria enviado para o Google Cloud Storage.
    PIPELINE_TEMPLATE_URI = "gs://greg-pipelines-templates/sentiment-analysis-pipeline.json"
    
    # Caminho para os dados de treinamento no Google Cloud Storage.
    # O script prepare-training-data.py gera o arquivo localmente.
    # Você precisaria fazer o upload dele para o GCS.
    DATASET_GCS_PATH = f"gs://{PROJECT_ID}-datasets/training_data.csv"

    run_training_pipeline(
        project_id=PROJECT_ID,
        location="us-central1",
        display_name="greg-sentiment-training-run",
        template_uri=PIPELINE_TEMPLATE_URI,
        dataset_path=DATASET_GCS_PATH
    )
