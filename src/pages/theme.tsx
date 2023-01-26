import { extendTheme } from "@chakra-ui/react";
import { Inter, Roboto_Mono } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto_Mono({ subsets: ["cyrillic"] });

const theme = extendTheme({
  fonts: {
    inter: inter.style.fontFamily,
    roboto: roboto.style.fontFamily,
  },
  colors: {
    twitter: "#00acee",
    dropbox: "#3d9ae8",
    spotify: "#1DB954",
    stripe: "#6772e5",
  },
});

export default theme;
