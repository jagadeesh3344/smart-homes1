declare module 'localtunnel' {
  interface TunnelOptions {
    port?: number;
    subdomain?: string;
    host?: string;
    local_host?: string;
  }

  interface Tunnel {
    url: string;
    close(): void;
    on(event: string, fn: (...args: any[]) => void): this;
  }

  function localtunnel(port: number, opt?: TunnelOptions): Promise<Tunnel>;
  function localtunnel(opt: TunnelOptions): Promise<Tunnel>;

  export default localtunnel;
}
