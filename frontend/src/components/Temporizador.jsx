import { useState } from "react"; // encargado de mirar lo que se interactua con la pagina y rednerizarla de nuevo apra mostrar los cambios 
import { useEffect } from "react";
import { BotonAction } from "./ui/BotonAction";

export const Temporizador=()=>{
    const [intervalos,setIntervalos]=useState(25)
    const [corriendo,setCorriendo]=useState(false)
    useEffect(()=>{
        let idintervalos;
        if (corriendo) {
            idintervalos =setInterval(()=>{
                //set interval es una funcion nativa de javascript no es un hook
                //esta funcion ejecuta el codigo que le pasemos cada cierto tiemp que le indiquemos
                //usamos la funcion flecha praa asegurarnos de tener siempre el valro mas actual
                setIntervalos((prev)=>prev-1)

            },1000)
        }
        return () => clearInterval(idintervalos);
    },[corriendo])


    return(
        //flexbox para centrar todo en una columna 
        <div className="flex flex-col items-center gap-6 mt-10">
            <h1 className="text-4xl font-bold text-lime-400">{intervalos}:00</h1>
            {/* // otro contenedor entla fila pra que contenga mis botones */}
            <div className="flex gap-4">

                <BotonAction variante="confirmacion" onClick={()=>{
                    setIntervalos(25);
                    corriendo? setCorriendo(false):setCorriendo(true);
                    }}>{corriendo?'pausar':'iniciar'}</BotonAction>
                <BotonAction variante="cancelar" onClick={()=>setIntervalos(5)}>descanso corto</BotonAction>

            </div>
        </div>
    )
}