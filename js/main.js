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
 * Object Fit Fallback
 */

    var objectFitElements = [];

    toArray(document.querySelectorAll('[class*="object-fit"]')).forEach(function (element) {
        objectFitElements.push(new ObjectFit(element));
    });

    function ObjectFit(element) {
        this.container = element;
        this.img = getChildBySelector(element, "img", 1);
    }

    ObjectFit.prototype.fallback = function () {
        if (this.img) {
            this.container.style.backgroundImage = "url(" + this.img.src + ")";
            this.img.parentNode.removeChild(this.img);
        }
    }

    function objectFitFallback() {
        objectFitElements.forEach(function (object) {
            object.fallback();
        });
    }

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
        this.firstInteraction = true;
        this.isIFrame = false;
    };

    AnalyticsEventObj.prototype.send = function () {
        ga("send", "event", this.category, this.action, this.label);
        this.firstInteraction = false;
    };

    AnalyticsEventObj.prototype.addListener = function () {
        if (this.element instanceof HTMLIFrameElement && this.action == "click") {
            window.addEventListener("blur", iFrameClickEventListener, passive);
            this.isIFrame = true;
        } else if (this.action == "click") {
            this.element.addEventListener("click", this.send.bind(this), passive);
        }
    };

    function iFrameClickEventListener() {
        window.setTimeout(function () {
            element = document.activeElement;
            for (var i=0; i < analyticsObjects.length; i++) {
                obj = analyticsObjects[i];
                if (element === obj.element && obj.isIFrame && obj.firstInteraction) {
                    obj.send();
                    break;
                }
            }
            element.addEventListener("mouseout", function refocus() {
                window.focus();
                this.removeEventListener("mouseout", refocus, passive);
            }, passive);
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
    }

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

    if (objectFitElements.length > 0 && !CSS.supports("object-fit", "cover")) {
        objectFitFallback();
    }

    if (elementsToHideOnScroll.length > 0) {
        addHideOnScrollListener();
    }

    if (analyticsObjects.length > 0 && hasGoogleAnalytics && jekyllEnv == "gulp") {
        analyticsObjects.forEach(function (object) {
            object.addListener()
        });
    }

    if (rob && robContainer) {
        addRobResizeListener();
        robResize();
    }

{% unless jekyll.environment == "development" %}
})();
{% endunless %}
