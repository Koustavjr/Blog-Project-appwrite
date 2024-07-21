import { useId } from "react"


 function Select({
 options,
 label,
 classname="",
 ...props
},ref) {
    const id = useId();
  return (
    <div className="w-full">
        {label && 
         <label htmlFor={id} className=""></label>
        }
        <select {...props} className={`${classname}px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`} ref={ref} id={id}>
            {
                options?.map((option)=>(
                    
                    <option value={option} key={id}>
                        {option}
                    </option>
                ))
            }
        
        </select>
    </div>
  )
}


//export default React.forwardRef(Select);