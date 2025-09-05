"use client";
import CountUp from "react-countup";
import { useEffect, useRef, useState } from "react";

interface CounterProps {
  end: number;
  decimals?: number;
  extraClass?: string;
}

const Counter = ({ end, decimals, extraClass }: CounterProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

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

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
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
