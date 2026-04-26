
export const BotonAction=({onClick,variante='verde',children})=>{
    const estiloBase= 'px-4 py-2 rounded-lg font-bold transition-all border-2'
    const variantes={
        'verde':'bg-green-400 text-zinc-200 hover:bg-green-600',
        'azul':'bg-blue-400 text-zinc-200 hover:bg-blue-600',
        'rojo':'bg-red-400 text-gray-200 hover:bg-red-600',
        'violeta':'bg-violet-500 text-zinc-200 hover:bg-violet-700'
    }
    // por si se llega aescribir mal la clase  no rompa el boton
    const estilosVariante=variantes[variante] || variantes['verde']
    return(
        
        <button onClick={onClick} className={`${estiloBase} ${estilosVariante}`}>
            {children}
        </button>
    );
};


