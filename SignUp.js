import React, { useState } from 'react'
import classes from './SignUp.module.css'
const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [isUser, setIsUser] = useState(true)

  const submitHandler = async (e) => {
    e.preventDefault()
    if (email && password && confirmPass) {
      if (password === confirmPass) {
        console.log(email, password, confirmPass)
        let url
        if (isUser) {
          url =
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCCkbbq5tYi_gSrQ7IJ1BoZ1I4iWWjMMHI'
        } else {
          url =
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCCkbbq5tYi_gSrQ7IJ1BoZ1I4iWWjMMHI'
        }

        try {
          const resp = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
              email: email,
              password: password,
              returnSecureToken: true,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          })
          if (resp.ok) {
            const data = await resp.json()
            // authCtx.login(data.idToken, userName)
            console.log(data)
            // history.replace('/store')
            setEmail('')
            setPassword('')
            setConfirmPass('')
          } else {
            let errorMessage = 'Authentication failed'
            const data = await resp.json()
            console.log(data)
            errorMessage = data.error.message
            throw new Error(errorMessage)
          }
        } catch (error) {
          window.alert(error.message)
          console.log(error.message)
        }
      } else {
        setConfirmPass('')
        alert('Please Re-enter Correct Confirm Password')
      }
    } else {
      alert('Please enter all details...')
    }
  }

  const userHandler = (e) => {
    setIsUser(!isUser)
    e.preventDefault()
  }

  return (
    <div>
      <form onSubmit={submitHandler} className={classes.form}>
        <div className={classes.formInside}>
          <h2>{isUser ? 'Login' : 'SignUp'}</h2>
          <div className={classes.enterVal}>
            <input
              id='name'
              type='text'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={classes.enterVal}>
            <input
              id='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={classes.enterVal}>
            <input
              id='confirmPass'
              type='password'
              placeholder='Confirm Password'
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
            />
          </div>
          <button type='submit'>Submit</button>
          <button className={classes.btn2} onClick={userHandler}>
            {isUser ? 'SignUp' : 'Have an account ? Login'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default SignUp