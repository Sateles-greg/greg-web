# scripts/gcp/prepare-training-data.py

import os
import csv

def prepare_training_data(output_folder="data", output_filename="training_data.csv"):
    """
    Simula a preparação de dados e cria um arquivo CSV de treinamento.

    Em um cenário real, esta função leria dados de várias fontes,
    limparia o texto, aplicaria rótulos e formataria o resultado em um
    arquivo CSV pronto para o treinamento no Vertex AI.
    """
    print("--- Iniciando Preparação de Dados de Treinamento (Simulação) ---")

    # Dados de exemplo (sentimento)
    sample_data = [
        {"text": "Estou muito feliz com o resultado do projeto!", "sentiment": "positivo"},
        {"text": "Que dia incrível para a equipe.", "sentiment": "positivo"},
        {"text": "A automação simbiótica está funcionando perfeitamente.", "sentiment": "positivo"},
        {"text": "Não estou satisfeito com a performance atual.", "sentiment": "negativo"},
        {"text": "Encontramos um erro crítico no pipeline.", "sentiment": "negativo"},
        {"text": "O sistema parece lento hoje.", "sentiment": "negativo"},
        {"text": "O acesso à API precisa ser verificado.", "sentiment": "neutro"},
        {"text": "Este é um relatório de status semanal.", "sentiment": "neutro"}
    ]

    # Garante que o diretório de saída exista
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)
        print(f"Diretório '{output_folder}' criado.")

    output_path = os.path.join(output_folder, output_filename)

    try:
        with open(output_path, mode='w', newline='', encoding='utf-8') as csv_file:
            fieldnames = ["text", "sentiment"]
            writer = csv.DictWriter(csv_file, fieldnames=fieldnames)

            writer.writeheader()
            for row in sample_data:
                writer.writerow(row)
        
        print(f"✅ Arquivo de dados de treinamento simulado foi criado com sucesso em: {output_path}")
        print(f"   - {len(sample_data)} linhas de dados foram geradas.")
        print("\n--- Preparação de Dados Concluída ---")
        return output_path

    except IOError as e:
        print(f"❌ ERRO ao escrever o arquivo CSV: {e}")
        return None

if __name__ == "__main__":
    prepare_training_data()
