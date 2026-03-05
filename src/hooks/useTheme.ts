import { useState, useEffect } from "react";

export function useTheme() {
    const [theme, setTheme] = useState<"dark" | "light">(() => {
        if (typeof window === "undefined") return "light";

        // 1. Check saved theme
        const saved = localStorage.getItem("theme") as "dark" | "light" | null;
        if (saved) return saved;

        // 2. Check system preference
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            return "dark";
        }

        // 3. Default
        return "light";
    });

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        document.documentElement.classList.toggle("dark", theme === "dark");
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggle = () => {
        setTheme((t) => (t === "light" ? "dark" : "light"));
    };

    return { theme, toggle };
}