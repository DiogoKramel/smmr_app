// Basic calculation
var params = {};

var url = location.search; // Get the raw url with the input data
var parser = document.createElement('a');
parser.href = url;
var query = parser.search.substring(1);
var vars = query.split('&');
for (var i = 0; i < vars.length; i++) {
	var pair = vars[i].split('=');
	params[pair[0]] = decodeURIComponent(pair[1]);
};

var yearStartSimulation = 2019;
var numberShips = [];
for (i = 0; i <= params.numberYearsSimulated; i++) {
    numberShips[i] = Math.round(i*(params.numberShipsFinal - params.numberShipsInitial) / params.numberYearsSimulated + params.numberShipsInitial)
}

// Build x axis with the years range
var xAxis = [];
for (x = 0; x <= params.numberYearsSimulated; x++) {                            
    xAxis[x] = yearStartSimulation + x;
};
xAxis[0] = yearStartSimulation;


// Table - Input data
var values = [
    ['Time simulated', 'Number of simulations', 'Initial population',
    'Percentage of juveniles', 'Percentage of female', 'Initial number of ships', 'Final number of ships',
    'Type of strike', 'Rate of strikes',  'Life expectancy',
    'Age maturation', 'Age menopause', 'Probability of birth', 'Probability of natural death for adults',
    'Probability of natural death for juveniles','Whaling', 'Stranding', 'Others'],
    [params.numberYearsSimulated+' years', 
    params.numberSimulations+' simulations', 
    params.initialPopulation+' individuals', 
	params.percentualJuveniles+'%', 
	params.percentualFemales+'%', 
    params.numberShipsInitial+' ships', 
    params.numberShipsExpectedFinal+' ships', 'Random', 
    params.strikeRateYear+' strikes per year or ship',  
    params.ageLifeExpectancy+' years', 
    params.ageMaturationMin + '-' + params.ageMaturationMax +' years old',
    params.ageMenopause+' years',
    params.probBirth+'%',
    params.probSurvivalAdults+'%',
    params.probSurvivalJuveniles+'%', 
    params.whalingRateYear+'%', 
    params.strandingRateYear+'%', 
	params.otherRateYear+'%']
]
var data = [{
	type: 'table',
	columnorder: [1, 2],
	columnwidth: [250, 150],
	header: {
		values: [["PARAMETERS IMPLEMENTED"], ["VALUE"]],
		align: ["left","center"],
		fill: {color: "black"},
		font: {color: "white"}
	},
	cells: {
		values: values,
		align: ["left","center"],
	},
}]
var layout = {
    font: {
      family: 'Arial',
    },
    margin: {
        l: 30,
        b: 30,
        t: 10,
        r: 30,
    },
};
Plotly.plot('input-data', data, layout);


// Plot - Population increase
var plotOne = {
    x: xAxis,
    y: simulationTotalPopulationPerYearCIMax,
    mode: 'lines',
    name: 'Confidence Interval 99.9%',
    line: {
      dash: 'dot',
      width: 1,
      color: 'rgb(225,45,45)',
    },
};
var plotTwo = {
    x: xAxis,
    y: simulationTotalPopulationPerYearCIMin,
    mode: 'lines',
    name: 'Confidence Interval 99.9%',
    line: {
      dash: 'dot',
      width: 1,
      color: 'rgb(225,45,45)',
    },
    fill: 'tonexty',
    fillcolor: 'rgba(225,45,45,0.3)',
};
var plotThree = {
    x: xAxis,
    y: simulationTotalPopulationPerYearAverage,
    type: 'scatter',
    name: 'Total population',
};
var plotFour = {
    x: xAxis,
    y: simulationJuvenilePopulationPerYearAverage,
    type: 'scatter',
    name: 'Juvenile population'
};
var plotFive = {
    x: xAxis,
    y: simulationFemalePopulationPerYearAverage,
    type: 'scatter',
    name: 'Female population'
};
var plotSix = {
    x: xAxis,
    y: simulationMalePopulationPerYearAverage,
    type: 'scatter',
    name: 'Male population'
};
var layout = {
	title: 'Population over time',
    xaxis: {
        title: 'Year',
        showgrid: true,
        linewidth: 1,
        mirror: true
    },
    yaxis: {
        title: 'Number of individuals',
        showline: true,
        linewidth: 1,
        mirror: true,
        rangemode: 'tozero',
	},
	margin: {
		r: 265,
	},
};
var data = [plotOne, plotTwo, plotThree, plotFour, plotFive, plotSix];
Plotly.newPlot('plot-population', data, layout);


