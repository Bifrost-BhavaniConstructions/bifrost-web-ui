import React, { useEffect, useState } from "react";
import createScrollSnap from "scroll-snap";

interface Settings {
  /**
   * snap-destination for x and y axes
   * should be a valid css value expressed as px|%|vw|vh
   */
  snapDestinationX?: string | number;
  snapDestinationY?: string | number;
  /**
   * time in ms after which scrolling is considered finished
   */
  timeout?: number;
  /**
   * duration in ms for the smooth snap
   */
  duration?: number;
  /**
   * threshold to reach before scrolling to next/prev element, expressed as a percentage in the range [0, 1]
   */
  threshold?: number;
  /**
   * when true, the scroll container is not allowed to "pass over" the other snap positions
   */
  snapStop?: boolean;
  /**
   * custom easing function
   * @param t normalized time typically in the range [0, 1]
   */
  easing?: (t: number) => number;
}

const useScrollSnap = (
  ref: React.RefObject<any>,
  settings: Settings,
  callback: ((ref: React.RefObject<any>) => void) | undefined,
) => {
  const [scrollBind, setBind] = useState(() => () => {});
  const [scrollUnbind, setUnbind] = useState(() => () => {});

  useEffect(() => {
    const element = ref.current;

    if (element) {
      const { bind, unbind } = createScrollSnap(element, settings, () => {
        if (callback) {
          callback(ref);
        }
      });
      setBind(() => bind);
      setUnbind(() => unbind);
    }
  }, []);

  return [scrollBind, scrollUnbind];
};

export default useScrollSnap;
