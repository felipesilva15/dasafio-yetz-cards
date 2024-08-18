export interface Player {
    id?: number;
    name: string;
    level: number;
    goalkeeper: boolean;
    created_at?: string | Date;
    updated_at?: string | Date;
}
