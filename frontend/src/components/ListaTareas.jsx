import { useEffect, useState } from "react"
import { BotonAction } from "./ui/BotonAction"
import { Input } from "./ui/Input"

export const ListaTareas = ({ onSeleccionarTarea }) => {
    // 1. Iniciamos el estado vacío. Ya no usamos Lazy Initializer con localStorage.
    const [listaTareas, setlistaTareas] = useState([]);
    const [texto, setTexto] = useState('');

    // 2. EFECTO DE LECTURA (GET): Se ejecuta solo una vez al cargar la página
    useEffect(() => {
        const cargarTareas = async () => {
            try {
                // Hacemos la petición a tu servidor FastAPI
                const respuesta = await fetch("http://localhost:8000/tasks/");
                if (respuesta.ok) {
                    const tareas_db = await respuesta.json();
                    setlistaTareas(tareas_db); // Guardamos lo que viene de Postgres
                }
            } catch (error) {
                console.error("Error al conectar con la base de datos:", error);
            }
        };

        cargarTareas();
    }, []); // El array vacío asegura que solo se ejecute al montar el componente

    // 3. FUNCION DE CREACIÓN (POST)
    const agregarTarea = async (texto_tarea) => {
        if (!texto_tarea.trim()) return; // Evita enviar tareas vacías

        try {
            // Enviamos el JSON al backend
            const respuesta = await fetch("http://localhost:8000/tasks/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title: texto_tarea }) // Pydantic espera "title"
            });

            if (respuesta.ok) {
                const nueva_tarea_db = await respuesta.json();
                // Actualizamos la pantalla agregando la tarea que nos devolvió el backend (ya con su ID real)
                setlistaTareas([...listaTareas, nueva_tarea_db]);
                setTexto(''); // Limpiamos el input
            }
        } catch (error) {
            console.error("Error al guardar la tarea:", error);
        }
    }

    // Funciones locales (Pendientes de conectar al backend en el futuro)
    const eliminarTarea = (id) => {
        const nuevaLista = listaTareas.filter((tarea) => tarea.id !== id)
        setlistaTareas(nuevaLista)
    }

    const completarTarea = (id) => {
        const a_completar = listaTareas.map((tarea) => {
            if (tarea.id === id) {
                return { ...tarea, completed: !tarea.completed }
            } else {
                return tarea
            }
        })
        setlistaTareas(a_completar)
    }

    return (
        <>
            <Input 
                valor={texto} 
                textoFondo={'escribe nombre de la tarea'} 
                alEscribir={(evento) => {
                    setTexto(evento.target.value)
                }} 
            />
            <BotonAction onClick={() => agregarTarea(texto)}>
                click para agregar tarea
            </BotonAction>
            
            {listaTareas.map((tarea) => (
                <div key={tarea.id} className="flex justify-between items-center bg-teal-300 p-2 rounded mt-2">
                    {/* Renderizamos usando 'title' como viene de Postgres */}
                    <p>{tarea.title}</p>
                    <BotonAction variante="rojo" onClick={() => eliminarTarea(tarea.id)}>eliminar tarea</BotonAction>
                    
                    {/* Renderizamos usando 'completed' */}
                    <BotonAction variante={tarea.completed ? 'azul' : 'rojo'} onClick={() => completarTarea(tarea.id)}>
                        {tarea.completed ? 'concluida' : 'no concluida'}
                    </BotonAction>
                    
                    <BotonAction variante="verde" onClick={() => onSeleccionarTarea(tarea)}>Enfocar</BotonAction>
                </div>
            ))}
        </>
    )
}