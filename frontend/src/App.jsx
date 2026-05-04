// 1. LA IMPORTACIÓN: Le decimos a React "Oye, tráeme el BotonAction que está en esta ruta"
import { BotonAction } from './components/ui/BotonAction';
import { Temporizador } from './components/Temporizador';
import { ListaTareas } from './components/ListaTareas';
import { useState } from 'react';
export default function App() {
  const [tareaActiva,setTareaActiva]=useState(null)
  return (
    <div style={{ padding: '50px' }}>
      <h1>Mi Proyecto Pomodoro</h1>
      
      <Temporizador tarea={tareaActiva}></Temporizador>
      <ListaTareas onSeleccionarTarea={setTareaActiva}></ListaTareas>
    </div>
  );
}