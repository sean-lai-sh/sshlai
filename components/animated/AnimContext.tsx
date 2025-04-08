'use client';
import { createContext, useContext, useState, Dispatch, SetStateAction } from 'react';

type AnimationStateContextType = {
  preLoadAnim: boolean;
  setPreLoadAnim: Dispatch<SetStateAction<boolean>>;
  transitioning: boolean;
  setTransitioning: Dispatch<SetStateAction<boolean>>;
  maskState: boolean;
  setMaskState: Dispatch<SetStateAction<boolean>>;
};

// Provide a default fallback value just to satisfy TS, but this should never be used directly
const AnimationStateContext = createContext<AnimationStateContextType>({
  preLoadAnim: true,
  setPreLoadAnim: () => {}, // fallback no-op function
  transitioning: true,
  setTransitioning: () => {}, // fallback no-op function
  maskState: false,
  setMaskState: () => {}, // fallback no-op function
});

export const AnimationProvider = ({ children }: { children: React.ReactNode }) => {
  const [preLoadAnim, setPreLoadAnim] = useState(true);
  const [transitioning, setTransitioning] = useState(true);
  const [maskState, setMaskState] = useState(false)
  return (
    <AnimationStateContext.Provider 
      value={{ 
        preLoadAnim, 
        setPreLoadAnim, 
        transitioning, 
        setTransitioning,
        maskState,
        setMaskState,
      }}
    >
      {children}
    </AnimationStateContext.Provider>
  );
};

export const useAnimationState = () => useContext(AnimationStateContext);