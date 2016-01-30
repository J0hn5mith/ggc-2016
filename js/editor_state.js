function EditorState() {


	this.init = function() {
		editor = new Editor();
		editor.init();
	};


	this.show = function() {

		jQuery("#game_box").append("<div id=\"editor_panel\"></div>");
		jQuery("#editor_panel").append("<a id=\"editor_back\" href=\"javascript:void(0);\">Back</a>&nbsp;&nbsp;&nbsp;");
		jQuery("#editor_panel").append("<a id=\"editor_change_color\" href=\"javascript:void(0);\">Change color</a>&nbsp;&nbsp;&nbsp;");
		jQuery("#editor_panel").append("<a id=\"editor_save\" href=\"javascript:void(0);\">Save</a>&nbsp;&nbsp;&nbsp;");
		jQuery("#editor_panel").append("<a id=\"editor_print\" href=\"javascript:void(0);\">Print</a>&nbsp;&nbsp;&nbsp;");
		jQuery("#editor_panel").append("<a id=\"editor_load\" href=\"javascript:void(0);\">Load</a>&nbsp;&nbsp;&nbsp;");
		jQuery("#editor_panel").append("<a id=\"editor_clear\" href=\"javascript:void(0);\">Clear</a>&nbsp;&nbsp;&nbsp;");

		jQuery("#editor_back").click(function() {
			editor.back();
		});
		jQuery("#editor_change_color").click(function() {
			editor.promptSetColor();
		});
		jQuery("#editor_save").click(function() {
			editor.save();
		});
		jQuery("#editor_print").click(function() {
			editor.print();
		});
		jQuery("#editor_load").click(function() {
			editor.load();
		});
		jQuery("#editor_clear").click(function() {
			editor.clear();
		});

		jQuery("#game_box").after("<div id=\"editor_output_box\"><form><textarea id=\"editor_output\"></textarea></form></div>");

		mouse.registerUpArea("setPoint", 0, 20, game.WIDTH, game.HEIGHT - 20, function() {
			var pos = { x : Math.round(mouse.x), y : Math.round(mouse.y) };
			editor.addPos(pos);
		});
	};


	this.hide = function() {
		mouse.deleteUpArea("setPoint");
		jQuery("#editor_panel").remove();
		jQuery("#editor_output_box").remove();
	};


	this.update = function() {
	};


	this.draw = function() {
		this.clear();
		editor.draw();
	};


	this.clear = function() {
		c.fillStyle = "#fff";
		c.fillRect(0, 0, game.WIDTH, game.HEIGHT);
	};

}
