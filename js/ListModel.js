/*global define, console*/
define(function (require) {
    'use strict';

    var Event = require('./Event');

    console.log('ListController module was loaded');

    function ListModel(items) {
        this.itemsProperty = items;
        this.selectedIndexProperty = -1;

        this.itemAdded = new Event(this);
        this.itemRemoved = new Event(this);
        this.selectedIndexChanged = new Event(this);
    }

    ListModel.prototype = {
        getItems: function () {
            return [].concat(this.itemsProperty);
        },

        addItem: function (item) {
            this.itemsProperty.push(item);
            this.itemAdded.notify({
                item: item
            });
        },

        removeItemAt: function (index) {
            var item = this.itemsProperty[index];
            this.itemsProperty.splice(index, 1);
            this.itemRemoved.notify({
                item: item
            });
            if (index === this.selectedIndexProperty) {
                this.setSelectedIndex(-1);
            }
        },

        getSelectedIndex: function () {
            return this.selectedIndexProperty;
        },

        setSelectedIndex: function (index) {
            var previousIndex = this.selectedIndexProperty;
            this.selectedIndexProperty = index;
            this.selectedIndexChanged.notify({
                previous: previousIndex
            });
        }
    };
    return ListModel;
});
