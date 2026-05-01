
export const Input = ({valor,alEscribir,textoFondo,variante,tipo='text'})=>{
    const estiloBase='border-2 border-gray-300 rounded px-3 py-1 text-black'
    const variantes={'verde':'bg-green'}
    const estiloVariante= variantes[variante] || variantes['verde']
    return (
        <input 
        type={tipo} 
        value={valor} 
        onChange={alEscribir} 
        placeholder={textoFondo}  
        className={`${estiloBase}  ${estiloVariante}`}
        />
    )





}