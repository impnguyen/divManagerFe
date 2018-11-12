var DividendTable = require('../pageobjects/DividendTable.page');
var assert = require('assert');
var pauseTime = 500;


describe('Dividend table', function () {
    it('should show page, select a user and click on submit button', function () {
        DividendTable.open();
        browser.pause(pauseTime);

        DividendTable.selectValueHelpButton.click();
        browser.pause(pauseTime);

        DividendTable.userValueHelpSecListItem.click();
        browser.pause(pauseTime);

        DividendTable.initialUserSelectionSubmit.click();
        browser.pause(pauseTime);        
    });

    it('should show at least one entry in table', function () {
        let bFirstEntryExists = DividendTable.firstDivTableRow.isExisting();
        browser.pause(pauseTime);
        assert.equal(bFirstEntryExists, true);
    });
});