const platformIcons = {
  PC: "src/assets/icons/windows.svg",
  Xbox: "src/assets/icons/xbox.svg",
  Playstation: "src/assets/icons/playstation.svg",
  Nintendo: "src/assets/icons/nintendo-switch.svg",
  Apple: "src/assets/icons/apple.svg",
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
console.log(platformIcon);
