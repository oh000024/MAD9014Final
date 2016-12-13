function onClickWins(ev) {
	gTeamInfo.sort(function (a, b) {
		if (a.wins < b.wins) {
			return 1;
		}
		if (a.wins > b.wins) {
			return -1;
		}
		// a must be equal to b
		return 0;
	});
	displayStandingData();
}

function onClickLosses(ev) {
	gTeamInfo.sort(function (a, b) {
		if (a.losses < b.losses) {
			return 1;
		}
		if (a.losses > b.losses) {
			return -1;
		}
		// a must be equal to b
		return 0;
	});
	displayStandingData();
}

function onClickTies(ev) {
	gTeamInfo.sort(function (a, b) {
		if (a.ties < b.ties) {
			return 1;
		}
		if (a.ties > b.ties) {
			return -1;
		}
		// a must be equal to b
		return 0;
	});
	displayStandingData();
}
	function onClickPoints(ev) {
		gTeamInfo.sort(function (a, b) {
			if (a.points < b.points) {
				return 1;
			}
			if (a.points > b.points) {
				return -1;
			}
			// a must be equal to b
			return 0;
		});
		displayStandingData();
	}