import React, { Component } from 'react'
import { callWrapperComponentOnGridReady } from './utils'

const DEFAULT_OPTIONS = {
    retainOnNewData: true,
    retainOnNewColumns: true
}

export const AgGridRetainFiltering = (DecoratedComponent, options = DEFAULT_OPTIONS) => {
    class AgGridRetainFiltering extends Component {
        constructor() {
            super()

            this.filterOptions = {}
        }

        onGridReady = params => {
            if (options.retainOnNewData || options.retainOnNewColumns) {
                params.api.addEventListener('filterChanged', () => {
                    this.filterOptions = params.api.getFilterModel()
                })
            }

            if (options.retainOnNewData) {
                params.api.addEventListener('componentStateChanged', () => {
                    params.api.setFilterModel(this.filterOptions)
                })
            }
            if (options.retainOnNewColumns) {
                params.api.addEventListener('newColumnsLoaded', () => {
                    params.api.setFilterModel(this.filterOptions)
                })
            }

            callWrapperComponentOnGridReady({ props: this.props, params })
        }

        render() {
            return (
                <DecoratedComponent
                    {...this.props}
                    onGridReady={this.onGridReady}
                />
            )
        }
    }

    AgGridRetainFiltering.displayName = `AgGridRetainFiltering(${DecoratedComponent.displayName})`

    return AgGridRetainFiltering
}
