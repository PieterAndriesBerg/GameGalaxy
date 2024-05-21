import React from "react";
import STEAM from "../../assets/platform-icons/steam.svg?react";
import XBOX from "../../assets/platform-icons/xbox.svg?react";
import PLAYSTATION from "../../assets/platform-icons/playstation.svg?react";
import NINTENDO from "../../assets/platform-icons/nintendo-switch.svg?react";
import EPICGAMES from "../../assets/platform-icons/epic-games.svg?react";
import GOG from "../../assets/platform-icons/gog.svg?react";
import "./WhereToBuy.css";

const WhereToBuy = ({ store, handleStoreLink }) => {
  const storeLogos = {
    Steam: STEAM,
    "Xbox Store": XBOX,
    "Xbox 360 Store": XBOX,
    "PlayStation Store": PLAYSTATION,
    "Nintendo Store": NINTENDO,
    "Epic Games": EPICGAMES,
    GOG: GOG,
  };

  const Logo = storeLogos[store?.store.name];

  return (
    <div
      className="container-where-to-buy"
      onClick={(e) => handleStoreLink(e, store.store.domain)}
    >
      <span>{store?.store.name}</span>
      <Logo className="where-to-buy-logo" />
    </div>
  );
};

export default WhereToBuy;
