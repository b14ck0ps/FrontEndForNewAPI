export type NewsItem = {
    Id?: number;
    Title?: string;
    Description?: string;
    Date?: string;
    Cid?: number;
    Category?: {
        Id?: number;
        Name?: string;
    };
};
export type Category = {
    Id?: number;
    Name?: string;
};