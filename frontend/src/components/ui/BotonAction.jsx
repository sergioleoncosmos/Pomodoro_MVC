
export const BotonAction=({onClick,variante='confirmacion',children})=>{
    const estiloBase= 'px-4 py-2 rounded-lg font-bold transition-all border-2'
    const variantes={
        'iniciar':'bg-green-400 text-zinc-200 hover:bg-green-600',
        'pausar':'bg-blue-400 text-zinc-200 hover:bg-blue-600',
        'descanso corto':'bg-red-400 text-gray-200 hover:bg-red-600',
    }
    // por si se llega aescribir mal la clase  no rompa el boton
    const estilosVariante=variantes[children] || variantes['iniciar']
    return(
        
        <button onClick={onClick} className={`${estiloBase} ${estilosVariante}`}>
            {children}
        </button>
    );
};


