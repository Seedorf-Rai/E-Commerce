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
function Signup(){

    // This Section is For posting the signup information to the server

    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [rePassword,setRePassword] = useState('');
    const [matchFail , setMatchFail] = useState(false);
    const [signedUp, setSignedUp] = useState(false)
   async function handleSubmit(e){
        e.preventDefault();
        console.log('Username',username);
        console.log('email',email);
        console.log('password',password);
        console.log('rePassword',rePassword);
        if(password !== rePassword){
            setMatchFail(true);
            setRePassword('')
            setTimeout(()=>{
                setMatchFail(false);
            },4000)
        }
        else{
         try{
            const response = await fetch('http://localhost:8000/signup',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                  },
                  credentials: 'include',
                  body: JSON.stringify({username: username,email: email,password: password})
              })
              if(response.ok){
                alert('Successfully signed in')
                setSignedUp(true)
                console.log(await response.json());
              }
              else{
                alert('Failed to sign in')
              }

         }
         catch(err){
            console.log(err);
         }
        }
    }

    //eye icon for password field
    const [eyeImgpw,setEyeImgpw] = useState(hide)
    //eye icon for re-password field
    const [eyeImgRepw,setEyeImgRepw] = useState(hide)
    const pwRef = useRef();
    const rePwRef = useRef();

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
        else if(type === 'repassword'){
            if(eyeImgRepw === show){
                setEyeImgRepw(hide)
                rePwRef.current.type = 'password'
            }
            else{
                setEyeImgRepw(show)
                rePwRef.current.type = 'text'
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
                        <p>Already a Member ? <span style={{ color: '#987DF5' }}>Sign In</span></p>
                      </div>
                    </div>
                    <div>
                      <h1 className="auth-bold-text">Sign Up</h1>
                      <p><span style={{ color: '#a7a7a7'}}>To enter the world of</span> <span style={{ color: '#987DF5'}}>Drip, Style and Fashion</span></p>
                      <form action="" onSubmit={handleSubmit}>
                        <div className="input-box">
                        <span className="input-img">
                            <img src={user} alt="" />
                        </span>
                        <input type="text" onChange={(e)=>setUsername(e.target.value)} name="username" placeholder="Username"  />
                        </div>
                        <div className="input-box">
                        <span className="input-img">
                            <img src={mail} alt="" />
                        </span>
                        <input type="text" onChange={(e)=>setEmail(e.target.value)} name="email" placeholder="Email"  />
                        </div>
                        <div className="input-box">
                        <span className="input-img">
                            <img src={shield} alt="" />
                        </span>
                        <input type="password" name="password" onChange={(e)=>setPassword(e.target.value)} ref={pwRef}  placeholder="Password"  />
                        <span className="input-eye">
                            <img onClick={()=>{handleChangeEye('password')}} src={eyeImgpw} alt="" />
                        </span>
                        </div>
                        <div className="input-box">
                        <span className="input-img">
                            <img src={shield} alt="" />
                        </span>
                        <input type="password" name="rePassword" onChange={(e)=>setRePassword(e.target.value)} ref={rePwRef} placeholder="Re-Type Password" value={rePassword} />
                        <span className="input-eye">
                            <img onClick={()=>{handleChangeEye('repassword')}} src={eyeImgRepw} alt="" />
                        </span>
                        </div>
                        <div style={{ height: '30px',  marginTop: '10px'}}>
                        {
                            matchFail == true ? <p style={{ color: 'red',marginTop: '10px', marginLeft: '10px' }}>Passwords donot match</p> : null
                         }
                        </div>
                        <div className='btn-div'>

                        <button className='auth-btn'>Sign Up <span className="btn-arr"></span><img className='btn-img' src={frontSign} alt="" /> </button>
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
export default Signup;