import PC from "../assets/platform-icons/windows.svg?react";
import Xbox from "../assets/platform-icons/xbox.svg?react";
import Playstation from "../assets/platform-icons/playstation.svg?react";
import Nintendo from "../assets/platform-icons/nintendo-switch.svg?react";
import Apple from "../assets/platform-icons/apple.svg?react";
import Linux from "../assets/platform-icons/linux.svg?react";

const platformIcons = {
  PC: <PC className="platform-icon" key="pc" />,
  Xbox: <Xbox className="platform-icon" key="xbox" />,
  Playstation: <Playstation className="platform-icon" key="playstation" />,
  Nintendo: <Nintendo className="platform-icon" key="nintendo" />,
  macOs: <Apple className="platform-icon" key="macos" />,
  Linux: <Linux className="platform-icon" key="linux" />,
};

export const getPlatformIcon = (platforms) => {
  let platformArray = [];

  platforms &&
    platforms.map((platform) => {
      switch (platform.platform.name) {
        case "PC":
          !platformArray.includes("PC") && platformArray.push("PC");
          break;
        case "Xbox":
        case "Xbox Series S/X":
        case "Xbox One":
        case "Xbox 360":
          !platformArray.includes("Xbox") && platformArray.push("Xbox");
          break;
        case "Nintendo Switch":
          !platformArray.includes("Nintendo") && platformArray.push("Nintendo");
          break;
        case "PlayStation":
        case "PlayStation 2":
        case "PlayStation 3":
        case "PlayStation 4":
        case "PlayStation 5":
          !platformArray.includes("Playstation") &&
            platformArray.push("Playstation");
          break;
        case "Linux":
          !platformArray.includes("Linux") && platformArray.push("Linux");
          break;
        case "macOs":
        case "Apple":
          !platformArray.includes("macOs") && platformArray.push("macOs");
      }
    });

  return platformArray.map((platformName) => platformIcons[platformName]);
};
