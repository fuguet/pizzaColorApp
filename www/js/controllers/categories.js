angular.module("categories", [])
    .controller("CategoriesCtrl", function(
        $scope,
        $state,
        $stateParams,
        sharedUtils,
        categoria
    ) {
        var initialice = function() {
            sharedUtils.showLoading();
            categoria
                .getCategorias()
                .success(function(response) {
                    $scope.categories = response.data;
                    sharedUtils.hideLoading();
                })
                .error(function(err) {
                    sharedUtils.hideLoading();
                });
        };

        initialice();

    });