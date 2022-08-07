import { Button } from '@mantine/core';
import React from 'react'
import {signIn,signOut,useSession} from 'next-auth/react'
interface Props{
    children:React.ReactNode
}

function LoginBtn(props:Props) {
    const {data:session}=useSession()
    const {children}=props;

    if(session){
        return (<>
        <Button onClick={()=>signOut()} >SignOut</Button>
        {console.log(session?.user.email)}
        </>)
    }
  return (
    <>
    <Button onClick={()=>signIn()} >SignIn</Button>
    
    </>
  )
}

export default LoginBtn