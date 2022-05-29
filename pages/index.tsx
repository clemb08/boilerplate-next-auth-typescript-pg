import type { NextPage } from 'next'
import Head from 'next/head'
import { signIn } from "next-auth/react"
import React, { useState } from 'react'
import Values from '../types/Auth'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Spinner from '../components/Spinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faGoogle, faSalesforce } from "@fortawesome/free-brands-svg-icons";

const Home: NextPage = () => {

  const router = useRouter();
  const [values, setValues] = useState<Values>({username: "", password: ""});
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<Boolean>(false);
  
  const setValueUsername = (e: React.ChangeEvent<HTMLInputElement>)=> {
    const newValue = e.target.value;
    setValues({...values, username: newValue});
  }

  const setValuePassword = (e: React.ChangeEvent<HTMLInputElement>)=> {
    const newValue = e.target.value;
    setValues({...values, password: newValue});
  }

  const signInCreds = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setLoading(true);
    e.preventDefault();
    const res: any = await signIn('credentials', { username: values.username, password: values.password,
            redirect: false
          }
        );
        console.log(res);
    if (res?.error) setError('The credentials provided are wrong');
    if (res?.url) router.push('/connected');
    setLoading(false);
  }

  const signInGoogle = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    setLoading(true);
    const res: any = await signIn('google', {callbackUrl: `${window.location.origin}/connected`});
  }

  return (
    <>
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
                  <p  className='authError'>{error}</p>
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
                    <button type="submit" value="Log In" className="btn btn-pill" onClick={signInCreds}>Log In</button>
                    <span className="action-text"> or sign in with</span>
                  </div>
                  <div className="social-login">
                    <a href="#" className="salesforce">
                      <span className="icon-salesforce mr-3"><FontAwesomeIcon icon={ faSalesforce } /></span> 
                    </a>
                    <a href="#" className="github">
                      <span className="icon-github mr-3"><FontAwesomeIcon icon={ faGithub } /></span> 
                    </a>
                    <a href="#" className="google" onClick={signInGoogle}>
                      <span className="icon-google mr-3"><FontAwesomeIcon icon={ faGoogle } /></span> 
                    </a>
                  </div>
                </form>
                <div>
                  <h3>If you do not have register yet : <Link href="/register">Come Here</Link></h3>
                </div>
                </div>
              </div>
          </div>
        </div>
      </main>
    </div>
    {
      loading ? <Spinner></Spinner> : <></>
    }
    </>
  )
}

export default Home

