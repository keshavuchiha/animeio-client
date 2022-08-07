import React from "react";
import Link from "next/link";
import styles from "../styles/Layout.module.css";
import { Center, Group } from "@mantine/core";
interface Props {
  children?: React.ReactNode;
}
function MainMenu(props: Props) {
  const { children } = props;
  return (
    <Center>
      <Group className={styles.menuItems}>
        <Link href="/">HOME</Link>
        <Link href="/movies">MOVIES</Link>
        <Link href="/tvshows">TV SHOWS</Link>
        <Link href="/blog">BLOG</Link>
        <Link href="/pages">PAGES</Link>
      </Group>
    </Center>
  );
}

export default MainMenu;
