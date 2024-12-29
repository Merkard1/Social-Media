import { Country } from "@/5_entities/Country";
import { Currency } from "@/5_entities/Currency";

import { Image } from "@/6_shared/ui/ImageUploader";

export interface Profile {
    id?: string;
    first?: string;
    lastname?: string;
    age?: Number,
    currency?: Currency,
    country?: Country;
    city?: string,
    avatar?: Image;
}
