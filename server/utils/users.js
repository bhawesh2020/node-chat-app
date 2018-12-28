class Users{
    constructor(){
        this.users=[];
    }
    addUser(id, name, room){
        var user={id, name, room};
        this.users.push(user);
        return user;
    }
    
    removeUser(id){
        var user=this.getUser(id);
        if(user){
            var newUsers= this.users.filter((user)=> user.id !== id);
            this.users=newUsers;
        }
        
        return user;
    }

    getUser(id){
        var user=this.users.filter((user)=> user.id === id)[0];
        return user;
    }
    
    getUserList(room){
        var result= this.users.filter((user)=>  user.room === room);
        var namesArray=result.map((user)=>user.name);
        return namesArray;
    }
}

module.exports={Users};