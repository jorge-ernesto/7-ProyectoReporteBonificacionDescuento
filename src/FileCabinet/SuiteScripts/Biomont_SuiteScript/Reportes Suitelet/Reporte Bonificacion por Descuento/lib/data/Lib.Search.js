/**
 * @NApiVersion 2.1
 */
define(['./Lib.Basic', './Lib.Helper', 'N'],

    function (Basic, Helper, N) {

        const { search, format } = N;

        /******************/

        function createAccountingPeriodYear() {

            let result = [];
            let currentDate = format.format({ type: format.Type.DATE, value: new Date() });

            search.create({
                type: 'accountingperiod',
                filters:
                    [
                        ["isyear", "is", "T"],
                        'AND',
                        ['startdate', 'onorbefore', currentDate]
                    ],
                columns: [
                    { name: 'startdate', sort: 'DESC', label: 'start' },
                    { name: 'internalid', label: 'id' },
                    { name: "periodname", label: "Name" }
                ]
            }).run().each(node => {
                let { columns } = node;
                result.push({
                    id: node.getValue(columns[1]),
                    text: node.getValue(columns[2])
                });
                return true;
            });
            return result;
        }

        function createAccountingPeriodByYear(year) {

            let result = [];

            search.create({
                type: 'accountingperiod',
                filters:
                    [
                        ["parent", "anyof", year],
                        "AND",
                        ["isquarter", "is", "F"],
                        "AND",
                        ["isyear", "is", "F"],
                        'AND',
                        ["isadjust", "is", "F"]
                    ],
                columns: [
                    { name: 'startdate', sort: 'DESC', label: 'start' },
                    { name: 'internalid', label: 'id' },
                    { name: "periodname", label: "Name" }
                ]
            }).run().each(node => {
                let { columns } = node;
                result.push({
                    id: node.getValue(columns[1]),
                    text: node.getValue(columns[2])
                });
                return true;
            });
            return result;
        }

        return { createAccountingPeriodYear, createAccountingPeriodByYear }

    });
