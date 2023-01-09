// Modules
import { StatusBar, Dimensions, ScaledSize } from "react-native";

class AppScreen {
  static getHeightStatusBar(): number {
    return StatusBar.currentHeight ?? 0;
  }

  static getSizeDimensions(scaleSize: keyof ScaledSize) {
    return Dimensions.get("window")[scaleSize];
  }
};

export default AppScreen;