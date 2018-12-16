var expect=require('expect');

var {generateMessage}=require('./message');

describe('generateMessage',()=>{
    it('should generate correct message',()=>{
        var from='bhawesh';
        var text='hello world';
        var res=generateMessage(from,text);
        expect(res.from).toBe(from);
        expect(res.text).toBe(text);
        expect(res.createdAt).toBeA('number');
    });
});