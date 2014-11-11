angular.module('JudgeStatsApp').
  filter('filterSearch', function() {
    return function(arr, search) {
      return arr.filter(function(e){
    	  if(search == null)return true;
    	  if(search.ver != null && search.ver != '!!' && e.ver != search.ver)return false;
    	  if(search.prob != null && search.prob != '' && !e.prob.startsWith(search.prob))return false;
    	  return true;
      });
    };
  });