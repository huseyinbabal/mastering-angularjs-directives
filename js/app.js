angular.module("masteringAngularJsDirectives", [])
    .controller('bookCtrl', function($scope) {
        $scope.bookData = {
            link: "images/a_game_of_thrones_book_cover.jpg",
            title: "Game of Thrones",
            description: "Here is the first volume in George R. R. Martin’s magnificent cycle of novels that includes A Clash of Kings and A Storm of Swords.",
            rating: ""
        }

        $scope.atMessage = "This is a message generated by using @ scope"

        $scope.likeFunction = function(star) {
            alert("I like the book!, and gave " + star + " star.")
        }

        $scope.books = [
            "A Clockwork Orange",
            "A Game of Thrones",
            "Fifty Shades of Gray",
            "The Host",
            "Hackers and Painters",
            "Star Wars"
        ]
    })
    .controller('MouseClickedCtrl', function($element) {
        var mouseClicked = this;

        mouseClicked.bookType = null;

        mouseClicked.setBookType = function(type) {
            mouseClicked.bookType = type
        };

        $element.bind("click", function() {
            alert("Typeof book: " + mouseClicked.bookType + " sent for statistical analysis!");
        })
    })
    .directive('book', function() {
        return {
            restrict: 'E',
            scope: {
                data: '='
            },
            templateUrl: 'templates/book-widget.html'
        }
    })
    .directive('restricted', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                // Some auth check function
                var isAuthorized = true;
                if (!isAuthorized) {
                    element.css('display', 'none');
                }
            }
        }
    })
    .directive('restricted', function() {
        return {
            restrict: 'C',
            link: function(scope, element, attrs) {
                // Some auth check function
                var isAuthorized = true;
                if (!isAuthorized) {
                    element.css('display', 'none');
                }
            }
        }
    })
    .directive("comment", function() {
        return {
            restrict: 'M',
            template: '<textarea class="comment"></textarea>',
            replace: true
        }
    })
    .directive("itemIsolated", function() {
        return {
            restrict: 'E',
            scope: {},
            link: function(scope, element, attrs) {
                scope.name = attrs.name;
            },
            template: '<div><strong>Name:</strong> {{name}} <strong>Select Amount:</strong> <select name="count" ng-model="count"><option value="1">1</option><option value="2">2</option></select> <strong>Selected Amount:</strong> {{count}}</div>'
        }
    })
    .directive("itemNotIsolated", function() {
        return {
            restrict: 'E',
            link: function(scope, element, attrs) {
                scope.name = attrs.name;
            },
            template: '<div><strong>Name:</strong> {{name}} <strong>Select Amount:</strong> <select name="count" ng-model="count"><option value="1">1</option><option value="2">2</option></select> <strong>Selected Amount:</strong> {{count}}</div>'
        }
    })
    .directive("notification", function() {
        return {
            restrict: 'E',
            scope: {
                message: '@'
            },
            replace: true,
            template: '<div class="alert alert-info">{{message}}</div>'
        }
    })
    .directive("bookComment", function() {
        return {
            restrict: 'E',
            scope: {
                text: '='
            },
            template: '<input type="text" ng-model="text"/>'
        }
    })
    .directive("likeBook", function() {
        return {
            restrict: 'E',
            scope: {
                like: '&'
            },
            template: '<input type="text" ng-model="starCount" placeholder="Enter rate count here"/><br/>' +
            '<input type="button" ng-click="like({star: starCount})" value="Like"/>'
        }
    })
    .directive('mouseClicked', function() {
        return {
            restrict: 'E',
            scope: {},
            controller: "MouseClickedCtrl as mouseClicked"
        }
    })
    .directive('ebook', function() {
        return {
            require: "mouseClicked",
            link: function(scope, element, attrs, mouseClickedCtrl) {
                mouseClickedCtrl.setBookType("EBOOK");
            }
        }
    })
    .directive('magazine', function() {
        return {
            require: "mouseClicked",
            link: function(scope, element, attrs, mouseClickedCtrl) {
                mouseClickedCtrl.setBookType("MAGAZINE");
            }
        }
    })
    .directive('customDebug', function($compile) {
        return {
            terminal: true,
            link: function(scope, element) {
                var currentElement = element.clone();
                currentElement.removeAttr("custom-debug");
                var newElement = $compile(currentElement)(scope);
                element.attr("style", "border: 1px solid red");
                element.after(newElement);
            }
        }
    })
    .directive('booktest', function() {
        return {
            restrict: 'E',
            scope: {
                title: '@'
            },
            replace: true,
            template: '<div>{{title}}</div>',
            link: function(scope, element, attrs) {
                element.bind("click", function() {
                    console.log("book viewed!");
                    scope.viewed = true;
                });
            }
        }
    });