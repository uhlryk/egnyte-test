## Installation:

  npm install
  
## Commands:

### For production:

Transform all server and client source files:

    gulp compile
   
### For development:
  
Run server and client with watch changes and hot reloading (default url `http://localhost:3001`):

    gulp dev-hot
        
## How to run

 1. Just open in browser dist/index.html
 
 2. Run command:
 
    node app
    
And open http://localhost:3001
   
You can also run app as dev, and then then have all advantages of hmr 
        
## Structure:

 * **server.js**           executable server file (config and run compiled server)
 * **devServer.js**        executable dev server for client files (hmr)
 * **webpack.config.client.prod.js** webpack configuration to production compile client files
 * **webpack.config.client.dev.js** webpack configuration to dev compile client files (hot loading)
 * **dist/**                directory with compiled files
 * **src/**                 all source files
   
## Licence

MIT
