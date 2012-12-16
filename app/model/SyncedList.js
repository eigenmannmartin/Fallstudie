Ext.define('SyncLists.model.SyncedList', {
    extend: 'Ext.data.Model',

    config: {
			fields: ['list_name'],
			//identifier : 'uuid',
			identifier: 'sequential',
			proxy: {
				type: 'rest',
				url : '/api/SL/List/',
				reader: {
					type: 'json',
					rootProperty: 'objects'
				}
			}
    }
});

SyncLists.model.SyncedList.offlineStore = Ext.create('Ext.data.Store', {
    model: 'SyncLists.model.SyncedList',
	storeId: 'SyncedList-offline',
	autoLoad: true,
	//autoSync: true,
	// sorters: [{
	// 	property: 'expiry_date',
	// 	direction: 'DESC'
	// }],
});
