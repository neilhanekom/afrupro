'use strict';

describe('Chemicaldocs E2E Tests:', function() {
	describe('Test Chemicaldocs page', function() {
		it('Should not include new Chemicaldocs', function() {
			browser.get('http://localhost:3000/#!/chemicaldocs');
			expect(element.all(by.repeater('chemicaldoc in chemicaldocs')).count()).toEqual(0);
		});
	});
});
