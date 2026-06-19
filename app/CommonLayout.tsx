"use client";

import Image from "next/image";
import QrCode from "@/public/assets/img/qr-code.png";
import Header from "./components/header/header";
import { useLanguage } from "./context/LanguageProvider";
import { useWindowResize } from "./context/WindowResizeProvider";

type CommonLayoutProps = {
  children: React.ReactNode;
};

const CommonLayout = ({ children }: CommonLayoutProps) => {
  const { isLoading, isLanguagePortuguese } = useLanguage();
  const { isDesktop } = useWindowResize();

  return (
    <div className={!isLoading ? "loaded" : ""}>
      <Header />
      <main>{children}</main>
      {isDesktop && (
        <div
          style={{
            position: "fixed",
            bottom: "1rem",
            right: "1rem",
            zIndex: 10,
            fontSize: 12,
          }}
        >
          <p>
            {isLanguagePortuguese
              ? "Veja a versão mobile"
              : "Check mobile version"}
          </p>
          <Image
            src={QrCode}
            alt="QR code"
            width={100}
            height={100}
            className="qr-code"
          />
        </div>
      )}
    </div>
  );
};

export default CommonLayout;
