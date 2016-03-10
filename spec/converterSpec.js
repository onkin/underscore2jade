'use strict';

describe('Converter', () => {
    let Converter = require('../index.js');
    let converter;

    beforeEach(() => {
        converter = Converter();
    });

    describe('DIV', () => {
        it('should convert DIV', () => {
            let result = converter.convert('<div></div>');
            expect(result).toBeSameTemplate('div');
        });
        it('should convert DIV with className', () => {
            let result = converter.convert('<div class="class1 class2"></div>');
            expect(result).toBeSameTemplate('.class1.class2');
        });
        it('should convert DIV with id', () => {
            let result = converter.convert('<div id="id1"></div>');
            expect(result).toBeSameTemplate('#id1');
        });
        it('should convert DIV with attributes', () => {
            let result = converter.convert('<div attr1="attr1" attr2="attr2" attr3="<%= attr3 %>"></div>');
            expect(result).toBeSameTemplate('div(attr1=\'attr1\', attr2=\'attr2\', attr3=attr3)');
        });
        it('should convert DIV with all stuff', () => {
            let result = converter.convert('<div id="id1" class="class1 class2"  attr1="attr1" attr2="<%= attr2 %>"></div>');
            expect(result).toBeSameTemplate('#id1.class1.class2(attr1=\'attr1\', attr2=attr2)');
        });
    });
    describe('SPAN', () => {
        it('should convert SPAN', () => {
            let result = converter.convert('<span></span>');
            expect(result).toBeSameTemplate('span');
        });
        it('should convert SPAN with all staff', () => {
            let result = converter.convert('<span id="id1" class="class1 class2"  attr1="attr1" attr2="<%= attr2 %>"></span>');
            expect(result).toBeSameTemplate('span#id1.class1.class2(attr1=\'attr1\', attr2=attr2)');
        });
        it('should convert INPUT', () => {
            let placeholder = 'fill me';
            let value = 'input';
            let result = converter.convert(`<input id="text-id" class="text" type="text" value="${value}" placeholder="${placeholder}"/>`);
            expect(result).toBeSameTemplate(`input#text-id.text(type='text', value='${value}', placeholder='${placeholder}')`);
        });
    });
});
