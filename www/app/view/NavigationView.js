Ext.define('SyncLists.view.NavigationView', {
	extend: 'Ext.navigation.View',
	xtype:'NavigationView',
	config:{
		navigationBar:{
			//androidAnimation:true,
			docked:'top'
		}
	},
	rightButton: {
		xtype:'button',
		iconMask: true,
		iconCls: 'refresh',
		align:'right',
		action:'refresh'
	},
	leftButton: {
		xtype:'button',
		iconMask: true,
		iconCls: 'info',
		ui:'plain',
		align:'left',
		action:'showInfo'
	},
	initialize: function () {
		this.callParent(arguments);
		this.addBeforeListener('activeitemchange', this.updateViewButtons );
		this.updateViewButtons(this,this.getActiveItem());
	},
	updateViewButtons: function(navView, newView, oldView, opt){
		//console.log(navView,'new',newView,'old',oldView,opt,newView.hasParent());
		var navigationBar = this.getNavigationBar();

		if (!newView) return;
		
		if (navigationBar) {
			navigationBar.rightBox.removeAll();
			//navigationBar.leftBox.removeAll();
			for (var i = 0; i < navigationBar.leftBox.items.items.length; i++) {
				var btn = navigationBar.leftBox.items.items[i];
				if (btn._ui != 'back') {
					//console.log('notback',btn);
					navigationBar.leftBox.remove(btn,true);
				}
			}

			var rbtn = newView.config.rightButton;
			if ( rbtn ) navigationBar.add(rbtn);
			var lbtn = newView.config.leftButton;
			if (lbtn) navigationBar.add(lbtn);


		}
	}
});