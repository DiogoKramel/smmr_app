// Generate the same random numbers
var myrng = new Math.seedrandom(1234);

// Assign globals
var params = {};
var populationProperties = {};
var numberShips = [];
var ageLastYear = [];
var initialPopulationJuveniles,
    initialPopulationFemales, 
    initialPopulationMales, 
	currentYear, 
	currentPopulation,
    strikeType, 
    strikeClass, 
	yearStartSimulation,
	numberShips,
	numberShipStrikes,
	numberStrandingWhales,
	numberWhalingWhales,
	numberOtherThreatWhales;

// Function to read the data from the url
function inputData() {
    var url = location.search; // Get the raw url with the input data
    var parser = document.createElement('a');
    parser.href = url;
    var query = parser.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        params[pair[0]] = decodeURIComponent(pair[1]);
	};
	
	// Set which categories will be stroke by ships
	strikeClass = ['male', 'female', 'juvenile']; // Random strikes
	if (params.strikeClass == 2) { // Only Female
		strikeClass[0] = 'false';
		strikeClass[2] = 'false';
	} else if (params.strikeClass == 3) { // Only Juvenile
		strikeClass[0] = 'false';
		strikeClass[1] = 'false';
	};

	// Convert percentage to absolute number
    initialPopulationJuveniles = Math.round(params.initialPopulation * params.percentualJuveniles / 100);
    initialPopulationFemales = Math.ceil((params.initialPopulation - initialPopulationJuveniles) * params.percentualFemales / 100);
    initialPopulationMales = params.initialPopulation - initialPopulationJuveniles - initialPopulationFemales;
	
	// Linear increase of number of ship
    for (i = 0; i <= params.numberYearsSimulated; i++) {
        numberShips[i] = Math.round(i * (params.numberShipsExpectedFinal*1 - params.numberShipsInitial*1) / params.numberYearsSimulated*1 + params.numberShipsInitial*1)
	};
	// Other inputs
	yearStartSimulation = 2019;
    currentPopulation = params.initialPopulation;
    currentYear = yearStartSimulation;
}

// Create and define some properties of a new agent
function agent() {
	this.id = [],
	this.status = 'alive',
	this.class = 'juvenile',
	this.age = 0,        
	this.yearBirth = currentYear,
	this.yearSexualMaturation = [],
	this.yearDeath = [],
	this.causeDeath = [];
}

// Kill an individual
function makeDead(index) {
	populationProperties[index].status = 'dead';
	populationProperties[index].yearDeath = currentYear;
}

