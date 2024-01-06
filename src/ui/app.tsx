import { render } from "solid-js/web";
import jQuery from 'jquery';
import { dia, shapes } from 'jointjs';

import './index.css';
import { onMount } from "solid-js";

const CountingComponent = () => {

    onMount(() => {
        const graph = new dia.Graph;

        const paper = new dia.Paper({
          el: jQuery("#paper"),
          width: 600,
          height: 200,
          model: graph,
          gridSize: 1
        });
    
        const rect = new shapes.basic.Rect({
          position: { x: 100, y: 30 },
          size: { width: 100, height: 30 },
          attrs: { rect: { fill: 'blue' }, text: { text: 'my box', fill: 'white' } }
        });
    
        const rect2 = rect.clone() as joint.shapes.basic.Rect;
        rect2.translate(300);
    
        const link = new dia.Link({
          source: { id: rect.id },
          target: { id: rect2.id }
        });
    
        graph.addCells([rect, rect2, link]);
    });

    return <div id="paper">Count value is</div>;
};

render(() => <CountingComponent />, document.getElementById("app"));