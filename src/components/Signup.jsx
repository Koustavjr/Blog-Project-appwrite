import { useState } from "react"
import { useDispatch } from "react-redux"
import { useForm } from "react-hook-form"
import {Button,Input,Logo} from './index'
import { useNavigate,Link } from "react-router-dom"
import authService from "../appwrite/auth"
import { login } from "../store/authSlice"

export default function Signup() {
    const [error,setError]=useState("")
    const[register,handleSubmit]=useForm()
    const navigate=useNavigate()
    const dispatch=useDispatch()

    const create=async(data)=>{
        setError("")
        try {
            const userData = authService.Signup(data);
            if(userData)
            {
                const userData = authService.getCurrentUser()
              if(userData)  dispatch(login(userData))
            }
        navigate('/')
        } catch (error) {
            setError(error.message)
        }
    }

    return (
    <div className="flex items-center justify-center">
    <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
    <div className="mb-2 flex justify-center">
            <span className="inline-block w-full max-w-[100px]">
                <Logo width="100%" />
            </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
        <p className="mt-2 text-center text-base text-black/60">
            Already have an account?&nbsp;
            <Link
                to="/login"
                className="font-medium text-primary transition-all duration-200 hover:underline"
            >
                Sign In
            </Link>
        </p>
        {error && <p className="text-red-600 text-center mt-8">{error}</p>}

        <form className="mt-8" onSubmit={handleSubmit(create)}>
            <div className="space-y-4">

                <Input
                label="Name"
                placeholder='Enter Full Name'
                type="text"
                {...register('name',{
                    required:true
                })}
                />
                   <Input
                type="email"
                placeholder="Enter your email"
                label="Email"
                {...register("email",{
                    required:true,
                    validare:{
                        matchPattern:(value)=> /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)
                        || "Email doesn't exist"
                    }
                })}
                />
                
                <Input
                label="Password"
                placeholder="Enter your password"
                type="password"
                {...register('password',{
                    required:true
                })}
                />
            
                <Button className='w-full'
                type="submit"
                >
                Create Account
                </Button>

            </div>
        </form>

    </div>
    </div>
  )
}