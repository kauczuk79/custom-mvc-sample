/*global define*/
define(function (require) {
    'use strict';

    var ListModel = require('./ListModel'),
        ListView = require('./ListView'),
        ListController = require('./ListController'),

        model = new ListModel(['HTML', 'JavaScript']),
        view = new ListView(model, {
            list: document.getElementById('list'),
            addButton: document.getElementById('plusBtn'),
            delButton: document.getElementById('minusBtn')
        }),
        controller = new ListController(model, view);
    view.show();
});
