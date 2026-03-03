import { useEffect } from "react";

interface GoogleAdProps {
    slot: string;
    className?: string;
}

const GoogleAd = ({ slot, className }: GoogleAdProps) => {
    useEffect(() => {
        try {
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch { }
    }, []);

    return (
        <div className={className}>
            <ins
                className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client="ca-pub-XXXXXXXXXXXX"
                data-ad-slot={slot}
                data-ad-format="auto"
                data-full-width-responsive="true"
            />
        </div>
    );
};

export default GoogleAd;