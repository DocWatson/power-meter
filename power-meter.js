PowerMeter = {
	startingMeterLevel: 5,
	minMeterLevel: 0,
	maxMeterLevel: 100,
	currentMeterLevel: 0,
	meterSpeed: .85,
	meterDir: "inc",
	incrmenter: undefined,
	accTolerance: 3,

	meterTargetElem: undefined,
	meterValueElem: undefined,
	meterTrackerElem: undefined,
	powerTrackerElem: undefined,
	meterStarted: false,
	meterPowerSet: false,
	meterAccSet: false,

	chosenPower: 0,
	chosenAcc: 0,

	incrementMeter: function(){
		increment = (PowerMeter.meterDir == "inc" ? 1 : -1);
		PowerMeter.currentMeterLevel += (increment * PowerMeter.meterSpeed);
		PowerMeter.meterValueElem.innerText = PowerMeter.currentMeterLevel;
		PowerMeter.meterTrackerElem.style.left = PowerMeter.currentMeterLevel + "%";
		if (PowerMeter.currentMeterLevel > PowerMeter.maxMeterLevel) {
			PowerMeter.meterDir = "dec";
		} else if (PowerMeter.currentMeterLevel < PowerMeter.minMeterLevel){
			PowerMeter.destroyIncrementer();
		}
	},

	clickHandler: function(){
		if (!PowerMeter.meterStarted) {
			PowerMeter.meterStarted = true;
			console.log("Start Meter");
			PowerMeter.incrementer = setInterval(PowerMeter.incrementMeter, 17); // run 60 times/second
			PowerMeter.incrementMeter();
		} else if (!PowerMeter.meterPowerSet) {
			PowerMeter.meterPowerSet = true;
			PowerMeter.chosenPower = PowerMeter.currentMeterLevel;
			PowerMeter.powerTrackerElem.style.left = PowerMeter.currentMeterLevel + "%"
			PowerMeter.powerTrackerElem.style.opacity = "1";
			console.log("Power Set: " + PowerMeter.chosenPower);
		} else if (!PowerMeter.meterAccSet) {
			PowerMeter.setAndCheckAccuracy();
			console.log("Accuracy Set: " + PowerMeter.chosenAcc);
		}
	},

	setAndCheckAccuracy: function() {
		PowerMeter.meterAccSet = true;
		currAcc = PowerMeter.currentMeterLevel;
		PowerMeter.chosenAcc = currAcc;
		upperAccBound = PowerMeter.startingMeterLevel + PowerMeter.accTolerance;
		lowerAccBound = PowerMeter.startingMeterLevel - PowerMeter.accTolerance;

		if (currAcc < upperAccBound && currAcc > lowerAccBound) {
			if (Math.floor(currAcc) == PowerMeter.startingMeterLevel) {
				alert("Great shot!");
			} else {
				alert("Good shot!");
			}
		} else {
			alert("Awful shot!");
		}
		PowerMeter.destroyIncrementer();
	},

	destroyIncrementer: function() {
		clearInterval(PowerMeter.incrementer);
	},

	resetMeter: function(){
		PowerMeter.currentMeterLevel = PowerMeter.startingMeterLevel;
		PowerMeter.meterDir = "inc";
		PowerMeter.meterStarted = false;
		PowerMeter.meterPowerSet = false;
		PowerMeter.meterAccSet = false;
	},

	init: function(){
		PowerMeter.meterTargetElem = document.getElementById("meterTarget");
		PowerMeter.meterValueElem = document.getElementById("meterValue");
		PowerMeter.meterTrackerElem = document.getElementById("meterTracker");
		PowerMeter.powerTrackerElem = document.getElementById("powerTracker");
		PowerMeter.meterTargetElem.addEventListener("click", PowerMeter.clickHandler);
	}
}

PowerMeter.init();
