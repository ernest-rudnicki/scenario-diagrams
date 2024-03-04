import { AttributeTypes } from "../types/AttributeTypes";
import { Colors } from "../types/Colors";

export const AttributeColorMap: {[key in AttributeTypes]?: Colors} = {
    [AttributeTypes.Normal]: Colors.LightViolet,
    [AttributeTypes.Global]: Colors.MediumGreen,
 };