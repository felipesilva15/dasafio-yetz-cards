export interface Game {
    id?: number;
    date: string | Date;
    players_per_team: number;
    goalkeeper: boolean;
    created_at?: string | Date;
    updated_at?: string | Date;
}
