import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://mytax33.com";
  const guides = [
    "withholding-33",
    "expense-rate",
    "freelancer-tax-20m",
    "freelancer-tax-30m",
    "filing-steps",
    "tax-saving-tips",
  ];
  return [
    { url: base, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/guide`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    ...guides.map((slug) => ({
      url: `${base}/guide/${slug}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    { url: `${base}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];
}
