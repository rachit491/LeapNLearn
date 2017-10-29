function searchWord(matrix) {
    var rows = new Array();
    for(var i=0;i<5;i++){
        rows.push(matrix[i].join(""));
    }
    var cols = new Array();
    for(var i=0;i<5;i++){
        cols[i] = new Array();
        for(var j=0;j<5;j++){
            cols[i][j] = matrix[j][i];
        }
    } 
    var columns = new Array();
    for(var i=0;i<5;i++){
        columns.push(matrix[i].join(""));
    }

    var paths = new Array();

    for(var i=0;i<5;i++){
        getAllSubstrings(rows[i],paths);
    }
    for(var i=0;i<5;i++){
        getAllSubstrings(columns[i],paths);
    }
    return paths;
}

function getAllSubstrings(str,paths) {
    var i, j, result = [];
  
    for (i = 0; i < str.length; i++) {
        for (j = i + 1; j < str.length + 1; j++) {
            paths.push(str.slice(i, j));
        }
    }
  }
  