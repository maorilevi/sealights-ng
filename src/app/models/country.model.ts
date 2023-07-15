import {City} from "@models/city.model";

export interface Country {
  id: number;
  name: string;
  cities?: City[];
}
