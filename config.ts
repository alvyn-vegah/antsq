import { LocalePrefix, Pathnames } from "next-intl/routing";

export const locales = ["en","es","fr"] as const;
export type Locale = typeof locales[number]; 
type localStringType = typeof locales;
export const pathnames:Pathnames<localStringType> = {
    "/":"/",
    "/pathnames":"/pathnames"
}
export const localePrefix: LocalePrefix<localStringType> = "always";