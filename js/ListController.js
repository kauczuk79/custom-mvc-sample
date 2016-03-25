/*global define, console*/
define(function () {
    'use strict';

    console.log('ListController module was loaded');

    function ListController(model, view) {
        var that = this;

        this.modelProperty = model;
        this.viewProperty = view;

        this.viewProperty.listModified.attachListener(function (sender, args) {
            that.updateSelected(args.index);
        });
        this.viewProperty.addButtonClicked.attachListener(function () {
            that.addItem();
        });
        this.viewProperty.delButtonClicked.attachListener(function () {
            that.delItem();
        });
    }

    ListController.prototype = {
        addItem: function () {
            var item = window.prompt('Add item:', '');
            if (item) {
                this.modelProperty.addItem(item);
            }
        },

        delItem: function () {
            var index = this.modelProperty.getSelectedIndex();
            if (index !== -1) {
                this.modelProperty.removeItemAt(this.modelProperty.getSelectedIndex());
            }
        },

        updateSelected: function (index) {
            this.modelProperty.setSelectedIndex(index);
        }
    };

    return ListController;
});
