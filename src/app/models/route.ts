import { driver } from "./driver";
import { vehicle } from "./vehicle";

export interface route  {
    id : number  | null;
    description : string;
    drivers: driver;
    vehicles: vehicle;
    active : boolean;
}