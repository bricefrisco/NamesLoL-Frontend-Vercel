import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./HorizontalAdMobile.module.css";

const HorizontalAdMobile = ({ id, style }) => {
  const [ad, setAd] = useState();
  const router = useRouter();

  useEffect(() => {
    const createAd = async () => {
      const ad = await Promise.resolve(
        window.nitroAds.createAd(id, {
          demo: process.env.NEXT_PUBLIC_ENVIRONMENT !== "production",
          format: "display",
          sizes: [[320, 50]],
          mediaQuery: "(max-width: 777px)",
          refreshVisibleOnly: true,
          renderVisibleOnly: true,
          refreshLimit: 10,
          refreshTime: 60,
          report: {
            enabled: true,
          },
        })
      );

      setAd(ad);
    };

    createAd();
  }, [id]);

  useEffect(() => {
    const handleRouteChangeComplete = () => {
      if (ad?.onNavigate) {
        ad.onNavigate();
      }
    };

    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [ad, router]);

  return <div id={id} style={style} className={styles.horizontalAdMobile} />;
};

export default HorizontalAdMobile;
