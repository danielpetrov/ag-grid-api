# Ag grid Higher Order Component which gives you all the API functions from ag-grid

[ag-grid API](https://www.ag-grid.com/javascript-grid-api/)

### How To Use
````
By default AgGridApi-HOC will pass props to your wrapped Component for all the api functions,
plus isGridReady property (api.params.isGridReady) and gridParams (api.params) property and also onGridReady callback
which you should pass down to AgGridReact component in order to use the other functions.
````
````
To use it first you have to pass down the onGridReady callback to AgGridReact component provided from ag-grid-react.
Each of the api functions won't be executed if grid api is not ready. Nothing will happen and there will be silent error.
You can change that from options, setting log property to true. Then you will get error message in the console if you are trying
to call an api functions if the grid is not ready.
````


### Ag grid options
````
As a second parameter AgGridApi-HOC expects an options object which contains three properties.
1. log - Boolean. If true will log on console in some cases (default is false)
2. flatten - Boolean. If false will pass all agGridApi as separate props. If true will pass an agGridApi prop
of type object which will contain all the props. (default is true)
3. apiFunctions - Array of strings. AgGridApi-HOC will pass down only the listed agGridApiFunctions. (default are all functions)
````

````
Code sample...
````
