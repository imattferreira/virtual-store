import NextLink from "next/link";

type LinkProps = {
  link: string;
  children: React.ReactNode;
};

function Link({ link, children }: LinkProps) {
  if (link.startsWith("http")) {
    return (
      // TODO add security props and unstyle tag
      <a href={link}>{children}</a>
    );
  }

  return (
    <NextLink href={link} passHref>
      {children}
    </NextLink>
  );
}

export default Link;
