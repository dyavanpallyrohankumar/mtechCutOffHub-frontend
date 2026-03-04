import { useState, useEffect, useRef } from "react";

interface CounterProps {
    target: number;
    suffix?: string;
}

export default function Counter({ target, suffix = "" }: CounterProps) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement | null>(null);

    useEffect(() => {
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    let start = 0;
                    const step = Math.ceil(target / 60);

                    const timer = setInterval(() => {
                        start += step;

                        if (start >= target) {
                            setCount(target);
                            clearInterval(timer);
                        } else {
                            setCount(start);
                        }
                    }, 20);

                    obs.disconnect();
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) obs.observe(ref.current);

        return () => obs.disconnect();
    }, [target]);

    return <span ref={ref}>{count}{suffix}</span>;
}