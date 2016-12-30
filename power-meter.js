PowerMeter = {
	startingMeterLevel: 5,
	minMeterLevel: 0,
	maxMeterLevel: 100,
	currentMeterLevel: 0,
	meterSpeed: .66,
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
		PowerMeter.meterTrackerElem.style.transform = "translateX(" + PowerMeter.currentMeterLevel  + "%)";

		// if we reach the end of the meter, reverse direction
		if (PowerMeter.currentMeterLevel > PowerMeter.maxMeterLevel) {
			PowerMeter.meterDir = "dec";
		} else if (PowerMeter.currentMeterLevel < PowerMeter.minMeterLevel){
			PowerMeter.currentMeterLevel = 0;
			PowerMeter.setAndCheckAccuracy();
		}

		// If the meter is still running, keep animating
		if (PowerMeter.meterStarted) {
			window.requestAnimationFrame(PowerMeter.incrementMeter)
		}
	},

	clickHandler: function(){
		if (!PowerMeter.meterStarted && ! PowerMeter.meterAccSet) {
			PowerMeter.meterStarted = true;
			console.log("Start Meter");
			PowerMeter.incrementer = window.requestAnimationFrame(PowerMeter.incrementMeter); // run 60 times/second
			PowerMeter.incrementMeter();
		} else if (!PowerMeter.meterPowerSet) {
			PowerMeter.meterPowerSet = true;
			PowerMeter.chosenPower = PowerMeter.currentMeterLevel;
			PowerMeter.powerTrackerElem.style.left = PowerMeter.chosenPower + "%";
			PowerMeter.powerTrackerElem.style.opacity = "1";
			console.log("Power Set: " + PowerMeter.chosenPower);
		} else if (!PowerMeter.meterAccSet) {
			PowerMeter.setAndCheckAccuracy();
			console.log("Accuracy Set: " + PowerMeter.chosenAcc);
		}
	},

	setAndCheckAccuracy: function() {
		PowerMeter.meterAccSet = true;
		PowerMeter.meterStarted = false;
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