// Simulation of one single year
function SimulationYear() {

	// Read the data contained in the url
	inputData();

	/*********** YEAR ZERO ***********/
	// Define population parameters at year zero
	var juvenilePopulationPerYear =[], 
		adultFemalePopulationPerYear = [], 
		adultMalePopulationPerYear = [], 
		naturalDeathPerYear = [], 
		shipStrikeDeathPerYear = [], 
		whalingWhalesPerYear = [], 
		strandingWhalesPerYear = [], 
		otherThreatPerYear = [], 
		agePerYear = [], 
		agePerYearAverage = [];

	totalPopulationPerYear = [];
	totalPopulationPerYear[0] = params.initialPopulation;
	juvenilePopulationPerYear[0] = initialPopulationJuveniles;
	adultFemalePopulationPerYear[0] = initialPopulationFemales;
	adultMalePopulationPerYear[0] = initialPopulationMales;

	// Create the initial population and assign id, age/birth, class, and wheter females are pregnant
	for (var i = 1; i <= params.initialPopulation; i++) {
		populationProperties[i] = new agent()
		populationProperties[i].id = i;
		if (i <= initialPopulationJuveniles) {
			populationProperties[i].age = Math.floor(myrng()*params.ageMaturationMax);
			populationProperties[i].yearBirth = yearStartSimulation-populationProperties[i].age;
			var femaleOrMale = SJS.Binomial(1, params.percentualFemales/100);
			if (femaleOrMale.sample(1) == false) {
				populationProperties[i].gender = 'female';
			} else {
				populationProperties[i].gender = 'male';
			}
		} else if (i > initialPopulationJuveniles && i <= (initialPopulationJuveniles+initialPopulationFemales)) {
			populationProperties[i].class = 'adult';
			populationProperties[i].gender = 'female';
			populationProperties[i].age = Math.floor(myrng()*(params.ageLifeExpectancy-params.ageMaturationMax)+params.ageMaturationMax);
			populationProperties[i].yearBirth = yearStartSimulation-populationProperties[i].age;
			populationProperties[i].yearSexualMaturation = 'unknown';
			if (populationProperties[i].age < params.ageMenopause) {
				var auxBirthProb = ((params.pregnancyCycleMin*1 + params.pregnancyCycleMax*1) * 0.5);
				var pregnantOrNot = SJS.Binomial(1, params.probBirth/100 / auxBirthProb);
				if (pregnantOrNot.sample(1) == true) {
					populationProperties[i].pregnancyStatus = 'pregnant';
				} else {
					populationProperties[i].pregnancyStatus = 'nonpregnant';
				} 
			}
			else {
				populationProperties[i].pregnancyStatus = 'sterile';
			}
		} else {
			populationProperties[i].class = 'adult';
			populationProperties[i].gender = 'male';
			populationProperties[i].age = Math.floor(myrng()*(params.ageLifeExpectancy-params.ageMaturationMax)+params.ageMaturationMax);
			populationProperties[i].yearBirth = yearStartSimulation-populationProperties[i].age;
			populationProperties[i].yearSexualMaturation = 'unknown';
		}
	};

	/*********** FOLLOWING YEARS - LOOP ***********/
	for (var year = 1; year <= params.numberYearsSimulated; year++) {
		
		// Add one year to the simulation and one year for each agent's age
		currentYear +=1;
		for (var i = 1; i <= currentPopulation; i++) {
			if (populationProperties[i].status == 'alive') {
				populationProperties[i].age += 1;
			}
		}

		// Set death causes zero before the eventss
		naturalDeathPerYear[year] = 0;
		shipStrikeDeathPerYear[year] = 0;
		whalingWhalesPerYear[year] = 0;
		strandingWhalesPerYear[year] = 0
		otherThreatPerYear[year] = 0;

		// Agents that will die by natural causes
		for (var i = 1; i <= currentPopulation; i++) {
			if (populationProperties[i].status == 'alive') {
				if (populationProperties[i].class == 'juveniles') {
					var liveOrNot = SJS.Binomial(1, probSurvivalJuveniles/100);
					if (liveOrNot.sample(1) == true) {
						populationProperties[i].status = 'alive';
					} else {
						makeDead(i);
						populationProperties[i].causeDeath = 'natural';
						naturalDeathPerYear[year] +=1; 
					} 
				} else {
					var liveOrNot = SJS.Binomial(1, params.probSurvivalAdults/100);
					if (populationProperties[i].age > 1.1*params.ageLifeExpectancy) {
						makeDead(i);
						populationProperties[i].causeDeath = 'natural';
						naturalDeathPerYear[year] +=1;
					} else if (liveOrNot.sample(1) == true) {
						populationProperties[i].status = 'alive';
					} else {
						makeDead(i);
						populationProperties[i].causeDeath = 'natural';
						naturalDeathPerYear[year] +=1;
					} 
				}
			}
		};

		// Number of agents that will be stroke by ships
		if (params.strikeType == 'perYear') {
			var poisson = SJS.Poisson(params.strikeRateYear);
			numberShipStrikes = Number(poisson.sample(1));
		} else {
			var poisson = SJS.Poisson(numberShips[currentYear-yearStartSimulation-1]/params.strikeRateYear);
			numberShipStrikes = Number(poisson.sample(1));
		};

		// Agents that will be stroke by ships
		for (i = 0; i < numberShipStrikes; i++) {
			randomIndex = Math.ceil(myrng()*(Object.keys(populationProperties).length));
			if (populationProperties[randomIndex].status == 'alive' && ((populationProperties[randomIndex].class == 'adult' && populationProperties[randomIndex].gender == strikeClass[0]) || (populationProperties[randomIndex].class == 'adult' && populationProperties[randomIndex].gender == strikeClass[1]) || (populationProperties[randomIndex].class == strikeClass[2]))) {
				makeDead(randomIndex);
				populationProperties[randomIndex].causeDeath = 'ship';
				shipStrikeDeathPerYear[year] += 1;
			}
			else {
				i=i-1;
			}
		};

		// Agents that will be whaled
		if (params.whalingRateYear > 0) {
			var poisson = SJS.Poisson(params.whalingRateYear);
			numberWhalingWhales = Number(poisson.sample(1));
			for (i = 0; i < numberWhalingWhales; i++) {
				randomIndex = Math.ceil(myrng()*(Object.keys(populationProperties).length));
				if (populationProperties[randomIndex].status == 'alive') {
					makeDead(randomIndex);
					populationProperties[randomIndex].causeDeath = 'whaling';
					whalingWhalesPerYear[year] += 1;
				}
				else {
					i=i-1;
				}
			} 
		};

		// Agents that will eventually strand
		if (params.strandingRateYear > 0) {
			var poisson = SJS.Poisson(params.strandingRateYear);
			numberStrandingWhales = Number(poisson.sample(1));
			for (i = 0; i < numberStrandingWhales; i++) {
				randomIndex = Math.ceil(myrng()*(Object.keys(populationProperties).length));
				if (populationProperties[randomIndex].status == 'alive') {
					makeDead(randomIndex);
					populationProperties[randomIndex].causeDeath = 'stranding';
					strandingWhalesPerYear[year] += 1;
				}
				else {
					i=i-1;
				}
			} 
		};

		// Agents that will eventually die by other means
		if (params.otherRateYear > 0) {
			var poisson = SJS.Poisson(params.otherRateYear);
			numberOtherThreatWhales = Number(poisson.sample(1));
			for (i = 0; i < numberOtherThreatWhales; i++) {
				randomIndex = Math.ceil(myrng()*(Object.keys(populationProperties).length));
				if (populationProperties[randomIndex].status == 'alive') {
					makeDead(randomIndex);
					populationProperties[randomIndex].causeDeath = 'other';
					otherThreatPerYear[year] += 1;
				}
				else {
					i=i-1;
				}
			} 
		};

		// If juveniles will mature or not
		for (var i = 1; i <= currentPopulation; i++) {
			if (populationProperties[i].class == 'juvenile') {
				if (populationProperties[i].age == params.ageMaturationMax) {
					populationProperties[i].class = 'adult'
				} else if (populationProperties[i].age >= params.ageMaturationMin) {
					var matureOrNot = SJS.Binomial(1, 1/(params.ageMaturationMax-params.ageMaturationMin));
					if (matureOrNot.sample(1) == true) {
						populationProperties[i].class = 'adult';
						populationProperties[i].ageSexualMaturation = populationProperties[i].age;
						populationProperties[i].yearSexualMaturation = year+2019;
					}
				}
			}
		};

		// Females are pregnant and will give birth or are not and may become pregnant
		// It also updates the current population number
		for (var i = 1; i <= currentPopulation; i++) {
			if (populationProperties[i].gender == 'female' && populationProperties[i].class == 'adult') {
				if (populationProperties[i].pregnancyStatus == 'pregnant') {
					currentPopulation++;
					populationProperties[currentPopulation] = new agent();
					populationProperties[currentPopulation].id = currentPopulation;
					var femaleOrMale = SJS.Binomial(1, params.percentualFemales/100);
					if (femaleOrMale.sample(1) == true) {
						populationProperties[currentPopulation].gender = 'female';
					} else {
						populationProperties[currentPopulation].gender = 'male';
					}
					populationProperties[i].pregnancyStatus = 'nonpregnant';
				} else if (populationProperties[i].pregnancyStatus == 'nonpregnant') {
					var auxBirthProb = ((params.pregnancyCycleMin*1 + params.pregnancyCycleMax*1) * 0.5);
					var pregnantOrNot = SJS.Binomial(1, params.probBirth/100 / auxBirthProb);
					if (pregnantOrNot.sample(1) == true) {
						populationProperties[i].pregnancyStatus = 'pregnant';
					}
				} else if (populationProperties[i].age > params.ageMenopause) {
					populationProperties[i].pregnancyStatus = 'sterile';
				}
			}
		};
		
		// Measure population size
		totalPopulationPerYear[year] = 0; 
		juvenilePopulationPerYear[year] = 0;
		adultMalePopulationPerYear[year] = 0; 
		adultFemalePopulationPerYear[year] = 0;
		for (var i = 1; i <= currentPopulation; i++) {
			if (populationProperties[i].status == 'alive') {
				totalPopulationPerYear[year] += 1;
				if (populationProperties[i].class == 'juvenile') {
					juvenilePopulationPerYear[year] += 1;
				} else if (populationProperties[i].class == 'adult' && populationProperties[i].gender == 'female' ) {
					adultFemalePopulationPerYear[year] += 1;
				} else {
					adultMalePopulationPerYear[year] +=1;
				}
			}
		};

		window.juvenilePopulationPerYearGlobal = juvenilePopulationPerYear;
		window.adultMalePopulationPerYearGlobal = adultMalePopulationPerYear;
		window.adultFemalePopulationPerYearGlobal = adultFemalePopulationPerYear;

		// Measure population aging
		agePerYear[year] = 0;
		counting = 0;
		for (var i = 1; i <= currentPopulation; i++) {
			if (populationProperties[i].status == 'alive') {
				agePerYear[year] += populationProperties[i].age;
				counting += 1;
			};
		};
		agePerYearAverage[year] = agePerYear[year]/counting;
	};

	// Measure population age profile in the last year
	counting = 0;
	for (var i = 1; i <= currentPopulation; i++) {
		if (populationProperties[i].status == 'alive') {
			ageLastYear[counting] = populationProperties[i].age;
			counting += 1;
		}
	};
	
	// Save variables to be used on further stages
	window.agingPopulation = agePerYearAverage;
	window.naturalDeath = naturalDeathPerYear;
	window.shipStrike = shipStrikeDeathPerYear;
	window.whalingWhales = whalingWhalesPerYear;
	window.strandingWhales = strandingWhalesPerYear;
	window.otherThreat = otherThreatPerYear;

};

