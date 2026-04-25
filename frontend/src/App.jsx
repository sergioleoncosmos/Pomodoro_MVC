// 1. LA IMPORTACIÓN: Le decimos a React "Oye, tráeme el BotonAction que está en esta ruta"
import { BotonAction } from './components/ui/BotonAction';
import { Temporizador } from './components/Temporizador';
export default function App() {
  return (
    <div style={{ padding: '50px' }}>
      <h1>Mi Proyecto Pomodoro</h1>
      
      <Temporizador></Temporizador>
    </div>
  );
}