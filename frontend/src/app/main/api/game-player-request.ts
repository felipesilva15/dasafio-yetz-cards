export interface GamePlayerRequest {
    id?: number;
    game_id?: number;
    player_id?: number;
    team_id?: number;
    confirmed: boolean;
    created_at?: string | Date;
    updated_at?: string | Date;
}
