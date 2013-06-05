'use strict';
// Register services
angular.module('facebookPOC.services', [])
    .factory('Facebook', function ($rootScope, $q) {
        return {
            init: function () {

                FB.init({
                    appId: '138449529660928',
                    status: true,
                    cookie: true,
                    xfbml: true
                })
                return true;
            },
            login: function () {

                var deferred = $q.defer();
                
                FB.login(function (response) {
                    setTimeout(function () {
                        $rootScope.$apply(function () {
                            if (!response.error) {
                                deferred.resolve(response);
                            } else {
                                deferred.reject(response.error);
                            }
                        });
                    }, 1);
                });
                 
                return deferred.promise;
                
            },
            getLoginStatus: function () {

                var deferred = $q.defer();

                FB.getLoginStatus(function (response) {
                    setTimeout(function () {
                        $rootScope.$apply(function () {
                            if (!response.error && response.status === 'connected') {
                                deferred.resolve(response);
                            } else {
                               deferred.reject(response);
                            }
                        });
                    }, 1);
                });
                 
                return deferred.promise;
                
            },
            getLoggedInUser: function () {

                var deferred = $q.defer();

                FB.api('/me', function (response) {
                    setTimeout(function () {
                        $rootScope.$apply(function () {
                            if (!response.error) {
                                deferred.resolve(response);
                            } else {
                                deferred.reject(respnce.error);
                            }
                        });
                    }, 1);
                });

                return deferred.promise;
                
            },
            getFriendLists: function() {
                var deferred = $q.defer();

                FB.api('/me/friendlists', function (response) {
                    setTimeout(function () {
                        $rootScope.$apply(function () {
                            if (!response.error) {
                                deferred.resolve(response.data);
                            } else {
                                deferred.reject(response.error);
                            }
                        });
                    }, 1);
                });

                return deferred.promise; 
            },
            getFriends: function (listId,limit,offset) {

                var deferred = $q.defer();
                var apiCall = '/' + listId + '/members?fields=id,name,picture&limit=' + limit + '&offset=' + offset;
                
                FB.api(apiCall, function (response) {
                    setTimeout(function () {
                        $rootScope.$apply(function () {
                            if (!response.error) {
                                deferred.resolve(response);
                            } else {
                                deferred.reject(response.error);
                            }
                        });
                    }, 1);
                });

                return deferred.promise;
                
            },
            getSelectedFriendDetails: function (friendID) {

                var deferred = $q.defer();

                FB.api('/' + friendID + '?fields=username,id,first_name,last_name,gender,locale,name,link,picture.width(150)', function (response) {
                    setTimeout(function () {
                        $rootScope.$apply(function () {
                            if (!response.error) {
                                deferred.resolve(response);
                            } else {
                                deferred.reject(response.error);
                            }
                        });
                    }, 1);
                });
                
                return deferred.promise;
            }
        }
    });