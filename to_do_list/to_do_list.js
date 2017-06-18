
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

    function tdlAddClickHandler() {

        var tdl_text_value = tdl_text.value.trim();
        tdl_text.value = '';
        if(!tdl_text_value) {
            alertMessage('입력란에 내용을 작성하세요.');
            return;
        }
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

        tdl_check_label.parent_list_item = tdl_list_item;
        tdl_check_label.ondblclick = checkDblclickHandler;
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

    function checkDblclickHandler() {
        var edit_wrapper = document.createElement('div');
        edit_wrapper.setAttribute('class', 'edit-wrapper');

        var inputText = document.createElement('input');
        inputText.setAttribute('class', 'tdl-text edit');
        inputText.setAttribute('type', 'text');
        inputText.value = this.innerText;

        // <button class="btn-tdl-confirm" type="submit">확인</button>
        // <button class="btn-tdl-cancel" type="submit">취소</button>
        var btn_tdl_confirm = document.createElement('button');
        btn_tdl_confirm.innerText = "확인";
        btn_tdl_confirm.setAttribute('class', 'btn-tdl-confirm');
        btn_tdl_confirm.setAttribute('type', 'submit');

        var btn_tdl_cancel = document.createElement('button');
        btn_tdl_cancel.innerText = "취소";
        btn_tdl_cancel.setAttribute('class', 'btn-tdl-cancel');
        btn_tdl_cancel.setAttribute('type', 'submit');


        edit_wrapper.appendChild(inputText);
        edit_wrapper.appendChild(btn_tdl_confirm);
        edit_wrapper.appendChild(btn_tdl_cancel);

        var parent_list_item = this.parent_list_item;
        parent_list_item.appendChild(edit_wrapper);

        inputText.focus();

        var items = {
            parent_list_item: parent_list_item,
            input_text: inputText,
            edit_wrapper: edit_wrapper,
            label: this
        };
        btn_tdl_confirm.onclick = confirmClickHander;
        btn_tdl_confirm.items = items;
        btn_tdl_cancel.onclick = cancelClickHander;
        btn_tdl_cancel.items = items;
    }

    function confirmClickHander() {
        var item = this.items;
        var text = item.input_text.value.trim();
        if(!text) {
            alertMessage('수정 입력란에 내용을 작성하세요.');
            item.input_text.focus();
            return;
        }

        item.label.innerText = text;
        item.parent_list_item.removeChild(item.edit_wrapper);
    }

    function cancelClickHander() {
        var item = this.items;
        item.parent_list_item.removeChild(item.edit_wrapper);
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