var canvas = document.getElementById("renderCanvas");

var startRenderLoop = function (engine, canvas) {
    engine.runRenderLoop(function () {
        if (sceneToRender && sceneToRender.activeCamera) {
            sceneToRender.render();
        }
    });
}

var engine = null;
var scene = null;
var sceneToRender = null;
var createDefaultEngine = function() { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false}); };

var createScene = function () {
    var scene = new BABYLON.Scene(engine);
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -20), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    //camera.attachControl(canvas, true);
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.5;
    scene.enablePhysics (new BABYLON.Vector3(0,-10,0),new BABYLON.OimoJSPlugin());
    var ground = createArea(scene);
    //setLimits(scene);
    for (Nr = 0; Nr <  10; Nr++)
        createObstacle(Math.random()*22-12, Math.random()*22-12,scene);
    var sphere = createPlayer(scene);
    movePlayer(sphere);
    camera.lockedTarget = sphere;
    return scene;
};


window.initFunction = async function() {
    
    
var asyncEngineCreation = async function() {
    try {
    return createDefaultEngine();
    } catch(e) {
    console.log("the available createEngine function failed. Creating the default engine instead");
    return createDefaultEngine();
    }
}

window.engine = await asyncEngineCreation();
if (!engine) throw 'engine should not be null.';
startRenderLoop(engine, canvas);
window.scene = createScene();};
initFunction().then(() => {sceneToRender = scene                    
});

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});