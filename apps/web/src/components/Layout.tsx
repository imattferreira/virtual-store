import { styled } from "../styles";
import Header from "./Header";

type LayoutProps = {
  children: React.ReactNode;
};

const Container = styled("div", {
  maxWidth: 1400,
  margin: "0 auto",
});

function Layout({ children }: LayoutProps) {
  return (
    <Container>
      <Header />
      {children}
    </Container>
  );
}

export default Layout;
