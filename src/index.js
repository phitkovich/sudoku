module.exports = function solveSudoku(matrix) {
  // your solution

  var table = arrayClone(matrix);
  
  if (solve(table)) {
    return table;
  } else {
    return "Sudoku has no univocal solution";
  }

  function solve(sudoku) {
    var i, j, k, variant;

    for (i = 0; i < sudoku.length; i++) {
      for (j = 0; j < sudoku[i].length; j++) {
        if (!sudoku[i][j]) {
          for (k = 1; k <= 9; k++) {
            if (checkValue(sudoku, i, j, k)) {
              sudoku[i][j] = k;
              variant = solve(sudoku);
              if (variant) return true;
              sudoku[i][j] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  }
  
  function checkValue(matrix, i, j, k) {
    var row, col;


    for (row = 0; row <matrix.length; row++) {
      if (row != i && matrix[row][j] == k) {
        return false;
      }
    }
    for (col = 0; col < matrix[i].length; col++) {
      if (col != j && matrix[i][col] == k) {
        return false;
      }
    }   
    for (row = 0; row < 3; row++) {
      for (col = 0; col < 3; col++) {
        var rowBox = Math.floor((i / 3)) * 3 + row;
        var colBox = Math.floor((j / 3)) * 3 + col;
        if ((rowBox != i) && (colBox != j) && (matrix[rowBox][colBox] == k)) {
          return false;
        }
      }
    }
    return true;
  }

  function arrayClone (arr) {
    var i, copy;
    
    if (Array.isArray(arr)) {
      copy = arr.slice(0);
      for (i = 0; i < copy.length; i++) {
        copy[i] = arrayClone(copy[i]);
      }
      return copy;
    } else if(typeof arr === "object") {
      throw "Cannot clone array containing an object!";
    } else {
      return arr;
    }
  }

}
