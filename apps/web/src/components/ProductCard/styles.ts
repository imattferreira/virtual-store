import { styled } from "../../styles";

export const Container = styled("a", {
  "& article": {
    background: "$gray100",
    borderRadius: "$base",
    cursor: "pointer",
    height: 358,
    padding: "$4",
    width: "$56",

    "@sm": {
      display: "flex",
      height: 150,
      width: "100%",
    },

    "& img": {
      borderRadius: "$base",
      marginBottom: "$4",
      height: 190,
      width: 190,

      "@sm": {
        height: 120,
        width: 120,
        marginBottom: 0,
        marginRight: "$4",
      },
    },
    "& h3": {
      "-webkit-line-clamp": 2,
      "-webkit-box-orient": "vertical",
      display: "-webkit-box",
      fontSize: 14,
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    "& div": {
      "@sm": {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      },
    },
    "& p": {
      color: "$blue500",
      fontWeight: "$700",
      marginBottom: "$4",
      marginTop: "$2",

      "@sm": {
        fontSize: "$6",
        marginBottom: "$4",
      },
    },
    "& button": {
      alignItems: "center",
      background: "$blue500",
      color: "$gray100",
      display: "flex",
      fontSize: "$4",
      fontWeight: "$600",
      justifyContent: "center",
      padding: "$2 $4",
      width: "100%",

      "& span": {
        marginRight: "$2",
      },
      "&:hover": {
        opacity: 0.8,
      },
      "@sm": {
        display: "none",
      },
    },
    "&:hover": {
      boxShadow: "0px 11px 11px -4px rgba(37,52,71,0.3)",
    },
  },

  // TODO remove
  marginBottom: 16,
});
