declare module "*.scss" {
  const cssstyle: {
    [string]: string;
  };
  export default cssstyle;
}

declare module "*.worker" {
  class woker extends Worker {
    constructor() {}
  }
  export default woker;
}

declare module "*.scss";
declare module "*.jpg";
declare module "*.png";
declare module "*.webp";
declare module "*.jpeg";
