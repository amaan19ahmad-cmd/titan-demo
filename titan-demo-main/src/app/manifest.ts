import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Titan AI Growth Command Center",
    short_name: "Titan",
    description: "Evidence-first AI commerce operations.",
    start_url: "/",
    display: "standalone",
    background_color: "#06151c",
    theme_color: "#79d9f5",
  };
}
