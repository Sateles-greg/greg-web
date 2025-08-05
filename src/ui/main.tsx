// import React from "react"; // Removido: não utilizado
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <App />
);

// Registrar o service worker para PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(
      registration => {
        console.log('Service Worker registrado com sucesso:', registration);
      },
      err => {
        console.error('Erro ao registrar o Service Worker:', err);
      }
    );
  });
}
