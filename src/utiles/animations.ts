import gsap from 'gsap';
import * as THREE from 'three';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

interface AnimationOptions {
    timeLine:gsap.core.Timeline
    rotationRef: React.RefObject<THREE.Group>;
    rotationState: number;
    fromView: string;
    toView: string;
    animationProps: {
        transform: string;
        duration: number;
    };
}
interface AnimationWithGSAP {
    target: string;
    animationProps: {
        transform?: string;
        duration?: number;
        y?: number;
        x?: number;
        opacity?:number
        scale?: number;
        ease?: string;
    };
    scrollProps?:{
        scurb:number|string
    }
}



export const animateWithGSAPANDTimelline =({timeLine,rotationRef , rotationState , fromView , toView , animationProps}:AnimationOptions)=>{
        timeLine.to(rotationRef?.current?.rotation, {
            y:rotationState,
            duration: animationProps.duration,
            ease: "power2.inOut",

        })
        timeLine.to(fromView, {
            ...animationProps,
            ease: "power2.inOut",

        }, '<')
        timeLine.to(toView, {
            ...animationProps,
            ease: "power2.inOut",

        }, '<')

}

export const animationWithGSAP =({target , animationProps ,scrollProps}:AnimationWithGSAP)=>{
gsap.to(target , {
    ...animationProps,
    scrollTrigger:{
        trigger:target , 
        toggleActions:'restart none restart none',
        start:'top bottom',
        // markers:true , 
        ...scrollProps
    }
})

}