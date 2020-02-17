sap.ui.define(
	["sap/ui/core/UIComponent"],
	function(UIComponent){
		return UIComponent.extend("project.tasks.Component",{
			metadata:
			{
				manifest :"json"
			},
				init :function(){
					sap.ui.core.UIComponent.prototype.init.apply(this);		
			},
				destroy:function(){
					sap.ui.core.UIComponent.prototype.destroy.apply(this);
				}
		});
	}
);