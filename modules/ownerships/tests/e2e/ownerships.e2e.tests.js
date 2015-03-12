'use strict';

describe('Ownerships E2E Tests:', function() {
	describe('Test Ownerships page', function() {
		it('Should not include new Ownerships', function() {
			browser.get('http://localhost:3000/#!/ownerships');
			expect(element.all(by.repeater('ownership in ownerships')).count()).toEqual(0);
		});
	});
});
