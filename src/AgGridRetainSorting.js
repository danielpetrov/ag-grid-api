import React, { PureComponent as Component, PropTypes } from 'react'
import { callWrapperComponentOnGridReady, warnThatAgGridHasNotLoadedYet } from './utils'

const DEFAULT_OPTIONS = {
    log: false
}

export const AgGridRetainSorting = (DecoratedComponent, options) => {
    class AgGridRetainSorting extends Component {
        gridParams = {
            api: {
                getSortModel: () => {},
                setSortModel: () => {}
            }
        }
        sortOptions = {}

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
