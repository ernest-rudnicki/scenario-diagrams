import { dia} from "jointjs";
import { BaseElement } from "./BaseElement";

export class Canvas {
    private readonly graph = new dia.Graph();
    private paper = new dia.Paper({
        el: jQuery("#paper"),
        width: 600,
        height: 200,
        model: this.graph,
        gridSize: 1
      });

      constructor(paperElement: HTMLElement) {
        this.graph = new dia.Graph();
        this.paper = new dia.Paper({
            el: paperElement,
            width: 600,
            height: 200,
            model: this.graph,
            gridSize: 1
          });
      }


      addElements(element: BaseElement[]): void {
        this.graph.addCells(element.map((el) => el.shape))
      }

}