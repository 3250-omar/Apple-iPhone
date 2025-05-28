import { useGSAP } from "@gsap/react";
import { animationWithGSAP } from "../utiles/animations";
import { explore1Img, explore2Img, exploreVideo } from "../utiles";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
const Features = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useGSAP(() => {
    gsap.to("#explore_video", {
      scrollTrigger: {
        trigger: "#explore_video",
        toggleActions: "play pause reverse restart",
        start: "-10% bottom",
      },
      onComplete: () => {
        videoRef.current?.play();
      },
    });
    animationWithGSAP({
      target: "#features_title",
      animationProps: { y: 0, opacity: 1 },
      scrollProps: { scurb: 5.5 },
    });
    animationWithGSAP({
      target: ".g_grow",
      animationProps: { scale: 1, opacity: 1, ease: "power1", duration: 2 },
    });
    animationWithGSAP({
      target: ".g_text",
      animationProps: { y: 0, opacity: 1, ease: "power2.out", duration: 1 },
    });
  }, []);
  return (
    <section className="bg-zinc common-padding h-full relative overflow-hidden">
      <div className="screen-max-width">
        <div className="mb-12 w-full">
          <h1 id="features_title" className="section-heading">
            Explore The Full Story.
          </h1>
        </div>
        <div className="flex flex-col justify-center items-center overflow-hidden">
          <div className="mt-32 mb-24 pl-24">
            <h2 className="text-5xl lg:7xl font-semibold">iPhone</h2>
            <h2 className="text-5xl lg:7xl font-semibold">
              Forged In Titanium.
            </h2>
          </div>
          <div className="flex-center flex-col sm:px-10">
            <div className="relative w-full h-[50vh] flex items-center">
              <video
                playsInline
                id="explore_video"
                className="w-full h-full object-cover object-center "
                preload="none"
                muted
                autoPlay
                ref={videoRef}
              >
                <source src={exploreVideo} type="video/mp4" />
              </video>
            </div>
            <div className="flex flex-col w-full relative">
              <div className="feature-video-container">
                <div className="overflow-hidden h-[50vh] flex-1 ">
                  <img
                    src={explore1Img}
                    alt="titanium"
                    className="feature-video g_grow "
                  />
                </div>
                <div className="overflow-hidden h-[50vh] flex-1 ">
                  <img
                    src={explore2Img}
                    alt="titanium2"
                    className="feature-video g_grow "
                  />
                </div>
              </div>
              <div className="feature-text-container">
                <div className="flex-1  flex-center">
                  <p className="feature-text g_text ">
                    iPhone 15 Pro is{" "}
                    <span className="text-white">
                      {" "}
                      the first iPhone to feature an aerospace-grade titanium
                      design
                    </span>
                    , using the same alloy that spacecrafts use for missions to
                    Mars.
                  </p>
                </div>
                <div className="flex-1  flex-center">
                  <p className="feature-text g_text ">
                    Titanium has one of the best strength-to-weight ratios of
                    any metal, making these our{" "}
                    <span className="text-white">
                      {" "}
                      lightest Pro models ever.
                    </span>
                    You'll notice the difference the moment you pick one up.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
