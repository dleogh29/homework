
(function(global, document, FDS) {
    'use strict';
    
    var tdl_form = FDS.selector('.tdl-form');
    var tdl_input_wrapper = FDS.selector('.tdl-input-wrapper');
    var tdl_text = FDS.selector('.tdl-text', tdl_input_wrapper);
    var btn_tdl_add = FDS.selector('.btn-tdl-add', tdl_input_wrapper);
    var tdl_list = FDS.selector('.tdl-list', tdl_form);
    var btn_del_selected = FDS.selector('.btn-del-selected', tdl_form);
    var alert_message = FDS.selector('.alert-message', tdl_form);
    var data = [];

    // console.log('tdl_list:', tdl_list);
    // console.log('tdl_form:', tdl_form);
    // console.log('tdl_text:', tdl_text);
    // console.log('btn_tdl_add:', btn_tdl_add);

    
    btn_tdl_add.onclick = tdlAddClickHandler;
    btn_del_selected.onclick = delSelectedClickHandler;

    function tdlAddClickHandler() {

        var tdl_text_value = tdl_text.value;
        if(!tdl_text_value) {
            alertMessage('입력란에 내용을 작성하세요.');
            return;
        }
        tdl_text.value = '';
        data.push(tdl_text_value);

//        <li class="tdl-list-item">
//            <input class="a11y-hidden" type="checkbox" name="tdl-registerd" id="tdl-registerd">
//            <label class="tdl-text" for="tdl-registerd">은행가기</label>
//            <button class="btn-tdl-del" type="submit">삭제</button>
//        </li>

        var tdl_list_item = document.createElement('li');
        tdl_list_item.setAttribute("class", "tdl-list-item");

        var tdl_registerd = document.createElement('input');
        var checkbox_id = "tdl-registerd" + data.length;
        tdl_registerd.setAttribute("class", "a11y-hidden");
        tdl_registerd.setAttribute("type", "checkbox");
        tdl_registerd.setAttribute("name", "tdl-registerd");
        tdl_registerd.setAttribute("id", checkbox_id);

        var tdl_check_label = document.createElement('label');
        tdl_check_label.setAttribute("class", "tdl-check-label");
        tdl_check_label.setAttribute("for", checkbox_id);
        tdl_check_label.innerText = tdl_text_value;

        var btn_tdl_del = document.createElement('button');
        btn_tdl_del.setAttribute("class", "btn-tdl-del");
        btn_tdl_del.setAttribute("type", "submit");
        
        tdl_list.appendChild(tdl_list_item).appendChild(tdl_registerd);
        tdl_list_item.appendChild(tdl_check_label);
        tdl_list_item.appendChild(btn_tdl_del);
        // console.log('tdl_list:', tdl_list);

        tdl_list_item.btn_del = btn_tdl_del;
        tdl_list_item.onmouseenter = listItemMouseenterHandler;
        tdl_list_item.onmouseleave = listItemMouseleaveHandler;

        btn_tdl_del.list_item = tdl_list_item;
        btn_tdl_del.onclick = btnDelOnclickHandler;
    }

    function delSelectedClickHandler() {
        var selected_checkbox = FDS.selectorAll('.tdl-list-item [type="checkbox"]:checked', tdl_list);
        if(selected_checkbox.length) {
            var length = selected_checkbox.length;
            for(var i = 0; i < length; i++) {
                tdl_list.removeChild(selected_checkbox[i].parentNode);
            }
        }
        else {
            alertMessage('삭제할 항목을 선택하세요.');
            return;
        }
    }

    function alertMessage(msg) {
        alert_message.classList.add('active');
        alert_message.innerText = msg;
        setTimeout(setAlertMessageNull, 3000);
    }

    function setAlertMessageNull() {
        alert_message.innerText = '';
        alert_message.classList.remove('active');
    }

    function listItemMouseenterHandler() {
        this.btn_del.classList.add('active');
    }
    function listItemMouseleaveHandler() {
        this.btn_del.classList.remove('active');
    }

    function btnDelOnclickHandler() {
        tdl_list.removeChild(this.list_item);
    }
})(window, window.document, window.FDS);