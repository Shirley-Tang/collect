 /*
关于此插件的一些说明

建议使用此插件的HTML结构如下
<ul id="parentID">
    <li><img src=""></li>
    <li><img src=""></li>
    <li><img src=""></li>
    <li><img src=""></li>
    <li><img src=""></li>
</ul>

li标签上加上transition可以有透明渐进效果
transition: opacity 1s ease-in-out;
 */

var autoPlay = function(parentID,childTag) {
    var pics = document.getElementById(parentID);
    var items = pics.getElementsByTagName(childTag);
    var len = items.length;
    var index = 0;
    showItem();
    function showItem() {
        hideItems();
        items[index].style.opacity = 1;
        if (index > len-2) {
            index = 0;
        } else {
            index++;
        }
        setTimeout(showItem,2500);
    }
    //所有图片透明度设为0
    function hideItems() {
        for (var i = 0; i < len; i++) {
            items[i].style.opacity = 0;
        }
    }
}