/*global define, console*/
define(function () {
    'use strict';

    console.log('Event module was loaded');

    function Event(sender) {
        this.senderProperty = sender;
        this.listenersProperty = [];
    }

    Event.prototype = {
        attachListener: function (listener) {
            this.listenersProperty.push(listener);
        },

        notify: function (args) {
            var index;
            for (index = 0; index < this.listenersProperty.length; index += 1) {
                this.listenersProperty[index](this.senderProperty, args);
            }
        }
    };
    return Event;
});
