(function(window, undefined) {
    var rootjQuery, readyList, document = window.document, location = window.location, navigator = window.navigator, _jQuery = window.jQuery, _$ = window.$, core_push = Array.prototype.push, core_slice = Array.prototype.slice, core_indexOf = Array.prototype.indexOf, core_toString = Object.prototype.toString, core_hasOwn = Object.prototype.hasOwnProperty, core_trim = String.prototype.trim, jQuery = function(selector, context) {
        return new jQuery.fn.init(selector,context,rootjQuery)
    }, core_pnum = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source, core_rnotwhite = /\S/, core_rspace = /\s+/, rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, rquickExpr = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/, rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, rvalidchars = /^[\],:{}\s]*$/, rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g, rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g, rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g, rmsPrefix = /^-ms-/, rdashAlpha = /-([\da-z])/gi, fcamelCase = function(all, letter) {
        return (letter + "").toUpperCase()
    }, DOMContentLoaded = function() {
        if (document.addEventListener) {
            document.removeEventListener("DOMContentLoaded", DOMContentLoaded, false);
            jQuery.ready()
        } else if (document.readyState === "complete") {
            document.detachEvent("onreadystatechange", DOMContentLoaded);
            jQuery.ready()
        }
    }, class2type = {};
    jQuery.fn = jQuery.prototype = {
        constructor: jQuery,
        init: function(selector, context, rootjQuery) {
            var match, elem, ret, doc;
            if (!selector) {
                return this
            }
            if (selector.nodeType) {
                this.context = this[0] = selector;
                this.length = 1;
                return this
            }
            if (typeof selector === "string") {
                if (selector.charAt(0) === "<" && selector.charAt(selector.length - 1) === ">" && selector.length >= 3) {
                    match = [null, selector, null]
                } else {
                    match = rquickExpr.exec(selector)
                }
                if (match && (match[1] || !context)) {
                    if (match[1]) {
                        context = context instanceof jQuery ? context[0] : context;
                        doc = (context && context.nodeType ? context.ownerDocument || context : document);
                        selector = jQuery.parseHTML(match[1], doc, true);
                        if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
                            this.attr.call(selector, context, true)
                        }
                        return jQuery.merge(this, selector)
                    } else {
                        elem = document.getElementById(match[2]);
                        if (elem && elem.parentNode) {
                            if (elem.id !== match[2]) {
                                return rootjQuery.find(selector)
                            }
                            this.length = 1;
                            this[0] = elem
                        }
                        this.context = document;
                        this.selector = selector;
                        return this
                    }
                } else if (!context || context.jquery) {
                    return (context || rootjQuery).find(selector)
                } else {
                    return this.constructor(context).find(selector)
                }
            } else if (jQuery.isFunction(selector)) {
                return rootjQuery.ready(selector)
            }
            if (selector.selector !== undefined) {
                this.selector = selector.selector;
                this.context = selector.context
            }
            return jQuery.makeArray(selector, this)
        },
        selector: "",
        jquery: "1.8.3",
        length: 0,
        size: function() {
            return this.length
        },
        toArray: function() {
            return core_slice.call(this)
        },
        get: function(num) {
            return num == null ? this.toArray() : (num < 0 ? this[this.length + num] : this[num])
        },
        pushStack: function(elems, name, selector) {
            var ret = jQuery.merge(this.constructor(), elems);
            ret.prevObject = this;
            ret.context = this.context;
            if (name === "find") {
                ret.selector = this.selector + (this.selector ? " " : "") + selector
            } else if (name) {
                ret.selector = this.selector + "." + name + "(" + selector + ")"
            }
            return ret
        },
        each: function(callback, args) {
            return jQuery.each(this, callback, args)
        },
        ready: function(fn) {
            jQuery.ready.promise().done(fn);
            return this
        },
        eq: function(i) {
            i = +i;
            return i === -1 ? this.slice(i) : this.slice(i, i + 1)
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        slice: function() {
            return this.pushStack(core_slice.apply(this, arguments), "slice", core_slice.call(arguments).join(","))
        },
        map: function(callback) {
            return this.pushStack(jQuery.map(this, function(elem, i) {
                return callback.call(elem, i, elem)
            }))
        },
        end: function() {
            return this.prevObject || this.constructor(null)
        },
        push: core_push,
        sort: [].sort,
        splice: [].splice
    };
    jQuery.fn.init.prototype = jQuery.fn;
    jQuery.extend = jQuery.fn.extend = function() {
        var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;
        if (typeof target === "boolean") {
            deep = target;
            target = arguments[1] || {};
            i = 2
        }
        if (typeof target !== "object" && !jQuery.isFunction(target)) {
            target = {}
        }
        if (length === i) {
            target = this;
            --i
        }
        for (; i < length; i++) {
            if ((options = arguments[i]) != null) {
                for (name in options) {
                    src = target[name];
                    copy = options[name];
                    if (target === copy) {
                        continue
                    }
                    if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && jQuery.isArray(src) ? src : []
                        } else {
                            clone = src && jQuery.isPlainObject(src) ? src : {}
                        }
                        target[name] = jQuery.extend(deep, clone, copy)
                    } else if (copy !== undefined) {
                        target[name] = copy
                    }
                }
            }
        }
        return target
    }
    ;
    jQuery.extend({
        noConflict: function(deep) {
            if (window.$ === jQuery) {
                window.$ = _$
            }
            if (deep && window.jQuery === jQuery) {
                window.jQuery = _jQuery
            }
            return jQuery
        },
        isReady: false,
        readyWait: 1,
        holdReady: function(hold) {
            if (hold) {
                jQuery.readyWait++
            } else {
                jQuery.ready(true)
            }
        },
        ready: function(wait) {
            if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
                return
            }
            if (!document.body) {
                return setTimeout(jQuery.ready, 1)
            }
            jQuery.isReady = true;
            if (wait !== true && --jQuery.readyWait > 0) {
                return
            }
            readyList.resolveWith(document, [jQuery]);
            if (jQuery.fn.trigger) {
                jQuery(document).trigger("ready").off("ready")
            }
        },
        isFunction: function(obj) {
            return jQuery.type(obj) === "function"
        },
        isArray: Array.isArray || function(obj) {
            return jQuery.type(obj) === "array"
        }
        ,
        isWindow: function(obj) {
            return obj != null && obj == obj.window
        },
        isNumeric: function(obj) {
            return !isNaN(parseFloat(obj)) && isFinite(obj)
        },
        type: function(obj) {
            return obj == null ? String(obj) : class2type[core_toString.call(obj)] || "object"
        },
        isPlainObject: function(obj) {
            if (!obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj)) {
                return false
            }
            try {
                if (obj.constructor && !core_hasOwn.call(obj, "constructor") && !core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
                    return false
                }
            } catch (e) {
                return false
            }
            var key;
            for (key in obj) {}
            return key === undefined || core_hasOwn.call(obj, key)
        },
        isEmptyObject: function(obj) {
            var name;
            for (name in obj) {
                return false
            }
            return true
        },
        error: function(msg) {
            throw new Error(msg);
        },
        parseHTML: function(data, context, scripts) {
            var parsed;
            if (!data || typeof data !== "string") {
                return null
            }
            if (typeof context === "boolean") {
                scripts = context;
                context = 0
            }
            context = context || document;
            if ((parsed = rsingleTag.exec(data))) {
                return [context.createElement(parsed[1])]
            }
            parsed = jQuery.buildFragment([data], context, scripts ? null : []);
            return jQuery.merge([], (parsed.cacheable ? jQuery.clone(parsed.fragment) : parsed.fragment).childNodes)
        },
        parseJSON: function(data) {
            if (!data || typeof data !== "string") {
                return null
            }
            data = jQuery.trim(data);
            if (window.JSON && window.JSON.parse) {
                return window.JSON.parse(data)
            }
            if (rvalidchars.test(data.replace(rvalidescape, "@").replace(rvalidtokens, "]").replace(rvalidbraces, ""))) {
                return (new Function("return " + data))()
            }
            jQuery.error("Invalid JSON: " + data)
        },
        parseXML: function(data) {
            var xml, tmp;
            if (!data || typeof data !== "string") {
                return null
            }
            try {
                if (window.DOMParser) {
                    tmp = new DOMParser();
                    xml = tmp.parseFromString(data, "text/xml")
                } else {
                    xml = new ActiveXObject("Microsoft.XMLDOM");
                    xml.async = "false";
                    xml.loadXML(data)
                }
            } catch (e) {
                xml = undefined
            }
            if (!xml || !xml.documentElement || xml.getElementsByTagName("parsererror").length) {
                jQuery.error("Invalid XML: " + data)
            }
            return xml
        },
        noop: function() {},
        globalEval: function(data) {
            if (data && core_rnotwhite.test(data)) {
                (window.execScript || function(data) {
                    window["eval"].call(window, data)
                }
                )(data)
            }
        },
        camelCase: function(string) {
            return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase)
        },
        nodeName: function(elem, name) {
            return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase()
        },
        each: function(obj, callback, args) {
            var name, i = 0, length = obj.length, isObj = length === undefined || jQuery.isFunction(obj);
            if (args) {
                if (isObj) {
                    for (name in obj) {
                        if (callback.apply(obj[name], args) === false) {
                            break
                        }
                    }
                } else {
                    for (; i < length; ) {
                        if (callback.apply(obj[i++], args) === false) {
                            break
                        }
                    }
                }
            } else {
                if (isObj) {
                    for (name in obj) {
                        if (callback.call(obj[name], name, obj[name]) === false) {
                            break
                        }
                    }
                } else {
                    for (; i < length; ) {
                        if (callback.call(obj[i], i, obj[i++]) === false) {
                            break
                        }
                    }
                }
            }
            return obj
        },
        trim: core_trim && !core_trim.call("\uFEFF\xA0") ? function(text) {
            return text == null ? "" : core_trim.call(text)
        }
        : function(text) {
            return text == null ? "" : (text + "").replace(rtrim, "")
        }
        ,
        makeArray: function(arr, results) {
            var type, ret = results || [];
            if (arr != null) {
                type = jQuery.type(arr);
                if (arr.length == null || type === "string" || type === "function" || type === "regexp" || jQuery.isWindow(arr)) {
                    core_push.call(ret, arr)
                } else {
                    jQuery.merge(ret, arr)
                }
            }
            return ret
        },
        inArray: function(elem, arr, i) {
            var len;
            if (arr) {
                if (core_indexOf) {
                    return core_indexOf.call(arr, elem, i)
                }
                len = arr.length;
                i = i ? i < 0 ? Math.max(0, len + i) : i : 0;
                for (; i < len; i++) {
                    if (i in arr && arr[i] === elem) {
                        return i
                    }
                }
            }
            return -1
        },
        merge: function(first, second) {
            var l = second.length
              , i = first.length
              , j = 0;
            if (typeof l === "number") {
                for (; j < l; j++) {
                    first[i++] = second[j]
                }
            } else {
                while (second[j] !== undefined) {
                    first[i++] = second[j++]
                }
            }
            first.length = i;
            return first
        },
        grep: function(elems, callback, inv) {
            var retVal, ret = [], i = 0, length = elems.length;
            inv = !!inv;
            for (; i < length; i++) {
                retVal = !!callback(elems[i], i);
                if (inv !== retVal) {
                    ret.push(elems[i])
                }
            }
            return ret
        },
        map: function(elems, callback, arg) {
            var value, key, ret = [], i = 0, length = elems.length, isArray = elems instanceof jQuery || length !== undefined && typeof length === "number" && ((length > 0 && elems[0] && elems[length - 1]) || length === 0 || jQuery.isArray(elems));
            if (isArray) {
                for (; i < length; i++) {
                    value = callback(elems[i], i, arg);
                    if (value != null) {
                        ret[ret.length] = value
                    }
                }
            } else {
                for (key in elems) {
                    value = callback(elems[key], key, arg);
                    if (value != null) {
                        ret[ret.length] = value
                    }
                }
            }
            return ret.concat.apply([], ret)
        },
        guid: 1,
        proxy: function(fn, context) {
            var tmp, args, proxy;
            if (typeof context === "string") {
                tmp = fn[context];
                context = fn;
                fn = tmp
            }
            if (!jQuery.isFunction(fn)) {
                return undefined
            }
            args = core_slice.call(arguments, 2);
            proxy = function() {
                return fn.apply(context, args.concat(core_slice.call(arguments)))
            }
            ;
            proxy.guid = fn.guid = fn.guid || jQuery.guid++;
            return proxy
        },
        access: function(elems, fn, key, value, chainable, emptyGet, pass) {
            var exec, bulk = key == null, i = 0, length = elems.length;
            if (key && typeof key === "object") {
                for (i in key) {
                    jQuery.access(elems, fn, i, key[i], 1, emptyGet, value)
                }
                chainable = 1
            } else if (value !== undefined) {
                exec = pass === undefined && jQuery.isFunction(value);
                if (bulk) {
                    if (exec) {
                        exec = fn;
                        fn = function(elem, key, value) {
                            return exec.call(jQuery(elem), value)
                        }
                    } else {
                        fn.call(elems, value);
                        fn = null
                    }
                }
                if (fn) {
                    for (; i < length; i++) {
                        fn(elems[i], key, exec ? value.call(elems[i], i, fn(elems[i], key)) : value, pass)
                    }
                }
                chainable = 1
            }
            return chainable ? elems : bulk ? fn.call(elems) : length ? fn(elems[0], key) : emptyGet
        },
        now: function() {
            return (new Date()).getTime()
        }
    });
    jQuery.ready.promise = function(obj) {
        if (!readyList) {
            readyList = jQuery.Deferred();
            if (document.readyState === "complete") {
                setTimeout(jQuery.ready, 1)
            } else if (document.addEventListener) {
                document.addEventListener("DOMContentLoaded", DOMContentLoaded, false);
                window.addEventListener("load", jQuery.ready, false)
            } else {
                document.attachEvent("onreadystatechange", DOMContentLoaded);
                window.attachEvent("onload", jQuery.ready);
                var top = false;
                try {
                    top = window.frameElement == null && document.documentElement
                } catch (e) {}
                if (top && top.doScroll) {
                    (function doScrollCheck() {
                        if (!jQuery.isReady) {
                            try {
                                top.doScroll("left")
                            } catch (e) {
                                return setTimeout(doScrollCheck, 50)
                            }
                            jQuery.ready()
                        }
                    }
                    )()
                }
            }
        }
        return readyList.promise(obj)
    }
    ;
    jQuery.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(i, name) {
        class2type["[object " + name + "]"] = name.toLowerCase()
    });
    rootjQuery = jQuery(document);
    var optionsCache = {};
    function createOptions(options) {
        var object = optionsCache[options] = {};
        jQuery.each(options.split(core_rspace), function(_, flag) {
            object[flag] = true
        });
        return object
    }
    jQuery.Callbacks = function(options) {
        options = typeof options === "string" ? (optionsCache[options] || createOptions(options)) : jQuery.extend({}, options);
        var memory, fired, firing, firingStart, firingLength, firingIndex, list = [], stack = !options.once && [], fire = function(data) {
            memory = options.memory && data;
            fired = true;
            firingIndex = firingStart || 0;
            firingStart = 0;
            firingLength = list.length;
            firing = true;
            for (; list && firingIndex < firingLength; firingIndex++) {
                if (list[firingIndex].apply(data[0], data[1]) === false && options.stopOnFalse) {
                    memory = false;
                    break
                }
            }
            firing = false;
            if (list) {
                if (stack) {
                    if (stack.length) {
                        fire(stack.shift())
                    }
                } else if (memory) {
                    list = []
                } else {
                    self.disable()
                }
            }
        }, self = {
            add: function() {
                if (list) {
                    var start = list.length;
                    (function add(args) {
                        jQuery.each(args, function(_, arg) {
                            var type = jQuery.type(arg);
                            if (type === "function") {
                                if (!options.unique || !self.has(arg)) {
                                    list.push(arg)
                                }
                            } else if (arg && arg.length && type !== "string") {
                                add(arg)
                            }
                        })
                    }
                    )(arguments);
                    if (firing) {
                        firingLength = list.length
                    } else if (memory) {
                        firingStart = start;
                        fire(memory)
                    }
                }
                return this
            },
            remove: function() {
                if (list) {
                    jQuery.each(arguments, function(_, arg) {
                        var index;
                        while ((index = jQuery.inArray(arg, list, index)) > -1) {
                            list.splice(index, 1);
                            if (firing) {
                                if (index <= firingLength) {
                                    firingLength--
                                }
                                if (index <= firingIndex) {
                                    firingIndex--
                                }
                            }
                        }
                    })
                }
                return this
            },
            has: function(fn) {
                return jQuery.inArray(fn, list) > -1
            },
            empty: function() {
                list = [];
                return this
            },
            disable: function() {
                list = stack = memory = undefined;
                return this
            },
            disabled: function() {
                return !list
            },
            lock: function() {
                stack = undefined;
                if (!memory) {
                    self.disable()
                }
                return this
            },
            locked: function() {
                return !stack
            },
            fireWith: function(context, args) {
                args = args || [];
                args = [context, args.slice ? args.slice() : args];
                if (list && (!fired || stack)) {
                    if (firing) {
                        stack.push(args)
                    } else {
                        fire(args)
                    }
                }
                return this
            },
            fire: function() {
                self.fireWith(this, arguments);
                return this
            },
            fired: function() {
                return !!fired
            }
        };
        return self
    }
    ;
    jQuery.extend({
        Deferred: function(func) {
            var tuples = [["resolve", "done", jQuery.Callbacks("once memory"), "resolved"], ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"], ["notify", "progress", jQuery.Callbacks("memory")]]
              , state = "pending"
              , promise = {
                state: function() {
                    return state
                },
                always: function() {
                    deferred.done(arguments).fail(arguments);
                    return this
                },
                then: function() {
                    var fns = arguments;
                    return jQuery.Deferred(function(newDefer) {
                        jQuery.each(tuples, function(i, tuple) {
                            var action = tuple[0]
                              , fn = fns[i];
                            deferred[tuple[1]](jQuery.isFunction(fn) ? function() {
                                var returned = fn.apply(this, arguments);
                                if (returned && jQuery.isFunction(returned.promise)) {
                                    returned.promise().done(newDefer.resolve).fail(newDefer.reject).progress(newDefer.notify)
                                } else {
                                    newDefer[action + "With"](this === deferred ? newDefer : this, [returned])
                                }
                            }
                            : newDefer[action])
                        });
                        fns = null
                    }).promise()
                },
                promise: function(obj) {
                    return obj != null ? jQuery.extend(obj, promise) : promise
                }
            }
              , deferred = {};
            promise.pipe = promise.then;
            jQuery.each(tuples, function(i, tuple) {
                var list = tuple[2]
                  , stateString = tuple[3];
                promise[tuple[1]] = list.add;
                if (stateString) {
                    list.add(function() {
                        state = stateString
                    }, tuples[i ^ 1][2].disable, tuples[2][2].lock)
                }
                deferred[tuple[0]] = list.fire;
                deferred[tuple[0] + "With"] = list.fireWith
            });
            promise.promise(deferred);
            if (func) {
                func.call(deferred, deferred)
            }
            return deferred
        },
        when: function(subordinate) {
            var i = 0, resolveValues = core_slice.call(arguments), length = resolveValues.length, remaining = length !== 1 || (subordinate && jQuery.isFunction(subordinate.promise)) ? length : 0, deferred = remaining === 1 ? subordinate : jQuery.Deferred(), updateFunc = function(i, contexts, values) {
                return function(value) {
                    contexts[i] = this;
                    values[i] = arguments.length > 1 ? core_slice.call(arguments) : value;
                    if (values === progressValues) {
                        deferred.notifyWith(contexts, values)
                    } else if (!(--remaining)) {
                        deferred.resolveWith(contexts, values)
                    }
                }
            }, progressValues, progressContexts, resolveContexts;
            if (length > 1) {
                progressValues = new Array(length);
                progressContexts = new Array(length);
                resolveContexts = new Array(length);
                for (; i < length; i++) {
                    if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)) {
                        resolveValues[i].promise().done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject).progress(updateFunc(i, progressContexts, progressValues))
                    } else {
                        --remaining
                    }
                }
            }
            if (!remaining) {
                deferred.resolveWith(resolveContexts, resolveValues)
            }
            return deferred.promise()
        }
    });
    jQuery.support = (function() {
        var support, all, a, select, opt, input, fragment, eventName, i, isSupported, clickFn, div = document.createElement("div");
        div.setAttribute("className", "t");
        div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
        all = div.getElementsByTagName("*");
        a = div.getElementsByTagName("a")[0];
        if (!all || !a || !all.length) {
            return {}
        }
        select = document.createElement("select");
        opt = select.appendChild(document.createElement("option"));
        input = div.getElementsByTagName("input")[0];
        a.style.cssText = "top:1px;float:left;opacity:.5";
        support = {
            leadingWhitespace: (div.firstChild.nodeType === 3),
            tbody: !div.getElementsByTagName("tbody").length,
            htmlSerialize: !!div.getElementsByTagName("link").length,
            style: /top/.test(a.getAttribute("style")),
            hrefNormalized: (a.getAttribute("href") === "/a"),
            opacity: /^0.5/.test(a.style.opacity),
            cssFloat: !!a.style.cssFloat,
            checkOn: (input.value === "on"),
            optSelected: opt.selected,
            getSetAttribute: div.className !== "t",
            enctype: !!document.createElement("form").enctype,
            html5Clone: document.createElement("nav").cloneNode(true).outerHTML !== "<:nav></:nav>",
            boxModel: (document.compatMode === "CSS1Compat"),
            submitBubbles: true,
            changeBubbles: true,
            focusinBubbles: false,
            deleteExpando: true,
            noCloneEvent: true,
            inlineBlockNeedsLayout: false,
            shrinkWrapBlocks: false,
            reliableMarginRight: true,
            boxSizingReliable: true,
            pixelPosition: false
        };
        input.checked = true;
        support.noCloneChecked = input.cloneNode(true).checked;
        select.disabled = true;
        support.optDisabled = !opt.disabled;
        try {
            delete div.test
        } catch (e) {
            support.deleteExpando = false
        }
        if (!div.addEventListener && div.attachEvent && div.fireEvent) {
            div.attachEvent("onclick", clickFn = function() {
                support.noCloneEvent = false
            }
            );
            div.cloneNode(true).fireEvent("onclick");
            div.detachEvent("onclick", clickFn)
        }
        input = document.createElement("input");
        input.value = "t";
        input.setAttribute("type", "radio");
        support.radioValue = input.value === "t";
        input.setAttribute("checked", "checked");
        input.setAttribute("name", "t");
        div.appendChild(input);
        fragment = document.createDocumentFragment();
        fragment.appendChild(div.lastChild);
        support.checkClone = fragment.cloneNode(true).cloneNode(true).lastChild.checked;
        support.appendChecked = input.checked;
        fragment.removeChild(input);
        fragment.appendChild(div);
        if (div.attachEvent) {
            for (i in {
                submit: true,
                change: true,
                focusin: true
            }) {
                eventName = "on" + i;
                isSupported = (eventName in div);
                if (!isSupported) {
                    div.setAttribute(eventName, "return;");
                    isSupported = (typeof div[eventName] === "function")
                }
                support[i + "Bubbles"] = isSupported
            }
        }
        jQuery(function() {
            var container, div, tds, marginDiv, divReset = "padding:0;margin:0;border:0;display:block;overflow:hidden;", body = document.getElementsByTagName("body")[0];
            if (!body) {
                return
            }
            container = document.createElement("div");
            container.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px";
            body.insertBefore(container, body.firstChild);
            div = document.createElement("div");
            container.appendChild(div);
            div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
            tds = div.getElementsByTagName("td");
            tds[0].style.cssText = "padding:0;margin:0;border:0;display:none";
            isSupported = (tds[0].offsetHeight === 0);
            tds[0].style.display = "";
            tds[1].style.display = "none";
            support.reliableHiddenOffsets = isSupported && (tds[0].offsetHeight === 0);
            div.innerHTML = "";
            div.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;";
            support.boxSizing = (div.offsetWidth === 4);
            support.doesNotIncludeMarginInBodyOffset = (body.offsetTop !== 1);
            if (window.getComputedStyle) {
                support.pixelPosition = (window.getComputedStyle(div, null) || {}).top !== "1%";
                support.boxSizingReliable = (window.getComputedStyle(div, null) || {
                    width: "4px"
                }).width === "4px";
                marginDiv = document.createElement("div");
                marginDiv.style.cssText = div.style.cssText = divReset;
                marginDiv.style.marginRight = marginDiv.style.width = "0";
                div.style.width = "1px";
                div.appendChild(marginDiv);
                support.reliableMarginRight = !parseFloat((window.getComputedStyle(marginDiv, null) || {}).marginRight)
            }
            if (typeof div.style.zoom !== "undefined") {
                div.innerHTML = "";
                div.style.cssText = divReset + "width:1px;padding:1px;display:inline;zoom:1";
                support.inlineBlockNeedsLayout = (div.offsetWidth === 3);
                div.style.display = "block";
                div.style.overflow = "visible";
                div.innerHTML = "<div></div>";
                div.firstChild.style.width = "5px";
                support.shrinkWrapBlocks = (div.offsetWidth !== 3);
                container.style.zoom = 1
            }
            body.removeChild(container);
            container = div = tds = marginDiv = null
        });
        fragment.removeChild(div);
        all = a = select = opt = input = fragment = div = null;
        return support
    }
    )();
    var rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/
      , rmultiDash = /([A-Z])/g;
    jQuery.extend({
        cache: {},
        deletedIds: [],
        uuid: 0,
        expando: "jQuery" + (jQuery.fn.jquery + Math.random()).replace(/\D/g, ""),
        noData: {
            "embed": true,
            "object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
            "applet": true
        },
        hasData: function(elem) {
            elem = elem.nodeType ? jQuery.cache[elem[jQuery.expando]] : elem[jQuery.expando];
            return !!elem && !isEmptyDataObject(elem)
        },
        data: function(elem, name, data, pvt) {
            if (!jQuery.acceptData(elem)) {
                return
            }
            var thisCache, ret, internalKey = jQuery.expando, getByName = typeof name === "string", isNode = elem.nodeType, cache = isNode ? jQuery.cache : elem, id = isNode ? elem[internalKey] : elem[internalKey] && internalKey;
            if ((!id || !cache[id] || (!pvt && !cache[id].data)) && getByName && data === undefined) {
                return
            }
            if (!id) {
                if (isNode) {
                    elem[internalKey] = id = jQuery.deletedIds.pop() || jQuery.guid++
                } else {
                    id = internalKey
                }
            }
            if (!cache[id]) {
                cache[id] = {};
                if (!isNode) {
                    cache[id].toJSON = jQuery.noop
                }
            }
            if (typeof name === "object" || typeof name === "function") {
                if (pvt) {
                    cache[id] = jQuery.extend(cache[id], name)
                } else {
                    cache[id].data = jQuery.extend(cache[id].data, name)
                }
            }
            thisCache = cache[id];
            if (!pvt) {
                if (!thisCache.data) {
                    thisCache.data = {}
                }
                thisCache = thisCache.data
            }
            if (data !== undefined) {
                thisCache[jQuery.camelCase(name)] = data
            }
            if (getByName) {
                ret = thisCache[name];
                if (ret == null) {
                    ret = thisCache[jQuery.camelCase(name)]
                }
            } else {
                ret = thisCache
            }
            return ret
        },
        removeData: function(elem, name, pvt) {
            if (!jQuery.acceptData(elem)) {
                return
            }
            var thisCache, i, l, isNode = elem.nodeType, cache = isNode ? jQuery.cache : elem, id = isNode ? elem[jQuery.expando] : jQuery.expando;
            if (!cache[id]) {
                return
            }
            if (name) {
                thisCache = pvt ? cache[id] : cache[id].data;
                if (thisCache) {
                    if (!jQuery.isArray(name)) {
                        if (name in thisCache) {
                            name = [name]
                        } else {
                            name = jQuery.camelCase(name);
                            if (name in thisCache) {
                                name = [name]
                            } else {
                                name = name.split(" ")
                            }
                        }
                    }
                    for (i = 0,
                    l = name.length; i < l; i++) {
                        delete thisCache[name[i]]
                    }
                    if (!(pvt ? isEmptyDataObject : jQuery.isEmptyObject)(thisCache)) {
                        return
                    }
                }
            }
            if (!pvt) {
                delete cache[id].data;
                if (!isEmptyDataObject(cache[id])) {
                    return
                }
            }
            if (isNode) {
                jQuery.cleanData([elem], true)
            } else if (jQuery.support.deleteExpando || cache != cache.window) {
                delete cache[id]
            } else {
                cache[id] = null
            }
        },
        _data: function(elem, name, data) {
            return jQuery.data(elem, name, data, true)
        },
        acceptData: function(elem) {
            var noData = elem.nodeName && jQuery.noData[elem.nodeName.toLowerCase()];
            return !noData || noData !== true && elem.getAttribute("classid") === noData
        }
    });
    jQuery.fn.extend({
        data: function(key, value) {
            var parts, part, attr, name, l, elem = this[0], i = 0, data = null;
            if (key === undefined) {
                if (this.length) {
                    data = jQuery.data(elem);
                    if (elem.nodeType === 1 && !jQuery._data(elem, "parsedAttrs")) {
                        attr = elem.attributes;
                        for (l = attr.length; i < l; i++) {
                            name = attr[i].name;
                            if (!name.indexOf("data-")) {
                                name = jQuery.camelCase(name.substring(5));
                                dataAttr(elem, name, data[name])
                            }
                        }
                        jQuery._data(elem, "parsedAttrs", true)
                    }
                }
                return data
            }
            if (typeof key === "object") {
                return this.each(function() {
                    jQuery.data(this, key)
                })
            }
            parts = key.split(".", 2);
            parts[1] = parts[1] ? "." + parts[1] : "";
            part = parts[1] + "!";
            return jQuery.access(this, function(value) {
                if (value === undefined) {
                    data = this.triggerHandler("getData" + part, [parts[0]]);
                    if (data === undefined && elem) {
                        data = jQuery.data(elem, key);
                        data = dataAttr(elem, key, data)
                    }
                    return data === undefined && parts[1] ? this.data(parts[0]) : data
                }
                parts[1] = value;
                this.each(function() {
                    var self = jQuery(this);
                    self.triggerHandler("setData" + part, parts);
                    jQuery.data(this, key, value);
                    self.triggerHandler("changeData" + part, parts)
                })
            }, null, value, arguments.length > 1, null, false)
        },
        removeData: function(key) {
            return this.each(function() {
                jQuery.removeData(this, key)
            })
        }
    });
    function dataAttr(elem, key, data) {
        if (data === undefined && elem.nodeType === 1) {
            var name = "data-" + key.replace(rmultiDash, "-$1").toLowerCase();
            data = elem.getAttribute(name);
            if (typeof data === "string") {
                try {
                    data = data === "true" ? true : data === "false" ? false : data === "null" ? null : +data + "" === data ? +data : rbrace.test(data) ? jQuery.parseJSON(data) : data
                } catch (e) {}
                jQuery.data(elem, key, data)
            } else {
                data = undefined
            }
        }
        return data
    }
    function isEmptyDataObject(obj) {
        var name;
        for (name in obj) {
            if (name === "data" && jQuery.isEmptyObject(obj[name])) {
                continue
            }
            if (name !== "toJSON") {
                return false
            }
        }
        return true
    }
    jQuery.extend({
        queue: function(elem, type, data) {
            var queue;
            if (elem) {
                type = (type || "fx") + "queue";
                queue = jQuery._data(elem, type);
                if (data) {
                    if (!queue || jQuery.isArray(data)) {
                        queue = jQuery._data(elem, type, jQuery.makeArray(data))
                    } else {
                        queue.push(data)
                    }
                }
                return queue || []
            }
        },
        dequeue: function(elem, type) {
            type = type || "fx";
            var queue = jQuery.queue(elem, type)
              , startLength = queue.length
              , fn = queue.shift()
              , hooks = jQuery._queueHooks(elem, type)
              , next = function() {
                jQuery.dequeue(elem, type)
            };
            if (fn === "inprogress") {
                fn = queue.shift();
                startLength--
            }
            if (fn) {
                if (type === "fx") {
                    queue.unshift("inprogress")
                }
                delete hooks.stop;
                fn.call(elem, next, hooks)
            }
            if (!startLength && hooks) {
                hooks.empty.fire()
            }
        },
        _queueHooks: function(elem, type) {
            var key = type + "queueHooks";
            return jQuery._data(elem, key) || jQuery._data(elem, key, {
                empty: jQuery.Callbacks("once memory").add(function() {
                    jQuery.removeData(elem, type + "queue", true);
                    jQuery.removeData(elem, key, true)
                })
            })
        }
    });
    jQuery.fn.extend({
        queue: function(type, data) {
            var setter = 2;
            if (typeof type !== "string") {
                data = type;
                type = "fx";
                setter--
            }
            if (arguments.length < setter) {
                return jQuery.queue(this[0], type)
            }
            return data === undefined ? this : this.each(function() {
                var queue = jQuery.queue(this, type, data);
                jQuery._queueHooks(this, type);
                if (type === "fx" && queue[0] !== "inprogress") {
                    jQuery.dequeue(this, type)
                }
            })
        },
        dequeue: function(type) {
            return this.each(function() {
                jQuery.dequeue(this, type)
            })
        },
        delay: function(time, type) {
            time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
            type = type || "fx";
            return this.queue(type, function(next, hooks) {
                var timeout = setTimeout(next, time);
                hooks.stop = function() {
                    clearTimeout(timeout)
                }
            })
        },
        clearQueue: function(type) {
            return this.queue(type || "fx", [])
        },
        promise: function(type, obj) {
            var tmp, count = 1, defer = jQuery.Deferred(), elements = this, i = this.length, resolve = function() {
                if (!(--count)) {
                    defer.resolveWith(elements, [elements])
                }
            };
            if (typeof type !== "string") {
                obj = type;
                type = undefined
            }
            type = type || "fx";
            while (i--) {
                tmp = jQuery._data(elements[i], type + "queueHooks");
                if (tmp && tmp.empty) {
                    count++;
                    tmp.empty.add(resolve)
                }
            }
            resolve();
            return defer.promise(obj)
        }
    });
    var nodeHook, boolHook, fixSpecified, rclass = /[\t\r\n]/g, rreturn = /\r/g, rtype = /^(?:button|input)$/i, rfocusable = /^(?:button|input|object|select|textarea)$/i, rclickable = /^a(?:rea|)$/i, rboolean = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i, getSetAttribute = jQuery.support.getSetAttribute;
    jQuery.fn.extend({
        attr: function(name, value) {
            return jQuery.access(this, jQuery.attr, name, value, arguments.length > 1)
        },
        removeAttr: function(name) {
            return this.each(function() {
                jQuery.removeAttr(this, name)
            })
        },
        prop: function(name, value) {
            return jQuery.access(this, jQuery.prop, name, value, arguments.length > 1)
        },
        removeProp: function(name) {
            name = jQuery.propFix[name] || name;
            return this.each(function() {
                try {
                    this[name] = undefined;
                    delete this[name]
                } catch (e) {}
            })
        },
        addClass: function(value) {
            var classNames, i, l, elem, setClass, c, cl;
            if (jQuery.isFunction(value)) {
                return this.each(function(j) {
                    jQuery(this).addClass(value.call(this, j, this.className))
                })
            }
            if (value && typeof value === "string") {
                classNames = value.split(core_rspace);
                for (i = 0,
                l = this.length; i < l; i++) {
                    elem = this[i];
                    if (elem.nodeType === 1) {
                        if (!elem.className && classNames.length === 1) {
                            elem.className = value
                        } else {
                            setClass = " " + elem.className + " ";
                            for (c = 0,
                            cl = classNames.length; c < cl; c++) {
                                if (setClass.indexOf(" " + classNames[c] + " ") < 0) {
                                    setClass += classNames[c] + " "
                                }
                            }
                            elem.className = jQuery.trim(setClass)
                        }
                    }
                }
            }
            return this
        },
        removeClass: function(value) {
            var removes, className, elem, c, cl, i, l;
            if (jQuery.isFunction(value)) {
                return this.each(function(j) {
                    jQuery(this).removeClass(value.call(this, j, this.className))
                })
            }
            if ((value && typeof value === "string") || value === undefined) {
                removes = (value || "").split(core_rspace);
                for (i = 0,
                l = this.length; i < l; i++) {
                    elem = this[i];
                    if (elem.nodeType === 1 && elem.className) {
                        className = (" " + elem.className + " ").replace(rclass, " ");
                        for (c = 0,
                        cl = removes.length; c < cl; c++) {
                            while (className.indexOf(" " + removes[c] + " ") >= 0) {
                                className = className.replace(" " + removes[c] + " ", " ")
                            }
                        }
                        elem.className = value ? jQuery.trim(className) : ""
                    }
                }
            }
            return this
        },
        toggleClass: function(value, stateVal) {
            var type = typeof value
              , isBool = typeof stateVal === "boolean";
            if (jQuery.isFunction(value)) {
                return this.each(function(i) {
                    jQuery(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal)
                })
            }
            return this.each(function() {
                if (type === "string") {
                    var className, i = 0, self = jQuery(this), state = stateVal, classNames = value.split(core_rspace);
                    while ((className = classNames[i++])) {
                        state = isBool ? state : !self.hasClass(className);
                        self[state ? "addClass" : "removeClass"](className)
                    }
                } else if (type === "undefined" || type === "boolean") {
                    if (this.className) {
                        jQuery._data(this, "__className__", this.className)
                    }
                    this.className = this.className || value === false ? "" : jQuery._data(this, "__className__") || ""
                }
            })
        },
        hasClass: function(selector) {
            var className = " " + selector + " "
              , i = 0
              , l = this.length;
            for (; i < l; i++) {
                if (this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf(className) >= 0) {
                    return true
                }
            }
            return false
        },
        val: function(value) {
            var hooks, ret, isFunction, elem = this[0];
            if (!arguments.length) {
                if (elem) {
                    hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];
                    if (hooks && "get"in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
                        return ret
                    }
                    ret = elem.value;
                    return typeof ret === "string" ? ret.replace(rreturn, "") : ret == null ? "" : ret
                }
                return
            }
            isFunction = jQuery.isFunction(value);
            return this.each(function(i) {
                var val, self = jQuery(this);
                if (this.nodeType !== 1) {
                    return
                }
                if (isFunction) {
                    val = value.call(this, i, self.val())
                } else {
                    val = value
                }
                if (val == null) {
                    val = ""
                } else if (typeof val === "number") {
                    val += ""
                } else if (jQuery.isArray(val)) {
                    val = jQuery.map(val, function(value) {
                        return value == null ? "" : value + ""
                    })
                }
                hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];
                if (!hooks || !("set"in hooks) || hooks.set(this, val, "value") === undefined) {
                    this.value = val
                }
            })
        }
    });
    jQuery.extend({
        valHooks: {
            option: {
                get: function(elem) {
                    var val = elem.attributes.value;
                    return !val || val.specified ? elem.value : elem.text
                }
            },
            select: {
                get: function(elem) {
                    var value, option, options = elem.options, index = elem.selectedIndex, one = elem.type === "select-one" || index < 0, values = one ? null : [], max = one ? index + 1 : options.length, i = index < 0 ? max : one ? index : 0;
                    for (; i < max; i++) {
                        option = options[i];
                        if ((option.selected || i === index) && (jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {
                            value = jQuery(option).val();
                            if (one) {
                                return value
                            }
                            values.push(value)
                        }
                    }
                    return values
                },
                set: function(elem, value) {
                    var values = jQuery.makeArray(value);
                    jQuery(elem).find("option").each(function() {
                        this.selected = jQuery.inArray(jQuery(this).val(), values) >= 0
                    });
                    if (!values.length) {
                        elem.selectedIndex = -1
                    }
                    return values
                }
            }
        },
        attrFn: {},
        attr: function(elem, name, value, pass) {
            var ret, hooks, notxml, nType = elem.nodeType;
            if (!elem || nType === 3 || nType === 8 || nType === 2) {
                return
            }
            if (pass && jQuery.isFunction(jQuery.fn[name])) {
                return jQuery(elem)[name](value)
            }
            if (typeof elem.getAttribute === "undefined") {
                return jQuery.prop(elem, name, value)
            }
            notxml = nType !== 1 || !jQuery.isXMLDoc(elem);
            if (notxml) {
                name = name.toLowerCase();
                hooks = jQuery.attrHooks[name] || (rboolean.test(name) ? boolHook : nodeHook)
            }
            if (value !== undefined) {
                if (value === null) {
                    jQuery.removeAttr(elem, name);
                    return
                } else if (hooks && "set"in hooks && notxml && (ret = hooks.set(elem, value, name)) !== undefined) {
                    return ret
                } else {
                    elem.setAttribute(name, value + "");
                    return value
                }
            } else if (hooks && "get"in hooks && notxml && (ret = hooks.get(elem, name)) !== null) {
                return ret
            } else {
                ret = elem.getAttribute(name);
                return ret === null ? undefined : ret
            }
        },
        removeAttr: function(elem, value) {
            var propName, attrNames, name, isBool, i = 0;
            if (value && elem.nodeType === 1) {
                attrNames = value.split(core_rspace);
                for (; i < attrNames.length; i++) {
                    name = attrNames[i];
                    if (name) {
                        propName = jQuery.propFix[name] || name;
                        isBool = rboolean.test(name);
                        if (!isBool) {
                            jQuery.attr(elem, name, "")
                        }
                        elem.removeAttribute(getSetAttribute ? name : propName);
                        if (isBool && propName in elem) {
                            elem[propName] = false
                        }
                    }
                }
            }
        },
        attrHooks: {
            type: {
                set: function(elem, value) {
                    if (rtype.test(elem.nodeName) && elem.parentNode) {
                        jQuery.error("type property can't be changed")
                    } else if (!jQuery.support.radioValue && value === "radio" && jQuery.nodeName(elem, "input")) {
                        var val = elem.value;
                        elem.setAttribute("type", value);
                        if (val) {
                            elem.value = val
                        }
                        return value
                    }
                }
            },
            value: {
                get: function(elem, name) {
                    if (nodeHook && jQuery.nodeName(elem, "button")) {
                        return nodeHook.get(elem, name)
                    }
                    return name in elem ? elem.value : null
                },
                set: function(elem, value, name) {
                    if (nodeHook && jQuery.nodeName(elem, "button")) {
                        return nodeHook.set(elem, value, name)
                    }
                    elem.value = value
                }
            }
        },
        propFix: {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        prop: function(elem, name, value) {
            var ret, hooks, notxml, nType = elem.nodeType;
            if (!elem || nType === 3 || nType === 8 || nType === 2) {
                return
            }
            notxml = nType !== 1 || !jQuery.isXMLDoc(elem);
            if (notxml) {
                name = jQuery.propFix[name] || name;
                hooks = jQuery.propHooks[name]
            }
            if (value !== undefined) {
                if (hooks && "set"in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
                    return ret
                } else {
                    return (elem[name] = value)
                }
            } else {
                if (hooks && "get"in hooks && (ret = hooks.get(elem, name)) !== null) {
                    return ret
                } else {
                    return elem[name]
                }
            }
        },
        propHooks: {
            tabIndex: {
                get: function(elem) {
                    var attributeNode = elem.getAttributeNode("tabindex");
                    return attributeNode && attributeNode.specified ? parseInt(attributeNode.value, 10) : rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ? 0 : undefined
                }
            }
        }
    });
    boolHook = {
        get: function(elem, name) {
            var attrNode, property = jQuery.prop(elem, name);
            return property === true || typeof property !== "boolean" && (attrNode = elem.getAttributeNode(name)) && attrNode.nodeValue !== false ? name.toLowerCase() : undefined
        },
        set: function(elem, value, name) {
            var propName;
            if (value === false) {
                jQuery.removeAttr(elem, name)
            } else {
                propName = jQuery.propFix[name] || name;
                if (propName in elem) {
                    elem[propName] = true
                }
                elem.setAttribute(name, name.toLowerCase())
            }
            return name
        }
    };
    if (!getSetAttribute) {
        fixSpecified = {
            name: true,
            id: true,
            coords: true
        };
        nodeHook = jQuery.valHooks.button = {
            get: function(elem, name) {
                var ret;
                ret = elem.getAttributeNode(name);
                return ret && (fixSpecified[name] ? ret.value !== "" : ret.specified) ? ret.value : undefined
            },
            set: function(elem, value, name) {
                var ret = elem.getAttributeNode(name);
                if (!ret) {
                    ret = document.createAttribute(name);
                    elem.setAttributeNode(ret)
                }
                return (ret.value = value + "")
            }
        };
        jQuery.each(["width", "height"], function(i, name) {
            jQuery.attrHooks[name] = jQuery.extend(jQuery.attrHooks[name], {
                set: function(elem, value) {
                    if (value === "") {
                        elem.setAttribute(name, "auto");
                        return value
                    }
                }
            })
        });
        jQuery.attrHooks.contenteditable = {
            get: nodeHook.get,
            set: function(elem, value, name) {
                if (value === "") {
                    value = "false"
                }
                nodeHook.set(elem, value, name)
            }
        }
    }
    if (!jQuery.support.hrefNormalized) {
        jQuery.each(["href", "src", "width", "height"], function(i, name) {
            jQuery.attrHooks[name] = jQuery.extend(jQuery.attrHooks[name], {
                get: function(elem) {
                    var ret = elem.getAttribute(name, 2);
                    return ret === null ? undefined : ret
                }
            })
        })
    }
    if (!jQuery.support.style) {
        jQuery.attrHooks.style = {
            get: function(elem) {
                return elem.style.cssText.toLowerCase() || undefined
            },
            set: function(elem, value) {
                return (elem.style.cssText = value + "")
            }
        }
    }
    if (!jQuery.support.optSelected) {
        jQuery.propHooks.selected = jQuery.extend(jQuery.propHooks.selected, {
            get: function(elem) {
                var parent = elem.parentNode;
                if (parent) {
                    parent.selectedIndex;
                    if (parent.parentNode) {
                        parent.parentNode.selectedIndex
                    }
                }
                return null
            }
        })
    }
    if (!jQuery.support.enctype) {
        jQuery.propFix.enctype = "encoding"
    }
    if (!jQuery.support.checkOn) {
        jQuery.each(["radio", "checkbox"], function() {
            jQuery.valHooks[this] = {
                get: function(elem) {
                    return elem.getAttribute("value") === null ? "on" : elem.value
                }
            }
        })
    }
    jQuery.each(["radio", "checkbox"], function() {
        jQuery.valHooks[this] = jQuery.extend(jQuery.valHooks[this], {
            set: function(elem, value) {
                if (jQuery.isArray(value)) {
                    return (elem.checked = jQuery.inArray(jQuery(elem).val(), value) >= 0)
                }
            }
        })
    });
    var rformElems = /^(?:textarea|input|select)$/i
      , rtypenamespace = /^([^\.]*|)(?:\.(.+)|)$/
      , rhoverHack = /(?:^|\s)hover(\.\S+|)\b/
      , rkeyEvent = /^key/
      , rmouseEvent = /^(?:mouse|contextmenu)|click/
      , rfocusMorph = /^(?:focusinfocus|focusoutblur)$/
      , hoverHack = function(events) {
        return jQuery.event.special.hover ? events : events.replace(rhoverHack, "mouseenter$1 mouseleave$1")
    };
    jQuery.event = {
        add: function(elem, types, handler, data, selector) {
            var elemData, eventHandle, events, t, tns, type, namespaces, handleObj, handleObjIn, handlers, special;
            if (elem.nodeType === 3 || elem.nodeType === 8 || !types || !handler || !(elemData = jQuery._data(elem))) {
                return
            }
            if (handler.handler) {
                handleObjIn = handler;
                handler = handleObjIn.handler;
                selector = handleObjIn.selector
            }
            if (!handler.guid) {
                handler.guid = jQuery.guid++
            }
            events = elemData.events;
            if (!events) {
                elemData.events = events = {}
            }
            eventHandle = elemData.handle;
            if (!eventHandle) {
                elemData.handle = eventHandle = function(e) {
                    return typeof jQuery !== "undefined" && (!e || jQuery.event.triggered !== e.type) ? jQuery.event.dispatch.apply(eventHandle.elem, arguments) : undefined
                }
                ;
                eventHandle.elem = elem
            }
            types = jQuery.trim(hoverHack(types)).split(" ");
            for (t = 0; t < types.length; t++) {
                tns = rtypenamespace.exec(types[t]) || [];
                type = tns[1];
                namespaces = (tns[2] || "").split(".").sort();
                special = jQuery.event.special[type] || {};
                type = (selector ? special.delegateType : special.bindType) || type;
                special = jQuery.event.special[type] || {};
                handleObj = jQuery.extend({
                    type: type,
                    origType: tns[1],
                    data: data,
                    handler: handler,
                    guid: handler.guid,
                    selector: selector,
                    needsContext: selector && jQuery.expr.match.needsContext.test(selector),
                    namespace: namespaces.join(".")
                }, handleObjIn);
                handlers = events[type];
                if (!handlers) {
                    handlers = events[type] = [];
                    handlers.delegateCount = 0;
                    if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
                        if (elem.addEventListener) {
                            elem.addEventListener(type, eventHandle, false)
                        } else if (elem.attachEvent) {
                            elem.attachEvent("on" + type, eventHandle)
                        }
                    }
                }
                if (special.add) {
                    special.add.call(elem, handleObj);
                    if (!handleObj.handler.guid) {
                        handleObj.handler.guid = handler.guid
                    }
                }
                if (selector) {
                    handlers.splice(handlers.delegateCount++, 0, handleObj)
                } else {
                    handlers.push(handleObj)
                }
                jQuery.event.global[type] = true
            }
            elem = null
        },
        global: {},
        remove: function(elem, types, handler, selector, mappedTypes) {
            var t, tns, type, origType, namespaces, origCount, j, events, special, eventType, handleObj, elemData = jQuery.hasData(elem) && jQuery._data(elem);
            if (!elemData || !(events = elemData.events)) {
                return
            }
            types = jQuery.trim(hoverHack(types || "")).split(" ");
            for (t = 0; t < types.length; t++) {
                tns = rtypenamespace.exec(types[t]) || [];
                type = origType = tns[1];
                namespaces = tns[2];
                if (!type) {
                    for (type in events) {
                        jQuery.event.remove(elem, type + types[t], handler, selector, true)
                    }
                    continue
                }
                special = jQuery.event.special[type] || {};
                type = (selector ? special.delegateType : special.bindType) || type;
                eventType = events[type] || [];
                origCount = eventType.length;
                namespaces = namespaces ? new RegExp("(^|\\.)" + namespaces.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
                for (j = 0; j < eventType.length; j++) {
                    handleObj = eventType[j];
                    if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!namespaces || namespaces.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
                        eventType.splice(j--, 1);
                        if (handleObj.selector) {
                            eventType.delegateCount--
                        }
                        if (special.remove) {
                            special.remove.call(elem, handleObj)
                        }
                    }
                }
                if (eventType.length === 0 && origCount !== eventType.length) {
                    if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
                        jQuery.removeEvent(elem, type, elemData.handle)
                    }
                    delete events[type]
                }
            }
            if (jQuery.isEmptyObject(events)) {
                delete elemData.handle;
                jQuery.removeData(elem, "events", true)
            }
        },
        customEvent: {
            "getData": true,
            "setData": true,
            "changeData": true
        },
        trigger: function(event, data, elem, onlyHandlers) {
            if (elem && (elem.nodeType === 3 || elem.nodeType === 8)) {
                return
            }
            var cache, exclusive, i, cur, old, ontype, special, handle, eventPath, bubbleType, type = event.type || event, namespaces = [];
            if (rfocusMorph.test(type + jQuery.event.triggered)) {
                return
            }
            if (type.indexOf("!") >= 0) {
                type = type.slice(0, -1);
                exclusive = true
            }
            if (type.indexOf(".") >= 0) {
                namespaces = type.split(".");
                type = namespaces.shift();
                namespaces.sort()
            }
            if ((!elem || jQuery.event.customEvent[type]) && !jQuery.event.global[type]) {
                return
            }
            event = typeof event === "object" ? event[jQuery.expando] ? event : new jQuery.Event(type,event) : new jQuery.Event(type);
            event.type = type;
            event.isTrigger = true;
            event.exclusive = exclusive;
            event.namespace = namespaces.join(".");
            event.namespace_re = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
            ontype = type.indexOf(":") < 0 ? "on" + type : "";
            if (!elem) {
                cache = jQuery.cache;
                for (i in cache) {
                    if (cache[i].events && cache[i].events[type]) {
                        jQuery.event.trigger(event, data, cache[i].handle.elem, true)
                    }
                }
                return
            }
            event.result = undefined;
            if (!event.target) {
                event.target = elem
            }
            data = data != null ? jQuery.makeArray(data) : [];
            data.unshift(event);
            special = jQuery.event.special[type] || {};
            if (special.trigger && special.trigger.apply(elem, data) === false) {
                return
            }
            eventPath = [[elem, special.bindType || type]];
            if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
                bubbleType = special.delegateType || type;
                cur = rfocusMorph.test(bubbleType + type) ? elem : elem.parentNode;
                for (old = elem; cur; cur = cur.parentNode) {
                    eventPath.push([cur, bubbleType]);
                    old = cur
                }
                if (old === (elem.ownerDocument || document)) {
                    eventPath.push([old.defaultView || old.parentWindow || window, bubbleType])
                }
            }
            for (i = 0; i < eventPath.length && !event.isPropagationStopped(); i++) {
                cur = eventPath[i][0];
                event.type = eventPath[i][1];
                handle = (jQuery._data(cur, "events") || {})[event.type] && jQuery._data(cur, "handle");
                if (handle) {
                    handle.apply(cur, data)
                }
                handle = ontype && cur[ontype];
                if (handle && jQuery.acceptData(cur) && handle.apply && handle.apply(cur, data) === false) {
                    event.preventDefault()
                }
            }
            event.type = type;
            if (!onlyHandlers && !event.isDefaultPrevented()) {
                if ((!special._default || special._default.apply(elem.ownerDocument, data) === false) && !(type === "click" && jQuery.nodeName(elem, "a")) && jQuery.acceptData(elem)) {
                    if (ontype && elem[type] && ((type !== "focus" && type !== "blur") || event.target.offsetWidth !== 0) && !jQuery.isWindow(elem)) {
                        old = elem[ontype];
                        if (old) {
                            elem[ontype] = null
                        }
                        jQuery.event.triggered = type;
                        elem[type]();
                        jQuery.event.triggered = undefined;
                        if (old) {
                            elem[ontype] = old
                        }
                    }
                }
            }
            return event.result
        },
        dispatch: function(event) {
            event = jQuery.event.fix(event || window.event);
            var i, j, cur, ret, selMatch, matched, matches, handleObj, sel, related, handlers = ((jQuery._data(this, "events") || {})[event.type] || []), delegateCount = handlers.delegateCount, args = core_slice.call(arguments), run_all = !event.exclusive && !event.namespace, special = jQuery.event.special[event.type] || {}, handlerQueue = [];
            args[0] = event;
            event.delegateTarget = this;
            if (special.preDispatch && special.preDispatch.call(this, event) === false) {
                return
            }
            if (delegateCount && !(event.button && event.type === "click")) {
                for (cur = event.target; cur != this; cur = cur.parentNode || this) {
                    if (cur.disabled !== true || event.type !== "click") {
                        selMatch = {};
                        matches = [];
                        for (i = 0; i < delegateCount; i++) {
                            handleObj = handlers[i];
                            sel = handleObj.selector;
                            if (selMatch[sel] === undefined) {
                                selMatch[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) >= 0 : jQuery.find(sel, this, null, [cur]).length
                            }
                            if (selMatch[sel]) {
                                matches.push(handleObj)
                            }
                        }
                        if (matches.length) {
                            handlerQueue.push({
                                elem: cur,
                                matches: matches
                            })
                        }
                    }
                }
            }
            if (handlers.length > delegateCount) {
                handlerQueue.push({
                    elem: this,
                    matches: handlers.slice(delegateCount)
                })
            }
            for (i = 0; i < handlerQueue.length && !event.isPropagationStopped(); i++) {
                matched = handlerQueue[i];
                event.currentTarget = matched.elem;
                for (j = 0; j < matched.matches.length && !event.isImmediatePropagationStopped(); j++) {
                    handleObj = matched.matches[j];
                    if (run_all || (!event.namespace && !handleObj.namespace) || event.namespace_re && event.namespace_re.test(handleObj.namespace)) {
                        event.data = handleObj.data;
                        event.handleObj = handleObj;
                        ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);
                        if (ret !== undefined) {
                            event.result = ret;
                            if (ret === false) {
                                event.preventDefault();
                                event.stopPropagation()
                            }
                        }
                    }
                }
            }
            if (special.postDispatch) {
                special.postDispatch.call(this, event)
            }
            return event.result
        },
        props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(event, original) {
                if (event.which == null) {
                    event.which = original.charCode != null ? original.charCode : original.keyCode
                }
                return event
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(event, original) {
                var eventDoc, doc, body, button = original.button, fromElement = original.fromElement;
                if (event.pageX == null && original.clientX != null) {
                    eventDoc = event.target.ownerDocument || document;
                    doc = eventDoc.documentElement;
                    body = eventDoc.body;
                    event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
                    event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0)
                }
                if (!event.relatedTarget && fromElement) {
                    event.relatedTarget = fromElement === event.target ? original.toElement : fromElement
                }
                if (!event.which && button !== undefined) {
                    event.which = (button & 1 ? 1 : (button & 2 ? 3 : (button & 4 ? 2 : 0)))
                }
                return event
            }
        },
        fix: function(event) {
            if (event[jQuery.expando]) {
                return event
            }
            var i, prop, originalEvent = event, fixHook = jQuery.event.fixHooks[event.type] || {}, copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;
            event = jQuery.Event(originalEvent);
            for (i = copy.length; i; ) {
                prop = copy[--i];
                event[prop] = originalEvent[prop]
            }
            if (!event.target) {
                event.target = originalEvent.srcElement || document
            }
            if (event.target.nodeType === 3) {
                event.target = event.target.parentNode
            }
            event.metaKey = !!event.metaKey;
            return fixHook.filter ? fixHook.filter(event, originalEvent) : event
        },
        special: {
            load: {
                noBubble: true
            },
            focus: {
                delegateType: "focusin"
            },
            blur: {
                delegateType: "focusout"
            },
            beforeunload: {
                setup: function(data, namespaces, eventHandle) {
                    if (jQuery.isWindow(this)) {
                        this.onbeforeunload = eventHandle
                    }
                },
                teardown: function(namespaces, eventHandle) {
                    if (this.onbeforeunload === eventHandle) {
                        this.onbeforeunload = null
                    }
                }
            }
        },
        simulate: function(type, elem, event, bubble) {
            var e = jQuery.extend(new jQuery.Event(), event, {
                type: type,
                isSimulated: true,
                originalEvent: {}
            });
            if (bubble) {
                jQuery.event.trigger(e, null, elem)
            } else {
                jQuery.event.dispatch.call(elem, e)
            }
            if (e.isDefaultPrevented()) {
                event.preventDefault()
            }
        }
    };
    jQuery.event.handle = jQuery.event.dispatch;
    jQuery.removeEvent = document.removeEventListener ? function(elem, type, handle) {
        if (elem.removeEventListener) {
            elem.removeEventListener(type, handle, false)
        }
    }
    : function(elem, type, handle) {
        var name = "on" + type;
        if (elem.detachEvent) {
            if (typeof elem[name] === "undefined") {
                elem[name] = null
            }
            elem.detachEvent(name, handle)
        }
    }
    ;
    jQuery.Event = function(src, props) {
        if (!(this instanceof jQuery.Event)) {
            return new jQuery.Event(src,props)
        }
        if (src && src.type) {
            this.originalEvent = src;
            this.type = src.type;
            this.isDefaultPrevented = (src.defaultPrevented || src.returnValue === false || src.getPreventDefault && src.getPreventDefault()) ? returnTrue : returnFalse
        } else {
            this.type = src
        }
        if (props) {
            jQuery.extend(this, props)
        }
        this.timeStamp = src && src.timeStamp || jQuery.now();
        this[jQuery.expando] = true
    }
    ;
    function returnFalse() {
        return false
    }
    function returnTrue() {
        return true
    }
    jQuery.Event.prototype = {
        preventDefault: function() {
            this.isDefaultPrevented = returnTrue;
            var e = this.originalEvent;
            if (!e) {
                return
            }
            if (e.preventDefault) {
                e.preventDefault()
            } else {
                e.returnValue = false
            }
        },
        stopPropagation: function() {
            this.isPropagationStopped = returnTrue;
            var e = this.originalEvent;
            if (!e) {
                return
            }
            if (e.stopPropagation) {
                e.stopPropagation()
            }
            e.cancelBubble = true
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = returnTrue;
            this.stopPropagation()
        },
        isDefaultPrevented: returnFalse,
        isPropagationStopped: returnFalse,
        isImmediatePropagationStopped: returnFalse
    };
    jQuery.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function(orig, fix) {
        jQuery.event.special[orig] = {
            delegateType: fix,
            bindType: fix,
            handle: function(event) {
                var ret, target = this, related = event.relatedTarget, handleObj = event.handleObj, selector = handleObj.selector;
                if (!related || (related !== target && !jQuery.contains(target, related))) {
                    event.type = handleObj.origType;
                    ret = handleObj.handler.apply(this, arguments);
                    event.type = fix
                }
                return ret
            }
        }
    });
    if (!jQuery.support.submitBubbles) {
        jQuery.event.special.submit = {
            setup: function() {
                if (jQuery.nodeName(this, "form")) {
                    return false
                }
                jQuery.event.add(this, "click._submit keypress._submit", function(e) {
                    var elem = e.target
                      , form = jQuery.nodeName(elem, "input") || jQuery.nodeName(elem, "button") ? elem.form : undefined;
                    if (form && !jQuery._data(form, "_submit_attached")) {
                        jQuery.event.add(form, "submit._submit", function(event) {
                            event._submit_bubble = true
                        });
                        jQuery._data(form, "_submit_attached", true)
                    }
                })
            },
            postDispatch: function(event) {
                if (event._submit_bubble) {
                    delete event._submit_bubble;
                    if (this.parentNode && !event.isTrigger) {
                        jQuery.event.simulate("submit", this.parentNode, event, true)
                    }
                }
            },
            teardown: function() {
                if (jQuery.nodeName(this, "form")) {
                    return false
                }
                jQuery.event.remove(this, "._submit")
            }
        }
    }
    if (!jQuery.support.changeBubbles) {
        jQuery.event.special.change = {
            setup: function() {
                if (rformElems.test(this.nodeName)) {
                    if (this.type === "checkbox" || this.type === "radio") {
                        jQuery.event.add(this, "propertychange._change", function(event) {
                            if (event.originalEvent.propertyName === "checked") {
                                this._just_changed = true
                            }
                        });
                        jQuery.event.add(this, "click._change", function(event) {
                            if (this._just_changed && !event.isTrigger) {
                                this._just_changed = false
                            }
                            jQuery.event.simulate("change", this, event, true)
                        })
                    }
                    return false
                }
                jQuery.event.add(this, "beforeactivate._change", function(e) {
                    var elem = e.target;
                    if (rformElems.test(elem.nodeName) && !jQuery._data(elem, "_change_attached")) {
                        jQuery.event.add(elem, "change._change", function(event) {
                            if (this.parentNode && !event.isSimulated && !event.isTrigger) {
                                jQuery.event.simulate("change", this.parentNode, event, true)
                            }
                        });
                        jQuery._data(elem, "_change_attached", true)
                    }
                })
            },
            handle: function(event) {
                var elem = event.target;
                if (this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox")) {
                    return event.handleObj.handler.apply(this, arguments)
                }
            },
            teardown: function() {
                jQuery.event.remove(this, "._change");
                return !rformElems.test(this.nodeName)
            }
        }
    }
    if (!jQuery.support.focusinBubbles) {
        jQuery.each({
            focus: "focusin",
            blur: "focusout"
        }, function(orig, fix) {
            var attaches = 0
              , handler = function(event) {
                jQuery.event.simulate(fix, event.target, jQuery.event.fix(event), true)
            };
            jQuery.event.special[fix] = {
                setup: function() {
                    if (attaches++ === 0) {
                        document.addEventListener(orig, handler, true)
                    }
                },
                teardown: function() {
                    if (--attaches === 0) {
                        document.removeEventListener(orig, handler, true)
                    }
                }
            }
        })
    }
    jQuery.fn.extend({
        on: function(types, selector, data, fn, one) {
            var origFn, type;
            if (typeof types === "object") {
                if (typeof selector !== "string") {
                    data = data || selector;
                    selector = undefined
                }
                for (type in types) {
                    this.on(type, selector, data, types[type], one)
                }
                return this
            }
            if (data == null && fn == null) {
                fn = selector;
                data = selector = undefined
            } else if (fn == null) {
                if (typeof selector === "string") {
                    fn = data;
                    data = undefined
                } else {
                    fn = data;
                    data = selector;
                    selector = undefined
                }
            }
            if (fn === false) {
                fn = returnFalse
            } else if (!fn) {
                return this
            }
            if (one === 1) {
                origFn = fn;
                fn = function(event) {
                    jQuery().off(event);
                    return origFn.apply(this, arguments)
                }
                ;
                fn.guid = origFn.guid || (origFn.guid = jQuery.guid++)
            }
            return this.each(function() {
                jQuery.event.add(this, types, fn, data, selector)
            })
        },
        one: function(types, selector, data, fn) {
            return this.on(types, selector, data, fn, 1)
        },
        off: function(types, selector, fn) {
            var handleObj, type;
            if (types && types.preventDefault && types.handleObj) {
                handleObj = types.handleObj;
                jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
                return this
            }
            if (typeof types === "object") {
                for (type in types) {
                    this.off(type, selector, types[type])
                }
                return this
            }
            if (selector === false || typeof selector === "function") {
                fn = selector;
                selector = undefined
            }
            if (fn === false) {
                fn = returnFalse
            }
            return this.each(function() {
                jQuery.event.remove(this, types, fn, selector)
            })
        },
        bind: function(types, data, fn) {
            return this.on(types, null, data, fn)
        },
        unbind: function(types, fn) {
            return this.off(types, null, fn)
        },
        live: function(types, data, fn) {
            jQuery(this.context).on(types, this.selector, data, fn);
            return this
        },
        die: function(types, fn) {
            jQuery(this.context).off(types, this.selector || "**", fn);
            return this
        },
        delegate: function(selector, types, data, fn) {
            return this.on(types, selector, data, fn)
        },
        undelegate: function(selector, types, fn) {
            return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn)
        },
        trigger: function(type, data) {
            return this.each(function() {
                jQuery.event.trigger(type, data, this)
            })
        },
        triggerHandler: function(type, data) {
            if (this[0]) {
                return jQuery.event.trigger(type, data, this[0], true)
            }
        },
        toggle: function(fn) {
            var args = arguments
              , guid = fn.guid || jQuery.guid++
              , i = 0
              , toggler = function(event) {
                var lastToggle = (jQuery._data(this, "lastToggle" + fn.guid) || 0) % i;
                jQuery._data(this, "lastToggle" + fn.guid, lastToggle + 1);
                event.preventDefault();
                return args[lastToggle].apply(this, arguments) || false
            };
            toggler.guid = guid;
            while (i < args.length) {
                args[i++].guid = guid
            }
            return this.click(toggler)
        },
        hover: function(fnOver, fnOut) {
            return this.mouseenter(fnOver).mouseleave(fnOut || fnOver)
        }
    });
    jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu").split(" "), function(i, name) {
        jQuery.fn[name] = function(data, fn) {
            if (fn == null) {
                fn = data;
                data = null
            }
            return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name)
        }
        ;
        if (rkeyEvent.test(name)) {
            jQuery.event.fixHooks[name] = jQuery.event.keyHooks
        }
        if (rmouseEvent.test(name)) {
            jQuery.event.fixHooks[name] = jQuery.event.mouseHooks
        }
    });
    (function(window, undefined) {
        var cachedruns, assertGetIdNotName, Expr, getText, isXML, contains, compile, sortOrder, hasDuplicate, outermostContext, baseHasDuplicate = true, strundefined = "undefined", expando = ("sizcache" + Math.random()).replace(".", ""), Token = String, document = window.document, docElem = document.documentElement, dirruns = 0, done = 0, pop = [].pop, push = [].push, slice = [].slice, indexOf = [].indexOf || function(elem) {
            var i = 0
              , len = this.length;
            for (; i < len; i++) {
                if (this[i] === elem) {
                    return i
                }
            }
            return -1
        }
        , markFunction = function(fn, value) {
            fn[expando] = value == null || value;
            return fn
        }, createCache = function() {
            var cache = {}
              , keys = [];
            return markFunction(function(key, value) {
                if (keys.push(key) > Expr.cacheLength) {
                    delete cache[keys.shift()]
                }
                return (cache[key + " "] = value)
            }, cache)
        }, classCache = createCache(), tokenCache = createCache(), compilerCache = createCache(), whitespace = "[\\x20\\t\\r\\n\\f]", characterEncoding = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+", identifier = characterEncoding.replace("w", "w#"), operators = "([*^$|!~]?=)", attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace + "*(?:" + operators + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]", pseudos = ":(" + characterEncoding + ")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:" + attributes + ")|[^:]|\\\\.)*|.*))\\)|)", pos = ":(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$","g"), rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"), rcombinators = new RegExp("^" + whitespace + "*([\\x20\\t\\r\\n\\f>+~])" + whitespace + "*"), rpseudo = new RegExp(pseudos), rquickExpr = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/, rnot = /^:not/, rsibling = /[\x20\t\r\n\f]*[+~]/, rendsWithNot = /:not\($/, rheader = /h\d/i, rinputs = /input|select|textarea|button/i, rbackslash = /\\(?!\\)/g, matchExpr = {
            "ID": new RegExp("^#(" + characterEncoding + ")"),
            "CLASS": new RegExp("^\\.(" + characterEncoding + ")"),
            "NAME": new RegExp("^\\[name=['\"]?(" + characterEncoding + ")['\"]?\\]"),
            "TAG": new RegExp("^(" + characterEncoding.replace("w", "w*") + ")"),
            "ATTR": new RegExp("^" + attributes),
            "PSEUDO": new RegExp("^" + pseudos),
            "POS": new RegExp(pos,"i"),
            "CHILD": new RegExp("^:(only|nth|first|last)-child(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)","i"),
            "needsContext": new RegExp("^" + whitespace + "*[>+~]|" + pos,"i")
        }, assert = function(fn) {
            var div = document.createElement("div");
            try {
                return fn(div)
            } catch (e) {
                return false
            } finally {
                div = null
            }
        }, assertTagNameNoComments = assert(function(div) {
            div.appendChild(document.createComment(""));
            return !div.getElementsByTagName("*").length
        }), assertHrefNotNormalized = assert(function(div) {
            div.innerHTML = "<a href='#'></a>";
            return div.firstChild && typeof div.firstChild.getAttribute !== strundefined && div.firstChild.getAttribute("href") === "#"
        }), assertAttributes = assert(function(div) {
            div.innerHTML = "<select></select>";
            var type = typeof div.lastChild.getAttribute("multiple");
            return type !== "boolean" && type !== "string"
        }), assertUsableClassName = assert(function(div) {
            div.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>";
            if (!div.getElementsByClassName || !div.getElementsByClassName("e").length) {
                return false
            }
            div.lastChild.className = "e";
            return div.getElementsByClassName("e").length === 2
        }), assertUsableName = assert(function(div) {
            div.id = expando + 0;
            div.innerHTML = "<a name='" + expando + "'></a><div name='" + expando + "'></div>";
            docElem.insertBefore(div, docElem.firstChild);
            var pass = document.getElementsByName && document.getElementsByName(expando).length === 2 + document.getElementsByName(expando + 0).length;
            assertGetIdNotName = !document.getElementById(expando);
            docElem.removeChild(div);
            return pass
        });
        try {
            slice.call(docElem.childNodes, 0)[0].nodeType
        } catch (e) {
            slice = function(i) {
                var elem, results = [];
                for (; (elem = this[i]); i++) {
                    results.push(elem)
                }
                return results
            }
        }
        function Sizzle(selector, context, results, seed) {
            results = results || [];
            context = context || document;
            var match, elem, xml, m, nodeType = context.nodeType;
            if (!selector || typeof selector !== "string") {
                return results
            }
            if (nodeType !== 1 && nodeType !== 9) {
                return []
            }
            xml = isXML(context);
            if (!xml && !seed) {
                if ((match = rquickExpr.exec(selector))) {
                    if ((m = match[1])) {
                        if (nodeType === 9) {
                            elem = context.getElementById(m);
                            if (elem && elem.parentNode) {
                                if (elem.id === m) {
                                    results.push(elem);
                                    return results
                                }
                            } else {
                                return results
                            }
                        } else {
                            if (context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) && contains(context, elem) && elem.id === m) {
                                results.push(elem);
                                return results
                            }
                        }
                    } else if (match[2]) {
                        push.apply(results, slice.call(context.getElementsByTagName(selector), 0));
                        return results
                    } else if ((m = match[3]) && assertUsableClassName && context.getElementsByClassName) {
                        push.apply(results, slice.call(context.getElementsByClassName(m), 0));
                        return results
                    }
                }
            }
            return select(selector.replace(rtrim, "$1"), context, results, seed, xml)
        }
        Sizzle.matches = function(expr, elements) {
            return Sizzle(expr, null, null, elements)
        }
        ;
        Sizzle.matchesSelector = function(elem, expr) {
            return Sizzle(expr, null, null, [elem]).length > 0
        }
        ;
        function createInputPseudo(type) {
            return function(elem) {
                var name = elem.nodeName.toLowerCase();
                return name === "input" && elem.type === type
            }
        }
        function createButtonPseudo(type) {
            return function(elem) {
                var name = elem.nodeName.toLowerCase();
                return (name === "input" || name === "button") && elem.type === type
            }
        }
        function createPositionalPseudo(fn) {
            return markFunction(function(argument) {
                argument = +argument;
                return markFunction(function(seed, matches) {
                    var j, matchIndexes = fn([], seed.length, argument), i = matchIndexes.length;
                    while (i--) {
                        if (seed[(j = matchIndexes[i])]) {
                            seed[j] = !(matches[j] = seed[j])
                        }
                    }
                })
            })
        }
        getText = Sizzle.getText = function(elem) {
            var node, ret = "", i = 0, nodeType = elem.nodeType;
            if (nodeType) {
                if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
                    if (typeof elem.textContent === "string") {
                        return elem.textContent
                    } else {
                        for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                            ret += getText(elem)
                        }
                    }
                } else if (nodeType === 3 || nodeType === 4) {
                    return elem.nodeValue
                }
            } else {
                for (; (node = elem[i]); i++) {
                    ret += getText(node)
                }
            }
            return ret
        }
        ;
        isXML = Sizzle.isXML = function(elem) {
            var documentElement = elem && (elem.ownerDocument || elem).documentElement;
            return documentElement ? documentElement.nodeName !== "HTML" : false
        }
        ;
        contains = Sizzle.contains = docElem.contains ? function(a, b) {
            var adown = a.nodeType === 9 ? a.documentElement : a
              , bup = b && b.parentNode;
            return a === bup || !!(bup && bup.nodeType === 1 && adown.contains && adown.contains(bup))
        }
        : docElem.compareDocumentPosition ? function(a, b) {
            return b && !!(a.compareDocumentPosition(b) & 16)
        }
        : function(a, b) {
            while ((b = b.parentNode)) {
                if (b === a) {
                    return true
                }
            }
            return false
        }
        ;
        Sizzle.attr = function(elem, name) {
            var val, xml = isXML(elem);
            if (!xml) {
                name = name.toLowerCase()
            }
            if ((val = Expr.attrHandle[name])) {
                return val(elem)
            }
            if (xml || assertAttributes) {
                return elem.getAttribute(name)
            }
            val = elem.getAttributeNode(name);
            return val ? typeof elem[name] === "boolean" ? elem[name] ? name : null : val.specified ? val.value : null : null
        }
        ;
        Expr = Sizzle.selectors = {
            cacheLength: 50,
            createPseudo: markFunction,
            match: matchExpr,
            attrHandle: assertHrefNotNormalized ? {} : {
                "href": function(elem) {
                    return elem.getAttribute("href", 2)
                },
                "type": function(elem) {
                    return elem.getAttribute("type")
                }
            },
            find: {
                "ID": assertGetIdNotName ? function(id, context, xml) {
                    if (typeof context.getElementById !== strundefined && !xml) {
                        var m = context.getElementById(id);
                        return m && m.parentNode ? [m] : []
                    }
                }
                : function(id, context, xml) {
                    if (typeof context.getElementById !== strundefined && !xml) {
                        var m = context.getElementById(id);
                        return m ? m.id === id || typeof m.getAttributeNode !== strundefined && m.getAttributeNode("id").value === id ? [m] : undefined : []
                    }
                }
                ,
                "TAG": assertTagNameNoComments ? function(tag, context) {
                    if (typeof context.getElementsByTagName !== strundefined) {
                        return context.getElementsByTagName(tag)
                    }
                }
                : function(tag, context) {
                    var results = context.getElementsByTagName(tag);
                    if (tag === "*") {
                        var elem, tmp = [], i = 0;
                        for (; (elem = results[i]); i++) {
                            if (elem.nodeType === 1) {
                                tmp.push(elem)
                            }
                        }
                        return tmp
                    }
                    return results
                }
                ,
                "NAME": assertUsableName && function(tag, context) {
                    if (typeof context.getElementsByName !== strundefined) {
                        return context.getElementsByName(name)
                    }
                }
                ,
                "CLASS": assertUsableClassName && function(className, context, xml) {
                    if (typeof context.getElementsByClassName !== strundefined && !xml) {
                        return context.getElementsByClassName(className)
                    }
                }
            },
            relative: {
                ">": {
                    dir: "parentNode",
                    first: true
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: true
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                "ATTR": function(match) {
                    match[1] = match[1].replace(rbackslash, "");
                    match[3] = (match[4] || match[5] || "").replace(rbackslash, "");
                    if (match[2] === "~=") {
                        match[3] = " " + match[3] + " "
                    }
                    return match.slice(0, 4)
                },
                "CHILD": function(match) {
                    match[1] = match[1].toLowerCase();
                    if (match[1] === "nth") {
                        if (!match[2]) {
                            Sizzle.error(match[0])
                        }
                        match[3] = +(match[3] ? match[4] + (match[5] || 1) : 2 * (match[2] === "even" || match[2] === "odd"));
                        match[4] = +((match[6] + match[7]) || match[2] === "odd")
                    } else if (match[2]) {
                        Sizzle.error(match[0])
                    }
                    return match
                },
                "PSEUDO": function(match) {
                    var unquoted, excess;
                    if (matchExpr["CHILD"].test(match[0])) {
                        return null
                    }
                    if (match[3]) {
                        match[2] = match[3]
                    } else if ((unquoted = match[4])) {
                        if (rpseudo.test(unquoted) && (excess = tokenize(unquoted, true)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {
                            unquoted = unquoted.slice(0, excess);
                            match[0] = match[0].slice(0, excess)
                        }
                        match[2] = unquoted
                    }
                    return match.slice(0, 3)
                }
            },
            filter: {
                "ID": assertGetIdNotName ? function(id) {
                    id = id.replace(rbackslash, "");
                    return function(elem) {
                        return elem.getAttribute("id") === id
                    }
                }
                : function(id) {
                    id = id.replace(rbackslash, "");
                    return function(elem) {
                        var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
                        return node && node.value === id
                    }
                }
                ,
                "TAG": function(nodeName) {
                    if (nodeName === "*") {
                        return function() {
                            return true
                        }
                    }
                    nodeName = nodeName.replace(rbackslash, "").toLowerCase();
                    return function(elem) {
                        return elem.nodeName && elem.nodeName.toLowerCase() === nodeName
                    }
                },
                "CLASS": function(className) {
                    var pattern = classCache[expando][className + " "];
                    return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function(elem) {
                        return pattern.test(elem.className || (typeof elem.getAttribute !== strundefined && elem.getAttribute("class")) || "")
                    })
                },
                "ATTR": function(name, operator, check) {
                    return function(elem, context) {
                        var result = Sizzle.attr(elem, name);
                        if (result == null) {
                            return operator === "!="
                        }
                        if (!operator) {
                            return true
                        }
                        result += "";
                        return operator === "=" ? result === check : operator === "!=" ? result !== check : operator === "^=" ? check && result.indexOf(check) === 0 : operator === "*=" ? check && result.indexOf(check) > -1 : operator === "$=" ? check && result.substr(result.length - check.length) === check : operator === "~=" ? (" " + result + " ").indexOf(check) > -1 : operator === "|=" ? result === check || result.substr(0, check.length + 1) === check + "-" : false
                    }
                },
                "CHILD": function(type, argument, first, last) {
                    if (type === "nth") {
                        return function(elem) {
                            var node, diff, parent = elem.parentNode;
                            if (first === 1 && last === 0) {
                                return true
                            }
                            if (parent) {
                                diff = 0;
                                for (node = parent.firstChild; node; node = node.nextSibling) {
                                    if (node.nodeType === 1) {
                                        diff++;
                                        if (elem === node) {
                                            break
                                        }
                                    }
                                }
                            }
                            diff -= last;
                            return diff === first || (diff % first === 0 && diff / first >= 0)
                        }
                    }
                    return function(elem) {
                        var node = elem;
                        switch (type) {
                        case "only":
                        case "first":
                            while ((node = node.previousSibling)) {
                                if (node.nodeType === 1) {
                                    return false
                                }
                            }
                            if (type === "first") {
                                return true
                            }
                            node = elem;
                        case "last":
                            while ((node = node.nextSibling)) {
                                if (node.nodeType === 1) {
                                    return false
                                }
                            }
                            return true
                        }
                    }
                },
                "PSEUDO": function(pseudo, argument) {
                    var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);
                    if (fn[expando]) {
                        return fn(argument)
                    }
                    if (fn.length > 1) {
                        args = [pseudo, pseudo, "", argument];
                        return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches) {
                            var idx, matched = fn(seed, argument), i = matched.length;
                            while (i--) {
                                idx = indexOf.call(seed, matched[i]);
                                seed[idx] = !(matches[idx] = matched[i])
                            }
                        }) : function(elem) {
                            return fn(elem, 0, args)
                        }
                    }
                    return fn
                }
            },
            pseudos: {
                "not": markFunction(function(selector) {
                    var input = []
                      , results = []
                      , matcher = compile(selector.replace(rtrim, "$1"));
                    return matcher[expando] ? markFunction(function(seed, matches, context, xml) {
                        var elem, unmatched = matcher(seed, null, xml, []), i = seed.length;
                        while (i--) {
                            if ((elem = unmatched[i])) {
                                seed[i] = !(matches[i] = elem)
                            }
                        }
                    }) : function(elem, context, xml) {
                        input[0] = elem;
                        matcher(input, null, xml, results);
                        return !results.pop()
                    }
                }),
                "has": markFunction(function(selector) {
                    return function(elem) {
                        return Sizzle(selector, elem).length > 0
                    }
                }),
                "contains": markFunction(function(text) {
                    return function(elem) {
                        return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1
                    }
                }),
                "enabled": function(elem) {
                    return elem.disabled === false
                },
                "disabled": function(elem) {
                    return elem.disabled === true
                },
                "checked": function(elem) {
                    var nodeName = elem.nodeName.toLowerCase();
                    return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected)
                },
                "selected": function(elem) {
                    if (elem.parentNode) {
                        elem.parentNode.selectedIndex
                    }
                    return elem.selected === true
                },
                "parent": function(elem) {
                    return !Expr.pseudos["empty"](elem)
                },
                "empty": function(elem) {
                    var nodeType;
                    elem = elem.firstChild;
                    while (elem) {
                        if (elem.nodeName > "@" || (nodeType = elem.nodeType) === 3 || nodeType === 4) {
                            return false
                        }
                        elem = elem.nextSibling
                    }
                    return true
                },
                "header": function(elem) {
                    return rheader.test(elem.nodeName)
                },
                "text": function(elem) {
                    var type, attr;
                    return elem.nodeName.toLowerCase() === "input" && (type = elem.type) === "text" && ((attr = elem.getAttribute("type")) == null || attr.toLowerCase() === type)
                },
                "radio": createInputPseudo("radio"),
                "checkbox": createInputPseudo("checkbox"),
                "file": createInputPseudo("file"),
                "password": createInputPseudo("password"),
                "image": createInputPseudo("image"),
                "submit": createButtonPseudo("submit"),
                "reset": createButtonPseudo("reset"),
                "button": function(elem) {
                    var name = elem.nodeName.toLowerCase();
                    return name === "input" && elem.type === "button" || name === "button"
                },
                "input": function(elem) {
                    return rinputs.test(elem.nodeName)
                },
                "focus": function(elem) {
                    var doc = elem.ownerDocument;
                    return elem === doc.activeElement && (!doc.hasFocus || doc.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex)
                },
                "active": function(elem) {
                    return elem === elem.ownerDocument.activeElement
                },
                "first": createPositionalPseudo(function() {
                    return [0]
                }),
                "last": createPositionalPseudo(function(matchIndexes, length) {
                    return [length - 1]
                }),
                "eq": createPositionalPseudo(function(matchIndexes, length, argument) {
                    return [argument < 0 ? argument + length : argument]
                }),
                "even": createPositionalPseudo(function(matchIndexes, length) {
                    for (var i = 0; i < length; i += 2) {
                        matchIndexes.push(i)
                    }
                    return matchIndexes
                }),
                "odd": createPositionalPseudo(function(matchIndexes, length) {
                    for (var i = 1; i < length; i += 2) {
                        matchIndexes.push(i)
                    }
                    return matchIndexes
                }),
                "lt": createPositionalPseudo(function(matchIndexes, length, argument) {
                    for (var i = argument < 0 ? argument + length : argument; --i >= 0; ) {
                        matchIndexes.push(i)
                    }
                    return matchIndexes
                }),
                "gt": createPositionalPseudo(function(matchIndexes, length, argument) {
                    for (var i = argument < 0 ? argument + length : argument; ++i < length; ) {
                        matchIndexes.push(i)
                    }
                    return matchIndexes
                })
            }
        };
        function siblingCheck(a, b, ret) {
            if (a === b) {
                return ret
            }
            var cur = a.nextSibling;
            while (cur) {
                if (cur === b) {
                    return -1
                }
                cur = cur.nextSibling
            }
            return 1
        }
        sortOrder = docElem.compareDocumentPosition ? function(a, b) {
            if (a === b) {
                hasDuplicate = true;
                return 0
            }
            return (!a.compareDocumentPosition || !b.compareDocumentPosition ? a.compareDocumentPosition : a.compareDocumentPosition(b) & 4) ? -1 : 1
        }
        : function(a, b) {
            if (a === b) {
                hasDuplicate = true;
                return 0
            } else if (a.sourceIndex && b.sourceIndex) {
                return a.sourceIndex - b.sourceIndex
            }
            var al, bl, ap = [], bp = [], aup = a.parentNode, bup = b.parentNode, cur = aup;
            if (aup === bup) {
                return siblingCheck(a, b)
            } else if (!aup) {
                return -1
            } else if (!bup) {
                return 1
            }
            while (cur) {
                ap.unshift(cur);
                cur = cur.parentNode
            }
            cur = bup;
            while (cur) {
                bp.unshift(cur);
                cur = cur.parentNode
            }
            al = ap.length;
            bl = bp.length;
            for (var i = 0; i < al && i < bl; i++) {
                if (ap[i] !== bp[i]) {
                    return siblingCheck(ap[i], bp[i])
                }
            }
            return i === al ? siblingCheck(a, bp[i], -1) : siblingCheck(ap[i], b, 1)
        }
        ;
        [0, 0].sort(sortOrder);
        baseHasDuplicate = !hasDuplicate;
        Sizzle.uniqueSort = function(results) {
            var elem, duplicates = [], i = 1, j = 0;
            hasDuplicate = baseHasDuplicate;
            results.sort(sortOrder);
            if (hasDuplicate) {
                for (; (elem = results[i]); i++) {
                    if (elem === results[i - 1]) {
                        j = duplicates.push(i)
                    }
                }
                while (j--) {
                    results.splice(duplicates[j], 1)
                }
            }
            return results
        }
        ;
        Sizzle.error = function(msg) {
            throw new Error("Syntax error, unrecognized expression: " + msg);
        }
        ;
        function tokenize(selector, parseOnly) {
            var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[expando][selector + " "];
            if (cached) {
                return parseOnly ? 0 : cached.slice(0)
            }
            soFar = selector;
            groups = [];
            preFilters = Expr.preFilter;
            while (soFar) {
                if (!matched || (match = rcomma.exec(soFar))) {
                    if (match) {
                        soFar = soFar.slice(match[0].length) || soFar
                    }
                    groups.push(tokens = [])
                }
                matched = false;
                if ((match = rcombinators.exec(soFar))) {
                    tokens.push(matched = new Token(match.shift()));
                    soFar = soFar.slice(matched.length);
                    matched.type = match[0].replace(rtrim, " ")
                }
                for (type in Expr.filter) {
                    if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
                        tokens.push(matched = new Token(match.shift()));
                        soFar = soFar.slice(matched.length);
                        matched.type = type;
                        matched.matches = match
                    }
                }
                if (!matched) {
                    break
                }
            }
            return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0)
        }
        function addCombinator(matcher, combinator, base) {
            var dir = combinator.dir
              , checkNonElements = base && combinator.dir === "parentNode"
              , doneName = done++;
            return combinator.first ? function(elem, context, xml) {
                while ((elem = elem[dir])) {
                    if (checkNonElements || elem.nodeType === 1) {
                        return matcher(elem, context, xml)
                    }
                }
            }
            : function(elem, context, xml) {
                if (!xml) {
                    var cache, dirkey = dirruns + " " + doneName + " ", cachedkey = dirkey + cachedruns;
                    while ((elem = elem[dir])) {
                        if (checkNonElements || elem.nodeType === 1) {
                            if ((cache = elem[expando]) === cachedkey) {
                                return elem.sizset
                            } else if (typeof cache === "string" && cache.indexOf(dirkey) === 0) {
                                if (elem.sizset) {
                                    return elem
                                }
                            } else {
                                elem[expando] = cachedkey;
                                if (matcher(elem, context, xml)) {
                                    elem.sizset = true;
                                    return elem
                                }
                                elem.sizset = false
                            }
                        }
                    }
                } else {
                    while ((elem = elem[dir])) {
                        if (checkNonElements || elem.nodeType === 1) {
                            if (matcher(elem, context, xml)) {
                                return elem
                            }
                        }
                    }
                }
            }
        }
        function elementMatcher(matchers) {
            return matchers.length > 1 ? function(elem, context, xml) {
                var i = matchers.length;
                while (i--) {
                    if (!matchers[i](elem, context, xml)) {
                        return false
                    }
                }
                return true
            }
            : matchers[0]
        }
        function condense(unmatched, map, filter, context, xml) {
            var elem, newUnmatched = [], i = 0, len = unmatched.length, mapped = map != null;
            for (; i < len; i++) {
                if ((elem = unmatched[i])) {
                    if (!filter || filter(elem, context, xml)) {
                        newUnmatched.push(elem);
                        if (mapped) {
                            map.push(i)
                        }
                    }
                }
            }
            return newUnmatched
        }
        function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
            if (postFilter && !postFilter[expando]) {
                postFilter = setMatcher(postFilter)
            }
            if (postFinder && !postFinder[expando]) {
                postFinder = setMatcher(postFinder, postSelector)
            }
            return markFunction(function(seed, results, context, xml) {
                var temp, i, elem, preMap = [], postMap = [], preexisting = results.length, elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []), matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems, matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;
                if (matcher) {
                    matcher(matcherIn, matcherOut, context, xml)
                }
                if (postFilter) {
                    temp = condense(matcherOut, postMap);
                    postFilter(temp, [], context, xml);
                    i = temp.length;
                    while (i--) {
                        if ((elem = temp[i])) {
                            matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem)
                        }
                    }
                }
                if (seed) {
                    if (postFinder || preFilter) {
                        if (postFinder) {
                            temp = [];
                            i = matcherOut.length;
                            while (i--) {
                                if ((elem = matcherOut[i])) {
                                    temp.push((matcherIn[i] = elem))
                                }
                            }
                            postFinder(null, (matcherOut = []), temp, xml)
                        }
                        i = matcherOut.length;
                        while (i--) {
                            if ((elem = matcherOut[i]) && (temp = postFinder ? indexOf.call(seed, elem) : preMap[i]) > -1) {
                                seed[temp] = !(results[temp] = elem)
                            }
                        }
                    }
                } else {
                    matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
                    if (postFinder) {
                        postFinder(null, results, matcherOut, xml)
                    } else {
                        push.apply(results, matcherOut)
                    }
                }
            })
        }
        function matcherFromTokens(tokens) {
            var checkContext, matcher, j, len = tokens.length, leadingRelative = Expr.relative[tokens[0].type], implicitRelative = leadingRelative || Expr.relative[" "], i = leadingRelative ? 1 : 0, matchContext = addCombinator(function(elem) {
                return elem === checkContext
            }, implicitRelative, true), matchAnyContext = addCombinator(function(elem) {
                return indexOf.call(checkContext, elem) > -1
            }, implicitRelative, true), matchers = [function(elem, context, xml) {
                return (!leadingRelative && (xml || context !== outermostContext)) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml))
            }
            ];
            for (; i < len; i++) {
                if ((matcher = Expr.relative[tokens[i].type])) {
                    matchers = [addCombinator(elementMatcher(matchers), matcher)]
                } else {
                    matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);
                    if (matcher[expando]) {
                        j = ++i;
                        for (; j < len; j++) {
                            if (Expr.relative[tokens[j].type]) {
                                break
                            }
                        }
                        return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && tokens.slice(0, i - 1).join("").replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens((tokens = tokens.slice(j))), j < len && tokens.join(""))
                    }
                    matchers.push(matcher)
                }
            }
            return elementMatcher(matchers)
        }
        function matcherFromGroupMatchers(elementMatchers, setMatchers) {
            var bySet = setMatchers.length > 0
              , byElement = elementMatchers.length > 0
              , superMatcher = function(seed, context, xml, results, expandContext) {
                var elem, j, matcher, setMatched = [], matchedCount = 0, i = "0", unmatched = seed && [], outermost = expandContext != null, contextBackup = outermostContext, elems = seed || byElement && Expr.find["TAG"]("*", expandContext && context.parentNode || context), dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.E);
                if (outermost) {
                    outermostContext = context !== document && context;
                    cachedruns = superMatcher.el
                }
                for (; (elem = elems[i]) != null; i++) {
                    if (byElement && elem) {
                        for (j = 0; (matcher = elementMatchers[j]); j++) {
                            if (matcher(elem, context, xml)) {
                                results.push(elem);
                                break
                            }
                        }
                        if (outermost) {
                            dirruns = dirrunsUnique;
                            cachedruns = ++superMatcher.el
                        }
                    }
                    if (bySet) {
                        if ((elem = !matcher && elem)) {
                            matchedCount--
                        }
                        if (seed) {
                            unmatched.push(elem)
                        }
                    }
                }
                matchedCount += i;
                if (bySet && i !== matchedCount) {
                    for (j = 0; (matcher = setMatchers[j]); j++) {
                        matcher(unmatched, setMatched, context, xml)
                    }
                    if (seed) {
                        if (matchedCount > 0) {
                            while (i--) {
                                if (!(unmatched[i] || setMatched[i])) {
                                    setMatched[i] = pop.call(results)
                                }
                            }
                        }
                        setMatched = condense(setMatched)
                    }
                    push.apply(results, setMatched);
                    if (outermost && !seed && setMatched.length > 0 && (matchedCount + setMatchers.length) > 1) {
                        Sizzle.uniqueSort(results)
                    }
                }
                if (outermost) {
                    dirruns = dirrunsUnique;
                    outermostContext = contextBackup
                }
                return unmatched
            };
            superMatcher.el = 0;
            return bySet ? markFunction(superMatcher) : superMatcher
        }
        compile = Sizzle.compile = function(selector, group) {
            var i, setMatchers = [], elementMatchers = [], cached = compilerCache[expando][selector + " "];
            if (!cached) {
                if (!group) {
                    group = tokenize(selector)
                }
                i = group.length;
                while (i--) {
                    cached = matcherFromTokens(group[i]);
                    if (cached[expando]) {
                        setMatchers.push(cached)
                    } else {
                        elementMatchers.push(cached)
                    }
                }
                cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers))
            }
            return cached
        }
        ;
        function multipleContexts(selector, contexts, results) {
            var i = 0
              , len = contexts.length;
            for (; i < len; i++) {
                Sizzle(selector, contexts[i], results)
            }
            return results
        }
        function select(selector, context, results, seed, xml) {
            var i, tokens, token, type, find, match = tokenize(selector), j = match.length;
            if (!seed) {
                if (match.length === 1) {
                    tokens = match[0] = match[0].slice(0);
                    if (tokens.length > 2 && (token = tokens[0]).type === "ID" && context.nodeType === 9 && !xml && Expr.relative[tokens[1].type]) {
                        context = Expr.find["ID"](token.matches[0].replace(rbackslash, ""), context, xml)[0];
                        if (!context) {
                            return results
                        }
                        selector = selector.slice(tokens.shift().length)
                    }
                    for (i = matchExpr["POS"].test(selector) ? -1 : tokens.length - 1; i >= 0; i--) {
                        token = tokens[i];
                        if (Expr.relative[(type = token.type)]) {
                            break
                        }
                        if ((find = Expr.find[type])) {
                            if ((seed = find(token.matches[0].replace(rbackslash, ""), rsibling.test(tokens[0].type) && context.parentNode || context, xml))) {
                                tokens.splice(i, 1);
                                selector = seed.length && tokens.join("");
                                if (!selector) {
                                    push.apply(results, slice.call(seed, 0));
                                    return results
                                }
                                break
                            }
                        }
                    }
                }
            }
            compile(selector, match)(seed, context, xml, results, rsibling.test(selector));
            return results
        }
        if (document.querySelectorAll) {
            (function() {
                var disconnectedMatch, oldSelect = select, rescape = /'|\\/g, rattributeQuotes = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g, rbuggyQSA = [":focus"], rbuggyMatches = [":active"], matches = docElem.matchesSelector || docElem.mozMatchesSelector || docElem.webkitMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector;
                assert(function(div) {
                    div.innerHTML = "<select><option selected=''></option></select>";
                    if (!div.querySelectorAll("[selected]").length) {
                        rbuggyQSA.push("\\[" + whitespace + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)")
                    }
                    if (!div.querySelectorAll(":checked").length) {
                        rbuggyQSA.push(":checked")
                    }
                });
                assert(function(div) {
                    div.innerHTML = "<p test=''></p>";
                    if (div.querySelectorAll("[test^='']").length) {
                        rbuggyQSA.push("[*^$]=" + whitespace + "*(?:\"\"|'')")
                    }
                    div.innerHTML = "<input type='hidden'/>";
                    if (!div.querySelectorAll(":enabled").length) {
                        rbuggyQSA.push(":enabled", ":disabled")
                    }
                });
                rbuggyQSA = new RegExp(rbuggyQSA.join("|"));
                select = function(selector, context, results, seed, xml) {
                    if (!seed && !xml && !rbuggyQSA.test(selector)) {
                        var groups, i, old = true, nid = expando, newContext = context, newSelector = context.nodeType === 9 && selector;
                        if (context.nodeType === 1 && context.nodeName.toLowerCase() !== "object") {
                            groups = tokenize(selector);
                            if ((old = context.getAttribute("id"))) {
                                nid = old.replace(rescape, "\\$&")
                            } else {
                                context.setAttribute("id", nid)
                            }
                            nid = "[id='" + nid + "'] ";
                            i = groups.length;
                            while (i--) {
                                groups[i] = nid + groups[i].join("")
                            }
                            newContext = rsibling.test(selector) && context.parentNode || context;
                            newSelector = groups.join(",")
                        }
                        if (newSelector) {
                            try {
                                push.apply(results, slice.call(newContext.querySelectorAll(newSelector), 0));
                                return results
                            } catch (qsaError) {} finally {
                                if (!old) {
                                    context.removeAttribute("id")
                                }
                            }
                        }
                    }
                    return oldSelect(selector, context, results, seed, xml)
                }
                ;
                if (matches) {
                    assert(function(div) {
                        disconnectedMatch = matches.call(div, "div");
                        try {
                            matches.call(div, "[test!='']:sizzle");
                            rbuggyMatches.push("!=", pseudos)
                        } catch (e) {}
                    });
                    rbuggyMatches = new RegExp(rbuggyMatches.join("|"));
                    Sizzle.matchesSelector = function(elem, expr) {
                        expr = expr.replace(rattributeQuotes, "='$1']");
                        if (!isXML(elem) && !rbuggyMatches.test(expr) && !rbuggyQSA.test(expr)) {
                            try {
                                var ret = matches.call(elem, expr);
                                if (ret || disconnectedMatch || elem.document && elem.document.nodeType !== 11) {
                                    return ret
                                }
                            } catch (e) {}
                        }
                        return Sizzle(expr, null, null, [elem]).length > 0
                    }
                }
            }
            )()
        }
        Expr.pseudos["nth"] = Expr.pseudos["eq"];
        function setFilters() {}
        Expr.filters = setFilters.prototype = Expr.pseudos;
        Expr.setFilters = new setFilters();
        Sizzle.attr = jQuery.attr;
        jQuery.find = Sizzle;
        jQuery.expr = Sizzle.selectors;
        jQuery.expr[":"] = jQuery.expr.pseudos;
        jQuery.unique = Sizzle.uniqueSort;
        jQuery.text = Sizzle.getText;
        jQuery.isXMLDoc = Sizzle.isXML;
        jQuery.contains = Sizzle.contains
    }
    )(window);
    var runtil = /Until$/
      , rparentsprev = /^(?:parents|prev(?:Until|All))/
      , isSimple = /^.[^:#\[\.,]*$/
      , rneedsContext = jQuery.expr.match.needsContext
      , guaranteedUnique = {
        children: true,
        contents: true,
        next: true,
        prev: true
    };
    jQuery.fn.extend({
        find: function(selector) {
            var i, l, length, n, r, ret, self = this;
            if (typeof selector !== "string") {
                return jQuery(selector).filter(function() {
                    for (i = 0,
                    l = self.length; i < l; i++) {
                        if (jQuery.contains(self[i], this)) {
                            return true
                        }
                    }
                })
            }
            ret = this.pushStack("", "find", selector);
            for (i = 0,
            l = this.length; i < l; i++) {
                length = ret.length;
                jQuery.find(selector, this[i], ret);
                if (i > 0) {
                    for (n = length; n < ret.length; n++) {
                        for (r = 0; r < length; r++) {
                            if (ret[r] === ret[n]) {
                                ret.splice(n--, 1);
                                break
                            }
                        }
                    }
                }
            }
            return ret
        },
        has: function(target) {
            var i, targets = jQuery(target, this), len = targets.length;
            return this.filter(function() {
                for (i = 0; i < len; i++) {
                    if (jQuery.contains(this, targets[i])) {
                        return true
                    }
                }
            })
        },
        not: function(selector) {
            return this.pushStack(winnow(this, selector, false), "not", selector)
        },
        filter: function(selector) {
            return this.pushStack(winnow(this, selector, true), "filter", selector)
        },
        is: function(selector) {
            return !!selector && (typeof selector === "string" ? rneedsContext.test(selector) ? jQuery(selector, this.context).index(this[0]) >= 0 : jQuery.filter(selector, this).length > 0 : this.filter(selector).length > 0)
        },
        closest: function(selectors, context) {
            var cur, i = 0, l = this.length, ret = [], pos = rneedsContext.test(selectors) || typeof selectors !== "string" ? jQuery(selectors, context || this.context) : 0;
            for (; i < l; i++) {
                cur = this[i];
                while (cur && cur.ownerDocument && cur !== context && cur.nodeType !== 11) {
                    if (pos ? pos.index(cur) > -1 : jQuery.find.matchesSelector(cur, selectors)) {
                        ret.push(cur);
                        break
                    }
                    cur = cur.parentNode
                }
            }
            ret = ret.length > 1 ? jQuery.unique(ret) : ret;
            return this.pushStack(ret, "closest", selectors)
        },
        index: function(elem) {
            if (!elem) {
                return (this[0] && this[0].parentNode) ? this.prevAll().length : -1
            }
            if (typeof elem === "string") {
                return jQuery.inArray(this[0], jQuery(elem))
            }
            return jQuery.inArray(elem.jquery ? elem[0] : elem, this)
        },
        add: function(selector, context) {
            var set = typeof selector === "string" ? jQuery(selector, context) : jQuery.makeArray(selector && selector.nodeType ? [selector] : selector)
              , all = jQuery.merge(this.get(), set);
            return this.pushStack(isDisconnected(set[0]) || isDisconnected(all[0]) ? all : jQuery.unique(all))
        },
        addBack: function(selector) {
            return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector))
        }
    });
    jQuery.fn.andSelf = jQuery.fn.addBack;
    function isDisconnected(node) {
        return !node || !node.parentNode || node.parentNode.nodeType === 11
    }
    function sibling(cur, dir) {
        do {
            cur = cur[dir]
        } while (cur && cur.nodeType !== 1);return cur
    }
    jQuery.each({
        parent: function(elem) {
            var parent = elem.parentNode;
            return parent && parent.nodeType !== 11 ? parent : null
        },
        parents: function(elem) {
            return jQuery.dir(elem, "parentNode")
        },
        parentsUntil: function(elem, i, until) {
            return jQuery.dir(elem, "parentNode", until)
        },
        next: function(elem) {
            return sibling(elem, "nextSibling")
        },
        prev: function(elem) {
            return sibling(elem, "previousSibling")
        },
        nextAll: function(elem) {
            return jQuery.dir(elem, "nextSibling")
        },
        prevAll: function(elem) {
            return jQuery.dir(elem, "previousSibling")
        },
        nextUntil: function(elem, i, until) {
            return jQuery.dir(elem, "nextSibling", until)
        },
        prevUntil: function(elem, i, until) {
            return jQuery.dir(elem, "previousSibling", until)
        },
        siblings: function(elem) {
            return jQuery.sibling((elem.parentNode || {}).firstChild, elem)
        },
        children: function(elem) {
            return jQuery.sibling(elem.firstChild)
        },
        contents: function(elem) {
            return jQuery.nodeName(elem, "iframe") ? elem.contentDocument || elem.contentWindow.document : jQuery.merge([], elem.childNodes)
        }
    }, function(name, fn) {
        jQuery.fn[name] = function(until, selector) {
            var ret = jQuery.map(this, fn, until);
            if (!runtil.test(name)) {
                selector = until
            }
            if (selector && typeof selector === "string") {
                ret = jQuery.filter(selector, ret)
            }
            ret = this.length > 1 && !guaranteedUnique[name] ? jQuery.unique(ret) : ret;
            if (this.length > 1 && rparentsprev.test(name)) {
                ret = ret.reverse()
            }
            return this.pushStack(ret, name, core_slice.call(arguments).join(","))
        }
    });
    jQuery.extend({
        filter: function(expr, elems, not) {
            if (not) {
                expr = ":not(" + expr + ")"
            }
            return elems.length === 1 ? jQuery.find.matchesSelector(elems[0], expr) ? [elems[0]] : [] : jQuery.find.matches(expr, elems)
        },
        dir: function(elem, dir, until) {
            var matched = []
              , cur = elem[dir];
            while (cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery(cur).is(until))) {
                if (cur.nodeType === 1) {
                    matched.push(cur)
                }
                cur = cur[dir]
            }
            return matched
        },
        sibling: function(n, elem) {
            var r = [];
            for (; n; n = n.nextSibling) {
                if (n.nodeType === 1 && n !== elem) {
                    r.push(n)
                }
            }
            return r
        }
    });
    function winnow(elements, qualifier, keep) {
        qualifier = qualifier || 0;
        if (jQuery.isFunction(qualifier)) {
            return jQuery.grep(elements, function(elem, i) {
                var retVal = !!qualifier.call(elem, i, elem);
                return retVal === keep
            })
        } else if (qualifier.nodeType) {
            return jQuery.grep(elements, function(elem, i) {
                return (elem === qualifier) === keep
            })
        } else if (typeof qualifier === "string") {
            var filtered = jQuery.grep(elements, function(elem) {
                return elem.nodeType === 1
            });
            if (isSimple.test(qualifier)) {
                return jQuery.filter(qualifier, filtered, !keep)
            } else {
                qualifier = jQuery.filter(qualifier, filtered)
            }
        }
        return jQuery.grep(elements, function(elem, i) {
            return (jQuery.inArray(elem, qualifier) >= 0) === keep
        })
    }
    function createSafeFragment(document) {
        var list = nodeNames.split("|")
          , safeFrag = document.createDocumentFragment();
        if (safeFrag.createElement) {
            while (list.length) {
                safeFrag.createElement(list.pop())
            }
        }
        return safeFrag
    }
    var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video"
      , rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g
      , rleadingWhitespace = /^\s+/
      , rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi
      , rtagName = /<([\w:]+)/
      , rtbody = /<tbody/i
      , rhtml = /<|&#?\w+;/
      , rnoInnerhtml = /<(?:script|style|link)/i
      , rnocache = /<(?:script|object|embed|option|style)/i
      , rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]","i")
      , rcheckableType = /^(?:checkbox|radio)$/
      , rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i
      , rscriptType = /\/(java|ecma)script/i
      , rcleanScript = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g
      , wrapMap = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        legend: [1, "<fieldset>", "</fieldset>"],
        thead: [1, "<table>", "</table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
        area: [1, "<map>", "</map>"],
        _default: [0, "", ""]
    }
      , safeFragment = createSafeFragment(document)
      , fragmentDiv = safeFragment.appendChild(document.createElement("div"));
    wrapMap.optgroup = wrapMap.option;
    wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
    wrapMap.th = wrapMap.td;
    if (!jQuery.support.htmlSerialize) {
        wrapMap._default = [1, "X<div>", "</div>"]
    }
    jQuery.fn.extend({
        text: function(value) {
            return jQuery.access(this, function(value) {
                return value === undefined ? jQuery.text(this) : this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(value))
            }, null, value, arguments.length)
        },
        wrapAll: function(html) {
            if (jQuery.isFunction(html)) {
                return this.each(function(i) {
                    jQuery(this).wrapAll(html.call(this, i))
                })
            }
            if (this[0]) {
                var wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);
                if (this[0].parentNode) {
                    wrap.insertBefore(this[0])
                }
                wrap.map(function() {
                    var elem = this;
                    while (elem.firstChild && elem.firstChild.nodeType === 1) {
                        elem = elem.firstChild
                    }
                    return elem
                }).append(this)
            }
            return this
        },
        wrapInner: function(html) {
            if (jQuery.isFunction(html)) {
                return this.each(function(i) {
                    jQuery(this).wrapInner(html.call(this, i))
                })
            }
            return this.each(function() {
                var self = jQuery(this)
                  , contents = self.contents();
                if (contents.length) {
                    contents.wrapAll(html)
                } else {
                    self.append(html)
                }
            })
        },
        wrap: function(html) {
            var isFunction = jQuery.isFunction(html);
            return this.each(function(i) {
                jQuery(this).wrapAll(isFunction ? html.call(this, i) : html)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                if (!jQuery.nodeName(this, "body")) {
                    jQuery(this).replaceWith(this.childNodes)
                }
            }).end()
        },
        append: function() {
            return this.domManip(arguments, true, function(elem) {
                if (this.nodeType === 1 || this.nodeType === 11) {
                    this.appendChild(elem)
                }
            })
        },
        prepend: function() {
            return this.domManip(arguments, true, function(elem) {
                if (this.nodeType === 1 || this.nodeType === 11) {
                    this.insertBefore(elem, this.firstChild)
                }
            })
        },
        before: function() {
            if (!isDisconnected(this[0])) {
                return this.domManip(arguments, false, function(elem) {
                    this.parentNode.insertBefore(elem, this)
                })
            }
            if (arguments.length) {
                var set = jQuery.clean(arguments);
                return this.pushStack(jQuery.merge(set, this), "before", this.selector)
            }
        },
        after: function() {
            if (!isDisconnected(this[0])) {
                return this.domManip(arguments, false, function(elem) {
                    this.parentNode.insertBefore(elem, this.nextSibling)
                })
            }
            if (arguments.length) {
                var set = jQuery.clean(arguments);
                return this.pushStack(jQuery.merge(this, set), "after", this.selector)
            }
        },
        remove: function(selector, keepData) {
            var elem, i = 0;
            for (; (elem = this[i]) != null; i++) {
                if (!selector || jQuery.filter(selector, [elem]).length) {
                    if (!keepData && elem.nodeType === 1) {
                        jQuery.cleanData(elem.getElementsByTagName("*"));
                        jQuery.cleanData([elem])
                    }
                    if (elem.parentNode) {
                        elem.parentNode.removeChild(elem)
                    }
                }
            }
            return this
        },
        empty: function() {
            var elem, i = 0;
            for (; (elem = this[i]) != null; i++) {
                if (elem.nodeType === 1) {
                    jQuery.cleanData(elem.getElementsByTagName("*"))
                }
                while (elem.firstChild) {
                    elem.removeChild(elem.firstChild)
                }
            }
            return this
        },
        clone: function(dataAndEvents, deepDataAndEvents) {
            dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
            deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
            return this.map(function() {
                return jQuery.clone(this, dataAndEvents, deepDataAndEvents)
            })
        },
        html: function(value) {
            return jQuery.access(this, function(value) {
                var elem = this[0] || {}
                  , i = 0
                  , l = this.length;
                if (value === undefined) {
                    return elem.nodeType === 1 ? elem.innerHTML.replace(rinlinejQuery, "") : undefined
                }
                if (typeof value === "string" && !rnoInnerhtml.test(value) && (jQuery.support.htmlSerialize || !rnoshimcache.test(value)) && (jQuery.support.leadingWhitespace || !rleadingWhitespace.test(value)) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {
                    value = value.replace(rxhtmlTag, "<$1></$2>");
                    try {
                        for (; i < l; i++) {
                            elem = this[i] || {};
                            if (elem.nodeType === 1) {
                                jQuery.cleanData(elem.getElementsByTagName("*"));
                                elem.innerHTML = value
                            }
                        }
                        elem = 0
                    } catch (e) {}
                }
                if (elem) {
                    this.empty().append(value)
                }
            }, null, value, arguments.length)
        },
        replaceWith: function(value) {
            if (!isDisconnected(this[0])) {
                if (jQuery.isFunction(value)) {
                    return this.each(function(i) {
                        var self = jQuery(this)
                          , old = self.html();
                        self.replaceWith(value.call(this, i, old))
                    })
                }
                if (typeof value !== "string") {
                    value = jQuery(value).detach()
                }
                return this.each(function() {
                    var next = this.nextSibling
                      , parent = this.parentNode;
                    jQuery(this).remove();
                    if (next) {
                        jQuery(next).before(value)
                    } else {
                        jQuery(parent).append(value)
                    }
                })
            }
            return this.length ? this.pushStack(jQuery(jQuery.isFunction(value) ? value() : value), "replaceWith", value) : this
        },
        detach: function(selector) {
            return this.remove(selector, true)
        },
        domManip: function(args, table, callback) {
            args = [].concat.apply([], args);
            var results, first, fragment, iNoClone, i = 0, value = args[0], scripts = [], l = this.length;
            if (!jQuery.support.checkClone && l > 1 && typeof value === "string" && rchecked.test(value)) {
                return this.each(function() {
                    jQuery(this).domManip(args, table, callback)
                })
            }
            if (jQuery.isFunction(value)) {
                return this.each(function(i) {
                    var self = jQuery(this);
                    args[0] = value.call(this, i, table ? self.html() : undefined);
                    self.domManip(args, table, callback)
                })
            }
            if (this[0]) {
                results = jQuery.buildFragment(args, this, scripts);
                fragment = results.fragment;
                first = fragment.firstChild;
                if (fragment.childNodes.length === 1) {
                    fragment = first
                }
                if (first) {
                    table = table && jQuery.nodeName(first, "tr");
                    for (iNoClone = results.cacheable || l - 1; i < l; i++) {
                        callback.call(table && jQuery.nodeName(this[i], "table") ? findOrAppend(this[i], "tbody") : this[i], i === iNoClone ? fragment : jQuery.clone(fragment, true, true))
                    }
                }
                fragment = first = null;
                if (scripts.length) {
                    jQuery.each(scripts, function(i, elem) {
                        if (elem.src) {
                            if (jQuery.ajax) {
                                jQuery.ajax({
                                    url: elem.src,
                                    type: "GET",
                                    dataType: "script",
                                    async: false,
                                    global: false,
                                    "throws": true
                                })
                            } else {
                                jQuery.error("no ajax")
                            }
                        } else {
                            jQuery.globalEval((elem.text || elem.textContent || elem.innerHTML || "").replace(rcleanScript, ""))
                        }
                        if (elem.parentNode) {
                            elem.parentNode.removeChild(elem)
                        }
                    })
                }
            }
            return this
        }
    });
    function findOrAppend(elem, tag) {
        return elem.getElementsByTagName(tag)[0] || elem.appendChild(elem.ownerDocument.createElement(tag))
    }
    function cloneCopyEvent(src, dest) {
        if (dest.nodeType !== 1 || !jQuery.hasData(src)) {
            return
        }
        var type, i, l, oldData = jQuery._data(src), curData = jQuery._data(dest, oldData), events = oldData.events;
        if (events) {
            delete curData.handle;
            curData.events = {};
            for (type in events) {
                for (i = 0,
                l = events[type].length; i < l; i++) {
                    jQuery.event.add(dest, type, events[type][i])
                }
            }
        }
        if (curData.data) {
            curData.data = jQuery.extend({}, curData.data)
        }
    }
    function cloneFixAttributes(src, dest) {
        var nodeName;
        if (dest.nodeType !== 1) {
            return
        }
        if (dest.clearAttributes) {
            dest.clearAttributes()
        }
        if (dest.mergeAttributes) {
            dest.mergeAttributes(src)
        }
        nodeName = dest.nodeName.toLowerCase();
        if (nodeName === "object") {
            if (dest.parentNode) {
                dest.outerHTML = src.outerHTML
            }
            if (jQuery.support.html5Clone && (src.innerHTML && !jQuery.trim(dest.innerHTML))) {
                dest.innerHTML = src.innerHTML
            }
        } else if (nodeName === "input" && rcheckableType.test(src.type)) {
            dest.defaultChecked = dest.checked = src.checked;
            if (dest.value !== src.value) {
                dest.value = src.value
            }
        } else if (nodeName === "option") {
            dest.selected = src.defaultSelected
        } else if (nodeName === "input" || nodeName === "textarea") {
            dest.defaultValue = src.defaultValue
        } else if (nodeName === "script" && dest.text !== src.text) {
            dest.text = src.text
        }
        dest.removeAttribute(jQuery.expando)
    }
    jQuery.buildFragment = function(args, context, scripts) {
        var fragment, cacheable, cachehit, first = args[0];
        context = context || document;
        context = !context.nodeType && context[0] || context;
        context = context.ownerDocument || context;
        if (args.length === 1 && typeof first === "string" && first.length < 512 && context === document && first.charAt(0) === "<" && !rnocache.test(first) && (jQuery.support.checkClone || !rchecked.test(first)) && (jQuery.support.html5Clone || !rnoshimcache.test(first))) {
            cacheable = true;
            fragment = jQuery.fragments[first];
            cachehit = fragment !== undefined
        }
        if (!fragment) {
            fragment = context.createDocumentFragment();
            jQuery.clean(args, context, fragment, scripts);
            if (cacheable) {
                jQuery.fragments[first] = cachehit && fragment
            }
        }
        return {
            fragment: fragment,
            cacheable: cacheable
        }
    }
    ;
    jQuery.fragments = {};
    jQuery.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(name, original) {
        jQuery.fn[name] = function(selector) {
            var elems, i = 0, ret = [], insert = jQuery(selector), l = insert.length, parent = this.length === 1 && this[0].parentNode;
            if ((parent == null || parent && parent.nodeType === 11 && parent.childNodes.length === 1) && l === 1) {
                insert[original](this[0]);
                return this
            } else {
                for (; i < l; i++) {
                    elems = (i > 0 ? this.clone(true) : this).get();
                    jQuery(insert[i])[original](elems);
                    ret = ret.concat(elems)
                }
                return this.pushStack(ret, name, insert.selector)
            }
        }
    });
    function getAll(elem) {
        if (typeof elem.getElementsByTagName !== "undefined") {
            return elem.getElementsByTagName("*")
        } else if (typeof elem.querySelectorAll !== "undefined") {
            return elem.querySelectorAll("*")
        } else {
            return []
        }
    }
    function fixDefaultChecked(elem) {
        if (rcheckableType.test(elem.type)) {
            elem.defaultChecked = elem.checked
        }
    }
    jQuery.extend({
        clone: function(elem, dataAndEvents, deepDataAndEvents) {
            var srcElements, destElements, i, clone;
            if (jQuery.support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test("<" + elem.nodeName + ">")) {
                clone = elem.cloneNode(true)
            } else {
                fragmentDiv.innerHTML = elem.outerHTML;
                fragmentDiv.removeChild(clone = fragmentDiv.firstChild)
            }
            if ((!jQuery.support.noCloneEvent || !jQuery.support.noCloneChecked) && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {
                cloneFixAttributes(elem, clone);
                srcElements = getAll(elem);
                destElements = getAll(clone);
                for (i = 0; srcElements[i]; ++i) {
                    if (destElements[i]) {
                        cloneFixAttributes(srcElements[i], destElements[i])
                    }
                }
            }
            if (dataAndEvents) {
                cloneCopyEvent(elem, clone);
                if (deepDataAndEvents) {
                    srcElements = getAll(elem);
                    destElements = getAll(clone);
                    for (i = 0; srcElements[i]; ++i) {
                        cloneCopyEvent(srcElements[i], destElements[i])
                    }
                }
            }
            srcElements = destElements = null;
            return clone
        },
        clean: function(elems, context, fragment, scripts) {
            var i, j, elem, tag, wrap, depth, div, hasBody, tbody, len, handleScript, jsTags, safe = context === document && safeFragment, ret = [];
            if (!context || typeof context.createDocumentFragment === "undefined") {
                context = document
            }
            for (i = 0; (elem = elems[i]) != null; i++) {
                if (typeof elem === "number") {
                    elem += ""
                }
                if (!elem) {
                    continue
                }
                if (typeof elem === "string") {
                    if (!rhtml.test(elem)) {
                        elem = context.createTextNode(elem)
                    } else {
                        safe = safe || createSafeFragment(context);
                        div = context.createElement("div");
                        safe.appendChild(div);
                        elem = elem.replace(rxhtmlTag, "<$1></$2>");
                        tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
                        wrap = wrapMap[tag] || wrapMap._default;
                        depth = wrap[0];
                        div.innerHTML = wrap[1] + elem + wrap[2];
                        while (depth--) {
                            div = div.lastChild
                        }
                        if (!jQuery.support.tbody) {
                            hasBody = rtbody.test(elem);
                            tbody = tag === "table" && !hasBody ? div.firstChild && div.firstChild.childNodes : wrap[1] === "<table>" && !hasBody ? div.childNodes : [];
                            for (j = tbody.length - 1; j >= 0; --j) {
                                if (jQuery.nodeName(tbody[j], "tbody") && !tbody[j].childNodes.length) {
                                    tbody[j].parentNode.removeChild(tbody[j])
                                }
                            }
                        }
                        if (!jQuery.support.leadingWhitespace && rleadingWhitespace.test(elem)) {
                            div.insertBefore(context.createTextNode(rleadingWhitespace.exec(elem)[0]), div.firstChild)
                        }
                        elem = div.childNodes;
                        div.parentNode.removeChild(div)
                    }
                }
                if (elem.nodeType) {
                    ret.push(elem)
                } else {
                    jQuery.merge(ret, elem)
                }
            }
            if (div) {
                elem = div = safe = null
            }
            if (!jQuery.support.appendChecked) {
                for (i = 0; (elem = ret[i]) != null; i++) {
                    if (jQuery.nodeName(elem, "input")) {
                        fixDefaultChecked(elem)
                    } else if (typeof elem.getElementsByTagName !== "undefined") {
                        jQuery.grep(elem.getElementsByTagName("input"), fixDefaultChecked)
                    }
                }
            }
            if (fragment) {
                handleScript = function(elem) {
                    if (!elem.type || rscriptType.test(elem.type)) {
                        return scripts ? scripts.push(elem.parentNode ? elem.parentNode.removeChild(elem) : elem) : fragment.appendChild(elem)
                    }
                }
                ;
                for (i = 0; (elem = ret[i]) != null; i++) {
                    if (!(jQuery.nodeName(elem, "script") && handleScript(elem))) {
                        fragment.appendChild(elem);
                        if (typeof elem.getElementsByTagName !== "undefined") {
                            jsTags = jQuery.grep(jQuery.merge([], elem.getElementsByTagName("script")), handleScript);
                            ret.splice.apply(ret, [i + 1, 0].concat(jsTags));
                            i += jsTags.length
                        }
                    }
                }
            }
            return ret
        },
        cleanData: function(elems, acceptData) {
            var data, id, elem, type, i = 0, internalKey = jQuery.expando, cache = jQuery.cache, deleteExpando = jQuery.support.deleteExpando, special = jQuery.event.special;
            for (; (elem = elems[i]) != null; i++) {
                if (acceptData || jQuery.acceptData(elem)) {
                    id = elem[internalKey];
                    data = id && cache[id];
                    if (data) {
                        if (data.events) {
                            for (type in data.events) {
                                if (special[type]) {
                                    jQuery.event.remove(elem, type)
                                } else {
                                    jQuery.removeEvent(elem, type, data.handle)
                                }
                            }
                        }
                        if (cache[id]) {
                            delete cache[id];
                            if (deleteExpando) {
                                delete elem[internalKey]
                            } else if (elem.removeAttribute) {
                                elem.removeAttribute(internalKey)
                            } else {
                                elem[internalKey] = null
                            }
                            jQuery.deletedIds.push(id)
                        }
                    }
                }
            }
        }
    });
    (function() {
        var matched, browser;
        jQuery.uaMatch = function(ua) {
            ua = ua.toLowerCase();
            var match = /(chrome)[ \/]([\w.]+)/.exec(ua) || /(webkit)[ \/]([\w.]+)/.exec(ua) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];
            return {
                browser: match[1] || "",
                version: match[2] || "0"
            }
        }
        ;
        matched = jQuery.uaMatch(navigator.userAgent);
        browser = {};
        if (matched.browser) {
            browser[matched.browser] = true;
            browser.version = matched.version
        }
        if (browser.chrome) {
            browser.webkit = true
        } else if (browser.webkit) {
            browser.safari = true
        }
        jQuery.browser = browser;
        jQuery.sub = function() {
            function jQuerySub(selector, context) {
                return new jQuerySub.fn.init(selector,context)
            }
            jQuery.extend(true, jQuerySub, this);
            jQuerySub.superclass = this;
            jQuerySub.fn = jQuerySub.prototype = this();
            jQuerySub.fn.constructor = jQuerySub;
            jQuerySub.sub = this.sub;
            jQuerySub.fn.init = function init(selector, context) {
                if (context && context instanceof jQuery && !(context instanceof jQuerySub)) {
                    context = jQuerySub(context)
                }
                return jQuery.fn.init.call(this, selector, context, rootjQuerySub)
            }
            ;
            jQuerySub.fn.init.prototype = jQuerySub.fn;
            var rootjQuerySub = jQuerySub(document);
            return jQuerySub
        }
    }
    )();
    var curCSS, iframe, iframeDoc, ralpha = /alpha\([^)]*\)/i, ropacity = /opacity=([^)]*)/, rposition = /^(top|right|bottom|left)$/, rdisplayswap = /^(none|table(?!-c[ea]).+)/, rmargin = /^margin/, rnumsplit = new RegExp("^(" + core_pnum + ")(.*)$","i"), rnumnonpx = new RegExp("^(" + core_pnum + ")(?!px)[a-z%]+$","i"), rrelNum = new RegExp("^([-+])=(" + core_pnum + ")","i"), elemdisplay = {
        BODY: "block"
    }, cssShow = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }, cssNormalTransform = {
        letterSpacing: 0,
        fontWeight: 400
    }, cssExpand = ["Top", "Right", "Bottom", "Left"], cssPrefixes = ["Webkit", "O", "Moz", "ms"], eventsToggle = jQuery.fn.toggle;
    function vendorPropName(style, name) {
        if (name in style) {
            return name
        }
        var capName = name.charAt(0).toUpperCase() + name.slice(1)
          , origName = name
          , i = cssPrefixes.length;
        while (i--) {
            name = cssPrefixes[i] + capName;
            if (name in style) {
                return name
            }
        }
        return origName
    }
    function isHidden(elem, el) {
        elem = el || elem;
        return jQuery.css(elem, "display") === "none" || !jQuery.contains(elem.ownerDocument, elem)
    }
    function showHide(elements, show) {
        var elem, display, values = [], index = 0, length = elements.length;
        for (; index < length; index++) {
            elem = elements[index];
            if (!elem.style) {
                continue
            }
            values[index] = jQuery._data(elem, "olddisplay");
            if (show) {
                if (!values[index] && elem.style.display === "none") {
                    elem.style.display = ""
                }
                if (elem.style.display === "" && isHidden(elem)) {
                    values[index] = jQuery._data(elem, "olddisplay", css_defaultDisplay(elem.nodeName))
                }
            } else {
                display = curCSS(elem, "display");
                if (!values[index] && display !== "none") {
                    jQuery._data(elem, "olddisplay", display)
                }
            }
        }
        for (index = 0; index < length; index++) {
            elem = elements[index];
            if (!elem.style) {
                continue
            }
            if (!show || elem.style.display === "none" || elem.style.display === "") {
                elem.style.display = show ? values[index] || "" : "none"
            }
        }
        return elements
    }
    jQuery.fn.extend({
        css: function(name, value) {
            return jQuery.access(this, function(elem, name, value) {
                return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name)
            }, name, value, arguments.length > 1)
        },
        show: function() {
            return showHide(this, true)
        },
        hide: function() {
            return showHide(this)
        },
        toggle: function(state, fn2) {
            var bool = typeof state === "boolean";
            if (jQuery.isFunction(state) && jQuery.isFunction(fn2)) {
                return eventsToggle.apply(this, arguments)
            }
            return this.each(function() {
                if (bool ? state : isHidden(this)) {
                    jQuery(this).show()
                } else {
                    jQuery(this).hide()
                }
            })
        }
    });
    jQuery.extend({
        cssHooks: {
            opacity: {
                get: function(elem, computed) {
                    if (computed) {
                        var ret = curCSS(elem, "opacity");
                        return ret === "" ? "1" : ret
                    }
                }
            }
        },
        cssNumber: {
            "fillOpacity": true,
            "fontWeight": true,
            "lineHeight": true,
            "opacity": true,
            "orphans": true,
            "widows": true,
            "zIndex": true,
            "zoom": true
        },
        cssProps: {
            "float": jQuery.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(elem, name, value, extra) {
            if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
                return
            }
            var ret, type, hooks, origName = jQuery.camelCase(name), style = elem.style;
            name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(style, origName));
            hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
            if (value !== undefined) {
                type = typeof value;
                if (type === "string" && (ret = rrelNum.exec(value))) {
                    value = (ret[1] + 1) * ret[2] + parseFloat(jQuery.css(elem, name));
                    type = "number"
                }
                if (value == null || type === "number" && isNaN(value)) {
                    return
                }
                if (type === "number" && !jQuery.cssNumber[origName]) {
                    value += "px"
                }
                if (!hooks || !("set"in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {
                    try {
                        style[name] = value
                    } catch (e) {}
                }
            } else {
                if (hooks && "get"in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {
                    return ret
                }
                return style[name]
            }
        },
        css: function(elem, name, numeric, extra) {
            var val, num, hooks, origName = jQuery.camelCase(name);
            name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(elem.style, origName));
            hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
            if (hooks && "get"in hooks) {
                val = hooks.get(elem, true, extra)
            }
            if (val === undefined) {
                val = curCSS(elem, name)
            }
            if (val === "normal" && name in cssNormalTransform) {
                val = cssNormalTransform[name]
            }
            if (numeric || extra !== undefined) {
                num = parseFloat(val);
                return numeric || jQuery.isNumeric(num) ? num || 0 : val
            }
            return val
        },
        swap: function(elem, options, callback) {
            var ret, name, old = {};
            for (name in options) {
                old[name] = elem.style[name];
                elem.style[name] = options[name]
            }
            ret = callback.call(elem);
            for (name in options) {
                elem.style[name] = old[name]
            }
            return ret
        }
    });
    if (window.getComputedStyle) {
        curCSS = function(elem, name) {
            var ret, width, minWidth, maxWidth, computed = window.getComputedStyle(elem, null), style = elem.style;
            if (computed) {
                ret = computed.getPropertyValue(name) || computed[name];
                if (ret === "" && !jQuery.contains(elem.ownerDocument, elem)) {
                    ret = jQuery.style(elem, name)
                }
                if (rnumnonpx.test(ret) && rmargin.test(name)) {
                    width = style.width;
                    minWidth = style.minWidth;
                    maxWidth = style.maxWidth;
                    style.minWidth = style.maxWidth = style.width = ret;
                    ret = computed.width;
                    style.width = width;
                    style.minWidth = minWidth;
                    style.maxWidth = maxWidth
                }
            }
            return ret
        }
    } else if (document.documentElement.currentStyle) {
        curCSS = function(elem, name) {
            var left, rsLeft, ret = elem.currentStyle && elem.currentStyle[name], style = elem.style;
            if (ret == null && style && style[name]) {
                ret = style[name]
            }
            if (rnumnonpx.test(ret) && !rposition.test(name)) {
                left = style.left;
                rsLeft = elem.runtimeStyle && elem.runtimeStyle.left;
                if (rsLeft) {
                    elem.runtimeStyle.left = elem.currentStyle.left
                }
                style.left = name === "fontSize" ? "1em" : ret;
                ret = style.pixelLeft + "px";
                style.left = left;
                if (rsLeft) {
                    elem.runtimeStyle.left = rsLeft
                }
            }
            return ret === "" ? "auto" : ret
        }
    }
    function setPositiveNumber(elem, value, subtract) {
        var matches = rnumsplit.exec(value);
        return matches ? Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || "px") : value
    }
    function augmentWidthOrHeight(elem, name, extra, isBorderBox) {
        var i = extra === (isBorderBox ? "border" : "content") ? 4 : name === "width" ? 1 : 0
          , val = 0;
        for (; i < 4; i += 2) {
            if (extra === "margin") {
                val += jQuery.css(elem, extra + cssExpand[i], true)
            }
            if (isBorderBox) {
                if (extra === "content") {
                    val -= parseFloat(curCSS(elem, "padding" + cssExpand[i])) || 0
                }
                if (extra !== "margin") {
                    val -= parseFloat(curCSS(elem, "border" + cssExpand[i] + "Width")) || 0
                }
            } else {
                val += parseFloat(curCSS(elem, "padding" + cssExpand[i])) || 0;
                if (extra !== "padding") {
                    val += parseFloat(curCSS(elem, "border" + cssExpand[i] + "Width")) || 0
                }
            }
        }
        return val
    }
    function getWidthOrHeight(elem, name, extra) {
        var val = name === "width" ? elem.offsetWidth : elem.offsetHeight
          , valueIsBorderBox = true
          , isBorderBox = jQuery.support.boxSizing && jQuery.css(elem, "boxSizing") === "border-box";
        if (val <= 0 || val == null) {
            val = curCSS(elem, name);
            if (val < 0 || val == null) {
                val = elem.style[name]
            }
            if (rnumnonpx.test(val)) {
                return val
            }
            valueIsBorderBox = isBorderBox && (jQuery.support.boxSizingReliable || val === elem.style[name]);
            val = parseFloat(val) || 0
        }
        return (val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox)) + "px"
    }
    function css_defaultDisplay(nodeName) {
        if (elemdisplay[nodeName]) {
            return elemdisplay[nodeName]
        }
        var elem = jQuery("<" + nodeName + ">").appendTo(document.body)
          , display = elem.css("display");
        elem.remove();
        if (display === "none" || display === "") {
            iframe = document.body.appendChild(iframe || jQuery.extend(document.createElement("iframe"), {
                frameBorder: 0,
                width: 0,
                height: 0
            }));
            if (!iframeDoc || !iframe.createElement) {
                iframeDoc = (iframe.contentWindow || iframe.contentDocument).document;
                iframeDoc.write("<!doctype html><html><body>");
                iframeDoc.close()
            }
            elem = iframeDoc.body.appendChild(iframeDoc.createElement(nodeName));
            display = curCSS(elem, "display");
            document.body.removeChild(iframe)
        }
        elemdisplay[nodeName] = display;
        return display
    }
    jQuery.each(["height", "width"], function(i, name) {
        jQuery.cssHooks[name] = {
            get: function(elem, computed, extra) {
                if (computed) {
                    if (elem.offsetWidth === 0 && rdisplayswap.test(curCSS(elem, "display"))) {
                        return jQuery.swap(elem, cssShow, function() {
                            return getWidthOrHeight(elem, name, extra)
                        })
                    } else {
                        return getWidthOrHeight(elem, name, extra)
                    }
                }
            },
            set: function(elem, value, extra) {
                return setPositiveNumber(elem, value, extra ? augmentWidthOrHeight(elem, name, extra, jQuery.support.boxSizing && jQuery.css(elem, "boxSizing") === "border-box") : 0)
            }
        }
    });
    if (!jQuery.support.opacity) {
        jQuery.cssHooks.opacity = {
            get: function(elem, computed) {
                return ropacity.test((computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "") ? (0.01 * parseFloat(RegExp.$1)) + "" : computed ? "1" : ""
            },
            set: function(elem, value) {
                var style = elem.style
                  , currentStyle = elem.currentStyle
                  , opacity = jQuery.isNumeric(value) ? "alpha(opacity=" + value * 100 + ")" : ""
                  , filter = currentStyle && currentStyle.filter || style.filter || "";
                style.zoom = 1;
                if (value >= 1 && jQuery.trim(filter.replace(ralpha, "")) === "" && style.removeAttribute) {
                    style.removeAttribute("filter");
                    if (currentStyle && !currentStyle.filter) {
                        return
                    }
                }
                style.filter = ralpha.test(filter) ? filter.replace(ralpha, opacity) : filter + " " + opacity
            }
        }
    }
    jQuery(function() {
        if (!jQuery.support.reliableMarginRight) {
            jQuery.cssHooks.marginRight = {
                get: function(elem, computed) {
                    return jQuery.swap(elem, {
                        "display": "inline-block"
                    }, function() {
                        if (computed) {
                            return curCSS(elem, "marginRight")
                        }
                    })
                }
            }
        }
        if (!jQuery.support.pixelPosition && jQuery.fn.position) {
            jQuery.each(["top", "left"], function(i, prop) {
                jQuery.cssHooks[prop] = {
                    get: function(elem, computed) {
                        if (computed) {
                            var ret = curCSS(elem, prop);
                            return rnumnonpx.test(ret) ? jQuery(elem).position()[prop] + "px" : ret
                        }
                    }
                }
            })
        }
    });
    if (jQuery.expr && jQuery.expr.filters) {
        jQuery.expr.filters.hidden = function(elem) {
            return (elem.offsetWidth === 0 && elem.offsetHeight === 0) || (!jQuery.support.reliableHiddenOffsets && ((elem.style && elem.style.display) || curCSS(elem, "display")) === "none")
        }
        ;
        jQuery.expr.filters.visible = function(elem) {
            return !jQuery.expr.filters.hidden(elem)
        }
    }
    jQuery.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(prefix, suffix) {
        jQuery.cssHooks[prefix + suffix] = {
            expand: function(value) {
                var i, parts = typeof value === "string" ? value.split(" ") : [value], expanded = {};
                for (i = 0; i < 4; i++) {
                    expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0]
                }
                return expanded
            }
        };
        if (!rmargin.test(prefix)) {
            jQuery.cssHooks[prefix + suffix].set = setPositiveNumber
        }
    });
    var r20 = /%20/g
      , rbracket = /\[\]$/
      , rCRLF = /\r?\n/g
      , rinput = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i
      , rselectTextarea = /^(?:select|textarea)/i;
    jQuery.fn.extend({
        serialize: function() {
            return jQuery.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                return this.elements ? jQuery.makeArray(this.elements) : this
            }).filter(function() {
                return this.name && !this.disabled && (this.checked || rselectTextarea.test(this.nodeName) || rinput.test(this.type))
            }).map(function(i, elem) {
                var val = jQuery(this).val();
                return val == null ? null : jQuery.isArray(val) ? jQuery.map(val, function(val, i) {
                    return {
                        name: elem.name,
                        value: val.replace(rCRLF, "\r\n")
                    }
                }) : {
                    name: elem.name,
                    value: val.replace(rCRLF, "\r\n")
                }
            }).get()
        }
    });
    jQuery.param = function(a, traditional) {
        var prefix, s = [], add = function(key, value) {
            value = jQuery.isFunction(value) ? value() : (value == null ? "" : value);
            s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value)
        };
        if (traditional === undefined) {
            traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional
        }
        if (jQuery.isArray(a) || (a.jquery && !jQuery.isPlainObject(a))) {
            jQuery.each(a, function() {
                add(this.name, this.value)
            })
        } else {
            for (prefix in a) {
                buildParams(prefix, a[prefix], traditional, add)
            }
        }
        return s.join("&").replace(r20, "+")
    }
    ;
    function buildParams(prefix, obj, traditional, add) {
        var name;
        if (jQuery.isArray(obj)) {
            jQuery.each(obj, function(i, v) {
                if (traditional || rbracket.test(prefix)) {
                    add(prefix, v)
                } else {
                    buildParams(prefix + "[" + (typeof v === "object" ? i : "") + "]", v, traditional, add)
                }
            })
        } else if (!traditional && jQuery.type(obj) === "object") {
            for (name in obj) {
                buildParams(prefix + "[" + name + "]", obj[name], traditional, add)
            }
        } else {
            add(prefix, obj)
        }
    }
    var ajaxLocParts, ajaxLocation, rhash = /#.*$/, rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, rlocalProtocol = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/, rnoContent = /^(?:GET|HEAD)$/, rprotocol = /^\/\//, rquery = /\?/, rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, rts = /([?&])_=[^&]*/, rurl = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/, _load = jQuery.fn.load, prefilters = {}, transports = {}, allTypes = ["*/"] + ["*"];
    try {
        ajaxLocation = location.href
    } catch (e) {
        ajaxLocation = document.createElement("a");
        ajaxLocation.href = "";
        ajaxLocation = ajaxLocation.href
    }
    ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [];
    function addToPrefiltersOrTransports(structure) {
        return function(dataTypeExpression, func) {
            if (typeof dataTypeExpression !== "string") {
                func = dataTypeExpression;
                dataTypeExpression = "*"
            }
            var dataType, list, placeBefore, dataTypes = dataTypeExpression.toLowerCase().split(core_rspace), i = 0, length = dataTypes.length;
            if (jQuery.isFunction(func)) {
                for (; i < length; i++) {
                    dataType = dataTypes[i];
                    placeBefore = /^\+/.test(dataType);
                    if (placeBefore) {
                        dataType = dataType.substr(1) || "*"
                    }
                    list = structure[dataType] = structure[dataType] || [];
                    list[placeBefore ? "unshift" : "push"](func)
                }
            }
        }
    }
    function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR, dataType, inspected) {
        dataType = dataType || options.dataTypes[0];
        inspected = inspected || {};
        inspected[dataType] = true;
        var selection, list = structure[dataType], i = 0, length = list ? list.length : 0, executeOnly = (structure === prefilters);
        for (; i < length && (executeOnly || !selection); i++) {
            selection = list[i](options, originalOptions, jqXHR);
            if (typeof selection === "string") {
                if (!executeOnly || inspected[selection]) {
                    selection = undefined
                } else {
                    options.dataTypes.unshift(selection);
                    selection = inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR, selection, inspected)
                }
            }
        }
        if ((executeOnly || !selection) && !inspected["*"]) {
            selection = inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR, "*", inspected)
        }
        return selection
    }
    function ajaxExtend(target, src) {
        var key, deep, flatOptions = jQuery.ajaxSettings.flatOptions || {};
        for (key in src) {
            if (src[key] !== undefined) {
                (flatOptions[key] ? target : (deep || (deep = {})))[key] = src[key]
            }
        }
        if (deep) {
            jQuery.extend(true, target, deep)
        }
    }
    jQuery.fn.load = function(url, params, callback) {
        if (typeof url !== "string" && _load) {
            return _load.apply(this, arguments)
        }
        if (!this.length) {
            return this
        }
        var selector, type, response, self = this, off = url.indexOf(" ");
        if (off >= 0) {
            selector = url.slice(off, url.length);
            url = url.slice(0, off)
        }
        if (jQuery.isFunction(params)) {
            callback = params;
            params = undefined
        } else if (params && typeof params === "object") {
            type = "POST"
        }
        jQuery.ajax({
            url: url,
            type: type,
            dataType: "html",
            data: params,
            complete: function(jqXHR, status) {
                if (callback) {
                    self.each(callback, response || [jqXHR.responseText, status, jqXHR])
                }
            }
        }).done(function(responseText) {
            response = arguments;
            self.html(selector ? jQuery("<div>").append(responseText.replace(rscript, "")).find(selector) : responseText)
        });
        return this
    }
    ;
    jQuery.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(i, o) {
        jQuery.fn[o] = function(f) {
            return this.on(o, f)
        }
    });
    jQuery.each(["get", "post"], function(i, method) {
        jQuery[method] = function(url, data, callback, type) {
            if (jQuery.isFunction(data)) {
                type = type || callback;
                callback = data;
                data = undefined
            }
            return jQuery.ajax({
                type: method,
                url: url,
                data: data,
                success: callback,
                dataType: type
            })
        }
    });
    jQuery.extend({
        getScript: function(url, callback) {
            return jQuery.get(url, undefined, callback, "script")
        },
        getJSON: function(url, data, callback) {
            return jQuery.get(url, data, callback, "json")
        },
        ajaxSetup: function(target, settings) {
            if (settings) {
                ajaxExtend(target, jQuery.ajaxSettings)
            } else {
                settings = target;
                target = jQuery.ajaxSettings
            }
            ajaxExtend(target, settings);
            return target
        },
        ajaxSettings: {
            url: ajaxLocation,
            isLocal: rlocalProtocol.test(ajaxLocParts[1]),
            global: true,
            type: "GET",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            processData: true,
            async: true,
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                text: "text/plain",
                json: "application/json, text/javascript",
                "*": allTypes
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText"
            },
            converters: {
                "* text": window.String,
                "text html": true,
                "text json": jQuery.parseJSON,
                "text xml": jQuery.parseXML
            },
            flatOptions: {
                context: true,
                url: true
            }
        },
        ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
        ajaxTransport: addToPrefiltersOrTransports(transports),
        ajax: function(url, options) {
            if (typeof url === "object") {
                options = url;
                url = undefined
            }
            options = options || {};
            var ifModifiedKey, responseHeadersString, responseHeaders, transport, timeoutTimer, parts, fireGlobals, i, s = jQuery.ajaxSetup({}, options), callbackContext = s.context || s, globalEventContext = callbackContext !== s && (callbackContext.nodeType || callbackContext instanceof jQuery) ? jQuery(callbackContext) : jQuery.event, deferred = jQuery.Deferred(), completeDeferred = jQuery.Callbacks("once memory"), statusCode = s.statusCode || {}, requestHeaders = {}, requestHeadersNames = {}, state = 0, strAbort = "canceled", jqXHR = {
                readyState: 0,
                setRequestHeader: function(name, value) {
                    if (!state) {
                        var lname = name.toLowerCase();
                        name = requestHeadersNames[lname] = requestHeadersNames[lname] || name;
                        requestHeaders[name] = value
                    }
                    return this
                },
                getAllResponseHeaders: function() {
                    return state === 2 ? responseHeadersString : null
                },
                getResponseHeader: function(key) {
                    var match;
                    if (state === 2) {
                        if (!responseHeaders) {
                            responseHeaders = {};
                            while ((match = rheaders.exec(responseHeadersString))) {
                                responseHeaders[match[1].toLowerCase()] = match[2]
                            }
                        }
                        match = responseHeaders[key.toLowerCase()]
                    }
                    return match === undefined ? null : match
                },
                overrideMimeType: function(type) {
                    if (!state) {
                        s.mimeType = type
                    }
                    return this
                },
                abort: function(statusText) {
                    statusText = statusText || strAbort;
                    if (transport) {
                        transport.abort(statusText)
                    }
                    done(0, statusText);
                    return this
                }
            };
            function done(status, nativeStatusText, responses, headers) {
                var isSuccess, success, error, response, modified, statusText = nativeStatusText;
                if (state === 2) {
                    return
                }
                state = 2;
                if (timeoutTimer) {
                    clearTimeout(timeoutTimer)
                }
                transport = undefined;
                responseHeadersString = headers || "";
                jqXHR.readyState = status > 0 ? 4 : 0;
                if (responses) {
                    response = ajaxHandleResponses(s, jqXHR, responses)
                }
                if (status >= 200 && status < 300 || status === 304) {
                    if (s.ifModified) {
                        modified = jqXHR.getResponseHeader("Last-Modified");
                        if (modified) {
                            jQuery.lastModified[ifModifiedKey] = modified
                        }
                        modified = jqXHR.getResponseHeader("Etag");
                        if (modified) {
                            jQuery.etag[ifModifiedKey] = modified
                        }
                    }
                    if (status === 304) {
                        statusText = "notmodified";
                        isSuccess = true
                    } else {
                        isSuccess = ajaxConvert(s, response);
                        statusText = isSuccess.state;
                        success = isSuccess.data;
                        error = isSuccess.error;
                        isSuccess = !error
                    }
                } else {
                    error = statusText;
                    if (!statusText || status) {
                        statusText = "error";
                        if (status < 0) {
                            status = 0
                        }
                    }
                }
                jqXHR.status = status;
                jqXHR.statusText = (nativeStatusText || statusText) + "";
                if (isSuccess) {
                    deferred.resolveWith(callbackContext, [success, statusText, jqXHR])
                } else {
                    deferred.rejectWith(callbackContext, [jqXHR, statusText, error])
                }
                jqXHR.statusCode(statusCode);
                statusCode = undefined;
                if (fireGlobals) {
                    globalEventContext.trigger("ajax" + (isSuccess ? "Success" : "Error"), [jqXHR, s, isSuccess ? success : error])
                }
                completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);
                if (fireGlobals) {
                    globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
                    if (!(--jQuery.active)) {
                        jQuery.event.trigger("ajaxStop")
                    }
                }
            }
            deferred.promise(jqXHR);
            jqXHR.success = jqXHR.done;
            jqXHR.error = jqXHR.fail;
            jqXHR.complete = completeDeferred.add;
            jqXHR.statusCode = function(map) {
                if (map) {
                    var tmp;
                    if (state < 2) {
                        for (tmp in map) {
                            statusCode[tmp] = [statusCode[tmp], map[tmp]]
                        }
                    } else {
                        tmp = map[jqXHR.status];
                        jqXHR.always(tmp)
                    }
                }
                return this
            }
            ;
            s.url = ((url || s.url) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//");
            s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().split(core_rspace);
            if (s.crossDomain == null) {
                parts = rurl.exec(s.url.toLowerCase());
                s.crossDomain = !!(parts && (parts[1] !== ajaxLocParts[1] || parts[2] !== ajaxLocParts[2] || (parts[3] || (parts[1] === "http:" ? 80 : 443)) != (ajaxLocParts[3] || (ajaxLocParts[1] === "http:" ? 80 : 443))))
            }
            if (s.data && s.processData && typeof s.data !== "string") {
                s.data = jQuery.param(s.data, s.traditional)
            }
            inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
            if (state === 2) {
                return jqXHR
            }
            fireGlobals = s.global;
            s.type = s.type.toUpperCase();
            s.hasContent = !rnoContent.test(s.type);
            if (fireGlobals && jQuery.active++ === 0) {
                jQuery.event.trigger("ajaxStart")
            }
            if (!s.hasContent) {
                if (s.data) {
                    s.url += (rquery.test(s.url) ? "&" : "?") + s.data;
                    delete s.data
                }
                ifModifiedKey = s.url;
                if (s.cache === false) {
                    var ts = jQuery.now()
                      , ret = s.url.replace(rts, "$1_=" + ts);
                    s.url = ret + ((ret === s.url) ? (rquery.test(s.url) ? "&" : "?") + "_=" + ts : "")
                }
            }
            if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
                jqXHR.setRequestHeader("Content-Type", s.contentType)
            }
            if (s.ifModified) {
                ifModifiedKey = ifModifiedKey || s.url;
                if (jQuery.lastModified[ifModifiedKey]) {
                    jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[ifModifiedKey])
                }
                if (jQuery.etag[ifModifiedKey]) {
                    jqXHR.setRequestHeader("If-None-Match", jQuery.etag[ifModifiedKey])
                }
            }
            jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);
            for (i in s.headers) {
                jqXHR.setRequestHeader(i, s.headers[i])
            }
            if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2)) {
                return jqXHR.abort()
            }
            strAbort = "abort";
            for (i in {
                success: 1,
                error: 1,
                complete: 1
            }) {
                jqXHR[i](s[i])
            }
            transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
            if (!transport) {
                done(-1, "No Transport")
            } else {
                jqXHR.readyState = 1;
                if (fireGlobals) {
                    globalEventContext.trigger("ajaxSend", [jqXHR, s])
                }
                if (s.async && s.timeout > 0) {
                    timeoutTimer = setTimeout(function() {
                        jqXHR.abort("timeout")
                    }, s.timeout)
                }
                try {
                    state = 1;
                    transport.send(requestHeaders, done)
                } catch (e) {
                    if (state < 2) {
                        done(-1, e)
                    } else {
                        throw e;
                    }
                }
            }
            return jqXHR
        },
        active: 0,
        lastModified: {},
        etag: {}
    });
    function ajaxHandleResponses(s, jqXHR, responses) {
        var ct, type, finalDataType, firstDataType, contents = s.contents, dataTypes = s.dataTypes, responseFields = s.responseFields;
        for (type in responseFields) {
            if (type in responses) {
                jqXHR[responseFields[type]] = responses[type]
            }
        }
        while (dataTypes[0] === "*") {
            dataTypes.shift();
            if (ct === undefined) {
                ct = s.mimeType || jqXHR.getResponseHeader("content-type")
            }
        }
        if (ct) {
            for (type in contents) {
                if (contents[type] && contents[type].test(ct)) {
                    dataTypes.unshift(type);
                    break
                }
            }
        }
        if (dataTypes[0]in responses) {
            finalDataType = dataTypes[0]
        } else {
            for (type in responses) {
                if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
                    finalDataType = type;
                    break
                }
                if (!firstDataType) {
                    firstDataType = type
                }
            }
            finalDataType = finalDataType || firstDataType
        }
        if (finalDataType) {
            if (finalDataType !== dataTypes[0]) {
                dataTypes.unshift(finalDataType)
            }
            return responses[finalDataType]
        }
    }
    function ajaxConvert(s, response) {
        var conv, conv2, current, tmp, dataTypes = s.dataTypes.slice(), prev = dataTypes[0], converters = {}, i = 0;
        if (s.dataFilter) {
            response = s.dataFilter(response, s.dataType)
        }
        if (dataTypes[1]) {
            for (conv in s.converters) {
                converters[conv.toLowerCase()] = s.converters[conv]
            }
        }
        for (; (current = dataTypes[++i]); ) {
            if (current !== "*") {
                if (prev !== "*" && prev !== current) {
                    conv = converters[prev + " " + current] || converters["* " + current];
                    if (!conv) {
                        for (conv2 in converters) {
                            tmp = conv2.split(" ");
                            if (tmp[1] === current) {
                                conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];
                                if (conv) {
                                    if (conv === true) {
                                        conv = converters[conv2]
                                    } else if (converters[conv2] !== true) {
                                        current = tmp[0];
                                        dataTypes.splice(i--, 0, current)
                                    }
                                    break
                                }
                            }
                        }
                    }
                    if (conv !== true) {
                        if (conv && s["throws"]) {
                            response = conv(response)
                        } else {
                            try {
                                response = conv(response)
                            } catch (e) {
                                return {
                                    state: "parsererror",
                                    error: conv ? e : "No conversion from " + prev + " to " + current
                                }
                            }
                        }
                    }
                }
                prev = current
            }
        }
        return {
            state: "success",
            data: response
        }
    }
    var oldCallbacks = []
      , rquestion = /\?/
      , rjsonp = /(=)\?(?=&|$)|\?\?/
      , nonce = jQuery.now();
    jQuery.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var callback = oldCallbacks.pop() || (jQuery.expando + "_" + (nonce++));
            this[callback] = true;
            return callback
        }
    });
    jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
        var callbackName, overwritten, responseContainer, data = s.data, url = s.url, hasCallback = s.jsonp !== false, replaceInUrl = hasCallback && rjsonp.test(url), replaceInData = hasCallback && !replaceInUrl && typeof data === "string" && !(s.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(data);
        if (s.dataTypes[0] === "jsonp" || replaceInUrl || replaceInData) {
            callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;
            overwritten = window[callbackName];
            if (replaceInUrl) {
                s.url = url.replace(rjsonp, "$1" + callbackName)
            } else if (replaceInData) {
                s.data = data.replace(rjsonp, "$1" + callbackName)
            } else if (hasCallback) {
                s.url += (rquestion.test(url) ? "&" : "?") + s.jsonp + "=" + callbackName
            }
            s.converters["script json"] = function() {
                if (!responseContainer) {
                    jQuery.error(callbackName + " was not called")
                }
                return responseContainer[0]
            }
            ;
            s.dataTypes[0] = "json";
            window[callbackName] = function() {
                responseContainer = arguments
            }
            ;
            jqXHR.always(function() {
                window[callbackName] = overwritten;
                if (s[callbackName]) {
                    s.jsonpCallback = originalSettings.jsonpCallback;
                    oldCallbacks.push(callbackName)
                }
                if (responseContainer && jQuery.isFunction(overwritten)) {
                    overwritten(responseContainer[0])
                }
                responseContainer = overwritten = undefined
            });
            return "script"
        }
    });
    jQuery.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /javascript|ecmascript/
        },
        converters: {
            "text script": function(text) {
                jQuery.globalEval(text);
                return text
            }
        }
    });
    jQuery.ajaxPrefilter("script", function(s) {
        if (s.cache === undefined) {
            s.cache = false
        }
        if (s.crossDomain) {
            s.type = "GET";
            s.global = false
        }
    });
    jQuery.ajaxTransport("script", function(s) {
        if (s.crossDomain) {
            var script, head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
            return {
                send: function(_, callback) {
                    script = document.createElement("script");
                    script.async = "async";
                    if (s.scriptCharset) {
                        script.charset = s.scriptCharset
                    }
                    script.src = s.url;
                    script.onload = script.onreadystatechange = function(_, isAbort) {
                        if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
                            script.onload = script.onreadystatechange = null;
                            if (head && script.parentNode) {
                                head.removeChild(script)
                            }
                            script = undefined;
                            if (!isAbort) {
                                callback(200, "success")
                            }
                        }
                    }
                    ;
                    head.insertBefore(script, head.firstChild)
                },
                abort: function() {
                    if (script) {
                        script.onload(0, 1)
                    }
                }
            }
        }
    });
    var xhrCallbacks, xhrOnUnloadAbort = window.ActiveXObject ? function() {
        for (var key in xhrCallbacks) {
            xhrCallbacks[key](0, 1)
        }
    }
    : false, xhrId = 0;
    function createStandardXHR() {
        try {
            return new window.XMLHttpRequest()
        } catch (e) {}
    }
    function createActiveXHR() {
        try {
            return new window.ActiveXObject("Microsoft.XMLHTTP")
        } catch (e) {}
    }
    jQuery.ajaxSettings.xhr = window.ActiveXObject ? function() {
        return !this.isLocal && createStandardXHR() || createActiveXHR()
    }
    : createStandardXHR;
    (function(xhr) {
        jQuery.extend(jQuery.support, {
            ajax: !!xhr,
            cors: !!xhr && ("withCredentials"in xhr)
        })
    }
    )(jQuery.ajaxSettings.xhr());
    if (jQuery.support.ajax) {
        jQuery.ajaxTransport(function(s) {
            if (!s.crossDomain || jQuery.support.cors) {
                var callback;
                return {
                    send: function(headers, complete) {
                        var handle, i, xhr = s.xhr();
                        if (s.username) {
                            xhr.open(s.type, s.url, s.async, s.username, s.password)
                        } else {
                            xhr.open(s.type, s.url, s.async)
                        }
                        if (s.xhrFields) {
                            for (i in s.xhrFields) {
                                xhr[i] = s.xhrFields[i]
                            }
                        }
                        if (s.mimeType && xhr.overrideMimeType) {
                            xhr.overrideMimeType(s.mimeType)
                        }
                        if (!s.crossDomain && !headers["X-Requested-With"]) {
                            headers["X-Requested-With"] = "XMLHttpRequest"
                        }
                        try {
                            for (i in headers) {
                                xhr.setRequestHeader(i, headers[i])
                            }
                        } catch (_) {}
                        xhr.send((s.hasContent && s.data) || null);
                        callback = function(_, isAbort) {
                            var status, statusText, responseHeaders, responses, xml;
                            try {
                                if (callback && (isAbort || xhr.readyState === 4)) {
                                    callback = undefined;
                                    if (handle) {
                                        xhr.onreadystatechange = jQuery.noop;
                                        if (xhrOnUnloadAbort) {
                                            delete xhrCallbacks[handle]
                                        }
                                    }
                                    if (isAbort) {
                                        if (xhr.readyState !== 4) {
                                            xhr.abort()
                                        }
                                    } else {
                                        status = xhr.status;
                                        responseHeaders = xhr.getAllResponseHeaders();
                                        responses = {};
                                        xml = xhr.responseXML;
                                        if (xml && xml.documentElement) {
                                            responses.xml = xml
                                        }
                                        try {
                                            responses.text = xhr.responseText
                                        } catch (e) {}
                                        try {
                                            statusText = xhr.statusText
                                        } catch (e) {
                                            statusText = ""
                                        }
                                        if (!status && s.isLocal && !s.crossDomain) {
                                            status = responses.text ? 200 : 404
                                        } else if (status === 1223) {
                                            status = 204
                                        }
                                    }
                                }
                            } catch (firefoxAccessException) {
                                if (!isAbort) {
                                    complete(-1, firefoxAccessException)
                                }
                            }
                            if (responses) {
                                complete(status, statusText, responses, responseHeaders)
                            }
                        }
                        ;
                        if (!s.async) {
                            callback()
                        } else if (xhr.readyState === 4) {
                            setTimeout(callback, 0)
                        } else {
                            handle = ++xhrId;
                            if (xhrOnUnloadAbort) {
                                if (!xhrCallbacks) {
                                    xhrCallbacks = {};
                                    jQuery(window).unload(xhrOnUnloadAbort)
                                }
                                xhrCallbacks[handle] = callback
                            }
                            xhr.onreadystatechange = callback
                        }
                    },
                    abort: function() {
                        if (callback) {
                            callback(0, 1)
                        }
                    }
                }
            }
        })
    }
    var fxNow, timerId, rfxtypes = /^(?:toggle|show|hide)$/, rfxnum = new RegExp("^(?:([-+])=|)(" + core_pnum + ")([a-z%]*)$","i"), rrun = /queueHooks$/, animationPrefilters = [defaultPrefilter], tweeners = {
        "*": [function(prop, value) {
            var end, unit, tween = this.createTween(prop, value), parts = rfxnum.exec(value), target = tween.cur(), start = +target || 0, scale = 1, maxIterations = 20;
            if (parts) {
                end = +parts[2];
                unit = parts[3] || (jQuery.cssNumber[prop] ? "" : "px");
                if (unit !== "px" && start) {
                    start = jQuery.css(tween.elem, prop, true) || end || 1;
                    do {
                        scale = scale || ".5";
                        start = start / scale;
                        jQuery.style(tween.elem, prop, start + unit)
                    } while (scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations)
                }
                tween.unit = unit;
                tween.start = start;
                tween.end = parts[1] ? start + (parts[1] + 1) * end : end
            }
            return tween
        }
        ]
    };
    function createFxNow() {
        setTimeout(function() {
            fxNow = undefined
        }, 0);
        return (fxNow = jQuery.now())
    }
    function createTweens(animation, props) {
        jQuery.each(props, function(prop, value) {
            var collection = (tweeners[prop] || []).concat(tweeners["*"])
              , index = 0
              , length = collection.length;
            for (; index < length; index++) {
                if (collection[index].call(animation, prop, value)) {
                    return
                }
            }
        })
    }
    function Animation(elem, properties, options) {
        var result, index = 0, tweenerIndex = 0, length = animationPrefilters.length, deferred = jQuery.Deferred().always(function() {
            delete tick.elem
        }), tick = function() {
            var currentTime = fxNow || createFxNow()
              , remaining = Math.max(0, animation.startTime + animation.duration - currentTime)
              , temp = remaining / animation.duration || 0
              , percent = 1 - temp
              , index = 0
              , length = animation.tweens.length;
            for (; index < length; index++) {
                animation.tweens[index].run(percent)
            }
            deferred.notifyWith(elem, [animation, percent, remaining]);
            if (percent < 1 && length) {
                return remaining
            } else {
                deferred.resolveWith(elem, [animation]);
                return false
            }
        }, animation = deferred.promise({
            elem: elem,
            props: jQuery.extend({}, properties),
            opts: jQuery.extend(true, {
                specialEasing: {}
            }, options),
            originalProperties: properties,
            originalOptions: options,
            startTime: fxNow || createFxNow(),
            duration: options.duration,
            tweens: [],
            createTween: function(prop, end, easing) {
                var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
                animation.tweens.push(tween);
                return tween
            },
            stop: function(gotoEnd) {
                var index = 0
                  , length = gotoEnd ? animation.tweens.length : 0;
                for (; index < length; index++) {
                    animation.tweens[index].run(1)
                }
                if (gotoEnd) {
                    deferred.resolveWith(elem, [animation, gotoEnd])
                } else {
                    deferred.rejectWith(elem, [animation, gotoEnd])
                }
                return this
            }
        }), props = animation.props;
        propFilter(props, animation.opts.specialEasing);
        for (; index < length; index++) {
            result = animationPrefilters[index].call(animation, elem, props, animation.opts);
            if (result) {
                return result
            }
        }
        createTweens(animation, props);
        if (jQuery.isFunction(animation.opts.start)) {
            animation.opts.start.call(elem, animation)
        }
        jQuery.fx.timer(jQuery.extend(tick, {
            anim: animation,
            queue: animation.opts.queue,
            elem: elem
        }));
        return animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always)
    }
    function propFilter(props, specialEasing) {
        var index, name, easing, value, hooks;
        for (index in props) {
            name = jQuery.camelCase(index);
            easing = specialEasing[name];
            value = props[index];
            if (jQuery.isArray(value)) {
                easing = value[1];
                value = props[index] = value[0]
            }
            if (index !== name) {
                props[name] = value;
                delete props[index]
            }
            hooks = jQuery.cssHooks[name];
            if (hooks && "expand"in hooks) {
                value = hooks.expand(value);
                delete props[name];
                for (index in value) {
                    if (!(index in props)) {
                        props[index] = value[index];
                        specialEasing[index] = easing
                    }
                }
            } else {
                specialEasing[name] = easing
            }
        }
    }
    jQuery.Animation = jQuery.extend(Animation, {
        tweener: function(props, callback) {
            if (jQuery.isFunction(props)) {
                callback = props;
                props = ["*"]
            } else {
                props = props.split(" ")
            }
            var prop, index = 0, length = props.length;
            for (; index < length; index++) {
                prop = props[index];
                tweeners[prop] = tweeners[prop] || [];
                tweeners[prop].unshift(callback)
            }
        },
        prefilter: function(callback, prepend) {
            if (prepend) {
                animationPrefilters.unshift(callback)
            } else {
                animationPrefilters.push(callback)
            }
        }
    });
    function defaultPrefilter(elem, props, opts) {
        var index, prop, value, length, dataShow, toggle, tween, hooks, oldfire, anim = this, style = elem.style, orig = {}, handled = [], hidden = elem.nodeType && isHidden(elem);
        if (!opts.queue) {
            hooks = jQuery._queueHooks(elem, "fx");
            if (hooks.unqueued == null) {
                hooks.unqueued = 0;
                oldfire = hooks.empty.fire;
                hooks.empty.fire = function() {
                    if (!hooks.unqueued) {
                        oldfire()
                    }
                }
            }
            hooks.unqueued++;
            anim.always(function() {
                anim.always(function() {
                    hooks.unqueued--;
                    if (!jQuery.queue(elem, "fx").length) {
                        hooks.empty.fire()
                    }
                })
            })
        }
        if (elem.nodeType === 1 && ("height"in props || "width"in props)) {
            opts.overflow = [style.overflow, style.overflowX, style.overflowY];
            if (jQuery.css(elem, "display") === "inline" && jQuery.css(elem, "float") === "none") {
                if (!jQuery.support.inlineBlockNeedsLayout || css_defaultDisplay(elem.nodeName) === "inline") {
                    style.display = "inline-block"
                } else {
                    style.zoom = 1
                }
            }
        }
        if (opts.overflow) {
            style.overflow = "hidden";
            if (!jQuery.support.shrinkWrapBlocks) {
                anim.done(function() {
                    style.overflow = opts.overflow[0];
                    style.overflowX = opts.overflow[1];
                    style.overflowY = opts.overflow[2]
                })
            }
        }
        for (index in props) {
            value = props[index];
            if (rfxtypes.exec(value)) {
                delete props[index];
                toggle = toggle || value === "toggle";
                if (value === (hidden ? "hide" : "show")) {
                    continue
                }
                handled.push(index)
            }
        }
        length = handled.length;
        if (length) {
            dataShow = jQuery._data(elem, "fxshow") || jQuery._data(elem, "fxshow", {});
            if ("hidden"in dataShow) {
                hidden = dataShow.hidden
            }
            if (toggle) {
                dataShow.hidden = !hidden
            }
            if (hidden) {
                jQuery(elem).show()
            } else {
                anim.done(function() {
                    jQuery(elem).hide()
                })
            }
            anim.done(function() {
                var prop;
                jQuery.removeData(elem, "fxshow", true);
                for (prop in orig) {
                    jQuery.style(elem, prop, orig[prop])
                }
            });
            for (index = 0; index < length; index++) {
                prop = handled[index];
                tween = anim.createTween(prop, hidden ? dataShow[prop] : 0);
                orig[prop] = dataShow[prop] || jQuery.style(elem, prop);
                if (!(prop in dataShow)) {
                    dataShow[prop] = tween.start;
                    if (hidden) {
                        tween.end = tween.start;
                        tween.start = prop === "width" || prop === "height" ? 1 : 0
                    }
                }
            }
        }
    }
    function Tween(elem, options, prop, end, easing) {
        return new Tween.prototype.init(elem,options,prop,end,easing)
    }
    jQuery.Tween = Tween;
    Tween.prototype = {
        constructor: Tween,
        init: function(elem, options, prop, end, easing, unit) {
            this.elem = elem;
            this.prop = prop;
            this.easing = easing || "swing";
            this.options = options;
            this.start = this.now = this.cur();
            this.end = end;
            this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px")
        },
        cur: function() {
            var hooks = Tween.propHooks[this.prop];
            return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this)
        },
        run: function(percent) {
            var eased, hooks = Tween.propHooks[this.prop];
            if (this.options.duration) {
                this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration)
            } else {
                this.pos = eased = percent
            }
            this.now = (this.end - this.start) * eased + this.start;
            if (this.options.step) {
                this.options.step.call(this.elem, this.now, this)
            }
            if (hooks && hooks.set) {
                hooks.set(this)
            } else {
                Tween.propHooks._default.set(this)
            }
            return this
        }
    };
    Tween.prototype.init.prototype = Tween.prototype;
    Tween.propHooks = {
        _default: {
            get: function(tween) {
                var result;
                if (tween.elem[tween.prop] != null && (!tween.elem.style || tween.elem.style[tween.prop] == null)) {
                    return tween.elem[tween.prop]
                }
                result = jQuery.css(tween.elem, tween.prop, false, "");
                return !result || result === "auto" ? 0 : result
            },
            set: function(tween) {
                if (jQuery.fx.step[tween.prop]) {
                    jQuery.fx.step[tween.prop](tween)
                } else if (tween.elem.style && (tween.elem.style[jQuery.cssProps[tween.prop]] != null || jQuery.cssHooks[tween.prop])) {
                    jQuery.style(tween.elem, tween.prop, tween.now + tween.unit)
                } else {
                    tween.elem[tween.prop] = tween.now
                }
            }
        }
    };
    Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
        set: function(tween) {
            if (tween.elem.nodeType && tween.elem.parentNode) {
                tween.elem[tween.prop] = tween.now
            }
        }
    };
    jQuery.each(["toggle", "show", "hide"], function(i, name) {
        var cssFn = jQuery.fn[name];
        jQuery.fn[name] = function(speed, easing, callback) {
            return speed == null || typeof speed === "boolean" || (!i && jQuery.isFunction(speed) && jQuery.isFunction(easing)) ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback)
        }
    });
    jQuery.fn.extend({
        fadeTo: function(speed, to, easing, callback) {
            return this.filter(isHidden).css("opacity", 0).show().end().animate({
                opacity: to
            }, speed, easing, callback)
        },
        animate: function(prop, speed, easing, callback) {
            var empty = jQuery.isEmptyObject(prop)
              , optall = jQuery.speed(speed, easing, callback)
              , doAnimation = function() {
                var anim = Animation(this, jQuery.extend({}, prop), optall);
                if (empty) {
                    anim.stop(true)
                }
            };
            return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation)
        },
        stop: function(type, clearQueue, gotoEnd) {
            var stopQueue = function(hooks) {
                var stop = hooks.stop;
                delete hooks.stop;
                stop(gotoEnd)
            };
            if (typeof type !== "string") {
                gotoEnd = clearQueue;
                clearQueue = type;
                type = undefined
            }
            if (clearQueue && type !== false) {
                this.queue(type || "fx", [])
            }
            return this.each(function() {
                var dequeue = true
                  , index = type != null && type + "queueHooks"
                  , timers = jQuery.timers
                  , data = jQuery._data(this);
                if (index) {
                    if (data[index] && data[index].stop) {
                        stopQueue(data[index])
                    }
                } else {
                    for (index in data) {
                        if (data[index] && data[index].stop && rrun.test(index)) {
                            stopQueue(data[index])
                        }
                    }
                }
                for (index = timers.length; index--; ) {
                    if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
                        timers[index].anim.stop(gotoEnd);
                        dequeue = false;
                        timers.splice(index, 1)
                    }
                }
                if (dequeue || !gotoEnd) {
                    jQuery.dequeue(this, type)
                }
            })
        }
    });
    function genFx(type, includeWidth) {
        var which, attrs = {
            height: type
        }, i = 0;
        includeWidth = includeWidth ? 1 : 0;
        for (; i < 4; i += 2 - includeWidth) {
            which = cssExpand[i];
            attrs["margin" + which] = attrs["padding" + which] = type
        }
        if (includeWidth) {
            attrs.opacity = attrs.width = type
        }
        return attrs
    }
    jQuery.each({
        slideDown: genFx("show"),
        slideUp: genFx("hide"),
        slideToggle: genFx("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(name, props) {
        jQuery.fn[name] = function(speed, easing, callback) {
            return this.animate(props, speed, easing, callback)
        }
    });
    jQuery.speed = function(speed, easing, fn) {
        var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
            complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
            duration: speed,
            easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
        };
        opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;
        if (opt.queue == null || opt.queue === true) {
            opt.queue = "fx"
        }
        opt.old = opt.complete;
        opt.complete = function() {
            if (jQuery.isFunction(opt.old)) {
                opt.old.call(this)
            }
            if (opt.queue) {
                jQuery.dequeue(this, opt.queue)
            }
        }
        ;
        return opt
    }
    ;
    jQuery.easing = {
        linear: function(p) {
            return p
        },
        swing: function(p) {
            return 0.5 - Math.cos(p * Math.PI) / 2
        }
    };
    jQuery.timers = [];
    jQuery.fx = Tween.prototype.init;
    jQuery.fx.tick = function() {
        var timer, timers = jQuery.timers, i = 0;
        fxNow = jQuery.now();
        for (; i < timers.length; i++) {
            timer = timers[i];
            if (!timer() && timers[i] === timer) {
                timers.splice(i--, 1)
            }
        }
        if (!timers.length) {
            jQuery.fx.stop()
        }
        fxNow = undefined
    }
    ;
    jQuery.fx.timer = function(timer) {
        if (timer() && jQuery.timers.push(timer) && !timerId) {
            timerId = setInterval(jQuery.fx.tick, jQuery.fx.interval)
        }
    }
    ;
    jQuery.fx.interval = 13;
    jQuery.fx.stop = function() {
        clearInterval(timerId);
        timerId = null
    }
    ;
    jQuery.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    };
    jQuery.fx.step = {};
    if (jQuery.expr && jQuery.expr.filters) {
        jQuery.expr.filters.animated = function(elem) {
            return jQuery.grep(jQuery.timers, function(fn) {
                return elem === fn.elem
            }).length
        }
    }
    var rroot = /^(?:body|html)$/i;
    jQuery.fn.offset = function(options) {
        if (arguments.length) {
            return options === undefined ? this : this.each(function(i) {
                jQuery.offset.setOffset(this, options, i)
            })
        }
        var docElem, body, win, clientTop, clientLeft, scrollTop, scrollLeft, box = {
            top: 0,
            left: 0
        }, elem = this[0], doc = elem && elem.ownerDocument;
        if (!doc) {
            return
        }
        if ((body = doc.body) === elem) {
            return jQuery.offset.bodyOffset(elem)
        }
        docElem = doc.documentElement;
        if (!jQuery.contains(docElem, elem)) {
            return box
        }
        if (typeof elem.getBoundingClientRect !== "undefined") {
            box = elem.getBoundingClientRect()
        }
        win = getWindow(doc);
        clientTop = docElem.clientTop || body.clientTop || 0;
        clientLeft = docElem.clientLeft || body.clientLeft || 0;
        scrollTop = win.pageYOffset || docElem.scrollTop;
        scrollLeft = win.pageXOffset || docElem.scrollLeft;
        return {
            top: box.top + scrollTop - clientTop,
            left: box.left + scrollLeft - clientLeft
        }
    }
    ;
    jQuery.offset = {
        bodyOffset: function(body) {
            var top = body.offsetTop
              , left = body.offsetLeft;
            if (jQuery.support.doesNotIncludeMarginInBodyOffset) {
                top += parseFloat(jQuery.css(body, "marginTop")) || 0;
                left += parseFloat(jQuery.css(body, "marginLeft")) || 0
            }
            return {
                top: top,
                left: left
            }
        },
        setOffset: function(elem, options, i) {
            var position = jQuery.css(elem, "position");
            if (position === "static") {
                elem.style.position = "relative"
            }
            var curElem = jQuery(elem), curOffset = curElem.offset(), curCSSTop = jQuery.css(elem, "top"), curCSSLeft = jQuery.css(elem, "left"), calculatePosition = (position === "absolute" || position === "fixed") && jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1, props = {}, curPosition = {}, curTop, curLeft;
            if (calculatePosition) {
                curPosition = curElem.position();
                curTop = curPosition.top;
                curLeft = curPosition.left
            } else {
                curTop = parseFloat(curCSSTop) || 0;
                curLeft = parseFloat(curCSSLeft) || 0
            }
            if (jQuery.isFunction(options)) {
                options = options.call(elem, i, curOffset)
            }
            if (options.top != null) {
                props.top = (options.top - curOffset.top) + curTop
            }
            if (options.left != null) {
                props.left = (options.left - curOffset.left) + curLeft
            }
            if ("using"in options) {
                options.using.call(elem, props)
            } else {
                curElem.css(props)
            }
        }
    };
    jQuery.fn.extend({
        position: function() {
            if (!this[0]) {
                return
            }
            var elem = this[0]
              , offsetParent = this.offsetParent()
              , offset = this.offset()
              , parentOffset = rroot.test(offsetParent[0].nodeName) ? {
                top: 0,
                left: 0
            } : offsetParent.offset();
            offset.top -= parseFloat(jQuery.css(elem, "marginTop")) || 0;
            offset.left -= parseFloat(jQuery.css(elem, "marginLeft")) || 0;
            parentOffset.top += parseFloat(jQuery.css(offsetParent[0], "borderTopWidth")) || 0;
            parentOffset.left += parseFloat(jQuery.css(offsetParent[0], "borderLeftWidth")) || 0;
            return {
                top: offset.top - parentOffset.top,
                left: offset.left - parentOffset.left
            }
        },
        offsetParent: function() {
            return this.map(function() {
                var offsetParent = this.offsetParent || document.body;
                while (offsetParent && (!rroot.test(offsetParent.nodeName) && jQuery.css(offsetParent, "position") === "static")) {
                    offsetParent = offsetParent.offsetParent
                }
                return offsetParent || document.body
            })
        }
    });
    jQuery.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(method, prop) {
        var top = /Y/.test(prop);
        jQuery.fn[method] = function(val) {
            return jQuery.access(this, function(elem, method, val) {
                var win = getWindow(elem);
                if (val === undefined) {
                    return win ? (prop in win) ? win[prop] : win.document.documentElement[method] : elem[method]
                }
                if (win) {
                    win.scrollTo(!top ? val : jQuery(win).scrollLeft(), top ? val : jQuery(win).scrollTop())
                } else {
                    elem[method] = val
                }
            }, method, val, arguments.length, null)
        }
    });
    function getWindow(elem) {
        return jQuery.isWindow(elem) ? elem : elem.nodeType === 9 ? elem.defaultView || elem.parentWindow : false
    }
    jQuery.each({
        Height: "height",
        Width: "width"
    }, function(name, type) {
        jQuery.each({
            padding: "inner" + name,
            content: type,
            "": "outer" + name
        }, function(defaultExtra, funcName) {
            jQuery.fn[funcName] = function(margin, value) {
                var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean")
                  , extra = defaultExtra || (margin === true || value === true ? "margin" : "border");
                return jQuery.access(this, function(elem, type, value) {
                    var doc;
                    if (jQuery.isWindow(elem)) {
                        return elem.document.documentElement["client" + name]
                    }
                    if (elem.nodeType === 9) {
                        doc = elem.documentElement;
                        return Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name])
                    }
                    return value === undefined ? jQuery.css(elem, type, value, extra) : jQuery.style(elem, type, value, extra)
                }, type, chainable ? margin : undefined, chainable, null)
            }
        })
    });
    window.jQuery = window.$ = jQuery;
    if (typeof define === "function" && define.amd && define.amd.jQuery) {
        define("jquery", [], function() {
            return jQuery
        })
    }
}
)(window);
(function() {
    'use strict';
    var $;
    var Swiper = function(container, params) {
        if (!(this instanceof Swiper))
            return new Swiper(container,params);
        var defaults = {
            direction: 'horizontal',
            touchEventsTarget: 'container',
            initialSlide: 0,
            speed: 300,
            autoplay: false,
            autoplayDisableOnInteraction: true,
            autoplayStopOnLast: false,
            iOSEdgeSwipeDetection: false,
            iOSEdgeSwipeThreshold: 20,
            freeMode: false,
            freeModeMomentum: true,
            freeModeMomentumRatio: 1,
            freeModeMomentumBounce: true,
            freeModeMomentumBounceRatio: 1,
            freeModeSticky: false,
            freeModeMinimumVelocity: 0.02,
            autoHeight: false,
            setWrapperSize: false,
            virtualTranslate: false,
            effect: 'slide',
            coverflow: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true
            },
            flip: {
                slideShadows: true,
                limitRotation: true
            },
            cube: {
                slideShadows: true,
                shadow: true,
                shadowOffset: 20,
                shadowScale: 0.94
            },
            fade: {
                crossFade: false
            },
            parallax: false,
            scrollbar: null,
            scrollbarHide: true,
            scrollbarDraggable: false,
            scrollbarSnapOnRelease: false,
            keyboardControl: false,
            mousewheelControl: false,
            mousewheelReleaseOnEdges: false,
            mousewheelInvert: false,
            mousewheelForceToAxis: false,
            mousewheelSensitivity: 1,
            hashnav: false,
            breakpoints: undefined,
            spaceBetween: 0,
            slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerColumnFill: 'column',
            slidesPerGroup: 1,
            centeredSlides: false,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            roundLengths: false,
            touchRatio: 1,
            touchAngle: 45,
            simulateTouch: true,
            shortSwipes: true,
            longSwipes: true,
            longSwipesRatio: 0.5,
            longSwipesMs: 300,
            followFinger: true,
            onlyExternal: false,
            threshold: 0,
            touchMoveStopPropagation: true,
            uniqueNavElements: true,
            pagination: null,
            paginationElement: 'span',
            paginationClickable: false,
            paginationHide: false,
            paginationBulletRender: null,
            paginationProgressRender: null,
            paginationFractionRender: null,
            paginationCustomRender: null,
            paginationType: 'bullets',
            resistance: true,
            resistanceRatio: 0.85,
            nextButton: null,
            prevButton: null,
            watchSlidesProgress: false,
            watchSlidesVisibility: false,
            grabCursor: false,
            preventClicks: true,
            preventClicksPropagation: true,
            slideToClickedSlide: false,
            lazyLoading: false,
            lazyLoadingInPrevNext: false,
            lazyLoadingInPrevNextAmount: 1,
            lazyLoadingOnTransitionStart: false,
            preloadImages: true,
            updateOnImagesReady: true,
            loop: false,
            loopAdditionalSlides: 0,
            loopedSlides: null,
            control: undefined,
            controlInverse: false,
            controlBy: 'slide',
            allowSwipeToPrev: true,
            allowSwipeToNext: true,
            swipeHandler: null,
            noSwiping: true,
            noSwipingClass: 'swiper-no-swiping',
            slideClass: 'swiper-slide',
            slideActiveClass: 'swiper-slide-active',
            slideVisibleClass: 'swiper-slide-visible',
            slideDuplicateClass: 'swiper-slide-duplicate',
            slideNextClass: 'swiper-slide-next',
            slidePrevClass: 'swiper-slide-prev',
            wrapperClass: 'swiper-wrapper',
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active',
            buttonDisabledClass: 'swiper-button-disabled',
            paginationCurrentClass: 'swiper-pagination-current',
            paginationTotalClass: 'swiper-pagination-total',
            paginationHiddenClass: 'swiper-pagination-hidden',
            paginationProgressbarClass: 'swiper-pagination-progressbar',
            observer: false,
            observeParents: false,
            a11y: false,
            prevSlideMessage: 'Previous slide',
            nextSlideMessage: 'Next slide',
            firstSlideMessage: 'This is the first slide',
            lastSlideMessage: 'This is the last slide',
            paginationBulletMessage: 'Go to slide {{index}}',
            runCallbacksOnInit: true
        };
        var initialVirtualTranslate = params && params.virtualTranslate;
        params = params || {};
        var originalParams = {};
        for (var param in params) {
            if (typeof params[param] === 'object' && params[param] !== null && !(params[param].nodeType || params[param] === window || params[param] === document || (typeof Dom7 !== 'undefined' && params[param]instanceof Dom7) || (typeof jQuery !== 'undefined' && params[param]instanceof jQuery))) {
                originalParams[param] = {};
                for (var deepParam in params[param]) {
                    originalParams[param][deepParam] = params[param][deepParam]
                }
            } else {
                originalParams[param] = params[param]
            }
        }
        for (var def in defaults) {
            if (typeof params[def] === 'undefined') {
                params[def] = defaults[def]
            } else if (typeof params[def] === 'object') {
                for (var deepDef in defaults[def]) {
                    if (typeof params[def][deepDef] === 'undefined') {
                        params[def][deepDef] = defaults[def][deepDef]
                    }
                }
            }
        }
        var s = this;
        s.params = params;
        s.originalParams = originalParams;
        s.classNames = [];
        if (typeof $ !== 'undefined' && typeof Dom7 !== 'undefined') {
            $ = Dom7
        }
        if (typeof $ === 'undefined') {
            if (typeof Dom7 === 'undefined') {
                $ = window.Dom7 || window.Zepto || window.jQuery
            } else {
                $ = Dom7
            }
            if (!$)
                return
        }
        s.$ = $;
        s.currentBreakpoint = undefined;
        s.getActiveBreakpoint = function() {
            if (!s.params.breakpoints)
                return false;
            var breakpoint = false;
            var points = [], point;
            for (point in s.params.breakpoints) {
                if (s.params.breakpoints.hasOwnProperty(point)) {
                    points.push(point)
                }
            }
            points.sort(function(a, b) {
                return parseInt(a, 10) > parseInt(b, 10)
            });
            for (var i = 0; i < points.length; i++) {
                point = points[i];
                if (point >= window.innerWidth && !breakpoint) {
                    breakpoint = point
                }
            }
            return breakpoint || 'max'
        }
        ;
        s.setBreakpoint = function() {
            var breakpoint = s.getActiveBreakpoint();
            if (breakpoint && s.currentBreakpoint !== breakpoint) {
                var breakPointsParams = breakpoint in s.params.breakpoints ? s.params.breakpoints[breakpoint] : s.originalParams;
                var needsReLoop = s.params.loop && (breakPointsParams.slidesPerView !== s.params.slidesPerView);
                for (var param in breakPointsParams) {
                    s.params[param] = breakPointsParams[param]
                }
                s.currentBreakpoint = breakpoint;
                if (needsReLoop && s.destroyLoop) {
                    s.reLoop(true)
                }
            }
        }
        ;
        if (s.params.breakpoints) {
            s.setBreakpoint()
        }
        s.container = $(container);
        if (s.container.length === 0)
            return;
        if (s.container.length > 1) {
            var swipers = [];
            s.container.each(function() {
                var container = this;
                swipers.push(new Swiper(this,params))
            });
            return swipers
        }
        s.container[0].swiper = s;
        s.container.data('swiper', s);
        s.classNames.push('swiper-container-' + s.params.direction);
        if (s.params.freeMode) {
            s.classNames.push('swiper-container-free-mode')
        }
        if (!s.support.flexbox) {
            s.classNames.push('swiper-container-no-flexbox');
            s.params.slidesPerColumn = 1
        }
        if (s.params.autoHeight) {
            s.classNames.push('swiper-container-autoheight')
        }
        if (s.params.parallax || s.params.watchSlidesVisibility) {
            s.params.watchSlidesProgress = true
        }
        if (['cube', 'coverflow', 'flip'].indexOf(s.params.effect) >= 0) {
            if (s.support.transforms3d) {
                s.params.watchSlidesProgress = true;
                s.classNames.push('swiper-container-3d')
            } else {
                s.params.effect = 'slide'
            }
        }
        if (s.params.effect !== 'slide') {
            s.classNames.push('swiper-container-' + s.params.effect)
        }
        if (s.params.effect === 'cube') {
            s.params.resistanceRatio = 0;
            s.params.slidesPerView = 1;
            s.params.slidesPerColumn = 1;
            s.params.slidesPerGroup = 1;
            s.params.centeredSlides = false;
            s.params.spaceBetween = 0;
            s.params.virtualTranslate = true;
            s.params.setWrapperSize = false
        }
        if (s.params.effect === 'fade' || s.params.effect === 'flip') {
            s.params.slidesPerView = 1;
            s.params.slidesPerColumn = 1;
            s.params.slidesPerGroup = 1;
            s.params.watchSlidesProgress = true;
            s.params.spaceBetween = 0;
            s.params.setWrapperSize = false;
            if (typeof initialVirtualTranslate === 'undefined') {
                s.params.virtualTranslate = true
            }
        }
        if (s.params.grabCursor && s.support.touch) {
            s.params.grabCursor = false
        }
        s.wrapper = s.container.children('.' + s.params.wrapperClass);
        if (s.params.pagination) {
            s.paginationContainer = $(s.params.pagination);
            if (s.params.uniqueNavElements && typeof s.params.pagination === 'string' && s.paginationContainer.length > 1 && s.container.find(s.params.pagination).length === 1) {
                s.paginationContainer = s.container.find(s.params.pagination)
            }
            if (s.params.paginationType === 'bullets' && s.params.paginationClickable) {
                s.paginationContainer.addClass('swiper-pagination-clickable')
            } else {
                s.params.paginationClickable = false
            }
            s.paginationContainer.addClass('swiper-pagination-' + s.params.paginationType)
        }
        if (s.params.nextButton || s.params.prevButton) {
            if (s.params.nextButton) {
                s.nextButton = $(s.params.nextButton);
                if (s.params.uniqueNavElements && typeof s.params.nextButton === 'string' && s.nextButton.length > 1 && s.container.find(s.params.nextButton).length === 1) {
                    s.nextButton = s.container.find(s.params.nextButton)
                }
            }
            if (s.params.prevButton) {
                s.prevButton = $(s.params.prevButton);
                if (s.params.uniqueNavElements && typeof s.params.prevButton === 'string' && s.prevButton.length > 1 && s.container.find(s.params.prevButton).length === 1) {
                    s.prevButton = s.container.find(s.params.prevButton)
                }
            }
        }
        s.isHorizontal = function() {
            return s.params.direction === 'horizontal'
        }
        ;
        s.rtl = s.isHorizontal() && (s.container[0].dir.toLowerCase() === 'rtl' || s.container.css('direction') === 'rtl');
        if (s.rtl) {
            s.classNames.push('swiper-container-rtl')
        }
        if (s.rtl) {
            s.wrongRTL = s.wrapper.css('display') === '-webkit-box'
        }
        if (s.params.slidesPerColumn > 1) {
            s.classNames.push('swiper-container-multirow')
        }
        if (s.device.android) {
            s.classNames.push('swiper-container-android')
        }
        s.container.addClass(s.classNames.join(' '));
        s.translate = 0;
        s.progress = 0;
        s.velocity = 0;
        s.lockSwipeToNext = function() {
            s.params.allowSwipeToNext = false
        }
        ;
        s.lockSwipeToPrev = function() {
            s.params.allowSwipeToPrev = false
        }
        ;
        s.lockSwipes = function() {
            s.params.allowSwipeToNext = s.params.allowSwipeToPrev = false
        }
        ;
        s.unlockSwipeToNext = function() {
            s.params.allowSwipeToNext = true
        }
        ;
        s.unlockSwipeToPrev = function() {
            s.params.allowSwipeToPrev = true
        }
        ;
        s.unlockSwipes = function() {
            s.params.allowSwipeToNext = s.params.allowSwipeToPrev = true
        }
        ;
        function round(a) {
            return Math.floor(a)
        }
        if (s.params.grabCursor) {
            s.container[0].style.cursor = 'move';
            s.container[0].style.cursor = '-webkit-grab';
            s.container[0].style.cursor = '-moz-grab';
            s.container[0].style.cursor = 'grab'
        }
        s.imagesToLoad = [];
        s.imagesLoaded = 0;
        s.loadImage = function(imgElement, src, srcset, checkForComplete, callback) {
            var image;
            function onReady() {
                if (callback)
                    callback()
            }
            if (!imgElement.complete || !checkForComplete) {
                if (src) {
                    image = new window.Image();
                    image.onload = onReady;
                    image.onerror = onReady;
                    if (srcset) {
                        image.srcset = srcset
                    }
                    if (src) {
                        image.src = src
                    }
                } else {
                    onReady()
                }
            } else {
                onReady()
            }
        }
        ;
        s.preloadImages = function() {
            s.imagesToLoad = s.container.find('img');
            function _onReady() {
                if (typeof s === 'undefined' || s === null)
                    return;
                if (s.imagesLoaded !== undefined)
                    s.imagesLoaded++;
                if (s.imagesLoaded === s.imagesToLoad.length) {
                    if (s.params.updateOnImagesReady)
                        s.update();
                    s.emit('onImagesReady', s)
                }
            }
            for (var i = 0; i < s.imagesToLoad.length; i++) {
                s.loadImage(s.imagesToLoad[i], (s.imagesToLoad[i].currentSrc || s.imagesToLoad[i].getAttribute('src')), (s.imagesToLoad[i].srcset || s.imagesToLoad[i].getAttribute('srcset')), true, _onReady)
            }
        }
        ;
        s.autoplayTimeoutId = undefined;
        s.autoplaying = false;
        s.autoplayPaused = false;
        function autoplay() {
            s.autoplayTimeoutId = setTimeout(function() {
                if (s.params.loop) {
                    s.fixLoop();
                    s._slideNext();
                    s.emit('onAutoplay', s)
                } else {
                    if (!s.isEnd) {
                        s._slideNext();
                        s.emit('onAutoplay', s)
                    } else {
                        if (!params.autoplayStopOnLast) {
                            s._slideTo(0);
                            s.emit('onAutoplay', s)
                        } else {
                            s.stopAutoplay()
                        }
                    }
                }
            }, s.params.autoplay)
        }
        s.startAutoplay = function() {
            if (typeof s.autoplayTimeoutId !== 'undefined')
                return false;
            if (!s.params.autoplay)
                return false;
            if (s.autoplaying)
                return false;
            s.autoplaying = true;
            s.emit('onAutoplayStart', s);
            autoplay()
        }
        ;
        s.stopAutoplay = function(internal) {
            if (!s.autoplayTimeoutId)
                return;
            if (s.autoplayTimeoutId)
                clearTimeout(s.autoplayTimeoutId);
            s.autoplaying = false;
            s.autoplayTimeoutId = undefined;
            s.emit('onAutoplayStop', s)
        }
        ;
        s.pauseAutoplay = function(speed) {
            if (s.autoplayPaused)
                return;
            if (s.autoplayTimeoutId)
                clearTimeout(s.autoplayTimeoutId);
            s.autoplayPaused = true;
            if (speed === 0) {
                s.autoplayPaused = false;
                autoplay()
            } else {
                s.wrapper.transitionEnd(function() {
                    if (!s)
                        return;
                    s.autoplayPaused = false;
                    if (!s.autoplaying) {
                        s.stopAutoplay()
                    } else {
                        autoplay()
                    }
                })
            }
        }
        ;
        s.minTranslate = function() {
            return (-s.snapGrid[0])
        }
        ;
        s.maxTranslate = function() {
            return (-s.snapGrid[s.snapGrid.length - 1])
        }
        ;
        s.updateAutoHeight = function() {
            var slide = s.slides.eq(s.activeIndex)[0];
            if (typeof slide !== 'undefined') {
                var newHeight = slide.offsetHeight;
                if (newHeight)
                    s.wrapper.css('height', newHeight + 'px')
            }
        }
        ;
        s.updateContainerSize = function() {
            var width, height;
            if (typeof s.params.width !== 'undefined') {
                width = s.params.width
            } else {
                width = s.container[0].clientWidth
            }
            if (typeof s.params.height !== 'undefined') {
                height = s.params.height
            } else {
                height = s.container[0].clientHeight
            }
            if (width === 0 && s.isHorizontal() || height === 0 && !s.isHorizontal()) {
                return
            }
            width = width - parseInt(s.container.css('padding-left'), 10) - parseInt(s.container.css('padding-right'), 10);
            height = height - parseInt(s.container.css('padding-top'), 10) - parseInt(s.container.css('padding-bottom'), 10);
            s.width = width;
            s.height = height;
            s.size = s.isHorizontal() ? s.width : s.height
        }
        ;
        s.updateSlidesSize = function() {
            s.slides = s.wrapper.children('.' + s.params.slideClass);
            s.snapGrid = [];
            s.slidesGrid = [];
            s.slidesSizesGrid = [];
            var spaceBetween = s.params.spaceBetween, slidePosition = -s.params.slidesOffsetBefore, i, prevSlideSize = 0, index = 0;
            if (typeof s.size === 'undefined')
                return;
            if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
                spaceBetween = parseFloat(spaceBetween.replace('%', '')) / 100 * s.size
            }
            s.virtualSize = -spaceBetween;
            if (s.rtl)
                s.slides.css({
                    marginLeft: '',
                    marginTop: ''
                });
            else
                s.slides.css({
                    marginRight: '',
                    marginBottom: ''
                });
            var slidesNumberEvenToRows;
            if (s.params.slidesPerColumn > 1) {
                if (Math.floor(s.slides.length / s.params.slidesPerColumn) === s.slides.length / s.params.slidesPerColumn) {
                    slidesNumberEvenToRows = s.slides.length
                } else {
                    slidesNumberEvenToRows = Math.ceil(s.slides.length / s.params.slidesPerColumn) * s.params.slidesPerColumn
                }
                if (s.params.slidesPerView !== 'auto' && s.params.slidesPerColumnFill === 'row') {
                    slidesNumberEvenToRows = Math.max(slidesNumberEvenToRows, s.params.slidesPerView * s.params.slidesPerColumn)
                }
            }
            var slideSize;
            var slidesPerColumn = s.params.slidesPerColumn;
            var slidesPerRow = slidesNumberEvenToRows / slidesPerColumn;
            var numFullColumns = slidesPerRow - (s.params.slidesPerColumn * slidesPerRow - s.slides.length);
            for (i = 0; i < s.slides.length; i++) {
                slideSize = 0;
                var slide = s.slides.eq(i);
                if (s.params.slidesPerColumn > 1) {
                    var newSlideOrderIndex;
                    var column, row;
                    if (s.params.slidesPerColumnFill === 'column') {
                        column = Math.floor(i / slidesPerColumn);
                        row = i - column * slidesPerColumn;
                        if (column > numFullColumns || (column === numFullColumns && row === slidesPerColumn - 1)) {
                            if (++row >= slidesPerColumn) {
                                row = 0;
                                column++
                            }
                        }
                        newSlideOrderIndex = column + row * slidesNumberEvenToRows / slidesPerColumn;
                        slide.css({
                            '-webkit-box-ordinal-group': newSlideOrderIndex,
                            '-moz-box-ordinal-group': newSlideOrderIndex,
                            '-ms-flex-order': newSlideOrderIndex,
                            '-webkit-order': newSlideOrderIndex,
                            'order': newSlideOrderIndex
                        })
                    } else {
                        row = Math.floor(i / slidesPerRow);
                        column = i - row * slidesPerRow
                    }
                    slide.css({
                        'margin-top': (row !== 0 && s.params.spaceBetween) && (s.params.spaceBetween + 'px')
                    }).attr('data-swiper-column', column).attr('data-swiper-row', row)
                }
                if (slide.css('display') === 'none')
                    continue;
                if (s.params.slidesPerView === 'auto') {
                    slideSize = s.isHorizontal() ? slide.outerWidth(true) : slide.outerHeight(true);
                    if (s.params.roundLengths)
                        slideSize = round(slideSize)
                } else {
                    slideSize = (s.size - (s.params.slidesPerView - 1) * spaceBetween) / s.params.slidesPerView;
                    if (s.params.roundLengths)
                        slideSize = round(slideSize);
                    if (s.isHorizontal()) {
                        s.slides[i].style.width = slideSize + 'px'
                    } else {
                        s.slides[i].style.height = slideSize + 'px'
                    }
                }
                s.slides[i].swiperSlideSize = slideSize;
                s.slidesSizesGrid.push(slideSize);
                if (s.params.centeredSlides) {
                    slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
                    if (i === 0)
                        slidePosition = slidePosition - s.size / 2 - spaceBetween;
                    if (Math.abs(slidePosition) < 1 / 1000)
                        slidePosition = 0;
                    if ((index) % s.params.slidesPerGroup === 0)
                        s.snapGrid.push(slidePosition);
                    s.slidesGrid.push(slidePosition)
                } else {
                    if ((index) % s.params.slidesPerGroup === 0)
                        s.snapGrid.push(slidePosition);
                    s.slidesGrid.push(slidePosition);
                    slidePosition = slidePosition + slideSize + spaceBetween
                }
                s.virtualSize += slideSize + spaceBetween;
                prevSlideSize = slideSize;
                index++
            }
            s.virtualSize = Math.max(s.virtualSize, s.size) + s.params.slidesOffsetAfter;
            var newSlidesGrid;
            if (s.rtl && s.wrongRTL && (s.params.effect === 'slide' || s.params.effect === 'coverflow')) {
                s.wrapper.css({
                    width: s.virtualSize + s.params.spaceBetween + 'px'
                })
            }
            if (!s.support.flexbox || s.params.setWrapperSize) {
                if (s.isHorizontal())
                    s.wrapper.css({
                        width: s.virtualSize + s.params.spaceBetween + 'px'
                    });
                else
                    s.wrapper.css({
                        height: s.virtualSize + s.params.spaceBetween + 'px'
                    })
            }
            if (s.params.slidesPerColumn > 1) {
                s.virtualSize = (slideSize + s.params.spaceBetween) * slidesNumberEvenToRows;
                s.virtualSize = Math.ceil(s.virtualSize / s.params.slidesPerColumn) - s.params.spaceBetween;
                s.wrapper.css({
                    width: s.virtualSize + s.params.spaceBetween + 'px'
                });
                if (s.params.centeredSlides) {
                    newSlidesGrid = [];
                    for (i = 0; i < s.snapGrid.length; i++) {
                        if (s.snapGrid[i] < s.virtualSize + s.snapGrid[0])
                            newSlidesGrid.push(s.snapGrid[i])
                    }
                    s.snapGrid = newSlidesGrid
                }
            }
            if (!s.params.centeredSlides) {
                newSlidesGrid = [];
                for (i = 0; i < s.snapGrid.length; i++) {
                    if (s.snapGrid[i] <= s.virtualSize - s.size) {
                        newSlidesGrid.push(s.snapGrid[i])
                    }
                }
                s.snapGrid = newSlidesGrid;
                if (Math.floor(s.virtualSize - s.size) - Math.floor(s.snapGrid[s.snapGrid.length - 1]) > 1) {
                    s.snapGrid.push(s.virtualSize - s.size)
                }
            }
            if (s.snapGrid.length === 0)
                s.snapGrid = [0];
            if (s.params.spaceBetween !== 0) {
                if (s.isHorizontal()) {
                    if (s.rtl)
                        s.slides.css({
                            marginLeft: spaceBetween + 'px'
                        });
                    else
                        s.slides.css({
                            marginRight: spaceBetween + 'px'
                        })
                } else
                    s.slides.css({
                        marginBottom: spaceBetween + 'px'
                    })
            }
            if (s.params.watchSlidesProgress) {
                s.updateSlidesOffset()
            }
        }
        ;
        s.updateSlidesOffset = function() {
            for (var i = 0; i < s.slides.length; i++) {
                s.slides[i].swiperSlideOffset = s.isHorizontal() ? s.slides[i].offsetLeft : s.slides[i].offsetTop
            }
        }
        ;
        s.updateSlidesProgress = function(translate) {
            if (typeof translate === 'undefined') {
                translate = s.translate || 0
            }
            if (s.slides.length === 0)
                return;
            if (typeof s.slides[0].swiperSlideOffset === 'undefined')
                s.updateSlidesOffset();
            var offsetCenter = -translate;
            if (s.rtl)
                offsetCenter = translate;
            s.slides.removeClass(s.params.slideVisibleClass);
            for (var i = 0; i < s.slides.length; i++) {
                var slide = s.slides[i];
                var slideProgress = (offsetCenter - slide.swiperSlideOffset) / (slide.swiperSlideSize + s.params.spaceBetween);
                if (s.params.watchSlidesVisibility) {
                    var slideBefore = -(offsetCenter - slide.swiperSlideOffset);
                    var slideAfter = slideBefore + s.slidesSizesGrid[i];
                    var isVisible = (slideBefore >= 0 && slideBefore < s.size) || (slideAfter > 0 && slideAfter <= s.size) || (slideBefore <= 0 && slideAfter >= s.size);
                    if (isVisible) {
                        s.slides.eq(i).addClass(s.params.slideVisibleClass)
                    }
                }
                slide.progress = s.rtl ? -slideProgress : slideProgress
            }
        }
        ;
        s.updateProgress = function(translate) {
            if (typeof translate === 'undefined') {
                translate = s.translate || 0
            }
            var translatesDiff = s.maxTranslate() - s.minTranslate();
            var wasBeginning = s.isBeginning;
            var wasEnd = s.isEnd;
            if (translatesDiff === 0) {
                s.progress = 0;
                s.isBeginning = s.isEnd = true
            } else {
                s.progress = (translate - s.minTranslate()) / (translatesDiff);
                s.isBeginning = s.progress <= 0;
                s.isEnd = s.progress >= 1
            }
            if (s.isBeginning && !wasBeginning)
                s.emit('onReachBeginning', s);
            if (s.isEnd && !wasEnd)
                s.emit('onReachEnd', s);
            if (s.params.watchSlidesProgress)
                s.updateSlidesProgress(translate);
            s.emit('onProgress', s, s.progress)
        }
        ;
        s.updateActiveIndex = function() {
            var translate = s.rtl ? s.translate : -s.translate;
            var newActiveIndex, i, snapIndex;
            for (i = 0; i < s.slidesGrid.length; i++) {
                if (typeof s.slidesGrid[i + 1] !== 'undefined') {
                    if (translate >= s.slidesGrid[i] && translate < s.slidesGrid[i + 1] - (s.slidesGrid[i + 1] - s.slidesGrid[i]) / 2) {
                        newActiveIndex = i
                    } else if (translate >= s.slidesGrid[i] && translate < s.slidesGrid[i + 1]) {
                        newActiveIndex = i + 1
                    }
                } else {
                    if (translate >= s.slidesGrid[i]) {
                        newActiveIndex = i
                    }
                }
            }
            if (newActiveIndex < 0 || typeof newActiveIndex === 'undefined')
                newActiveIndex = 0;
            snapIndex = Math.floor(newActiveIndex / s.params.slidesPerGroup);
            if (snapIndex >= s.snapGrid.length)
                snapIndex = s.snapGrid.length - 1;
            if (newActiveIndex === s.activeIndex) {
                return
            }
            s.snapIndex = snapIndex;
            s.previousIndex = s.activeIndex;
            s.activeIndex = newActiveIndex;
            s.updateClasses()
        }
        ;
        s.updateClasses = function() {
            s.slides.removeClass(s.params.slideActiveClass + ' ' + s.params.slideNextClass + ' ' + s.params.slidePrevClass);
            var activeSlide = s.slides.eq(s.activeIndex);
            activeSlide.addClass(s.params.slideActiveClass);
            var nextSlide = activeSlide.next('.' + s.params.slideClass).addClass(s.params.slideNextClass);
            if (s.params.loop && nextSlide.length === 0) {
                s.slides.eq(0).addClass(s.params.slideNextClass)
            }
            var prevSlide = activeSlide.prev('.' + s.params.slideClass).addClass(s.params.slidePrevClass);
            if (s.params.loop && prevSlide.length === 0) {
                s.slides.eq(-1).addClass(s.params.slidePrevClass)
            }
            if (s.paginationContainer && s.paginationContainer.length > 0) {
                var current, total = s.params.loop ? Math.ceil((s.slides.length - s.loopedSlides * 2) / s.params.slidesPerGroup) : s.snapGrid.length;
                if (s.params.loop) {
                    current = Math.ceil((s.activeIndex - s.loopedSlides) / s.params.slidesPerGroup);
                    if (current > s.slides.length - 1 - s.loopedSlides * 2) {
                        current = current - (s.slides.length - s.loopedSlides * 2)
                    }
                    if (current > total - 1)
                        current = current - total;
                    if (current < 0 && s.params.paginationType !== 'bullets')
                        current = total + current
                } else {
                    if (typeof s.snapIndex !== 'undefined') {
                        current = s.snapIndex
                    } else {
                        current = s.activeIndex || 0
                    }
                }
                if (s.params.paginationType === 'bullets' && s.bullets && s.bullets.length > 0) {
                    s.bullets.removeClass(s.params.bulletActiveClass);
                    if (s.paginationContainer.length > 1) {
                        s.bullets.each(function() {
                            if ($(this).index() === current)
                                $(this).addClass(s.params.bulletActiveClass)
                        })
                    } else {
                        s.bullets.eq(current).addClass(s.params.bulletActiveClass)
                    }
                }
                if (s.params.paginationType === 'fraction') {
                    s.paginationContainer.find('.' + s.params.paginationCurrentClass).text(current + 1);
                    s.paginationContainer.find('.' + s.params.paginationTotalClass).text(total)
                }
                if (s.params.paginationType === 'progress') {
                    var scale = (current + 1) / total
                      , scaleX = scale
                      , scaleY = 1;
                    if (!s.isHorizontal()) {
                        scaleY = scale;
                        scaleX = 1
                    }
                    s.paginationContainer.find('.' + s.params.paginationProgressbarClass).transform('translate3d(0,0,0) scaleX(' + scaleX + ') scaleY(' + scaleY + ')').transition(s.params.speed)
                }
                if (s.params.paginationType === 'custom' && s.params.paginationCustomRender) {
                    s.paginationContainer.html(s.params.paginationCustomRender(s, current + 1, total));
                    s.emit('onPaginationRendered', s, s.paginationContainer[0])
                }
            }
            if (!s.params.loop) {
                if (s.params.prevButton && s.prevButton && s.prevButton.length > 0) {
                    if (s.isBeginning) {
                        s.prevButton.addClass(s.params.buttonDisabledClass);
                        if (s.params.a11y && s.a11y)
                            s.a11y.disable(s.prevButton)
                    } else {
                        s.prevButton.removeClass(s.params.buttonDisabledClass);
                        if (s.params.a11y && s.a11y)
                            s.a11y.enable(s.prevButton)
                    }
                }
                if (s.params.nextButton && s.nextButton && s.nextButton.length > 0) {
                    if (s.isEnd) {
                        s.nextButton.addClass(s.params.buttonDisabledClass);
                        if (s.params.a11y && s.a11y)
                            s.a11y.disable(s.nextButton)
                    } else {
                        s.nextButton.removeClass(s.params.buttonDisabledClass);
                        if (s.params.a11y && s.a11y)
                            s.a11y.enable(s.nextButton)
                    }
                }
            }
        }
        ;
        s.updatePagination = function() {
            if (!s.params.pagination)
                return;
            if (s.paginationContainer && s.paginationContainer.length > 0) {
                var paginationHTML = '';
                if (s.params.paginationType === 'bullets') {
                    var numberOfBullets = s.params.loop ? Math.ceil((s.slides.length - s.loopedSlides * 2) / s.params.slidesPerGroup) : s.snapGrid.length;
                    for (var i = 0; i < numberOfBullets; i++) {
                        if (s.params.paginationBulletRender) {
                            paginationHTML += s.params.paginationBulletRender(i, s.params.bulletClass)
                        } else {
                            paginationHTML += '<' + s.params.paginationElement + ' class="' + s.params.bulletClass + '"></' + s.params.paginationElement + '>'
                        }
                    }
                    s.paginationContainer.html(paginationHTML);
                    s.bullets = s.paginationContainer.find('.' + s.params.bulletClass);
                    if (s.params.paginationClickable && s.params.a11y && s.a11y) {
                        s.a11y.initPagination()
                    }
                }
                if (s.params.paginationType === 'fraction') {
                    if (s.params.paginationFractionRender) {
                        paginationHTML = s.params.paginationFractionRender(s, s.params.paginationCurrentClass, s.params.paginationTotalClass)
                    } else {
                        paginationHTML = '<span class="' + s.params.paginationCurrentClass + '"></span> / <span class="' + s.params.paginationTotalClass + '"></span>'
                    }
                    s.paginationContainer.html(paginationHTML)
                }
                if (s.params.paginationType === 'progress') {
                    if (s.params.paginationProgressRender) {
                        paginationHTML = s.params.paginationProgressRender(s, s.params.paginationProgressbarClass)
                    } else {
                        paginationHTML = '<span class="' + s.params.paginationProgressbarClass + '"></span>'
                    }
                    s.paginationContainer.html(paginationHTML)
                }
                if (s.params.paginationType !== 'custom') {
                    s.emit('onPaginationRendered', s, s.paginationContainer[0])
                }
            }
        }
        ;
        s.update = function(updateTranslate) {
            s.updateContainerSize();
            s.updateSlidesSize();
            s.updateProgress();
            s.updatePagination();
            s.updateClasses();
            if (s.params.scrollbar && s.scrollbar) {
                s.scrollbar.set()
            }
            function forceSetTranslate() {
                newTranslate = Math.min(Math.max(s.translate, s.maxTranslate()), s.minTranslate());
                s.setWrapperTranslate(newTranslate);
                s.updateActiveIndex();
                s.updateClasses()
            }
            if (updateTranslate) {
                var translated, newTranslate;
                if (s.controller && s.controller.spline) {
                    s.controller.spline = undefined
                }
                if (s.params.freeMode) {
                    forceSetTranslate();
                    if (s.params.autoHeight) {
                        s.updateAutoHeight()
                    }
                } else {
                    if ((s.params.slidesPerView === 'auto' || s.params.slidesPerView > 1) && s.isEnd && !s.params.centeredSlides) {
                        translated = s.slideTo(s.slides.length - 1, 0, false, true)
                    } else {
                        translated = s.slideTo(s.activeIndex, 0, false, true)
                    }
                    if (!translated) {
                        forceSetTranslate()
                    }
                }
            } else if (s.params.autoHeight) {
                s.updateAutoHeight()
            }
        }
        ;
        s.onResize = function(forceUpdatePagination) {
            if (s.params.breakpoints) {
                s.setBreakpoint()
            }
            var allowSwipeToPrev = s.params.allowSwipeToPrev;
            var allowSwipeToNext = s.params.allowSwipeToNext;
            s.params.allowSwipeToPrev = s.params.allowSwipeToNext = true;
            s.updateContainerSize();
            s.updateSlidesSize();
            if (s.params.slidesPerView === 'auto' || s.params.freeMode || forceUpdatePagination)
                s.updatePagination();
            if (s.params.scrollbar && s.scrollbar) {
                s.scrollbar.set()
            }
            if (s.controller && s.controller.spline) {
                s.controller.spline = undefined
            }
            var slideChangedBySlideTo = false;
            if (s.params.freeMode) {
                var newTranslate = Math.min(Math.max(s.translate, s.maxTranslate()), s.minTranslate());
                s.setWrapperTranslate(newTranslate);
                s.updateActiveIndex();
                s.updateClasses();
                if (s.params.autoHeight) {
                    s.updateAutoHeight()
                }
            } else {
                s.updateClasses();
                if ((s.params.slidesPerView === 'auto' || s.params.slidesPerView > 1) && s.isEnd && !s.params.centeredSlides) {
                    slideChangedBySlideTo = s.slideTo(s.slides.length - 1, 0, false, true)
                } else {
                    slideChangedBySlideTo = s.slideTo(s.activeIndex, 0, false, true)
                }
            }
            if (s.params.lazyLoading && !slideChangedBySlideTo && s.lazy) {
                s.lazy.load()
            }
            s.params.allowSwipeToPrev = allowSwipeToPrev;
            s.params.allowSwipeToNext = allowSwipeToNext
        }
        ;
        var desktopEvents = ['mousedown', 'mousemove', 'mouseup'];
        if (window.navigator.pointerEnabled)
            desktopEvents = ['pointerdown', 'pointermove', 'pointerup'];
        else if (window.navigator.msPointerEnabled)
            desktopEvents = ['MSPointerDown', 'MSPointerMove', 'MSPointerUp'];
        s.touchEvents = {
            start: s.support.touch || !s.params.simulateTouch ? 'touchstart' : desktopEvents[0],
            move: s.support.touch || !s.params.simulateTouch ? 'touchmove' : desktopEvents[1],
            end: s.support.touch || !s.params.simulateTouch ? 'touchend' : desktopEvents[2]
        };
        if (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) {
            (s.params.touchEventsTarget === 'container' ? s.container : s.wrapper).addClass('swiper-wp8-' + s.params.direction)
        }
        s.initEvents = function(detach) {
            var actionDom = detach ? 'off' : 'on';
            var action = detach ? 'removeEventListener' : 'addEventListener';
            var touchEventsTarget = s.params.touchEventsTarget === 'container' ? s.container[0] : s.wrapper[0];
            var target = s.support.touch ? touchEventsTarget : document;
            var moveCapture = s.params.nested ? true : false;
            if (s.browser.ie) {
                touchEventsTarget[action](s.touchEvents.start, s.onTouchStart, false);
                target[action](s.touchEvents.move, s.onTouchMove, moveCapture);
                target[action](s.touchEvents.end, s.onTouchEnd, false)
            } else {
                if (s.support.touch) {
                    touchEventsTarget[action](s.touchEvents.start, s.onTouchStart, false);
                    touchEventsTarget[action](s.touchEvents.move, s.onTouchMove, moveCapture);
                    touchEventsTarget[action](s.touchEvents.end, s.onTouchEnd, false)
                }
                if (params.simulateTouch && !s.device.ios && !s.device.android) {
                    touchEventsTarget[action]('mousedown', s.onTouchStart, false);
                    document[action]('mousemove', s.onTouchMove, moveCapture);
                    document[action]('mouseup', s.onTouchEnd, false)
                }
            }
            window[action]('resize', s.onResize);
            if (s.params.nextButton && s.nextButton && s.nextButton.length > 0) {
                s.nextButton[actionDom]('click', s.onClickNext);
                if (s.params.a11y && s.a11y)
                    s.nextButton[actionDom]('keydown', s.a11y.onEnterKey)
            }
            if (s.params.prevButton && s.prevButton && s.prevButton.length > 0) {
                s.prevButton[actionDom]('click', s.onClickPrev);
                if (s.params.a11y && s.a11y)
                    s.prevButton[actionDom]('keydown', s.a11y.onEnterKey)
            }
            if (s.params.pagination && s.params.paginationClickable) {
                s.paginationContainer[actionDom]('click', '.' + s.params.bulletClass, s.onClickIndex);
                if (s.params.a11y && s.a11y)
                    s.paginationContainer[actionDom]('keydown', '.' + s.params.bulletClass, s.a11y.onEnterKey)
            }
            if (s.params.preventClicks || s.params.preventClicksPropagation)
                touchEventsTarget[action]('click', s.preventClicks, true)
        }
        ;
        s.attachEvents = function() {
            s.initEvents()
        }
        ;
        s.detachEvents = function() {
            s.initEvents(true)
        }
        ;
        s.allowClick = true;
        s.preventClicks = function(e) {
            if (!s.allowClick) {
                if (s.params.preventClicks)
                    e.preventDefault();
                if (s.params.preventClicksPropagation && s.animating) {
                    e.stopPropagation();
                    e.stopImmediatePropagation()
                }
            }
        }
        ;
        s.onClickNext = function(e) {
            e.preventDefault();
            if (s.isEnd && !s.params.loop)
                return;
            s.slideNext()
        }
        ;
        s.onClickPrev = function(e) {
            e.preventDefault();
            if (s.isBeginning && !s.params.loop)
                return;
            s.slidePrev()
        }
        ;
        s.onClickIndex = function(e) {
            e.preventDefault();
            var index = $(this).index() * s.params.slidesPerGroup;
            if (s.params.loop)
                index = index + s.loopedSlides;
            s.slideTo(index)
        }
        ;
        function findElementInEvent(e, selector) {
            var el = $(e.target);
            if (!el.is(selector)) {
                if (typeof selector === 'string') {
                    el = el.parents(selector)
                } else if (selector.nodeType) {
                    var found;
                    el.parents().each(function(index, _el) {
                        if (_el === selector)
                            found = selector
                    });
                    if (!found)
                        return undefined;
                    else
                        return selector
                }
            }
            if (el.length === 0) {
                return undefined
            }
            return el[0]
        }
        s.updateClickedSlide = function(e) {
            var slide = findElementInEvent(e, '.' + s.params.slideClass);
            var slideFound = false;
            if (slide) {
                for (var i = 0; i < s.slides.length; i++) {
                    if (s.slides[i] === slide)
                        slideFound = true
                }
            }
            if (slide && slideFound) {
                s.clickedSlide = slide;
                s.clickedIndex = $(slide).index()
            } else {
                s.clickedSlide = undefined;
                s.clickedIndex = undefined;
                return
            }
            if (s.params.slideToClickedSlide && s.clickedIndex !== undefined && s.clickedIndex !== s.activeIndex) {
                var slideToIndex = s.clickedIndex, realIndex, duplicatedSlides;
                if (s.params.loop) {
                    if (s.animating)
                        return;
                    realIndex = $(s.clickedSlide).attr('data-swiper-slide-index');
                    if (s.params.centeredSlides) {
                        if ((slideToIndex < s.loopedSlides - s.params.slidesPerView / 2) || (slideToIndex > s.slides.length - s.loopedSlides + s.params.slidesPerView / 2)) {
                            s.fixLoop();
                            slideToIndex = s.wrapper.children('.' + s.params.slideClass + '[data-swiper-slide-index="' + realIndex + '"]:not(.swiper-slide-duplicate)').eq(0).index();
                            setTimeout(function() {
                                s.slideTo(slideToIndex)
                            }, 0)
                        } else {
                            s.slideTo(slideToIndex)
                        }
                    } else {
                        if (slideToIndex > s.slides.length - s.params.slidesPerView) {
                            s.fixLoop();
                            slideToIndex = s.wrapper.children('.' + s.params.slideClass + '[data-swiper-slide-index="' + realIndex + '"]:not(.swiper-slide-duplicate)').eq(0).index();
                            setTimeout(function() {
                                s.slideTo(slideToIndex)
                            }, 0)
                        } else {
                            s.slideTo(slideToIndex)
                        }
                    }
                } else {
                    s.slideTo(slideToIndex)
                }
            }
        }
        ;
        var isTouched, isMoved, allowTouchCallbacks, touchStartTime, isScrolling, currentTranslate, startTranslate, allowThresholdMove, formElements = 'input, select, textarea, button', lastClickTime = Date.now(), clickTimeout, velocities = [], allowMomentumBounce;
        s.animating = false;
        s.touches = {
            startX: 0,
            startY: 0,
            currentX: 0,
            currentY: 0,
            diff: 0
        };
        var isTouchEvent, startMoving;
        s.onTouchStart = function(e) {
            if (e.originalEvent)
                e = e.originalEvent;
            isTouchEvent = e.type === 'touchstart';
            if (!isTouchEvent && 'which'in e && e.which === 3)
                return;
            if (s.params.noSwiping && findElementInEvent(e, '.' + s.params.noSwipingClass)) {
                s.allowClick = true;
                return
            }
            if (s.params.swipeHandler) {
                if (!findElementInEvent(e, s.params.swipeHandler))
                    return
            }
            var startX = s.touches.currentX = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
            var startY = s.touches.currentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
            if (s.device.ios && s.params.iOSEdgeSwipeDetection && startX <= s.params.iOSEdgeSwipeThreshold) {
                return
            }
            isTouched = true;
            isMoved = false;
            allowTouchCallbacks = true;
            isScrolling = undefined;
            startMoving = undefined;
            s.touches.startX = startX;
            s.touches.startY = startY;
            touchStartTime = Date.now();
            s.allowClick = true;
            s.updateContainerSize();
            s.swipeDirection = undefined;
            if (s.params.threshold > 0)
                allowThresholdMove = false;
            if (e.type !== 'touchstart') {
                var preventDefault = true;
                if ($(e.target).is(formElements))
                    preventDefault = false;
                if (document.activeElement && $(document.activeElement).is(formElements)) {
                    document.activeElement.blur()
                }
                if (preventDefault) {
                    e.preventDefault()
                }
            }
            s.emit('onTouchStart', s, e)
        }
        ;
        s.onTouchMove = function(e) {
            if (e.originalEvent)
                e = e.originalEvent;
            if (isTouchEvent && e.type === 'mousemove')
                return;
            if (e.preventedByNestedSwiper) {
                s.touches.startX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
                s.touches.startY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
                return
            }
            if (s.params.onlyExternal) {
                s.allowClick = false;
                if (isTouched) {
                    s.touches.startX = s.touches.currentX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
                    s.touches.startY = s.touches.currentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
                    touchStartTime = Date.now()
                }
                return
            }
            if (isTouchEvent && document.activeElement) {
                if (e.target === document.activeElement && $(e.target).is(formElements)) {
                    isMoved = true;
                    s.allowClick = false;
                    return
                }
            }
            if (allowTouchCallbacks) {
                s.emit('onTouchMove', s, e)
            }
            if (e.targetTouches && e.targetTouches.length > 1)
                return;
            s.touches.currentX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
            s.touches.currentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
            if (typeof isScrolling === 'undefined') {
                var touchAngle = Math.atan2(Math.abs(s.touches.currentY - s.touches.startY), Math.abs(s.touches.currentX - s.touches.startX)) * 180 / Math.PI;
                isScrolling = s.isHorizontal() ? touchAngle > s.params.touchAngle : (90 - touchAngle > s.params.touchAngle)
            }
            if (isScrolling) {
                s.emit('onTouchMoveOpposite', s, e)
            }
            if (typeof startMoving === 'undefined' && s.browser.ieTouch) {
                if (s.touches.currentX !== s.touches.startX || s.touches.currentY !== s.touches.startY) {
                    startMoving = true
                }
            }
            if (!isTouched)
                return;
            if (isScrolling) {
                isTouched = false;
                return
            }
            if (!startMoving && s.browser.ieTouch) {
                return
            }
            s.allowClick = false;
            s.emit('onSliderMove', s, e);
            e.preventDefault();
            if (s.params.touchMoveStopPropagation && !s.params.nested) {
                e.stopPropagation()
            }
            if (!isMoved) {
                if (params.loop) {
                    s.fixLoop()
                }
                startTranslate = s.getWrapperTranslate();
                s.setWrapperTransition(0);
                if (s.animating) {
                    s.wrapper.trigger('webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd')
                }
                if (s.params.autoplay && s.autoplaying) {
                    if (s.params.autoplayDisableOnInteraction) {
                        s.stopAutoplay()
                    } else {
                        s.pauseAutoplay()
                    }
                }
                allowMomentumBounce = false;
                if (s.params.grabCursor) {
                    s.container[0].style.cursor = 'move';
                    s.container[0].style.cursor = '-webkit-grabbing';
                    s.container[0].style.cursor = '-moz-grabbin';
                    s.container[0].style.cursor = 'grabbing'
                }
            }
            isMoved = true;
            var diff = s.touches.diff = s.isHorizontal() ? s.touches.currentX - s.touches.startX : s.touches.currentY - s.touches.startY;
            diff = diff * s.params.touchRatio;
            if (s.rtl)
                diff = -diff;
            s.swipeDirection = diff > 0 ? 'prev' : 'next';
            currentTranslate = diff + startTranslate;
            var disableParentSwiper = true;
            if ((diff > 0 && currentTranslate > s.minTranslate())) {
                disableParentSwiper = false;
                if (s.params.resistance)
                    currentTranslate = s.minTranslate() - 1 + Math.pow(-s.minTranslate() + startTranslate + diff, s.params.resistanceRatio)
            } else if (diff < 0 && currentTranslate < s.maxTranslate()) {
                disableParentSwiper = false;
                if (s.params.resistance)
                    currentTranslate = s.maxTranslate() + 1 - Math.pow(s.maxTranslate() - startTranslate - diff, s.params.resistanceRatio)
            }
            if (disableParentSwiper) {
                e.preventedByNestedSwiper = true
            }
            if (!s.params.allowSwipeToNext && s.swipeDirection === 'next' && currentTranslate < startTranslate) {
                currentTranslate = startTranslate
            }
            if (!s.params.allowSwipeToPrev && s.swipeDirection === 'prev' && currentTranslate > startTranslate) {
                currentTranslate = startTranslate
            }
            if (!s.params.followFinger)
                return;
            if (s.params.threshold > 0) {
                if (Math.abs(diff) > s.params.threshold || allowThresholdMove) {
                    if (!allowThresholdMove) {
                        allowThresholdMove = true;
                        s.touches.startX = s.touches.currentX;
                        s.touches.startY = s.touches.currentY;
                        currentTranslate = startTranslate;
                        s.touches.diff = s.isHorizontal() ? s.touches.currentX - s.touches.startX : s.touches.currentY - s.touches.startY;
                        return
                    }
                } else {
                    currentTranslate = startTranslate;
                    return
                }
            }
            if (s.params.freeMode || s.params.watchSlidesProgress) {
                s.updateActiveIndex()
            }
            if (s.params.freeMode) {
                if (velocities.length === 0) {
                    velocities.push({
                        position: s.touches[s.isHorizontal() ? 'startX' : 'startY'],
                        time: touchStartTime
                    })
                }
                velocities.push({
                    position: s.touches[s.isHorizontal() ? 'currentX' : 'currentY'],
                    time: (new window.Date()).getTime()
                })
            }
            s.updateProgress(currentTranslate);
            s.setWrapperTranslate(currentTranslate)
        }
        ;
        s.onTouchEnd = function(e) {
            if (e.originalEvent)
                e = e.originalEvent;
            if (allowTouchCallbacks) {
                s.emit('onTouchEnd', s, e)
            }
            allowTouchCallbacks = false;
            if (!isTouched)
                return;
            if (s.params.grabCursor && isMoved && isTouched) {
                s.container[0].style.cursor = 'move';
                s.container[0].style.cursor = '-webkit-grab';
                s.container[0].style.cursor = '-moz-grab';
                s.container[0].style.cursor = 'grab'
            }
            var touchEndTime = Date.now();
            var timeDiff = touchEndTime - touchStartTime;
            if (s.allowClick) {
                s.updateClickedSlide(e);
                s.emit('onTap', s, e);
                if (timeDiff < 300 && (touchEndTime - lastClickTime) > 300) {
                    if (clickTimeout)
                        clearTimeout(clickTimeout);
                    clickTimeout = setTimeout(function() {
                        if (!s)
                            return;
                        if (s.params.paginationHide && s.paginationContainer.length > 0 && !$(e.target).hasClass(s.params.bulletClass)) {
                            s.paginationContainer.toggleClass(s.params.paginationHiddenClass)
                        }
                        s.emit('onClick', s, e)
                    }, 300)
                }
                if (timeDiff < 300 && (touchEndTime - lastClickTime) < 300) {
                    if (clickTimeout)
                        clearTimeout(clickTimeout);
                    s.emit('onDoubleTap', s, e)
                }
            }
            lastClickTime = Date.now();
            setTimeout(function() {
                if (s)
                    s.allowClick = true
            }, 0);
            if (!isTouched || !isMoved || !s.swipeDirection || s.touches.diff === 0 || currentTranslate === startTranslate) {
                isTouched = isMoved = false;
                return
            }
            isTouched = isMoved = false;
            var currentPos;
            if (s.params.followFinger) {
                currentPos = s.rtl ? s.translate : -s.translate
            } else {
                currentPos = -currentTranslate
            }
            if (s.params.freeMode) {
                if (currentPos < -s.minTranslate()) {
                    s.slideTo(s.activeIndex);
                    return
                } else if (currentPos > -s.maxTranslate()) {
                    if (s.slides.length < s.snapGrid.length) {
                        s.slideTo(s.snapGrid.length - 1)
                    } else {
                        s.slideTo(s.slides.length - 1)
                    }
                    return
                }
                if (s.params.freeModeMomentum) {
                    if (velocities.length > 1) {
                        var lastMoveEvent = velocities.pop()
                          , velocityEvent = velocities.pop();
                        var distance = lastMoveEvent.position - velocityEvent.position;
                        var time = lastMoveEvent.time - velocityEvent.time;
                        s.velocity = distance / time;
                        s.velocity = s.velocity / 2;
                        if (Math.abs(s.velocity) < s.params.freeModeMinimumVelocity) {
                            s.velocity = 0
                        }
                        if (time > 150 || (new window.Date().getTime() - lastMoveEvent.time) > 300) {
                            s.velocity = 0
                        }
                    } else {
                        s.velocity = 0
                    }
                    velocities.length = 0;
                    var momentumDuration = 1000 * s.params.freeModeMomentumRatio;
                    var momentumDistance = s.velocity * momentumDuration;
                    var newPosition = s.translate + momentumDistance;
                    if (s.rtl)
                        newPosition = -newPosition;
                    var doBounce = false;
                    var afterBouncePosition;
                    var bounceAmount = Math.abs(s.velocity) * 20 * s.params.freeModeMomentumBounceRatio;
                    if (newPosition < s.maxTranslate()) {
                        if (s.params.freeModeMomentumBounce) {
                            if (newPosition + s.maxTranslate() < -bounceAmount) {
                                newPosition = s.maxTranslate() - bounceAmount
                            }
                            afterBouncePosition = s.maxTranslate();
                            doBounce = true;
                            allowMomentumBounce = true
                        } else {
                            newPosition = s.maxTranslate()
                        }
                    } else if (newPosition > s.minTranslate()) {
                        if (s.params.freeModeMomentumBounce) {
                            if (newPosition - s.minTranslate() > bounceAmount) {
                                newPosition = s.minTranslate() + bounceAmount
                            }
                            afterBouncePosition = s.minTranslate();
                            doBounce = true;
                            allowMomentumBounce = true
                        } else {
                            newPosition = s.minTranslate()
                        }
                    } else if (s.params.freeModeSticky) {
                        var j = 0, nextSlide;
                        for (j = 0; j < s.snapGrid.length; j += 1) {
                            if (s.snapGrid[j] > -newPosition) {
                                nextSlide = j;
                                break
                            }
                        }
                        if (Math.abs(s.snapGrid[nextSlide] - newPosition) < Math.abs(s.snapGrid[nextSlide - 1] - newPosition) || s.swipeDirection === 'next') {
                            newPosition = s.snapGrid[nextSlide]
                        } else {
                            newPosition = s.snapGrid[nextSlide - 1]
                        }
                        if (!s.rtl)
                            newPosition = -newPosition
                    }
                    if (s.velocity !== 0) {
                        if (s.rtl) {
                            momentumDuration = Math.abs((-newPosition - s.translate) / s.velocity)
                        } else {
                            momentumDuration = Math.abs((newPosition - s.translate) / s.velocity)
                        }
                    } else if (s.params.freeModeSticky) {
                        s.slideReset();
                        return
                    }
                    if (s.params.freeModeMomentumBounce && doBounce) {
                        s.updateProgress(afterBouncePosition);
                        s.setWrapperTransition(momentumDuration);
                        s.setWrapperTranslate(newPosition);
                        s.onTransitionStart();
                        s.animating = true;
                        s.wrapper.transitionEnd(function() {
                            if (!s || !allowMomentumBounce)
                                return;
                            s.emit('onMomentumBounce', s);
                            s.setWrapperTransition(s.params.speed);
                            s.setWrapperTranslate(afterBouncePosition);
                            s.wrapper.transitionEnd(function() {
                                if (!s)
                                    return;
                                s.onTransitionEnd()
                            })
                        })
                    } else if (s.velocity) {
                        s.updateProgress(newPosition);
                        s.setWrapperTransition(momentumDuration);
                        s.setWrapperTranslate(newPosition);
                        s.onTransitionStart();
                        if (!s.animating) {
                            s.animating = true;
                            s.wrapper.transitionEnd(function() {
                                if (!s)
                                    return;
                                s.onTransitionEnd()
                            })
                        }
                    } else {
                        s.updateProgress(newPosition)
                    }
                    s.updateActiveIndex()
                }
                if (!s.params.freeModeMomentum || timeDiff >= s.params.longSwipesMs) {
                    s.updateProgress();
                    s.updateActiveIndex()
                }
                return
            }
            var i, stopIndex = 0, groupSize = s.slidesSizesGrid[0];
            for (i = 0; i < s.slidesGrid.length; i += s.params.slidesPerGroup) {
                if (typeof s.slidesGrid[i + s.params.slidesPerGroup] !== 'undefined') {
                    if (currentPos >= s.slidesGrid[i] && currentPos < s.slidesGrid[i + s.params.slidesPerGroup]) {
                        stopIndex = i;
                        groupSize = s.slidesGrid[i + s.params.slidesPerGroup] - s.slidesGrid[i]
                    }
                } else {
                    if (currentPos >= s.slidesGrid[i]) {
                        stopIndex = i;
                        groupSize = s.slidesGrid[s.slidesGrid.length - 1] - s.slidesGrid[s.slidesGrid.length - 2]
                    }
                }
            }
            var ratio = (currentPos - s.slidesGrid[stopIndex]) / groupSize;
            if (timeDiff > s.params.longSwipesMs) {
                if (!s.params.longSwipes) {
                    s.slideTo(s.activeIndex);
                    return
                }
                if (s.swipeDirection === 'next') {
                    if (ratio >= s.params.longSwipesRatio)
                        s.slideTo(stopIndex + s.params.slidesPerGroup);
                    else
                        s.slideTo(stopIndex)
                }
                if (s.swipeDirection === 'prev') {
                    if (ratio > (1 - s.params.longSwipesRatio))
                        s.slideTo(stopIndex + s.params.slidesPerGroup);
                    else
                        s.slideTo(stopIndex)
                }
            } else {
                if (!s.params.shortSwipes) {
                    s.slideTo(s.activeIndex);
                    return
                }
                if (s.swipeDirection === 'next') {
                    s.slideTo(stopIndex + s.params.slidesPerGroup)
                }
                if (s.swipeDirection === 'prev') {
                    s.slideTo(stopIndex)
                }
            }
        }
        ;
        s._slideTo = function(slideIndex, speed) {
            return s.slideTo(slideIndex, speed, true, true)
        }
        ;
        s.slideTo = function(slideIndex, speed, runCallbacks, internal) {
            if (typeof runCallbacks === 'undefined')
                runCallbacks = true;
            if (typeof slideIndex === 'undefined')
                slideIndex = 0;
            if (slideIndex < 0)
                slideIndex = 0;
            s.snapIndex = Math.floor(slideIndex / s.params.slidesPerGroup);
            if (s.snapIndex >= s.snapGrid.length)
                s.snapIndex = s.snapGrid.length - 1;
            var translate = -s.snapGrid[s.snapIndex];
            if (s.params.autoplay && s.autoplaying) {
                if (internal || !s.params.autoplayDisableOnInteraction) {
                    s.pauseAutoplay(speed)
                } else {
                    s.stopAutoplay()
                }
            }
            s.updateProgress(translate);
            for (var i = 0; i < s.slidesGrid.length; i++) {
                if (-Math.floor(translate * 100) >= Math.floor(s.slidesGrid[i] * 100)) {
                    slideIndex = i
                }
            }
            if (!s.params.allowSwipeToNext && translate < s.translate && translate < s.minTranslate()) {
                return false
            }
            if (!s.params.allowSwipeToPrev && translate > s.translate && translate > s.maxTranslate()) {
                if ((s.activeIndex || 0) !== slideIndex)
                    return false
            }
            if (typeof speed === 'undefined')
                speed = s.params.speed;
            s.previousIndex = s.activeIndex || 0;
            s.activeIndex = slideIndex;
            if ((s.rtl && -translate === s.translate) || (!s.rtl && translate === s.translate)) {
                if (s.params.autoHeight) {
                    s.updateAutoHeight()
                }
                s.updateClasses();
                if (s.params.effect !== 'slide') {
                    s.setWrapperTranslate(translate)
                }
                return false
            }
            s.updateClasses();
            s.onTransitionStart(runCallbacks);
            if (speed === 0) {
                s.setWrapperTranslate(translate);
                s.setWrapperTransition(0);
                s.onTransitionEnd(runCallbacks)
            } else {
                s.setWrapperTranslate(translate);
                s.setWrapperTransition(speed);
                if (!s.animating) {
                    s.animating = true;
                    s.wrapper.transitionEnd(function() {
                        if (!s)
                            return;
                        s.onTransitionEnd(runCallbacks)
                    })
                }
            }
            return true
        }
        ;
        s.onTransitionStart = function(runCallbacks) {
            if (typeof runCallbacks === 'undefined')
                runCallbacks = true;
            if (s.params.autoHeight) {
                s.updateAutoHeight()
            }
            if (s.lazy)
                s.lazy.onTransitionStart();
            if (runCallbacks) {
                s.emit('onTransitionStart', s);
                if (s.activeIndex !== s.previousIndex) {
                    s.emit('onSlideChangeStart', s);
                    if (s.activeIndex > s.previousIndex) {
                        s.emit('onSlideNextStart', s)
                    } else {
                        s.emit('onSlidePrevStart', s)
                    }
                }
            }
        }
        ;
        s.onTransitionEnd = function(runCallbacks) {
            s.animating = false;
            s.setWrapperTransition(0);
            if (typeof runCallbacks === 'undefined')
                runCallbacks = true;
            if (s.lazy)
                s.lazy.onTransitionEnd();
            if (runCallbacks) {
                s.emit('onTransitionEnd', s);
                if (s.activeIndex !== s.previousIndex) {
                    s.emit('onSlideChangeEnd', s);
                    if (s.activeIndex > s.previousIndex) {
                        s.emit('onSlideNextEnd', s)
                    } else {
                        s.emit('onSlidePrevEnd', s)
                    }
                }
            }
            if (s.params.hashnav && s.hashnav) {
                s.hashnav.setHash()
            }
        }
        ;
        s.slideNext = function(runCallbacks, speed, internal) {
            if (s.params.loop) {
                if (s.animating)
                    return false;
                s.fixLoop();
                var clientLeft = s.container[0].clientLeft;
                return s.slideTo(s.activeIndex + s.params.slidesPerGroup, speed, runCallbacks, internal)
            } else
                return s.slideTo(s.activeIndex + s.params.slidesPerGroup, speed, runCallbacks, internal)
        }
        ;
        s._slideNext = function(speed) {
            return s.slideNext(true, speed, true)
        }
        ;
        s.slidePrev = function(runCallbacks, speed, internal) {
            if (s.params.loop) {
                if (s.animating)
                    return false;
                s.fixLoop();
                var clientLeft = s.container[0].clientLeft;
                return s.slideTo(s.activeIndex - 1, speed, runCallbacks, internal)
            } else
                return s.slideTo(s.activeIndex - 1, speed, runCallbacks, internal)
        }
        ;
        s._slidePrev = function(speed) {
            return s.slidePrev(true, speed, true)
        }
        ;
        s.slideReset = function(runCallbacks, speed, internal) {
            return s.slideTo(s.activeIndex, speed, runCallbacks)
        }
        ;
        s.setWrapperTransition = function(duration, byController) {
            s.wrapper.transition(duration);
            if (s.params.effect !== 'slide' && s.effects[s.params.effect]) {
                s.effects[s.params.effect].setTransition(duration)
            }
            if (s.params.parallax && s.parallax) {
                s.parallax.setTransition(duration)
            }
            if (s.params.scrollbar && s.scrollbar) {
                s.scrollbar.setTransition(duration)
            }
            if (s.params.control && s.controller) {
                s.controller.setTransition(duration, byController)
            }
            s.emit('onSetTransition', s, duration)
        }
        ;
        s.setWrapperTranslate = function(translate, updateActiveIndex, byController) {
            var x = 0
              , y = 0
              , z = 0;
            if (s.isHorizontal()) {
                x = s.rtl ? -translate : translate
            } else {
                y = translate
            }
            if (s.params.roundLengths) {
                x = round(x);
                y = round(y)
            }
            if (!s.params.virtualTranslate) {
                if (s.support.transforms3d)
                    s.wrapper.transform('translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px)');
                else
                    s.wrapper.transform('translate(' + x + 'px, ' + y + 'px)')
            }
            s.translate = s.isHorizontal() ? x : y;
            var progress;
            var translatesDiff = s.maxTranslate() - s.minTranslate();
            if (translatesDiff === 0) {
                progress = 0
            } else {
                progress = (translate - s.minTranslate()) / (translatesDiff)
            }
            if (progress !== s.progress) {
                s.updateProgress(translate)
            }
            if (updateActiveIndex)
                s.updateActiveIndex();
            if (s.params.effect !== 'slide' && s.effects[s.params.effect]) {
                s.effects[s.params.effect].setTranslate(s.translate)
            }
            if (s.params.parallax && s.parallax) {
                s.parallax.setTranslate(s.translate)
            }
            if (s.params.scrollbar && s.scrollbar) {
                s.scrollbar.setTranslate(s.translate)
            }
            if (s.params.control && s.controller) {
                s.controller.setTranslate(s.translate, byController)
            }
            s.emit('onSetTranslate', s, s.translate)
        }
        ;
        s.getTranslate = function(el, axis) {
            var matrix, curTransform, curStyle, transformMatrix;
            if (typeof axis === 'undefined') {
                axis = 'x'
            }
            if (s.params.virtualTranslate) {
                return s.rtl ? -s.translate : s.translate
            }
            curStyle = window.getComputedStyle(el, null);
            if (window.WebKitCSSMatrix) {
                curTransform = curStyle.transform || curStyle.webkitTransform;
                if (curTransform.split(',').length > 6) {
                    curTransform = curTransform.split(', ').map(function(a) {
                        return a.replace(',', '.')
                    }).join(', ')
                }
                transformMatrix = new window.WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform)
            } else {
                transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
                matrix = transformMatrix.toString().split(',')
            }
            if (axis === 'x') {
                if (window.WebKitCSSMatrix)
                    curTransform = transformMatrix.m41;
                else if (matrix.length === 16)
                    curTransform = parseFloat(matrix[12]);
                else
                    curTransform = parseFloat(matrix[4])
            }
            if (axis === 'y') {
                if (window.WebKitCSSMatrix)
                    curTransform = transformMatrix.m42;
                else if (matrix.length === 16)
                    curTransform = parseFloat(matrix[13]);
                else
                    curTransform = parseFloat(matrix[5])
            }
            if (s.rtl && curTransform)
                curTransform = -curTransform;
            return curTransform || 0
        }
        ;
        s.getWrapperTranslate = function(axis) {
            if (typeof axis === 'undefined') {
                axis = s.isHorizontal() ? 'x' : 'y'
            }
            return s.getTranslate(s.wrapper[0], axis)
        }
        ;
        s.observers = [];
        function initObserver(target, options) {
            options = options || {};
            var ObserverFunc = window.MutationObserver || window.WebkitMutationObserver;
            var observer = new ObserverFunc(function(mutations) {
                mutations.forEach(function(mutation) {
                    s.onResize(true);
                    s.emit('onObserverUpdate', s, mutation)
                })
            }
            );
            observer.observe(target, {
                attributes: typeof options.attributes === 'undefined' ? true : options.attributes,
                childList: typeof options.childList === 'undefined' ? true : options.childList,
                characterData: typeof options.characterData === 'undefined' ? true : options.characterData
            });
            s.observers.push(observer)
        }
        s.initObservers = function() {
            if (s.params.observeParents) {
                var containerParents = s.container.parents();
                for (var i = 0; i < containerParents.length; i++) {
                    initObserver(containerParents[i])
                }
            }
            initObserver(s.container[0], {
                childList: false
            });
            initObserver(s.wrapper[0], {
                attributes: false
            })
        }
        ;
        s.disconnectObservers = function() {
            for (var i = 0; i < s.observers.length; i++) {
                s.observers[i].disconnect()
            }
            s.observers = []
        }
        ;
        s.createLoop = function() {
            s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass).remove();
            var slides = s.wrapper.children('.' + s.params.slideClass);
            if (s.params.slidesPerView === 'auto' && !s.params.loopedSlides)
                s.params.loopedSlides = slides.length;
            s.loopedSlides = parseInt(s.params.loopedSlides || s.params.slidesPerView, 10);
            s.loopedSlides = s.loopedSlides + s.params.loopAdditionalSlides;
            if (s.loopedSlides > slides.length) {
                s.loopedSlides = slides.length
            }
            var prependSlides = [], appendSlides = [], i;
            slides.each(function(index, el) {
                var slide = $(this);
                if (index < s.loopedSlides)
                    appendSlides.push(el);
                if (index < slides.length && index >= slides.length - s.loopedSlides)
                    prependSlides.push(el);
                slide.attr('data-swiper-slide-index', index)
            });
            for (i = 0; i < appendSlides.length; i++) {
                s.wrapper.append($(appendSlides[i].cloneNode(true)).addClass(s.params.slideDuplicateClass))
            }
            for (i = prependSlides.length - 1; i >= 0; i--) {
                s.wrapper.prepend($(prependSlides[i].cloneNode(true)).addClass(s.params.slideDuplicateClass))
            }
        }
        ;
        s.destroyLoop = function() {
            s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass).remove();
            s.slides.removeAttr('data-swiper-slide-index')
        }
        ;
        s.reLoop = function(updatePosition) {
            var oldIndex = s.activeIndex - s.loopedSlides;
            s.destroyLoop();
            s.createLoop();
            s.updateSlidesSize();
            if (updatePosition) {
                s.slideTo(oldIndex + s.loopedSlides, 0, false)
            }
        }
        ;
        s.fixLoop = function() {
            var newIndex;
            if (s.activeIndex < s.loopedSlides) {
                newIndex = s.slides.length - s.loopedSlides * 3 + s.activeIndex;
                newIndex = newIndex + s.loopedSlides;
                s.slideTo(newIndex, 0, false, true)
            } else if ((s.params.slidesPerView === 'auto' && s.activeIndex >= s.loopedSlides * 2) || (s.activeIndex > s.slides.length - s.params.slidesPerView * 2)) {
                newIndex = -s.slides.length + s.activeIndex + s.loopedSlides;
                newIndex = newIndex + s.loopedSlides;
                s.slideTo(newIndex, 0, false, true)
            }
        }
        ;
        s.appendSlide = function(slides) {
            if (s.params.loop) {
                s.destroyLoop()
            }
            if (typeof slides === 'object' && slides.length) {
                for (var i = 0; i < slides.length; i++) {
                    if (slides[i])
                        s.wrapper.append(slides[i])
                }
            } else {
                s.wrapper.append(slides)
            }
            if (s.params.loop) {
                s.createLoop()
            }
            if (!(s.params.observer && s.support.observer)) {
                s.update(true)
            }
        }
        ;
        s.prependSlide = function(slides) {
            if (s.params.loop) {
                s.destroyLoop()
            }
            var newActiveIndex = s.activeIndex + 1;
            if (typeof slides === 'object' && slides.length) {
                for (var i = 0; i < slides.length; i++) {
                    if (slides[i])
                        s.wrapper.prepend(slides[i])
                }
                newActiveIndex = s.activeIndex + slides.length
            } else {
                s.wrapper.prepend(slides)
            }
            if (s.params.loop) {
                s.createLoop()
            }
            if (!(s.params.observer && s.support.observer)) {
                s.update(true)
            }
            s.slideTo(newActiveIndex, 0, false)
        }
        ;
        s.removeSlide = function(slidesIndexes) {
            if (s.params.loop) {
                s.destroyLoop();
                s.slides = s.wrapper.children('.' + s.params.slideClass)
            }
            var newActiveIndex = s.activeIndex, indexToRemove;
            if (typeof slidesIndexes === 'object' && slidesIndexes.length) {
                for (var i = 0; i < slidesIndexes.length; i++) {
                    indexToRemove = slidesIndexes[i];
                    if (s.slides[indexToRemove])
                        s.slides.eq(indexToRemove).remove();
                    if (indexToRemove < newActiveIndex)
                        newActiveIndex--
                }
                newActiveIndex = Math.max(newActiveIndex, 0)
            } else {
                indexToRemove = slidesIndexes;
                if (s.slides[indexToRemove])
                    s.slides.eq(indexToRemove).remove();
                if (indexToRemove < newActiveIndex)
                    newActiveIndex--;
                newActiveIndex = Math.max(newActiveIndex, 0)
            }
            if (s.params.loop) {
                s.createLoop()
            }
            if (!(s.params.observer && s.support.observer)) {
                s.update(true)
            }
            if (s.params.loop) {
                s.slideTo(newActiveIndex + s.loopedSlides, 0, false)
            } else {
                s.slideTo(newActiveIndex, 0, false)
            }
        }
        ;
        s.removeAllSlides = function() {
            var slidesIndexes = [];
            for (var i = 0; i < s.slides.length; i++) {
                slidesIndexes.push(i)
            }
            s.removeSlide(slidesIndexes)
        }
        ;
        s.effects = {
            fade: {
                setTranslate: function() {
                    for (var i = 0; i < s.slides.length; i++) {
                        var slide = s.slides.eq(i);
                        var offset = slide[0].swiperSlideOffset;
                        var tx = -offset;
                        if (!s.params.virtualTranslate)
                            tx = tx - s.translate;
                        var ty = 0;
                        if (!s.isHorizontal()) {
                            ty = tx;
                            tx = 0
                        }
                        var slideOpacity = s.params.fade.crossFade ? Math.max(1 - Math.abs(slide[0].progress), 0) : 1 + Math.min(Math.max(slide[0].progress, -1), 0);
                        slide.css({
                            opacity: slideOpacity
                        }).transform('translate3d(' + tx + 'px, ' + ty + 'px, 0px)')
                    }
                },
                setTransition: function(duration) {
                    s.slides.transition(duration);
                    if (s.params.virtualTranslate && duration !== 0) {
                        var eventTriggered = false;
                        s.slides.transitionEnd(function() {
                            if (eventTriggered)
                                return;
                            if (!s)
                                return;
                            eventTriggered = true;
                            s.animating = false;
                            var triggerEvents = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'];
                            for (var i = 0; i < triggerEvents.length; i++) {
                                s.wrapper.trigger(triggerEvents[i])
                            }
                        })
                    }
                }
            },
            flip: {
                setTranslate: function() {
                    for (var i = 0; i < s.slides.length; i++) {
                        var slide = s.slides.eq(i);
                        var progress = slide[0].progress;
                        if (s.params.flip.limitRotation) {
                            progress = Math.max(Math.min(slide[0].progress, 1), -1)
                        }
                        var offset = slide[0].swiperSlideOffset;
                        var rotate = -180 * progress
                          , rotateY = rotate
                          , rotateX = 0
                          , tx = -offset
                          , ty = 0;
                        if (!s.isHorizontal()) {
                            ty = tx;
                            tx = 0;
                            rotateX = -rotateY;
                            rotateY = 0
                        } else if (s.rtl) {
                            rotateY = -rotateY
                        }
                        slide[0].style.zIndex = -Math.abs(Math.round(progress)) + s.slides.length;
                        if (s.params.flip.slideShadows) {
                            var shadowBefore = s.isHorizontal() ? slide.find('.swiper-slide-shadow-left') : slide.find('.swiper-slide-shadow-top');
                            var shadowAfter = s.isHorizontal() ? slide.find('.swiper-slide-shadow-right') : slide.find('.swiper-slide-shadow-bottom');
                            if (shadowBefore.length === 0) {
                                shadowBefore = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'left' : 'top') + '"></div>');
                                slide.append(shadowBefore)
                            }
                            if (shadowAfter.length === 0) {
                                shadowAfter = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'right' : 'bottom') + '"></div>');
                                slide.append(shadowAfter)
                            }
                            if (shadowBefore.length)
                                shadowBefore[0].style.opacity = Math.max(-progress, 0);
                            if (shadowAfter.length)
                                shadowAfter[0].style.opacity = Math.max(progress, 0)
                        }
                        slide.transform('translate3d(' + tx + 'px, ' + ty + 'px, 0px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)')
                    }
                },
                setTransition: function(duration) {
                    s.slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);
                    if (s.params.virtualTranslate && duration !== 0) {
                        var eventTriggered = false;
                        s.slides.eq(s.activeIndex).transitionEnd(function() {
                            if (eventTriggered)
                                return;
                            if (!s)
                                return;
                            if (!$(this).hasClass(s.params.slideActiveClass))
                                return;
                            eventTriggered = true;
                            s.animating = false;
                            var triggerEvents = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'];
                            for (var i = 0; i < triggerEvents.length; i++) {
                                s.wrapper.trigger(triggerEvents[i])
                            }
                        })
                    }
                }
            },
            cube: {
                setTranslate: function() {
                    var wrapperRotate = 0, cubeShadow;
                    if (s.params.cube.shadow) {
                        if (s.isHorizontal()) {
                            cubeShadow = s.wrapper.find('.swiper-cube-shadow');
                            if (cubeShadow.length === 0) {
                                cubeShadow = $('<div class="swiper-cube-shadow"></div>');
                                s.wrapper.append(cubeShadow)
                            }
                            cubeShadow.css({
                                height: s.width + 'px'
                            })
                        } else {
                            cubeShadow = s.container.find('.swiper-cube-shadow');
                            if (cubeShadow.length === 0) {
                                cubeShadow = $('<div class="swiper-cube-shadow"></div>');
                                s.container.append(cubeShadow)
                            }
                        }
                    }
                    for (var i = 0; i < s.slides.length; i++) {
                        var slide = s.slides.eq(i);
                        var slideAngle = i * 90;
                        var round = Math.floor(slideAngle / 360);
                        if (s.rtl) {
                            slideAngle = -slideAngle;
                            round = Math.floor(-slideAngle / 360)
                        }
                        var progress = Math.max(Math.min(slide[0].progress, 1), -1);
                        var tx = 0
                          , ty = 0
                          , tz = 0;
                        if (i % 4 === 0) {
                            tx = -round * 4 * s.size;
                            tz = 0
                        } else if ((i - 1) % 4 === 0) {
                            tx = 0;
                            tz = -round * 4 * s.size
                        } else if ((i - 2) % 4 === 0) {
                            tx = s.size + round * 4 * s.size;
                            tz = s.size
                        } else if ((i - 3) % 4 === 0) {
                            tx = -s.size;
                            tz = 3 * s.size + s.size * 4 * round
                        }
                        if (s.rtl) {
                            tx = -tx
                        }
                        if (!s.isHorizontal()) {
                            ty = tx;
                            tx = 0
                        }
                        var transform = 'rotateX(' + (s.isHorizontal() ? 0 : -slideAngle) + 'deg) rotateY(' + (s.isHorizontal() ? slideAngle : 0) + 'deg) translate3d(' + tx + 'px, ' + ty + 'px, ' + tz + 'px)';
                        if (progress <= 1 && progress > -1) {
                            wrapperRotate = i * 90 + progress * 90;
                            if (s.rtl)
                                wrapperRotate = -i * 90 - progress * 90
                        }
                        slide.transform(transform);
                        if (s.params.cube.slideShadows) {
                            var shadowBefore = s.isHorizontal() ? slide.find('.swiper-slide-shadow-left') : slide.find('.swiper-slide-shadow-top');
                            var shadowAfter = s.isHorizontal() ? slide.find('.swiper-slide-shadow-right') : slide.find('.swiper-slide-shadow-bottom');
                            if (shadowBefore.length === 0) {
                                shadowBefore = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'left' : 'top') + '"></div>');
                                slide.append(shadowBefore)
                            }
                            if (shadowAfter.length === 0) {
                                shadowAfter = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'right' : 'bottom') + '"></div>');
                                slide.append(shadowAfter)
                            }
                            if (shadowBefore.length)
                                shadowBefore[0].style.opacity = Math.max(-progress, 0);
                            if (shadowAfter.length)
                                shadowAfter[0].style.opacity = Math.max(progress, 0)
                        }
                    }
                    s.wrapper.css({
                        '-webkit-transform-origin': '50% 50% -' + (s.size / 2) + 'px',
                        '-moz-transform-origin': '50% 50% -' + (s.size / 2) + 'px',
                        '-ms-transform-origin': '50% 50% -' + (s.size / 2) + 'px',
                        'transform-origin': '50% 50% -' + (s.size / 2) + 'px'
                    });
                    if (s.params.cube.shadow) {
                        if (s.isHorizontal()) {
                            cubeShadow.transform('translate3d(0px, ' + (s.width / 2 + s.params.cube.shadowOffset) + 'px, ' + (-s.width / 2) + 'px) rotateX(90deg) rotateZ(0deg) scale(' + (s.params.cube.shadowScale) + ')')
                        } else {
                            var shadowAngle = Math.abs(wrapperRotate) - Math.floor(Math.abs(wrapperRotate) / 90) * 90;
                            var multiplier = 1.5 - (Math.sin(shadowAngle * 2 * Math.PI / 360) / 2 + Math.cos(shadowAngle * 2 * Math.PI / 360) / 2);
                            var scale1 = s.params.cube.shadowScale
                              , scale2 = s.params.cube.shadowScale / multiplier
                              , offset = s.params.cube.shadowOffset;
                            cubeShadow.transform('scale3d(' + scale1 + ', 1, ' + scale2 + ') translate3d(0px, ' + (s.height / 2 + offset) + 'px, ' + (-s.height / 2 / scale2) + 'px) rotateX(-90deg)')
                        }
                    }
                    var zFactor = (s.isSafari || s.isUiWebView) ? (-s.size / 2) : 0;
                    s.wrapper.transform('translate3d(0px,0,' + zFactor + 'px) rotateX(' + (s.isHorizontal() ? 0 : wrapperRotate) + 'deg) rotateY(' + (s.isHorizontal() ? -wrapperRotate : 0) + 'deg)')
                },
                setTransition: function(duration) {
                    s.slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);
                    if (s.params.cube.shadow && !s.isHorizontal()) {
                        s.container.find('.swiper-cube-shadow').transition(duration)
                    }
                }
            },
            coverflow: {
                setTranslate: function() {
                    var transform = s.translate;
                    var center = s.isHorizontal() ? -transform + s.width / 2 : -transform + s.height / 2;
                    var rotate = s.isHorizontal() ? s.params.coverflow.rotate : -s.params.coverflow.rotate;
                    var translate = s.params.coverflow.depth;
                    for (var i = 0, length = s.slides.length; i < length; i++) {
                        var slide = s.slides.eq(i);
                        var slideSize = s.slidesSizesGrid[i];
                        var slideOffset = slide[0].swiperSlideOffset;
                        var offsetMultiplier = (center - slideOffset - slideSize / 2) / slideSize * s.params.coverflow.modifier;
                        var rotateY = s.isHorizontal() ? rotate * offsetMultiplier : 0;
                        var rotateX = s.isHorizontal() ? 0 : rotate * offsetMultiplier;
                        var translateZ = -translate * Math.abs(offsetMultiplier);
                        var translateY = s.isHorizontal() ? 0 : s.params.coverflow.stretch * (offsetMultiplier);
                        var translateX = s.isHorizontal() ? s.params.coverflow.stretch * (offsetMultiplier) : 0;
                        if (Math.abs(translateX) < 0.001)
                            translateX = 0;
                        if (Math.abs(translateY) < 0.001)
                            translateY = 0;
                        if (Math.abs(translateZ) < 0.001)
                            translateZ = 0;
                        if (Math.abs(rotateY) < 0.001)
                            rotateY = 0;
                        if (Math.abs(rotateX) < 0.001)
                            rotateX = 0;
                        var slideTransform = 'translate3d(' + translateX + 'px,' + translateY + 'px,' + translateZ + 'px)  rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
                        slide.transform(slideTransform);
                        slide[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;
                        if (s.params.coverflow.slideShadows) {
                            var shadowBefore = s.isHorizontal() ? slide.find('.swiper-slide-shadow-left') : slide.find('.swiper-slide-shadow-top');
                            var shadowAfter = s.isHorizontal() ? slide.find('.swiper-slide-shadow-right') : slide.find('.swiper-slide-shadow-bottom');
                            if (shadowBefore.length === 0) {
                                shadowBefore = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'left' : 'top') + '"></div>');
                                slide.append(shadowBefore)
                            }
                            if (shadowAfter.length === 0) {
                                shadowAfter = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'right' : 'bottom') + '"></div>');
                                slide.append(shadowAfter)
                            }
                            if (shadowBefore.length)
                                shadowBefore[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0;
                            if (shadowAfter.length)
                                shadowAfter[0].style.opacity = (-offsetMultiplier) > 0 ? -offsetMultiplier : 0
                        }
                    }
                    if (s.browser.ie) {
                        var ws = s.wrapper[0].style;
                        ws.perspectiveOrigin = center + 'px 50%'
                    }
                },
                setTransition: function(duration) {
                    s.slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration)
                }
            }
        };
        s.lazy = {
            initialImageLoaded: false,
            loadImageInSlide: function(index, loadInDuplicate) {
                if (typeof index === 'undefined')
                    return;
                if (typeof loadInDuplicate === 'undefined')
                    loadInDuplicate = true;
                if (s.slides.length === 0)
                    return;
                var slide = s.slides.eq(index);
                var img = slide.find('.swiper-lazy:not(.swiper-lazy-loaded):not(.swiper-lazy-loading)');
                if (slide.hasClass('swiper-lazy') && !slide.hasClass('swiper-lazy-loaded') && !slide.hasClass('swiper-lazy-loading')) {
                    img = img.add(slide[0])
                }
                if (img.length === 0)
                    return;
                img.each(function() {
                    var _img = $(this);
                    _img.addClass('swiper-lazy-loading');
                    var background = _img.attr('data-background');
                    var src = _img.attr('data-src')
                      , srcset = _img.attr('data-srcset');
                    s.loadImage(_img[0], (src || background), srcset, false, function() {
                        if (background) {
                            _img.css('background-image', 'url("' + background + '")');
                            _img.removeAttr('data-background')
                        } else {
                            if (srcset) {
                                _img.attr('srcset', srcset);
                                _img.removeAttr('data-srcset')
                            }
                            if (src) {
                                _img.attr('src', src);
                                _img.removeAttr('data-src')
                            }
                        }
                        _img.addClass('swiper-lazy-loaded').removeClass('swiper-lazy-loading');
                        slide.find('.swiper-lazy-preloader, .preloader').remove();
                        if (s.params.loop && loadInDuplicate) {
                            var slideOriginalIndex = slide.attr('data-swiper-slide-index');
                            if (slide.hasClass(s.params.slideDuplicateClass)) {
                                var originalSlide = s.wrapper.children('[data-swiper-slide-index="' + slideOriginalIndex + '"]:not(.' + s.params.slideDuplicateClass + ')');
                                s.lazy.loadImageInSlide(originalSlide.index(), false)
                            } else {
                                var duplicatedSlide = s.wrapper.children('.' + s.params.slideDuplicateClass + '[data-swiper-slide-index="' + slideOriginalIndex + '"]');
                                s.lazy.loadImageInSlide(duplicatedSlide.index(), false)
                            }
                        }
                        s.emit('onLazyImageReady', s, slide[0], _img[0])
                    });
                    s.emit('onLazyImageLoad', s, slide[0], _img[0])
                })
            },
            load: function() {
                var i;
                if (s.params.watchSlidesVisibility) {
                    s.wrapper.children('.' + s.params.slideVisibleClass).each(function() {
                        s.lazy.loadImageInSlide($(this).index())
                    })
                } else {
                    if (s.params.slidesPerView > 1) {
                        for (i = s.activeIndex; i < s.activeIndex + s.params.slidesPerView; i++) {
                            if (s.slides[i])
                                s.lazy.loadImageInSlide(i)
                        }
                    } else {
                        s.lazy.loadImageInSlide(s.activeIndex)
                    }
                }
                if (s.params.lazyLoadingInPrevNext) {
                    if (s.params.slidesPerView > 1 || (s.params.lazyLoadingInPrevNextAmount && s.params.lazyLoadingInPrevNextAmount > 1)) {
                        var amount = s.params.lazyLoadingInPrevNextAmount;
                        var spv = s.params.slidesPerView;
                        var maxIndex = Math.min(s.activeIndex + spv + Math.max(amount, spv), s.slides.length);
                        var minIndex = Math.max(s.activeIndex - Math.max(spv, amount), 0);
                        for (i = s.activeIndex + s.params.slidesPerView; i < maxIndex; i++) {
                            if (s.slides[i])
                                s.lazy.loadImageInSlide(i)
                        }
                        for (i = minIndex; i < s.activeIndex; i++) {
                            if (s.slides[i])
                                s.lazy.loadImageInSlide(i)
                        }
                    } else {
                        var nextSlide = s.wrapper.children('.' + s.params.slideNextClass);
                        if (nextSlide.length > 0)
                            s.lazy.loadImageInSlide(nextSlide.index());
                        var prevSlide = s.wrapper.children('.' + s.params.slidePrevClass);
                        if (prevSlide.length > 0)
                            s.lazy.loadImageInSlide(prevSlide.index())
                    }
                }
            },
            onTransitionStart: function() {
                if (s.params.lazyLoading) {
                    if (s.params.lazyLoadingOnTransitionStart || (!s.params.lazyLoadingOnTransitionStart && !s.lazy.initialImageLoaded)) {
                        s.lazy.load()
                    }
                }
            },
            onTransitionEnd: function() {
                if (s.params.lazyLoading && !s.params.lazyLoadingOnTransitionStart) {
                    s.lazy.load()
                }
            }
        };
        s.scrollbar = {
            isTouched: false,
            setDragPosition: function(e) {
                var sb = s.scrollbar;
                var x = 0
                  , y = 0;
                var translate;
                var pointerPosition = s.isHorizontal() ? ((e.type === 'touchstart' || e.type === 'touchmove') ? e.targetTouches[0].pageX : e.pageX || e.clientX) : ((e.type === 'touchstart' || e.type === 'touchmove') ? e.targetTouches[0].pageY : e.pageY || e.clientY);
                var position = (pointerPosition) - sb.track.offset()[s.isHorizontal() ? 'left' : 'top'] - sb.dragSize / 2;
                var positionMin = -s.minTranslate() * sb.moveDivider;
                var positionMax = -s.maxTranslate() * sb.moveDivider;
                if (position < positionMin) {
                    position = positionMin
                } else if (position > positionMax) {
                    position = positionMax
                }
                position = -position / sb.moveDivider;
                s.updateProgress(position);
                s.setWrapperTranslate(position, true)
            },
            dragStart: function(e) {
                var sb = s.scrollbar;
                sb.isTouched = true;
                e.preventDefault();
                e.stopPropagation();
                sb.setDragPosition(e);
                clearTimeout(sb.dragTimeout);
                sb.track.transition(0);
                if (s.params.scrollbarHide) {
                    sb.track.css('opacity', 1)
                }
                s.wrapper.transition(100);
                sb.drag.transition(100);
                s.emit('onScrollbarDragStart', s)
            },
            dragMove: function(e) {
                var sb = s.scrollbar;
                if (!sb.isTouched)
                    return;
                if (e.preventDefault)
                    e.preventDefault();
                else
                    e.returnValue = false;
                sb.setDragPosition(e);
                s.wrapper.transition(0);
                sb.track.transition(0);
                sb.drag.transition(0);
                s.emit('onScrollbarDragMove', s)
            },
            dragEnd: function(e) {
                var sb = s.scrollbar;
                if (!sb.isTouched)
                    return;
                sb.isTouched = false;
                if (s.params.scrollbarHide) {
                    clearTimeout(sb.dragTimeout);
                    sb.dragTimeout = setTimeout(function() {
                        sb.track.css('opacity', 0);
                        sb.track.transition(400)
                    }, 1000)
                }
                s.emit('onScrollbarDragEnd', s);
                if (s.params.scrollbarSnapOnRelease) {
                    s.slideReset()
                }
            },
            enableDraggable: function() {
                var sb = s.scrollbar;
                var target = s.support.touch ? sb.track : document;
                $(sb.track).on(s.touchEvents.start, sb.dragStart);
                $(target).on(s.touchEvents.move, sb.dragMove);
                $(target).on(s.touchEvents.end, sb.dragEnd)
            },
            disableDraggable: function() {
                var sb = s.scrollbar;
                var target = s.support.touch ? sb.track : document;
                $(sb.track).off(s.touchEvents.start, sb.dragStart);
                $(target).off(s.touchEvents.move, sb.dragMove);
                $(target).off(s.touchEvents.end, sb.dragEnd)
            },
            set: function() {
                if (!s.params.scrollbar)
                    return;
                var sb = s.scrollbar;
                sb.track = $(s.params.scrollbar);
                if (s.params.uniqueNavElements && typeof s.params.scrollbar === 'string' && sb.track.length > 1 && s.container.find(s.params.scrollbar).length === 1) {
                    sb.track = s.container.find(s.params.scrollbar)
                }
                sb.drag = sb.track.find('.swiper-scrollbar-drag');
                if (sb.drag.length === 0) {
                    sb.drag = $('<div class="swiper-scrollbar-drag"></div>');
                    sb.track.append(sb.drag)
                }
                sb.drag[0].style.width = '';
                sb.drag[0].style.height = '';
                sb.trackSize = s.isHorizontal() ? sb.track[0].offsetWidth : sb.track[0].offsetHeight;
                sb.divider = s.size / s.virtualSize;
                sb.moveDivider = sb.divider * (sb.trackSize / s.size);
                sb.dragSize = sb.trackSize * sb.divider;
                if (s.isHorizontal()) {
                    sb.drag[0].style.width = sb.dragSize + 'px'
                } else {
                    sb.drag[0].style.height = sb.dragSize + 'px'
                }
                if (sb.divider >= 1) {
                    sb.track[0].style.display = 'none'
                } else {
                    sb.track[0].style.display = ''
                }
                if (s.params.scrollbarHide) {
                    sb.track[0].style.opacity = 0
                }
            },
            setTranslate: function() {
                if (!s.params.scrollbar)
                    return;
                var diff;
                var sb = s.scrollbar;
                var translate = s.translate || 0;
                var newPos;
                var newSize = sb.dragSize;
                newPos = (sb.trackSize - sb.dragSize) * s.progress;
                if (s.rtl && s.isHorizontal()) {
                    newPos = -newPos;
                    if (newPos > 0) {
                        newSize = sb.dragSize - newPos;
                        newPos = 0
                    } else if (-newPos + sb.dragSize > sb.trackSize) {
                        newSize = sb.trackSize + newPos
                    }
                } else {
                    if (newPos < 0) {
                        newSize = sb.dragSize + newPos;
                        newPos = 0
                    } else if (newPos + sb.dragSize > sb.trackSize) {
                        newSize = sb.trackSize - newPos
                    }
                }
                if (s.isHorizontal()) {
                    if (s.support.transforms3d) {
                        sb.drag.transform('translate3d(' + (newPos) + 'px, 0, 0)')
                    } else {
                        sb.drag.transform('translateX(' + (newPos) + 'px)')
                    }
                    sb.drag[0].style.width = newSize + 'px'
                } else {
                    if (s.support.transforms3d) {
                        sb.drag.transform('translate3d(0px, ' + (newPos) + 'px, 0)')
                    } else {
                        sb.drag.transform('translateY(' + (newPos) + 'px)')
                    }
                    sb.drag[0].style.height = newSize + 'px'
                }
                if (s.params.scrollbarHide) {
                    clearTimeout(sb.timeout);
                    sb.track[0].style.opacity = 1;
                    sb.timeout = setTimeout(function() {
                        sb.track[0].style.opacity = 0;
                        sb.track.transition(400)
                    }, 1000)
                }
            },
            setTransition: function(duration) {
                if (!s.params.scrollbar)
                    return;
                s.scrollbar.drag.transition(duration)
            }
        };
        s.controller = {
            LinearSpline: function(x, y) {
                this.x = x;
                this.y = y;
                this.lastIndex = x.length - 1;
                var i1, i3;
                var l = this.x.length;
                this.interpolate = function(x2) {
                    if (!x2)
                        return 0;
                    i3 = binarySearch(this.x, x2);
                    i1 = i3 - 1;
                    return ((x2 - this.x[i1]) * (this.y[i3] - this.y[i1])) / (this.x[i3] - this.x[i1]) + this.y[i1]
                }
                ;
                var binarySearch = (function() {
                    var maxIndex, minIndex, guess;
                    return function(array, val) {
                        minIndex = -1;
                        maxIndex = array.length;
                        while (maxIndex - minIndex > 1)
                            if (array[guess = maxIndex + minIndex >> 1] <= val) {
                                minIndex = guess
                            } else {
                                maxIndex = guess
                            }
                        return maxIndex
                    }
                }
                )()
            },
            getInterpolateFunction: function(c) {
                if (!s.controller.spline)
                    s.controller.spline = s.params.loop ? new s.controller.LinearSpline(s.slidesGrid,c.slidesGrid) : new s.controller.LinearSpline(s.snapGrid,c.snapGrid)
            },
            setTranslate: function(translate, byController) {
                var controlled = s.params.control;
                var multiplier, controlledTranslate;
                function setControlledTranslate(c) {
                    translate = c.rtl && c.params.direction === 'horizontal' ? -s.translate : s.translate;
                    if (s.params.controlBy === 'slide') {
                        s.controller.getInterpolateFunction(c);
                        controlledTranslate = -s.controller.spline.interpolate(-translate)
                    }
                    if (!controlledTranslate || s.params.controlBy === 'container') {
                        multiplier = (c.maxTranslate() - c.minTranslate()) / (s.maxTranslate() - s.minTranslate());
                        controlledTranslate = (translate - s.minTranslate()) * multiplier + c.minTranslate()
                    }
                    if (s.params.controlInverse) {
                        controlledTranslate = c.maxTranslate() - controlledTranslate
                    }
                    c.updateProgress(controlledTranslate);
                    c.setWrapperTranslate(controlledTranslate, false, s);
                    c.updateActiveIndex()
                }
                if (s.isArray(controlled)) {
                    for (var i = 0; i < controlled.length; i++) {
                        if (controlled[i] !== byController && controlled[i]instanceof Swiper) {
                            setControlledTranslate(controlled[i])
                        }
                    }
                } else if (controlled instanceof Swiper && byController !== controlled) {
                    setControlledTranslate(controlled)
                }
            },
            setTransition: function(duration, byController) {
                var controlled = s.params.control;
                var i;
                function setControlledTransition(c) {
                    c.setWrapperTransition(duration, s);
                    if (duration !== 0) {
                        c.onTransitionStart();
                        c.wrapper.transitionEnd(function() {
                            if (!controlled)
                                return;
                            if (c.params.loop && s.params.controlBy === 'slide') {
                                c.fixLoop()
                            }
                            c.onTransitionEnd()
                        })
                    }
                }
                if (s.isArray(controlled)) {
                    for (i = 0; i < controlled.length; i++) {
                        if (controlled[i] !== byController && controlled[i]instanceof Swiper) {
                            setControlledTransition(controlled[i])
                        }
                    }
                } else if (controlled instanceof Swiper && byController !== controlled) {
                    setControlledTransition(controlled)
                }
            }
        };
        s.hashnav = {
            init: function() {
                if (!s.params.hashnav)
                    return;
                s.hashnav.initialized = true;
                var hash = document.location.hash.replace('#', '');
                if (!hash)
                    return;
                var speed = 0;
                for (var i = 0, length = s.slides.length; i < length; i++) {
                    var slide = s.slides.eq(i);
                    var slideHash = slide.attr('data-hash');
                    if (slideHash === hash && !slide.hasClass(s.params.slideDuplicateClass)) {
                        var index = slide.index();
                        s.slideTo(index, speed, s.params.runCallbacksOnInit, true)
                    }
                }
            },
            setHash: function() {
                if (!s.hashnav.initialized || !s.params.hashnav)
                    return;
                document.location.hash = s.slides.eq(s.activeIndex).attr('data-hash') || ''
            }
        };
        function handleKeyboard(e) {
            if (e.originalEvent)
                e = e.originalEvent;
            var kc = e.keyCode || e.charCode;
            if (!s.params.allowSwipeToNext && (s.isHorizontal() && kc === 39 || !s.isHorizontal() && kc === 40)) {
                return false
            }
            if (!s.params.allowSwipeToPrev && (s.isHorizontal() && kc === 37 || !s.isHorizontal() && kc === 38)) {
                return false
            }
            if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {
                return
            }
            if (document.activeElement && document.activeElement.nodeName && (document.activeElement.nodeName.toLowerCase() === 'input' || document.activeElement.nodeName.toLowerCase() === 'textarea')) {
                return
            }
            if (kc === 37 || kc === 39 || kc === 38 || kc === 40) {
                var inView = false;
                if (s.container.parents('.swiper-slide').length > 0 && s.container.parents('.swiper-slide-active').length === 0) {
                    return
                }
                var windowScroll = {
                    left: window.pageXOffset,
                    top: window.pageYOffset
                };
                var windowWidth = window.innerWidth;
                var windowHeight = window.innerHeight;
                var swiperOffset = s.container.offset();
                if (s.rtl)
                    swiperOffset.left = swiperOffset.left - s.container[0].scrollLeft;
                var swiperCoord = [[swiperOffset.left, swiperOffset.top], [swiperOffset.left + s.width, swiperOffset.top], [swiperOffset.left, swiperOffset.top + s.height], [swiperOffset.left + s.width, swiperOffset.top + s.height]];
                for (var i = 0; i < swiperCoord.length; i++) {
                    var point = swiperCoord[i];
                    if (point[0] >= windowScroll.left && point[0] <= windowScroll.left + windowWidth && point[1] >= windowScroll.top && point[1] <= windowScroll.top + windowHeight) {
                        inView = true
                    }
                }
                if (!inView)
                    return
            }
            if (s.isHorizontal()) {
                if (kc === 37 || kc === 39) {
                    if (e.preventDefault)
                        e.preventDefault();
                    else
                        e.returnValue = false
                }
                if ((kc === 39 && !s.rtl) || (kc === 37 && s.rtl))
                    s.slideNext();
                if ((kc === 37 && !s.rtl) || (kc === 39 && s.rtl))
                    s.slidePrev()
            } else {
                if (kc === 38 || kc === 40) {
                    if (e.preventDefault)
                        e.preventDefault();
                    else
                        e.returnValue = false
                }
                if (kc === 40)
                    s.slideNext();
                if (kc === 38)
                    s.slidePrev()
            }
        }
        s.disableKeyboardControl = function() {
            s.params.keyboardControl = false;
            $(document).off('keydown', handleKeyboard)
        }
        ;
        s.enableKeyboardControl = function() {
            s.params.keyboardControl = true;
            $(document).on('keydown', handleKeyboard)
        }
        ;
        s.mousewheel = {
            event: false,
            lastScrollTime: (new window.Date()).getTime()
        };
        if (s.params.mousewheelControl) {
            try {
                new window.WheelEvent('wheel');
                s.mousewheel.event = 'wheel'
            } catch (e) {
                if (window.WheelEvent || (s.container[0] && 'wheel'in s.container[0])) {
                    s.mousewheel.event = 'wheel'
                }
            }
            if (!s.mousewheel.event && window.WheelEvent) {}
            if (!s.mousewheel.event && document.onmousewheel !== undefined) {
                s.mousewheel.event = 'mousewheel'
            }
            if (!s.mousewheel.event) {
                s.mousewheel.event = 'DOMMouseScroll'
            }
        }
        function handleMousewheel(e) {
            if (e.originalEvent)
                e = e.originalEvent;
            var we = s.mousewheel.event;
            var delta = 0;
            var rtlFactor = s.rtl ? -1 : 1;
            if (we === 'mousewheel') {
                if (s.params.mousewheelForceToAxis) {
                    if (s.isHorizontal()) {
                        if (Math.abs(e.wheelDeltaX) > Math.abs(e.wheelDeltaY))
                            delta = e.wheelDeltaX * rtlFactor;
                        else
                            return
                    } else {
                        if (Math.abs(e.wheelDeltaY) > Math.abs(e.wheelDeltaX))
                            delta = e.wheelDeltaY;
                        else
                            return
                    }
                } else {
                    delta = Math.abs(e.wheelDeltaX) > Math.abs(e.wheelDeltaY) ? -e.wheelDeltaX * rtlFactor : -e.wheelDeltaY
                }
            } else if (we === 'DOMMouseScroll')
                delta = -e.detail;
            else if (we === 'wheel') {
                if (s.params.mousewheelForceToAxis) {
                    if (s.isHorizontal()) {
                        if (Math.abs(e.deltaX) > Math.abs(e.deltaY))
                            delta = -e.deltaX * rtlFactor;
                        else
                            return
                    } else {
                        if (Math.abs(e.deltaY) > Math.abs(e.deltaX))
                            delta = -e.deltaY;
                        else
                            return
                    }
                } else {
                    delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? -e.deltaX * rtlFactor : -e.deltaY
                }
            }
            if (delta === 0)
                return;
            if (s.params.mousewheelInvert)
                delta = -delta;
            if (!s.params.freeMode) {
                if ((new window.Date()).getTime() - s.mousewheel.lastScrollTime > 60) {
                    if (delta < 0) {
                        if ((!s.isEnd || s.params.loop) && !s.animating)
                            s.slideNext();
                        else if (s.params.mousewheelReleaseOnEdges)
                            return true
                    } else {
                        if ((!s.isBeginning || s.params.loop) && !s.animating)
                            s.slidePrev();
                        else if (s.params.mousewheelReleaseOnEdges)
                            return true
                    }
                }
                s.mousewheel.lastScrollTime = (new window.Date()).getTime()
            } else {
                var position = s.getWrapperTranslate() + delta * s.params.mousewheelSensitivity;
                var wasBeginning = s.isBeginning
                  , wasEnd = s.isEnd;
                if (position >= s.minTranslate())
                    position = s.minTranslate();
                if (position <= s.maxTranslate())
                    position = s.maxTranslate();
                s.setWrapperTransition(0);
                s.setWrapperTranslate(position);
                s.updateProgress();
                s.updateActiveIndex();
                if (!wasBeginning && s.isBeginning || !wasEnd && s.isEnd) {
                    s.updateClasses()
                }
                if (s.params.freeModeSticky) {
                    clearTimeout(s.mousewheel.timeout);
                    s.mousewheel.timeout = setTimeout(function() {
                        s.slideReset()
                    }, 300)
                } else {
                    if (s.params.lazyLoading && s.lazy) {
                        s.lazy.load()
                    }
                }
                if (position === 0 || position === s.maxTranslate())
                    return
            }
            if (s.params.autoplay)
                s.stopAutoplay();
            if (e.preventDefault)
                e.preventDefault();
            else
                e.returnValue = false;
            return false
        }
        s.disableMousewheelControl = function() {
            if (!s.mousewheel.event)
                return false;
            s.container.off(s.mousewheel.event, handleMousewheel);
            return true
        }
        ;
        s.enableMousewheelControl = function() {
            if (!s.mousewheel.event)
                return false;
            s.container.on(s.mousewheel.event, handleMousewheel);
            return true
        }
        ;
        function setParallaxTransform(el, progress) {
            el = $(el);
            var p, pX, pY;
            var rtlFactor = s.rtl ? -1 : 1;
            p = el.attr('data-swiper-parallax') || '0';
            pX = el.attr('data-swiper-parallax-x');
            pY = el.attr('data-swiper-parallax-y');
            if (pX || pY) {
                pX = pX || '0';
                pY = pY || '0'
            } else {
                if (s.isHorizontal()) {
                    pX = p;
                    pY = '0'
                } else {
                    pY = p;
                    pX = '0'
                }
            }
            if ((pX).indexOf('%') >= 0) {
                pX = parseInt(pX, 10) * progress * rtlFactor + '%'
            } else {
                pX = pX * progress * rtlFactor + 'px'
            }
            if ((pY).indexOf('%') >= 0) {
                pY = parseInt(pY, 10) * progress + '%'
            } else {
                pY = pY * progress + 'px'
            }
            el.transform('translate3d(' + pX + ', ' + pY + ',0px)')
        }
        s.parallax = {
            setTranslate: function() {
                s.container.children('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function() {
                    setParallaxTransform(this, s.progress)
                });
                s.slides.each(function() {
                    var slide = $(this);
                    slide.find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function() {
                        var progress = Math.min(Math.max(slide[0].progress, -1), 1);
                        setParallaxTransform(this, progress)
                    })
                })
            },
            setTransition: function(duration) {
                if (typeof duration === 'undefined')
                    duration = s.params.speed;
                s.container.find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function() {
                    var el = $(this);
                    var parallaxDuration = parseInt(el.attr('data-swiper-parallax-duration'), 10) || duration;
                    if (duration === 0)
                        parallaxDuration = 0;
                    el.transition(parallaxDuration)
                })
            }
        };
        s._plugins = [];
        for (var plugin in s.plugins) {
            var p = s.plugins[plugin](s, s.params[plugin]);
            if (p)
                s._plugins.push(p)
        }
        s.callPlugins = function(eventName) {
            for (var i = 0; i < s._plugins.length; i++) {
                if (eventName in s._plugins[i]) {
                    s._plugins[i][eventName](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
                }
            }
        }
        ;
        function normalizeEventName(eventName) {
            if (eventName.indexOf('on') !== 0) {
                if (eventName[0] !== eventName[0].toUpperCase()) {
                    eventName = 'on' + eventName[0].toUpperCase() + eventName.substring(1)
                } else {
                    eventName = 'on' + eventName
                }
            }
            return eventName
        }
        s.emitterEventListeners = {};
        s.emit = function(eventName) {
            if (s.params[eventName]) {
                s.params[eventName](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
            }
            var i;
            if (s.emitterEventListeners[eventName]) {
                for (i = 0; i < s.emitterEventListeners[eventName].length; i++) {
                    s.emitterEventListeners[eventName][i](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
                }
            }
            if (s.callPlugins)
                s.callPlugins(eventName, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
        }
        ;
        s.on = function(eventName, handler) {
            eventName = normalizeEventName(eventName);
            if (!s.emitterEventListeners[eventName])
                s.emitterEventListeners[eventName] = [];
            s.emitterEventListeners[eventName].push(handler);
            return s
        }
        ;
        s.off = function(eventName, handler) {
            var i;
            eventName = normalizeEventName(eventName);
            if (typeof handler === 'undefined') {
                s.emitterEventListeners[eventName] = [];
                return s
            }
            if (!s.emitterEventListeners[eventName] || s.emitterEventListeners[eventName].length === 0)
                return;
            for (i = 0; i < s.emitterEventListeners[eventName].length; i++) {
                if (s.emitterEventListeners[eventName][i] === handler)
                    s.emitterEventListeners[eventName].splice(i, 1)
            }
            return s
        }
        ;
        s.once = function(eventName, handler) {
            eventName = normalizeEventName(eventName);
            var _handler = function() {
                handler(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]);
                s.off(eventName, _handler)
            };
            s.on(eventName, _handler);
            return s
        }
        ;
        s.a11y = {
            makeFocusable: function($el) {
                $el.attr('tabIndex', '0');
                return $el
            },
            addRole: function($el, role) {
                $el.attr('role', role);
                return $el
            },
            addLabel: function($el, label) {
                $el.attr('aria-label', label);
                return $el
            },
            disable: function($el) {
                $el.attr('aria-disabled', true);
                return $el
            },
            enable: function($el) {
                $el.attr('aria-disabled', false);
                return $el
            },
            onEnterKey: function(event) {
                if (event.keyCode !== 13)
                    return;
                if ($(event.target).is(s.params.nextButton)) {
                    s.onClickNext(event);
                    if (s.isEnd) {
                        s.a11y.notify(s.params.lastSlideMessage)
                    } else {
                        s.a11y.notify(s.params.nextSlideMessage)
                    }
                } else if ($(event.target).is(s.params.prevButton)) {
                    s.onClickPrev(event);
                    if (s.isBeginning) {
                        s.a11y.notify(s.params.firstSlideMessage)
                    } else {
                        s.a11y.notify(s.params.prevSlideMessage)
                    }
                }
                if ($(event.target).is('.' + s.params.bulletClass)) {
                    $(event.target)[0].click()
                }
            },
            liveRegion: $('<span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>'),
            notify: function(message) {
                var notification = s.a11y.liveRegion;
                if (notification.length === 0)
                    return;
                notification.html('');
                notification.html(message)
            },
            init: function() {
                if (s.params.nextButton && s.nextButton && s.nextButton.length > 0) {
                    s.a11y.makeFocusable(s.nextButton);
                    s.a11y.addRole(s.nextButton, 'button');
                    s.a11y.addLabel(s.nextButton, s.params.nextSlideMessage)
                }
                if (s.params.prevButton && s.prevButton && s.prevButton.length > 0) {
                    s.a11y.makeFocusable(s.prevButton);
                    s.a11y.addRole(s.prevButton, 'button');
                    s.a11y.addLabel(s.prevButton, s.params.prevSlideMessage)
                }
                $(s.container).append(s.a11y.liveRegion)
            },
            initPagination: function() {
                if (s.params.pagination && s.params.paginationClickable && s.bullets && s.bullets.length) {
                    s.bullets.each(function() {
                        var bullet = $(this);
                        s.a11y.makeFocusable(bullet);
                        s.a11y.addRole(bullet, 'button');
                        s.a11y.addLabel(bullet, s.params.paginationBulletMessage.replace(/{{index}}/, bullet.index() + 1))
                    })
                }
            },
            destroy: function() {
                if (s.a11y.liveRegion && s.a11y.liveRegion.length > 0)
                    s.a11y.liveRegion.remove()
            }
        };
        s.init = function() {
            if (s.params.loop)
                s.createLoop();
            s.updateContainerSize();
            s.updateSlidesSize();
            s.updatePagination();
            if (s.params.scrollbar && s.scrollbar) {
                s.scrollbar.set();
                if (s.params.scrollbarDraggable) {
                    s.scrollbar.enableDraggable()
                }
            }
            if (s.params.effect !== 'slide' && s.effects[s.params.effect]) {
                if (!s.params.loop)
                    s.updateProgress();
                s.effects[s.params.effect].setTranslate()
            }
            if (s.params.loop) {
                s.slideTo(s.params.initialSlide + s.loopedSlides, 0, s.params.runCallbacksOnInit)
            } else {
                s.slideTo(s.params.initialSlide, 0, s.params.runCallbacksOnInit);
                if (s.params.initialSlide === 0) {
                    if (s.parallax && s.params.parallax)
                        s.parallax.setTranslate();
                    if (s.lazy && s.params.lazyLoading) {
                        s.lazy.load();
                        s.lazy.initialImageLoaded = true
                    }
                }
            }
            s.attachEvents();
            if (s.params.observer && s.support.observer) {
                s.initObservers()
            }
            if (s.params.preloadImages && !s.params.lazyLoading) {
                s.preloadImages()
            }
            if (s.params.autoplay) {
                s.startAutoplay()
            }
            if (s.params.keyboardControl) {
                if (s.enableKeyboardControl)
                    s.enableKeyboardControl()
            }
            if (s.params.mousewheelControl) {
                if (s.enableMousewheelControl)
                    s.enableMousewheelControl()
            }
            if (s.params.hashnav) {
                if (s.hashnav)
                    s.hashnav.init()
            }
            if (s.params.a11y && s.a11y)
                s.a11y.init();
            s.emit('onInit', s)
        }
        ;
        s.cleanupStyles = function() {
            s.container.removeClass(s.classNames.join(' ')).removeAttr('style');
            s.wrapper.removeAttr('style');
            if (s.slides && s.slides.length) {
                s.slides.removeClass([s.params.slideVisibleClass, s.params.slideActiveClass, s.params.slideNextClass, s.params.slidePrevClass].join(' ')).removeAttr('style').removeAttr('data-swiper-column').removeAttr('data-swiper-row')
            }
            if (s.paginationContainer && s.paginationContainer.length) {
                s.paginationContainer.removeClass(s.params.paginationHiddenClass)
            }
            if (s.bullets && s.bullets.length) {
                s.bullets.removeClass(s.params.bulletActiveClass)
            }
            if (s.params.prevButton)
                $(s.params.prevButton).removeClass(s.params.buttonDisabledClass);
            if (s.params.nextButton)
                $(s.params.nextButton).removeClass(s.params.buttonDisabledClass);
            if (s.params.scrollbar && s.scrollbar) {
                if (s.scrollbar.track && s.scrollbar.track.length)
                    s.scrollbar.track.removeAttr('style');
                if (s.scrollbar.drag && s.scrollbar.drag.length)
                    s.scrollbar.drag.removeAttr('style')
            }
        }
        ;
        s.destroy = function(deleteInstance, cleanupStyles) {
            s.detachEvents();
            s.stopAutoplay();
            if (s.params.scrollbar && s.scrollbar) {
                if (s.params.scrollbarDraggable) {
                    s.scrollbar.disableDraggable()
                }
            }
            if (s.params.loop) {
                s.destroyLoop()
            }
            if (cleanupStyles) {
                s.cleanupStyles()
            }
            s.disconnectObservers();
            if (s.params.keyboardControl) {
                if (s.disableKeyboardControl)
                    s.disableKeyboardControl()
            }
            if (s.params.mousewheelControl) {
                if (s.disableMousewheelControl)
                    s.disableMousewheelControl()
            }
            if (s.params.a11y && s.a11y)
                s.a11y.destroy();
            s.emit('onDestroy');
            if (deleteInstance !== false)
                s = null
        }
        ;
        s.init();
        return s
    };
    Swiper.prototype = {
        isSafari: (function() {
            var ua = navigator.userAgent.toLowerCase();
            return (ua.indexOf('safari') >= 0 && ua.indexOf('chrome') < 0 && ua.indexOf('android') < 0)
        }
        )(),
        isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent),
        isArray: function(arr) {
            return Object.prototype.toString.apply(arr) === '[object Array]'
        },
        browser: {
            ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
            ieTouch: (window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 1) || (window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 1)
        },
        device: (function() {
            var ua = navigator.userAgent;
            var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
            var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
            var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
            var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
            return {
                ios: ipad || iphone || ipod,
                android: android
            }
        }
        )(),
        support: {
            touch: (window.Modernizr && Modernizr.touch === true) || (function() {
                return !!(('ontouchstart'in window) || window.DocumentTouch && document instanceof DocumentTouch)
            }
            )(),
            transforms3d: (window.Modernizr && Modernizr.csstransforms3d === true) || (function() {
                var div = document.createElement('div').style;
                return ('webkitPerspective'in div || 'MozPerspective'in div || 'OPerspective'in div || 'MsPerspective'in div || 'perspective'in div)
            }
            )(),
            flexbox: (function() {
                var div = document.createElement('div').style;
                var styles = ('alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient').split(' ');
                for (var i = 0; i < styles.length; i++) {
                    if (styles[i]in div)
                        return true
                }
            }
            )(),
            observer: (function() {
                return ('MutationObserver'in window || 'WebkitMutationObserver'in window)
            }
            )()
        },
        plugins: {}
    };
    var swiperDomPlugins = ['jQuery', 'Zepto', 'Dom7'];
    for (var i = 0; i < swiperDomPlugins.length; i++) {
        if (window[swiperDomPlugins[i]]) {
            addLibraryPlugin(window[swiperDomPlugins[i]])
        }
    }
    var domLib;
    if (typeof Dom7 === 'undefined') {
        domLib = window.Dom7 || window.Zepto || window.jQuery
    } else {
        domLib = Dom7
    }
    function addLibraryPlugin(lib) {
        lib.fn.swiper = function(params) {
            var firstInstance;
            lib(this).each(function() {
                var s = new Swiper(this,params);
                if (!firstInstance)
                    firstInstance = s
            });
            return firstInstance
        }
    }
    if (domLib) {
        if (!('transitionEnd'in domLib.fn)) {
            domLib.fn.transitionEnd = function(callback) {
                var events = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'], i, j, dom = this;
                function fireCallBack(e) {
                    if (e.target !== this)
                        return;
                    callback.call(this, e);
                    for (i = 0; i < events.length; i++) {
                        dom.off(events[i], fireCallBack)
                    }
                }
                if (callback) {
                    for (i = 0; i < events.length; i++) {
                        dom.on(events[i], fireCallBack)
                    }
                }
                return this
            }
        }
        if (!('transform'in domLib.fn)) {
            domLib.fn.transform = function(transform) {
                for (var i = 0; i < this.length; i++) {
                    var elStyle = this[i].style;
                    elStyle.webkitTransform = elStyle.MsTransform = elStyle.msTransform = elStyle.MozTransform = elStyle.OTransform = elStyle.transform = transform
                }
                return this
            }
        }
        if (!('transition'in domLib.fn)) {
            domLib.fn.transition = function(duration) {
                if (typeof duration !== 'string') {
                    duration = duration + 'ms'
                }
                for (var i = 0; i < this.length; i++) {
                    var elStyle = this[i].style;
                    elStyle.webkitTransitionDuration = elStyle.MsTransitionDuration = elStyle.msTransitionDuration = elStyle.MozTransitionDuration = elStyle.OTransitionDuration = elStyle.transitionDuration = duration
                }
                return this
            }
        }
    }
    window.Swiper = Swiper
}
)();
if (typeof (module) !== 'undefined') {
    module.exports = window.Swiper
} else if (typeof define === 'function' && define.amd) {
    define([], function() {
        'use strict';
        return window.Swiper
    })
}
;(function(win, doc, $) {
    $.kinerSwiperPanel = function(options) {
        var opts = $.extend(true, {}, $.kinerSwiperPanel.options, options);
        var nav = $(opts.navSelector)
          , con = $(opts.conSelector);
        var returnObj = {
            slideTo: function(index) {
                selectPanel(index, 2)
            },
            on: function(name, handler) {
                handlers[name] = handler
            },
            handlerNameList: {
                "change": "change"
            }
        };
        var handlers = {};
        con.addClass('swiper-container').find('.wrapper').addClass('swiper-wrapper').end().find('.kinerItem').addClass('swiper-slide');
        var len = nav.find('div').length;
        // nav.append('<div class="realBorder" style="width: ' + ((1 / len) * 100 + "%") + '"></div>');
        nav.find(".realBorder").css({
            width: (1 / len) * 100 + "%"
        });
        function getDirection(swiper) {
            return swiper.previousIndex > swiper.activeIndex ? "left" : swiper.previousIndex < swiper.activeIndex ? "right" : "none"
        }
        function movePanel(width, swiper) {
            var x = 0;
            var transform = con.find('.wrapper').css('transform');
            var res = $.trim(transform.split(",")[4]);
            if (res != undefined) {
                x = res;
                var direction = x <= nowLeft ? "right" : "left";
                x = Math.abs(parseFloat(x));
                var y = (x / (len * width)) * 100 - nowLeft
                  , pre = 0;
                pre = nowLeft + y;
                if (swiper) {
                    if (direction == "left" && swiper.activeIndex == 0) {
                        pre = -pre
                    }
                    if (direction == "right" && swiper.activeIndex == swiper.slides.length - 1) {}
                }
                if (pre <= nowLeft + Math.floor((1 / len) * 100) + 5) {
                    nav.find(".realBorder").css({
                        left: pre + "%",
                        "-webkit-transition": "none",
                        "-moz-transition": "none",
                        "-ms-transition": "none",
                        "-o-transition": "none",
                        "transition": "none"
                    })
                }
            }
        }
        var nowLeft = 0;
        var mySwiper = new Swiper(opts.conSelector + '.swiper-container',{
            direction: 'horizontal',
            observer: true,
            observeParents: true,
            onTouchStart: function(swiper) {
                nowLeft = ((parseInt(nav.find(".realBorder").css('left')) / swiper.width) * 100)
            },
            onTouchMove: function(swiper, e) {
                movePanel(swiper.width, swiper)
            },
            onTouchEnd: function(swiper) {},
            onSlideNextStart: function(swiper) {},
            onSlideChangeStart: function(swiper) {
                selectPanel(swiper.activeIndex, 0)
            },
            onTransitionStart: function(swiper) {
                var pre = 0;
                var direction = getDirection(swiper)
                  , index = swiper.activeIndex;
                if (index == 0) {
                    if (direction == "right") {
                        pre = Math.floor((1 / len) * 100)
                    } else if (direction == "left") {
                        pre = 0
                    }
                } else if (index == len) {
                    if (direction == "right") {
                        pre = Math.floor((len - 2 / len) * 100)
                    } else {
                        pre = Math.floor((len - 1 / len) * 100)
                    }
                } else {
                    pre = Math.floor((index / len) * 100)
                }
                nav.find(".realBorder").css({
                    left: pre + "%",
                    "-webkit-transition": "left 300ms ease",
                    "-moz-transition": "left 300ms ease",
                    "-ms-transition": "left 300ms ease",
                    "-o-transition": "left 300ms ease",
                    "transition": "left 300ms ease"
                })
            }
        });
        $(win).resize(function() {
            mySwiper.update()
        });
        nav.on('click', 'div', function(e) {
            if ($(this).hasClass('active')) {
                return
            }
            nav.find(".realBorder").css({
                left: $(this).index() == 0 ? 0 : Math.floor((($(this).index() - 1) / len) * 100) + "%",
                "-webkit-transition": "left 300ms ease",
                "-moz-transition": "left 300ms ease",
                "-ms-transition": "left 300ms ease",
                "-o-transition": "left 300ms ease",
                "transition": "left 300ms ease"
            });
            selectPanel($(this).index(), 1, e, this)
        });
        function selectPanel(index, type, e, ele) {
            nav.find("div").removeClass('active').eq(index).addClass('active');
            var len = nav.find('div').length;
            if (type == 0) {
                handlers[returnObj.handlerNameList.change] && handlers[returnObj.handlerNameList.change].call(ele, index, e)
            } else if (type == 1) {
                mySwiper.slideTo(index, opts.time)
            } else if (type == 2) {
                nav.find(".realBorder").css({
                    left: index == 0 ? 0 : Math.floor((index / len) * 100) + "%",
                    "-webkit-transition": "left 300ms ease",
                    "-moz-transition": "left 300ms ease",
                    "-ms-transition": "left 300ms ease",
                    "-o-transition": "left 300ms ease",
                    "transition": "left 300ms ease"
                });
                mySwiper.slideTo(index, opts.time)
            }
        }
        return returnObj
    }
    ;
    $.kinerSwiperPanel.options = {
        time: 300
    }
}
)(window, document, $);
$(function() {
    var ksp = $.kinerSwiperPanel({
        navSelector: ".kinerNav",
        conSelector: ".kinerContent"
    });
    $('.btn').click(function() {
        var index = $(this).attr("data-slideTo");
        console.log(index);
        ksp.slideTo(index)
    });
    ksp.on(ksp.handlerNameList.change, function(activeIndex, event) {
        $('.eventPanel').text("事件回调信息: 面板已切换至" + (activeIndex + 1) + "号面板")
    })
});
