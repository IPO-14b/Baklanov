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
    var tab = "<table id='spacetable'>";
    for (var y = 1; y <= Ylength; y++) {
        tab += "<tr>";
        for (var x = 1; x <= Xlength; x++) {
            var i = (y - 1) * Xlength + x - 1;
            tab += "<td id=" + i + " onclick='CellTrigger(" + x + "," + y + ");'>&nbsp;</td>";
        }
        tab += "</tr>";
    }
    tab += "</table>";
    document.getElementById('tabs').innerHTML = tab;
   
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
    var i, N;
    for (var y = Ylength; y--;) {
        for (var x = Xlength; x--;) {
            N = C_layer[y][x] + C_layer[y][x + 1] + C_layer[y][x + 2] + C_layer[y + 1][x] + C_layer[y + 1][x + 2] + C_layer[y + 2][x] + C_layer[y + 2][x + 1] + C_layer[y + 2][x + 2];

            N_layer[y + 1][x + 1] = (((C_layer[y + 1][x + 1]) && (N == 2 || N == 3)) || ((!C_layer[y + 1][x + 1]) && (N == 3))) ? 1 : 0;
            if (N_layer[y + 1][x + 1] != C_layer[y + 1][x + 1]) {
                i = y * Xlength + x;
                cash[i].style.backgroundColor = N_layer[y + 1][x + 1] ? scr_1 : scr_0;

            }
        }
    }
    SwapLayers();
    age++;
    PrintAge();
}

function PlayLife(check) {
    CalcNextStep();
    if (check) active = 1;    if (active) window.setTimeout("PlayLife(0)", delay);

   
}

function StopLife() {
    active = 1;
}

function SetOptions() {
    var d, w, h;
    d = window.parseInt(document.getElementById("LDelay").value);
    if (d != delay)
        delay = d;
    w = window.parseInt(document.getElementById("LWidth").value);
    h = window.parseInt(document.getElementById("LHeight").value);
    if (h != Ylength || w != Xlength) {

        Xlength = w;

        Ylength = h;

        LoadLife(0);
    }
}

function PrintAge() {
    document.getElementById("Age").innerHTML = "Поколений : " + age;
}

function DumpOptions() {
    document.getElementById("LDelay").value = delay;
    document.getElementById("LWidth").value = Xlength;
    document.getElementById("LHeight").value = Ylength;
    
}