/*************************
 Utils Factory  Tests
 **************************/
'use strict';
describe('JetThunder2 Utils: Factory', function () {
    var utilsFactory, baseDate = new Date(2016, 9, 11);

    beforeEach(function () {
        module('JetThunder2');
        inject(function (_utilsFactory_) {
            utilsFactory = _utilsFactory_;
        });
    });

    describe('Utils Factory Tests', function () {
        it('Should beautify a given URL on calling beautifyUrl()', function() {
            expect(utilsFactory.beautifyUrl('../Mazda RX8/')).toEqual('../Mazda-RX8/');
        });
        it('Should get the current date', function () {
            jasmine.clock().mockDate(baseDate);
            expect(utilsFactory.getMoment()).toBeDefined();
        });
        it('Should format a date by time on calling getTime()', function () {
            jasmine.clock().mockDate(baseDate);
            expect(utilsFactory.getTime()).toEqual('00:00');
        });
        it('Should format a date by year on calling getYear()', function () {
            jasmine.clock().mockDate(baseDate);
            expect(utilsFactory.getYear()).toEqual('2016');
        })
    });
});