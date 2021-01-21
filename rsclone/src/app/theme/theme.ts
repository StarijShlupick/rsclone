export interface ITheme {
  name: string;
  properties: object;
}

export enum EThemeModes {
  Light = 'light',
  Dark = 'dark'
}

export const light: ITheme = {
  name: 'light',
  properties: {
    '--primary-accent-color': '#94c83d',
    '--secondary-accent-color': '#5e9641',
    '--primary-background-color': '#e0e0e0',
    '--secondary-background-color': '#EEEEEE',
    '--body-background-color': '#ffffff',
    '--text-color': '#000000',
  }
};

export const dark: ITheme = {
  name: 'dark',
  properties: {
    '--primary-accent-color': '#b6f7c1',
    '--secondary-accent-color': '#7e97a6',
    '--primary-background-color': '#63686e',
    '--secondary-background-color': '#a4c2c2',
    '--body-background-color': '#373640',
    '--text-color': '#ffffff',
  }
};
