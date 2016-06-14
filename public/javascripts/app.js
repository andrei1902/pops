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
        }
        content += '</tr>';
    }
    content += '</table>';
    $('#petri').append(content);
}

$(document).ready(function() {
    buildGrid(5, 5);
});
