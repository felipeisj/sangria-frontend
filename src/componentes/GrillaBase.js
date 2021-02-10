import React, {useState, useEffect, useContext} from 'react';
import DataGrid, { Column, Row as GridRow, RowRendererProps } from 'react-data-grid';
import { ContextMenu, MenuItem, SubMenu, ContextMenuTrigger } from 'react-contextmenu';
import {ButtonGroup, Button, OverlayTrigger, Tooltip} from 'react-bootstrap';
import 'react-data-grid/dist/react-data-grid.css';
import './react-contextmenu.css';
import './GrillaBase.css';
import { FcCheckmark, FcCancel,  } from 'react-icons/fc';
import { FaRegFileExcel, FaRegQuestionCircle, FaRegFilePdf } from 'react-icons/fa';
import { createPortal } from 'react-dom';



export function GrillaBase(props) {

    const { minHeight, showCountRows, ...rest } = props
    var compRows = showCountRows === undefined ? true : showCountRows;

    function RowRenderer(props) {
        return (
          <ContextMenuTrigger id="grid-context-menu" collect={() => ({ rowIdx: props.rowIdx })}>
            <GridRow {...props} />
          </ContextMenuTrigger>
        );
    }

    const EmptyRowsView = () => {
        const message = "No hay información";
        return (
          <div
            style={{ textAlign: "center", backgroundColor: "#ddd", padding: "100px" }}
          >
            <img src={window.location.origin + '/logo192.png'} alt={message} />
            <h3>{message}</h3>
          </div>
        );
    };

    return (
        
        <div>
            <DataGrid
                {...rest}
                minHeight={minHeight ? minHeight : 450}
                emptyRowsView={EmptyRowsView}
                rowRenderer={RowRenderer}
            />
            {compRows === true &&
                <div align="center">
                    <button type="button" className="btn btn-info btn-sm" style={{ width: "100%" }}>
                        Datos: <span className="badge badge-light">{props.rows.length}</span>
                    </button>
                </div>
            }
            {props.menu && createPortal(
                props.menu,
                document.body
            )}
        </div>
    )
}


export function BotonesGrilla(props){

    return (
        <ButtonGroup>
            <Button
                variant="outline-secondary"
                size="sm">
                    <FaRegFileExcel />
            </Button>
            {/* <Button
                variant="outline-secondary"
                size="sm">
                <FaRegFilePdf />
            </Button> */}
            <Button
                variant="outline-secondary"
                size="sm">
                <FaRegQuestionCircle />
            </Button>
        </ButtonGroup>
    );
}


export function separadorDeMiles(value) {
    var num = Math.round(value);
    num = num.toString().replace(/\./g,'');
    if(!isNaN(num)){
        num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1.');
        num = num.split('').reverse().join('').replace(/^[\.]/,'');
        return num.indexOf("-.")!=-1 ? num.replace("-.","-") : num;
    } else {
        return value;
    }
};

export const CheckFormatter = ({ row, column }) => {
    const value = row[column.key];
    return <div style={{ textAlign: 'center', fontSize: '14px' }}>
                {(value ? <FcCheckmark /> : <FcCancel />)}
            </div>
};


export const PercentFormatter = ({ row, column }) => {
    const value = row[column.key];
    if (value !== null && value !== ''){
        return <p style={{textAlign: 'center'}}> {value.toString().replace('.', ',')} % </p>;
    } else {
        return <p style={{textAlign: 'center'}}> </p>;
    }
};


export const NumberFormatter = ({ row, column }) => {
    const value = row[column.key];
    if (value !== null && value !== ''){
        if (value < 0) {
            return <p style={{textAlign: 'right', color: 'red'}}> {separadorDeMiles(value)} </p>;
        } else {
            return <p style={{textAlign: 'right'}}> {separadorDeMiles(value)} </p>;
        }
    } else {
        return <p style={{textAlign: 'right'}}> {value} </p>;
    }
};


export const DateTimeFormatter = ({ row, column }) => {
    const value = row[column.key];
    if (value) {
        let value2 = value.replace(/-/g, '/');
        let date = new Date(value2);
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        return <p>{("00" + day).slice(-2)}-{("00" + month).slice(-2)}-{year} {hours}:{minutes}</p>;
    } else {
        return "";
    }
};


export const LongTextFormatter = ({ row, column }) => {
    const value = row[column.key];
    return <p style={{whiteSpace:'pre-wrap'}}> {value} </p>
};

export const RightAlign = ({ row, column  }) => {
    const value = row[column.key];
    return <p style={{textAlign: 'right'}}> {value} </p>;
};


export const sortRows = (initialRows, sortColumn, sortDirection) => rows => {
    const comparer = (a, b) => {
        if (sortDirection === "ASC") {
        return a[sortColumn] > b[sortColumn] ? 1 : -1;
        } else if (sortDirection === "DESC") {
        return a[sortColumn] < b[sortColumn] ? 1 : -1;
        }
    };
    return sortDirection === "NONE" ? initialRows : [...rows].sort(comparer);
};

//export default GrillaBase