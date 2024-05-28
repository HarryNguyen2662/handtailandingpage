"use client";

import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const variants = {
  visible: { opacity: 1, transition: { duration: 1.5 } },
  hidden: { opacity: 0 },
};

// Apply reveal animation when a component is wrapped by this HOC
const withAnimation = (WrappedComponent) => {
  return function animatedBox() {
    const control = useAnimation();
    const [ref, inView] = useInView();

    useEffect(() => {
      if (inView) {
        control.start("visible");
      }
    }, [control, inView]);

    return (
      <motion.div
        className="box"
        ref={ref}
        variants={variants}
        initial="hidden"
        animate={control}
      >
        <WrappedComponent />
      </motion.div>
    );
  };
};

export default withAnimation;
