import '../styles/Navbar.css'

function Navbar() {
   return(
    <nav> 
        <ul className="list">
            <li className="items">Home</li>
            <li className="items">Login</li>
            <li className="items">Signup</li>
        </ul>   
        <button className="btn">BTN</button>
    </nav>
   )
}

export default Navbar