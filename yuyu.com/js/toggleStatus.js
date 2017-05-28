/*! toggleGrid.js @ 2017, yamoo9.net */

window.onload = function() {
  init();
}

var doc = document;
var body = doc.body;
var btn_carousel_array = null;
var prev_selected_carousel = null;
var btn_like_array = null;
var brand_slide_position = 0;

function init() {
  // (그리드 toggle, 로그인 전/후 toggle) key listener
  doc.addEventListener('keyup', toggleStatus);
  // 필터 설정 버튼 listener
  doc.getElementById('btn-filter').addEventListener('click', viewFilter);

  // 필터 초기화 버튼 listener
  doc.getElementById('btn-init').addEventListener('click', initFilter);

  // 캐러셀 버튼 listener
  btn_carousel_array = doc.getElementsByClassName('btn-m-carousel');
  for(var i = 0; i < btn_carousel_array.length; i++) {
    btn_carousel_array[i].addEventListener("click", showCarouselSlide.bind(btn_carousel_array[i], i));
  }
  // 선택된 캐러셀 엘리먼트(버튼) 저장(초기값 맨 앞 버튼)
  prev_selected_carousel = btn_carousel_array[0];

  // 좋아요 버튼 listener
  btn_like_array = doc.getElementsByClassName('btn-like');
  for(var i = 0; i < btn_like_array.length; i++) {
    btn_like_array[i].addEventListener('click', applyLike);
  }

  // 브랜드 슬라이드 버튼 listener
  doc.getElementById('btn-prev-brand').addEventListener('click', showBrandSlide.bind(null, 'prev'));
  doc.getElementById('btn-next-brand').addEventListener('click', showBrandSlide.bind(null, 'next'));
}


function toggleStatus(e) {
  if (e.keyCode === 71 && e.shiftKey ) {
    body.classList.toggle('show-grid');
  }

  if (e.keyCode === 76 && e.shiftKey) {
    doc.getElementsByClassName('login-after')[0].classList.toggle('hidden');
    doc.getElementsByClassName('login-before')[0].classList.toggle('hidden');
  }
}

function viewFilter(e) {
  doc.getElementsByClassName('filter-container')[0].classList.toggle('filter-on');
}

function initFilter() {
  var cb_filter_age_array = doc.getElementsByName('filter-age');
  var cb_filter_style_array = doc.getElementsByName('filter-style');
  for(var i = 0; i < cb_filter_age_array.length; i++) {
    cb_filter_age_array[i].checked = false;
  }
  for(var i = 0; i < cb_filter_style_array.length; i++) {
    cb_filter_style_array[i].checked = false;
  }
}

function showCarouselSlide(i) {
  var slideWidth = 1060;
  doc.getElementById('slide-list').style.transform = "translateX(-" + slideWidth * i + "px)";
  this.classList.toggle('selected-carousel');
  prev_selected_carousel.classList.toggle('selected-carousel');
  prev_selected_carousel = btn_carousel_array[i];
}

function applyLike() {
  this.classList.toggle('is-like');
}

function showBrandSlide(direction) {
  var brand_list = doc.getElementById('brand-list');
  var list_length = brand_list.getElementsByTagName('li').length;
  var list_item = brand_list.getElementsByTagName('li')[0];
  var list_item_width = list_item.offsetWidth;
  var list_item_gutter = window.getComputedStyle(list_item, null).marginLeft;
  var list_item_size = parseInt(list_item_gutter, 10) * 2 + list_item_width;
  
  var limit_position = list_length - 4;
  
  var list_style = doc.getElementById('brand-list').style;
  if(direction === "prev") {
    if(brand_slide_position === 0) {
      return;
    }
    list_style.transform += "translateX(" + list_item_size + "px)";
    brand_slide_position--;

  } else if(direction === "next") {
    if(brand_slide_position === limit_position) {
      return;
    }
    list_style.transform += "translateX(-" + list_item_size + "px)";
    brand_slide_position++;
  }
}