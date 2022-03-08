import React from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";

import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    backgroundColor: "#8EC5FC",
    backgroundImage: "linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)",
  },
  routerLink: {
    color: "inherit",
    textDecoration: "none",
  },
  pokeball: {
    width: 30,
  },
}));

interface PokemonProps {
  id: string;
  name: string;
  onMouseEnter: any;
  onClick: any;
}

const PokemonCard = (PokemonProps: PokemonProps) => {
  const classes = useStyles();
  return (
    <List className={classes.root}>
      <Link
        className={classes.routerLink}
        to={`/${PokemonProps.name}/${PokemonProps.id}`}
      >
        <ListItem
          button
          onClick={PokemonProps.onClick}
          onMouseEnter={PokemonProps.onMouseEnter}
        >
          <ListItemText primary={PokemonProps.id} />
          <ListItemText primary={PokemonProps.name} />
          <img
            className={classes.pokeball}
            src="/pokeball.png"
            alt="pokeball"
          />
        </ListItem>
      </Link>
    </List>
  );
};

export default PokemonCard;
