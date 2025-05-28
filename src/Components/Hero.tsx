import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { heroVideo, smallHeroVideo } from "../utiles";
import { useEffect, useState } from "react";

const Hero = () => {
  const [videoSrc, setVideoSrc] = useState<string>(
    window.innerWidth < 760 ? smallHeroVideo : heroVideo
  );

  const handleVideoSrc = () => {
    if (window.innerWidth < 760) {
      setVideoSrc(smallHeroVideo);
    } else {
      setVideoSrc(heroVideo);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleVideoSrc);

    return () => window.removeEventListener("resize", handleVideoSrc);
  }, []);
  useGSAP(() => {
    gsap.to("#hero", {
      opacity: 1,
      repeat: -1,
      duration: 1.5,
      delay: 1,
      yoyo: true,
    });
    gsap.to("#buy", {
      opacity: 1,
      duration: 1.5,
      delay: 1,
      translateY: -50,
    });
  }, []);
  return (
    <section className="w-full nav-height relative">
      <div className="h-5/6 flex-center flex-col ">
        <p className="hero-title" id="hero">
          iPhone 16 Pro
        </p>
        <div className="md:w-5/6 w-9/12 ">
          <video
            key={videoSrc}
            muted
            autoPlay
            playsInline={true}
            loop={true}
            className="pointer-events-none"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      </div>
      <div
        className="flex justify-center flex-col items-center opacity-0 "
        id="buy"
      >
        <a href="#highlight" className="btn">
          Buy
        </a>
        <p>From $199/month or $999</p>
      </div>
    </section>
  );
};

export default Hero;
