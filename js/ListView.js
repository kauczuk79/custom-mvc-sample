/*global define, console*/
define(function (require) {
    'use strict';

    console.log('ListView module was loaded');

    var Event = require('./Event');

    function ListView(model, elements) {
        var that = this;

        this.modelProperty = model;
        this.elementsProperty = elements;

        this.listModified = new Event(this);
        this.addButtonClicked = new Event(this);
        this.delButtonClicked = new Event(this);

        this.modelProperty.itemAdded.attach(function () {
            that.rebuildList();
        });
        this.modelProperty.itemRemoved.attach(function () {
            that.rebuildList();
        });

        this.elementsProperty.list.onchange = function (e) {
            that.listModified.notify({
                index: e.target.selectedIndex
            });
        };
        this.elementsProperty.addButton.onclick = function () {
            that.addButtonClicked.notify();
        };
        this.elementsProperty.delButton.onclick = function () {
            that.delButtonClicked.notify();
        };
    }

    ListView.prototype = {
        show: function () {
            this.rebuildList();
        },

        rebuildList: function () {
            var list = this.elementsProperty.list,
                items = this.modelProperty.getItems(),
                key,
                option;
            list.innerHTML = '';
            for (key in items) {
                if (items.hasOwnProperty(key)) {
                    option = document.createElement('option');
                    option.text = items[key];
                    list.add(option);
                }
            }
            this.modelProperty.setSelectedIndex(-1);
        }
    };

    return ListView;
});
