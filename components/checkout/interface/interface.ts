import { AddressInterface } from "../../../context/interfaces/interfaces";

export interface AddressesResponse {
  status: string;
  addresses: AddressInterface[];
}

export interface SelectedAddressInterface {
  input: string;
  checked: boolean;
}

export interface AddressFormInterface {
  title: string;
  city: string;
  state: string;
  address: string;
  zip_code: string;
  full_name: string;
  mobile: string;
  email?: string;
  province_id?: number;
  city_id?: number;
}
