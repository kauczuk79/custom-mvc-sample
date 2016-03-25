(function () {
    'use strict';
    /*global ListModel, ListView, ListController*/
    var model = new ListModel(['HTML', 'JavaScript']),
        view = new ListView(model, {
            list: document.getElementById('list'),
            addButton: document.getElementById('plusBtn'),
            delButton: document.getElementById('minusBtn')
        }),
        controller = new ListController(model, view);
    view.show();
}());
