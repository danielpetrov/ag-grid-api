![ag grid logo](img/logo.png)

Higher Order Components for AgGridReact, which will make your life easier
=========================================================================

## AgGridApi 

  Pass all the [Ag-Grid api](https://www.ag-grid.com/javascript-grid-api/) functions to your wrapped component as props
or choose just a few, which you will use.

### How To Use

  Passed down callbacks will work for the AgGridReact component for which you pass onGridReady callback, coming from the HOC.
 
  AgGridApi will pass to your wrapped component:
  * onGridReady - callback that fires when grid is ready.
    You should pass that one to the AgGridReact that you wish to manage with the AgGridApi HOC.
  * isGridReady - boolean which will be true if the grid has initialised.
  * *callbacks - by default AgGridApi will pass all the callbacks from [Ag-Grid api](https://www.ag-grid.com/javascript-grid-api/)
  
  Options:
    As a second parameter to AgGridApi you can pass an object from which the HOC can read three properties.
  * log - Boolean. If true will allow logging on console in case of error or warning (default is false)
  * flatten - Boolean. If false will pass all agGridApi as separate props. If true will pass an agGridApi prop
  of type object which will contain all the [Ag-Grid api](https://www.ag-grid.com/javascript-grid-api/) functions. (default is true)
  * apiFunctions - Array of strings. AgGridApi-HOC will pass down only the listed agGridApiFunctions.
  (default are all functions)
    
Each of the api functions won't be executed if the wrapped AgGridReact has not initialised yet.
If you call a callback from AgGridApi before that nothing will happen.
You can change that from options, setting log property to true. Then you will get a warn message in the console if you are trying
to call an api functions if the grid is not ready.


````
Code sample...
````

## AgGridRetainFiltering

  Automatically retains filtering for the AgGridReact component that you've passed onGridReady callback, coming from the HOC
  
### How To Use

  Options:
  As a second parameter to AgGridApi you can pass an object from which the HOC can read two properties.
   * newColumns: Boolean ( true if you want to retain filtering when new columns come to the grid )
   * newData: Boolean ( true if you want to retain filtering when new data come to the grid )
  
  Both fields are true by default. This means that filtering will retain for both when new columns and new data comes to
  the grid.
  
## AgGridRetainSorting

  Automatically retains sorting for the AgGridReact component that you've passed onGridReady callback, coming from the HOC
  
### How To Use

  Options:
  As a second parameter to AgGridApi you can pass an object from which the HOC can read two properties.
   * newColumns: Boolean ( true if you want to retain sorting when new columns come to the grid )
   * newData: Boolean ( true if you want to retain sorting when new data come to the grid )
  
  Both fields are true by default. This means that sorting will retain for both when new columns and new data comes to
  the grid.