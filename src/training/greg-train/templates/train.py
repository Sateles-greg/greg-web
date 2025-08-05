import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import argparse
import os

def main(train_data: str, test_data: str, epochs: int = 5):
    print(f"[LOG] Iniciando treinamento com {train_data} e {test_data}")
    df_train = pd.read_csv(train_data)
    df_test = pd.read_csv(test_data)
    X_train = df_train.drop('target', axis=1)
    y_train = df_train['target']
    X_test = df_test.drop('target', axis=1)
    y_test = df_test['target']
    model = RandomForestClassifier(n_estimators=100)
    model.fit(X_train, y_train)
    preds = model.predict(X_test)
    acc = accuracy_score(y_test, preds)
    print(f"[LOG] Acurácia: {acc}")
    # Salvar modelo, etc.

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('--epochs', type=int, default=5)
    args = parser.parse_args()
    main('data/train.csv', 'data/test.csv', args.epochs)