/***********************************************
 * SIMULATION
***********************************************/
// Arrays to store all the data
var simulationTotalPopulationPerYear = [],
	simulationJuvenilePopulationPerYear = [],
	simulationFemalePopulationPerYear = [],
	simulationMalePopulationPerYear = [],
	simulationAgingPopulation = [],
	simulationNaturalDeath = [],
	simulationShipStrike = [],
	simulationWhaling = [],
	simulationStranding = [],
	simulationOtherThreat = [];

inputData(); // Necessary to know the number of simulations
for (var i = 0; i <= params.numberSimulations; i++) {
	// Execute the simulation
	SimulationYear();

	// Store the data in arrays
    simulationTotalPopulationPerYear[i] = totalPopulationPerYear;
    simulationJuvenilePopulationPerYear[i] = juvenilePopulationPerYearGlobal;
    simulationFemalePopulationPerYear[i] = adultFemalePopulationPerYearGlobal;
    simulationMalePopulationPerYear[i] = adultMalePopulationPerYearGlobal;
    simulationAgingPopulation[i] = agingPopulation;
    simulationNaturalDeath[i] = naturalDeath;
    simulationShipStrike[i] = shipStrike;
    simulationWhaling[i] = whalingWhales;
    simulationStranding[i] = strandingWhales;
    simulationOtherThreat[i] = otherThreat;
    
};

