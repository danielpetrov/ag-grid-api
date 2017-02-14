import React, { PureComponent as Component, PropTypes } from 'react'

export const AgGridRetainFiltering = DecoratedComponent => {
    class AgGridRetainFiltering extends Component {
        constructor() {
            super()

            this.state = {}
            this.state.gridParams = {}
            this.state.isGridReady = false
        }

        setColumnFilterOptions = filterOptions => {
            this.api.setFilterModel(filterOptions)
        }

        onGridReady = params => {
            this.setState({
                isGridReady: true,
                gridParams: params
            })

            let filterOptions = {}

            params.api.addEventListener('filterChanged', () => {
                filterOptions = params.api.getFilterModel()
            })

            params.api.addEventListener('newColumnsLoaded', () => {
                this.setColumnFilterOptions(filterOptions)
            })

            if (this.props.onGridReady) {
                this.props.onGridReady(params)
            }
        }

        render() {
            const { isGridReady, gridParams } = this.state

            return (
                <DecoratedComponent
                    {...this.props}
                    isGridReady={isGridReady}
                    gridParams={gridParams}
                    onGridReady={this.onGridReady}
                />
            )
        }
    }

    AgGridRetainFiltering.propTypes = {
        onGridReady: PropTypes.func
    }

    AgGridRetainFiltering.displayName = `AgGridRetainFiltering(${DecoratedComponent.displayName})`

    return AgGridRetainFiltering
}
