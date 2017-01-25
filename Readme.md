# Ag grid Higher Order Component which gives you all the API functions from ag-grid

[ag-grid API](https://www.ag-grid.com/javascript-grid-api/)

### How To Use
````
By default AgGridAPI-HOC will pass an object to your wrapped Component, called agGridApi and It will contain all the api functions,
plus isGridReady property (api.params.isGridReady) and gridParams (api.params) property and also onGridReady callback.
````
````
To use it first you have to pass down the onGridReady callback to AgGridReact component provided from ag-grid-react.
Each of the api functions won't be executed if grid api is not ready. Nothing will happen and there will be silent error.
You can change that from options, setting log property to true. Then you will get error message in the console if you are trying
to call an api functions if the grid is not ready.
````

````
Code sample...
````

````
Ag grid opitons...
````