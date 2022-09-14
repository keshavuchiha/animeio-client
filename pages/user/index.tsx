import { Tabs } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import Layout from '../../components/Layout';
import UserMovieList from '../../components/UserMovieList';
import { UserQueryType, UserType } from '../../typings';
import { fetchUserMovieList } from '../../utils/fetchUserMovieList';

interface Props{
    params:{
        userId:string
    }
}
function Users(props:Props) {
    const {data:session,status}=useSession();
    const types=["WatchList","On Hold","Followed","Planned","Finished"]
    const [type,setType]=useState(types[0]);
    const { data: userDetails ,refetch} = useQuery<UserQueryType>(["api/auth/user",session?.user?.email], async () =>
    fetchUserMovieList(session?.user?.email as string,type)
  );
    if(status==='loading'){
        return <>Loading....</>
    }
    if(status==='unauthenticated'){
        return <>Unauthenticated</>
    }
    if(!userDetails){
        return <>Loading...</>
    }
    const user=userDetails.data;
    // console.log(user);
    return (
    <>
        
        <Layout>
        <Tabs variant='outline' color='gray' defaultValue={types[0]} onTabChange={(t)=>{setType(t as string)}}>
            <Tabs.List>
                {
                    types.map((t)=>{
                        return <div key={t}>
                            <Tabs.Tab value={t}>{t}</Tabs.Tab>
                        </div>
                    })
                }
            </Tabs.List>
        </Tabs>
        <UserMovieList user={user} type={type} refetch={refetch}/>
        </Layout>
        </>
  )
}

// export const getServerSideProps:GetServerSideProps=async (context)=>{
//     return {
//         props:{
//             params:context.params
//         }
//     }
// }

export default Users