import React from "react";
import { image } from "../../assets/assetsRegister";

const style = {
  container: {
    height: "70vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "0px 130px",
    backgroundColor: "white",
  } as React.CSSProperties,

  banner: {
    display: "flex",
    justifyItems: "center",
    borderRadius: "10px",
  } as React.CSSProperties,

  bannerContainer: {
    backgroundImage: `url("${image.background}")`,
    height: "100%",
    display: "flex",
    width: "90%",
    alignItems: "center",
    backgroundSize: "100%",
    justifyContent: "space-around",
    backgroundRepeat: "no-repeat",
  } as React.CSSProperties,

  textBanner: {
    alignSelf: "flex-start",
    color: "white",
    display: "flex",
    flexDirection: "column",
    padding: "20px 50px",
    alignItems: "flex-start",
  } as React.CSSProperties,

  productContainer: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    justifyContent: "flex-start",
    padding: 0,
  } as React.CSSProperties,

  imageBanner: {
    height: "100%",
    width: "98%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    marginRight: "-10%",
  } as React.CSSProperties,

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  } as React.CSSProperties,

  pageDark: {
    backgroundColor: "rgba(0,0,0,0.6)",
    position: "absolute",
    width: "100%",
    height: "100%",
  } as React.CSSProperties,

  fullPage: {
    backgroundColor: "white",
    height: "100%",
    width: "100%",
  } as React.CSSProperties,

  order: {
    color: "#BD0707",
    fontFamily: "cursive",
    fontStyle: "normal",
    fontWeight: 900,
    fontSize: "36px",
    lineHeight: "10px",
  } as React.CSSProperties,
};
export default style;
