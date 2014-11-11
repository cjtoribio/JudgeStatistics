angular.module('JudgeStatsApp')
  .factory('Spoj', function($resource) {
    return {
    	getSubmissions : function(handle, callback) {
    		$resource('/api/spoj/submissions/:handle').query({
    			handle: handle,
    		}, callback);
		}
    };
  });