import IHeaders from './IHeaders';

export default interface IOptions {
  host: string;
  port: number;
  path: string;
  method: string;
  headers: IHeaders;
}
