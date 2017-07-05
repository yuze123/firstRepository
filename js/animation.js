var animation = {
	toUp : function () {
		// body...
		var eleTop = parseInt($('.toUp').css('margin-top')) || 0;               //提前获取目标元素的margin-top 值
		var eleBottom = parseInt($('.toUp').css('margin-bottom')) || 0;         //提前获取目标元素的margin-bottom值
		$('.toUp').on({                                                    //为目标元素绑定事件
			'mouseenter': function () {
				$(this).stop().animate({                                    //添加动画前先清除动画
					'margin-top': eleTop - 10 + 'px',                   //减小元素margin-top值，使元素"向上浮动"
					'margin-bottom' : eleBottom + 10 + 'px' //为防止后续元素跟着"向上浮动"，加大元素margin-bottom值
				},0);
			},
			'mouseleave': function() {
				$(this).stop().animate({                                          //添加动画前先清除动画
					'margin-top': eleTop + 'px',								  //还原元素原来值
					'margin-bottom' : eleBottom + 'px'
				},0);
			}
		});
	},

	toLeft : function () {
		// body...
		var eleLeft = parseInt($('.toLeft').css('margin-left')) || 0;             //提前获取目标元素的margin-left 值
		$('.toLeft').on({                                                    //为目标元素绑定事件
			'mouseenter': function () {
				$(this).stop().animate({                                   //添加动画前先清除动画
					'margin-left':eleLeft - 10 + 'px'				//减小元素margin-left值，使元素"向左浮动"
				},50);
			},
			'mouseleave': function() {
				$(this).stop().animate({                                   //添加动画前先清除动画
					'margin-left':eleLeft + 'px'                      //还原元素原来值
				},50);
			}
		});
	},

	toRight : function () {
		// body...
		var eleRight = parseInt($('.toRight').css('margin-Right')) || 0;          //提前获取目标元素的margin-right值
		$('.toRight').on({                                                    //为目标元素绑定事件
			'mouseenter': function () {
				$(this).stop().animate({                                          //添加动画前先清除动画
					'margin-right':eleRight - 10 + 'px'               //减小元素margin-right值，使元素"向右浮动"
				},50);
			},
			'mouseleave': function() {
				$(this).stop().animate({                                          //添加动画前先清除动画
					'margin-right':eleRight + 'px'                      //还原元素原来值
				},50);
			}
		});
	},

	toBiger : function () {
		//body
		var eleWidth = parseInt($('.toBiger img').width());                       //提前获取目标元素的width值   
		var eleHeight = parseInt($('.toBiger img').height());                     //提前获取目标元素的height值     
		var eleTop = parseInt($('.toBiger img').css('margin-top'));               //提前获取目标元素的margin-top值
		var eleLeft = parseInt($('.toBiger img').css('margin-left'));             //提前获取目标元素的margin-left值
		$('.toBiger img').on({                                                    //为目标元素绑定事件
			'mouseenter': function () {
				$(this).stop().animate({                                          //添加动画前先清除动画
					'width' : eleWidth + 10 + 'px',                               //增大图片宽度
					'height' : eleHeight + 10 + 'px',							  //增大图片高度
					'margin-top' : eleTop - 10 + 'px',             //使图片"向上浮动",并同时"向两边浮动"
					'margin-left' : eleLeft - 5 + 'px'  //css中隐去图片超过父盒子的部分，是图片看起来有"放大"的效果
				},50);
			},
			'mouseleave' : function () {
				$(this).stop().animate({                                          //添加动画前先清除动画
					'width' : eleWidth + 'px',									  //还原元素原来值
					'height' : eleHeight + 'px',
					'margin-top' : eleTop + 'px',
					'margin-left' : eleLeft + 'px'
				},50);
			}
		});
	}
}

$(window).on('load',function () {
	//在window触发load事件后，依次触发以下事件，为目标元素绑定相应事件
	animation.toBiger();
	animation.toUp();
	animation.toLeft();
	animation.toRight();
});