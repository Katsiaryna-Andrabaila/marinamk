export type AddSlotFormType = {
    date: Date;
    time: string[];
    newTime: string;
};

export type SlotType = {
    id: string;
    date: Date;
    time: string;
    clientName: string;
    clientEmail: string;
    procedure: string;
    isAvailable: boolean;
    createdAt: Date;
    updatedAt: Date;
};
