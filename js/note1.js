//brain
$(document).ready(function (){
var noote;

  
    
if (localStorage.getItem("noote")) {
        noote=JSON.parse(localStorage.getItem("noote"));
    }else{
        noote=[];
	//offline storage
    localStorage.setItem("noote" ,JSON.stringify(noote));
    };
    
 
    var shownote=function(){
	//erasing HTML
	$("#Notelist").html(" ");
                //inserting
        for(var i=0;i<noote.length;i++){
        addnoote(noote[i]);
        } ;  
                };
	
	var addnoote=function(DATA){
		var homepageelement='<li> <a href="#note'+escapeHTML(DATA.id)+'" data-icon="forward">'+escapeHTML(DATA.Notename)+'</a></li>';
                var notepage='<div data-role="page" id="note'+escapeHTML(DATA.id)+'"><div data-role="header"><h1>'+escapeHTML(DATA.Notename)+'</h1>\
                <a href="" data-rel="back">Back</a>\
                <a href="#delete'+escapeHTML(DATA.id)+'" data-icon="delete" class="ui-btn-right delete_button">Delete</a>\
                </div><div data-role="content" class="pagearea">\
                    <div data-theme="b">\
                    <label class="n">Note Type</label><p class="ntype">'+escapeHTML(DATA.NoteType)+'</p><hr>\
                <div class=ediv>\
		    <label>Created Date</label><p>'+escapeHTML(DATA.CreatedDate)+'</p>\
                    <label>Event/Till Date</label><p>'+escapeHTML(DATA.EventDate)+'</p>\
                    <label>Event Time</label><p>'+escapeHTML(DATA.EventTime)+'</p>\
                    <label style="display:none;">Event End Time</label><p style="display:none;">'+escapeHTML(DATA.EventEndTime)+'</p>\
                    </div>\
                    <label><h2>Detail</h2></label><p class="box">'+escapeHTML(DATA.DetailNote)+'</p>\
                    </div>\
	        </div>\
                <div data-role="footer" id="footer" data-position="fixed">\
                <div data-role="navbar" data-iconpos="bottom">\
        <ul>\
            <li><a href="#homepage" data-icon="home">Homepage</a></li>\
            <li><a href="#aboutpage" data-icon="info">AboutUs</a></li>\
        </ul>\
    </div>\
                </div>\
                </div>'
                          
                $("body").append(notepage);
                $("#Notelist").append(homepageelement);
                 $("#Notelist").listview("refresh");
        };
	
	
	$('body').on('click','.delete_button' ,function(e) {
                e.stopPropagation();
                var id = $(this).attr('href').substring(7);
                //console.log(id);

                //search for the position of the selected noote
                var index;
                for(var i=0;i<noote.length;i++) {
                    if(noote[i].id == id) {
                        index = i;
                        break;
                    }
                }

                //remove from array
                 noote.splice(index,1);                    

                //save offline
                localStorage.setItem('noote', JSON.stringify(noote));

                //update homepage
                shownote();
                $.mobile.changePage("#homepage");
            });
	
	
	var entityMap = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': '&quot;',
                "/": '&#x2F;'
              };
             
            //remover caracteres de HTML y comillas
            var escapeHTML = function (string) {
              return String(string).replace(/[&<>"\/]/g, function (s) {
                return entityMap[s];
              });
            }
            //descprition benefits
            $("#f2").on("focusin focusout",function(){
			$("#f1").slideToggle(1000);
			
			} );
	
	$("#form_note").bind("submit",function(e){
        
		var datetoday=new Date();
		//console.log(datetoday);
        
		var newnoote={
		   id: noote.length+1,
                    Notename: escapeHTML($('#name').val()),
                    NoteType: escapeHTML($('#NoteType option:selected').val()),
                    CreatedDate: escapeHTML(datetoday),
                    EventDate: escapeHTML($('#edate').val()),
                    EventTime: escapeHTML($('#etime').val()),
		    //EventEndTime: escapeHTML($('#eendtime').val()),
		    DetailNote: escapeHTML($('#detail').val())
		};
        if($('#NoteType option:selected').val()=="select"){
        $("#error").html("<h3>You Have To Select a Type Of Note You Are Creating It's Can't Be Blank</h3>")
        }else{
		noote.push(newnoote);
                
                addnoote(newnoote); 
                
                //save offline
                localStorage.setItem('noote', JSON.stringify(noote));
                
                //cleaning form
                $(this).get(0).reset();
                
                $.mobile.changePage("#homepage");
                return false;
        };
        return false;
		
		});
	
	shownote();	
});

function add(){
$("#form_note").get(0).reset();
}

