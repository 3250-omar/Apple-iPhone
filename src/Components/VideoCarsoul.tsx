import { useEffect, useRef, useState } from "react";
import { hightlightsSlides } from "../constants";
import gsap from "gsap";
import { pauseImg, playImg, replayImg } from "../utiles";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);
interface VideoProps {
  isEnd: boolean;
  startPlay: boolean;
  videoId: number;
  isLastVideo: boolean;
  isPlaying: boolean;
  goTo: boolean;
}
const videInit: VideoProps = {
  isEnd: false,
  startPlay: false,
  videoId: 0,
  isLastVideo: false,
  isPlaying: false,
  goTo: false,
};
const VideoCarsoul = () => {
  const videoRef = useRef<(HTMLVideoElement | null)[]>([]);
  const videoSpanRef = useRef<(HTMLSpanElement | null)[]>([]);
  const videoDivRef = useRef<(HTMLSpanElement | null)[]>([]);
  const [loadedData, setLoadedData] = useState<
    React.SyntheticEvent<HTMLVideoElement, Event>[]
  >([]);
  const [video, setVideo] = useState<VideoProps>(videInit);

  const handleProcess = (process: string, i: number) => {
    switch (process) {
      case "video-end":
        setVideo((pre) => ({ ...pre, isEnd: true, videoId: i + 1 }));
        break;
      case "video-last":
        setVideo((pre) => ({ ...pre, isLastVideo: true }));
        break;
      case "video-reset":
        setVideo((pre) => ({ ...pre, isLastVideo: false, videoId: 0 }));
        break;
      case "play":
        setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
        break;
      case "pause":
        setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
        break;
      case "goto":
        // Pause all videos
        videoRef.current.forEach((video) => {
          if (video) {
            video.pause();
            video.currentTime = 0; // Optional: reset to start
          }
        });
        // Play the selected video after state updates
        setVideo((prev) => ({
          ...prev,
          videoId: i,
          isPlaying: true,
          startPlay: true,
          goTo: true,
        }));

        setTimeout(() => {
          const selectedVideo = videoRef.current[i];
          if (selectedVideo) {
            selectedVideo.play();
          }
        }, 0);
        break;
      default:
        return video;
    }
  };
  //destruction the props of video to make it easy to use
  const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video;

  useGSAP(() => {
    gsap.to("#slider", {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 1,
      ease: "power1.inOut",
    });

    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none",
      },
      onComplete: () => {
        setVideo((prev) => ({ ...prev, startPlay: true, isPlaying: true }));
      },
    });
  }, [isEnd, videoId]);
  useEffect(() => {
    if (loadedData.length > 3) {
      const videoEl = videoRef.current[videoId];
      if (videoEl) {
        if (!isPlaying) {
          videoEl.pause();
        } else if (startPlay) {
          videoEl.play();
        }
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]); //that deals with the playing of the video
  useEffect(() => {
    let currentProgress = 0; //where we are now
    let span = videoSpanRef.current;

    if (span[videoId]) {
      //animate the progress of the video
      let anim = gsap.to(span[videoId], {
        onUpdate: () => {
          const progress = Math.ceil(anim.progress() * 100);

          if (currentProgress !== progress) {
            currentProgress = progress;
            gsap.to(videoDivRef.current[videoId], {
              width:
                window.innerWidth < 760
                  ? "10vw"
                  : window.innerWidth < 1200
                  ? "10vw"
                  : "4vw",
            });
            gsap.to(span[videoId], {
              width: `${currentProgress}%`,
              backgroundColor: "white",
            });
          }
        },
        onComplete: () => {
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], {
              width: "12px",
            });
            gsap.to(span[videoId], {
              backgroundColor: "#afafaf",
            });
          }
        },
      });
      if (videoId === 0) {
        anim.restart();
      }
      const animUpdate = () => {
        anim.progress(
          (videoRef.current[videoId]?.currentTime ?? 0) /
            hightlightsSlides[videoId].videoDuration
        );
      };

      if (isPlaying) {
        gsap.ticker.add(animUpdate);
      } else {
        gsap.ticker.remove(animUpdate);
      }
    }
  }, [videoId, startPlay]);

  const handleVideoMetaData = (
    e: React.SyntheticEvent<HTMLVideoElement, Event>
  ) => {
    setLoadedData((prev) => [...prev, e]);
  };
  return (
    <>
      <div className="flex items-center">
        {hightlightsSlides.map((slide, i) => (
          <div id="slider" key={slide.id} className="sm:pr-20 pr-10 ">
            <div
              className="video-carousel_container
              "
            >
              <div
                className={`w-full h-full bg-black rounded-3xl overflow-hidden flex-center `}
              >
                <video
                  id="video"
                  muted
                  playsInline={true}
                  preload="auto"
                  ref={(el) => {
                    videoRef.current[i] = el;
                  }}
                  onPlay={() =>
                    setVideo((prevVideo) => ({ ...prevVideo, isPlaying: true }))
                  }
                  onLoadedMetadata={(e) => handleVideoMetaData(e)}
                  onEnded={() =>
                    i !== 3
                      ? handleProcess("video-end", i)
                      : handleProcess("video-last", i)
                  }
                  className={`pointer-events-none object-cover w-full h-full `}
                >
                  <source src={slide.video} type="video/mp4" />
                </video>
              </div>
              <div className="absolute top-12 left-[5%] z-10">
                {slide.textLists.map((text, index) => (
                  <p key={index} className="font-medium text-xl md:text-2xl ">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="relative flex-center mt-10 ">
        <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
          {videoRef.current.map((_, i) => (
            <span
              className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
              key={i}
              ref={(el) => {
                videoDivRef.current[i] = el;
              }}
              onClick={() => handleProcess("goto", i)}
            >
              <span
                className="absolute h-full w-full rounded-full"
                ref={(el) => {
                  videoSpanRef.current[i] = el;
                }}
              ></span>
            </span>
          ))}
        </div>
        <button
          className="control-btn"
          onClick={
            isLastVideo
              ? () => handleProcess("video-reset", 0)
              : !isPlaying
              ? () => handleProcess("play", videoId)
              : () => handleProcess("pause", videoId)
          }
        >
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
          />
        </button>
      </div>
    </>
  );
};

export default VideoCarsoul;
