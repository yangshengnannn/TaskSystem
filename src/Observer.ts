interface Observer{

    //接受到信息后进行相应的处理，信息作为参数可以是任意事物，如task等
    onChange(object : any);

}


class NPC implements Observer{

    private id : String;
    
    //头顶的提示任务状态的符号
    private emoji : String;

    constructor(id : String){

        this.id = id;
    }

    public getId() : String{

        return this.id;
    }

    public setEmoji(emoji : String){

        this.emoji = emoji;
    }


    //根据变化的任务的相应状态改变相应NPC头顶的符号
    onChange(task : Task){

        //任务刚创建时
        if(task.getStatus() == TaskStatus.ACCEPTABLE){

            if(this.id == task.getFromNpcId()){

                this.emoji = "yellow !" + task.getId();

            }

        }else if(task.getStatus() == TaskStatus.CANSUBMIT){

            if(this.id == task.getFromNpcId()){


                this.emoji = "yellow ?" +  task.getId();
            }

            if(this.id == task.getToNpcId()){

                this.emoji = "yellow ?" +  task.getId();

            }

        }else if(task.getStatus() == TaskStatus.SUBMITTED){

            this.emoji = task.getId();
        }


        new Main().showEmoji(this.emoji);

    }
    
}


class TaskPanel implements Observer{

    private id : String;

    constructor(id : String){

        this.id = id;
    }

    public getId() : String{

        return this.id;
    }


    onChange(task : Task){

      
        //任务面板
        if(task.getStatus() == TaskStatus.ACCEPTABLE){

            new Main().showPanel(task, "taskpanel not accept"+ task.getId());
        }

        if(task.getStatus() == TaskStatus.DURING){

            new Main().showPanel(task, "taskpanel acceptted"+ task.getId());
        }

        if(task.getStatus() == TaskStatus.CANSUBMIT){

            new Main().showPanel(task, "taskpanel cansubmit"+ task.getId());
        }

        if(task.getStatus() == TaskStatus.SUBMITTED){

            new Main().showPanel(task, "taskpanel submitted"+ task.getId());
        }


        //对话面板
        if(Main.click){

            if(task.getStatus() == TaskStatus.ACCEPTABLE){
                 new Main().showPanel(task, "accept" + task.getId());

            }else if(task.getStatus() == TaskStatus.CANSUBMIT){
                
                new Main().showPanel(task, "finish" + task.getId())
               
            }
        }
    }
 
}


class KillButton implements Observer{

    private killAmount = 0;

    onChange(){

        this.killAmount++;
        for(var i = 0; i < TaskService.getInstance().taskList.length; i++){

            if(TaskService.getInstance().taskList[i].condition == "kill"){

                new KillMonsterTaskCondition().onAccept(TaskService.getInstance().taskList[i]); 
            }
        }
        
    }
}