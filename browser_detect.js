/***********************
Auhor(s): Patrik Picoli / Bruno Sanches;
Date: 2012-06-12;
Last Review: 2013-01-02;
Licence: MIT
************************/
var BrowserDetect = {

  browser_code_name   : navigator.appCodeName,
  browser_name        : navigator.appName,
  browser_version     : navigator.appVersion,
  cookies_enabled     : navigator.cookieEnabled,
  system_platform     : navigator.platform,
  user_agent_header   : navigator.userAgent,

  load : function () {
    // This log shows information about the browsers.
    //console.log("Code Name:    " + this.browser_code_name + '\n' + "Browser Name: " + this.browser_name + '\n' + "Version:      " + this.browser_version + '\n' + "Cokie Enable: " + this.cookies_enabled + '\n' + "Plataform:    " + this.system_platform + '\n' + "Header:       " + this.user_agent_header);
    
    // Variables to works on methods
    strName = BrowserDetect.browser_name;
    strVersion = BrowserDetect.browser_version;
    strHeader = BrowserDetect.user_agent_header;

    /* 
      Method to find specifc character group to identify browser, where:
      str = piece of character/string you want to find
      startPos = this is a number of character of you want to find to identify the browser. Eg:  S a f a r i /
                                                                                                 0 1 2 3 4 5 6 = 7    
      endPos = final position that define browser version, in this case it will work until version 99. Eg: 7 . 
                                                                                                           0 1 = 2
      charChange = character to be changed.
      changeTo = character used to replace charChange. Eg: Change "."" to "", this is option more used                                                                                              
    */
    function findVersion(str, startPos, endPos, charChange, changeTo){

      findChar = strHeader.lastIndexOf(str) + startPos;
      version = strHeader.substr(findChar, endPos);
      version = version.replace(charChange, "");
      
      return version;
    }

    /*
      Method to pass the class name that is used to identify the browser and use it in the CSS: EX: Firefox, version
                                                                                                    browser, browser+version.
    */      
    function addClassHtml(classes){
        var htmlDocument = document.getElementsByTagName("html")[0],
            finalClasses = htmlDocument.className ? 
                           [classes.join(' '), htmlDocument.className].join(' ') : 
                           classes.join(' ');

        htmlDocument.setAttribute('class', finalClasses);
    }
    
    var classesToAdd = ["Unknown", "Unknown-version"];
    
    // if Internet Explorer, which one?
    if (strName.match("Microsoft")) {
      classesToAdd = ["IE", "IE-" + findVersion("MSIE ", 5, 2, ".", "")];
    }
    //Browsers like Safari, Firefox and Chrome
    else if(strName.match("Netscape")) {
      // if Firefox
      if (strHeader.match("Firefox")) {
        classesToAdd = ["Firefox", "Firefox-" + findVersion("/", 1, 2, ".", "")];
      }
      // if Android, which one?
      else if (strHeader.match("Android")) {
        classesToAdd = ["Android", "BrowserAndroid-" + findVersion("Android ", 8, 3, ".", "")];
      }
      // if Chrome, which one?
      else if (strHeader.match("Chrome")) {
        classesToAdd = ["Chrome", "Chrome-" + findVersion("Chrome/", 7, 2, ".", "")];
      }
      // if Safari iPhone, which one?
      else if (strHeader.match("iPhone")) {
        classesToAdd = ["iPhone", "iPhone-safari-" + findVersion("Safari/", 7, 1, ".", "")];
      }
      // if Safari iPad, which one?
      else if (strHeader.match("iPad")) {
        classesToAdd = ["iPad", "iPad-safari-" + findVersion("Safari/", 7, 1, ".", "")];
      }
      // if Safari, which one?
      else if (strHeader.match("Safari")) {
        classesToAdd = ["Safari", "Safari-" + findVersion("Safari/", 7, 1, ".", "")];
      }
    }
    // if Opera, which one?
    else if (strHeader.match("Opera")) {
      classesToAdd = ["Opera", "Opera-" + findVersion("Version/", 8, 2, ".", "")];
    }

    addClassHtml(classesToAdd);
  }
};
BrowserDetect.load();