// dividend table
var Page = require('./InitialUserSelection.page');

var DividendTable = Object.create(Page, {
    /**
     * define elements
     */
    dividendTable: { get: function () { return browser.element('#__xmlview1--idProductsTable-listUl'); } },

    
    firstDivTableRow: { get: function () { return browser.element('#__item2-__xmlview1--idProductsTable-0'); } }
});

module.exports = DividendTable;