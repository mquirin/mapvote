var appModule = angular.module('appModule', []);
appModule.controller("appController", 
function($scope) {
    $scope.allMaps = ['de_dust2', 'de_cache', 'de_cobblestone', 'de_mirage', 'de_overpass', 'de_train', 'de_inferno']
    $scope.remainingMaps = $scope.allMaps.slice();
    $scope.vetos = {}
    $scope.voteStart = function() {
        $scope.voteStarted = true;
        $scope.team_a_veto = true;
    };
    $scope.mapAvailable = function(map) {
        return _.contains($scope.remainingMaps, map);
    };
    $scope.veto = function(map, team) {
        $scope.remainingMaps = _.reject($scope.remainingMaps, function(x){return x == map});
        $scope.nextStage();
        $scope.vetos[map] = team;
    };
    $scope.nextStage = function() {
        if(_.size($scope.remainingMaps) == 3) {
            $scope.team_a_veto = false;
            $scope.team_b_veto = false;
            $scope.randStarted = true;
        }
        else if(_.size($scope.remainingMaps) % 2 == 0) {
            $scope.team_a_veto = false;
            $scope.team_b_veto = true;
        } else {
            $scope.team_a_veto = true;
            $scope.team_b_veto = false;
        }
    };
    $scope.chooseFinal = function() {
        $scope.finalMap = _.shuffle($scope.remainingMaps)[0];
    };
    $scope.isMapVeto = function(map, team) {
        return $scope.vetos[map] == team;
    };
    $scope.mapStyle = function(map) {
        if (map in $scope.vetos) {
            return {'text-decoration':'line-through'};
        }
        else {
            if ($scope.randStarted) {
                return {'font-weight':'bold'};
            }
            return {};
        }
    };
});