import Head from 'next/head'
import { FC } from 'react'

interface SeoProps {
  title: string;
  subtitle: string;
  description?: string;
  keywords?: string[]; // Add keywords as string array
}

export const Seo:FC<SeoProps> =  ({ title, subtitle, description, keywords }: SeoProps) => {
  return (
    <Head>
      <title>{title} | {subtitle}</title>
      {description && <meta name="description" content={description} />}
      {keywords && keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(", ")} />
      )}
    </Head>
  )
}
