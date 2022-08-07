import { Header, Group, TextInput, ActionIcon, Button } from "@mantine/core";
import React, { useState } from "react";
import { BrandAsana, Search } from "tabler-icons-react";
import MainMenu from "./MainMenu";
import styles from "../styles/Layout.module.css";
import LoginBtn from "./LoginBtn";
interface Props {
  children: React.ReactNode;
}

function Layout(props: Props) {
  const [value, setValue] = useState("");
  const { children } = props;
  return (
    <>
      <Header height="10vh" className={styles.mainHeader}>
        <Group>
          <BrandAsana color="red" size="2.5rem" />
          <span>Animeio</span>
          <span>
            <MainMenu />
          </span>
        </Group>
        <Group>
          <TextInput
            placeholder="Search..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <ActionIcon>
            <Search />
          </ActionIcon>
          <LoginBtn>SignIn</LoginBtn>
        </Group>
      </Header>
      {children}
    </>
  );
}

export default Layout;
