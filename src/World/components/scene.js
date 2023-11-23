import { Color, Scene, Fog } from '../../../node_modules/three/build/three.module.js';

function createScene(ortho){
    const scene = new Scene();
    scene.background = new Color('skyblue');
    const sceneOrtho = new Scene();
    //sceneOrtho.background = new Color('blue');
    //scene.fog = new Fog( 0xcccccc, 600, 750 );
    if(ortho == false){
        return scene;
    }
    else{
        return sceneOrtho;
    }
}
export{createScene};