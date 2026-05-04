import {  useState } from "react"; // encargado de mirar lo que se interactua con la pagina y rednerizarla de nuevo apra mostrar los cambios 
import { useEffect } from "react";
import { BotonAction } from "./ui/BotonAction";
import { Input } from "./ui/Input";
import { Desplegable } from "./ui/Desplegable";

const alarmaFinTemporizador = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3')
alarmaFinTemporizador.loop=true //para uqe se reptira ya que l audio dura 2 seg queremos qeu se reptia hasta no se el tiempo que pensemos correcto para que la persona sepa que se acabo el timer


export const Temporizador=({tarea})=>{
    const [desplegarMenu,setDesplegarMenu]=useState(false)
    const [opcionDesplegable,setOpcionDesplegable]=useState('')
    const [tiempoPersonalizado,setTiempoPersonalizado]=useState({horasEnfoque:0,minutosEnfoque:50,horasDescanso:0,minutosDescanso:10})
    const [configEnfoque,setConfigEnfoque]=useState(1500)
    const [configDescanso,setConfigDescanso]=useState(300)
    const[modo,setModo]=useState('Enfoque')
    const [tiempoSeleccionado,settiempoSeleccionado]=useState(1500)
    const [corriendo,setCorriendo]=useState(false)

    //logica de conversion esto se ejecuta en cada renderizado de estamanera obtenemos minutos exactos
   const tiempo_horas = Math.floor(tiempoSeleccionado / 3600);
    // Para los minutos: Sacamos el residuo de las horas (% 3600) y eso lo dividimos entre 60
    const tiempo_minutos = Math.floor((tiempoSeleccionado % 3600) / 60);
    // Para los segundos: Sacamos el residuo de los minutos (% 60)
    const tiempo_segundos = tiempoSeleccionado % 60;
    //formato visul apra que el tiempo siemtrpe enga dos digitos y de imrpesion de reloj digital
    const horas_formateadas=String(tiempo_horas).padStart(2,'0')
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
                alarmaFinTemporizador.play()
                //SONARA DURANTE CIERTO TIEMPO 
                setTimeout(()=>{
                    alarmaFinTemporizador.pause() //asi paramos el loop
                    alarmaFinTemporizador.currentTime=0 // rebobinamos al inicio del sonido
                },15000)
                setModo('Descanso');
                settiempoSeleccionado(configDescanso);

            }else{
                alarmaFinTemporizador.play()
                  //SONARA DURANTE CIERTO TIEMPO 
                setTimeout(()=>{
                    alarmaFinTemporizador.pause() //asi paramos el loop
                    alarmaFinTemporizador.currentTime=0 // rebobinamos al inicio del sonido
                },15000)
                setModo('Enfoque')
                settiempoSeleccionado(configEnfoque)
            }
        }

    },[tiempoSeleccionado,modo]) // vigilra lso cambios de esas dos variables


    const alarmaApagarManualmente = () => {
    alarmaFinTemporizador.pause();
    alarmaFinTemporizador.currentTime = 0;
    };

    return(
        //flexbox para centrar todo en una columna 
        <div className="flex flex-col items-center gap-6 mt-10">
            {tarea ? <h3>Trabajando en: {tarea.nombre}</h3> : <h3>Selecciona una tarea para comenzar</h3>}
            <h2>{modo==='Enfoque'?'TIEMPO DE ENFOQUE':'TIEMPO DE DESCANSO'}</h2>
            <h1 className="text-4xl font-bold text-lime-400">{horas_formateadas}:{minutos_formateados}.{segundos_formateados}</h1>
            
            {desplegarMenu && 
            (<div>

                <Desplegable 
                opciones={['1h Enfoque 13 min descanso','30 min Enfoque 8 min descanso','tiempo personalizado']} 
                placeholder="crea o selecciona un tiempo"
                onChange={(opcionDesplegableElegida)=>{
                    //como la funcion handleselect que es basuicamante que ddebe hacer cuando es seleccionado el selctor y esta asu vez tiene adnetro la prop onchange que deberallamar a esta funcion y dandole lo seleccionado eso es un callback 
                    setOpcionDesplegable(opcionDesplegableElegida)
                }}
                >
                </Desplegable >
                <BotonAction onClick={()=>{


                    if(opcionDesplegable==='tiempo personalizado'){

                        const nuevoEnfoque = (tiempoPersonalizado.horasEnfoque*3600)+(tiempoPersonalizado.minutosEnfoque*60)
                        const nuevoDescanso = (tiempoPersonalizado.horasDescanso*3600)+(tiempoPersonalizado.minutosDescanso*60)

                    
                        setConfigEnfoque(nuevoEnfoque)
                        setConfigDescanso(nuevoDescanso)
                        setDesplegarMenu(false)
                        if(modo==='Enfoque'){
                            settiempoSeleccionado(nuevoEnfoque)
                        } else {
                            settiempoSeleccionado(nuevoDescanso)
                        }
                        
                    }
                    if(opcionDesplegable==='1h Enfoque 13 min descanso'){
                        setConfigEnfoque(3600)
                        setConfigDescanso(780)
                        if(modo==='Enfoque'){
                            settiempoSeleccionado(3600)
                        } else {
                            settiempoSeleccionado(780)
                        }
                    
                    }
                    if(opcionDesplegable==='30 min Enfoque 8 min descanso'){
                        setConfigEnfoque(1800)
                        setConfigDescanso(480)
                        if(modo==='Enfoque'){
                            settiempoSeleccionado(1800)
                        } else {
                            settiempoSeleccionado(480)
                        }

                    }

                    setOpcionDesplegable('')
                    setCorriendo(false)
                    setDesplegarMenu(false)
                    
                }} >CONFIRMAR TIEMPO PERSONALIZADO</BotonAction>
                {opcionDesplegable==='tiempo personalizado' && (
                    <>
                        <div>
                            <Input
                                tipo="number"
                                valor={tiempoPersonalizado.horasEnfoque}
                                alEscribir={(evento) => {
                                    setTiempoPersonalizado({ ...tiempoPersonalizado, horasEnfoque: Number(evento.target.value) });
                                } }
                                textoFondo={'cantidad horas Enfoque'} />
                            :
                            <Input
                                tipo="number"
                                valor={tiempoPersonalizado.minutosEnfoque}
                                alEscribir={(evento) => {
                                    setTiempoPersonalizado({ ...tiempoPersonalizado, minutosEnfoque: Number(evento.target.value) });
                                } }
                                textoFondo={'cantidad minutos Enfoque'} />
                        </div>
                        <div>
                            <Input
                                tipo="number"
                                valor={tiempoPersonalizado.horasDescanso}
                                alEscribir={(evento) => {
                                    setTiempoPersonalizado({ ...tiempoPersonalizado, horasDescanso: Number(evento.target.value) });
                                } }
                                textoFondo={'cantidad horas descanso'} />
                            :
                            <Input
                                tipo="number"
                                valor={tiempoPersonalizado.minutosDescanso}
                                alEscribir={(evento) => {
                                    setTiempoPersonalizado({ ...tiempoPersonalizado, minutosDescanso: Number(evento.target.value) });
                                } }
                                textoFondo={'cantidad minutos descanso'} />
                            </div>

                            
                            

                        </>
                )}

            </div>)
            }

            {/* // otro contenedor entla fila pra que contenga mis botones */}
            <div className="flex gap-4">

                {/* Boton iniico pausa timer */}
                <BotonAction variante={corriendo?'azul':'verde'} onClick={()=>{
                    corriendo? setCorriendo(false):setCorriendo(true);
                    alarmaApagarManualmente()
                    }}>{corriendo?'pausar':'iniciar'}</BotonAction>

                {/* Boton Cambiar configuraciojn timer */}

                <BotonAction variante="azul" onClick={()=>{
                    setDesplegarMenu(!desplegarMenu)
                }}> Configurar tiempos </BotonAction>

                {/* Boton saltar timer */}
                <BotonAction variante="violeta" onClick={()=>{
                    setCorriendo(false)
                    if (modo==='Enfoque'){
                        settiempoSeleccionado(configDescanso)
                        setModo('Descanso')
                        
                    }else{
                        settiempoSeleccionado(configEnfoque)
                        setModo('Enfoque')
                    }
                    
                    }}>{'Saltar Tiempo'}</BotonAction>
                    
                {/* Boton reiniciar Tiempo */}
                <BotonAction variante="rojo" onClick={()=>{
                    setCorriendo(false)
                    modo === 'Enfoque' ? settiempoSeleccionado(configEnfoque) : settiempoSeleccionado(configDescanso)
                }}>Reiniciar</BotonAction>

            </div>
        </div>
    )
}