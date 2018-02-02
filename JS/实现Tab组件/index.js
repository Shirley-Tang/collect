/**
 * Tab 组件
 * @param {String} containerId 容器Id
 */
function Tab(containerId) {
    var container = document.getElementById(containerId);
    this.container = container;
    this.tabItems = container.querySelectorAll('.tab-item');
    this.panels = container.querySelectorAll('.panel');
}

/**
 * active 方法，可以控制第几个 Tab 组件显示
 * @param {Number} index 要显示的 tab 的序号，从0开始
 */
Tab.prototype.active = function(index) {
    // 如果当前 toActive 等于当前 active 元素
    if (index === this.activeIndex) {
        return;
    }
    this.tabItems.forEach(function(tabItem, i) {
        // 获取元素的 href 属性作为目标的 id
        var targetId = tabItem.getAttribute('href');
        var targetPanel = this.container.querySelectorAll('#' + targetId)[0];
        if (!targetPanel) return;
        // 如果序号等于目标序号，则加类名和显示内容框
        if (index === i) {
            targetPanel.style.display = 'block';
            tabItem.classList.add('active');
            this.activeIndex = i;
        // 如果不等于目标序号，则要去掉类名和隐藏内容框
        } else {
            targetPanel.style.display = 'none';
            tabItem.classList.remove('active');
        }
    }, this);
}

Tab.prototype.listenEvents = function() {
    let self = this;
    this.container.addEventListener('click',function(e) {
        var target = e.target;
        if (target.className && target.className === 'tab-item') {
            var children = target.parentNode.children;
            var index = -1;
            for (var i = 0; i < children.length; i++) {
                if (children[i] === target) {
                    index = i;
                }
            }
            if (index >= 0) {
                self.active(index);
            }
        }
    });
}

var tab = new Tab('container1');
tab.active(0);
tab.listenEvents();
var tab2 = new Tab('container2');
tab2.active(0);
tab2.listenEvents();