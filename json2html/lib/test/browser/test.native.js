
describe("native", function() {
  describe("#json2html()", function() {
    
    //=================== jQuery Specific Options =====================
    
    //Test Method Append
    $("body").append("<div id='method-append'><li>monica</li></div>");
    it("OPTIONS - Append", function() {
        chai.assert.equal(document.getElementById("method-append").json2html({"name":"dorian"},{"<>":"li","html":"${name}"}).innerHTML,"<li>monica</li><li>dorian</li>");
    });
    
    //Test Method Append
    $("body").append("<div id='method-prepend'><li>monica</li></div>");
    it("OPTIONS - Prepend", function() {
        chai.assert.equal(document.getElementById("method-prepend").json2html({"name":"dorian"},{"<>":"li","html":"${name}"},{"method":"prepend"}).innerHTML,"<li>dorian</li><li>monica</li>");
    });
    
    //Set Local Components
    $("body").append("<div id='set-components'></div>");
    it("OPTIONS - Components", function() {
        document.getElementById("set-components").json2html({},{"[]":"test"},{"components":{"test":{"<>":"div"}}});
        chai.assert.equal( $("#set-components").html(), "<div></div>");
    });
    
    //Set Data
    $("body").append("<div id='set-data'></div>");
    it("OPTIONS - Data", function() {
        document.getElementById("set-data").json2html({},{"<>":"div","html":function(obj,index,data){return(data);}},{"data":"test"});
        chai.assert.equal( $("#set-data").html(), "<div>test</div>");
    });
    
    //=================== Native Events =====================
    
    //Click
    $("body").append("<div id='jquery-event-click'></div>");
    it("EVENTS - onclick", function() {
        
        //Create div
        document.getElementById("jquery-event-click").json2html({"data":"clicked"},{"<>":"div","onclick":function(e){e.event.currentTarget.innerText = e.obj.data;}});
        
        //Trigger click
        $("#jquery-event-click > div").click();
        
        //Test
        chai.assert.equal( $("#jquery-event-click > div ").html(), "clicked");
    });
    
    //Ready
    $("body").append("<div id='jquery-event-ready'></div>");
    it("EVENTS - onready", function() {
        
        //Create object
        document.getElementById("jquery-event-ready").json2html({},{"<>":"div","onready":function(e){e.event.currentTarget.innerText = "ready";}});
        
        //Test
        chai.assert.equal( $("#jquery-event-ready > div ").html(), "ready");
    });
    
    //Multiple Events (ready and click)
    $("body").append("<div id='jquery-event-multiple'></div>");
    it("EVENTS - multiple", function() {
        
        //Create object
        document.getElementById("jquery-event-multiple").json2html({},{"<>":"div","onclick":function(e){e.event.currentTarget.querySelector("i").innerText = "clicked";},"onready":function(e){e.event.currentTarget.querySelector("span").innerText = "ready";},"html":[{"<>":"span"},{"<>":"i"}]});
        
        //Trigger click
        $("#jquery-event-multiple > div").click();
        
        var output = $("#jquery-event-multiple > div > span ").text() + " " + $("#jquery-event-multiple > div > i ").text();
        
        //Test
        chai.assert.equal( output, "ready clicked");
    });
  });
});  