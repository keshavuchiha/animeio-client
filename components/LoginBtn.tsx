import { Button } from '@mantine/core';
import React, { useEffect } from 'react'
import {signIn,signOut,useSession} from 'next-auth/react'
// import { sleep } from '@tanstack/query-core/build/types/packages/query-core/src/utils';
interface Props{
    children:React.ReactNode
}


function LoginBtn(props:Props) {
    const {data:session}=useSession();
    useEffect(()=>{
      if(session){
        fetch('/api/auth/user',{
          method:'POST'
        })
      }
    },[session])
    const {children}=props;
    const handleLogin=async (e:React.MouseEvent<HTMLButtonElement>)=>{
      e.preventDefault();
      signIn();
      // console.log(session,'session');
    }
    if(session){

        return (<>
        <Button onClick={()=>signOut()} >SignOut</Button>
        {console.log(session?.user?.email)}
        </>)
    }
  return (
    <>
    <Button onClick={(e:React.MouseEvent<HTMLButtonElement>)=>handleLogin(e)} >SignIn</Button>
    
    </>
  )
}

export default LoginBtn