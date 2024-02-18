import PC from "../assets/icons/windows.svg?react";
import Xbox from "../assets/icons/xbox.svg?react";
import Playstation from "../assets/icons/playstation.svg?react";
import Nintendo from "../assets/icons/nintendo-switch.svg?react";
import Apple from "../assets/icons/apple.svg?react";

const platformIcons = {
  PC: <PC className="platform-icon" />,
  Xbox: <Xbox className="platform-icon" />,
  Playstation: <Playstation className="platform-icon" />,
  Nintendo: <Nintendo className="platform-icon" />,
  Apple: <Apple className="platform-icon" />,
};

export const getPlatformIcon = (platformName) => {
  if (platformName in platformIcons) {
    return platformIcons[platformName];
  } else {
    return null;
  }
};

const platformName = "Playstation";
const platformIcon = getPlatformIcon(platformName);
console.log("icon", platformIcon);
