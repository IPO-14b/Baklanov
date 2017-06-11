var Xlength = 50, Ylength = 50;
var delay = 1;
var age;
var C_layer, N_layer;
var scr_0 = '#050505';
var scr_1 = '#41a91d';
var active = 0;
var cash;
function LoadLife(first) {
    InitSpace(Xlength, Ylength);
    if (first) DumpOptions();
    TableBuild();
    InitCash();
    age = 0;
    PrintAge();
   
}

function TableBuild() {
    var tab = "<table id='spacetable'>";    for (var y = 1; y <= Ylength; y++) {
        tab += "<tr>";        for (var x = 1; x <= Xlength; x++) {
            var i = (y - 1) * Xlength + x - 1;            tab += "<td id=" + i + " onclick='CellTrigger(" + x + "," + y + ");'>&nbsp;</td>";
        }        tab += "</tr>";
    }    tab += "</table>";    document.getElementById('tabs').innerHTML = tab;
   
}

function InitCash() {
    cash = new Array(Xlength * Ylength);
    for (var y = 1; y <= Ylength; y++) {
        for (var x = 1; x <= Xlength; x++) {
            var i = (y - 1) * Xlength + x - 1;
            cash[i] = document.getElementById(i);
            cash[i].unselectable = true;
        }
    }
}

function CellTrigger(x, y) {
    var i = (y - 1) * Xlength + x - 1;
    cash[i].style.backgroundColor = C_layer[y][x] ? scr_0 : scr_1;
    C_layer[y][x] = C_layer[y][x] ? 0 : 1;

}

function InitSpace(x, y) {
    C_layer = new Array(y + 2);
    N_layer = new Array(y + 2);
    for (var i = 0; i < y + 2; i++) {
        C_layer[i] = new Array(x + 2);
        N_layer[i] = new Array(x + 2);
        
    }
    for (var i = 0; i < y + 2; i++) {
        for (var j = 0; j < x + 2; j++) {
            C_layer[i][j] = N_layer[i][j] = 0;
        }

    }

   
}

function SwapLayers() {
    var tmp = C_layer;
    C_layer = N_layer;
    N_layer = tmp;
}

function CalcNextStep() {
   
}

function PlayLife(check) {
   
}

function StopLife() {
 
}

function SetOptions() {
   
}

function PrintAge() {
    document.getElementById("Age").innerHTML = "Поколений : " + age;
}

function DumpOptions() {
    document.getElementById("LDelay").value = delay;
    document.getElementById("LWidth").value = Xlength;
    document.getElementById("LHeight").value = Ylength;
    
}