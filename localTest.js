// uses my code for TSP local search. Updates with timing information after each completion. It runs for increasingly larger and larger matricies, as a way to see how the time scales with input size.
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

// my logic from tsp local search
function tsp_ls(distance_matrix) {
    let cities = distance_matrix.length;
    // if empty, return 0
    if(cities === 0 || cities === 1) {
        return 0;
    }
    // finds initial route and that route's distance
    let bestRoute = randomizeRoute(cities);
    let bestDistance = distance(distance_matrix, bestRoute);

    // this iterates through the loop, allowing to check almost all permutations of the cities. It ignores the starting city, and allows always at least one node to swap.
    // for each node going left
    let permutations = 0;
    for(let i = 1; i < cities - 1; i++){
        // reverse the next node, then chain down reversing all other subarrays in the array repeatedly
        for(let k = i + 1; k < cities; k++){
            // reverses the middle chunk
            let newRoute = reverse(bestRoute, i, k);
            // finds the distance of the current route
            let newDistance = distance(distance_matrix, bestRoute);
            // if the distance is better, replace it as the bestRoute and bestDistance
            if (newDistance < bestDistance) {
                bestRoute = newRoute;
                bestDistance = newDistance;
            }
        }
    }
    return bestDistance;
}

// finds the initial randomized route
function randomizeRoute(cities){
    // picks a random city for our starting location
    let startCity = Math.floor(Math.random() * cities);
    // initializes our route variable
    let startRoute = [startCity];
    // until the route is filled with cities
    while (startRoute.length < cities) {
        // pushes a city which is not yet in the route into the array
        let j = Math.floor(Math.random() * cities);
        if (!startRoute.includes(j)) {
            startRoute.push(j);
        }
    }
    return startRoute;
}

// finds the total distance of the route
function distance(distance_matrix, route){
    let distance = 0;
    // for each city, finds the distance from the distance matrix to the next city
    for (let i = 0; i < route.length - 1; i++) {
        distance = distance + distance_matrix[route[i]][route[i + 1]];
    }
    return distance;
}

// reverses the middle portion of the array
function reverse(path, i, k){
    let newPath = path;
    while(i<k){
        let temp = newPath[i];
        newPath[i] = newPath[k];
        newPath[k] = temp;
        i++;
        k--;
    }
    return newPath;
}

// runs the code
test();
