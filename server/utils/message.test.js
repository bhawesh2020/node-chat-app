var expect=require('expect');

var {generateMessage,generateLocationMessage}=require('./message');

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

describe('generateLocationMessage',()=>{
    it('should generate correct location object',()=>{
        var from='bhawesh';
        var lat=11;
        var lng=1;
        var res=generateLocationMessage(from,lat,lng);
        expect(res.from).toBe(from);
        expect(res.url).toBe(`https://www.google.com/maps?q=${lat},${lng}`);
        expect(res.createdAt).toBeA('number');
    });
});