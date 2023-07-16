import {Address} from "@models/address.model";

export interface Person {
  id: string;
  name: string;
  birthdate: string | null;
  addresses: Address[];
  addressCount?: number;
}
