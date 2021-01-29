import React from 'react'
import Head from 'next/head'
import {inject, observer} from "mobx-react";
import {GetServerSideProps, NextPage} from "next";
import {UserRepository} from "../src/repositories/user_repository";
import {UserStore} from "../src/stores/user_store";

interface Props {
    userStore: UserStore,
}

const Home: NextPage<Props> = inject("userStore")(
    observer((props) => {
        const {userStore} = props;
        return (
            <>
                <Head>
                    <title>Next.js + React + Mobx</title>
                </Head>
                <div>
                    {userStore.getUsers().map(user => (
                        <div key={user.id}>
                            <div>{user.id}</div>
                            <div>{user.email}</div>
                            <div>{user.name}</div>
                            <div>{user.username}</div>
                        </div>
                    ))}
                </div>
            </>
        );
    })
);

export const getServerSideProps: GetServerSideProps = async () => {
    const {data: users} = await UserRepository.getUsers();
    return {
        props: {
            initialStoreState: {
                users,
            }
        }
    }
};

export default Home;
