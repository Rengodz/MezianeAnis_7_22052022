import '../styles/Login.css'

function Login() {
   return<div className='login-card'>
        <form action="" method="post">
            <h1>Login</h1>
            <div>
                <label htmlFor="">email</label>
                <input type="email"/>
            </div>
            <div>
                <label htmlFor="">password</label>
                <input type="password"/>
            </div>
            <button>connexion</button>
        </form>
</div>
}

export default Login