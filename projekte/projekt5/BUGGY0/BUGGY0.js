function createPlayer (scene) {
    var spriteManager = new BABYLON.SpriteManager("manager", "../../../Texturen/holz_rund.png", 1, 256, scene);
    var player = new BABYLON.Sprite("player",spriteManager);
    player.size = 2.0;
    player.position = new BABYLON.Vector3(0,1,0);
    return player;
}
function createArea (scene) {
    var GroundMaterial = new BABYLON.StandardMaterial("ground", scene);
    var GroundTexture = new BABYLON.Texture("../../../Texturen/stein.jpg", scene);
    GroundMaterial.diffuseTexture = GroundTexture;
    GroundMaterial.diffuseTexture.uScale = 24.0;
    GroundMaterial.diffuseTexture.vScale = 24.0;
    var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 24, height: 24, scene});
    ground.material = GroundMaterial;
    ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.GroundImpostor, {mass:0}, scene);
    return ground;
}
function createObstacle (x,z,scene){
    var obsctacle = BABYLON.Mesh.CreateSphere("sphere2",20 , 2 , scene);
    obsctacle.position = new BABYLON.Vector3(x,1,z)
    obsctacle.physicsImpostor = new BABYLON.PhysicsImpostor(obsctacle, BABYLON.PhysicsImpostor.SphereImpostor, {mass:1}, scene);
    var ObsctacleMaterial = new BABYLON.StandardMaterial("obstacle", scene);
    var ObsctacleTexture = new BABYLON.Texture("../../../Texturen/Mauer.png", scene);
    ObsctacleMaterial.diffuseTexture = ObsctacleTexture;
    obsctacle.material = ObsctacleMaterial;
    return obsctacle;
}
function movePlayer (player) {
    window.addEventListener("keydown", function(event){
        var left = -11; var right = 11;
        var back = -11; var front = 11;
        var down = -6;  var up = 6;
        var diff = 0.2;
        var key = event.keyCode;
        if (key == 37) 
            if (player.position.x > left)
                player.position.x-=diff; 
        if (key == 38) 
            if (player.position.z < front)
                player.position.z += diff; 
        if (key == 39) 
            if (player.position.x < right)
                player.position.x += diff; 
        if (key == 40)
            if (player.position.z > back) 
                player.position.z -=diff; 
        if (key == 50)
            if (player.position.y < up) 
                player.position.y+= diff;
        if (key == 49) 
            if (player.position.y > down)
                player.position.y-= diff;
        if (key == 13) {
            player.position.x = 1;
            player.position.z = 1;
            player.position.y = 1;
        }
    });
}