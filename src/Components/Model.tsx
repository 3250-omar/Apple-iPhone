import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ModelView from "./ModelView";
import { useEffect, useRef, useState } from "react";
import { yellowImg } from "../utiles";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { models, sizes } from "../constants";
import { animateWithGSAPANDTimelline } from "../utiles/animations";
export interface modelProps {
  title: string;
  color: string[];
  img: string;
}
const modelData: modelProps = {
  title: "iPhone 15 Pro in Natural Titanium ",
  color: ["#8F8A81", "#FFE7B9", "#6F6C64"],
  img: yellowImg,
};
const Model = () => {
  const [size, setSize] = useState<string>("small");
  const [model, setModel] = useState<modelProps>(modelData);

  //keep track of camera control for model view
  const cameraControlSmall = useRef(null);
  const cameraControlLarge = useRef(null);
  //keep track of model
  const small = useRef(new THREE.Group());
  const large = useRef(new THREE.Group());

  // rotation of the model
  const [smallRotation, setSmallRotation] = useState<number>(0);
  const [largeRotation, setLargeRotation] = useState<number>(0);

  const tl = gsap.timeline();

  useEffect(() => {
    if (size === "large") {
      animateWithGSAPANDTimelline({
        timeLine: tl,
        rotationRef: small,
        rotationState: smallRotation,
        fromView: "#view1",
        toView: "#view2",
        animationProps: {
          transform: "translateX(-100%)",
          duration: 2,
        },
      });
    } else if (size === "small") {
      animateWithGSAPANDTimelline({
        timeLine: tl,
        rotationRef: large,
        rotationState: largeRotation,
        fromView: "#view2",
        toView: "#view1",
        animationProps: {
          transform: "translateX(0)",
          duration: 2,
        },
      });
    }
  }, [size]);
  useGSAP(() => {
    gsap.to("#heading", {
      y: 0,
      opacity: 1,
    });
  }, []);
  return (
    <section className="common-padding" id="sec">
      <div className="max-screen-width">
        <h1 className="section-heading" id="heading">
          Take a closer look.
        </h1>
        <div className="w-full h-[75vh] md:v-[90vh] overflow-hidden relative">
          <ModelView
            index={1}
            groupRef={small}
            gsapType="view1"
            controlRef={cameraControlSmall}
            setRotationState={setSmallRotation}
            item={model}
            size={size}
          />
          <ModelView
            index={2}
            groupRef={large}
            gsapType="view2"
            controlRef={cameraControlLarge}
            setRotationState={setLargeRotation}
            item={model}
            size={size}
          />
          {/* The Canvas object is where you start to define your React Three Fiber Scene.
           */}
          <Canvas
            className="w-full h-full fixed top-0 left-0 right-0 bottom-0 overflow-hidden"
            eventSource={document.getElementById("root")!}
          >
            <View.Port />
          </Canvas>
        </div>
        <div className="mx-auto w-full ">
          <p className="text-sm font-light mb-5 text-center">{model.title}</p>
          <div className="flex-center ">
            <ul className="color-container">
              {models.map((model, i) => (
                <li
                  key={i}
                  className="w-6 h-6 mx-2 rounded-full cursor-pointer"
                  style={{ backgroundColor: model.color[0] }}
                  onClick={() => setModel(model)}
                />
              ))}
            </ul>
            <button className="size-btn-container">
              {sizes.map(({ label, value }) => (
                <span
                  key={label}
                  className={`size-btn cursor-pointer`}
                  style={{
                    backgroundColor: size === value ? "white" : "transparent",
                    color: size === value ? "black" : "white",
                  }}
                  onClick={() => setSize(value)}
                >
                  {label}
                </span>
              ))}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Model;
