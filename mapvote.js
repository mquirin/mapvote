var appModule = angular.module('appModule', []);
appModule.controller("appController", 
function($scope) {
    $5on5 = ['de_inferno', 'de_mirage', 'de_overpass', 'de_cache', 'de_nuke', 'de_dust2', 'de_train']
    $2on2 = ['de_inferno', 'de_cache', 'de_dust2', 'de_dust', 'de_aztec']
    // $scope.allMaps = $5on5
    // $scope.remainingMaps = $scope.allMaps.slice();
    $scope.vetos = {}
    $scope.voteStart = function() {
        $scope.voteStarted = true;
        $scope.team_a_veto = true;
        if($scope.tournament == "csgo-2on2") {
            $scope.allMaps = $2on2
        }
        else if ($scope.tournament == "csgo-5on5") {
            $scope.allMaps = $5on5
        }
        $scope.remainingMaps = $scope.allMaps.slice();
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
