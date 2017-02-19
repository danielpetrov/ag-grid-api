import React, { PureComponent as Component } from 'react'

const ALL_AG_GRID_API_FUNCTIONS = [
    'exportDataAsCsv',
    'selectAll',
    'deselectAll'
]

const DEFAULT_OPTIONS = {
    log: false,
    flatten: true,
    apiFunctions: ALL_AG_GRID_API_FUNCTIONS
}

export const AgGridApi = (DecoratedComponent, options = DEFAULT_OPTIONS) => {
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
               return callback.call(gridParams.api, options)
            } else if (options.log) {
                console.warn('Ag grid has not loaded yet')
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
            const agGridApiFunctionPassedDown = options.apiFunctions.reduce((acc, value) => {
                acc[value] = this[value]

                return acc
            }, {})
            let decoratedComponentProps
            const agGridApiProps = {
                isGridReady,
                gridParams,
                onGridReady: this.onGridReady,
                agGridApiFunctionPassedDown
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
