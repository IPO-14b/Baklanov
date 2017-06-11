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
    cash = new Array(Xlength * Ylength);    for (var y = 1; y <= Ylength; y++) {
        for (var x = 1; x <= Xlength; x++) {
            var i = (y - 1) * Xlength + x - 1;            cash[i] = document.getElementById(i);            cash[i].unselectable = true;
        }
    }
}

function CellTrigger(x, y) {
   
}

function InitSpace(x, y) {
   
}

function SwapLayers() {
   
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