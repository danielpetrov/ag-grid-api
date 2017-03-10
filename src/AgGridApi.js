import React, { Component, PropTypes } from 'react'
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

                return null
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

        /**
         * @function
         * */
        onGroupExpandedOrCollapsed = () => {
            return this.afterGridReady(this.gridParamsFunctionSelector('onGroupExpandedOrCollapsed'))
        }

        /**
         * @function
         * */
        expandAll = () => {
            this.afterGridReady(this.gridParamsFunctionSelector('expandAll'))
        }

        /**
         * @function
         * */
        collapseAll = () => {
            this.afterGridReady(this.gridParamsFunctionSelector('collapseAll'))
        }

        /**
         * @function
         * */
        addRenderedRowListener = (event, rowIndex, callback) => {
            this.afterGridReady(this.gridParamsFunctionSelector('addRenderedRowListener'), event, rowIndex, callback)
        }

        /**
         * @function
         * */
        getRenderedNodes = () => {
            return this.afterGridReady(this.gridParamsFunctionSelector('getRenderedNodes'))
        }

        /**
         * @function
         * */
        showLoadingOverlay = () => {
            return this.afterGridReady(this.gridParamsFunctionSelector('showLoadingOverlay'))
        }

        /**
         * @function
         * */
        showNoRowsOverlay = () => {
            return this.afterGridReady(this.gridParamsFunctionSelector('showNoRowsOverlay'))
        }

        /**
         * @function
         * */
        hideOverlay = () => {
            return this.afterGridReady(this.gridParamsFunctionSelector('hideOverlay'))
        }

        /**
         * @function
         * */
        recomputeAggregates = () => {
            return this.afterGridReady(this.gridParamsFunctionSelector('recomputeAggregates'))
        }

        /**
         * @function
         * */
        ensureIndexVisible = index => {
            this.afterGridReady(this.gridParamsFunctionSelector('ensureIndexVisible'), index)
        }

        /**
         * @function
         * */
        exportDataAsCsv = () => {
            const { gridParams } = this.state

            this.afterGridReady(this.gridParamsFunctionSelector('exportDataAsCsv'), gridParams)
        }

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

    AgGridApi.propTypes = {
        onGridReady: PropTypes.func,
        agGridApiProps: PropTypes.object
    }

    AgGridApi.displayName = `AgGridApi(${DecoratedComponent.displayName})`

    return AgGridApi
}
