import { getScreenWidth } from "./getScreenWidth";

const isMobileScreen = (value) => value <= 320;
const isTabletScreen = (value) => value > 321 && value <= 768;
const isMonitorScreen = (value) => value > 768;

export const resizeImage = () => {
    const width = getScreenWidth();
    const fraction = 2;
    if (isMobileScreen(width)) {
      return (width - (width * .25)) / fraction;
    } 
    if (isTabletScreen(width)) {
      return (width - (width * 0.4) / fraction);
    }
    return isMonitorScreen(width) && (width - (width * 0.75)) / fraction;

  };