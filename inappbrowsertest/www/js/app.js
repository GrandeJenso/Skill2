var startApp = function() {
  // alert('started');
    var jobID;
    var xml_all;
    var detailed_div;

};

var pushNotification;

function onLoad() {
    document.addEventListener('deviceready', onDeviceReady, true);
    
}

function onDeviceReady() {
    pushNotification = window.plugins.pushNotification;
    
    if (device.platform == 'android' || device.platform == 'Android') {
        pushNotification.register(successHandler, errorHandler,
                                  {"senderID":"661780372179","ecb":"onNotificationGCM"});
    } else {
        
        pushNotification.register(tokenHandler, errorHandler, {"badge":"true","sound":"false","alert":"true","ecb":"onNotificationAPN"});
    }
}

// handle APNS notifications for iOS
function onNotificationAPN(event) {
    if (event.alert) {
        navigator.notification.alert(event.alert);
    }
    
    if (event.sound) {
        var snd = new Media(event.sound);
        snd.play();
    }
    
    if (event.badge) {
        pushNotification.setApplicationIconBadgeNumber(successHandler, event.badge);
    }
}

function tokenHandler (result) {
    alert(result);
    // Your iOS push server needs to know the token before it can push to this device
    // here is where you might want to send it the token for later use.
}

function successHandler (result) {
    alert(result);
}

function errorHandler (error) {
    alert(result);
}

$(document).on('pageinit',"body",function()
               {
                    detailed_div=$("div#detailed");
               
               
               });

$(document).on('pageinit', "#one", function()
                  {
                  $.ajax({
                         type: "GET",
                         url: "http://cv.skill.se/cv/rss.jsp?format=mtrxml&allads=1",
                         dataType: "xml",
                         success: parseXml
                         });

                  
                  function parseXml(xml)
                  {
                  
                  xml_all=xml;
                  //find every Tutorial and print the author
                  $(xml).find("job").each(function()
                                               {
                                          
                                          //var link = $(this).find('applicationMethods link').attr('href');
                                          var img = $(this).find('logo link').attr('href');
                                          var title = $(this).find('title').text();
                                          var id = $(this).attr('id');
                                          
                                       
                                          
                                          $('div#content ul#job').append('<li class="listelement" data-id= "' + id + '" ><a data-transition="slide"><img src="' + img +'"><p>' + title + '</p></a></li>');
                                          
                                          
                                         // $('div#content ul#job').append('<li><a href="'+$(this).find('applicationMethods link').attr('href') + '"><img src="' + $(this).find('logo link').attr('href') +'"><p>' + $(this).find('title').text() + '</p></a></li>');
                                          
                                          // <li><a href="acura.html"><img src="css/images/ajax-loader.gif">Acura</a></li>
                                         
                                          // $('div#content ul#job').append('<li><a href="'+$(this).find('applicationMethods link').attr('href') + '">' + $(this).find('name').text() + '</a></li>');
                                          
                                          
                                               });
                  $('div#content ul#job').listview("refresh");
                  
//                  $('li.listelement').click(function() {
//                                            var jobID = $(this).data('id');
//                                            alert(jobID);
//                                            
//                                });
                  
                  $('li.listelement').live("click", function(){
                                           detailed_div.text("");
                                           jobID = $(this).data('id');
                                           $.mobile.changePage("#two", {transition:"slide"} , true, true);
                                           //$.mobile.loading('show');
                                           
                                           
                                });
                  
                  
                  
                  }
                  

                  
                  });

            $(document).on('pageshow', '#two', function()
                           {
                           
                           var job = $(xml_all).find("job[id="+jobID+"]")
                           var title = job.find('title').text();
                           var description = job.find('description').text();
                           var link = job.find('applicationMethods link').attr('href');
                           
                           detailed_div.append("<h3>"+title+"</h3>");
                           detailed_div.append("<p>"+description+"</p>");
                           detailed_div.append('<button id="job_link">Ansök</button>');
                           //detailed_div.append('<a href="'+link+'" data-role="button" data-rel="dialog">Open dialog</a>');
                           //$.mobile.loading('hide');
                           $('button#job_link').live("click", function(){
                                                     ref = window.open(link,'_blank', 'location=no');


                                                });
                           
                           
                           });



