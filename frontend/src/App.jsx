import { useState, useEffect } from 'react'

function App() {
  // Estado: Memoria del componente
  const [tiempoRestante, setTiempoRestante] = useState(25 * 60);
  const [corriendo, setCorriendo] = useState(false);

  // Efecto: Lógica del reloj
  useEffect(() => {
    let intervalo;
    if (corriendo && tiempoRestante > 0) {
      intervalo = setInterval(() => {
        setTiempoRestante((prev) => prev - 1);
      }, 1000);
    } else if (tiempoRestante === 0) {
      setCorriendo(false);
      alert("¡Pomodoro terminado! Enviando datos al backend...");
      guardarSesionEnBaseDeDatos();
    }
    
    // Limpieza del intervalo para que no se vuelva loco
    return () => clearInterval(intervalo);
  }, [corriendo, tiempoRestante]);

  // Funciones de control
  const alternarReloj = () => setCorriendo(!corriendo);
  const reiniciarReloj = () => {
    setCorriendo(false);
    setTiempoRestante(25 * 60);
  };

  // Conexión con el Backend (FastAPI)
  const guardarSesionEnBaseDeDatos = async () => {
    try {
      const respuesta = await fetch("http://localhost:8000/api/sesion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ duracion_minutos: 25, tipo_sesion: "enfoque" })
      });
      const datos = await respuesta.json();
      console.log("Respuesta de FastAPI:", datos);
    } catch (error) {
      console.error("Error conectando con el backend:", error);
    }
  };

  // Matemáticas para mostrar minutos y segundos
  const minutos = Math.floor(tiempoRestante / 60).toString().padStart(2, '0');
  const segundos = (tiempoRestante % 60).toString().padStart(2, '0');

  // La Vista (HTML combinado con JavaScript)
  return (
    <div className="bg-gray-900 text-white flex items-center justify-center h-screen font-sans">
      <div className="bg-gray-800 p-10 rounded-2xl shadow-2xl text-center border border-gray-700 w-96">
        <h1 className="text-3xl font-bold mb-2 text-indigo-400">Pomodoro Pro (React)</h1>
        <p className="text-gray-400 mb-8 text-sm">Modo Enfoque</p>
        
        <div className="text-7xl font-mono font-bold mb-10 tracking-widest text-white">
          {minutos}:{segundos}
        </div>
        
        <div className="flex justify-center space-x-4">
          <button 
            onClick={alternarReloj} 
            className={`${corriendo ? 'bg-yellow-600 hover:bg-yellow-500' : 'bg-indigo-600 hover:bg-indigo-500'} text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-lg`}
          >
            {corriendo ? 'Pausar' : 'Iniciar'}
          </button>
          <button 
            onClick={reiniciarReloj}
            className="bg-red-600 hover:bg-red-500 text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-red-500/30"
          >
            Reiniciar
          </button>
        </div>
      </div>
    </div>
  )
}

export default App