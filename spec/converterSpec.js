describe('Converter', () => {
    var Converter = require('../index.js');
    var converter;
    beforeEach(() => {
        converter = Converter();
    });
    describe('DIV', () => {
        it('should convert DIV', () => {
            var result = converter.convert('<div></div>');
            expect(result).toBeSameTemplate('div');
        });
        it('should convert DIV with className', () => {
            var result = converter.convert('<div class="class1 class2"></div>');
            expect(result).toBeSameTemplate('.class1.class2');
        });
        it('should convert DIV with id', () => {
            var result = converter.convert('<div id="id1"></div>');
            expect(result).toBeSameTemplate('#id1');
        });
        it('should convert DIV with attributes', () => {
            var result = converter.convert('<div attr1="attr1" attr2="attr2" attr3="<%= attr3 %>"></div>');
            expect(result).toBeSameTemplate('div(attr1=\'attr1\', attr2=\'attr2\', attr3=attr3)');
        });
        it('should convert DIV with all stuff', () => {
            var result = converter.convert('<div id="id1" class="class1 class2"  attr1="attr1" attr2="<%= attr2 %>"></div>');
            expect(result).toBeSameTemplate('#id1.class1.class2(attr1=\'attr1\', attr2=attr2)');
        });
    });
});
