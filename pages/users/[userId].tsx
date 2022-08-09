import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react'
import React from 'react'
import Layout from '../../components/Layout';

interface Props{
    params:{
        userId:string
    }
}
function Users(props:Props) {
    // console.log('props',props.params.userId)
    const id=props.params.userId;
    const {data:session,status}=useSession();
    if(status==='loading'){
        return <>Loading....</>
    }
    if(status==='unauthenticated'){
        return <>Unauthenticated</>
    }
  return (
    <div>
        <Layout>
        {session?.user?.name}
        </Layout>
        </div>
  )
}

export const getServerSideProps:GetServerSideProps=async (context)=>{
    return {
        props:{
            params:context.params
        }
    }
}

export default Users