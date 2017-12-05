var input = 300000;
var smallestGrid = Math.ceil(Math.sqrt(input));
var starter = Math.ceil(smallestGrid/2);
function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}

var emptyGrid = createArray(smallestGrid, smallestGrid);

function spiral(n) {
    if (n === 0) return [0, 0, r];
    --n;
    
    var r = Math.floor((Math.sqrt(n+1) - 1) / 2) + 1;
		r= -r;
    var p = (8 * r * (r - 1)) / 2;
    var en = r * 2;
    var a = (1 + n - p) % (r * 8);
    var pos = [0, 0, r];
    switch (Math.floor(a / (r * 2))) {
        case 0:
            {
                pos[0] = a - r;
                pos[1] = -r;
            }
            break;
        case 1:
            {
                pos[0] = r;
                pos[1] = (a % en) - r;

            }
            break;
        case 2:
            {
                pos[0] = r - (a % en);
                pos[1] = r;
            }
            break;
        case 3:
            {
                pos[0] = -r;
                pos[1] = r - (a % en);
            }
            break;
    }
    return pos;
}

function getSurroundingTotal(x,y){
    var total = 0;
    if(emptyGrid[x+1][y]!== undefined){
        total= total+emptyGrid[x+1][y];
    }
    if(emptyGrid[x-1][y]!== undefined){
        total= total+emptyGrid[x-1][y];
    }
    if(emptyGrid[x][y-1]!== undefined){
        total= total+emptyGrid[x][y-1];
    }
    if(emptyGrid[x][y+1]!== undefined){
        total= total+emptyGrid[x][y+1];
    }
    if(emptyGrid[x+1][y+1]!== undefined){
        total= total+emptyGrid[x+1][y+1];
    }
    if(emptyGrid[x+1][y-1]!== undefined){
        total= total+emptyGrid[x+1][y-1];
    }
    if(emptyGrid[x-1][y+1]!== undefined){
        total= total+emptyGrid[x-1][y+1];
    }
    if(emptyGrid[x-1][y-1]!== undefined){
        total= total+emptyGrid[x-1][y-1];
    }
    return total;
}

var onex = 0;
var oney = 0;
var endx = 0;
var endy = 0;
for (var i = 1; i < input; i++) {
    var pos = spiral(i-1);
	var x = starter + pos[0];
    var y = starter + pos[1];
    if(x < 540 && y < 540){
        var surroundingTotal = getSurroundingTotal(x,y);
        if(i == 1){
            emptyGrid[x][y] = i;
            onex = x;
            oney = y;
            console.log(x+ "," +y);
        }else{
            emptyGrid[x][y] = surroundingTotal;
        }
        if(surroundingTotal > 277678){
            console.log(surroundingTotal);
            console.log(x+ "," +y);
            var endx = x;
            var endy = y;
            break;
        }
    }
}
var stepsUp = endy - oney;
var stepsLeft = endx - onex;
var totalSteps = stepsUp + stepsLeft;
console.log("steps up: " + stepsUp + " ||| steps left: "+ stepsLeft);
console.log("Total steps: "+ totalSteps);