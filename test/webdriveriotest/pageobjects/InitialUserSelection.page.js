// login.page.js
var Page = require('./Page');

var InitialUserSelection = Object.create(Page, {
    /**
     * define elements
     */
    initialUserSelectionDialog: { get: function () { return browser.element('#__xmlview0--initUserSelection'); } },
    selectValueHelpButton: { get: function () { return browser.element('#__xmlview0--initUserSelect-arrow'); } },
    selectionLabel: { get: function () { return browser.element('#__xmlview0--initUserSelect-label'); } },
    userValueHelpDialog: { get: function () { return browser.element('#__xmlview0--initUserSelection'); } },
    userValueHelpSecListItem: { get: function () { return browser.element('#__item0-__xmlview0--initUserSelect-1'); } },
    initialUserSelectionSubmit: { get: function () { return browser.element('#__button1'); } },


    /**
     * define or overwrite page methods
     */
    open: { value: function() {
        Page.open.call(this, '/');
    } }
});

module.exports = InitialUserSelection;