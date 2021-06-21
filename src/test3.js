let anyArray_3m_3n = [
                          [5,1,8],
                          [3,6,9],
                          [8,2,9]
                       ]
function findOutput (array) {
  let maximumOutput = 0
  for ( let m = 0; m < array.length; m++ ) {
    let firstFieldAmount = array[m][0]
    let arrayLength = array[0].length
    if (arrayLength = 1 ) {
      maximumOutput = firstFieldAmount > maximumOutput ? firstFieldAmount : maximumOutput
    }
    let twoFieldsAmount_1 = 0
    let twoFieldsAmount_2 = 0
    let twoFieldsAmount_3 = 0

    let threeFieldsAmount_11 = 0
    let threeFieldsAmount_12 = 0
    let threeFieldsAmount_13 = 0

    let threeFieldsAmount_21 = 0
    let threeFieldsAmount_22 = 0
    let threeFieldsAmount_23 = 0

    let threeFieldsAmount_31 = 0
    let threeFieldsAmount_32 = 0
    let threeFieldsAmount_33 = 0
    for ( let n = 0; n < arrayLength; n++) {
      if (n = 1) {
        if (m - 1 >= 0) {
          twoFieldsAmount_1 = firstFieldAmount + array[m - 1][n]
        } else {
          twoFieldsAmount_1 = firstFieldAmount + array[m][n]
        }
        twoFieldsAmount_2 = firstFieldAmount + array[m][n]
        if ((m + 1) < array.length ) {
          twoFieldsAmount_3 = firstFieldAmount + array[m + 1][n]
        } else {
          twoFieldsAmount_3 = firstFieldAmount + array[m][n]
        }
        if (arrayLength = 2) {
          maximumOutput = twoFieldsAmount_1 > maximumOutput ? twoFieldsAmount_1 : maximumOutput
          maximumOutput = twoFieldsAmount_2 > maximumOutput ? twoFieldsAmount_2 : maximumOutput
          maximumOutput = twoFieldsAmount_3 > maximumOutput ? twoFieldsAmount_3 : maximumOutput
        }
      }
      if (n = 2) {
        if ((m - 2) >= 0) {
          threeFieldsAmount_11 = twoFieldsAmount_1 + array[m - 2][n]
        } else if ((m - 1) >= 0){
          threeFieldsAmount_11 = twoFieldsAmount_1 + array[m - 1][n]
        } else {
          threeFieldsAmount_11 = 0
        }
        if ((m - 1) >= 0){
          threeFieldsAmount_12 = twoFieldsAmount_1 + array[m - 1][n]
        } else {
          threeFieldsAmount_12 = twoFieldsAmount_1 + array[m][n]
        }
        threeFieldsAmount_13 = twoFieldsAmount_1 + array[m][n]
        if ((m - 1) >= 0) {
        threeFieldsAmount_21 = twoFieldsAmount_2 + array[m - 1][n]
        } else {
          threeFieldsAmount_21 = twoFieldsAmount_2 + array[m][n]
        }
        threeFieldsAmount_22 = twoFieldsAmount_2 + array[m][n]
        if (m < (array.length - 1)) {
          threeFieldsAmount_23 = twoFieldsAmount_2 + array[m + 1][n]
        } else {
          threeFieldsAmount_23 = twoFieldsAmount_2 + array[m][n]
        }
        threeFieldsAmount_31 = twoFieldsAmount_3 + array[m][n]
        if ((m + 1 ) < (array.length - 1) ) {
          threeFieldsAmount_32 = twoFieldsAmount_3 + array[m + 1][n]
        } else {
          threeFieldsAmount_32 = twoFieldsAmount_3 + array[m][n]
        }
        if (m + 2 < array.length){
          threeFieldsAmount_33 = twoFieldsAmount_3 + array[m + 2][n]
        } else if (m + 1 < array.length){
          threeFieldsAmount_33 = twoFieldsAmount_3 + array[m + 1][n]
        } else {
          threeFieldsAmount_33 = twoFieldsAmount_3 + array[m][n]
        }
        if (arrayLength = 3) {
          maximumOutput = threeFieldsAmount_11 > maximumOutput ? threeFieldsAmount_11 : maximumOutput
          maximumOutput = threeFieldsAmount_12 > maximumOutput ? threeFieldsAmount_12 : maximumOutput
          maximumOutput = threeFieldsAmount_13 > maximumOutput ? threeFieldsAmount_13 : maximumOutput
          maximumOutput = threeFieldsAmount_21 > maximumOutput ? threeFieldsAmount_21 : maximumOutput
          maximumOutput = threeFieldsAmount_22 > maximumOutput ? threeFieldsAmount_22 : maximumOutput
          maximumOutput = threeFieldsAmount_23 > maximumOutput ? threeFieldsAmount_23 : maximumOutput
          maximumOutput = threeFieldsAmount_31 > maximumOutput ? threeFieldsAmount_31 : maximumOutput
          maximumOutput = threeFieldsAmount_32 > maximumOutput ? threeFieldsAmount_32 : maximumOutput
          maximumOutput = threeFieldsAmount_33 > maximumOutput ? threeFieldsAmount_33 : maximumOutput
        }
      }
    }
  }
  return maximumOutput
}

findOutput(anyArray_3m_3n)
