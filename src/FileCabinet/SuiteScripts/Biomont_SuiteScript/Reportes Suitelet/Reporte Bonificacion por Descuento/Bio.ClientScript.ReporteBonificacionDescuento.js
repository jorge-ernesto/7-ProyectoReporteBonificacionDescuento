/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N', './lib/data/Lib.Search'],

    function (N, SearchMe) {

        const FIELDS = {
            view: 'custpage_report_criteria_view',
            year: 'custpage_report_criteria_year',
            month: 'custpage_report_criteria_month'
        }

        /**
         * Function to be executed after page is initialized.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.mode - The mode in which the record is being accessed (create, copy, or edit)
         *
         * @since 2015.2
         */
        function pageInit(scriptContext) {

        }

        /**
         * Function to be executed when field is changed.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         * @param {string} scriptContext.fieldId - Field name
         * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
         * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
         *
         * @since 2015.2
         */
        function fieldChanged(scriptContext) {

            if (scriptContext.fieldId == FIELDS.view || scriptContext.fieldId == FIELDS.year) {

                let viewValue = scriptContext.currentRecord.getValue(FIELDS.view);
                let yearValue = scriptContext.currentRecord.getValue(FIELDS.year);
                let monthField = scriptContext.currentRecord.getField(FIELDS.month);

                if (viewValue == 1 || viewValue == 3) { // Vista - Detallada, Mensual
                    monthField.isDisabled = false;
                    monthField.removeSelectOption({ value: null })
                    SearchMe.createAccountingPeriodByYear(yearValue).forEach(node => {
                        monthField.insertSelectOption({ value: node.id, text: node.text });
                    });
                } else { // Vista - Anual
                    monthField.isDisabled = true;
                    monthField.removeSelectOption({ value: null })
                }
            }
        }

        function exportToExcel() {

            const xlsHref = window.location.href + '&xls=T';

            const a = document.createElement('a');
            a.href = xlsHref;

            // Añade el enlace al documento y haz clic en él para descargar
            document.body.appendChild(a);
            a.click();

            // Limpia el objeto URL y elimina el enlace
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        }

        return {
            pageInit: pageInit,
            fieldChanged: fieldChanged,
            exportToExcel: exportToExcel
        };

    });
