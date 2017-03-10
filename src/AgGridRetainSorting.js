import React, { PureComponent as Component, PropTypes } from 'react'
import { callWrapperComponentOnGridReady } from './utils'

export const AgGridRetainSorting = DecoratedComponent => {
    class AgGridRetainSorting extends Component {
        constructor() {
            this.gridParams = {
                api: {
                    getSortModel: () => {},
                    setSortModel: () => {}
                }
            }
            this.sortOptions = {}
        }

        onGridReady = params => {
            this.gridParams = params

            params.api.addEventListener('sortChanged', () => {
                this.sortOptions = this.gridParams.api.getSortModel()
            })
            params.api.addEventListener('newColumnsLoaded', () => {
                this.gridParams.api.setSortModel(this.sortOptions)
            })

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

    AgGridRetainSorting.propTypes = {
        onGridReady: PropTypes.func,
        agGridApiProps: PropTypes.object
    }

    AgGridRetainSorting.displayName = `AgGridRetainSorting(${DecoratedComponent.displayName})`

    return AgGridRetainSorting
}
