import { Link } from "react-router-dom"


const NavBar = () => {
    return (
        <div className="sticky top-0 z-50 flex justify-between bg-blue-100 items-center mx-auto p-3"> 
            <h2 className="font-bold">ReactPythonChatApp</h2>
            
            <div>
                <div className="flex gap-4 items-center">
                    <span>Hi</span>
                    <Link to="/conversations">
                        Conversation
                    </Link>

                    <Link to="/signin">
                        <button>Sign Out</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NavBar