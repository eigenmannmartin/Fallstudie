Ext.define("SyncLists.view.Main", {
    extend: 'SyncLists.view.NavigationView',
    xtype:'navView',
    requires: [
        'Ext.TitleBar'
    ],
    config: {
        items: [
            {
                xtype: 'ListsView'
            }
        ]
    }
});
