angular.module('JudgeStatsApp').controller('SpojController',
		function($scope, $alert, Spoj) {
			$scope.handle = '';
			$scope.handles = [];
			$scope.submissions = {};
			$scope.veredicts = [ 'AC', 'WA', 'TLE', 'RE' ];
			$scope.submit = function() {
				alert(1);
			};
			

			$scope.config = {
					  title: '',
					  tooltips: true,
					  labels: false,
					  mouseover: function() {},
					  mouseout: function() {},
					  click: function(a,b) {
						  console.log(a);
					  },
					  legend: {
					    display: true,
					    //could be 'left, right'
					    position: 'right'
					  },
					  colors: ['#0A0','red','yellow','orange','gray'],
					  innerRadius: 0, // applicable on pieCharts, can be a percentage like '50%'
					  lineLegend: 'lineEnd' // can be also 'traditional'
					};
			
			$scope.data = {
				    series: ['AC', 'WA', 'TLE', 'RE', 'CE', '--'],
				    data: [{
				      x: "TotalProblems",
				      y: [24,54,9,4,5,6],
				      tooltip: [1,2,3,4,5]
				    }]
			};
			console.log($scope.data);
			
		});