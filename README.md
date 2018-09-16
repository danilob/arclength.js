# Arc Length JS
This code andresse the problems in estimates the arc length from Bezier curves using control points 2D.

### Features
- **Vec2** Object : Create points 2D
- ***ArcLength*** Object : Create a table with parameters u [0,1] and length [0,max-length]
- 
### Example of Use
Specify the curve control points at *function the exampleOfUse()*:
```
function exampleOfUse(){
    var p0 = new Vec2(0,0);
    var p1 = new Vec2(10,10);
    var p2 = new Vec2(0,10);
    var p3 = new Vec2(10,0);
    var curve = new CurveBezier(p0,p1,p2,p3);
    var arc = new ArcLength();
    arc.adaptive_integration(curve,0.0,1.0,0.0000001); //calculates the total arc length and save the table
    console.log("ArcLength:"+arc.length);
    var x = arc.length/2.0;
    var u = arc.getValueU(x); //returns the value of u given a length x;
    console.log("Parameter u="+u+", gives arc length = "+x);
    pu = arc.getVec4S(curve,x); //returns the point 2D given a length x;
    console.log("Parameter u="+u+", point: ("+pu.x+", "+pu.y+")");
}
```
