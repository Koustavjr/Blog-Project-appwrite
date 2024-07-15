import { useId } from "react";

const Input = React.forwardRef(function Input({
    label,
    type="text",
    className="",
    ...props
},ref)
{
    <div className="w-full">

    const id = useId();
    {label &&
        <label htmlFor={id}
        className="inline-block mb-1 pl-1"
        >{label}</label>
    }
    <input
     type={type}  
     className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full 
        ${className}`}
        ref={ref}
        {...props}
        />
        </div>
}

)

export default Input;