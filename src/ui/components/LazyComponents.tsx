import { createLazyComponent } from '../hooks/useLazyLoading';

// Lazy loading dos componentes mais pesados
export const LazyBiomedPanel = createLazyComponent(
  () => import('./BiomedPanel'),
  <div style={{ 
    padding: '20px', 
    textAlign: 'center', 
    background: 'rgba(0,0,0,0.1)', 
    borderRadius: '8px',
    color: '#fff'
  }}>
    🏥 Carregando Painel Biomédico...
  </div>
);

export const LazyDashboardCentral = createLazyComponent(
  () => import('./DashboardCentral'),
  <div style={{ 
    padding: '20px', 
    textAlign: 'center',
    background: 'rgba(0,0,0,0.1)', 
    borderRadius: '8px',
    color: '#fff'
  }}>
    📊 Carregando Dashboard Central...
  </div>
);

export const LazyDiarioVisual = createLazyComponent(
  () => import('./DiarioVisual'),
  <div style={{ 
    padding: '20px', 
    textAlign: 'center',
    background: 'rgba(0,0,0,0.1)', 
    borderRadius: '8px',
    color: '#fff'
  }}>
    📔 Carregando Diário Visual...
  </div>
);

export const LazyChatPanel = createLazyComponent(
  () => import('./ChatPanel'),
  <div style={{ 
    padding: '20px', 
    textAlign: 'center',
    background: 'rgba(0,0,0,0.1)', 
    borderRadius: '8px',
    color: '#fff'
  }}>
    💬 Carregando Chat...
  </div>
);

export const LazyColaborativoPanel = createLazyComponent(
  () => import('./ColaborativoPanel'),
  <div style={{ 
    padding: '20px', 
    textAlign: 'center',
    background: 'rgba(0,0,0,0.1)', 
    borderRadius: '8px',
    color: '#fff'
  }}>
    🤝 Carregando Painel Colaborativo...
  </div>
);