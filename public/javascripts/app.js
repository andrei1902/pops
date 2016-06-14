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
            content += '<td id="' + i + j + '" class="table-cell">' + ' id ' + i + j + '</td>';
            adressBook.push({ id: i + '' + j });

        }
        content += '</tr>';
    }
    content += '</table>';
    $('#petri').append(content);
}

$(document).ready(function() {
    buildGrid(4, 4);
    population = generatePops(2, adressBook);
    console.log(population);
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
        pop.name = 'pop_' + i;
        var randy = Math.floor(Math.random() * book.length);
        pop.location = book[randy].id;
        book.splice(randy, 1);
        population.push(pop);
    }
    return population;
}
