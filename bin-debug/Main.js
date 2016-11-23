var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=Main,p=c.prototype;
    Main.getInstance = function () {
        return this;
    };
    p.onAddToStage = function (event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    };
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    p.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    };
    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    p.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    p.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    p.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    p.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    p.showPanel = function (task, tag) {
        //任务面板
        if (tag == "taskpanel not accept0" || tag == "taskpanel submitted0") {
            Main.taskPanelContent1.x = 300;
            Main.taskPanelContent1.y = 50;
            Main.taskPanelContent1.size = 20;
            Main.taskPanelContent1.text = "无进行中的任务";
            Main.taskPanelContent2.text = "";
            Main.taskPanelContent3.text = "";
            Main.taskPanelContent4.text = "";
        }
        else if (tag == "taskpanel acceptted0" || tag == "taskpanel cansubmit0") {
            Main.taskPanelContent1.x = 300;
            Main.taskPanelContent1.y = 50;
            Main.taskPanelContent1.size = 20;
            Main.taskPanelContent1.text = "任务名称: " + task.getName();
            Main.taskPanelContent2.x = 300;
            Main.taskPanelContent2.y = 100;
            Main.taskPanelContent2.size = 20;
            Main.taskPanelContent2.text = "发布任务NPC: " + task.getFromNpcId();
            Main.taskPanelContent3.x = 300;
            Main.taskPanelContent3.y = 150;
            Main.taskPanelContent3.size = 20;
            Main.taskPanelContent3.text = "完成任务NPC: " + task.getToNpcId();
            Main.taskPanelContent4.x = 300;
            Main.taskPanelContent4.y = 200;
            Main.taskPanelContent4.size = 20;
            Main.taskPanelContent4.text = "任务状态： " + task.getStatus();
        }
        if (tag == "taskpanel not accept1" || tag == "taskpanel submitted1") {
            Main.taskPanelContent1.x = 300;
            Main.taskPanelContent1.y = 50;
            Main.taskPanelContent1.size = 20;
            Main.taskPanelContent1.text = "无进行中的任务";
            Main.taskPanelContent2.text = "";
            Main.taskPanelContent3.text = "";
            Main.taskPanelContent4.text = "";
        }
        else if (tag == "taskpanel acceptted1" || tag == "taskpanel cansubmit1") {
            Main.taskPanelContent1.x = 300;
            Main.taskPanelContent1.y = 50;
            Main.taskPanelContent1.size = 20;
            Main.taskPanelContent1.text = "任务名称: " + task.getName();
            Main.taskPanelContent2.x = 300;
            Main.taskPanelContent2.y = 100;
            Main.taskPanelContent2.size = 20;
            Main.taskPanelContent2.text = "发布任务NPC: " + task.getFromNpcId();
            Main.taskPanelContent3.x = 300;
            Main.taskPanelContent3.y = 150;
            Main.taskPanelContent3.size = 20;
            Main.taskPanelContent3.text = "完成任务NPC: " + task.getToNpcId();
            Main.taskPanelContent4.x = 300;
            Main.taskPanelContent4.y = 200;
            Main.taskPanelContent4.size = 20;
            Main.taskPanelContent4.text = "任务状态： " + task.getStatus();
        }
        //对话面板
        if (tag == "accept0") {
            Main.dialogPanelContent1.x = 100;
            Main.dialogPanelContent1.y = 600;
            Main.dialogPanelContent1.text = "任务名称: " + task.getName();
            Main.dialogPanelContent2.x = 200;
            Main.dialogPanelContent2.y = 650;
            Main.dialogPanelContent2.text = "发布任务NPC: " + task.getFromNpcId();
            Main.dialogPanelContent3.x = 200;
            Main.dialogPanelContent3.y = 700;
            Main.dialogPanelContent3.text = "完成任务NPC: " + task.getToNpcId();
            Main.dialogPanelContent4.x = 200;
            Main.dialogPanelContent4.y = 750;
            Main.dialogPanelContent4.text = "任务状态： " + task.getStatus();
            Main.dialogPanelButton.x = 300;
            Main.dialogPanelButton.y = 800;
            Main.dialogPanelButton.text = "接受";
            Main.dialogPanelButton.touchEnabled = true;
            Main.dialogPanelButton.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                Main.dialogPanelButton.text = "";
                Main.dialogPanelContent1.text = "";
                Main.dialogPanelContent2.text = "";
                Main.dialogPanelContent3.text = "";
                Main.dialogPanelContent4.text = "";
                task.onAccept();
            }, this);
        }
        else if (tag == "finish0") {
            Main.dialogPanelContent1.x = 100;
            Main.dialogPanelContent1.y = 600;
            Main.dialogPanelContent1.text = "任务名称: " + task.getName();
            Main.dialogPanelContent2.x = 200;
            Main.dialogPanelContent2.y = 650;
            Main.dialogPanelContent2.text = "发布任务NPC: " + task.getFromNpcId();
            Main.dialogPanelContent3.x = 200;
            Main.dialogPanelContent3.y = 700;
            Main.dialogPanelContent3.text = "完成任务NPC: " + task.getToNpcId();
            Main.dialogPanelContent4.x = 200;
            Main.dialogPanelContent4.y = 750;
            Main.dialogPanelContent4.text = "任务状态： " + task.getStatus();
            Main.dialogPanelButton.x = 300;
            Main.dialogPanelButton.y = 800;
            Main.dialogPanelButton.text = "完成";
            Main.dialogPanelButton.touchEnabled = true;
            Main.dialogPanelButton.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                Main.dialogPanelButton.text = "";
                Main.dialogPanelContent1.text = "";
                Main.dialogPanelContent2.text = "";
                Main.dialogPanelContent3.text = "";
                Main.dialogPanelContent4.text = "";
                task.onSubmit();
            }, this);
        }
        if (tag == "accept1") {
            Main.dialogPanelContent1.x = 100;
            Main.dialogPanelContent1.y = 600;
            Main.dialogPanelContent1.text = "任务名称: " + task.getName();
            Main.dialogPanelContent2.x = 200;
            Main.dialogPanelContent2.y = 650;
            Main.dialogPanelContent2.text = "发布任务NPC: " + task.getFromNpcId();
            Main.dialogPanelContent3.x = 200;
            Main.dialogPanelContent3.y = 700;
            Main.dialogPanelContent3.text = "完成任务NPC: " + task.getToNpcId();
            Main.dialogPanelContent4.x = 200;
            Main.dialogPanelContent4.y = 750;
            Main.dialogPanelContent4.text = "任务状态： " + task.getStatus();
            Main.dialogPanelButton.x = 300;
            Main.dialogPanelButton.y = 800;
            Main.dialogPanelButton.text = "接受";
            Main.dialogPanelButton.touchEnabled = true;
            Main.dialogPanelButton.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                Main.n1Emoji.text = "";
                Main.dialogPanelButton.text = "";
                Main.dialogPanelContent1.text = "";
                Main.dialogPanelContent2.text = "";
                Main.dialogPanelContent3.text = "";
                Main.dialogPanelContent4.text = "";
                task.onAccept();
            }, this);
        }
        else if (tag == "finish1") {
            Main.dialogPanelContent1.x = 100;
            Main.dialogPanelContent1.y = 600;
            Main.dialogPanelContent1.text = "任务名称: " + task.getName();
            Main.dialogPanelContent2.x = 200;
            Main.dialogPanelContent2.y = 650;
            Main.dialogPanelContent2.text = "发布任务NPC: " + task.getFromNpcId();
            Main.dialogPanelContent3.x = 200;
            Main.dialogPanelContent3.y = 700;
            Main.dialogPanelContent3.text = "完成任务NPC: " + task.getToNpcId();
            Main.dialogPanelContent4.x = 200;
            Main.dialogPanelContent4.y = 750;
            Main.dialogPanelContent4.text = "任务状态： " + task.getStatus();
            Main.dialogPanelButton.x = 300;
            Main.dialogPanelButton.y = 800;
            Main.dialogPanelButton.text = "完成";
            Main.dialogPanelButton.touchEnabled = true;
            Main.dialogPanelButton.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                Main.dialogPanelButton.text = "";
                Main.dialogPanelContent1.text = "";
                Main.dialogPanelContent2.text = "";
                Main.dialogPanelContent3.text = "";
                Main.dialogPanelContent4.text = "";
                task.onSubmit();
            }, this);
        }
    };
    p.showEmoji = function (emoji) {
        //task0
        if (emoji == "yellow !0") {
            Main.n0Emoji.text = "黄色叹号";
            Main.n0Emoji.x = 40;
            Main.n0Emoji.y = 220;
            Main.n0Emoji.size = 20;
            Main.n0Emoji.textColor = 0xFFFF00;
        }
        else if (emoji == "yellow ?0") {
            Main.n0Emoji.text = "";
            Main.n1Emoji.text = "黄色问号";
            Main.n1Emoji.x = 340;
            Main.n1Emoji.y = 530;
            Main.n1Emoji.size = 20;
            Main.n1Emoji.textColor = 0xFFFF00;
        }
        else if (emoji == "0") {
            Main.n0Emoji.text = "";
            Main.n1Emoji.text = "";
        }
        //task1
        if (emoji == "yellow !1") {
            Main.n1Emoji.text = "黄色叹号";
            Main.n1Emoji.x = 340;
            Main.n1Emoji.y = 530;
            Main.n1Emoji.size = 20;
            Main.n1Emoji.textColor = 0xFFFF00;
        }
        else if (emoji == "yellow ?1") {
            Main.n1Emoji.text = "";
            Main.n0Emoji.text = "黄色问号";
            Main.n0Emoji.x = 40;
            Main.n0Emoji.y = 220;
            Main.n0Emoji.size = 20;
            Main.n0Emoji.textColor = 0xFFFF00;
        }
        else if (emoji == "1") {
            Main.n0Emoji.text = "";
            Main.n1Emoji.text = "";
        }
    };
    p.createGameScene = function () {
        var bg = new egret.Shape();
        bg.graphics.beginFill(0x336699);
        bg.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
        bg.graphics.endFill();
        this.addChild(bg);
        this.touchEnabled = true;
        var NPC0 = new NPC("npc_0");
        var NPC1 = new NPC("npc_1");
        var taskPanel = new TaskPanel("dialogpanel");
        var taskAllTimePanel = new TaskPanel("taskpanel");
        var taskService = TaskService.getInstance();
        var task = new Task("0", "将消息传递给另一个NPC", TaskStatus.ACCEPTABLE, "npc_0", "npc_1", "talk");
        var task1 = new Task("1", "杀10只怪", TaskStatus.UNACCEPTABLE, "npc_1", "npc_0", "kill");
        var N0 = this.createBitmapByName("NPC_jpg");
        N0.width = 156;
        N0.height = 198;
        N0.touchEnabled = true;
        N0.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            Main.click = true;
            TaskService.getInstance().notify(task);
            TaskService.getInstance().notify(task1);
        }, this);
        this.addChild(N0);
        var N1 = this.createBitmapByName("NPC_jpg");
        N1.x = 300;
        N1.y = 300;
        N1.width = 156;
        N1.height = 198;
        N1.touchEnabled = true;
        N1.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            Main.click = true;
            TaskService.getInstance().notify(task);
            TaskService.getInstance().notify(task1);
        }, this);
        this.addChild(N1);
        var killButton = new KillButton();
        var sceneService = SceneService.getInstance();
        sceneService.addObserver(killButton);
        var killButtonText = new egret.TextField();
        killButtonText.x = 200;
        killButtonText.y = 1000;
        killButtonText.text = "杀怪";
        killButtonText.touchEnabled = true;
        killButtonText.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            //相当于杀了怪
            sceneService.notify();
        }, this);
        this.addChild(killButtonText);
        this.addChild(Main.n0Emoji);
        this.addChild(Main.n1Emoji);
        this.addChild(Main.dialogPanelContent1);
        this.addChild(Main.dialogPanelContent2);
        this.addChild(Main.dialogPanelContent3);
        this.addChild(Main.dialogPanelContent4);
        this.addChild(Main.dialogPanelButton);
        this.addChild(Main.taskPanelContent1);
        this.addChild(Main.taskPanelContent2);
        this.addChild(Main.taskPanelContent3);
        this.addChild(Main.taskPanelContent4);
        taskService.addObserver(NPC0);
        taskService.addObserver(NPC1);
        taskService.addObserver(taskPanel);
        taskService.addObserver(taskAllTimePanel);
        taskService.addTask(task);
        taskService.addTask(task1);
        taskService.getTaskByCustomRule(function (taskList) {
            for (var i = 0; i < taskList.length; i++) {
                if (taskList[i].getStatus() == TaskStatus.ACCEPTABLE) {
                    taskService.notify(taskList[i]);
                    return taskList[i];
                }
            }
        });
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    p.startAnimation = function (result) {
        var self = this;
        var parser = new egret.HtmlTextParser();
        var textflowArr = [];
        for (var i = 0; i < result.length; i++) {
            textflowArr.push(parser.parser(result[i]));
        }
        var textfield = self.textfield;
        var count = -1;
        var change = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            var lineArr = textflowArr[count];
            self.changeDescription(textfield, lineArr);
            var tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, self);
        };
        change();
    };
    /**
     * 切换描述内容
     * Switch to described content
     */
    p.changeDescription = function (textfield, textFlow) {
        textfield.textFlow = textFlow;
    };
    /**
     * 创建游戏场景
     * Create a game scene
     */
    //对话任务面板的ui
    Main.dialogPanelContent1 = new egret.TextField();
    Main.dialogPanelContent2 = new egret.TextField();
    Main.dialogPanelContent3 = new egret.TextField();
    Main.dialogPanelContent4 = new egret.TextField();
    Main.dialogPanelButton = new egret.TextField();
    Main.taskPanelContent1 = new egret.TextField();
    Main.taskPanelContent2 = new egret.TextField();
    Main.taskPanelContent3 = new egret.TextField();
    Main.taskPanelContent4 = new egret.TextField();
    //emoji
    Main.n0Emoji = new egret.TextField();
    Main.n1Emoji = new egret.TextField();
    return Main;
}(egret.DisplayObjectContainer));
egret.registerClass(Main,'Main');
//# sourceMappingURL=Main.js.map