// Calculate average per year
var simulationTotalPopulationPerYearAverage = [],
	simulationJuvenilePopulationPerYearAverage = [],
	simulationFemalePopulationPerYearAverage = [],
	simulationMalePopulationPerYearAverage = [],
	simulationAgingPopulationAverage = [],
	simulationNaturalDeathAverage = [],
	simulationShipStrikeAverage = [],
	simulationWhalingAverage = [],
	simulationStrandingAverage = [],
	simulationOtherThreatAverage = [];

for (var i = 0; i <= params.numberYearsSimulated; i++) {
    simulationTotalPopulationPerYearAverage[i] = 0;
    simulationJuvenilePopulationPerYearAverage[i] = 0;
    simulationFemalePopulationPerYearAverage[i] = 0;
    simulationMalePopulationPerYearAverage[i] = 0;
    simulationAgingPopulationAverage[i] = 0;
    simulationNaturalDeathAverage[i] = 0;
    simulationShipStrikeAverage[i] = 0;
    simulationWhalingAverage[i] = 0;
    simulationStrandingAverage[i] = 0;
    simulationOtherThreatAverage[i] = 0;
    for (var j = 0; j < params.numberSimulations; j++) {
        simulationTotalPopulationPerYearAverage[i] += simulationTotalPopulationPerYear[j][i] / params.numberSimulations;
        simulationJuvenilePopulationPerYearAverage[i] += simulationJuvenilePopulationPerYear[j][i] / params.numberSimulations;
        simulationFemalePopulationPerYearAverage[i] += simulationFemalePopulationPerYear[j][i] / params.numberSimulations;
        simulationMalePopulationPerYearAverage[i] += simulationMalePopulationPerYear[j][i] / params.numberSimulations;
        simulationAgingPopulationAverage[i] += simulationAgingPopulation[j][i] / params.numberSimulations;
        simulationNaturalDeathAverage[i] += simulationNaturalDeath[j][i] / params.numberSimulations;
        simulationShipStrikeAverage[i] += simulationShipStrike[j][i] / params.numberSimulations;
        simulationWhalingAverage[i] += simulationWhaling[j][i] / params.numberSimulations;
        simulationStrandingAverage[i] += simulationStranding[j][i] / params.numberSimulations;
        simulationOtherThreatAverage[i] += simulationOtherThreat[j][i] / params.numberSimulations;
    }
};

