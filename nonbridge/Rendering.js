var display;
var mouseX = 0;
var mouseY = 0;
var canDraw = false;
var chars = [];
var foreground = [];
var background = [];



window.onload = function () {
    // Check if rot.js can work on this browser
    if (!ROT.isSupported()) {
        alert("The rot.js library isn't supported by your browser.");
    } else {
        var tileSet = document.createElement("img");
        tileSet.src = "nonbridge/Yayo_c64.png";
        tileSet.onload = function () {
            canDraw = true;
        }
        map = [];
        for (var i = 0; i < 16; i++) {
            for (var j = 0; j < 16; j++) {
                var char = j * 16 + i;
                char = String.fromCharCode(char)
                map[char] = [i * 17, j * 17];
                //alert(i+"-"+j+" "+char);
            }
        }
        //alert(map)
        var w = 35;
        var h = 46;
        var tileWidth = 16
        var tileHeight = 17;
        display = new ROT.Display({
            width: w, height: h, bg: "#1f2026", fontSize: 6,
            //fontFamily: "Roboto"
            //forceSquareRatio: true,
            layout: "tile",
            bg: "transparent",
            tileWidth: tileWidth, tileHeight: tileHeight, tileSet: tileSet, tileMap: map,
            tileColorize:true

        });
        var necessaryWidth = w * tileWidth;
        var necessaryHeight = h * tileHeight;
        var scaleX = screen.availWidth / necessaryWidth;
        var scaleY = screen.availHeight / necessaryHeight;
        var minScale = scaleX;
        if (minScale > scaleY) minScale = scaleY;
        minScale *= 0.7;
        var fontsize = display.computeFontSize(screen.availWidth * 0.7, screen.availHeight * 0.7);
        
        display.setOptions({ fontSize: fontsize });
        var container = display.getContainer();
        //container.setAttribute("align", "center");
        var cc = document.getElementById("canvas-container");
        //cc = document.createElement("div");
        console.log(cc);
        cc.appendChild(container);

        container.style.transform = "scale(" + minScale + ")";

        cc.onmousemove = function (event)
        {
            pos = display.eventToPosition(event);
            mouseX = pos[0];
            mouseY = pos[1];
        };
        // Add the container to our HTML page
        //document.body.appendChild(container);
        var foreground, background, colors;
        //for (var i = 0; i < 15; i++) {
        //    // Calculate the foreground color, getting progressively darker
        //    // and the background color, getting progressively lighter.
        //    foreground = ROT.Color.toRGB([255 - (i * 20),
        //    255 - (i * 20),
        //    255 - (i * 20)]);
        //    background = ROT.Color.toRGB([i * 20, i * 20, i * 20]);
        //    // Create the color format specifier.
        //    colors = "%c{" + foreground + "}%b{" + background + "}";
        //    // Draw the text two columns in and at the row specified
        //    // by i
        //    display.drawText(2, i, colors + "Hello, world!");
        //}
    }
}

function clear()
{
    if (display)
    {
        display.clear();
    }
}

function getMouseX()
{
    return mouseX;

}

function getMouseY() {
    return mouseY;
}

function isReadyToDraw() {
    return canDraw;
}

function draw(x, y, colorT, colorB, text)
{
    //alert(text);
    //alert(x + y + colorT + colorB + text);
    //console.log(colorT);
    
    if (display && canDraw) {
        display.draw(x, y, text, colorT, colorB);
    }
        
    
}