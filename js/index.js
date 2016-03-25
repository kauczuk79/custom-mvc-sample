function Event(sender) {
    this._sender = sender;
    this._listeners = [];
}

Event.prototype = {
    attach: function (listener) {
        this._listeners.push(listener);
    },

    notify: function (args) {
        var index;
        for (index = 0; index < this._listeners.length; index += 1) {
            this._listeners[index](this._sender, args);
        }
    }
};

function ListModel(items) {
    this._items = items;
    this._selectedIndex = -1;

    this.itemAdded = new Event(this);
    this.itemRemoved = new Event(this);
    this.selectedIndexChanged = new Event(this);
}

ListModel.prototype = {
    getItems: function () {
        return [].concat(this._items);
    },

    addItem: function (item) {
        this._items.push(item);
        this.itemAdded.notify({
            item: item
        });
    },

    removeItemAt: function (index) {
        var item = this._items[index];
        this._items.splice(index, 1);
        this.itemRemoved.notify({
            item: item
        });
        if (index === this._selectedIndex) {
            this.setSelectedIndex(-1);
        }
    },

    getSelectedIndex: function () {
        return this._selectedIndex;
    },

    setSelectedIndex: function (index) {
        var previousIndex = this._selectedIndex;
        this._selectedIndex = index;
        this.selectedIndexChanged.notify({
            previous: previousIndex
        });
    }
};

function ListView(model, elements) {
    var that = this;

    this._model = model;
    this._elements = elements;

    this.listModified = new Event(this);
    this.addButtonClicked = new Event(this);
    this.delButtonClicked = new Event(this);

    this._model.itemAdded.attach(function () {
        that.rebuildList();
    });
    this._model.itemRemoved.attach(function () {
        that.rebuildList();
    });

    this._elements.list.onchange = function (e) {
        that.listModified.notify({
            index: e.target.selectedIndex
        });
    };
    this._elements.addButton.onclick = function () {
        that.addButtonClicked.notify();
    };
    this._elements.delButton.onclick = function () {
        that.delButtonClicked.notify();
    };
}

ListView.prototype = {
    show: function () {
        this.rebuildList();
    },

    rebuildList: function () {
        var list = this._elements.list,
            items = this._model.getItems(),
            key;
        list.innerHTML = '';
        for (key in items) {
            if (items.hasOwnProperty(key)) {
                var option = document.createElement('option');
                option.text = items[key];
                list.add(option);
            }
        }
        this._model.setSelectedIndex(-1);
    }
};

function ListController(model, view) {
    var that = this;

    this._model = model;
    this._view = view;

    this._view.listModified.attach(function (sender, args) {
        that.updateSelected(args.index);
    });
    this._view.addButtonClicked.attach(function () {
        that.addItem();
    });
    this._view.delButtonClicked.attach(function () {
        that.delItem();
    });
}

ListController.prototype = {
    addItem: function () {
        var item = window.prompt('Add item:', '');
        if (item) {
            this._model.addItem(item);
        }
    },

    delItem: function () {
        var index = this._model.getSelectedIndex();
        if (index !== -1) {
            this._model.removeItemAt(this._model.getSelectedIndex());
        }
    },

    updateSelected: function (index) {
        this._model.setSelectedIndex(index);
    }
};

window.onload = function () {
    var model = new ListModel(['HTML', 'JavaScript']),
        view = new ListView(model, {
            list: document.getElementById('list'),
            addButton: document.getElementById('plusBtn'),
            delButton: document.getElementById('minusBtn')
        }),
        controller = new ListController(model, view);
    view.show();
};
