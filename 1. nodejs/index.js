//object
var rect = {
    perimeter: (x, y) => (2*(x+y)), //property
    area: (x, y) => (x*y)
};

function solveRect(l,b) 
{
    console.log("Solving for rectangle with l = " + l + " and b = " + b);
    if (l <= 0 || b <= 0) {
        console.log("Rectangle dimensions should be greater than zero: l = "+ l + ", and b = " + b);
    }
    else {
        console.log("The area of the rectangle is " + rect.area(l,b));
        console.log("The perimeter of the rectangle is " +rect.perimeter(l,b));
    }
}
solveRect(2,4);
solveRect(3,5);
solveRect(0,5);
solveRect(-3,5);

//To run file
// 1. npm init
// 2. open package.json 
// 3. add "start":"node index"
// 4. npm start