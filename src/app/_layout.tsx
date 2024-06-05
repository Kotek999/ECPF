import React from "react";
import RootStack from "../../rootStack";
import { Spinner } from "../components/Atoms/Spinner";
import { useLoadFonts } from "../hooks/loadFonts/useLoadFonts";

export default function Layout() {
  const { loading } = useLoadFonts();

  return loading ? <Spinner /> : <RootStack />;
}
