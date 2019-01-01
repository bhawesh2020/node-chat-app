const expect=require('expect');
var {Users}=require('./users');

describe('Users',()=>{
    var users;
    beforeEach(()=>{
        users=new Users();
        users.users=[{
            id:'qe1',
            name:'andrew',
            room:'A'
        },{
            id:'qe2',
            name:'mike',
            room:'B'
        },{
            id:'qe3',
            name:'mead',
            room:'A'
        }];
    });

    it('should add new user',()=>{
        var users=new Users();
        var user={
            id:'123',
            name:'test name',
            room:'omega'
        };
        var resUser=users.addUser(user.id,user.name,user.room);
        expect(users.users).toEqual([user]);
    });

    it('should display all the rooms',()=>{
        expect(users.getRooms()).toEqual(['A','B']);
    });

    it('should remove a user',()=>{
        var id='qe2';
        var res=users.removeUser(id);
        expect(res.id).toBe(id);
        expect(users.users.length).toBe(2);
    });

    it('should not remove a user',()=>{
        var res=users.removeUser('qe8');
        expect(users.users.length).toBe(3);
        expect(res).toNotExist();
    });

    it('should find a user',()=>{
        var id='qe2';
        var res=users.getUser(id);
        expect(res.id).toBe(id);
    });

    it('should not find a user',()=>{
        var id='qe8';
        var res=users.getUser(id);
        expect(res).toNotExist();
    });

    it('should return names for room A',()=>{
        var res=users.getUserList('A');
        expect(res).toEqual(['andrew','mead']);
    });
    it('should return names for room B',()=>{
        var res=users.getUserList('B');
        expect(res).toEqual(['mike']);
    });
});
