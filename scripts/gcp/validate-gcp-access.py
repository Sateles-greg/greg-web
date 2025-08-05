# scripts/gcp/validate-gcp-access.py

import os
from dotenv import load_dotenv
from google.cloud import aiplatform
from google.api_core import exceptions

load_dotenv()

def validate_gcp_access():
    """
    Valida a autenticação e o acesso à API do Vertex AI.

    Este script tenta se autenticar no Google Cloud e listar os modelos
    disponíveis no Vertex AI para confirmar que as credenciais e as permissões
    estão configuradas corretamente.
    """
    print("--- Iniciando Validação de Acesso ao GCP e Vertex AI ---")

    # 1. Verificar se as variáveis de ambiente essenciais estão definidas
    project_id = os.environ.get("GOOGLE_CLOUD_PROJECT")
    credentials_path = os.environ.get("GOOGLE_APPLICATION_CREDENTIALS")

    if not project_id:
        print("❌ ERRO: A variável de ambiente 'GOOGLE_CLOUD_PROJECT' não foi definida.")
        print("   Por favor, defina o ID do seu projeto GCP.")
        return
    
    if not credentials_path:
        print("❌ ERRO: A variável de ambiente 'GOOGLE_APPLICATION_CREDENTIALS' não foi definida.")
        print("   Por favor, defina o caminho para o arquivo JSON da sua conta de serviço.")
        return

    if not os.path.exists(credentials_path):
        print(f"❌ ERRO: O arquivo de credenciais não foi encontrado em: {credentials_path}")
        print("   Verifique o caminho e o nome do arquivo.")
        return

    print(f"✅ Variáveis de ambiente encontradas.")
    print(f"   - Projeto: {project_id}")
    print(f"   - Credenciais: {credentials_path}")

    # 2. Tentar inicializar o cliente do Vertex AI
    try:
        print("\nTentando inicializar o cliente do Vertex AI...")
        aiplatform.init(project=project_id, location="us-central1")
        print("✅ Cliente do Vertex AI inicializado com sucesso!")

    except exceptions.GoogleAPICallError as e:
        print(f"❌ ERRO ao inicializar o cliente: {e}")
        print("   Possíveis causas:")
        print("   - A API do Vertex AI (aiplatform.googleapis.com) não está ativada no seu projeto.")
        print("   - A conta de serviço pode não ter a permissão 'Vertex AI User'.")
        return
    except Exception as e:
        print(f"❌ ERRO inesperado durante a inicialização: {e}")
        return

    # 3. Tentar fazer uma chamada de API simples (listar modelos)
    try:
        print("\nTentando listar modelos no Vertex AI para confirmar o acesso...")
        models = aiplatform.Model.list()
        
        # O iterador 'models' pode estar vazio, mas a chamada em si já valida o acesso.
        model_list = list(models)
        print(f"✅ Sucesso! Acesso à API do Vertex AI confirmado.")
        print(f"   - {len(model_list)} modelos encontrados no projeto '{project_id}'.")
        print("\n--- Validação Concluída com Sucesso ---")

    except exceptions.PermissionDenied as e:
        print(f"❌ ERRO de Permissão Negada ao listar modelos: {e}")
        print("   A conta de serviço está autenticada, mas não tem as permissões necessárias.")
        print("   Verifique se ela possui o papel 'Vertex AI User' ou similar.")
    except Exception as e:
        print(f"❌ ERRO inesperado ao tentar acessar a API: {e}")

if __name__ == "__main__":
    validate_gcp_access()
