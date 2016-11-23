var TaskService = (function () {
    function TaskService() {
        this.taskList = [];
        this.observerList = [];
        TaskService.count++;
        if (TaskService.count > 1) {
            throw 'singleton!!!';
        }
    }
    var d = __define,c=TaskService,p=c.prototype;
    //获取TaskService的实例
    TaskService.getInstance = function () {
        if (TaskService.instance == null) {
            TaskService.instance = new TaskService();
        }
        return TaskService.instance;
    };
    //不公开数据，交给调用方处理
    p.getTaskByCustomRule = function (rule) {
        //拷贝数据
        var clone = this.taskList;
        //为传入函数增加了参数
        return rule(clone);
    };
    p.addTask = function (task) {
        this.taskList.push(task);
    };
    p.addObserver = function (observer) {
        this.observerList.push(observer);
    };
    p.removeObserver = function (observer) {
        //排序
        //.....
        this.observerList.pop;
    };
    //public removeObserver(observer : Observer){}
    p.removeTask = function (task) {
        this.taskList.pop;
    };
    //将任务发送给所有观察者,并让观察者进行相应的处理
    //只能内部调用
    p.notify = function (task) {
        for (var i = 0; i < this.observerList.length; i++) {
            this.observerList[i].onChange(task);
        }
    };
    TaskService.count = 0;
    return TaskService;
}());
egret.registerClass(TaskService,'TaskService',["EventEmitter"]);
var NPCTalkTaskCondition = (function () {
    function NPCTalkTaskCondition() {
    }
    var d = __define,c=NPCTalkTaskCondition,p=c.prototype;
    //Task与TaskConditionContext的区别
    //不想让NPCTalkTaskCondition得到task的所有信息
    p.onAccept = function (context) {
        context.setCurrent();
    };
    p.onSubmit = function () {
    };
    return NPCTalkTaskCondition;
}());
egret.registerClass(NPCTalkTaskCondition,'NPCTalkTaskCondition',["TaskCondition"]);
var KillMonsterTaskCondition = (function () {
    function KillMonsterTaskCondition() {
    }
    var d = __define,c=KillMonsterTaskCondition,p=c.prototype;
    p.onAccept = function (context) {
        context.setCurrent();
    };
    p.onSubmit = function () {
    };
    return KillMonsterTaskCondition;
}());
egret.registerClass(KillMonsterTaskCondition,'KillMonsterTaskCondition',["TaskCondition"]);
var SceneService = (function () {
    function SceneService() {
        this.observerList = [];
        SceneService.count++;
        if (SceneService.count > 1) {
            throw 'singleton!!!';
        }
    }
    var d = __define,c=SceneService,p=c.prototype;
    //获取TaskService的实例
    SceneService.getInstance = function () {
        if (SceneService.instance == null) {
            SceneService.instance = new SceneService();
        }
        return SceneService.instance;
    };
    p.addObserver = function (observer) {
        this.observerList.push(observer);
    };
    p.removeObserver = function (observer) {
        //排序
        //.....
        this.observerList.pop;
    };
    p.notify = function () {
        for (var i = 0; i < this.observerList.length; i++) {
            this.observerList[i].onChange(1);
        }
    };
    SceneService.count = 0;
    return SceneService;
}());
egret.registerClass(SceneService,'SceneService',["EventEmitter"]);
//# sourceMappingURL=TaskService.js.map