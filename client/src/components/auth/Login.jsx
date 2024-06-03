import '../../css/auth.css'
import backSign from '../../assets/back-sign.svg'
import user from '../../assets/user.svg'
import mail from '../../assets/mail.svg'
import shield from '../../assets/shield.svg'
import show from '../../assets/show.svg'
import hide from '../../assets/hide.svg'
import frontSign from '../../assets/frontSign.svg'
import { Navigate } from 'react-router-dom';
import { useRef, useState } from 'react'
function Login(){

    // This Section is For posting the signup information to the server


    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [signedUp, setSignedUp] = useState(false)
    const [validateError, setValidateError] = useState(false) //checks if validation error
   async function handleSubmit(e){
        e.preventDefault();
        console.log('email',email);
        console.log('password',password);



         try{

            const response = await fetch('http://localhost:8000/signin',{
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json'
                  },
                  credentials: 'include',
                  body: JSON.stringify({email: email,password: password})
              })
             const result = await response.json();
               if(response.status === 400){
                setValidateError(true);
                setEmail('')
                setPassword('')
                setTimeout(()=>{
                    setValidateError(false);
                },3000)
               }
             if(result.error){
                setValidateError(true);

                setEmail('')
                setPassword('')
                setTimeout(()=>{
                    setValidateError(false);
                },3000)
             }
             else{
                console.log(result);
                setSignedUp(true)
             }
         }
         catch(err){
            console.log(err);
         }

    }

    //eye icon for password field
    const [eyeImgpw,setEyeImgpw] = useState(hide)
    //eye icon for re-password field
    const pwRef = useRef();

    function handleChangeEye(type){
        if(type === 'password'){
            if(eyeImgpw === show){
                setEyeImgpw(hide)
                pwRef.current.type = 'password'
            }
            else{
                setEyeImgpw(show)
                pwRef.current.type = 'text'

            }
        }

    }
    if(signedUp){
        return(
            <Navigate to={'/'}></Navigate>
        )
    }
    else{
        return(
            <>
              <div className="auth-main">
                 <header>
                    <h1>DeepHive</h1>
                 </header>
                 <main className='main-div'>
                    <div className="top">
                      <div className="circle">
                         <img src={backSign} alt="" />
                      </div>
                      <div>
                        <p>New Here ? <span style={{ color: '#987DF5' }}>Sign Up</span></p>
                      </div>
                    </div>
                    <div>
                      <h1 className="auth-bold-text">Login</h1>
                      <p><span style={{ color: '#a7a7a7'}}>To enter the world of</span> <span style={{ color: '#987DF5'}}>Drip, Style and Fashion</span></p>
                      <form action="" onSubmit={handleSubmit}>

                        <div className="input-box">
                        <span className="input-img">
                            <img src={mail} alt="" />
                        </span>
                        <input type="text" onChange={(e)=>setEmail(e.target.value)} value={email} name="email" placeholder="Email" required />
                        </div>
                        <div className="input-box">
                        <span className="input-img">
                            <img src={shield} alt="" />
                        </span>
                        <input type="password" name="password" value={password} autoComplete='off' onChange={(e)=>setPassword(e.target.value)} ref={pwRef}  placeholder="Password" required />
                        <span className="input-eye">
                            <img onClick={()=>{handleChangeEye('password')}} src={eyeImgpw} alt="" />
                        </span>
                        </div>

                        <div style={{ height: '30px',  marginTop: '10px'}}>
                        {
                            validateError ? <p style={{ color: 'red',marginTop: '10px', marginLeft: '10px' }}>Credential do not match</p> : null
                         }
                        </div>
                        <div className='btn-div'>

                        <button className='auth-btn'>Login <span className="btn-arr"></span><img className='btn-img' src={frontSign} alt="" /> </button>
                        <div>
                        </div>
                        </div>
                      </form>
                    </div>
                 </main>
              </div>
            </>
        )
    }
}
export default Login;