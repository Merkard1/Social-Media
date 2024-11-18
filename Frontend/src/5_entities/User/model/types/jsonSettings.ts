import { Theme } from "@/6_shared/const/theme";

export interface JsonSettings {
    theme?: Theme;
    isFirstVisit?: boolean;
    isArticlesPageWasOpened?: boolean;
    settingsPageHasBeenOpen?: boolean;
}
