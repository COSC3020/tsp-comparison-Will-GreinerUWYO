function test() {
    // tests every 500 node increments, anything less is too slow of an increase
    for(let i = 0; i < 8000; i += 500){
        // uses another function to generate a matrix with the correct number of nodes
        testMatrix = generateTest(i);
        // updates console with the current nsize of the check
        console.log('Local search on ' + i + ' nodes');

        // starts timer
        let startTime = performance.now();
        // find the bestDistance for the generated matrix
        let bestDistance = tsp_ls(testMatrix);
        // ends timer
        let endTime = performance.now();
        // computes time
        let totalTime = endTime-startTime;
        // puts time into minutes
        totalTime = totalTime/60000;

        // outputs the matrix size and best distance
        console.log('Matrix of size ' + i + ' had a best distance of ' + bestDistance);
        // outputs the time taken  
        console.log('It took ' + totalTime.toFixed(3) + ' minutes to complete');
    }
}


// generates a test matrix of size n
function generateTest(n){
  // makes a new matrix of size n
    let matrix = new Array(n);
  // initializes a new array for each nodes connections
    for(let i = 0; i < n; i++){
        matrix[i] = new Array(n);
    }
  // goes through and updates each node with its connections where i is each node
    for (let i = 0; i < n; i++){
      // handles connections to other nodes
        for (let j = 0; j < n; j++) {
          // diagonal is zeroes
            if(i === j){
                matrix[i][j] = 0;
            }
          // otherwise picks a random number between 1 and 10, and updates both sides of the diagonal
            else{
                let distance = Math.floor(Math.random() * 10) + 1;
                matrix[i][j] = distance;
                matrix[j][i] = distance;
            }
        }
    }
    return matrix;
}


test();
