define(['angular','feed-mgr/categories/module-name'], function (angular,moduleName) {
        /**
         * Manages the Category Properties section of the Category Details page.
         *
         * @constructor
         * @param $scope the application model
         * @param $mdToast the toast service
         * @param {AccessControlService} AccessControlService the access control service
         * @param CategoriesService the category service
         */
        function CategoryPropertiesController($scope, $mdToast, AccessControlService, CategoriesService) {
            var self = this;

            /**
             * Indicates if the properties may be edited.
             */
            self.allowEdit = false;

            /**
             * Category data used in "edit" mode.
             * @type {CategoryModel}
             */
            self.editModel = CategoriesService.newCategory();

            /**
             * Indicates if the view is in "edit" mode.
             * @type {boolean} {@code true} if in "edit" mode or {@code false} if in "normal" mode
             */
            self.isEditable = false;

            /**
             * Indicates of the category is new.
             * @type {boolean}
             */
            self.isNew = true;
            $scope.$watch(
                function () {
                    return CategoriesService.model.id
                },
                function (newValue) {
                    self.isNew = !angular.isString(newValue)
                }
            );

            /**
             * Indicates if the properties are valid and can be saved.
             * @type {boolean} {@code true} if all properties are valid, or {@code false} otherwise
             */
            self.isValid = true;

            /**
             * Category data used in "normal" mode.
             * @type {CategoryModel}
             */
            self.model = CategoriesService.model;

            /**
             * Switches to "edit" mode.
             */
            self.onEdit = function () {
                self.editModel = angular.copy(self.model);
            };

            /**
             * Saves the category properties.
             */
            self.onSave = function () {
                var model = angular.copy(CategoriesService.model);
                model.id = self.model.id;
                model.userProperties = self.editModel.userProperties;

                CategoriesService.save(model).then(function (response) {
                    self.model = CategoriesService.model = response.data;
                    CategoriesService.reload();
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent("Saved the Category")
                            .hideDelay(3000)
                    );
                });
            };

            // Fetch the allowed actions
            AccessControlService.getAllowedActions()
                .then(function (actionSet) {
                    self.allowEdit = AccessControlService.hasAction(AccessControlService.CATEGORIES_EDIT, actionSet.actions);
                });
        }

        /**
         * Creates a directive for the Category Properties section.
         *
         * @returns {Object} the directive
         */
        function thinkbigCategoryProperties() {
            return {
                controller: "CategoryPropertiesController",
                controllerAs: 'vm',
                restrict: "E",
                scope: {},
                templateUrl: "js/feed-mgr/categories/details/category-properties.html"
            };
        }

        angular.module(moduleName).controller("CategoryPropertiesController",["$scope","$mdToast","AccessControlService","CategoriesService", CategoryPropertiesController]);
        angular.module(moduleName).directive("thinkbigCategoryProperties", thinkbigCategoryProperties);

});