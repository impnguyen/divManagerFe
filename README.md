# divManagerFe
dividends manager build with openui5

# test automation
1. install package 'selenium-standalone' globally
2. install selenium and chromedriver with 'selenium-standalone install --drivers.chrome.version=2.38 --drivers.chrome.baseURL=https://chromedriver.storage.googleapis.com'
   (get version: https://chromedriver.storage.googleapis.com/)
3. start selenium server with 'selenium-standalone start --drivers.chrome.version=2.38'
4. start selenium test by wdio config file with '..\..\node_modules\.bin\wdio .\wdio.conf.js'
