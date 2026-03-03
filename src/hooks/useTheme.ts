import { useState } from "react";

export function useTheme() {
    const [theme, setTheme] = useState<"dark" | "light">(() =>
        typeof window !== "undefined" &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light"
    );

    const toggle = () =>
        setTheme((t) => (t === "dark" ? "light" : "dark"));

    return { theme, toggle };
}