// Plot - Aging
var agePerYearAverage = {
    x: xAxis, 
    y: simulationAgingPopulationAverage, 
    name: 'AverageAge',
    type: 'bar'
};
var data = [agePerYearAverage];
var layout = {
    title: 'Aging of the population',
    xaxis: {
        title: 'Year',
        showgrid: true,
        linewidth: 1,
        mirror: true
    },
    yaxis: {
        title: 'Average age in years',
        showgrid: true,
        linewidth: 1,
        mirror: true
    },
    margin: {
        l: 50,
        r: 30
    }
};
Plotly.newPlot('plot-aging', data, layout);


// Plot - death causes
var shipStrikeDeathPerYear = {
    x: xAxis, 
    y: simulationShipStrikeAverage, 
    name: 'Ship strikes per year',
    type: 'bar'
};
var naturalDeathPerYear = {
    x: xAxis, 
    y: simulationNaturalDeathAverage, 
    name: 'Natural deaths per year',
    type: 'bar'
};
var whalingWhalesPerYear = {
    x: xAxis, 
    y: simulationWhalingAverage, 
    name: 'Natural deaths per year',
    type: 'bar'
};
var strandingWhalesPerYear = {
    x: xAxis, 
    y: simulationStrandingAverage, 
    name: 'Stranding deaths per year',
    type: 'bar'
};
var otherThreatPerYear = {
    x: xAxis, 
    y: simulationOtherThreatAverage, 
    name: 'Other deaths per year',
    type: 'bar'
};
var data = [shipStrikeDeathPerYear, naturalDeathPerYear, whalingWhalesPerYear, strandingWhalesPerYear, otherThreatPerYear];
var layout = {
	title: 'Number and cause of deaths per year',
    xaxis: {
        title: 'Year',
        showgrid: true,
        linewidth: 1,
        mirror: true
    },
    yaxis: {
        title: 'Number of deaths',
        showgrid: true,
        linewidth: 1,
        mirror: true
    },
	barmode: 'relative',
	margin: {
		r: 250,
	},
};
Plotly.newPlot('plot-deaths', data, layout);


// Standard deviation
function cdfNormal (x, mean, standardDeviation) {
    return (1-math.erf((mean-x)/(Math.sqrt(2)*standardDeviation)))/2
};

shipStrikeDeathPerYear.y[0]=0;
var probabilityShipStrike = [], probabilityShipStrikeAxis = [];
for (t = 1; t < math.max(shipStrikeDeathPerYear.y)*1.3*params.numberYearsSimulated; t++) {
    probabilityShipStrike[t]=cdfNormal(t, math.mean(shipStrikeDeathPerYear.y)*params.numberYearsSimulated, math.std(shipStrikeDeathPerYear.y)*params.numberYearsSimulated)*100;
    probabilityShipStrikeAxis[t] = t;
};

naturalDeathPerYear.y[0]=0;
var probabilityNaturalDeath = [], probabilityNaturalDeathAxis = [];
for (t = 0; t < math.max(naturalDeathPerYear.y)*1.3*params.numberYearsSimulated; t++) {
    probabilityNaturalDeath[t]=cdfNormal(t, math.mean(naturalDeathPerYear.y)*params.numberYearsSimulated, math.std(naturalDeathPerYear.y)*params.numberYearsSimulated)*100;
    probabilityNaturalDeathAxis[t] = t;
}

if (params.whalingRateYear > 0) {
	whalingWhalesPerYear.y[0]=0;
	var probabilityWhaling = [], probabilityWhalingAxis = [];
	for (t = 0; t < math.max(whalingWhalesPerYear.y)*1.3*params.numberYearsSimulated; t++) {
		probabilityWhaling[t]=cdfNormal(t, math.mean(whalingWhalesPerYear.y)*params.numberYearsSimulated, math.std(whalingWhalesPerYear.y)*params.numberYearsSimulated)*100;
		probabilityWhalingAxis[t] = t;
	}
}

