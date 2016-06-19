var addressBook = [];
var population = [];
var turn = 1;
var gridRows = 5;
var gridCols = 5;
var parameters = { normal: 34, steal: 33, build: 33 };

//init function
$(document).ready(function() {
    buildGrid(gridRows, gridCols);
    population = generatePops(12, addressBook);
    drawPops(population);
    rainBeepers(addressBook);
    redrawGrid(addressBook);
});

//tick function
function tick() {
    turn++;
    console.log('Turn no:' + turn);
    //redraw grid every 3 turns
    if (turn % 3 == 0) {
        console.log('Redrawing grid');
        rainBeepers(addressBook);
        redrawGrid(addressBook);
    }
    tickPops();
}


function buildGrid(rows, cols) {
    var rowNumber;
    var colNumber;
    if (rows) {
        rowNumber = rows
    } else {
        rowNumber = 10;
    }
    if (cols) {
        colNumber = cols
    } else {
        colNumber = 10;
    }

    var content = '';
    content += '<table>'
    for (var i = 0; i < rowNumber; i++) {
        content += '<tr>';
        for (var j = 0; j < colNumber; j++) {
            content += '<td id="' + i + '_' + j + '" class="table-cell"></td>';
            addressBook.push({ id: i + '_' + j });

        }
        content += '</tr>';
    }
    content += '</table>';
    $('#petri').append(content);
}


function generatePops(numberOfPops, addressBook) {
    var book = addressBook.concat();
    var totalPops;
    var population = [];
    if (numberOfPops) {
        totalPops = numberOfPops
    } else {
        totalPops = 1;
    }

    for (var i = 0; i < totalPops; i++) {
        var pop = {};
        //asign pop name
        pop.name = 'pop_' + i;
        var randy = Math.floor(Math.random() * book.length);

        //assign pop location
        pop.location = book[randy];
        pop.parameters = parameters;
        pop.hasSelectedStrategy = false;
        book.splice(randy, 1);
        population.push(pop);
    }
    return population;
}

function drawPops(population) {
    for (p in population) {
        $('#' + population[p].location.id).html('<span class="popName">' + population[p].name + '</span>');
        $('#' + population[p].location.id).addClass('occupied');
        var id = population[p].location;
    }
}

function rainBeepers(addressBook) {

    for (a in addressBook) {
        var randy = Math.floor(Math.random() * 3).toString();
        if (randy === '0') {
            addressBook[a].beeper = -1;
        } else if (randy === '1') {
            addressBook[a].beeper = 0;
        } else {
            addressBook[a].beeper = +1;
        }
    }
}

function redrawGrid(addressBook) {
    for (a in addressBook) {
        if ($('#' + addressBook[a].id).children().hasClass('beeper')) {
            $('#' + addressBook[a].id).find('.beeper').text(addressBook[a].beeper);
        } else {
            $('#' + addressBook[a].id).append('<br><span class="beeper">' + addressBook[a].beeper + '</span>');
        }
    }
}

function tickPops() {
    //for each pop find his neighbors
    var isNotDone = true;
    var popCount = 0;
    while (isNotDone) {
        var randy = Math.floor(Math.random() * population.length);
        if (!population[randy].hasSelectedStrategy) {
            population[randy].neighborLocations = [];
            population[p].neighborLocations = findNeighbors(population[p].location.id);
            chooseStrategy(population[randy]);
            population[randy].hasSelectedStrategy = true;
            popCount++;
            if (popCount == population.length) {
                isNotDone = false
            }
        }
    }
    resetPops();
}

function findNeighbors(id) {
    var coords = id.split('_');
    var row = parseInt(coords[0]);
    var column = parseInt(coords[1]);
    var neighborLcoations = [];
    var location = {};
    //upper row
    if (row - 1 >= 0) {
        if (column - 1 >= 0) {
            neighborLcoations.push({ row: (row - 1), column: (column - 1) });
        }
        neighborLcoations.push({ row: (row - 1), column: column });
        if (column + 1 <= gridCols - 1) {
            neighborLcoations.push({ row: (row - 1), column: (column + 1) });
        }
    }
    //same row as location
    if (column - 1 >= 0) {
        neighborLcoations.push({ row: row, column: column - 1 });
    }
    if (column + 1 <= gridCols - 1) {
        neighborLcoations.push({ row: row, column: column + 1 });
    }
    //lower row
    if (row + 1 <= gridRows - 1) {
        if (column - 1 >= 0) {
            neighborLcoations.push({ row: row + 1, column: column - 1 });
        }
        neighborLcoations.push({ row: row + 1, column: column });
        if (column + 1 <= gridCols - 1) {
            neighborLcoations.push({ row: row + 1, column: column + 1 });
        }
    }
    for (var l in neighborLcoations) {
        neighborLcoations[l].id = neighborLcoations[l].row + '_' + neighborLcoations[l].column;
    }
    //add beepers to neighbor locations
    for (var l in neighborLcoations) {
        var id = neighborLcoations[l].id;
        for (var a in addressBook) {
            if (addressBook[a].id == id) {
                neighborLcoations[l].beeper = addressBook[a].beeper;
            }
        }
    }
    //add pops to neighbor locations
    for (var l in neighborLcoations) {
        var id = neighborLcoations[l].id;
        for (p in population) {
            if (population[p].location.id == id) {
                neighborLcoations[l].pop = { popLocation: population[p].location, popName: population[p].name };
            }
        }
    }
    return neighborLcoations;
}

function chooseStrategy(pop) {
    var randy = Math.floor(Math.random() * 100);
    if (randy <= pop.parameters.normal) {
        pop.strategy = 'normal';
        console.log('My name is ' + pop.name + ' and I will see what I can do');
    } else if (randy > pop.parameters.normal && randy <= pop.parameters.normal + pop.parameters.steal) {
        pop.strategy = 'steal';
        console.log('My name is ' + pop.name + ' and I will steal');
    } else {
        pop.strategy = 'build';
        console.log('My name is ' + pop.name + ' and I will build');
    }
}

function resetPops(){
    for (var p in population){
        population[p].hasSelectedStrategy = false;
    }
}