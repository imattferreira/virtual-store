import { styled } from "../../styles";

export const Header = styled("header", {
  alignItems: "center",
  borderBottom: "1px solid $gray400",
  display: "flex",
  height: 80,
  justifyContent: "space-between",
  padding: "$4",
  width: "100%",
  marginBottom: "$16",
});

export const Logo = styled("a", {
  fontSize: "$8",
  fontWeight: "$700",

  "& > span:first-child": {
    color: "$gray700",
  },
  "& > span:not(:first-child)": {
    color: "$blue500",
  },
});

export const CartButton = styled("button", {
  alignItems: "center",
  background: "$blue500",
  borderRadius: "$md",
  color: "$gray100",
  display: "flex",
  fontSize: "$4",
  height: 36,
  justifyContent: "center",
  width: 36,

  "&:hover": {
    opacity: 0.8,
  },
});
