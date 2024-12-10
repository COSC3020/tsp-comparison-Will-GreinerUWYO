# Traveling Salesperson Problem -- Empirical Analysis

For this exercise, you'll need to take the code from the TSP Held-Karp and TSP
Local Search exercises. This can be your own implementation or somebody else's.
You will now do an empirical analysis of the implementations, comparing their
performance. Both the Held-Karp and the Local Search algorithms solve the same
problem, but they do so in completely different ways. This results in different
solutions, and in different times required to get to the solution.

Investigate the implementations' empirical time complexity, i.e. how the runtime
increases as the input size increases. *Measure* this time by running the code
instead of reasoning from the asymptotic complexity (this is the empirical
part). Create inputs of different sizes and plot how the runtime scales (input
size on the $x$ axis, time on the $y$ axis). Your largest input should have a
runtime of *at least* an hour. The input size that gets you to an hour will
probably not be the same for the Held-Karp and Local Search implementations.

In addition to the measured runtime, plot the tour lengths obtained by both
implementations on the same input distance matrices. The length of the tour that
Held-Karp found should always be less than or equal to the tour length that
Local Search found. Why is this?

Add the code to run your experiments, graphs, and an explanation of what you did
to this markdown file.

## Local Search Experiment
| Size (nodes)  | Distance | Time (min) |
| ------------- | ------------- | ---- |
|  0 | 0  | 0 |
|  500 | 2542  | 0.004 |
|  1000 | 5155  |0.043  |
|  1500 | 7798  | 0.210 |
|  2000 | 10525  |0.571  |
|2500	|13325|			2.304|	
|3000	|15898			|4.530|
|3500|	18644		|	7.797|
|4000	|21315	|		13.377|
|4500	|23838|			19.751|
|5000	|26596|			25.903|
|7000 |37666| 91.092|

codespace stopped while processing 5000. Set to go again after changing timeout rules
changed test to 1000 instead of 500 for time
