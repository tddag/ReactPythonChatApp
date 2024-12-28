import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"


interface UserFormState {
  name: string;
  email: string;
  password: string
}

const SignUp = () => {

  const [formInputData, setFormInputData] = useState<UserFormState>({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleFormInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormInputData((prevState: UserFormState) => ({...prevState, [e.target.id]: e.target.value}))
  }

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/users`, {
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
        console.log("Failed to register user")        
      }

    } catch(e) {
      console.log("Failed to register user", e)
    }
  }

  return (
    <div>
      <div className="max-w-lg mx-auto p-3">
        <h2 className="text-3xl text-center font-semibold my-7">Sign Up</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input onChange={handleFormInputChange} type="text" placeholder="Name" id="name" className="bg-slate-100 p-3 rounded-lg"/>
          <input onChange={handleFormInputChange} type="email" placeholder="Email" id="email" className="bg-slate-100 p-3 rounded-lg"/>
          <input onChange={handleFormInputChange} type="password" placeholder="Password" id="password" className="bg-slate-100 p-3 rounded-lg"/>
          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            Sign Up
          </button>
        </form>

        <div className="flex gap-4 mt-5">
          <p>Have an account?</p>
          <Link to="/signin">
            <span className="text-blue-500">Sign In</span>          
          </Link>
          
        </div>
      </div>
    </div>
  )
}

export default SignUp