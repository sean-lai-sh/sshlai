'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { useAnimationState } from './AnimContext';
import Stair from './Stair';
import Index from './cLoader';
import LoadUp from './LoadUp';

export default function Loader() {
  const {
    preLoadAnim,
    setPreLoadAnim,
    transitioning,
    setTransitioning,
    maskState,
    setMaskState,
  } = useAnimationState();
  const pathname = usePathname();
  const [panelCount, setPanelCount] = useState(5)
  const [showText, setShowText] = useState(true);
  // Cases to consider:
  // preLoadAnim is true show stair
  // preLoadAnim is false and transitioning is true show smth else
  /// Case preLoadAnim is the trickiest:
  /// if dependency is on transitioning -> implies that it would run a special anim
  /// indicates that pathname as a dependency might be better to work on to allow the shifts
  /// so transitioning to true triggers -> load Up
  /// changing to path name will trigger the showing animation :)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      setTransitioning(false);
      return;
    }
    const width = window.innerWidth;
    const calculatedPanelCount = width < 640 ? 1 : width < 1024 ? 2 : 5;
    setPanelCount(calculatedPanelCount);
    const textOutTime = 1.5; // seconds before text fades
    const totalTime = textOutTime + (panelCount * 0.1) + 0.3; // total animation time in seconds

    // Begin text fade-out
    const textTimer = setTimeout(() => setShowText(false), textOutTime * 1000);
    const loaderTimer = setTimeout(() => {
      setTransitioning(false)
      setPreLoadAnim(false)
      
    }, totalTime * 1000);

    return () => {
      window.scrollTo(0, 0); // Reset scroll position to top
    clearTimeout(textTimer);
    clearTimeout(loaderTimer);
    
    };
  }, [] )

  useEffect( () => {
    if(pathname === '/' && !preLoadAnim){
      setPreLoadAnim(false) // ensure never runs again
      // Start timer:
      const timer = setTimeout(() => {
        setMaskState(false); // show mask
        setTimeout(() => {
          setTransitioning(false); // show index page
        },700);
      }, 1000); // 1 second delay before showing the mask

      return () => {
        window.scrollTo(0, 0); // Reset scroll position to top
        clearTimeout(timer); // Cleanup the timer on unmount or when pathname changes
        
      }
    }else if(pathname == '/' && preLoadAnim){
      // update pathname 
      const width = window.innerWidth;
      const calculatedPanelCount = width < 640 ? 1 : width < 1024 ? 2 : 5;
      setPanelCount(calculatedPanelCount);
      const textOutTime = 1.5; // seconds before text fades
      const totalTime = textOutTime + (panelCount * 0.1) + 0.3; // total animation time in seconds
  
      // Begin text fade-out
      const textTimer = setTimeout(() => setShowText(false), textOutTime * 1000);
      const loaderTimer = setTimeout(() => {
        setTransitioning(false)
        setPreLoadAnim(false)
        
      }, totalTime * 1000);
  
      return () => {
        window.scrollTo(0, 0); // Reset scroll position to top
        clearTimeout(textTimer);
        clearTimeout(loaderTimer);
      
      };
    }else{
      setPreLoadAnim(false) // ensure never runs again
      // Start timer:
      const timer = setTimeout(() => {
        setMaskState(false); // show mask
        setTimeout(() => {
          setTransitioning(false); // show index page
        },700);
      }, 1000); // 1 second delay before showing the mask

      return () => {
        window.scrollTo(0, 0); // Reset scroll position to top
        clearTimeout(timer); // Cleanup the timer on unmount or when pathname changes
        
      }
    }
  },[pathname])

  // if(preLoadAnim){
  //   return <AnimatePresence mode="wait">
  //     {preLoadAnim && !maskState &&  <Stair
  //     showText={showText}
  //     panelCount={panelCount}
  //   />}
  //   </AnimatePresence>
  // }
  const renderAnim =  () => {
    let pname = pathname.split('/')[1]
    if(pname === '') pname = "home"
    return <>
      {preLoadAnim && !maskState &&  <Stair
      showText={showText}
      panelCount={panelCount}
    />}
     {!preLoadAnim && !maskState && <Index page={pname}/>}
     {!preLoadAnim && maskState && <LoadUp/>}
     
    </>
  }
  return (
    <AnimatePresence mode="wait">
      {transitioning && renderAnim()}
    </AnimatePresence>
  );
}
