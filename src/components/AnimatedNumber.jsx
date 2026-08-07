import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

export default function AnimatedNumber({ value, duration = 1.2 }) {
  const match = value.match(/^(\d+)(.*)$/);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(match ? "0" : value);

  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration, bounce: 0 });

  useEffect(() => {
    if (match && inView) motionValue.set(Number(match[1]));
  }, [inView]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!match) return;
    const unsub = spring.on("change", (v) => setDisplay(String(Math.round(v))));
    return unsub;
  }, [spring, match]);

  return (
    <span ref={ref}>
      {match ? `${display}${match[2]}` : value}
    </span>
  );
}
