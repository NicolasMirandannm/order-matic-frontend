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

export type AddressDto = {
  id?: string;
  number: number;
  cep: string;
  street: string;
  neighborhood: string;
  reference: string;
  city: string;
  state: string;
  isCommercialAddress: boolean;
  condominium?: CondominiumDto;
  apartment?: ApartmentDto;
  isMain?: boolean;
}
