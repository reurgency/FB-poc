'use strict';
/* App Controllers */
function HomeController($scope, $location, Facebook) {
    $scope.showLogin = false;
    $scope.friendListId = '';
    $scope.friendType = '';
    $scope.friends = [];
    $scope.pageSize = 5;
    $scope.pageOffset = 0;
    $scope.showGetMore = false;

    $scope.statuses = ['Initializing Facebook and Checking Users Login Status'];
    Facebook.init();

    $scope.loginUser = function () {
        $scope.login = Facebook.login();
        $scope.login.then(function (result) {
            $scope.statuses.push('User is logged-in');
            console.log($scope.statuses);
            $scope.showLogin = false;
            $scope.getUserDetails();
            $scope.getFriendLists();
        }, function (error) {
            $scope.genericFaultHandler(error);
        });
    }

    $scope.loginStatus = Facebook.getLoginStatus();
    $scope.loginStatus.then(function (result) {
        $scope.statuses.push('User is connected');
        $scope.accessToken = result.authResponse.accessToken;
        console.log($scope.statuses);
        $scope.getUserDetails();
        $scope.getFriendLists();
    }, function (response) {
        if (!response.error) {
            $scope.showLogin = true;
        } else {
            $scope.genericFaultHandler(error);
        }
    });

    $scope.getUserDetails = function () {
        $scope.statuses.push('Getting User Details');
        console.log($scope.statuses);
        $scope.loggedInUser = Facebook.getLoggedInUser();
        $scope.loggedInUser.then(function (result) {
            $scope.statuses.push('Fetched Logged In User: ' + result.name);
            console.log($scope.statuses);
        }, function (error) {
            $scope.genericFaultHandler(error);
        });
    }
    $scope.getFriendLists = function () {
        $scope.statuses.push('Getting Friend Lists');
        console.log($scope.statuses);
        $scope.friendLists = Facebook.getFriendLists();
        $scope.friendLists.then(function (result) {
            $scope.statuses.push('Fetched ' + result.length + ' friend lists');
            console.log($scope.statuses);
            $scope.friendLists = result.sort(sortBy_name);
            $scope.setFriendsToShow('Close Friends');
        }, function (error) {
            $scope.genericFaultHandler(error);
        });
    }

    $scope.friendSelected = function () {
        $scope.statuses.push('Friend Selected: ' + this.friend.name);
        console.log($scope.statuses);
        $scope.getFriendDetails(this.friend);
    }

    $scope.getFriendDetails = function (friend) {
        $scope.statuses.push('Getting Details For ' + friend.name);
        console.log($scope.statuses);
        $scope.selectedFriend = Facebook.getSelectedFriendDetails(friend.id);
        $scope.selectedFriend.then(function (result) {
            $scope.statuses.push('Fetched details');
            console.log($scope.statuses);
        }, function (error) {
            $scope.genericFaultHandler(error);
        });
    }

    $scope.setFriendsToShow = function(type){
        if (type != $scope.friendType) {
            $scope.selectedFriend = null;
            $scope.pageOffset = 0;
            $scope.friends = [];
            $scope.friendType = type;
        }
        if (!this.list) {
            $scope.defaultFriendListObject = jQuery.grep($scope.friendLists, function (e) { return e.name == $scope.friendType; });
            $scope.friendListId = $scope.defaultFriendListObject[0].id;
        } else {
            $scope.friendListId = this.list.id;
        }
        $scope.statuses.push('Getting Friends on list ' + $scope.friendType);
        console.log($scope.statuses);
        $scope.getFriends = Facebook.getFriends($scope.friendListId,$scope.pageSize,$scope.pageOffset);
        $scope.getFriends.then(function (result) {
            $scope.statuses.push('Fetched a page of ' + result.data.length + ' friends');
            console.log($scope.statuses);
            $scope.friends = $scope.friends.concat(result.data);
            $scope.friends = $scope.friends.sort(sortBy_name);
            $scope.pagingInfo = result.paging;
        }, function (error) {
            $scope.genericFaultHandler(error);
        });
    }

    $scope.showMoreFriends = function () {
        $scope.pageOffset += $scope.pageSize;
        $scope.setFriendsToShow($scope.friendType);
    }

    $scope.showToken = function () {
        alert($scope.accessToken);
    }

    $scope.genericFaultHandler = function (error) {
        alert(error.type+': '+error.message);
    }
}