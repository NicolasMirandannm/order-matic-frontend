export type RulesType = {
  required: (value: string) => boolean | string;
  email: (value: string) => boolean | string;
  phone: (value: string) => boolean | string;
  password: (value: string) => boolean | string;
}
