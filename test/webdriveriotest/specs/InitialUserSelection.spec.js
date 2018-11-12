var expect = require('chai').expect;
var InitialUserSelection = require('../pageobjects/InitialUserSelection.page');
var assert = require('assert');
var pauseTime = 500;


describe('InitialUserSelection dialog', function () {
    it('should show page and initial user dialog', function () {
        InitialUserSelection.open();
        browser.pause(pauseTime);

        assert.equal(browser.getTitle(), 'Dm');
        browser.pause(pauseTime);

        assert.equal(
            InitialUserSelection.initialUserSelectionDialog.isExisting(), 
            true
        );
    });

    it('should show a list of accounts/users', function () {
        InitialUserSelection.selectValueHelpButton.click();
        browser.pause(pauseTime);

        assert.equal(
            InitialUserSelection.userValueHelpDialog.isExisting(), 
            true
        );
    });

    it('should click on second list item and apply selection to select', function () {
        
        InitialUserSelection.userValueHelpSecListItem.click();
        browser.pause(pauseTime);

        var user = InitialUserSelection.userValueHelpSecListItem.getHTML(false).split('>')[1].split('<')[0];

        assert.equal(
            user, 
            InitialUserSelection.selectionLabel.getText()
        );

        
    });

});