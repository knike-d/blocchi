import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ReactNode } from "react";

export const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <div className="m-auto my-7 max-w-5xl">{children}</div>
      <Footer />
    </>
  );
};

type Props = {
  children?: ReactNode;
};
