# About SMMR

**SMMR** (Simulation of Marine Mammals Resilience) is a JavaScript-based online application designed to evaluate the impacts of anthropogenic activities on marine mammals species. **SMMR**  implements several routines in order to estimate how a certain population might oscillate in a given time span. 

## Key features

- Implement analysis with standard data based on literature or input your own
- Adjust the anthropogenic threats to your study case
- Loops eliminate the randomness of the answer

## Contributing

When contributing, fork the repository and send pull requests with your commits. Wait for review and approval by the development team.

You are also welcome to create [issues](https://github.com/DiogoKramel/SMMR/issues) reporting bugs or suggesting improvements and features for further development.

## What do the files do?

A short summary of the files structure is provided below to encourage users to modify them to their own usage.

[simulation.js](simulation.js)

Contains the routine that performs the core simulation implemented in the analysis.

[plots.js](plots.js)

The data provided by the simulatino is converted to graphs using the Plotly framework.


## How to run the app locally

You can clone or download this repo:

```
git clone https://github.com/DiogoKramel/SMMR
```

Then change directory into the repo:

```
cd SMMR-master/
```

Now create and activate the virtual environment:

```
http-server -c-1
```

Or you can simply download the repository and run the **home.html** file. Make sure you have an internet connection.

## Licensing

SMMR is licensed under MIT.

***