// 提示范围数据
var data = ['apple', 'banana', 'carambola', 'grape', 'lemon', 'orange', 'watermelon'];

// 获取所有的inputs
var $autocomplete = $('.autocomplete');
var $curInput;
var $window = $(window);
var $body = $(document.body);

/**
 * 1、完善 `input` 框 `focus` 事件绑定逻辑，当事件出发时，设置 `.autocomplete` 提示框显示，并定位到触发事件的输入框的正下方。
 * 注：要求同时只能出现一个 `.autocomplete` 提示框
 */
$body.on('focus', 'input', function() {
  // 获取输入框当前的位置
  var position = $(this).offset();
  var value = $(this).val();
  // 计算 $autocomplete 需要展示的位置
  $autocomplete.css({
    'left': position.left,
    'top': position.top + $(this).outerHeight(),
    'display': 'block'
  });
  // 更新当前的 input 对象
  $curInput = $(this);
  // 展示autoComplete
  autoComplete(value);
});
/**
 * 2、完善 `input` 输入框的 `keyup` 事件绑定逻辑，同时获取输入框内容，修改  `.autocomplete` 提示框的提示选项内容
 */
$body.on('keyup', 'input', function() {
  var value = $(this).val();
  autoComplete(value);
});
/**
 * 3、完善 `.autocomplete .item` 的 `click` 事件绑定逻辑，当点击提示框选项时，填充选项文本数据到相应的input框中
 */
$body.on('click', '.autocomplete .item', function() {
  var itemValue = $(this).text();
  $curInput.val(itemValue);
  $autocomplete.hide();
});

/**
 * 优化: 点击非input的地方则隐藏 $autocomplete
 */
$window.on('click', function(event) {
  var target = event.target;
  if (target.tagName !== 'INPUT') {
    $autocomplete.hide();
  }
});

/**
 * 展示提示框
 * @param [String] value 判断提示的文本
 */
function autoComplete(value) {
  var itemsArr = [];
  // 遍历数据筛选数据
  data.forEach(function (item) {
    if (item.indexOf(value) > -1) {
      itemsArr.push('<li class="item">' + item +'</li>');
    }
  });
  $autocomplete.html(itemsArr.join(''));
}