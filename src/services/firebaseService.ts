// Dispositivos IoT
export async function salvarDispositivoCloud(status: {[id:string]: boolean}) {
  await set(ref(db, 'iotStatus'), status);
}

export async function carregarDispositivosCloud() {
  const snap = await get(ref(db, 'iotStatus'));
  return snap.exists() ? snap.val() : {};
}
// Eventos do Diário Visual
export async function salvarEventoCloud(evento: any) {
  await push(ref(db, 'eventos'), evento);
}

export async function carregarEventosCloud() {
  const snap = await get(ref(db, 'eventos'));
  return snap.exists() ? Object.values(snap.val()) : [];
}
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, set, push } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'SUA_API_KEY',
  authDomain: 'SEU_DOMINIO.firebaseapp.com',
  databaseURL: 'https://SEU_DOMINIO.firebaseio.com',
  projectId: 'SEU_PROJECT_ID',
  storageBucket: 'SEU_BUCKET.appspot.com',
  messagingSenderId: 'SEU_SENDER_ID',
  appId: 'SEU_APP_ID'
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Salva o array completo de princípios (substitui todos)
export async function salvarPrincipioCloud(principios: string[]) {
  await set(ref(db, 'principios'), principios);
}

// Carrega o array completo de princípios
export async function carregarPrincipiosCloud(): Promise<string[]> {
  const snap = await get(ref(db, 'principios'));
  return snap.exists() ? snap.val() : [];
}

// Remove um princípio pelo índice
export async function removerPrincipioCloud(index: number) {
  const principios = await carregarPrincipiosCloud();
  if (Array.isArray(principios)) {
    principios.splice(index, 1);
    await salvarPrincipioCloud(principios);
  }
}
