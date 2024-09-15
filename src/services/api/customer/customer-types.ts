export type CustomerDto = {
  id?: string;
  username: string;
  email: string;
  phoneNumber: string;
  password?: string;
}

export type CondominiumDto = {
  block: string;
  houseNumber: number;
  observation: string;
}

export type ApartmentDto = {
  number: string;
  block: string;
  floor: number;
  observation: string;
}

export type AddressDtp = {
  id?: string;
  number: number;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  isCommercialAddress: boolean;
  condominium?: CondominiumDto;
  apartment?: ApartmentDto;
  isMain?: boolean;
}
