export interface Theme {
  name: string;
  properties: object;
}

export const light: Theme = {
  name: "light",
  properties: {
    "--first-accent-color": "#94c83d",
    "--second-accent-color": "#5e9641",
    "--first-background-color": "#e0e0e0",
    "--second-background-color": "#EEEEEE",
    "--global-background-color": "#ffffff",
    "--text-color": "#000000",
  }
};

export const dark: Theme = {
  name: "dark",
  properties: {
    "--first-accent-color": "#b6f7c1",
    "--second-accent-color": "#7e97a6",
    "--first-background-color": "#63686e",
    "--second-background-color": "#a4c2c2",
    "--global-background-color": "#373640",
    "--text-color": "#ffffff",
  }
};