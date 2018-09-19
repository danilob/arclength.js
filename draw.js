var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var textarea = document.getElementById("code");
var reset = document.getElementById("reset");
var edit = document.getElementById("edit");
var code = textarea.value;

var scale = 1;

var points_curveB = []
var np = 20;

function drawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    eval(textarea.value);
}

function drawCircle(c, canv, color) { //desenha um círculo
    canv.beginPath();
    canv.strokeStyle = '#000000';
    canv.arc(c[0], c[1], 5, 0, 2 * Math.PI, false);
    canv.lineWidth = 2;
    canv.fillStyle = color;
    canv.fill();
    canv.setLineDash([]);
    canv.strokeStyle = color;
    canv.stroke();
    canv.fillStyle = '#000000';
}

function setBezierArcLength(p0,p1,p2,p3){
    M = transformCanvas(canvas.width, canvas.height);
    ctx.font = "14px Arial";
    pos0 = multVec(mult(M, translate(p0[0], p0[1])), [0, 0, 1]);
    pos1 = multVec(mult(M, translate(p1[0], p1[1])), [0, 0, 1]);
    pos2 = multVec(mult(M, translate(p2[0], p2[1])), [0, 0, 1]);
    pos3 = multVec(mult(M, translate(p3[0], p3[1])), [0, 0, 1]);

    //draw the control points
    ctx.fillStyle = "#494949";
    ctx.fillText("p0", pos0[0] + 7, pos0[1] - 7);
    ctx.fillText("p3", pos3[0] + 7, pos3[1] - 7);
    drawCircle(pos0, ctx, "#fb9a40");
    drawCircle(pos3, ctx, "#fb9a40");
    ctx.fillStyle = "#494949";
    ctx.fillText("p1", pos1[0] + 7, pos1[1] - 7);
    ctx.fillText("p2", pos2[0] + 7, pos2[1] - 7);
    drawCircle(pos1, ctx, "#fb9a40");
    drawCircle(pos2, ctx, "#fb9a40");

    p0 = new Vec2(p0[0],p0[1]);
    p1 = new Vec2(p1[0],p1[1]);
    p2 = new Vec2(p2[0],p2[1]);
    p3 = new Vec2(p3[0],p3[1]);
    curve = new CurveBezier(p0,p1,p2,p3);
    arc = new ArcLength();
    arc.adaptive_integration(curve,0.0,1.0,0.0000001);
    ctx.fillText("S = "+arc.length.toFixed(4), pos3[0] + 15, pos3[1] - 25);

}


function setSizePoints(v) {
    np = v;
}


textarea.addEventListener("input", drawCanvas);
window.addEventListener("load", drawCanvas);