import React, { Component, PropTypes } from 'react'
import { ALL_AG_GRID_API_FUNCTIONS } from './constants'
import { callWrapperComponentOnGridReady, warnThatAgGridHasNotLoadedYet } from './utils'

const DEFAULT_OPTIONS = {
    log: false,
    flatten: true,
    apiFunctions: ALL_AG_GRID_API_FUNCTIONS
}

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

        afterGridReady = () => {
            const callback = arguments[0]
            const options = Array.prototype.slice.call(arguments, 1)
            const { isGridReady, gridParams } = this.state

            if (isGridReady) {
               return callback.call(gridParams.api, ...options)
            } else if (options.log) {
                warnThatAgGridHasNotLoadedYet()

                return null
            }
        }

        gridParamsFunctionSelector = functionName => {
            return this.state.gridParams.api[functionName]
        }

        onGridReady = params => {
            this.setState({
                isGridReady: true,
                gridParams: params
            })

            callWrapperComponentOnGridReady({ props: this.props, params })
        }

        setRowData = rows => {
            this.afterGridReady(this.gridParamsFunctionSelector('setRowData'), rows)
        }

        setDatasource = datasource => {
            this.afterGridReady(this.gridParamsFunctionSelector('setDatasource'), datasource)
        }

        setColumnDefs = colDefs => {
            this.afterGridReady(this.gridParamsFunctionSelector('setColumnDefs'), colDefs)
        }

        sizeColumnsToFit = () => {
            this.afterGridReady(this.gridParamsFunctionSelector('sizeColumnsToFit'))
        }

        selectAll = () => {
            this.afterGridReady(this.gridParamsFunctionSelector('selectAll'))
        }

        deselectAll = () => {
            this.afterGridReady(this.gridParamsFunctionSelector('deselectAll'))
        }

        selectAllFiltered = () => {
            this.afterGridReady(this.gridParamsFunctionSelector('selectAllFiltered'))
        }

        deselectAllFiltered = () => {
            this.afterGridReady(this.gridParamsFunctionSelector('deselectAllFiltered'))
        }

        getSelectedNodes = () => {
            return this.afterGridReady(this.gridParamsFunctionSelector('getSelectedNodes'))
        }

        getSelectedRows = () => {
            return this.afterGridReady(this.gridParamsFunctionSelector('getSelectedRows'))
        }

        getBestCostNodeSelection = () => {
            return this.afterGridReady(this.gridParamsFunctionSelector('getBestCostNodeSelection'))
        }

        setFloatingTopRowData = rowData => {
            this.afterGridReady(this.gridParamsFunctionSelector('setFloatingTopRowData'), rowData)
        }

        setFloatingBottomRowData = () => {
            this.afterGridReady(this.gridParamsFunctionSelector('setFloatingBottomRowData'))
        }

        getFloatingTopRowCount = () => {
            return this.afterGridReady(this.gridParamsFunctionSelector('getFloatingTopRowCount'))
        }

        getFloatingBottomRowCount = () => {
            return this.afterGridReady(this.gridParamsFunctionSelector('getFloatingBottomRowCount'))
        }

        getFloatingTopRow = index => {
            return this.afterGridReady(this.gridParamsFunctionSelector('getFloatingTopRow'), index)
        }

        getFloatingBottomRow = index => {
            return this.afterGridReady(this.gridParamsFunctionSelector('getFloatingBottomRow'), index)
        }

        refreshView = () => {
            this.afterGridReady(this.gridParamsFunctionSelector('refreshView'))
        }

        sortRefreshView = () => {
            this.afterGridReady(this.gridParamsFunctionSelector('sortRefreshView'))
        }

        refreshRows = rowNodes => {
            this.afterGridReady(this.gridParamsFunctionSelector('refreshRows'), rowNodes)
        }

        refreshCells = (rowNodes, colIds) => {
            return this.afterGridReady(this.gridParamsFunctionSelector('refreshCells'), rowNodes, colIds)
        }

        refreshHeader = () => {
            this.afterGridReady(this.gridParamsFunctionSelector('refreshHeader'))
        }

        refreshGroupRows = () => {
            this.afterGridReady(this.gridParamsFunctionSelector('refreshGroupRows'))
        }

        refreshGroup = () => {
            this.afterGridReady(this.gridParamsFunctionSelector('refreshGroup'))
        }

        getModel = () => {
            return this.afterGridReady(this.gridParamsFunctionSelector('getModel'))
        }

        onGroupExpandedOrCollapsed = () => {
            return this.afterGridReady(this.gridParamsFunctionSelector('onGroupExpandedOrCollapsed'))
        }

        refreshInMemoryRowModel = () => {
            this.afterGridReady(this.gridParamsFunctionSelector('refreshInMemoryRowModel'))
        }

        expandAll = () => {
            this.afterGridReady(this.gridParamsFunctionSelector('expandAll'))
        }

        collapseAll = () => {
            this.afterGridReady(this.gridParamsFunctionSelector('collapseAll'))
        }

        setQuickFilter = quickFilter => {
            this.afterGridReady(this.gridParamsFunctionSelector('setQuickFilter'), quickFilter)
        }

        isQuickFilterPresent = () => {
            return this.afterGridReady(this.gridParamsFunctionSelector('isQuickFilterPresent'))
        }

        isAdvancedFilterPresent = () => {
            return this.afterGridReady(this.gridParamsFunctionSelector('isAdvancedFilterPresent'))
        }


        isAnyFilterPresent = () => {
            return this.afterGridReady(this.gridParamsFunctionSelector('isAnyFilterPresent'))
        }

        addRenderedRowListener = (event, rowIndex, callback) => {
            this.afterGridReady(this.gridParamsFunctionSelector('addRenderedRowListener'), event, rowIndex, callback)
        }

        getRenderedNodes = () => {
            return this.afterGridReady(this.gridParamsFunctionSelector('getRenderedNodes'))
        }

        showLoadingOverlay = () => {
            return this.afterGridReady(this.gridParamsFunctionSelector('showLoadingOverlay'))
        }

        showNoRowsOverlay = () => {
            return this.afterGridReady(this.gridParamsFunctionSelector('showNoRowsOverlay'))
        }

        hideOverlay = () => {
            return this.afterGridReady(this.gridParamsFunctionSelector('hideOverlay'))
        }

        recomputeAggregates = () => {
            return this.afterGridReady(this.gridParamsFunctionSelector('recomputeAggregates'))
        }

        ensureIndexVisible = index => {
            this.afterGridReady(this.gridParamsFunctionSelector('ensureIndexVisible'), index)
        }



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
