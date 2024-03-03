import { CharacterTypes } from "../types/CharacterTypes";
import { Colors } from "../types/Colors";

export const CharacterColorMap: {[key in CharacterTypes]?: Colors} = {
    [CharacterTypes.Player]: Colors.Yellow,
    [CharacterTypes.Enemy]: Colors.Red,
    [CharacterTypes.NPC]: Colors.Green
 };