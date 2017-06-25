/**
* Ширина и высота игрового пространства
*
* @var  int xLength
* @var  int yLength
*
*/
var xLength = 100, yLength = 100;

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
* @var int  cLayer
* @var int  nLayer
*
*/

var cLayer, nLayer;

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

function loadLife(first) {
    initSpace(xLength, yLength);
    if (first) {
        DumpOptions();
    }
    tableBuild();
    initCash();
    age = 0;
    printAge();
   
    
}

/**
* Функция создает и выводит на экран главную таблицу
* игрового поля.
* Создаётся вкладка с таблицей.
*
*/

function tableBuild() {
    var tab = "<table id='spacetable'>";
    for (var y = 1; y <= yLength; y++) {
        tab += "<tr>";
        for (var x = 1; x <= xLength; x++) {
            var i = (y - 1) * xLength + x - 1;
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

function initCash() {
    cash = new Array(xLength * yLength);
    for (var y = 1; y <= yLength; y++) {
        for (var x = 1; x <= xLength; x++) {
            var i = (y - 1) * xLength + x - 1;
            cash[i] = document.getElementById(i);
            cash[i].unselectable = true;
        }
    }
}

/**
* Функция инвертирует состояние ячейки при нажатии.
*
*/

function cellTrigger(x, y) {
    var i = (y - 1) * xLength + x - 1;
    cash[i].style.backgroundColor = cLayer[y][x] ? scr_0 : scr_1;
    cLayer[y][x] = cLayer[y][x] ? 0 : 1;

}

/**
* Функция инициализирующая массивы cLayer и nLayer нулями.
* Реальный размер массива увеличивается на 2 столбца и 2 строки,
* чтобы упростить расчет на границах.
*
*/

function initSpace(x, y) {
    cLayer = new Array(y + 2);
    nLayer = new Array(y + 2);
    for (var i = 0; i < y + 2; i++) {
        cLayer[i] = new Array(x + 2);
        nLayer[i] = new Array(x + 2);
        
    }
    for (var i = 0; i < y + 2; i++) {
        for (var j = 0; j < x + 2; j++) {
            cLayer[i][j] = nLayer[i][j] = 0;
        }

    }

   
}

/**
* Функция обменивающая ссылки на массивы, чтобы 
* не копировать массивы поэлементно, таким образом, 
* cLayer будет ссылаться то на cLayer, то на nLayer, 
* а на экран выводится только текущее состояние.
*
*/

function swapLayers() {
    var tmp = cLayer;
    cLayer = nLayer;
    nLayer = tmp;
}
/**
* Функция пересчитывающая состояние на поле
* и перерисовывающая изменившиеся ячейки.
*
*/

function calcNextStep() {
    var i, n;

    for (var y = yLength; y--;) {
        for (var x = xLength; x--;) {
            n = cLayer[y][x] + cLayer[y][x + 1] + cLayer[y][x + 2] + cLayer[y + 1][x] + cLayer[y + 1][x + 2] + cLayer[y + 2][x] + cLayer[y + 2][x + 1] + cLayer[y + 2][x + 2];



            nLayer[y + 1][x + 1] = (((cLayer[y + 1][x + 1]) && (N == 2 || N == 3)) || ((!cLayer[y + 1][x + 1]) && (N == 3))) ? 1 : 0;


            if (nLayer[y + 1][x + 1] != cLayer[y + 1][x + 1]) {
                i = y * xLength + x;
                cash[i].style.backgroundColor = nLayer[y + 1][x + 1] ? scr_1 : scr_0;
            }
        }
    }
    swapLayers();
    age++;
    printAge();
}

/**
* Функция запускающая цикл расчета.
* Установка таймаута.
*
* @param int check Флаг запуска
*/

function playLife(check) {
    calcNextStep();
    if (check) {
        active = 1;
    }
    if (active) {
        window.setTimeout("playLife(0)", delay);
    }
}

/**
* Функция останавлювающая цикл расчета
*
*/

function stopLife() {
    active = 0;
}

/**
* Интерфейсная функция установки настроек
* Утанавливаются зареджка, ширина, высота.
* Загрузка жизни при установке новых параметров
*
*/

function setOptions() {
    var d, w, h;
    d = window.parseInt(document.getElementById("LDelay").value);
    if (d != delay) {
        delay = d;
    }
    w = window.parseInt(document.getElementById("LWidth").value);
    h = window.parseInt(document.getElementById("LHeight").value);
    if (h != yLength || w != xLength) {
        xLength = w;
        yLength = h;
        loadLife(0);
    }
}
/**
* Функция отображающая число поколений
*
*/

//function printAge() {
//   document.getElementById("Age").innerHTML = "Поколений : " + age;
//}

/**
* Эта функция сбрасывает значения отображаемые пользователю
*
*/

function dumpOptions() {
    document.getElementById("LDelay").value = delay;
    document.getElementById("LWidth").value = xLength;
    document.getElementById("LHeight").value = yLength;
    
}