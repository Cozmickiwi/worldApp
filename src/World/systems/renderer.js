import { WebGLRenderer } from '../../../node_modules/three/build/three.module.js';

function createRenderer(){
    const renderer = new WebGLRenderer({
        //antialias: true,
        powerPreference: 'high-performance',
        stencil: false,
    });
    renderer.useLegacyLights = true;
    renderer.autoClear = false;

    return renderer;
}
export{createRenderer};