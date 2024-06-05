import { useState, useEffect } from "react";
import * as Font from "expo-font";

export const useLoadFonts = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "Open-Sans": require("../../assets/fonts/OpenSans-Medium.ttf"),
      });
      setLoading(false);
    };
    loadFonts();
  }, []);

  return { loading };
};
