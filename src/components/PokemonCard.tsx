import React from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";

import { Link, useLocation } from "react-router-dom";

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
  selected: {
    backgroundColor: "#8EC5FC"
  }
}));

interface PokemonProps {
  id: string;
  name: string;
  onMouseEnter: any;
  onClick: any;
}

const PokemonCard = (PokemonProps: PokemonProps) => {
  const classes = useStyles();
  const location = useLocation();
  const extractedFromLocationId = location.pathname.split('/')[2];

  return (
    <List className={classes.root}>
      <Link
        className={classes.routerLink}
        to={`/${PokemonProps.name}/${PokemonProps.id}`}
      >
        <ListItem
          button
          className={PokemonProps.id[0] === extractedFromLocationId ? classes.selected : ""}
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
