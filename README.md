# Angular 2 + electron app
### See you favorite documents at once place

Currenly Supports pdf, excel, powerpoint, word files

### To run
```sh 
    git clone https://github.com/manishsingh10895/Documents-Accumulator.git Documentar
    cd Documentar
    npm i
    npm run build
    npm run electron
```
### Features
  - Shortcuts 
    - Ctrl + D - Open Sidebar
    - Ctrl + F - Search
    - Ctrl + S - Sort
    - Ctrl + N - Add Folder
  
  - Left Click to open the file from the application itself
  - Right Click to open file location
  
  

### Issues 

  If you get error in browserWindow's console **cannot find module jQuery** 
  
  RUN
  ```sh
    npm install --save jquery
  ```
  this may ruin webpack but still run **npm run build** 

