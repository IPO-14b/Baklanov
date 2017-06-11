/**
* Ширина и высота игрового пространства
*
* @var  int XLength
* @var  int YLength
*
*/
var Xlength = 50, Ylength = 50;

/**
* Задержка перерисовки мс
*
* @var  int delay
*
*/
var delay = 1;

/**
* Число поколений
*
* @var int age 
*/
var age;

/*
* Ссылки на двумерные массивы содержащие состояния ячеек 
* для текущего и следующего поколений
*
* @var int  C_layer
* @var int  N_layer
*
*/
var C_layer, N_layer;

/*
* Цвет пустых и непустых ячеек
*
* @var string scr_0
* @var string scr_1
*/
    var scr_0 = '#050505';
    var scr_1 = '#41a91d';
    
/* 
* Флаг процесса 0 - выкл. 1 - вкл.
*
* @var int active
*/
    var active = 0;
/* 
* Массив ячеек таблицы
*
* @var int cash
*/
    var cash;

/**
*   Главная инициализирующая функция
*
*   
*   @param   int   first    Флаг работы
*  
*/
function LoadLife(first) {
    InitSpace(Xlength, Ylength);
    if (first)
        
        
        DumpOptions();
    TableBuild();
    InitCash();
    age = 0;
    PrintAge();
   
    
}

/**
* Функция создает и выводит на экран главную таблицу* игрового поля.
* Создаётся вкладка с таблицей.
*
*/
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

/**
* Функция инициализирует кеш ячеек таблицы
* в виде массива. Определяет занятость ячейки.
*
*/
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

/**
* Функция инвертирует состояние ячейки при нажатии.
*
*/
function CellTrigger(x, y) {
    var i = (y - 1) * Xlength + x - 1;
    cash[i].style.backgroundColor = C_layer[y][x] ? scr_0 : scr_1;
    C_layer[y][x] = C_layer[y][x] ? 0 : 1;

}

/**
* Функция инициализирующая массивы C_layer и N_layer нулями.
* Реальный размер массива увеличивается на 2 столбца и 2 строки,
* чтобы упростить расчет на границах.
*
*/
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
/**
* Функция обменивающая ссылки на массивы, чтобы * не копировать массивы поэлементно, таким образом, * C_layer будет ссылаться то на C_layer, то на N_layer, * а на экран выводится только текущее состояние.
*
*/
function SwapLayers() {
    var tmp = C_layer;
    C_layer = N_layer;
    N_layer = tmp;
}
/**
* Функция пересчитывающая состояние на поле* и перерисовывающая изменившиеся ячейки.
*
*/
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

/**
* Функция запускающая цикл расчета.
* Установка таймаута.
*
* @param int check Флаг запуска
*/
function PlayLife(check) {
    CalcNextStep();
    if (check)
        active = 1;
    if (active)
        window.setTimeout("PlayLife(0)", delay);

   
}
/**
* Функция останавлювающая цикл расчета
*
*/
function StopLife() {
    active = 0;
}

/**
* Интерфейсная функция установки настроек
* Утанавливаются зареджка, ширина, высота.
* Загрузка жизни при установке новых параметров
*
*/
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
/**
* Функция отображающая число поколений
*
*/
function PrintAge() {
    document.getElementById("Age").innerHTML = "Поколений : " + age;
}
/**
* Эта функция сбрасывает значения отображаемые пользователю
*
*/
function DumpOptions() {
    document.getElementById("LDelay").value = delay;
    document.getElementById("LWidth").value = Xlength;
    document.getElementById("LHeight").value = Ylength;
    
}