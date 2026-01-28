import { useEffect, useState } from "react"
import { loginUser, verifySession } from "../store/features/auth/authSlice"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { styles } from "../lib/styles"

const Login = ()=>{
    const [loginForm , setLoginForm] = useState({
        email : '' , 
        password : ''
    })

    const [errors , setErrors] = useState({})
    const [errorMsg , setErrorMsg] = useState(null)


    const dispatch = useDispatch()
    const { user , isLoading , isInitialized} = useSelector(state => state.auth)
    const navigate = useNavigate()

     useEffect(() => {
      // Check session on page load
        dispatch(verifySession());
      }, [dispatch]);


      useEffect(() => {
        if (user && isInitialized) {
            navigate('/')
        }
  }, [user, navigate]);


    const validationErrors = ()=>{
        const newErrors = {}
        if (!loginForm.password.trim()) newErrors.password = 'Password is required'
        if (!loginForm.email.trim()) newErrors.email = 'Password is required'
        else if (!/^\S+@\S+\.\S+$/.test(loginForm.email)) {
            newErrors.email = "Email invalide";
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleChange = (e)=>{
        const { id , value } = e.target
        setLoginForm(prev => ({...prev , [id] : value}))
    }

    const handleLogin = async ()=>{
        if (!validationErrors()) return null;
        try {
            await dispatch(loginUser(loginForm)).unwrap()
        }
        catch (err){
            setErrorMsg(err || 'Unknown error')
            console.log(err)
        }
    }
    return <section className="w-full bg-white min-h-screen p-5 sm:p-10 flex justify-center items-center">

        <div className="border border-gray-300 shadow-md 
                        bg-white p-5 space-y-2 rounded-xl w-md max-w-full">
            <h3 
                className="text-xl font-semibold">
                Welcome back
            </h3>

            <div className="space-y-2">
                <label htmlFor="email" className={styles.label}>Email</label>
                <input 
                        id='email' 
                        className={styles.input}
                        onChange={handleChange}
                        value={loginForm.email}/>
                    {errors?.email && <p className="text-red-500 text-xs">
                        {errors.email}
                    </p>}
            </div>


            <div className="space-y-2">
                <label htmlFor="password" className={styles.label}>Password</label>
                <input 
                    id='password' 
                    className={styles.input}
                    onChange={handleChange}
                    value={loginForm.password}/>
                 {errors?.password && <p className="text-red-500 text-xs">
                        {errors.password}
                    </p>}
            </div>


            <button 
                className={`cursor-pointer bg-blue-600/90 hover:bg-blue-600 transition 
                           duration-300 text-white text-center py-2 px-4 rounded-lg w-full
                           ${isLoading && 'opacity-70'}`}
                onClick={handleLogin}
                disabled={isLoading}>
                    {isLoading ? 'Login in...' : 'Login'}
            </button>

            {errorMsg && <p className="rounded-md bg-red-500/20 p-4 border border-red-500 text-red-500 font-semibold">
                {errorMsg}
            </p>}

        </div>

    </section>
}

export default Login