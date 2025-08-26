import { MetadataRoute } from "next";

export default function robot():MetadataRoute.Robots {
    return {
        rules: {
            userAgent:'*',
            allow:'/',
            disallow:['/admin'],
        },
        sitemap:"https://www.antsq.com/sitemap.xml"
    }
}