import { useState } from "react"

export const Desplegable=({
    opciones=[],
    placeholder='Seleccione una opcion',
    onChange
}) =>  {
    //estados para que el mismo componente sepa si esta abierto y selecciondao
    const [abierto,setAbierto] =useState(false);
    const [seleccion,setSeleccion]= useState('');
    
    //cuando aparezca eso de handle en una funcion es convencion que indica manejkar un evento
    const handleSeleccion=(opcion)=>{
        setSeleccion(opcion);
        setAbierto(false);
        onChange && onChange(opcion); // Si onChange existe, lo ejecuta y le pasa la opción seleccionada. Sirve para comunicar este componente (hijo) con el componente padre. 
        //esto es un callback
    }

    return (
        <div className="relative w-64">
            <div onClick={()=>setAbierto(!abierto)} 
            className="p-2 border rounded cursor-pointer bg-white">

                {seleccion||placeholder}

            </div>

            {/* //recordar ucando aparece el && es para decir que hay una condicional si se cumple esto hacmeos lo que esta ala derecha del && */}
            {abierto && (
                <div className="absolute w-full bg-white  border rounded mt-1 shadow">
                    {opciones.map((opcion,index)=>(
                        <div 
                            key={index}
                            onClick={()=>handleSeleccion(opcion)}
                            className="p-2 hover:bg-gray-200 cursor-pointer"
                        >
                            {opcion}
                        </div>

                    ))}
                </div>

            )}


        </div>
    )


}