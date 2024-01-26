export type TypeAppContext = {
    lang: string | null;
    setLang?: (value: React.SetStateAction<string | null>) => void;
};
