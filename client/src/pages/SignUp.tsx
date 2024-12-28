import { Link } from "react-router-dom"

const SignUp = () => {
  return (
    <div>
      <div className="max-w-lg mx-auto p-3">
        <h2 className="text-3xl text-center font-semibold my-7">Sign Up</h2>
        <form className="flex flex-col gap-4">
          <input type="text" placeholder="Name" id="name" className="bg-slate-100 p-3 rounded-lg"/>
          <input type="email" placeholder="Email" id="email" className="bg-slate-100 p-3 rounded-lg"/>
          <input type="password" placeholder="Password" id="password" className="bg-slate-100 p-3 rounded-lg"/>
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