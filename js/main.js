---
---

{% unless jekyll.environment == "development" %}
(function () {
{% endunless %}

    var page = document.querySelector(".parallax-page");
    var win = page;

    if (!page || window.getComputedStyle(page).getPropertyValue("perspective") == "none") {
        page = document.scrollingElement ? document.scrollingElement : getScrollableChild(document.documentElement);
        win = window;
    }

    jekyllEnv = "{{ jekyll.environment }}";
    hasGoogleAnalytics = "{{ site.google_analytics }}";

/*
 * General-purpose functions
 */

    function toArray(collection) {
        return Array.prototype.slice.call(collection);
    };

    function getScrollableParent(element) {
        var maxDepth = arguments.length > 2 && arguments[1] !== undefined ? arguments[1] : undefined;
        var ancestor = element;
        while (ancestor != document.documentElement && maxDepth !== 0) {
            ancestor = ancestor.parentElement;
            if (ancestor.scrollHeight > ancestor.clientHeight) {
                return ancestor;
            }
            maxDepth -= 1;
        }
        return null;
    };

    function getScrollableChild(element) {
        var maxDepth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
        var currentDepth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        if (element.scrollHeight > element.clientHeight) {
            return element;
        }
        for (var i = 0; i < element.children.length && maxDepth > currentDepth; i++) {
            var child = element.children[i];
            var childMatch = getScrollableChild(child, maxDepth, currentDepth += currentDepth);
            if (childMatch) {
                return childMatch;
            }
        }
        return null;
    };

    function distToBottom(element) {
        return Math.floor(element.getBoundingClientRect().bottom - window.innerHeight);
    };

    function updateObj(obj, newObj) {
        for (var key in newObj) {
            obj[key] = newObj[key];
        }
    }

/*
 * Scrolling
 */

    var pageScrollBehavior = window.getComputedStyle(page).getPropertyValue("scroll-behavior");
    var smoothLinks = [];

    toArray(document.querySelectorAll("[data-smooth-scroll]")).forEach(function (element) {
        smoothLinks.push(new SmoothLink(element));
    });

    zenscroll.setup(500, 0);

    function SmoothLink(link) {
        this.element = link;
        this.target = document.querySelector(link.hash);
    };

    SmoothLink.prototype.scroll = function () {
        var dur = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        zenscroll.to(this.target, dur, offset);
    };

    function receivesSmoothScroll(element) {
        for (var i=0; i < smoothLinks.length; i++) {
            var link = smoothLinks[i];
            if (element === link.target) {
                return true;
            }
        }
        return false;
    };

/*
 * Fullscreen
 */

    var fullscreenElements = toArray(document.querySelectorAll("[data-force-fullscreen]"));

    function forceFullscreen(element) {
        var viewHeight = window.innerHeight;
        if (element.clientHeight != viewHeight) {
            if (element.getAttribute("data-force-fullscreen") === "min") {
                element.style.minHeight = viewHeight.toString() + "px";
            } else if (element.getAttribute("data-force-fullscreen") === "max") {
                element.style.maxHeight = viewHeight.toString() + "px";
            } else {
                element.style.height = viewHeight.toString() + "px";
            }
        }
    };

    function forceFullscreenAll() {
        fullscreenElements.forEach(function (element) {
            forceFullscreen(element);
        });
    };

/*
 * Rob Resize
 */

    var rob = document.getElementById("rob-2");
    var robContainer = document.querySelector("[data-rob-container]");
    var personHeight = {{ site.person_height }};

    function robResize() {
        var containerHeight = robContainer.clientHeight - 60;
        if (!rob.classList.contains("js-rob-resize") && (containerHeight / window.innerHeight) < (personHeight / 100)) {
            rob.classList.add("js-rob-resize");
        } else if (rob.classList.contains("js-rob-resize") && (containerHeight / window.innerHeight) > (personHeight / 100)) {
            rob.classList.remove("js-rob-resize");
        }
    }

/*
 * Background Image Testing
 */

    var bgTestingObjects = toArray(document.querySelectorAll("[data-background-images]"));
    for (var i = 0; i < bgTestingObjects.length; i++) {
        bgTestingObjects[i] = new BgSelect(bgTestingObjects[i]);
    }

    function BgSelect(element) {
        var menuContainer = element;
        var computedStyle = window.getComputedStyle(element);
        var position = computedStyle.getPropertyValue("position");
        var initialImage = {"name": "initial"};

        if (element.tagName == "IMG") { // use element.src?
            initialImage.path = element.src;
            initialImage.size = computedStyle.getPropertyValue("object-fit") == "contain" ? "contain" : "cover";
            initialImage.position = computedStyle.getPropertyValue("object-position");

            var divImg = document.createElement("div");
            divImg.setAttribute("data-background-images", element.getAttribute("data-background-images"));
            divImg.classList = element.classList;
            divImg.classList.add("bg-img");
            updateObj(divImg.style, { backgroundImage: "url('" + initialImage.path + "')", backgroundSize: initialImage.size, backgroundPosition: initialImage.position });
            menuContainer = divImg;

            function replaceImgWithDiv(img, replacement) {
                updateObj(replacement.style, { width: img.width + "px", height: img.height + "px" });
                img.parentNode.replaceChild(replacement, img);
            }

            if (element.complete) {
                replaceImgWithDiv(element, divImg);
            } else {
                element.onload = replaceImgWithDiv.bind(null, element, divImg);
            }

            element = divImg;
        } else {
            initialImage.path = computedStyle.getPropertyValue("background-image").replace(/.*\s?url\([\'\"]?/, '').replace(/[\'\"]?\).*/, '');
            initialImage.size = computedStyle.getPropertyValue("background-size");
            initialImage.position = computedStyle.getPropertyValue("background-position");
        }

        if (position == "static" ) {
            element.style.position = "relative";
        } else if (position == "absolute") {
            menuContainer = element.parentElement;
        }

        this.element = element;
        this.controls = document.createElement("div");
        updateObj(this.controls.style, { position: "absolute", bottom: "0", left: "0", zIndex: "999" });
        this.menu = document.createElement("select");
        this.slider = document.createElement("input");
        this.slider.type = "range";
        this.slider.value = "50";
        this.checkbox = document.createElement("input");
        this.checkbox.type = "checkbox";

        this.images = JSON.parse(element.getAttribute("data-background-images"));
        this.images.unshift(initialImage);

        for (var i=0; i < this.images.length; i++) {
            var image = this.images[i];
            var imageName = image["name"] ? image["name"] : "image " + i;
            var opt = document.createElement("option");
            opt.textContent = imageName;
            this.menu.appendChild(opt);
        }

        this.controls.appendChild(this.menu);
        this.controls.appendChild(this.slider);
        this.controls.appendChild(this.checkbox);
        menuContainer.appendChild(this.controls);
    }

    BgSelect.prototype.setBg = function (trigger) {
        var image = this.images[this.menu.selectedIndex];
        var imagePath = image["path"] ? image["path"] : image;
        if (trigger == "menu" && image["slider"]) { this.slider.value = image["slider"]; }
        var lightness = ((Number(this.slider.value) - 50) / 50).toString();

        if (this.checkbox.checked) {
            this.element.style.filter = "grayscale(100%)";
        } else {
            this.element.style.filter = "grayscale(0%)";
        }

        if (lightness >= 0) {
            this.element.style.backgroundImage = "linear-gradient(rgba(255, 255, 255, " + lightness + "), rgba(255, 255, 255, " + lightness + ")), url('" + imagePath + "')";
            console.log("image: %s\nlightness: %s\nslider: %s\ngrayscale: %s", imagePath, lightness, Number(this.slider.value), this.checkbox.checked);
        } else {
            var darkness = Math.abs(lightness);
            this.element.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, " + darkness + "), rgba(0, 0, 0, " + darkness + ")), url('" + imagePath + "')";
            console.log("image: %s\ndarkness: %s\nslider: %s\ngrayscale: %s", imagePath, darkness, Number(this.slider.value), this.checkbox.checked);
        }

        image["size"] ? this.element.style.backgroundSize = image["size"] : this.element.style.backgroundSize = null;
        image["position"] ? this.element.style.backgroundPosition = image["position"] : this.element.style.backgroundPosition = null;
    }

    bgTestingObjects.forEach(function (obj) {
        obj.element.removeAttribute("data-background-images");
        obj.menu.onchange = obj.setBg.bind(obj, "menu");
        obj.slider.onchange = obj.setBg.bind(obj);
        obj.checkbox.onchange = obj.setBg.bind(obj);
        obj.slider.ondblclick = function () {
            obj.slider.value = 50;
            obj.setBg();
        }
    });

/*
 * Analytics
 */

    analyticsObjects = [];

    toArray(document.querySelectorAll("[data-analytics-category][data-analytics-action][data-analytics-label]")).forEach(function (element) {
        analyticsObjects.push(new AnalyticsEventObj(element));
    });

    function AnalyticsEventObj(element) {
        this.element = element;
        this.category = element.getAttribute("data-analytics-category");
        this.action = element.getAttribute("data-analytics-action");
        this.label = element.getAttribute("data-analytics-label");
        this.new_tab = element.getAttribute("target") == "_blank";
    };

    if (jekyllEnv == 'production') {
        AnalyticsEventObj.prototype.send = function () {
            var callback = arguments.length > 0 && arguments[0] != undefined ? arguments[0] : function(){};
            ga("send", "event", this.category, this.action, this.label, {
                "hitCallback": callback
            });
        }
    } else {
        AnalyticsEventObj.prototype.send = function (callback) {
            var cbString = callback ? ', {\n    "hitCallback": ' + callback + '\n}' : '';
            console.log('Google Analytics Event: ga("send", "event", "%s", "%s", "%s"%s)', this.category, this.action, this.label, cbString);
            callback ? callback() : undefined;
        }
    }

    AnalyticsEventObj.prototype.addListener = function () {
        if (this.element instanceof HTMLIFrameElement && this.action == "click") {
            this.listener = iFrameClickEventListener.bind(null, this);
            window.addEventListener("blur", this.listener, passive);
        } else if (this.action == "click") {
            this.listener = linkClickEventListener.bind(null, this)
            this.element.addEventListener("click", this.listener);
        } else if (this.action == "view") {
            this.listener = scrollToViewEventListener.bind(null, this);
            window.addEventListener("scroll", this.listener, passive);
        }
    };

    function linkClickEventListener(eventObj, event) {
        if (window.origin == eventObj.element.origin || eventObj.new_tab) {
            eventObj.send();
        } else {
            event.preventDefault();
            var linkFollowed = false;
            function followLink() {
                if (!linkFollowed) {
                    linkFollowed = true;
                    window.open(eventObj.element.href, eventObj.element.target);
                }
            }
            window.setTimeout(followLink, 1000);
            eventObj.send(followLink);
        }
    };

    function scrollToViewEventListener(eventObj) {
        if (distToBottom(eventObj.element) <= 0) {
            eventObj.send();
            window.removeEventListener("scroll", eventObj.listener, passive);
        }
    };

    function iFrameClickEventListener(eventObj) {
        window.setTimeout(function () {
            if (document.activeElement === eventObj.element) {
                eventObj.send();
                eventObj.element.addEventListener("mouseout", function refocus() {
                    window.focus();
                    this.removeEventListener("mouseout", refocus, passive);
                }, passive);
                window.removeEventListener("blur", eventObj.listener, passive);
            }
        }, 0);
    };

/*
 * Event Listeners
 */

    var passive = false;

    try {
        var options = Object.defineProperty({}, "passive", {
            get: function() {
                passive = { passive: true };
            }
        });

        window.addEventListener("test", null, options);
    } catch(err) {}

    function addSmoothScrollListeners() {
        smoothLinks.forEach(function (link) {
            link.element.addEventListener("click", function (event) {
                event.preventDefault();
                link.scroll();
            });
        });
    };

    function addOrientationChangeListener() {
        var initOrientation = window.innerHeight > window.innerWidth;
        if (fullscreenElements.length > 0) {
            window.addEventListener("resize", function () {
                var newOrientation = window.innerHeight > window.innerWidth;
                if (newOrientation != initOrientation) {
                    forceFullscreenAll();
                }
                initOrientation = newOrientation;
            }, passive);
        }
    };

    var elementsToHideOnScroll = toArray(document.querySelectorAll("[data-hide-on-scroll]"));

    function addHideOnScrollListener() {
        win.addEventListener("scroll", function hideOnScroll() {
            var stop = this.removeEventListener.bind(this, "scroll", hideOnScroll, false);
            if (elementsToHideOnScroll.length == 0) {
                stop();
            } else {
                elementsToHideOnScroll.forEach(function (element, i) {
                    if (element.getBoundingClientRect().bottom < 0) {
                        element.style.display = "none";
                        elementsToHideOnScroll.splice(i, 1);
                    }
                });
            }
        }, passive);
    };

    function addRobResizeListener() {
        window.addEventListener("resize", function () {
            robResize();
        }, passive);
    }

    if (smoothLinks.length > 0 && pageScrollBehavior != "smooth") {
        addSmoothScrollListeners();
    }

    if (fullscreenElements.length > 0) {
        addOrientationChangeListener();
        forceFullscreenAll();
    }

    if (elementsToHideOnScroll.length > 0) {
        addHideOnScrollListener();
    }

    if (analyticsObjects.length > 0 && hasGoogleAnalytics) {
        analyticsObjects.forEach(function (object) {
            object.addListener();
        });
    }

    if (rob && robContainer) {
        addRobResizeListener();
        robResize();
    }

{% unless jekyll.environment == "development" %}
})();
{% endunless %}
