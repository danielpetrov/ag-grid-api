import React, { PureComponent as Component } from 'react'

const AG_GRID_API_FUNCTIONS = [
    'exportDataAsCsv',
    'selectAll',
    'deselectAll'
]

export const AgGridApi = (DecoratedComponent, passedDownFunctions = AG_GRID_API_FUNCTIONS) => {
    class AgGridApi extends Component {
        constructor() {
            super()

            this.state = {}
            this.state.gridParams = {}
            this.state.gridParams.api = {}
            this.state.isGridReady = false
        }

        afterGridReady = (callback, options) => {
            const { isGridReady, gridParams } = this.state

            if (isGridReady) {
                callback.call(gridParams.api, options)
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
        }

        exportDataAsCsv = () => {
            const { gridParams } = this.state

            this.afterGridReady(this.gridParamsFunctionSelector('exportDataAsCsv'), gridParams)
        }

        selectAll = () => {
            this.afterGridReady(this.gridParamsFunctionSelector('selectAll'))
        }

        render() {
            const { isGridReady, gridParams } = this.state
            const agGridApiFunctionPassedDown = passedDownFunctions.reduce((acc, value) => {
                acc[value] = this[value]

                return acc
            }, {})

            return (
                <DecoratedComponent
                    {...this.props}
                    isGridReady={isGridReady}
                    gridParams={gridParams}
                    onGridReady={this.onGridReady}
                    {...agGridApiFunctionPassedDown}
                />
            )
        }
    }

    AgGridApi.displayName = `AgGridApi(${DecoratedComponent.displayName})`

    return AgGridApi
}
