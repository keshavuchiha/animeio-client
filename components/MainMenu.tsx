import React from "react";
import Link from "next/link";
import styles from "../styles/Layout.module.css";
import { Center, Group } from "@mantine/core";
import {useSession} from 'next-auth/react'
interface Props {
  children?: React.ReactNode;
}
function MainMenu(props: Props) {
  const {data:session}=useSession();
  const { children } = props;
  return (
    <Center>
      <Group className={styles.menuItems}>
        <Link href="/">HOME</Link>
        <Link href="/movies">MOVIES</Link>
        <Link href="/tvshows">TV SHOWS</Link>
        <Link href="/popular">New & Popular</Link>
        <Link href="/trending">Trending</Link>
        {session && <Link href="/my-list">MY List</Link>}
      </Group>
    </Center>
  );
}

export default MainMenu;
