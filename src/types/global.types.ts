export interface GlobalPayloadType {
  id?: string;
  name: string;
  value?: boolean;
  count?: number;
}

export interface GlobalGetType {
  data: any[] | any;
  status: 200;
}