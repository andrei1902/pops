var adressBook = [];
var population = [];

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
            content += '<td id="' + i + j + '" class="table-cell"></td>';
            adressBook.push({ id: i + '' + j });

        }
        content += '</tr>';
    }
    content += '</table>';
    $('#petri').append(content);
}

$(document).ready(function() {
    buildGrid(5, 5);
    population = generatePops(12, adressBook);
    drawPops(population);
    rainBeepers(adressBook);
    redrawGrid(adressBook);
});

function generatePops(numberOfPops, adressBook) {
    var book = adressBook;
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
        book.splice(randy, 1);
        population.push(pop);
    }
    return population;
}

function drawPops(population) {
    for (p in population) {
        $('#' + population[p].location.id).html('<span>' + population[p].name + '</span>');
        var id = population[p].location;
    }
}

function rainBeepers(adressBook) {

    for (a in adressBook) {
        var randy = Math.floor(Math.random() * 3).toString();
        if (randy === '0') {
            adressBook[a].beeper = -1;
        } else if (randy === '1') {
            adressBook[a].beeper = 0;
        } else {
            adressBook[a].beeper = +1;
        }
    }
}

function redrawGrid(adressBook) {
    for (a in adressBook) {
        $('#' + adressBook[a].id).append('<br><span>Beeper count: ' + adressBook[a].beeper + '</span>');
        console.log(adressBook.length);
    }

}
