import z from "zod";
export const siteParser = z.httpUrl().transform((val: string) => (new URL(val)).origin);
export const sitesValidator = z.array(siteParser).transform(v => [... new Set(v)]);
export type Sites = z.infer<typeof sitesValidator>;
export type Site = z.infer<typeof siteParser>;

export const getQuickLinks: () => Promise<Sites> = async () => {
  const result = (await chrome.storage.local.get({ quickLinks: [] }));
  return (result.quickLinks as Sites);
}
export const setQuickLinks: (urls: Sites) => Promise<void> = async (urls) => {
  const sites = sitesValidator.parse(urls, { reportInput: true });
  await chrome.storage.local.set({ quickLinks: sites });
}

export const importQuickLinks: (urls: Sites) => Promise<void> = async (urls) => {
  const result = await chrome.storage.local.get({ quickLinks: [] })
  const sites = sitesValidator.parse(urls, { reportInput: true });
  const impots = [...new Set(sites.concat(result?.quickLinks as string[]))];
  await chrome.storage.local.set({ quickLinks: impots });
}

export const pinQuickLink: (url: Site) => Promise<void> = async (url) => {
  const site = siteParser.parse(url, { reportInput: true });
  const result = (await chrome.storage.local.get({ quickLinks: [] }));
  (result.quickLinks as Sites).push(site);
  const sites = sitesValidator.parse(result.quickLinks);
  await chrome.storage.local.set({ quickLinks: sites });
}

export const listenQuickLinksChanges = (setSites: (v: string[] | ((prev: string[]) => string[])) => void) => {
  const event = (changes: Record<string, chrome.storage.StorageChange>, area: string) => {
    if (area !== "local") return;
    if (changes.quickLinks) {
      const v = (changes.quickLinks.newValue as Sites) ?? [];
      setSites(v);
    }
  }
  chrome.storage.onChanged.addListener(event);
  return () => chrome.storage.onChanged.removeListener(event);
}