// Calculate the standard deviation for each simulation
var totalPopulationPerSimulation = [],
	totalPopulationPerSimulationStd = [],
	simulationTotalPopulationPerYearAverageStdMax = [],
	simulationTotalPopulationPerYearAverageStdMin = [],
	simulationTotalPopulationPerYearCI = [],
	simulationTotalPopulationPerYearCIMin = [],
	simulationTotalPopulationPerYearCIMax = [];

// https://erictheise.com/mctad.js/confidence-intervals/
for (var i = 0; i <= params.numberYearsSimulated; i++) {
    totalPopulationPerSimulation[i] = [];
    for (var j = 0; j < params.numberSimulations; j++) {
        totalPopulationPerSimulation[i][j] = simulationTotalPopulationPerYear[j][i]
    };
    totalPopulationPerSimulationStd[i] = math.std(totalPopulationPerSimulation[i])
	simulationTotalPopulationPerYearCI[i] = mctad.confidenceIntervalOnTheMean(simulationTotalPopulationPerYearAverage[i], totalPopulationPerSimulationStd[i]*2, params.numberSimulations, 0.001);
	simulationTotalPopulationPerYearAverageStdMax[i] = simulationTotalPopulationPerYearAverage[i] + totalPopulationPerSimulationStd[i];
	simulationTotalPopulationPerYearAverageStdMin[i] = simulationTotalPopulationPerYearAverage[i] - totalPopulationPerSimulationStd[i];
	simulationTotalPopulationPerYearCIMin[i] = (simulationTotalPopulationPerYearCI[i])[0];
	simulationTotalPopulationPerYearCIMax[i] = (simulationTotalPopulationPerYearCI[i])[1]
};
