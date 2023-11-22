import{OrbitControls} from '../../../node_modules/three/examples/jsm/controls/OrbitControls.js';

function createControls(camera, canvas){
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor= 0.075;
    //controls.listenToKeyEvents(window);
    return controls;
}

export{createControls};