import { useEffect, useState } from "react"
import { BotonAction } from "./ui/BotonAction"
import { Input } from "./ui/Input"

export const ListaTareas=()=>{
    //lazzy initializer cuando iniciamos un estado en react generalmente lo ahcemos vacio [''] com oesto en exte caso no queremos que eso pase necesitamos que cargue la lsita de tareas que el cree por eso usaremos uan funcion anonima adentro apra que solo se ejecuter cuadn ocargue la pagina ya que esto quema buena memoria
    const [listaTareas,setlistaTareas]=useState(()=>{
        //1.buscamos la lista de tareas en el disco duro del navegador
        const listaTareasGuardada= localStorage.getItem('lista_tareas')
        //2. comprobacion si encontro algo (si no hay nada devuelve null)
        if (listaTareasGuardada){
            //3. si hay algo lo decodificaremos y lo convertiremos en el estado inicial usando parse
            return JSON.parse(listaTareasGuardada);
        }else {
            //4. si es la primera vez que el usuario entra y no hay nada guardado devolvemos un valor por defecto
            return []; 
        }
    })
    const [texto,setTexto]=useState('')

    useEffect(()=>{
        //localstorage funcion apra guiardar texto nos sirve para uqe guarde las ejemplo lso datos de incio etc.. en este caso a ejempl ode uso solo guardare la lsita de tarea

        localStorage.setItem('lista_tareas',JSON.stringify(listaTareas));
    },[listaTareas])

    const agregarTarea = (nombre_tarea,) => {

    const nueva_tarea={
        id:Date.now(),
        nombre:nombre_tarea,
        completada:false,  
    }
    //los ... ses el operador spread esto ahce es recuerda lo qeu teniamos antes y merte esto nuevo
    setlistaTareas([...listaTareas,nueva_tarea])
    }
    const eliminarTarea= (id)=> {
        const nuevaLista=listaTareas.filter((tarea)=>tarea.id!==id)
        //el filter busca dentro de mi lista las que cumplan esa ocndicin y las agrega ala nueva lista
        setlistaTareas(nuevaLista) //aca simplemente agregamos la lista ya filtrada
    }
    const completarTarea=(id)=>{
        const a_completar=listaTareas.map((tarea)=>{
            if(tarea.id===id){
                return {...tarea,completada:!tarea.completada}
            }else{
                return tarea
            }
        })
        setlistaTareas(a_completar)
    }

    return(
        <>
        <Input valor={texto} textoFondo={'escribe nombre de la tarea'} alEscribir={(evento)=>{
            //aca recibimos el evento el bus cara el evento de tipo teclado
            setTexto(evento.target.value)
        }}/>
        <BotonAction onClick={()=>{
        agregarTarea(texto);
        setTexto('')}}>click para agregar tarea</BotonAction>
        {listaTareas.map((tarea)=>(
            <div key={tarea.id} className="flex justify-between items-center bg-teal-300 p-2 rounded">
            <p >{tarea.nombre}</p>
            <BotonAction variante="rojo" onClick={()=>eliminarTarea(tarea.id)}>eliminar tarea</BotonAction>
            <BotonAction variante={tarea.completada?'azul':'rojo'} onClick={()=>completarTarea(tarea.id)} >{tarea.completada?'concluida':'no concluida'}</BotonAction>
            </div>
            
        ))}
        
        </>
        
    )

}