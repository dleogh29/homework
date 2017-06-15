/*! utils.js @ 2017, dhlee */


// 전역과 구분되는 독립된 공간을 형성
// 모듈을 구현해서 내부에 접근 가능한 객체를 만들자.

var FDS = function(global){
    //클로저 영역

    /**
     * JavaScript 데이터 유형을 완벽하게 문자열로 반환하는 유틸리티 함수
     * 
     * @global
     * @func    type
     * @param   {any} data - JavaScript 모든 데이터 유형
     * @returns {String} - 데이터 유형 이름을 소문자 문자열로 반환
     */
    function type(data) {
        return Object.prototype.toString.call(data).slice(8, -1).toLowerCase();
    }


    /**
     * JavaScript 데이터 유형 체크하는 유틸리티 함수
     * 
     * @global
     * @func    isType
     * @param   {any} data - JavaScript 모든 데이터 유형
     * @param   {String} data_type - 소문자인 JavaScript 데이터 유형 이름
     * @returns {Boolean}
     */
    function isType(data, data_type) {
        validate(data_type, 'string', 'data_type 전달 인자는 문자열이 전달되어야 합니다');

        return type(data) === data_type;
    }


    /**
     * 두 가지 데이터 유형 이름(문자열) 유효성 체크하는 유틸리티 함수
     * 
     * @global
     * @func    validate
     * @param   {any} data_type - 소문자인 JavaScript 데이터 유형 이름
     * @param   {any} compare_data_type - 소문자인 JavaScript 데이터 유형 이름(비교 대상)
     * @param   {any} throw_message - 예외 발생시 던질 메시지
     * @returns {boolean} - 두 데이터 유형이 같을 경우 true, 아닐 경우 return 없음(throw)
     */
    function validate(data_type, compare_data_type, throw_message) {
        if( type(data_type) === compare_data_type ) {
            return true;
        } else {
            throw throw_message;
        }
    }


    /**
     * 0 부터 parameter로 받은 값 미만의 정수를 랜덤하게 발생시키는 함수
     * 
     * @global
     * @func    randomNumber
     * @param   {any} value - 발생시킬 난수의 최대값-1
     * @default {number} - 2
     * @returns {number} - 0 부터 parameter로 받은 값 미만의 임의의 정수
     */
    function randomNumber(value) {
        value = value || 2;
        validate(value, 'number', '전달인자 유형은 number 이어야 합니다.');
        return Math.floor(Math.random() * value);
    }


    /**
     * @global
     * @func    randomRange
     * @param   {any} min  - 발생시킬 난수의 최소값
     * @param   {any} max  - 발생시킬 난수의 최대값
     * @returns {number} - min과 max 사이의 임의의 정수
     */
    function randomRange(min, max) {
        validate(min, 'number', '첫 번째 전달인자 유형은 number 이어야 합니다.');
        validate(max, 'number', '두 번째 전달인자 유형은 number 이어야 합니다.');

        if(max < min) {
            throw '두 번째 전달인자 값은 첫 번째 전달인자 값 보다 크거나 같아야 합니다.'
        }
        return min + randomNumber(max - min + 1);
    }


    /**
     * 데이터 타입이 Number 인지 체크하는 함수
     * 
     * @param {any} data -- JavaScript 모든 데이터 유형
     * @returns {boolean} -- Number 일 경우 true, 아닐 경우 false
     */
    function isNumber(data) {
        return isType(data, 'number') && !Number.isNaN(data);
    }


    /**
     * 데이터 타입이 String 인지 체크하는 함수
     * 
     * @param {any} data -- JavaScript 모든 데이터 유형
     * @returns {boolean} -- String 일 경우 true, 아닐 경우 false
     */
    function isString(data) {
        return isType(data, 'string');
    }


    /**
     * 데이터 타입이 Function 인지 체크하는 함수
     * 
     * @param {any} data -- JavaScript 모든 데이터 유형
     * @returns {boolean} -- Function 일 경우 true, 아닐 경우 false
     */
    function isFunction(data) {
        return isType(data, 'function');
    }


    /**
     * 데이터 타입이 Array 인지 체크하는 함수
     * 
     * @param {any} data -- JavaScript 모든 데이터 유형
     * @returns {boolean} -- Array 일 경우 true, 아닐 경우 false
     */
    function isArray(data) {
        return isType(data, 'array');
    }


    /**
     * 데이터 타입이 Object 인지 체크하는 함수
     * 
     * @param {any} data -- JavaScript 모든 데이터 유형
     * @returns {boolean} -- Object 일 경우 true, 아닐 경우 false
     */
    function isObject(data) {
        return isType(data, 'object');
    }


    /**
     * 유사 배열 객체를 배열 객체로 변경(복사) 처리하여 반환하는 유틸리티 함수
     * 
     * @param {any} obj - 유사 배열 객체 (배열과 흡사한 객체 e.g) arguments, NodeList )
     * @returns {Array}
     */
    function convertArray(obj) {
        if( !('length' in obj) ) {
            return [];
        }

        // var length = obj.length;
        // var arr = [];
        
        // for(var i = 0; i < length; i++) {
        //     arr.push(obj[i]);
        // }

        return Array.prototype.slice.call(obj);
    }


    /**
     * get DOM element by id
     * 
     * @private
     * @method
     * @param {any} id - tag id
     * @returns {HTMLElement}
     */
    function id(id) {
        validate(id, 'string', '전달인자는 문자열이어야 합니다.');
        return document.getElementById(id);
    };


    /**
     * get DOM elements by tagname
     * 
     * @private
     * @method
     * @param {any} name - tag name
     * @param {any} context - parent node
     * @returns {HTMLCollection}
     */
    function tagAll(name, context) {
        validate(name, 'string', '첫 번째 전달인자는 문자열이어야 합니다.');
        if(context && !isElementNode(context) && !isDocumentNode(context)) {
            throw '두 번째 전달인자는 요소노드이어야 합니다.';
        }
        return (context || document).getElementsByTagName(name);
    };


    /**
     * get DOM first element of HTMLCollection by tagname
     * 
     * @private
     * @method
     * @param {any} name - tag name
     * @param {any} context - parent node
     * @returns {HTMLElement}
     */
    function tag(name, context) {
        return tagAll(name, context)[0];
    }


    // IE 9+ 에서만 지원
    // function classes(name, context) {
    //     return (context||document).getElementsByClassName(name);
    // }

    // IE 8-에서도 호환되는 크로스 브라우징 유틸리티 메소드
    var classAll = function() {

        if('getElementsByClassNamse' in Element.prototype) {
            return function(name, context) {
                validate(name, 'string', '첫 번째 인자는 문자열을 전달해야 합니다.');
                context = (context || document);
                // validateElementNode(context, '두 번째 요소는 요소노드이어야 합니다.');
                if(!isDocumentNode(context) && !isElementNode(context)) {
                    throw '두 번째 인자는 요소 노드 또는 문서 노드를 전달해야 합니다.';
                }

                return context.getElementsByClassName(name);
            }
        } else {
            return function(name, context) {
                // name = 클래스 속성명
                // context = 상위 요소객체 | document(기본값)
                // context 객체 내부 또는 document 객체 내부에서 모든 요소를 수집한다.
                validate(name, 'string', '첫 번째 인자는 문자열을 전달해야 합니다.');
                context = context || document;
                if(!isDocumentNode(context) && !isElementNode(context)) {
                    throw '두 번째 인자는 요소 노드 또는 문서 노드를 전달해야 합니다.';
                }

                var all_els = tagAll('*', context);
                var match_collection = [];
                var regexp = new RegExp('\\s*' + name + '\\s*');
                for(var i = 0, l = all_els.length; i < l; i++) {
                    var el = all_els.item(i);
                    if(name && regexp.test(el.className)) {
                        match_collection.push(el);
                    }
                }
                return match_collection;
            }
        }
    }();


    function classSingle(name, context) {
        return classAll(name, context)[0];
    }


    function selectorAll(selector, context) {
        validate(selector, 'string', '첫 번째 인자는 문자열이어야 합니다.');

        context = context || document;

        if(!isElementNode(context) && !isDocumentNode(context)) {
            throw '두 번째 인자는 요소 노드 또는 문서 노드 이어야 합니다.'
        }


        return context.querySelectorAll(selector);
    }


    function selector(selector, context) {
        return selectorAll(selector, context)[0];
    }


    function isDocumentNode(node) {
        return node.nodeType === document.DOCUMENT_NODE;
    }


    function isElementNode(node) {
        return node.nodeType === document.ELEMENT_NODE;
    }


    function isTextNode(node) {
        return node.nodeType === document.TEXT_NODE;
    }


    /**
     * Element Node를 확인하는 함수
     * 
     * @param {Node} el_node - Node
     * @param {String} message - Node가 아닐 경우 던질 메시지
     */
    function validateElementNode(el_node, message) {
        if(!el_node || el_node.nodeType !== 1) {
            throw message;
        }
    }


    /**
     * 전달인자 노드의 첫 번째 요소노드를 반환하는 함수
     * 
     * @param {Node} el_node - Node
     * @param {HTMLElement} first_element - el_node의 첫 번째 자식 요소노드
     */
    var firstChild = function() {
        // if(Element.prototype.hasOwnProperty('firstElementChild')) {
        if('firstElementChild' in Element.prototype) {
            return function() {
                return this.firstElementChild;
            }
        } else {
            return function() {
                return this.children[0];
            }
        }

    }();
    Element.prototype.first = firstChild;
    /*
    var firstChild = function() {
        if('firstElementChild' in Element.prototype) {
            return function(el_node) {
                validateElementNode(el_node, '첫 번째 전달인자는 요소노드이어야 합니다.');
                return el_node.firstElementChild;
            }
        } else {
            return function(el_node) {
                validateElementNode(el_node, '첫 번째 전달인자는 요소노드이어야 합니다.');
                return el_node.children[0];
            }
        }

    }();
    */


    /**
     * 전달인자 노드의 마지막 요소노드를 반환하는 함수
     * 
     * @param {Node} el_node - Node
     * @param {HTMLElement} last_element - el_node의 마지막 자식 요소노드
     */
    var lastChild = function() {
        // if(Element.prototype.hasOwnProperty('lastElementChild')) {
        if('lastElementChild' in Element.prototype) {
            return function() {
                return this.lastElementChild;
            }
        } else {
            return function() {
                var children = this.children;
                return children[children.length-1];
            }
        }
    }();
    Element.prototype.last = lastChild;
    /*
    var lastChild = function() {
        // if(Element.prototype.hasOwnProperty('lastElementChild')) {
        if('lastElementChild' in Element.prototype) {
            return function(el_node) {
                validateElementNode(el_node, '첫 번째 전달인자는 요소노드이어야 합니다.');
                return el_node.lastElementChild;
            }
        } else {
            return function(el_node) {
                validateElementNode(el_node, '첫 번째 전달인자는 요소노드이어야 합니다.');
                var children = el_node.children;
                console.log('children[children.length]:', children[children.length-1]);
                return children[children.length-1];
            }
        }
    }();
    */

    var previousSibling = function() {
        if('previousElementSibling' in Element.prototype ) {
            return function() {
                return this.previousElementSibling;
            }
        } else {
            return function() {
                var el_node = this;
                do {
                    el_node = el_node.previousSibling;
                } while(el_node && el_node.nodeType !== 1)

                return el_node;
            }
        }
    }();
    Element.prototype.prev = previousSibling;
    /*
    var previousSibling = function() {
        if('previousElementSibling' in Element.prototype ) {
            return function(el_node) {
                validateElementNode(el_node, '첫 번째 전달인자는 요소노드이어야 합니다.');
                return el_node.previousElementSibling;
            }
        } else {
            return function(el_node) {
                validateElementNode(el_node, '첫 번째 전달인자는 요소노드이어야 합니다.');
                
                do {
                    el_node = el_node.previousSibling;
                } while(el_node && el_node.nodeType !== 1)

                return el_node;
            }
        }
    }();
    */

    
    var nextSibling = function() {
        if('nextElementSibling' in Element.prototype ) {
            return function() {
                return this.nextElementSibling;
            }
        } else {
            return function() {
                var el_node = this;
                do {
                    el_node = el_node.nextSibling;
                } while(el_node && el_node.nodeType !== 1)

                return el_node;
            }
        }
    }();
    Element.prototype.next = nextSibling;
    /*
    var nextSibling = function() {
        if('nextElementSibling' in Element.prototype ) {
            return function(el_node) {
                validateElementNode(el_node, '첫 번째 전달인자는 요소노드이어야 합니다.');
                return el_node.nextElementSibling;
            }
        } else {
            return function(el_node) {
                validateElementNode(el_node, '첫 번째 전달인자는 요소노드이어야 합니다.');
                
                do {
                    el_node = el_node.nextSibling;
                } while(el_node && el_node.nodeType !== 1)

                return el_node;
            }
        }
    }();
    */


    function parent(depth) {
        depth = depth || 1;
        var node = this;
        do {
            node = node.parentNode;
        } while(node && --depth)
        
        return node;
    }
    Element.prototype.parent = parent;
    /*
    function parent(node, depth) {
        depth = depth || 1;

        do {
            node = node.parentNode;
        } while(node && --depth)
        
        return node;
    }
    */


    function hasChild(context) {
        validateElementNode(context, '첫 번째 인자는 반드시 요소 노드이어야 합니다.');
        return context.hasChildNodes();
    }


    // DOM 생성 API
    function createElement(name) {
        validate(name, 'string', '첫 번째 전달인자는 문자열이어야 합니다.');

        return document.createElement(name); 
    }


    function createText(text) {
        validate(text, 'string', '첫 번째 전달인자는 문자열이어야 합니다.');
        
        return document.createTextNode(text);
    }

    // DOM 조작 API
    function appendChild(child, parent) {
        validateElementNode(parent, '두 번째 전달인자는 요소노드이어야 합니다.');
        parent.appendChild(child);
        return child;
    }
    function createEl(name, content) {
        validate(name, 'string', '첫 번째 전달인자는 문자열이어야 합니다.');
        var el = createElement(name);

        if(content && isType(content, 'string')) {
            var text = createText(content);
            appendChild(text, el);
        }

        return el;
    }

    // 클로저를 기억하는 객체를 반환
    // 전역에서 접근 가능한 네임스페이스 객체 FDS
    return {
        info: {
            author: "ldh",
            version: "1.0.0"
        },
        // 공개 API
        // Javascript 유틸리티
        type:           type,
        isType:         isType,
        validate:       validate,
        isNumber:       isNumber,
        isString:       isString,
        isFunction:     isFunction,
        isArray:        isArray,
        isObject:       isObject,
        convertArray:   convertArray,
        // DOM 선택 API
        id:             id,
        tagAll:         tagAll,
        tag:            tag,
        hasChild:       hasChild,
        classAll:       classAll,
        classSingle:    classSingle,
        selector:       selector,
        selectorAll:    selectorAll,
        createElement:  createElement,
        createText:     createText,
        appendChild:    appendChild,
        createEl:       createEl
        // parent:         parent
        // first:          firstChild,
        // last:           lastChild,
        // next:           nextSibling,
        // prev:           previousSibling

    };
}(window);