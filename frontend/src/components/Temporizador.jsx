import { useState } from "react"; // encargado de mirar lo que se interactua con la pagina y rednerizarla de nuevo apra mostrar los cambios 
import { useEffect } from "react";
import { BotonAction } from "./ui/BotonAction";

export const Temporizador=()=>{
    const[modo,setModo]=useState('Enfoque')
    const [tiempoSeleccionado,settiempoSeleccionado]=useState(1500)
    const [corriendo,setCorriendo]=useState(false)
    //logica de conversion esto se ejecuta en cada renderizado de estamanera obtenemos minutos exactos
    const tiempo_minutos= Math.floor(tiempoSeleccionado/60)
    //ahgroa sacaremos los segundos
    const tiempo_segundos=tiempoSeleccionado%60
    //formato visul apra que el tiempo siemtrpe enga dos digitos y de imrpesion de reloj digital
    const minutos_formateados=String(tiempo_minutos).padStart(2,'0')
    const segundos_formateados=String(tiempo_segundos).padStart(2,'0')

    //como en la version anteriror  settiempo(settiempo()) no puedo tener dos set dentro es un error fatal debemos crear otro efecto para que maneje eso este efecto se encargara solo de restar
    useEffect(()=>{
        let idtiempoSeleccionado;
        if (corriendo && tiempoSeleccionado > 0) {
            idtiempoSeleccionado =setInterval(()=>{
                //set interval es una funcion nativa de javascript no es un hook
                //esta funcion ejecuta el codigo que le pasemos cada cierto tiemp que le indiquemos
                //usamos la funcion flecha praa asegurarnos de tener siempre el valro mas actual
                settiempoSeleccionado((prev)=> prev-1);

            },1000);
        }
        return () => clearInterval(idtiempoSeleccionado);
    },[corriendo,tiempoSeleccionado])

    //efecto 2 vigila cuando llega a 0 y gestiona los tiempos
    useEffect(()=>{
        if (tiempoSeleccionado===0){
            setCorriendo(false) //paramos el reloj
            //cambio de modos
            if(modo==='Enfoque'){
                setModo('Descanso');
                settiempoSeleccionado(300);

            }else{
                setModo('Descanso')
                settiempoSeleccionado(1500)
            }
        }

    },[tiempoSeleccionado,modo]) // vigilra lso cambios de esas dos variables


    return(
        //flexbox para centrar todo en una columna 
        <div className="flex flex-col items-center gap-6 mt-10">
            <h2>{modo==='Enfoque'?'TIEMPO DE ENFOQUE':'TIEMPO DE DESCANSO'}</h2>
            <h1 className="text-4xl font-bold text-lime-400">{minutos_formateados}:{segundos_formateados}</h1>
            {/* // otro contenedor entla fila pra que contenga mis botones */}
            <div className="flex gap-4">

                <BotonAction variante={corriendo?'azul':'verde'} onClick={()=>{
                    corriendo? setCorriendo(false):setCorriendo(true);
                    
                    }}>{corriendo?'pausar':'iniciar'}</BotonAction>
                <BotonAction variante="violeta" onClick={()=>{
                    setCorriendo(false)
                    if (modo==='Enfoque'){
                        settiempoSeleccionado(300)
                        setModo('Descanso')
                        
                    }else{
                        settiempoSeleccionado(1500)
                        setModo('Enfoque')
                    }
                    
                    }}>{modo==='Enfoque'?'descanso corto':'pomodoro'}</BotonAction>

                <BotonAction variante="rojo" onClick={()=>{
                    setCorriendo(false)
                    modo==='Enfoque'?settiempoSeleccionado(1500):settiempoSeleccionado(300)
                }}>Reiniciar</BotonAction>

            </div>
        </div>
    )
}