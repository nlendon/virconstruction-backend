export interface ReviewPayloadType {
  profession: string;
  review: string;
  full_name: string;
}

export interface ReviewGetType {
  data: any[] | any;
  status: number;
}

export interface ReviewModelType {
  id: string;
  profession: string;
  review: string;
  full_name: string;
  save: any;
  destroy: any;
  update: any;
}