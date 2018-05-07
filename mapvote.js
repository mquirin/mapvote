var appModule = angular.module('appModule', []);
appModule.controller("appController", 
function($scope) {
    $5on5 = ['de_inferno', 'de_mirage', 'de_overpass', 'de_cache', 'de_nuke', 'de_dust2', 'de_train'];
    $2on2 = ['de_inferno', 'de_cache', 'de_dust2', 'de_dust', 'de_aztec'];
    // $scope.allMaps = $5on5
    // $scope.remainingMaps = $scope.allMaps.slice();
    // playoffs: veto / pick / veto / random (fallback)
    $scope.vetos = {}; // map -> team
    $scope.picks = {}; // map -> team
    $scope.pick_list = [];
    $scope.action = "started";
    $scope.tournament_title = "Turnier Auswahl"
    $scope.voteStart = function() {
        $scope.team = "a";
        $scope.action = "veto";
        if($scope.tournament == "csgo-2on2") {
            $scope.allMaps = $2on2;
        }
        else if ($scope.tournament == "csgo-5on5" ||
                 $scope.tournament == "csgo-5on5-playoffs") {
            $scope.allMaps = $5on5;
        }
        $scope.remainingMaps = $scope.allMaps.slice();
    };
    $scope.mapAvailable = function(map) {
        return _.contains($scope.remainingMaps, map);
    };
    $scope.veto = function(map, team) {
        $scope.remainingMaps = _.reject($scope.remainingMaps, function(x){return x == map;});
        $scope.nextStage();
        $scope.vetos[map] = team;
    };
    $scope.pick = function(map, team) {
        $scope.remainingMaps = _.reject($scope.remainingMaps, function(x){return x == map;});
        $scope.nextStage();
        $scope.picks[map] = team;
        $scope.pick_list.push(map);
    };
    $scope.nextStage = function() {
        if($scope.tournament == "csgo-2on2" ||
           $scope.tournament == "csgo-5on5") {
            if(_.size($scope.remainingMaps) == 3) {
                $scope.action = "random";
            }
        }
        else if ($scope.tournament == "csgo-5on5-playoffs") {
            if(_.size($scope.remainingMaps) == 5) {
                $scope.action = "pick";
            }
            if(_.size($scope.remainingMaps) == 3) {
                $scope.action = "veto";
            }
            if(_.size($scope.remainingMaps) == 1) {
                $scope.pick($scope.remainingMaps[0], "default");
                $scope.action = "done";
            }
        }
        if(_.size($scope.remainingMaps) % 2 == 0) {
            $scope.team = "b";
        } else {
            $scope.team = "a";
        }
    };
    $scope.chooseFinal = function() {
        $scope.finalMap = _.shuffle($scope.remainingMaps)[0];
    };
    $scope.isMapVeto = function(map, team) {
        return $scope.vetos[map] == team;
    };
    $scope.isMapPick = function(map, team) {
        return $scope.picks[map] == team;
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
