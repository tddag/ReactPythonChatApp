import { Link } from "react-router-dom"


const SignIn = () => {
  return (
    <div>
        <div className="max-w-lg mx-auto p-3">
            <h2 className="text-3xl text-center font-semibold my-7">Sign In</h2>
            <form className="flex flex-col gap-4">
                <input type="email" id="email" placeholder="Email" className="bg-slate-100 p-3 rounded-lg"/>
                <input type="password" id="password" placeholder="Password" className="bg-slate-100 p-3 rounded-lg"/>
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