import { Tabs } from '@mantine/core';
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
    console.log(session);
  return (
    <>
        
        <Layout>
        <Tabs variant='outline' color='gray'>
            <Tabs.List>
                <Tabs.Tab value="watchlist">WatchList</Tabs.Tab>
                <Tabs.Tab value="followed">Followed</Tabs.Tab>
                <Tabs.Tab value="onHold">On-Hold</Tabs.Tab>
                <Tabs.Tab value="planned">Planned</Tabs.Tab>
                <Tabs.Tab value="finished">Finished</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value='watchlist'>WatchList</Tabs.Panel>
            <Tabs.Panel value='followed'>Followed</Tabs.Panel>
            <Tabs.Panel value='onHold'>On-Hold</Tabs.Panel>
            <Tabs.Panel value='planned'>Planned</Tabs.Panel>
            <Tabs.Panel value='finished'>Finished</Tabs.Panel>
        </Tabs>
        </Layout>
        </>
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