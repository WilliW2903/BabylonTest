var Killed =false;
var Start = false;
console.log("BUGGY4.js geladen");
function createPlayer(x,angle,z,size, txt, scene) {
    var spriteManager = new BABYLON.SpriteManager("manager", "../../../../Texturen/"+txt,2 , 256, scene);
    var player = new BABYLON.Sprite("player",spriteManager);
    player.position = new BABYLON.Vector3(x,0.1,z);
    player.angle = angle;
    player.size = size;
    return player;
}
function createArea (scene) {
    var GroundMaterial = new BABYLON.StandardMaterial("ground", scene);
    var GroundTexture = new BABYLON.Texture("../../../../Texturen/wiese.png", scene);
    GroundMaterial.diffuseTexture = GroundTexture;
    GroundMaterial.diffuseTexture.uScale = 2.0;
    GroundMaterial.diffuseTexture.vScale = 2.0;
    var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 20, height: 24, scene});
    ground.material = GroundMaterial;
    return ground;
}
function pickIntersect (point, pos, diff) {
    if((point.x > pos.x-diff) && (point.x < pos.x+diff) && (point.z > pos.z-diff) && (point.z < pos.z+diff))
        return true;
    return false; // else
}
function movePlayer (player,scene) {
    window.addEventListener("click", function(event){
        var pickResult = scene.pick(event.clientX, event.clientY);
        if (pickIntersect(pickResult.PickedPoint, player.position, 2)) {
            player.cellIndex = 1;
            Killed = true;
        }
        if (!Killed) {
            var x = Math.round(Math.random());
            if (x == 0) x = -1;
            var z = Math.round(Math.random());
            if (z == 0) z = -1;
        }
    });
}
function moveLoop (x, z, time, player) {
    var left = -9; var right = 9;
    var back = -11;  var front = 11;
    var timer = setInterval(function(){
        if  (!Start) {
            clearInterval(timer);
            return;
        }
        if (player.position.x < left || player.position.x > right) x = -x;
        if (player.position.z < back || player.position.z > front) z = -z;
        player.position.x += x;
        player.position.z += z;       
        player.angle = Math.atan2(z,x) + Math.PI/2; 
    }, time);
}