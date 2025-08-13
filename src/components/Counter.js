"use client";
import CountUp from "react-countup";
import { useEffect, useRef, useState } from "react";

const Counter = ({ end, decimals, extraClass }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setIsVisible(true);
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [hasStarted]);

  return (
    <span
      ref={ref}
      className={`counter ${extraClass}`}
      data-from='0'
      data-to={end}>
      {isVisible ? (
        <CountUp
          end={end ? end : 100}
          duration={3}
          decimals={decimals ? decimals : 0}
        />
      ) : (
        0
      )}
    </span>
  );
};

export default Counter;
