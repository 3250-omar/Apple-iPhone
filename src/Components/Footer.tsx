import { useGSAP } from "@gsap/react";
import { footerLinks } from "../constants";
import { animationWithGSAP } from "../utiles/animations";

const Footer = () => {
  const date: Date = new Date();
  useGSAP(() => {
    animationWithGSAP({
      target: "#footer",
      animationProps: { opacity: 1, x: 0, duration: 1 },
    });
  }, []);
  return (
    <footer
      className="py-5 sm:px-10 px-5 opacity-0 -translate-x-100"
      id="footer"
    >
      <div className="screen-max-width">
        <div>
          <p className="font-semibold text-gray text-xs">
            More ways to shop:{" "}
            <span className="underline text-blue">Find an Apple Store </span>
            or <span className="underline text-blue">other retailer</span> near
            you.
          </p>
          <p className="font-semibold text-gray text-xs">
            Or call 000800-040-1966
          </p>
        </div>

        <div className="bg-neutral-700 my-5 h-[1px] w-full" />

        <div className="flex md:flex-row flex-col md:items-center justify-between">
          <p className="font-semibold text-gray text-xs">
            Copyright {date.getFullYear()} @ Apple Inc. All rights reserved.
          </p>
          <div className="flex">
            {footerLinks.map((link, i) => (
              <p key={i} className="font-semibold text-gray text-xs">
                {link}{" "}
                {i !== footerLinks.length - 1 && (
                  <span className="mx-2"> | </span>
                )}
              </p>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
