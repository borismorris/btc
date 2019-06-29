var CoinWidget = function() {
        var a = this;
        a._oldIE = document.all && !document.addEventListener;
        a._protocol = window.location.protocol;
        a._tickerUrl = a._protocol + "/widgets";
        a.initialize = function() {
            a._widget = document.getElementById("coin-widget");
            null === a._widget && alert('Coin widget tag not found. Please add <div id="coin-widget"></div> to your page.');
            a._showLocation = a._widget.getAttribute("show-on-map");
            a.getDimensions();
            a.getAlignment();
            a.createTemplate();
            a.createWidget();
            setTimeout(function() {a.getData()}, 10);
        };
        a.createTemplate = function() {
            //currency logos small:
            var b, c, d = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAVFBMVEUAAAD+vhL+vhL+vhL+vhL+vhL+vhL+vhL+vhL+vhL+vhL////+vhL+zk3/78T/9+H+xjD+yj7/89P/56b/+/D+1mv+wiH/45f/34n+2nr/67X+0lyhkP7iAAAAC3RSTlMAEL/PcCCPMK/vQNeqw9EAAAD6SURBVHhefZNJlsMgDAUJwaPE7DF9/3s2xEYoLFwbFsXTFyAE0Sk5YWKSqhMtw4iMcfi1PTb0rypfbxLE+8Xtg2f2E91WfZu7AeBiKT/boThrjhOMB9KY+y8ncpCxASJpKUSHBR/hIrriO6GQ+EvqCMkv/tZKyKp3AIOok/9Q9anqAHCkxeRdN+LnVBC1XvNCmkcXFl81j7bfzmBF0m20zhtcq7cz19Z3xklaXvqETM48WHVZrmVfrqaMBVZc1Uv1AQp7vVQx1tZ0gGCMOdmTiIG/NThkzGwctnX1YLnt21Fzvhm251F8HmTyT98gM0su5UyCfcHL8S/4D3L7I3j7U/aqAAAAAElFTkSuQmCC";
            //curency logos big:
            e = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAXVBMVEUAAAD+vhL+vhL+vhL+vhL+vhL+vhL+vhL+vhL+vhL+vhL+vhL+vhL+vhL////+vhL/34n+0lz/78T/9+H+zk3/89P+wiH+yj7/67X/56b+1mv/+/D+xjD+2nr/45cPEa9LAAAADnRSTlMAzxBAv2CPr5/vIDDfUP1vqD4AAAFgSURBVHhehZRZksMgDAXBMfGS5InNe5L7H3Nq7EwQ2Iz7u0slCfFERKFqSSuyVoXIcakoorocayXtKA/UKx1yTRooJGWQkXm7U5bmxurF3jMxQ00Ze3BzJMvieI4ZMAPczCb67CU4XnuiCehfgKfAtiW2vzcA69DRCBCjTAqSxYZbYImSkvzdetPhj4nPUwlRUIQHgAUrmpmtULGoATga3qv7CqISdSxaABMRDb+mC2KdLJsAYP4sgE8uxUGL6xQOwEIBsW8Ri9XarYPnRQtG1+fFtc64MI+L+xa3vdu8qL87GdfxuSj56bjvBD55GskW3gGhjE7EOjyhx8YyamMmANFJqnAUz3lyiHAUaOMzG8DgBcvkcA1gDDYs8+ix/wr9DHhKkOnn6tDRBFDKZRc73pCDTb3rcfB4n42foqF/aFoWUs1pSJ3HXpsE5GmQnkfzediXD5GjVdWn2Xul4uZ+AHp5TDd9jCYnAAAAAElFTkSuQmCC";
            //currency logo in vectors
            f = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCA1MTIgNTEyJyBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSd4TWlkWU1pZCBtZWV0JyB3aWR0aD0nMTAwJScgaGVpZ2h0PScxMDAlJz48ZyBpZD0nZzE2JyB0cmFuc2Zvcm09J3NjYWxlKDAuMDE1NjI1KSc+PHBhdGggaWQ9J2NvaW4nIGZpbGw9JyNGRUJFMTInIGQ9J00zMjI3NC4zOTEsMjAzNDcuMzc1Yy0yMTg4LjMxMiw4Nzc3LjI1LTExMDc4LjE4OCwxNDExOC45MzgtMTk4NTYuMzc1LDExOTMwLjEyNQlDMzY0My4zMjgsMzAwODkuMTg4LTE2OTguMzU5LDIxMTk4Ljg3NSw0OTAuOTUzLDEyNDIyLjE1NkMyNjc4LjIwMywzNjQzLjkwNiwxMTU2OC4wNzgtMTY5OC4zMTIsMjAzNDMuNzY2LDQ5MAlDMjkxMjEuNDUzLDI2NzguMjgxLDM0NDYyLjY0MSwxMTU2OS42NTYsMzIyNzQuMzkxLDIwMzQ3LjM3NUwzMjI3NC4zOTEsMjAzNDcuMzc1eicvPjxwYXRoIGlkPSdzeW1ib2wnIGZpbGw9JyNGRkZGRkYnIGQ9J00yMzYwMy42NDEsMTQwNDkuNzgxYzMyNi4xMjUtMjE4MC4wOTQtMTMzMy43NS0zMzUyLjA2Mi0zNjAzLjQzOC00MTMzLjg3NWw3MzYuMjUtMjk1My4yMTkJbC0xNzk3LjYyNS00NDhsLTcxNi44MTIsMjg3NS4zNzVjLTQ3Mi41NjItMTE3Ljc1LTk1Ny45MzgtMjI4Ljg0NC0xNDQwLjI1LTMzOC45MzhsNzIxLjkzOC0yODk0LjMxMmwtMTc5Ni42MjUtNDQ4TDE0OTcwLjMyOCw4NjYxCWMtMzkxLjE4OC04OS4wOTQtNzc1LjE4OC0xNzcuMTU2LTExNDcuOTM4LTI2OS44NDRsMi4wNjItOS4yMTlsLTI0NzkuMTI1LTYxOWwtNDc4LjE4OCwxOTIwYzAsMCwxMzMzLjc1LDMwNS42ODgsMTMwNS42MjUsMzI0LjYyNQljNzI4LjA2MiwxODEuNzUsODU5LjYyNSw2NjMuNTMxLDgzNy42MjUsMTA0NS41bC04MzguNjg4LDMzNjQuMzQ0YzUwLjE4OCwxMi44MTIsMTE1LjE4OCwzMS4yMTksMTg2Ljg3NSw1OS45MDYJYy01OS44NzUtMTQuODQ0LTEyMy44NzUtMzEuMjUtMTg5LjkzOC00Ny4wOTRsLTExNzUuNTYyLDQ3MTIuOTA2Yy04OS4wNjIsMjIxLjI1LTMxNC44NzUsNTUzLTgyMy44MTIsNDI3LjA2MgljMTcuOTM4LDI2LjA2Mi0xMzA2LjYyNS0zMjYuMTg4LTEzMDYuNjI1LTMyNi4xODhsLTg5Mi4zNzUsMjA1Ny43NWwyMzM5LjMxMiw1ODMuMTg4CWM0MzUuMTg4LDEwOS4wNjIsODYxLjY4OCwyMjMuMTg4LDEyODEuNTYyLDMzMC43NWwtNzQzLjkzOCwyOTg3bDE3OTUuNTYyLDQ0OGw3MzYuNzUtMjk1NS4yNQljNDkwLjUsMTMzLjA2Miw5NjYuNjg4LDI1NiwxNDMyLjU2MiwzNzEuNjg4bC03MzQuMTg4LDI5NDEuNDM4bDE3OTcuNjI1LDQ0OGw3NDMuOTM4LTI5ODEuMzc1CWMzMDY1LjMxMiw1ODAuMDYyLDUzNzAuMzc1LDM0Ni4xMjUsNjM0MC42MjUtMjQyNi4zMTJjNzgxLjgxMi0yMjMyLjM3NS0zOC45MzgtMzUyMC0xNjUxLjc1LTQzNTkuNzUJQzIyNDgyLjg5MSwxNjQxOC4zMTIsMjMzNjcuNTc4LDE1NjQ1LjY4OCwyMzYwMy42NDEsMTQwNDkuNzgxTDIzNjAzLjY0MSwxNDA0OS43ODF6IE0xOTQ5Ni4zOTEsMTk4MDkuMjUJYy01NTUuNSwyMjMyLjM3NS00MzE0LjEyNSwxMDI1LjU2Mi01NTMyLjY4OCw3MjNsOTg3LjE4OC0zOTU3LjI1QzE2MTY5LjM5MSwxNjg3OS4xMjUsMjAwNzcuMDE2LDE3NDgxLjI1LDE5NDk2LjM5MSwxOTgwOS4yNXpNMjAwNTIuMzkxLDE0MDE3LjUzMWMtNTA2Ljg3NSwyMDMwLjU5NC0zNjM1LjE4OCw5OTguOTA2LTQ2NDkuOTM4LDc0Nmw4OTQuOTM4LTM1ODkuMTI1CUMxNzMxMi4yMDMsMTE0MjcuMzEyLDIwNTgwLjI2NiwxMTg5OS4zNzUsMjAwNTIuMzkxLDE0MDE3LjUzMXonLz48L2c+PC9zdmc+DQo=";
            if (a._oldIE) {
                c = h;
            } else {
                b = f;
            }
            a._elements = {};
            a._data = {};
            a._api = "https://coin.cz/widgets/atms_data";
            a._jumpURL1 = "http://www.generalbytes.com/";
            a._jumpURL2 = "https://www.coin.cz/";
            a._jumpToolTip1 = "Bitcoin solutions provider";
            a._jumpToolTip2 = "See the latest bitcoin news and prices at Coin.cz";
            a._jumpLinkText = "GENERAL BYTES";
            a._jumpLinkColor = (a._widget.getAttribute("color-text") == null) ? "white" : a._widget.getAttribute("color-text");
            a._jumpTextBefore = "Powered by ";
            a._jumpTextBeforeColor = (a._widget.getAttribute("color-text") == null) ? "white" : a._widget.getAttribute("color-text");
            a._pollingDelay = 60 * 1000;
            a._backgroundColor = (a._widget.getAttribute("color-bg") == null) ? "#2557A1" : a._widget.getAttribute("color-bg");
            a._serialNumber = a._widget.getAttribute("serial-number");
            a._LoadingText = "Loading...";
            a._LoadingColor = (a._widget.getAttribute("color-text") == null) ? "white" : a._widget.getAttribute("color-text");
            a._PathColor = (a._widget.getAttribute("color-line") == null) ? "white" : a._widget.getAttribute("color-line");
            a._PathColorFocus = (a._widget.getAttribute("color-line") == null) ? "white" : a._widget.getAttribute("color-line");
            a._PathWidth = "3px";
            a._circleColor =(a._widget.getAttribute("color-cursor") == null) ? "white" : a._widget.getAttribute("color-cursor");
            a._PriceLatestColor = (a._widget.getAttribute("color-text") == null) ? "white" : a._widget.getAttribute("color-text");
            a._selectLineColor = (a._widget.getAttribute("color-cursor") == null) ? "white" : a._widget.getAttribute("color-cursor");
            a._tooltipColor = (a._widget.getAttribute("color-cursor") == null) ? "white" : a._widget.getAttribute("color-cursor");
            a._template = [
            '<div class="box" style="font-family: Helvetica, \'Helvetia Neue\', Arial; position: relative; cursor: default; overflow:hidden; ' +
            ' background-color: ' + a._backgroundColor +';' +
            ' width: ' + a._widget.config.width + "px;" +
            " height: " + a._widget.config.height + "px;" +
            " line-height: 1; border-radius: 4px; " + a._widget.config.alignment + ' ">',
                '<div class="widget-loading" id="slider">',
                '<div class="box">',
                '<div style="position: absolute;' +
                ' left: ' + a._widget.config.padding + "px;" +
                " bottom: " + a._widget.config.padding + 'px;">',
                    '<span class="price-latest" ' +
                        'style="float: left; position: relative; z-index: 2; ' +
                        'font-weight: bold; ' +
                        'font-size: ' + a._widget.config.text.primary + "px;" +
                        " height: " + a._widget.config.text.primary + 'px">'
                    , '<div id="crypto-logo" style="float: left; margin:0 8px -4px 0;' +
                        ' width: ' + a._widget.config.logo.crypto.size + "px;" +
                        " height: " + a._widget.config.logo.crypto.size + 'px;' +
                        ' background-size: contain; background-repeat: no-repeat;">' +
                      '</div>',
                '<span class="animated" id="fiat-current"></span>',
                "</span>",
                '<div style="text-align: right; font-size: ' + a._widget.config.text.powered + 'px; color: ' +a._jumpTextBeforeColor +'; ">',
                a._jumpTextBefore + '<a href="' + a._jumpURL1+ '" title="' + a._jumpToolTip1 + '" ' +
                    'target="_blank" style="color: ' + a._jumpLinkColor +'; text-decoration: underline; cursor: pointer">' +
                    a._jumpLinkText +'</a>',
                "</div>",
                (a._showLocation == null ? '': '<br/><div style="text-align: right; font-size: ' + a._widget.config.text.normal + 'px;"><a id="location-a" target="_blank" href="/" style="color: ' + a._jumpLinkColor +'; text-decoration: underline; cursor: pointer">' + a._showLocation +'</a></div>'),
            "</div>",
            "</div>",
            '<div class="box" style="text-align: center;' +
            ' line-height: ' + a._widget.config.height + 'px;' +
            ' color: ' + a._LoadingColor +';">',
            '<div class="loading">' + a._LoadingText + '</div>',
                "</div>",
                "</div>",
                "</div>",
                '<style type="text/css">',
                ".price-latest {" +
                " color: " + a._PriceLatestColor + ";" +
                "}" +
                " .delta-down {" +
                "color: #C3342B;" +
                "}" +
                ".delta-up {" +
                "color: #5D8700;" +
                "}" +
                " .path {" +
                "-webkit-transition: 0.2s linear opacity;" +
                " stroke: " + a._PathColor +";" +
                " stroke-width: " + a._PathWidth +";" +
                " fill: none;" +
                " }",
                ".box {" +
                "height: " + a._widget.config.height + "px;" +
                " width: " + a._widget.config.width + "px;" +
                " position: relative" +
                "}",
                "#slider {" +
                "transition: 0.1s ease-in top;" +
                " -o-transition: 0.1s ease-in top;" +
                " -moz-transition: 0.1s ease-in top;" +
                " -webkit-transition: 0.1s ease-in top;" +
                " top: 0px; position: relative;" +
                "}",
                "#slider.widget-loading {" +
                "top: -" + a._widget.config.height + "px;" +
                "}",
                ".box:hover .path {" +
                " stroke: " + a._PathColorFocus +
                "}",
                '#crypto-logo {' +
                'background-image: url("' + b + '");' +
                '}',
                ".box .overlay {" +
                "fill: none; " +
                "pointer-events: all;" +
                "}",
                ".box .focus .tooltipBg {" +
                " fill: " + a._jumpTextBeforeColor+"; " +
                " fill-opacity: 0.8;" +
                "}",
                ".box .focus circle {" +
                " fill: none;" +
                " stroke: " + a._circleColor +";" +
                " stroke-width: 2;" +
                "}",
                ".box .focus text {" +
                "fill: #EEE;" +
                " font-weight: normal;" +
                " font-size: 12px;" +
                "}",
                ".box .focus line {" +
                " stroke: " + a._selectLineColor +";" +
                " stroke-dasharray: 3 3;" +
                " opacity: .8;" +
                "}",
                ".animated {" +
                " -webkit-animation-duration: 1s;" +
                " -moz-animation-duration: 1s;" +
                " -o-animation-duration: 1s;" +
                " animation-duration: 1s;" +
                "}",
                "@-webkit-keyframes fadeInUp {" +
                "0% {" +
                "opacity: 0;" +
                "-webkit-transform: translateY(20px);" +
                "}" +
                "100% {" +
                "opacity: 1;" +
                "-webkit-transform: translateY(0);" +
                "}" +
                "}",
                "@-moz-keyframes fadeInUp {0% {opacity: 0;-moz-transform: translateY(20px);}100% {opacity: 1;-moz-transform: translateY(0);}}",
                "@-o-keyframes fadeInUp {0% {opacity: 0;-o-transform: translateY(20px);}100% {opacity: 1;-o-transform: translateY(0);}}",
                "@keyframes fadeInUp {0% {opacity: 0;transform: translateY(20px);}100% {opacity: 1;transform: translateY(0);}}",
                ".animated.fadeInUp {-webkit-animation-name: fadeInUp;-moz-animation-name: fadeInUp;-o-animation-name: fadeInUp;animation-name: fadeInUp;}",
                "@-webkit-keyframes fadeInDown {0% {opacity: 0;-webkit-transform: translateY(-20px);}100% {opacity: 1;-webkit-transform: translateY(0);}}",
                "@-moz-keyframes fadeInDown {0% {opacity: 0;-moz-transform: translateY(-20px);}100% {opacity: 1;-moz-transform: translateY(0);}}",
                "@-o-keyframes fadeInDown {0% {opacity: 0;-o-transform: translateY(-20px);}100% {opacity: 1;-o-transform: translateY(0);}}",
                "@keyframes fadeInDown {0% {opacity: 0;transform: translateY(-20px);}100% {opacity: 1;transform: translateY(0);}}",
                ".animated.fadeInDown {-webkit-animation-name: fadeInDown;-moz-animation-name: fadeInDown;-o-animation-name: fadeInDown;animation-name: fadeInDown;}",
                ".loading {" +
                " text-indent: 999em;" +
                " overflow: hidden;" +
                " border-bottom:6px solid rgba(0, 0, 0, .4);" +
                "border-left:6px solid rgba(0, 0, 0, .4);" +
                "border-right:6px solid rgba(0, 0, 0, .4);" +
                "border-top:6px solid rgba(254, 254, 254, .8);" +
                "border-radius:100%;" +
                "height:30px;" +
                "width:30px;" +
                "margin: 0 auto;" +
                " margin-top: " + (a._widget.config.height - 42) / 2 + 'px;' +
                '-webkit-animation:rot .6s infinite linear;-moz-animation:rot .6s infinite linear;-ms-animation:rot .6s infinite linear;-o-animation:rot .6s infinite linear;animation:rot .6s infinite linear;}@keyframes "rot"{from{-webkit-transform:rotate(0deg);-moz-transform:rotate(0deg);-o-transform:rotate(0deg);-ms-transform:rotate(0deg);transform:rotate(0deg);}to{-webkit-transform:rotate(359deg);-moz-transform:rotate(359deg);-o-transform:rotate(359deg);-ms-transform:rotate(359deg);transform:rotate(359deg);}}@-moz-keyframes rot{from{-webkit-transform:rotate(0deg);-moz-transform:rotate(0deg);-o-transform:rotate(0deg);-ms-transform:rotate(0deg);transform:rotate(0deg);}to{-webkit-transform:rotate(359deg);-moz-transform:rotate(359deg);-o-transform:rotate(359deg);-ms-transform:rotate(359deg);transform:rotate(359deg);}}@-webkit-keyframes "rot"{from{-webkit-transform:rotate(0deg);-moz-transform:rotate(0deg);-o-transform:rotate(0deg);-ms-transform:rotate(0deg);transform:rotate(0deg);}to{-webkit-transform:rotate(359deg);-moz-transform:rotate(359deg);-o-transform:rotate(359deg);-ms-transform:rotate(359deg);transform:rotate(359deg);}}@-ms-keyframes "rot"{from{-webkit-transform:rotate(0deg);-moz-transform:rotate(0deg);-o-transform:rotate(0deg);-ms-transform:rotate(0deg);transform:rotate(0deg);}to{-webkit-transform:rotate(359deg);-moz-transform:rotate(359deg);-o-transform:rotate(359deg);-ms-transform:rotate(359deg);transform:rotate(359deg);}}@-o-keyframes "rot"{from{-webkit-transform:rotate(0deg);-moz-transform:rotate(0deg);-o-transform:rotate(0deg);-ms-transform:rotate(0deg);transform:rotate(0deg);}to{-webkit-transform:rotate(359deg);-moz-transform:rotate(359deg);-o-transform:rotate(359deg);-ms-transform:rotate(359deg);transform:rotate(359deg);}}@keyframes "rot"{from{-webkit-transform:rotate(0deg);-moz-transform:rotate(0deg);-o-transform:rotate(0deg);-ms-transform:rotate(0deg);transform:rotate(0deg);}to{-webkit-transform:rotate(359deg);-moz-transform:rotate(359deg);-o-transform:rotate(359deg);-ms-transform:rotate(359deg);transform:rotate(359deg);}}@-moz-keyframes rot{from{-webkit-transform:rotate(0deg);-moz-transform:rotate(0deg);-o-transform:rotate(0deg);-ms-transform:rotate(0deg);transform:rotate(0deg);}to{-webkit-transform:rotate(359deg);-moz-transform:rotate(359deg);-o-transform:rotate(359deg);-ms-transform:rotate(359deg);transform:rotate(359deg);}}@-webkit-keyframes "rot"{from{-webkit-transform:rotate(0deg);-moz-transform:rotate(0deg);-o-transform:rotate(0deg);-ms-transform:rotate(0deg);transform:rotate(0deg);}to{-webkit-transform:rotate(359deg);-moz-transform:rotate(359deg);-o-transform:rotate(359deg);-ms-transform:rotate(359deg);transform:rotate(359deg);}}@-ms-keyframes "rot"{from{-webkit-transform:rotate(0deg);-moz-transform:rotate(0deg);-o-transform:rotate(0deg);-ms-transform:rotate(0deg);transform:rotate(0deg);}to{-webkit-transform:rotate(359deg);-moz-transform:rotate(359deg);-o-transform:rotate(359deg);-ms-transform:rotate(359deg);transform:rotate(359deg);}}@-o-keyframes "rot"{from{-webkit-transform:rotate(0deg);-moz-transform:rotate(0deg);-o-transform:rotate(0deg);-ms-transform:rotate(0deg);transform:rotate(0deg);}to{-webkit-transform:rotate(359deg);-moz-transform:rotate(359deg);-o-transform:rotate(359deg);-ms-transform:rotate(359deg);transform:rotate(359deg);}}@keyframes "rot"{from{-webkit-transform:rotate(0deg);-moz-transform:rotate(0deg);-o-transform:rotate(0deg);-ms-transform:rotate(0deg);transform:rotate(0deg);}to{-webkit-transform:rotate(359deg);-moz-transform:rotate(359deg);-o-transform:rotate(359deg);-ms-transform:rotate(359deg);transform:rotate(359deg);}}@-moz-keyframes rot{from{-webkit-transform:rotate(0deg);-moz-transform:rotate(0deg);-o-transform:rotate(0deg);-ms-transform:rotate(0deg);transform:rotate(0deg);}to{-webkit-transform:rotate(359deg);-moz-transform:rotate(359deg);-o-transform:rotate(359deg);-ms-transform:rotate(359deg);transform:rotate(359deg);}}@-webkit-keyframes "rot"{from{-webkit-transform:rotate(0deg);-moz-transform:rotate(0deg);-o-transform:rotate(0deg);-ms-transform:rotate(0deg);transform:rotate(0deg);}to{-webkit-transform:rotate(359deg);-moz-transform:rotate(359deg);-o-transform:rotate(359deg);-ms-transform:rotate(359deg);transform:rotate(359deg);}}@-ms-keyframes "rot"{from{-webkit-transform:rotate(0deg);-moz-transform:rotate(0deg);-o-transform:rotate(0deg);-ms-transform:rotate(0deg);transform:rotate(0deg);}to{-webkit-transform:rotate(359deg);-moz-transform:rotate(359deg);-o-transform:rotate(359deg);-ms-transform:rotate(359deg);transform:rotate(359deg);}}@-o-keyframes "rot"{from{-webkit-transform:rotate(0deg);-moz-transform:rotate(0deg);-o-transform:rotate(0deg);-ms-transform:rotate(0deg);transform:rotate(0deg);}to{-webkit-transform:rotate(359deg);-moz-transform:rotate(359deg);-o-transform:rotate(359deg);-ms-transform:rotate(359deg);transform:rotate(359deg);}}@-ms-keyframes "rot"{-webkit-transform:rotate(0deg);-moz-transform:rotate(0deg);-o-transform:rotate(0deg);-ms-transform:rotate(0deg);transform:rotate(0deg);}to{-webkit-transform:rotate(359deg);-moz-transform:rotate(359deg);-o-transform:rotate(359deg);-ms-transform:rotate(359deg);transform:rotate(359deg);}} @-o-keyframes "rot"{-webkit-transform:rotate(0deg);-moz-transform:rotate(0deg);-o-transform:rotate(0deg);-ms-transform:rotate(0deg);transform:rotate(0deg);}to{-webkit-transform:rotate(359deg);-moz-transform:rotate(359deg);-o-transform:rotate(359deg);-ms-transform:rotate(359deg);transform:rotate(359deg);}',
                "</style>"].join("\n");
        };
        a.addScript = function(a, b) {
            var c = document.getElementsByTagName("head")[0];
                d = document.createElement("script");
                d.type = "text/javascript";
                d.src = a;
                d.onload = function() {
                    b(a);
                };
                c.appendChild(d);
        };

        a.createCORSRequest = function(a, b) {
            var c = new XMLHttpRequest;
            return "withCredentials" in c ? c.open(a, b, !0) : "undefined" != typeof XDomainRequest ? (c = new XDomainRequest, c.open(a, b)) : c = null, c
        };
        a.removeClass = function(a, b) {
            a.classList ? a.classList.remove(b) : a.className = a.className.replace(new RegExp("(^|\\b)" + b.split(" ").join("|") + "(\\b|$)", "gi"), " ");
        };
        a.addClass = function(a, b) {
            a.classList ? a.classList.add(b) : a.className += " " + b
        };

        a.getData = function() {
            var b = a.createCORSRequest("get", a._api);
            b && (
                b.onload = function() {
                    var c = JSON.parse(b.responseText);
                    var d = new Object();
                    d.rate_float_buy = c[a._serialNumber].prices.BTC_BuyPrice;
                    d.currency = c[a._serialNumber].currencyCode;
                    d.lat = c[a._serialNumber].location.latitude;
                    d.lng = c[a._serialNumber].location.longitude;
                    d.mapinfo = c[a._serialNumber].location.place +", " +
                        c[a._serialNumber].location.street +", " +
                        c[a._serialNumber].location.city +", " +
                        c[a._serialNumber].location.zip +", " +
                        c[a._serialNumber].location.country;
                    a._data = d;
                    a.receiveData(a._data);
                    a.updateWidget();
                },
                b.onerror = function() {
                    console.log("There was a problem loading data from price API:" + a._api)
                },
            b.send());
            setTimeout(a.getCurrentData, a._pollingDelay)
        };
        a.receiveData = function(b) {
            a.updateWidget();
            a._data && a.removeClass(a._elements.slider, "widget-loading");
        };
        a.updateWidget = function() {
                d = a._data ? "<small><small><sup>&nbsp;" + a._data.currency +"</sup></small></small>" : "";
                e = a._data ? a.formatFloat(a._data.rate_float_buy) : "";
                a._elements["price_data"].innerHTML = e + d;
                if (a._showLocation != null) {
                    document.getElementById("location-a").href = "http://maps.google.com/?q="+ a._data.lat+"," + a._data.lng;// +"," + a._data.mapinfo;
                    document.getElementById("location-a").title = a._data.mapinfo;
                }
        };
        a.createWidget = function() {
            a._widget.innerHTML = a._template;
            "right" === a._widget.alignment && (a._widget.style.overflow = "hidden");
            a._elements.price_data = document.getElementById("fiat-current");
            a._elements.slider = document.getElementById("slider");
            a._elements.primary = a._elements.price_data;
        };


        a.formatFloat = function(a, b) {
            b = "undefined" != typeof b ? b : 2;
            var c = parseFloat(a);
            return c = c.toFixed(b)
        };

        a.getAlignment = function() {
            a._widget.config.alignment = ""
        };

        a.getDimensions = function() {
            if (a._showLocation) {
                a._widget.config = {
                    height: 100,
                    width: 220,
                    padding: 15,
                    logo: {
                        crypto: {
                            size: 40
                        },
                        provider: {
                            size: 50
                        }
                    },
                    text: {
                        primary: 25,
                        normal: 14,
                        small: 11,
                        powered: 8
                    }
                };
            }else {
                a._widget.config = {
                    height: 70,
                    width: 220,
                    padding: 15,
                    logo: {
                        crypto: {
                            size: 40
                        },
                        provider: {
                            size: 50
                        }
                    },
                    text: {
                        primary: 25,
                        normal: 14,
                        small: 11,
                        powered: 8
                    }
                };
            }

        };
        a.initialize();
    },
    _widget = new CoinWidget;
