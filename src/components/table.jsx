import React from 'react';
import PropTypes from 'prop-types';
import Alert from '../components/alerts';
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import emptyState from '../assets/images/empty-state.png';

export default function Table(props) {
    const { title, tableData, columns, options, dataError, notFoundText } = props;
    const getMuiTheme = () => createMuiTheme({
        overrides: {
            MUIDataTableHeadCell: {
                root: {
                    '&:last-child': {
                        width: 150
                    }
                }
            }
        }
    })

    if (dataError) {
        return <Alert className="m-4" type="danger" show={dataError} text={dataError} />;
    } else if (tableData && tableData.length) {
        return (
            <React.Fragment>

                <MuiThemeProvider theme={getMuiTheme()}>
                    <MUIDataTable
                        title={title}
                        data={tableData}
                        columns={columns}
                        options={options}
                    />
                </MuiThemeProvider>

            </React.Fragment>
        )
    } else {
        return (
            <div className="empty-state">
                <img className="placeholder-img" src={emptyState} />
                <p>{notFoundText ? notFoundText : 'Data not found!'}</p>
            </div>
        )
    }
}

Table.propTypes = {
    title: PropTypes.string.isRequired,
    tableData: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    options: PropTypes.object.isRequired
}