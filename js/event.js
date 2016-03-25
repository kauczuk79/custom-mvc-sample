(function (scope) {
    'use strict';

    scope.Event = function (sender) {
        this.senderProperty = sender;
        this.listenersProperty = [];
    };

    scope.Event.prototype = {
        attach: function (listener) {
            this.listenersProperty.push(listener);
        },

        notify: function (args) {
            var index;
            for (index = 0; index < this.listenersProperty.length; index += 1) {
                this.listenersProperty[index](this.senderProperty, args);
            }
        }
    };
}(window));
