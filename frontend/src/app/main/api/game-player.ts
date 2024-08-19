import { Player } from "./player";
import { Team } from "./team";

export interface GamePlayer {
    game_id: number;
    player: Player;
    team?: Team;
    confirmed: boolean;
}
