// Move with Buttons
function movetoPanel(panel)
{
var Y=document.querySelector(panel);
var X=Y.querySelector('.anchor');  
movetonode(X);
X=Y.querySelector('.poster');
if( X )
rotatetolookat(X);
}

function movetonode(node)
{
  var X=document.querySelector('#rig');
  var nodeposition = new THREE.Vector3();
  nodeposition.setFromMatrixPosition(node.object3D.matrixWorld);
  if( Math.round(nodeposition.x)==0)
  {
    nodepos = Math.round(nodeposition.x) + " " + 0 + " " + nodeposition.z ;
  }
  else
  {
    nodepos = nodeposition.x + " " + 0 + " " + nodeposition.z ;
  }
  X.setAttribute('animation', {
    property: 'position',
    to: nodepos,
    easing: 'linear',
    dur: 1500
  });
}

      

var RotationAngle=10;

window.addEventListener("keydown", function(e){

if(e.code == 'KeyQ') 
{ // e.g. v key

let controls = document.querySelector('#thecamera').components['look-controls'];
controls.pitchObject.rotation.x = 0;
controls.yawObject.rotation.y += degrees_to_radians(RotationAngle);  
};
if(e.code == 'KeyE') 
{ // e.g. v key
let controls = document.querySelector('#thecamera').components['look-controls'];
controls.pitchObject.rotation.x = 0;
controls.yawObject.rotation.y -= degrees_to_radians(RotationAngle);  
};

if(e.code == 'Tab') 
{ // e.g. v key
  movetoPanel('#slideshow'); 
};
});