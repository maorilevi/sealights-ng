import {Address} from "@models/address.model";

export interface Person {
  id: string;
  name: string;
  birthdate: Date;
  addresses: Address[];
  addressCount?: number;
}
