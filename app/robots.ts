import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// Instrucciones para buscadores: se publican en /robots.txt
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
