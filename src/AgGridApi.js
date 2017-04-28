import React, { Component } from 'react'
import { ALL_AG_GRID_API_FUNCTIONS } from './constants'
import { callWrapperComponentOnGridReady, warnThatAgGridHasNotLoadedYet } from './utils'

const DEFAULT_OPTIONS = {
    log: false,
    flatten: true,
    apiFunctions: ALL_AG_GRID_API_FUNCTIONS
}

/** Ag grid Higher Order Component which gives you all the API functions from ag-grid. */
export const AgGridApi = (DecoratedComponent, options = DEFAULT_OPTIONS) => {
    class AgGridApi extends Component {
        constructor() {
            super()

            this.agGridPassedDownFunctionsMemoized = false
            this.agGridApiFunctionsPassedDown = {}
            this.state = {
                gridParams: {
                    api: {}
                },
                isGridReady: false
            }
        }

        /**
         * Function which will check if grid is initialised and then call the callback that is passed as a parameter
         * with the next parameters provided, if any.
         * @function
         * @param {function} callback - callback function which will be called if grid is initialised.
         * */
        afterGridReady = callback => {
            const options = Array.prototype.slice.call(arguments, 1)
            const { isGridReady, gridParams } = this.state

            if (isGridReady) {
                // Setting the this of the callback to be gridParams.api and calling the callback with provided
                // options (if any)
               return callback.call(gridParams.api, ...options)
            } else if (options.log) {
                warnThatAgGridHasNotLoadedYet()
            }
        }

        /**
         * Function which will select an api function from gridParams object and return it.
         * Warning!!! If you call the returned function without explicitly setting the this to be gridParams.api
         * it won't be called with gridParams.api context.
         * @function
         * @return {function} - ag-grid-api function selected from gridParams.api
         * */
        gridParamsFunctionSelector = functionName => {
            return this.state.gridParams.api[functionName]
        }

        /**
         * Event handler, which will be called when Ag-Grid has initialised.
         * @function
         * */
        onGridReady = params => {
            this.setState({
                isGridReady: true,
                gridParams: params
            })

            callWrapperComponentOnGridReady({ props: this.props, params })
        }

        /* Columns start */
        /**
         * Gets columns to adjust in size to fit the grid horizontally.
         * @function
         * */
        sizeColumnsToFit = () => {
            this.afterGridReady(this.gridParamsFunctionSelector('sizeColumnsToFit'))
        }

        /**
         * 	Call to set new column definitions into the grid. The grid will redraw all the column headers,
         * 	and then redraw all of the rows. The rows will not be discarded, so any selections,
         * 	scrolling or groups open, will stay.
         * @function
         * */
        setColumnDefs = colDefs => {
            this.afterGridReady(this.gridParamsFunctionSelector('setColumnDefs'), colDefs)
        }
        /* Columns end */

        /* Data start */
        /**
         * 	Call to set new column definitions into the grid. The grid will redraw all the column headers,
         * 	and then redraw all of the rows. The rows will not be discarded, so any selections,
         * 	scrolling or groups open, will stay.
         * @function
         * */
        setRowData = rows => {
            this.afterGridReady(this.gridParamsFunctionSelector('setRowData'), rows)
        }

        /**
         * 	Call to set new column definitions into the grid. The grid will redraw all the column headers,
         * 	and then redraw all of the rows. The rows will not be discarded, so any selections,
         * 	scrolling or groups open, will stay.
         * @function
         * */
        setDatasource = datasource => {
            this.afterGridReady(this.gridParamsFunctionSelector('setDatasource'), datasource)
        }

        /**
         * Method for getting and setting the data and getting the Row Nodes of the floating rows.
         * @function
         * */
        setFloatingTopRowData = rowData => {
            this.afterGridReady(this.gridParamsFunctionSelector('setFloatingTopRowData'), rowData)
        }

        /**
         * Method for getting and setting the data and getting the Row Nodes of the floating rows.
         * @function
         * */
        setFloatingBottomRowData = () => {
            this.afterGridReady(this.gridParamsFunctionSelector('setFloatingBottomRowData'))
        }

        /**
         * Method for getting and setting the data and getting the Row Nodes of the floating rows.
         * @function
         * */
        getFloatingTopRowCount = () => {
            return this.afterGridReady(this.gridParamsFunctionSelector('getFloatingTopRowCount'))
        }

        /**
         * Method for getting and setting the data and getting the Row Nodes of the floating rows.
         * @function
         * */
        getFloatingBottomRowCount = () => {
            return this.afterGridReady(this.gridParamsFunctionSelector('getFloatingBottomRowCount'))
        }

        /**
         * Method for getting and setting the data and getting the Row Nodes of the floating rows.
         * @function
         * */
        getFloatingTopRow = index => {
            return this.afterGridReady(this.gridParamsFunctionSelector('getFloatingTopRow'), index)
        }

        /**
         * Method for getting and setting the data and getting the Row Nodes of the floating rows.
         * @function
         * */
        getFloatingBottomRow = index => {
            return this.afterGridReady(this.gridParamsFunctionSelector('getFloatingBottomRow'), index)
        }

        /**
         * Returns the row model inside the table. From here you can see the original rows,
         * rows after filter has been applied, rows after aggregation has been applied,
         * and the final set of 'to be displayed' rows.
         * @function
         * */
        getModel = () => {
            return this.afterGridReady(this.gridParamsFunctionSelector('getModel'))
        }

        /**
         * Does a complete refresh of the in memory row model. Shotgun approach for any row changes you have done.
         * @function
         * */
        refreshInMemoryRowModel = () => {
            this.afterGridReady(this.gridParamsFunctionSelector('refreshInMemoryRowModel'))
        }
        /* Data end */

        /* Looping Through Data start */
        /**
         * 	Iterates through each node (row) in the grid and calls the callback for each node.
         * 	This works similar to the 'forEach' method on a Javascript array.
         * 	This is called for every node, ignoring any filtering or sorting applied within the grid.
         * 	If pagination, then gets called for the currently loaded page.
         * 	If virtual paging, then gets called for each virtual page loaded in the page cache.
         * @function
         * */
        forEachNode = callback => {
            return this.afterGridReady(this.gridParamsFunctionSelector('forEachNode'), callback)
        }

        /**
         * Similar to forEachNode, except skips any filtered out data.
         * @function
         * */
        forEachNodeAfterFilter = callback => {
            return this.afterGridReady(this.gridParamsFunctionSelector('forEachNodeAfterFilter'), callback)
        }

        /**
         * Similar to forEachNode, except skips any filtered out data and each the callback
         * is called in the order the rows are displayed in the grid.
         * @function
         * */
        forEachNodeAfterFilterAndSort = callback => {
            return this.afterGridReady(this.gridParamsFunctionSelector('forEachNodeAfterFilterAndSort'), callback)
        }

        /**
         * Similar to forEachNode, except lists all the leaf nodes.
         * This effectively goes through all the data that you provided the grid before the grid did any grouping.
         * @function
         * */
        forEachLeafNode = callback => {
            return this.afterGridReady(this.gridParamsFunctionSelector('forEachLeafNode'), callback)
        }
        /* Looping Through Data end */

        /* Selection start */
        /**
         * Select all rows (even rows that are not visible due to grouping being enabled and their groups not expanded).
         * @function
         * */
        selectAll = () => {
            this.afterGridReady(this.gridParamsFunctionSelector('selectAll'))
        }

        /**
         * Clear all row selections.
         * @function
         * */
        deselectAll = () => {
            this.afterGridReady(this.gridParamsFunctionSelector('deselectAll'))
        }

        /**
         * Select all filtered rows.
         * @function
         * */
        selectAllFiltered = () => {
            this.afterGridReady(this.gridParamsFunctionSelector('selectAllFiltered'))
        }

        /**
         * Clear all filtered selections.
         * @function
         * */
        deselectAllFiltered = () => {
            this.afterGridReady(this.gridParamsFunctionSelector('deselectAllFiltered'))
        }

        /**
         * Returns a list of selected nodes. Getting the underlying node (rather than the data)
         * is useful when working with tree / aggregated data, as the node can be traversed.
         * @function
         * */
        getSelectedNodes = () => {
            return this.afterGridReady(this.gridParamsFunctionSelector('getSelectedNodes'))
        }

        /**
         * Returns a list of selected rows (ie row data that you provided).
         * @function
         * */
        getSelectedRows = () => {
            return this.afterGridReady(this.gridParamsFunctionSelector('getSelectedRows'))
        }

        /**
         * Returns a list of all selected nodes at 'best cost' - a feature to be used with groups / trees.
         * If a group has all it's children selected, then the group appears in the result, but not the children.
         * Designed for use with 'children' as the group selection type,
         * where groups don't actually appear in the selection normally.
         * @function
         * */
        getBestCostNodeSelection = () => {
            return this.afterGridReady(this.gridParamsFunctionSelector('getBestCostNodeSelection'))
        }

        /**
         * Returns the list of selected ranges.
         * @function
         * */
        getRangeSelections = () => {
            return this.afterGridReady(this.gridParamsFunctionSelector('getRangeSelections'))
        }

        /**
         * Adds to the selected range.
         * @function
         * */
        addRangeSelection = () => {
            this.afterGridReady(this.gridParamsFunctionSelector('addRangeSelection'))
        }

        /**
         * @function
         * */
        clearRangeSelection = () => {
            this.afterGridReady(this.gridParamsFunctionSelector('clearRangeSelection'))
        }
        /* Selection end */

        /* Refresh start */
        /**
         * Rip out and re-insert all visible rows.
         * Handy as a blanket 'redraw all' if changes have been made to the row data.
         * @function
         * */
        refreshView = () => {
            this.afterGridReady(this.gridParamsFunctionSelector('refreshView'))
        }

        /**
         * 	Leave the rows intact. Each cell that has been marked as volatile (via colDef attribute) will be redrawn.
         * 	Any cells that are not marked as volatile will be left alone,
         * 	hence keeping any context or state that they have.
         * @function
         * */
        sortRefreshView = () => {
            this.afterGridReady(this.gridParamsFunctionSelector('sortRefreshView'))
        }

        /**
         * Rips out the virtual rows showing representing the provided list of row nodes and then redraws them.
         * @function
         * */
        refreshRows = rowNodes => {
            this.afterGridReady(this.gridParamsFunctionSelector('refreshRows'), rowNodes)
        }

        /**
         * Gets the individual cells for the provided rowNodes to refresh,
         * the row itself and all other cells stay intact.
         * @function
         * */
        refreshCells = (rowNodes, colIds) => {
            return this.afterGridReady(this.gridParamsFunctionSelector('refreshCells'), rowNodes, colIds)
        }

        /**
         * Redraws the header.
         * Useful if a column name changes, or something else that changes how the column header is displayed.
         * @function
         * */
        refreshHeader = () => {
            this.afterGridReady(this.gridParamsFunctionSelector('refreshHeader'))
        }

        /**
         * Rip out and re-insert all visible header and footer rows only.
         * Only need to call if update the aggregate data yourself,
         * as this gets called after recomputeAggregates() anyway.
         * @function
         * */
        refreshGroupRows = () => {
            this.afterGridReady(this.gridParamsFunctionSelector('refreshGroupRows'))
        }

        /**
         * Gets the grid to recompute the row groups.
         * @function
         * */
        refreshGroup = () => {
            this.afterGridReady(this.gridParamsFunctionSelector('refreshGroup'))
        }

        /**
         * Gets the index of the first rendered row.
         * @function
         * */
        getFirstRenderedRow = () => {
            return this.afterGridReady(this.gridParamsFunctionSelector('getFirstRenderedRow'))
        }

        /**
         * Gets the index of the last rendered rows.
         * @function
         * */
        getLastRenderedRow = () => {
            return this.afterGridReady(this.gridParamsFunctionSelector('getLastRenderedRow'))
        }
        /* Refresh end */

        /* Sort and Filter start */
        /**
         * Pass a quick filter text into ag-Grid for filtering.
         * If you won't want to use quickFilterText then you can call this method instead to apply a quick filter.
         * @function
         * */
        setQuickFilter = quickFilter => {
            this.afterGridReady(this.gridParamsFunctionSelector('setQuickFilter'), quickFilter)
        }

        /**
         * Returns true if the quick filter is set, otherwise false.
         * @function
         * */
        isQuickFilterPresent = () => {
            return this.afterGridReady(this.gridParamsFunctionSelector('isQuickFilterPresent'))
        }

        /**
         * Returns true if the advanced filter is set, otherwise false.
         * @function
         * */
        isAdvancedFilterPresent = () => {
            return this.afterGridReady(this.gridParamsFunctionSelector('isAdvancedFilterPresent'))
        }

        /**
         * Returns true if any filter is set. This includes quick filter, advanced filter or external filter.
         * @function
         * */
        isAnyFilterPresent = () => {
            return this.afterGridReady(this.gridParamsFunctionSelector('isAnyFilterPresent'))
        }

        /**
         * Returns the filter component instance for the column. Either provide the colDef (matches on object reference)
         * or the column field attribute (matches on string comparison). Matching by field is normal.
         * Matching by colDef is useful when field is missing or not unique.
         * @function
         * */
        getFilterInstance = col => {
            return this.afterGridReady(this.gridParamsFunctionSelector('getFilterInstance'), col)
        }

        /**
         * Gets the current state of all the advanced filters. Used for saving filter state.
         * @function
         * */
        getFilterModel = () => {
            return this.afterGridReady(this.gridParamsFunctionSelector('getFilterModel'))
        }

        /**
         * Sets the state of all the advanced filters.
         * Provide it with what you get from getFilterModel() to restore filter state.
         * @function
         * */
        setFilterModel = model => {
            this.afterGridReady(this.gridParamsFunctionSelector('setFilterModel'), model)
        }

        /**
         * Informs the grid that a filter has changed.
         * This is typically called after a filter change through one of the filter APIs.
         * @function
         * */
        onFilterChanged = () => {
            this.afterGridReady(this.gridParamsFunctionSelector('onFilterChanged'))
        }

        /**
         * Destroys a filter, useful to create get a particular filter created from scratch again.
         * @function
         * */
        destroyFilter = () => {
            this.afterGridReady(this.gridParamsFunctionSelector('destroyFilter'))
        }

        /**
         * Gets the grid to act as if the sort was changed.
         * Useful if you update some values in the grid and want to get the grid to reorder
         * them according to the new values.
         * @function
         * */
        onSortChanged = () => {
            this.afterGridReady(this.gridParamsFunctionSelector('onSortChanged'))
        }

        /**
         * Sets the sort state of the grid.
         * @function
         * */
        setSortModel = model => {
            this.afterGridReady(this.gridParamsFunctionSelector('setSortModel'), model)
        }

        /**
         * Returns the sort state of the grid.
         * @function
         * */
        getSortModel = () => {
            return this.afterGridReady(this.gridParamsFunctionSelector('getSortModel'))
        }
        /* Sort and Filter end */

        /* Groups start */
        /**
         * Expand all groups.
         * @function
         * */
        expandAll = () => {
            this.afterGridReady(this.gridParamsFunctionSelector('expandAll'))
        }

        /**
         * Collapse all groups.
         * @function
         * */
        collapseAll = () => {
            this.afterGridReady(this.gridParamsFunctionSelector('collapseAll'))
        }

        /**
         * 	If after getting the model, you expand or collapse a group, call this method to inform the grid.
         * 	It will work out the final set of 'to be displayed' rows again (ie expand or collapse the group visually).
         * @function
         * */
        onGroupExpandedOrCollapsed = () => {
            this.afterGridReady(this.gridParamsFunctionSelector('onGroupExpandedOrCollapsed'))
        }

        /**
         * Recomputes the aggregates in the model and refreshes all the group rows.
         * @function
         * */
        recomputeAggregates = () => {
            this.afterGridReady(this.gridParamsFunctionSelector('recomputeAggregates'))
        }

        /**
         * Returns the focused cell as an object containing the rowIndex, column and floating (top, bottom or null).
         * @function
         * */
        getFocusedCell = () => {
            return this.afterGridReady(this.gridParamsFunctionSelector('getFocusedCell'))
        }

        /**
         * Sets the focus to the specified cell. Set floating to null, 'top', or 'bottom'.
         * @function
         * */
        setFocusedCell = (rowIndex, colKey, floating) => {
            this.afterGridReady(this.gridParamsFunctionSelector('setFocusedCell'), rowIndex, colKey, floating)
        }

        /**
         * Clears the focused cell.
         * @function
         * */
        clearFocusedCell = () => {
            this.afterGridReady(this.gridParamsFunctionSelector('clearFocusedCell'))
        }

        /**
         * Navigates the grid focus to the next cell, as if tabbing.
         * @function
         * */
        tabToNextCell = () => {
            this.afterGridReady(this.gridParamsFunctionSelector('tabToNextCell'))
        }

        /**
         * Navigates the grid focus to the previous cell, as if shift-tabbing.
         * @function
         * */
        tabToPreviousCell = () => {
            this.afterGridReady(this.gridParamsFunctionSelector('tabToPreviousCell'))
        }
        /* Groups end */

        /* Editing start */
        /**
         * 	If a cell is editing, it stops the editing.
         * 	Pass 'true' if you want to cancel the editing (ie don't accept changes).
         * 	Default is true.
         * @function
         * */
        stopEditing = (cancel = true) => {
            this.afterGridReady(this.gridParamsFunctionSelector('stopEditing'), cancel)
        }

        /**
         * Gets the grid to start editing on a particular cell.
         * @function
         * */
        startEditingCell = params => {
            this.afterGridReady(this.gridParamsFunctionSelector('startEditingCell'), params)
        }
        /* Editing end */

        /* Export start */
        /**
         * Does a CSV export of the grid's data.
         * @function
         * */
        exportDataAsCsv = (params = this.state.gridParams) => {
            this.afterGridReady(this.gridParamsFunctionSelector('exportDataAsCsv'), params)
        }

        /**
         * Similar to exportDataAsCsv, except returns result as a string rather than export it.
         * @function
         * */
        getDataAsCsv = (params = this.state.gridParams) => {
            return this.afterGridReady(this.gridParamsFunctionSelector('getDataAsCsv'), params)
        }

        /**
         * Does a Excel export of the grid's data.
         * @function
         * */
        exportDataAsExcel = (params = this.state.gridParams) => {
            this.afterGridReady(this.gridParamsFunctionSelector('exportDataAsExcel'), params)
        }

        /**
         * Similar to exportDataAsExcel, except returns result as a string rather than export it.
         * @function
         * */
        getDataAsExcel = (params = this.state.gridParams) => {
            return this.afterGridReady(this.gridParamsFunctionSelector('getDataAsExcel'), params)
        }
        /* Export end */

        /* Events start */
        /**
         * Add an event listener for the said event type. Works similar to addEventListener for a browser DOM element.
         * @function
         * */
        addEventListener = (eventType, listener) => {
            this.afterGridReady(this.gridParamsFunctionSelector('addEventListener'), eventType, listener)
        }

        /**
         * Add an event listener for all event types coming from the grid.
         * @function
         * */
        addGlobalListener = listener => {
            this.afterGridReady(this.gridParamsFunctionSelector('addGlobalListener'), listener)
        }

        /**
         * Remove an event listener.
         * @function
         * */
        removeEventListener = (eventType, listener) => {
            this.afterGridReady(this.gridParamsFunctionSelector('removeEventListener'), eventType, listener)
        }

        /**
         * Remove a global event listener.
         * @function
         * */
        removeGlobalListener = listener => {
            this.afterGridReady(this.gridParamsFunctionSelector('removeGlobalListener'), listener)
        }

        /**
         * Dispatch an event through the grid.
         * Useful if you are doing a custom cellRenderer and want to fire events such as 'cellValueChanged'.
         * @function
         * */
        dispatchEvent = (eventType, event) => {
            this.afterGridReady(this.gridParamsFunctionSelector('dispatchEvent'), eventType, event)
        }
        /* Events end */

        /* Rendering start */
        /**
         * Retrieve rendered nodes.
         * Due to virtualisation this will contain only the current visible rows and the amount in the buffer.
         * @function
         * */
        getRenderedNodes = () => {
            return this.afterGridReady(this.gridParamsFunctionSelector('getRenderedNodes'))
        }
        /* Rendering end */

        /* Scrolling start */
        /**
         * Ensures the index is visible, scrolling the table if needed.
         * @function
         * */
        ensureIndexVisible = index => {
            this.afterGridReady(this.gridParamsFunctionSelector('ensureIndexVisible'), index)
        }

        /**
         * Ensures the column is visible, scrolling the table if needed.
         * @function
         * */
        ensureColumnVisible = colId => {
            this.afterGridReady(this.gridParamsFunctionSelector('ensureColumnVisible'), colId)
        }

        /**
         * Ensures a node is visible, scrolling the table if needed. Provide one of a) the node b) the data object c)
         * a comparator function (that takes the node as a parameter, and returns true for match, false for no match)
         * @function
         * */
        ensureNodeVisible = comparator => {
            this.afterGridReady(this.gridParamsFunctionSelector('ensureNodeVisible'), comparator)
        }
        /* Scrolling end */

        /* Overlay start */
        /**
         * @function
         * */
        showLoadingOverlay = () => {
            this.afterGridReady(this.gridParamsFunctionSelector('showLoadingOverlay'))
        }

        /**
         * @function
         * */
        showNoRowsOverlay = () => {
            this.afterGridReady(this.gridParamsFunctionSelector('showNoRowsOverlay'))
        }

        /**
         * @function
         * */
        hideOverlay = () => {
            this.afterGridReady(this.gridParamsFunctionSelector('hideOverlay'))
        }
        /* Overlay end */

        /* Miscellaneous start */
        /**
         * @function
         * */
        addRenderedRowListener = (event, rowIndex, callback) => {
            this.afterGridReady(this.gridParamsFunctionSelector('addRenderedRowListener'), event, rowIndex, callback)
        }
        /* Miscellaneous end */

        render() {
            const { isGridReady, gridParams } = this.state

            if (!this.agGridPassedDownFunctionsMemoized) {
                this.agGridApiFunctionsPassedDown = options.apiFunctions.reduce((acc, value) => {
                    acc[value] = this[value]

                    return acc
                }, {})
            }

            let decoratedComponentProps
            const agGridApiProps = {
                isGridReady,
                gridParams,
                onGridReady: this.onGridReady,
                ...this.agGridApiFunctionsPassedDown
            }

            if (options.flatten) {
                decoratedComponentProps = {
                    ...agGridApiProps
                }
            } else {
                decoratedComponentProps = {
                    agGridApi: agGridApiProps
                }
            }

            return (
                <DecoratedComponent
                    {...this.props}
                    {...decoratedComponentProps}
                />
            )
        }
    }

    AgGridApi.displayName = `AgGridApi(${DecoratedComponent.displayName})`

    return AgGridApi
}
