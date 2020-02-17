sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/Dialog",
	"sap/m/Text",
	"sap/m/Button",
	"sap/m/DatePicker",
	"sap/m/Input"
], function(Controller,Dialog,Text,Button,DatePick,Input) {
	"use strict";

	return Controller.extend("project.tasks.controller.myTasks", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf project.tasks.view.myTasks
		 */
		//	onInit: function() {
		//
		//	},
		oPopUpTask: null,
		onAddTask: function() {
			var that = this;
			var oView = this.getView();
			var oDialogController = {
				onCancel: function() {
					that.oPopUpTask.close();
				},

				onSave:function(){
					var date = that.getView().byId("idDate").getValue();
					that.getView().byId("idDate").setValue("");
					var assignee = that.getView().byId("idAssignee").mProperties.selectedKey;
					that.getView().byId("idAssignee").setSelectedKey("");
					var title = that.getView().byId("idTitle").getValue();
					that.getView().byId("idTitle").setValue("");
					var description = that.getView().byId("idDes").getValue();
					that.getView().byId("idDes").setValue("");
					var dueDate = that.getView().byId("idDue").getValue();
					that.getView().byId("idDue").setValue("");
					var stat = that.getView().byId("idStat");
					var sKey = stat.mProperties.selectedKey;
					if(sKey === "C"){
						var statIcon = "sap-icon://complete";
					}else{
						 statIcon = "sap-icon://pending";
					}
					that.getView().byId("idStat").setValue("");
					var oTabRow = new sap.m.ColumnListItem({
							type : "Active",
							visible : true,
							cells:[
								new DatePick({value : date, valueFormat :"dd/MM/yyyy", editable : false}),
								new Input({value:assignee,editable : false}),
								new Input({value:title,editable : false}),
								new Input({value:description,editable : false}),
								new DatePick({value:dueDate,valueFormat :"dd.MM.yyyy", editable : false}),
								new sap.m.ToggleButton({icon : statIcon, press: function(oEvnt){
									var oSource = oEvnt.getSource();
        							var bPressed = oSource.getPressed();
									if(bPressed) {
										oSource.setIcon("sap-icon://complete");
									}else{
										oSource.setIcon("sap-icon://pending");
									}	
								}})
							]
					});
					var oTable = that.getView().byId("idTab");
					oTable.addItem(oTabRow);
					that.oPopUpTask.close();
				}
			};
			var currDate = new Date();
			var month = currDate.getMonth() + 1;
			var day = currDate.getDate();
			var year = currDate.getFullYear();
			var today = day + '/' + month + '/' + year;
			
			if (!this.oPopUpTask) {
				this.oPopUpTask = new sap.ui.xmlfragment(oView.getId(),"project.tasks.fragments.popUpTask",oDialogController);
				this.getView().addDependent(this.oPopUpTask);
			}
			this.getView().byId("idDate").setValue(today);
			this.getView().byId("idDue").setValue(today);
			this.oPopUpTask.open();
		},

		onDeleteTask: function() {
			var that = this;
			var dialog = new Dialog({
				title: "Confirm",
				type: "Message",
				content: new Text({ text: "Confrim Deletion!!!" }),
				beginButton: new Button({
					text: "Delete",
					press: function () {
						that.deleteRow();
						dialog.close();
					}
				}),
				endButton: new Button({
					text: "Cancel",
					press: function () {
						dialog.close();
					}
				}),
				afterClose: function() {
					dialog.destroy();
				}
			});
			dialog.open();
		},

		deleteRow: function(){
			var oTab = this.getView().byId("idTab");
			var oTabSelect = oTab.getSelectedItems();
			var len = oTabSelect.length;
			for(var i= 0; i <= len; i++){
				oTab.removeItem(oTabSelect[i]);
			}
		},
		onEditRow:function(oEvent){
			debugger;
/*			var oTab = this.getView().byId("idTab");
			var oTabSelect = oTab.getSelectedItems();
			var len = oTabSelect.length;
			for(var i= 0; i <= len; i++){
				oTabSelect.getCells(oTabSelect[i]);
			}*/
			var oItem = oEvent.getSource().getParent();
          var oTable = this.getView().byId("idTab");
          var oIndex = oTable.indexOfItem(oItem);
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf project.tasks.view.myTasks
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf project.tasks.view.myTasks
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf project.tasks.view.myTasks
		 */
		//	onExit: function() {
		//
		//	}

	});

});