export const BotonAction=({texto='ok',onClick,variante='confirmacion'})=>{
    const estiloBase= 'px-4 py-2 rounded-lg font-bold transition-all border-2'
    const variantes={
        'confirmacion':'bg-green-400 text-zinc-200 hover:bg-green-600',
        'cancelar':'bg-red-400 text-gray-200 hover:bg-red-600' ,
    
    }
    // por si se llega aescribir mal la clase  no rompa el boton
    const estilosVariante=variantes[variante] || variantes['confirmacion']
    return(
        
        <button onClick={onClick} className={`${estiloBase} ${estilosVariante}`}>
            {texto}
        </button>
    );
};