angular.module('JudgeStatsApp').
  filter('fromNow', function() {
    return function(date) {
      return moment(date).fromNow();
    };
  })
  .filter('shortDateTime', function(){
	  return function(date) {
		  return moment(date).format("L LT");
	  };
  });