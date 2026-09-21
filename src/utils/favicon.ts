const ICON_SIZE = 64

const getFavIcon: (origin: string, size?: number) => string = (origin, size = ICON_SIZE) => `https://www.google.com/s2/favicons?domain=${origin}&sz=${size}`;

export default getFavIcon;