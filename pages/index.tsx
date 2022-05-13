import type { NextPage } from 'next'
import Head from 'next/head'
import { signIn } from "next-auth/react"
import Image from 'next/image'
import { ChangeEventHandler, useState } from 'react'

type Values = {
  username: string,
  password: string
}

const Home: NextPage = () => {

  const [values, setValues] = useState<Values>({username: "", password: ""});
  
  const setValueUsername = (e: React.ChangeEvent<HTMLInputElement>)=> {
    console.log(e);
    const newValue = e.target.value;
    setValues({...values, username: newValue});
    console.log(values);
}

  const setValuePassword = (e: React.ChangeEvent<HTMLInputElement>)=> {
    console.log(e);
    const newValue = e.target.value;
    setValues({...values, password: newValue});
    console.log(values);
}


  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
         
        <div className="content">
          <div className="container">
            <div className="contents">
              <div className="form-block">
                <div className="header-form">
                  <h3>Sign In to <strong>Test</strong></h3>
                  <p className="mb-4">A Next Authentication implementation.</p>
                </div>
                <form action="#" method="post">
                  <div className="form-group">
                    <input className='input form-control' type="text" onChange={setValueUsername} value={values.username} />
                    <label className='label'>Email</label>
                  </div>
                  <div className="form-group">
                    <input className='input form-control' type="password" onChange={setValuePassword} value={values.password} />
                    <label className='label'>Password</label>
                  </div>
                  
                  <div className="footer-form">
                    <label className="control control--checkbox mb-0"><span className="caption">Remember me</span>
                      <input type="checkbox" />
                      <div className="control__indicator"></div>
                    </label>
                    <span className="ml-auto"><a href="#" className="forgot-pass">Forgot Password</a></span> 
                  </div>

                  <div className="action-form">
                    <button type="submit" value="Log In" className="btn btn-pill" onClick={async () => {
                      event?.preventDefault();
                      const res: any = await signIn('credentials', { username: values.username, password: values.password,
                              callbackUrl: `${window.location.origin}/account_page`,
                              redirect: false
                            }
                          );
                      if (res?.error) console.log(res.error)
                      if (res?.url) console.log(res.url);
                    }}>Log In</button>

                    <span className="action-text"> or sign in with</span>
                  </div>

                  
                  <div className="social-login">
                    <a href="#" className="facebook">
                      <span className="icon-facebook mr-3"></span> 
                    </a>
                    <a href="#" className="twitter">
                      <span className="icon-twitter mr-3"></span> 
                    </a>
                    <a href="#" className="google">
                      <span className="icon-google mr-3"></span> 
                    </a>
                  </div>
                </form>
                </div>
              </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home

