(function(global){
    var ajaxUtils={};
    function getRequestObject() {
        if (window.XMLHttpRequest)
        return (new XMLHttpRequest());
        else if (window.ActiveXObject){
            return (new ActiveXObject("Microsoft.XMLHTTP"));        
    }else{
        global.alert("Ajax is not supported");
        return null;
    }
}

//makes an ajax GET request to 'requestURL'
ajaxUtils.sendGetRequest = function(requestURL,responseHandler){
    var request = getRequestObject();
    request.onreadystatechange = function(){
        handleResponse(request, responseHandler);
    };
    request.open("GET", requestUrl, true);
    request.send(null);  // to POST only
};
//only calls user provided responseHandler fucntion if response is ready or not an error
function handleResponse(request, responseHandler){
    if((request.readyState == 4) && (request.status == 200 )){
        responseHandler(request);
    }
}
//expose utility to the global object
global.$ajaxUtils = ajaxUtils;
})(window);
