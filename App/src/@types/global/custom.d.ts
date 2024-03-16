declare module '*.jpg';
declare module '*.jpeg';
declare module '*.png';
declare module '*.gif';
declare module '*.jpg' {
    const value: any;
    export = value;
  }
  
declare module '@env' {
  export const GOOGLE_MAP_API_URL: string;
}