if (params.whalingRateYear > 0) {
	strandingWhalesPerYear.y[0]=0;
	var probabilityStranding = [], probabilityStrandingAxis = [];
	for (t = 0; t < math.max(strandingWhalesPerYear.y)*1.3*params.numberYearsSimulated; t++) {
		probabilityStranding[t]=cdfNormal(t, math.mean(strandingWhalesPerYear.y)*params.numberYearsSimulated, math.std(strandingWhalesPerYear.y)*params.numberYearsSimulated)*100;
		probabilityStrandingAxis[t] = t;
	}
}

if (params.otherRateYear > 0) {
	otherThreatPerYear.y[0]=0;
	var probabilityOtherThreat = [], probabilityOtherThreatAxis = [];
	for (t = 0; t < math.max(otherThreatPerYear.y)*1.3*params.numberYearsSimulated; t++) {
		probabilityOtherThreat[t]=cdfNormal(t, math.mean(otherThreatPerYear.y)*params.numberYearsSimulated, math.std(otherThreatPerYear.y)*params.numberYearsSimulated)*100;
		probabilityOtherThreatAxis[t] = t;
	}
}


// Plot - Probability of at least
var dataSet;
var dataSetX;
var nameSet;
function makeTrace(i) {
	if (i == 0) {
		dataSet = probabilityShipStrike,
		dataSetX = probabilityShipStrikeAxis
	} else if (i == 1) {
		dataSet = probabilityNaturalDeath
		dataSetX = probabilityNaturalDeathAxis
	} else if (i == 2) {
		dataSet = probabilityWhaling
		dataSetX = probabilityWhalingAxis
	} else if (i == 3) {
		dataSet = probabilityStranding
		dataSetX = probabilityStrandingAxis
	} else if (i == 4) {
		dataSet = probabilityOtherThreat
		dataSetX = probabilityOtherThreatAxis
	};
    return {
		x: dataSetX,
		y: dataSet,
        line: {
            shape: 'spline',
        },
        visible: i === 0,
    };
}
Plotly.plot('plot-probability', [0, 1, 2, 3, 4].map(makeTrace), {
    updatemenus: [{
		y: 1,
		x: 0,
		yanchor: 'top',
		xanchor: 'left',
        buttons: [{
            method: 'restyle',
            args: ['visible', [true, false, false, false, false]],
            label: 'Ship Strikes'
        }, {
            method: 'restyle',
            args: ['visible', [false, true, false, false, false]],
            label: 'Natural deaths'
        }, {
            method: 'restyle',
            args: ['visible', [false, false, true, false, false]],
            label: 'Whaling deaths'
        }, {
            method: 'restyle',
            args: ['visible', [false, false, false, true, false]],
            label: 'Stranding deaths'
        }, {
            method: 'restyle',
            args: ['visible', [false, false, false, false, true]],
            label: 'Other threats'
        }]
	}],
	title: 'Probability of having at least this amount of deaths',
	yaxis: {
		title: 'Probability [%]',
		showgrid: true,
		zeroline: false,
		linewidth: 1,
		mirror: true
	},
	xaxis: {
		title: 'Number of deaths',
		showgrid: true,
		zeroline: false,
		linewidth: 1,
		mirror: true
    },
    margin: {
        l: 60,
        r: 10
    }
});


// Plot - Probability normal distribution
var probabilityShipStrikeNormal = [], probabilityShipStrikeNormalAxis = [];
for (t = 1; t < probabilityShipStrike.length; t++) {
    probabilityShipStrikeNormal[t] = probabilityShipStrike[t]-probabilityShipStrike[t-1];
    probabilityShipStrikeNormalAxis[t] = t+1;
}
probabilityShipStrikeNormal[0] = probabilityShipStrike[0];
probabilityShipStrikeNormalAxis[0] = 1;
var probabilityStrikes = {
    x: probabilityShipStrikeNormalAxis, 
    y: probabilityShipStrikeNormal,
    type: 'bar',
};
var data = [probabilityStrikes];
var layout = {
    title: 'Distribution of ship collisions',
    yaxis: {
        title: 'Probability [%]',
        showgrid: true,
        linewidth: 1,
        mirror: true
    },
    xaxis: {
        title: 'Number of collisions',
        showgrid: true,
        linewidth: 1,
        mirror: true
    },
    margin: {
        l: 50,
        r: 30
    }
};
Plotly.newPlot('plot-probability-normal', data, layout);


// Plot - Histogram Age
var trace = {
    x: ageLastYear,
    type: 'histogram',
  };
