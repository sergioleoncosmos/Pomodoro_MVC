// 1. LA IMPORTACIÓN: Le decimos a React "Oye, tráeme el BotonAction que está en esta ruta"
import { BotonAction } from './components/ui/BotonAction';

export default function App() {
  return (
    <div style={{ padding: '50px' }}>
      <h1>Mi Proyecto Pomodoro</h1>
      
      {/* 2. EL USO: Escribimos el componente como si fuera una etiqueta HTML.
          Le pasamos el texto y una función anónima al onClick */}
      <BotonAction 
        texto="Haz clic aquí" 
        onClick={() => alert('¡El botón funciona perfectamente!')} 
      />
      <BotonAction 
        texto="NO hagas click" 
        onClick={() => alert('¡Terco te dije no hagas lcik')} 
        variante='alert'
      />
    </div>
  );
}