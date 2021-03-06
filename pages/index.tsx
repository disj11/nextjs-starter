import React from "react";
import Head from "next/head";
import { inject, observer } from "mobx-react";
import { GetServerSideProps } from "next";
import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@material-ui/core";
import { UserRepository } from "../src/repositories/user_repository";
import { UserStore } from "../src/stores/user_store";
import { ToggleThemeContext } from "../src/theme";
import { NextPageWithLayout } from "../src/types/server_type";
import Layout from "../src/components/Layout";

interface Props {
  userStore: UserStore;
}

const Home: NextPageWithLayout<Props> = inject("userStore")(
  observer((props) => {
    const { userStore } = props;
    const { toggleTheme } = React.useContext(ToggleThemeContext);

    return (
      <>
        <Head>
          <title>Next.js + React + Mobx</title>
        </Head>
        <Container maxWidth="lg">
          <Box mb={3}>
            <Button onClick={toggleTheme}>Toggle theme</Button>
          </Box>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell align="right">
                    Username
                  </TableCell>
                  <TableCell align="right">Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userStore.getUsers().map((user) => (
                  <TableRow key={user.id}>
                    <TableCell component="th" scope="row">
                      {user.name}
                    </TableCell>
                    <TableCell align="right">
                      {user.username}
                    </TableCell>
                    <TableCell align="right">
                      {user.email}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </>
    );
  })
);

export const getServerSideProps: GetServerSideProps = async () => {
  const { data: users } = await UserRepository.getUsers();
  return {
    props: {
      initialStoreState: {
        users
      }
    }
  };
};

Home.Layout = Layout;
export default Home;
