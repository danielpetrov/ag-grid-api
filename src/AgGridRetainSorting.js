import React, { Component } from 'react'
import { callWrapperComponentOnGridReady } from './utils'

const DEFAULT_OPTIONS = {
    retainOnNewData: true,
    retainOnNewColumns: true
}

export const AgGridRetainSorting = (DecoratedComponent, options = DEFAULT_OPTIONS) => {
    class AgGridRetainSorting extends Component {
        constructor() {
            super ()

            this.sortOptions = {}
        }

        onGridReady = params => {
            if (options.retainOnNewData || options.retainOnNewColumns) {
                params.api.addEventListener('sortChanged', () => {
                    this.sortOptions = params.api.getSortModel()
                })
            }

            if (options.retainOnNewData) {
                params.api.addEventListener('componentStateChanged', () => {
                    params.api.setSortModel(this.sortOptions)
                })
            }
            if (options.retainOnNewColumns) {
                params.api.addEventListener('newColumnsLoaded', () => {
                    params.api.setSortModel(this.sortOptions)
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

    AgGridRetainSorting.displayName = `AgGridRetainSorting(${DecoratedComponent.displayName})`

    return AgGridRetainSorting
}
