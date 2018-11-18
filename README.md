# divManagerFe
dividends manager build with openui5

## Hint
This project will be closed at Github. I will continue the development at Gitlab https://gitlab.com/impnguyen/divManagerFe

## Screenshots
<img src="https://github.com/impnguyen/divManagerFe/blob/dev/localhost_8080_index.html(iPhone%206_7_8).png" width="320">
<img src="https://github.com/impnguyen/divManagerFe/blob/dev/localhost_8080_index.html(iPhone%206_7_8)%20(1).png" width="320">
<img src="https://github.com/impnguyen/divManagerFe/blob/dev/localhost_8080_index.html(iPhone%206_7_8)%20(2).png" width="320">
<img src="https://github.com/impnguyen/divManagerFe/blob/dev/localhost_8080_index.html(iPhone%206_7_8)%20(3).png" width="320">

## test automation
### selenium
1. install package 'selenium-standalone' globally
2. install selenium and chromedriver with 'selenium-standalone install --drivers.chrome.version=2.38 --drivers.chrome.baseURL=https://chromedriver.storage.googleapis.com'
   (get version: https://chromedriver.storage.googleapis.com/)
3. start selenium server with 'selenium-standalone start --drivers.chrome.version=2.38'
4. start selenium test by wdio config file with '..\..\node_modules\.bin\wdio .\wdio.conf.js'
