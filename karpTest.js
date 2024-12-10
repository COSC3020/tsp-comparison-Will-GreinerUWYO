// used DJReflexive's held Karp implementation here.
function test() {
    // tests every node increments
    for(let i = 3; i < 25; i++){
        // uses another function to generate a matrix with the correct number of nodes
        testMatrix = generateTest(i);
        // updates console with the current nsize of the check
        console.log('Holding Karp on ' + i + ' nodes');

        // starts timer
        let startTime = performance.now();
        // find the bestDistance for the generated matrix
        let bestDistance = tsp_hk(testMatrix);
        // ends timer
        let endTime = performance.now();
        // computes time
        let totalTime = endTime-startTime;
        // puts time into minutes
        totalTime = totalTime/60000;

        // outputs the matrix size and best distance
        console.log('Matrix of size ' + i + ' had a best distance of ' + bestDistance);
        // outputs the time taken  
        console.log('It took ' + totalTime.toFixed(6) + ' minutes to complete');
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

// this is DJReflexive's implemenation of tsp_hk
function tsp_hk(distance_matrix) {
  // Sizes of 0 or 1 have no distance
  let size = distance_matrix.length;
  if (size == 0 || size == 1) { return 0; }
  

  let bestMin = Infinity; // Initialize min
  let dictionaryCache = {};

  // Make Every City the Starting Node
  for (let i = 0; i < size; i++) {
      let cities = [];

      // Fill array with the all cities
      for (let j = 0; j < size; j++) { cities.push(j); }

      let currentMin = heldKarp(i, cities, distance_matrix, dictionaryCache);

      // Replaces current min with new min
      if (currentMin < bestMin) { bestMin = currentMin; }
  }
  
  return bestMin;
}


// Based on the psuedocode in the README
function heldKarp(city, cities, matrix, cache) {
  let size = cities.length;

  // Check if it exists already in cache
  let key = JSON.stringify([city, cities]);
  if (cache[key] != undefined) { return cache[key]; }
  

  // Base Case when there are two cities
  if (size == 2) {
      for (let i = 0; i < size; i++) {
          if (cities[i] != city) {
              cache[key] = matrix[city][cities[i]];
              return cache[key];
          }
      }
  } else { 
      let minDistance = Infinity;

      for (let i = 0; i < size; i++) {
          if (cities[i] == city) { continue; } // Skips current city

          let newCities = [];

          // Removes current city from cities list
          for (let j = 0; j < size; j++) {
              if (cities[j] == city) { continue; } // Skips current city

              newCities.push(cities[j]);
          }
          
          let distance = matrix[city][cities[i]] 
                          + heldKarp(cities[i], newCities, matrix, cache);

          // Find the min
          if (minDistance > distance) { minDistance = distance; }
      }

      cache[key] = minDistance;
      return minDistance;
  }
}
test();
