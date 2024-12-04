declare module "*.vert" {
  const content: string;

  export default content;
}

declare module "*.frag" {
  const content: string;

  export default content;
}

declare module '*.worker' {
  const workerConstructor: {
    new (options?: { name?: string }): Worker
  }
  export default workerConstructor
}

declare module "*.mp4" {
  const src: string;
  export default src;
}
