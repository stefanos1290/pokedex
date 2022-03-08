import React, { FunctionComponent } from "react";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: 160,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 250,
  },
}));

const Header: FunctionComponent = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <img className={classes.logo} src="../pokedex.png" alt="pokedex" />
    </div>
  );
};

export default Header;
