function Page () {
    this.title = 'Dividends Manager';
}

Page.prototype.open = function (path) {
    browser.url(path);
}

module.exports = new Page();