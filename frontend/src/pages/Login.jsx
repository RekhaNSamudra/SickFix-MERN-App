import React, { useState } from 'react'

const Login = () => {
  const [login, setLogin] = useState('Sign Up')

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  })

  return (
    <>
      <form className='min-h-[80vh] flex items-center'>
        <div className='flex flex-col m-auto gap-3 items-start p-8 border min-w-[340px] sm:min-w-96 rounded-xl border-zinc-200 shadow-lg text-sm'>
          <p className='text-2xl font-semibold text-gray-600 '>{login === 'Sign Up' ? 'Craete account' : 'LogIn'} </p>
          <p className='text-gray-500'>Please {login === 'Sign Up' ? 'sign up' : 'LogIn'} to book appointment</p>
          {login === 'Sign Up' &&  <div className='w-full'>
            <p>Full Name</p>
            <input className='border border-zinc-300 p-2 mt-1 w-full rounded' type="text" onChange={(e) => setUser(e.target.name)} value={user.name} />
            </div>}
         
          <div className='w-full'>
            <p>Email</p>
            <input className='border border-zinc-300 p-2 mt-1 w-full rounded' type="email" onChange={(e) => setUser(e.target.email)} value={user.email} />
            </div>
          <div className='w-full'>
            <p>Password</p>
            <input className='border border-zinc-300 p-2 mt-1 w-full rounded' type="password" onChange={(e) => setUser(e.target.password)} value={user.password} />
            </div>
            <button className='bg-primary text-white w-full rounded py-3 mt-3 text-base font-medium'>{login === 'Sign Up' ? 'Craete account' : 'LogIn'}</button>
            {
              login === 'Sign Up' ? <p className='text-gray-600'>Already have an account? <span onClick={() => setLogin('login')} className='text-primary text-sm font-medium cursor-pointer underline'>Login here</span>

              </p> : <p className='text-gray-600'>Create an new account? <span onClick={() => setLogin('Sign Up')}  className='text-primary text-sm font-medium cursor-pointer underline'>Click here</span></p>
            }
        </div>
      </form>
    </>
  )
}

export default Login