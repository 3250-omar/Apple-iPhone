import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { rightImg, watchImg } from "../utiles";
import VideoCarsoul from "./VideoCarsoul";

const Highlights = () => {
  useGSAP(() => {
    gsap.to("#title", {
      opacity: 1,
      y: 0,
    });
    gsap.to(".link", {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.2,
    });
  }, []);
  return (
    <section
      className="w-screen h-full bg-zinc relative overflow-hidden common-padding"
      id="highlight"
    >
      <div className="screen-max-width ">
        <div className="mb-12 w-full justify-between md:flex items-end ">
          <h1 className="section-heading" id="title">
            Get the highlights.
          </h1>
          <div className="flex flex-wrap items-center gap-4">
            <p className="link">
              Watch the film
              <img src={watchImg} alt="watch" className="ml-2" loading="lazy"/>
            </p>
            <p className="link">
              Watch the event
              <img src={rightImg} alt="watch" className="ml-2" loading="lazy"/>
            </p>
          </div>
        </div>
      </div>
      <VideoCarsoul />
    </section>
  );
};

export default Highlights;
