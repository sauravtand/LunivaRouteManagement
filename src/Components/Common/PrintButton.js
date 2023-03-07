import { Button, message } from "antd";
import React from "react";
import { newTableStyles } from "./TableStyles";
import { GrPrint } from "react-icons/gr";
import { dateFormat } from "../../Helpers/TodayDate";


const PrintButton = ({
    dataSource,
    dataHead,
    Title,
    filterData
}) => {
    const printHandle = () => {

        // console.log(filterData, 'filterData from print');
        if (dataSource) {
            let newWindow = window.open();

            let newStyle = ``;

            newStyle = `<style>thead > tr> th:first-child, thead > tr> th:nth-child(2), tbody > tr > td:first-child,tbody > tr > td:nth-child(2){
      
       }tbody > tr:last-child{
    // background-color: #f0f0f2;
 
    }
    tbody > tr:last-child > td{
        // font-size: 12px;
        // font-weight: 500;
    }
    
    
    </style>`;


            let refName = `
    <div >
  
        <h2 style='text-align:center;'>  श्री स्थानिय यातायात प्रा.लि.</h2>
        <p style='text-align:center;'>पोखरा, ०१-५९०९०८५</p>
        <h4 style='text-align:center;text-decoration:underline;'>${Title}</h4>
        
        </div>
        <div >
        
        <div style='float:right;margin-bottom:10px;'>
        <strong >From</strong> ${filterData.FromTo[0].format(dateFormat)} - <strong>To</strong> ${filterData.FromTo[1].format(dateFormat)}

        </div>
      
    </div>
    `;




            let tableBody = "";
            let tableHeadHtml = "<thead>";
            let columns = [];

            if (dataHead) {
                dataHead.forEach((ele) => {
                    // console.log(ele, 'key');
                    tableHeadHtml += `<th>${ele.dataIndex}</th>`;
                    columns.push(ele.dataIndex);
                });
                tableHeadHtml += "</thead>";



                dataSource.forEach((ele) => {
                    tableBody = tableBody + "<tr>";
                    columns.forEach((cell) => {
                        // console.log(cell, ele, ele[cell], 'cell data');
                        tableBody = tableBody + "<td>" + ele[cell] + "</td>";
                    });
                    tableBody = tableBody + "</tr>";
                });

                let allTable = `<table>${tableHeadHtml}${tableBody}</table>`;

                newWindow.document.body.innerHTML =
                    newTableStyles + newStyle + refName + allTable;

                setTimeout(function () {
                    newWindow.print();
                    newWindow.close();
                }, 300);
            }
        } else {
            message.info("select some data");
        }
    };

    return (
        <>


            <Button type="primary" htmlType="button" onClick={() => {
                printHandle();
            }}>

                <GrPrint />&nbsp;Print

            </Button>


        </>
    );
};

export default PrintButton;
