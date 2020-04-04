$(function() {
    $( "#editArea" ).sortable({
        revert: false
      });
    //复制并拖动目标
    $( "[name^=uiChangeArea_]" ).draggable({
    	connectToSortable: "#editArea",
    	 opacity: 0.7,
        helper: "clone"
        
    });
    //指定放置区域
    $( "#editArea" ).droppable({
    	 greedy: true,
        drop: function( event, ui ) {
        	ui.draggable.children("pre[name=showuicode]").children().appendTo( this );
        	ui.draggable.remove();
        }
      });
  });