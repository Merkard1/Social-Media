import { Country } from "@/5_entities/Country";
import { Currency } from "@/5_entities/Currency";

export interface Profile {
    id?: string;
    name?: string;
    lastname?: string;
    age?: Number,
    currency?: Currency,
    country?: Country;
    city?: string,
    username?: string;
    avatar?: string;
}
