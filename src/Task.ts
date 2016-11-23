class Task implements TaskConditionContext{


    private id : String;

    private name : string;

    private desc : String;

    private status : TaskStatus;

    private fromNpcId : String;

    private toNpcId : String;

    public current : number = 0;

    public total : number = -1;

    public condition : String;


    constructor(id : String, name : string, status : TaskStatus, fromNpcId : String, toNpcId : String, condition : String){

        this.id = id;
        this.name = name;
        this.status = status;
        this.fromNpcId = fromNpcId;
        this.toNpcId = toNpcId;
        this.condition = condition;
        if(condition == "talk"){

            this.total = -1;

        }else if(condition == "kill"){

            this.total = 10;
        }

    }


    public getId() : String{

        return this.id;
    }

    public getName() : string{

        return this.name;
    }

    public getStatus() : TaskStatus{

        return this.status;
    }

    public getFromNpcId() : String{

        return this.fromNpcId;
    }

    public getToNpcId() : String{

        return this.toNpcId;
    }

    public setStatus(taskStatus : TaskStatus) : void{

        this.status = taskStatus;
    }

    public setCurrent(){

        this.current++;
        this.checkStatus();
    }

    public getCurrent(){

        return this.current;
    }

    
    //检测进行中到可提交
    private checkStatus(){

        if(this.status == TaskStatus.DURING && this.current >= this.total){

            this.status = TaskStatus.CANSUBMIT;
            TaskService.getInstance().notify(this);
        }
        
    }


    //接受任务
    public onAccept(){

            if(this.getStatus() == TaskStatus.ACCEPTABLE){

                this.setStatus(TaskStatus.DURING);
                
                if(this.condition == "talk"){

                    new NPCTalkTaskCondition().onAccept(this);

                }else if(this.condition == "kill"){

                    new KillMonsterTaskCondition().onAccept(this);
                }
                
                TaskService.getInstance().notify(this);
  
            }
        }


    //完成任务
    public onSubmit() : ErrorCode{

        if(this.id == ""){

            return ErrorCode.MISSING_TASK;
        }

            if(this.getStatus() == TaskStatus.CANSUBMIT){

                this.setStatus(TaskStatus.SUBMITTED);
                TaskService.getInstance().notify(this);

                //将下一个任务设为可完成
                for(var i = 0; i < TaskService.getInstance().taskList.length - 1; i++){

                    if(this.id == TaskService.getInstance().taskList[i].getId()){
                        
                        TaskService.getInstance().taskList[i+1].setStatus(TaskStatus.ACCEPTABLE);
                        TaskService.getInstance().notify(TaskService.getInstance().taskList[i+1]);
                        break;
                    }
                }
        }

        return ErrorCode.SUCCESS;
    }


}    

enum TaskStatus{

    UNACCEPTABLE = 0,

    ACCEPTABLE = 1,

    DURING = 2,

    CANSUBMIT = 3,

    SUBMITTED = 4

}

enum ErrorCode{

    SUCCESS,

    MISSING_TASK

}

interface EventEmitter{

    addObserver(observer : Observer);

    removeObserver(observer : Observer);

    notify(object : Object);

}