var data = [trace];
var layout = {
    title: 'Age profile',
    yaxis: {
        title: 'Number of individuals',
        showgrid: true,
        zeroline: false,
        linewidth: 1,
        mirror: true
    },
    xaxis: {
        title: 'Age in years',
        showgrid: true,
        zeroline: false,
        linewidth: 1,
        mirror: true
    },
    margin: {
        l: 60,
        r: 10
    }
};
Plotly.newPlot('plotAgeLastYear', data, layout);


// Plot - All shit
var data = [];
for (var j = 0; j < params.numberSimulations; j++) {
	data.push({
		type: "scattergl",
		mode: "line",
		x: xAxis,
		y: simulationTotalPopulationPerYear[j],
		opacity: 0.05,
		line: {color: 'grey'},
	})
}
data.push({
    x: xAxis,
    y: simulationTotalPopulationPerYearAverageStdMax,
    mode: 'lines',
    name: 'Maximum Standard deviation',
    line: {
      dash: 'dot',
      width: 2,
      color: 'rgb(225,45,45)',
    },
}),
data.push({
    x: xAxis,
    y: simulationTotalPopulationPerYearAverageStdMin,
    mode: 'lines',
    name: 'Minimum Standard deviation',
    line: {
      dash: 'dot',
      width: 2,
      color: 'rgb(225,45,45)',
    },
}),
data.push({
    x: xAxis,
    y: simulationTotalPopulationPerYearCIMax,
    mode: 'lines',
    name: 'Maximum CI 95%',
    line: {
      dash: 'dot',
      width: 2,
      color: 'blue',
    },
}),
data.push({
    x: xAxis,
    y: simulationTotalPopulationPerYearCIMin,
    mode: 'lines',
    name: 'Minimum CI 95%',
    line: {
      dash: 'dot',
      width: 2,
      color: 'blue',
    },
})
var layout = {
	showlegend: false,
	title: 'All simulations run',
	xaxis: {
		title: 'Year',
		showgrid: true,
        linewidth: 1,
		mirror: true,
		autorange: true
	},
	yaxis: {
		title: 'Number of individuals',
		showgrid: true,
        linewidth: 1,
		mirror: true,
		rangemode: 'tozero',
    	autorange: true
    },
    margin: {
        l: 50,
        r: 30
    }
}
Plotly.plot('plot-allSimulations', data, layout)


// Table - Input data
var growthRate = (simulationTotalPopulationPerYearAverage[params.numberYearsSimulated] - simulationTotalPopulationPerYearAverage[0]) / simulationTotalPopulationPerYearAverage[0]  * 100
var growthRateMonth = Math.pow ( growthRate,  (1 / params.numberYearsSimulated))
var growthRateRound = growthRate.toFixed(4);
var growthRateMonthRound = growthRateMonth.toFixed(4);

var values = [
    ['Growth for the time period', 'Growth rate per year'],
    [growthRateRound + ' %', growthRateMonthRound + ' %']
]
var data = [{
	type: 'table',
	columnorder: [1, 2],
    columnwidth: [250, 150],
    header: {
        line: {width: 1, color: 'white'},
      },
	cells: {
		values: values,
        align: ["right","left"],
        line: {color: "white", width: 1},
	},
}]
var layout = {
    font: {
      family: 'Arial',
    },
    margin: {
        l: 0,
        b: 0,
        t: 0
    },
};
Plotly.plot('input-growth', data, layout);


// Plot - Probability growth distribution
var growthRateSimulation = [];
for (t = 0; t < params.numberSimulations; t++) {
    growthRateSimulation[t] = ((simulationTotalPopulationPerYear[t])[params.numberYearsSimulated] - (simulationTotalPopulationPerYear[t])[0]) / (simulationTotalPopulationPerYear[t])[0]  * 100
};

// Plot - Growth distribution
var trace = {
    x: growthRateSimulation,
    type: 'histogram',
  };
var data = [trace];
var layout = {
    title: 'Growth rate distribution',
        xaxis: {
        title: 'Growth rate [%]',
        showgrid: true,
        zeroline: false,
        linewidth: 1,
        mirror: true,
    },
    yaxis: {
        title: 'Ocurrence',
        showgrid: true,
        zeroline: false,
        linewidth: 1,
        mirror: true,
    },
    margin: {
        l: 60,
        r: 10
    }
};
Plotly.newPlot('plot-probabilityGrowth', data, layout);