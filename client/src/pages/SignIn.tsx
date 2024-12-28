import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"


interface UserFormInput {
    email: string;
    password: string;
}

const SignIn = () => {

    const [formInputData, setFormInputData] = useState<UserFormInput>({
        email: "",
        password: ""
    })

    const navigate = useNavigate();

    const handleFormInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormInputData((prevState: UserFormInput) => ({...prevState, [e.target.id]: e.target.value}))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            let res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formInputData)
            })

            if (res.ok) {
                res = await res.json();
                navigate("/")
            } else {
                console.log("Failed to log in user")
            }
        } catch (e) {
            console.log("Failed to log in user", e)
        }
    }

  return (
    <div>
        <div className="max-w-lg mx-auto p-3">
            <h2 className="text-3xl text-center font-semibold my-7">Sign In</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input type="email" onChange={handleFormInputChange} id="email" placeholder="Email" className="bg-slate-100 p-3 rounded-lg"/>
                <input onChange={handleFormInputChange}  type="password" id="password" placeholder="Password" className="bg-slate-100 p-3 rounded-lg"/>
                <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
                    Sign In
                </button>
            </form>

            <div className="flex gap-4 mt-5">
                <p>Don't have an account?</p>
                <Link to="/signup">
                    <span className="text-blue-500">Sign Up</span>
                </Link>   
            </div>
        </div>
    </div>
    
  )
}

export default SignIn