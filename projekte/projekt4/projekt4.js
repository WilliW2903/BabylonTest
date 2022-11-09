function createPlayer (scene) {
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere1", {diameter: 2, segments: 32}, scene);
    var SphereMaterial = new BABYLON.StandardMaterial("sphere", scene);
    var SphereTexture = new BABYLON.Texture("../../Texturen/holz.jpg", scene);
    SphereMaterial.diffuseTexture = SphereTexture;
    sphere.position.y = 10;
    sphere.physicsImpostor = new BABYLON.PhysicsImpostor(sphere, BABYLON.PhysicsImpostor.SphereImpostor, {mass:1,restitution:0,friction:5}, scene);
    sphere.material = SphereMaterial;
    return sphere;
}
function createArea (scene) {
    var GroundMaterial = new BABYLON.StandardMaterial("ground", scene);
    var GroundTexture = new BABYLON.Texture("../../Texturen/stein.jpg", scene);
    GroundMaterial.diffuseTexture = GroundTexture;
    GroundMaterial.diffuseTexture.uScale = 6.0;
    GroundMaterial.diffuseTexture.vScale = 6.0;
    var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 24, height: 24, scene});
    ground.material = GroundMaterial;
    ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.GroundImpostor, {mass:0}, scene);
    return ground
}
function createObstacle (x,z,scene){
    var obsctacle = BABYLON.Mesh.CreateSphere("sphere2",20 , 2 , scene);
    obsctacle.position = new BABYLON.Vector3(x,1,z)
    obsctacle.physicsImpostor = new BABYLON.PhysicsImpostor(obsctacle, BABYLON.PhysicsImpostor.SphereImpostor, {mass:1}, scene);
    return obsctacle;
}
function movePlayer (sphere) {
    window.addEventListener("keydown", function(event){
        var diff = 0.2
        var key = event.keyCode;
        var impulse = BABYLON.Vector3.Zero();
        if (key == 37) impulse.x = -diff;           
        if (key == 38) impulse.z = diff; 
        if (key == 39) impulse.x = diff; 
        if (key == 40) impulse.z = -diff;
        if (key == 13) {
            sphere.position.z = 0;
            sphere.position.x = 0;
            sphere.position.y = 1;
        }
        sphere.applyImpulse
        (impulse, sphere.getAbsolutePosition());
    });
}
function setLimits (scene) {
    var northWall = BABYLON.Mesh.CreatePlane("plane1", 20, scene);
    northWall.position.z = 12;
    northWall.physicsImpostor = new BABYLON.PhysicsImpostor (northWall, BABYLON.PhysicsImpostor.PlaneImpostor,{mass:0}, scene);
    northWall.scaling.y = 0.5
    northWall.isVisible = false;
    var southWall = BABYLON.Mesh.CreatePlane("plane1", 20, scene);
    southWall.position.z = -12;
    southWall.physicsImpostor = new BABYLON.PhysicsImpostor (southWall, BABYLON.PhysicsImpostor.PlaneImpostor,{mass:0}, scene);
    southWall.scaling.y = 0.5
    southWall.isVisible = false;
    var eastWall = BABYLON.Mesh.CreatePlane("plane1", 20, scene);
    eastWall.rotation.y = Math.PI/2;
    eastWall.position.x = 12;
    eastWall.physicsImpostor = new BABYLON.PhysicsImpostor (eastWall, BABYLON.PhysicsImpostor.PlaneImpostor,{mass:0}, scene);
    eastWall.scaling.y = 0.5
    eastWall.isVisible = false;
    var westWall = BABYLON.Mesh.CreatePlane("plane1", 20, scene);
    westWall.rotation.y = Math.PI/2;
    westWall.position.x = -12;
    westWall.physicsImpostor = new BABYLON.PhysicsImpostor (westWall, BABYLON.PhysicsImpostor.PlaneImpostor,{mass:0}, scene);
    westWall.scaling.y = 0.5
    westWall.isVisible = false;
}
