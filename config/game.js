var basepath = 'content/games/';
var homelist = [
	'00000000',
	'00000001',
	'00000002',
	'00000003',
	'00000004',
	'00000005',
	'00000006',
	'00000007',
	'00000008',
	'00000009'
]
var gamelist = {
	
	'00000000' : {
		'name' : '2048',
		'gdes' : '2048数字组合是一款非常有意思的益智小游戏。游戏操作简单，通过移动数字，让相同方块不断的叠加，最后让数字到达2048即可取得胜利，非常需要技巧的，有兴趣的朋友来试试哦',
		'type' : '游戏类型'
	},

	'00000001' : {
		'name' : '暴打神经猫',
		'gdes' : '一款非常具有挑战性的小游戏，可恶的神经猫总是出现在我们的眼前，现在我们就快到游戏中将它们全部都给消灭，赶紧进入游戏中30秒内看你能打爆几只神经猫',
		'type' : '游戏类型'
	},

	'00000002' : {
		'name' : '一个都不能死',
		'gdes' : '这是一个极度虐心的游戏，这是一个让你欲罢不能的游戏，笨拙小鸟算什么，玩了这款游戏绝对让你上瘾！游戏如名字，两个人一个都不出现问题，叫上你的最佳搭档，来挑战吧',
		'type' : '游戏类型'
	},

	'00000003' : {
		'name' : '最强电灯泡',
		'gdes' : '最强电灯泡是一款再简单不过的html5游戏，这款小游戏中，虽然操作简单，但是要在最少的步数之内点亮所有灯泡，难度还是非常大的，不过如果你有技巧的话，对你来说就不会是难事啦。你每走一步，系统都会有记录，累计一定的步数后，如果你还无法完成的话，小编真的就无话可说啦，不信那就试试吧!',
		'type' : '游戏类型'
	},

	'00000004' : {
		'name' : 'XXOO',
		'gdes' : '一款非常考验你反应能力的休闲类型的小游戏，玩家需要根据画面提示来进行操作，如果是X就画个O，如果是O就画个X。玩法很简单，实际上难度很难！',
		'type' : '游戏类型'
	},

	'00000005' : {
		'name' : '小蜜蜂',
		'gdes' : '80年代风靡一时的射击游戏，相信玩过FC游戏的玩家都会对这个游戏印象深刻。一起来试一试吧！',
		'type' : '游戏类型'
	},

	'00000006' : {
		'name' : '最强眼力',
		'gdes' : '金币藏在杯子里，快速转动着。翻转后，你是否能一眼找到它呢？这可是很考验眼力和记忆力的哦',
		'type' : '游戏类型'
	},

	'00000007' : {
		'name' : '切水果',
		'gdes' : '“切水果”是一款简单的休闲游戏。主要内容是切掉屏幕上不断跳出的各种水果：西瓜，凤梨，猕猴桃，草莓，蓝莓，香蕉，苹果等等。它要求玩家动作速度要快、准。一旦砍到炸弹，游戏就结束了',
		'type' : '游戏类型'
	},

	'00000008' : {
		'name' : '最坑人的辨色大比拼',
		'gdes' : '辨色大比拼通过有趣的心理游戏训练你的眼睛和大脑的反应协调能力...',
		'type' : '游戏类型'
	},

	'00000009' : {
		'name' : 'Dragon dry adulterer',
		'gdes' : 'Dragon dry adulterer是一款非常休闲的简单射击的html5游戏，这款英文小游戏的译名为龙干奸夫，听着好像真有奸夫似的，游戏操作简单，用鼠标轻轻移动Dragon，看到沿着城墙向上的奸夫，用你手中的武器干掉他们。不过战斗归战斗，你每干掉一个奸夫，系统就会自动给你奖励，不要忘了收集它们哦，加油吧!',
		'type' : '游戏类型'
	},

	'00000010' : {
		'name' : '读心术',
		'gdes' : '怪兽读心术，一款非常神奇的读心术测试微信小游戏。据说只有3%的人能识破其中的原理噢',
		'type' : '游戏类型'
	},

	'10000012' : {
		'name' : '萝莉来了',
		'gdes' : '萌主萝莉喜欢打飞机的挑战，是不是宅男都会很兴奋啊。一款完全女性视角的飞行射击类游戏，萌妹子教你怎么打飞机，还不赶紧来试试！',
		'type' : '射击'
	},

	'10000013' : {
		'name' : '滚滚足球',
		'gdes' : '滚滚足球这款有关于足球的html5游戏，在这款游戏中为玩家提供了丰富的关卡需要你让足球可以射门进球，其中在第一关的时候还会给出叫你操作的提示。游戏以清爽的画面、鲜艳的色彩呈现，喜欢的玩家可以加入其中挑战一关关不同难度的关卡，能不能全部都射门成功就要看你操作的方式是否正确了',
		'type' : '休闲'
	},

	'10000014' : {
		'name' : '看你有多色',
		'gdes' : '一款基于Html5技术、挑战人类眼球对颜色的分辨能力、好玩易上手的小游戏',
		'type' : ''
	},

	'10000015' : {
		'name' : '一笔画线',
		'gdes' : '一款简单又考验平面逻辑思维的游戏，操作简单，不过画的时候要一笔呵成。',
		'type' : ''
	},

	'10000016' : {
		'name' : '围住神经猫',
		'gdes' : '这只跳来跳去发神经的喵最近也是火到不行，赶快来试试围住它，根本停不下来，感觉自己萌萌哒！',
		'type' : ''
	}

}
