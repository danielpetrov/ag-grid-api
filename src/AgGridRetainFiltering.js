import React, { PureComponent as Component, PropTypes } from 'react'
import { callWrapperComponentOnGridReady } from './utils'

export const AgGridRetainFiltering = DecoratedComponent => {
    class AgGridRetainFiltering extends Component {
        gridParams = {
            api: {
                getFilterModel: () => {},
                setFilterModel: () => {}
            }
        }
        filterOptions = {}

        onGridReady = params => {
            this.gridParams = params

            params.api.addEventListener('filterChanged', () => {
                this.filterOptions = this.gridParams.api.getFilterModel()
            })
            params.api.addEventListener('newColumnsLoaded', () => {
                this.gridParams.api.setFilterModel(this.filterOptions)
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

    AgGridRetainFiltering.propTypes = {
        onGridReady: PropTypes.func,
        agGridApiProps: PropTypes.object
    }

    AgGridRetainFiltering.displayName = `AgGridRetainFiltering(${DecoratedComponent.displayName})`

    return AgGridRetainFiltering
}
