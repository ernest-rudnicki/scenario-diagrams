import { Colors } from "../types/Colors";
import { ElementTypes } from "../types/ElementTypes";

export const ElementColorMap: {[key in ElementTypes]?: Colors} = {
    [ElementTypes.Player]: Colors.Yellow,
    [ElementTypes.Enemy]: Colors.Red,
    [ElementTypes.NPC]: Colors.Green
 };