import React from "react";
import { Typography } from "@material-ui/core";
import styles from "../styles/404.module.css";
import { NextPage } from "next";

export const FourOFour: NextPage = () => (
  <div className={styles.error}>
    <div className={styles.container}>
      <Typography variant="h6">This page could not be found 🙁</Typography>
    </div>
  </div>
);

export default FourOFour;
