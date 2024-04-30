/**
 * @NApiVersion 2.1
 */
define(['N', './data/Lib.Dao', './data/Lib.Basic', './data/Lib.Helper', './data/Lib.Search'],

    function (N, DAO, Basic, Helper, Search) {

        const { log, redirect, runtime } = N;
        const { serverWidget } = N.ui;

        /******************/

        var formContext = {
            dao: null,
            form: null,
            params: {}
        }

        const SUITELET_RECORD = {
            title: 'custpage_report_title',
            groups: {
                main: 'custpage_report_group_criteria_1',
                criteria: 'custpage_report_group_criteria_2'
            },
            fields: {
                subsidiary: 'custpage_report_criteria_subsidiary',
                view: 'custpage_report_criteria_view',
                year: 'custpage_report_criteria_year',
                month: 'custpage_report_criteria_month'
            },
            buttons: {
                generate: 'custpage_report_button_visualize',
                exportXLS: 'custpage_report_button_export_xls',
                exportCSV: 'custpage_report_button_export_csv'
            }
        }

        function setInput(params) {
            log.debug('Input.Report', params);
            formContext.params = params;
        }

        function selectedReport() {
            log.debug('selectedReport', formContext.params.report);
            return Number(formContext.params.report);
        }

        /**
         * description : Create Basic Form, add buttons and client script
         */
        function createReportForm() {

            formContext.dao = new DAO();
            formContext.form = serverWidget.createForm({
                title: formContext.dao.get(SUITELET_RECORD.title)
            });

            formContext.form.addSubmitButton({
                label: formContext.dao.get(SUITELET_RECORD.buttons.generate)
            });

            formContext.form.clientScriptModulePath = '../Bio.ClientScript.ReporteBonificacionDescuento'

            // formContext.form.addButton({
            //     id: SUITELET_RECORD.buttons.exportXLS,
            //     label: formContext.dao.get(SUITELET_RECORD.buttons.exportXLS),
            //     functionName: 'exportToExcel()'
            // });
        }

        /**
         * description : create criteria Fields
         */
        function createCriteriaGroup() {

            // Criteria Group
            let group = formContext.form.addFieldGroup({
                id: SUITELET_RECORD.groups.criteria,
                label: formContext.dao.get(SUITELET_RECORD.groups.criteria),
            });

            // Subsidiary Field
            let subsidiaryField = formContext.form.addField({
                id: SUITELET_RECORD.fields.subsidiary,
                label: formContext.dao.get(SUITELET_RECORD.fields.subsidiary),
                type: 'select',
                source: 'subsidiary',
                container: SUITELET_RECORD.groups.criteria
            });
            subsidiaryField.updateBreakType({ breakType: 'STARTCOL' })
            subsidiaryField.isMandatory = true;

            if (formContext.params.subsidiary) {
                subsidiaryField.defaultValue = formContext.params.subsidiary;
            }

            // Viewer Field
            let viewFormField = formContext.form.addField({
                id: SUITELET_RECORD.fields.view,
                label: formContext.dao.get(SUITELET_RECORD.fields.view),
                type: 'select',
                container: SUITELET_RECORD.groups.criteria
            });
            viewFormField.updateBreakType({ breakType: 'STARTCOL' })
            viewFormField.isMandatory = true;

            // viewFormField.addSelectOption({ value: '', text: '' });
            for (var key in Basic.STATIC_DATA.viewForm) {
                viewFormField.addSelectOption({ value: key, text: Basic.STATIC_DATA.viewForm[key] })
            }

            if (formContext.params.view) {
                viewFormField.defaultValue = formContext.params.view;
            }

            // Period Year Field
            let yearField = formContext.form.addField({
                id: SUITELET_RECORD.fields.year,
                label: formContext.dao.get(SUITELET_RECORD.fields.year),
                type: 'select',
                container: SUITELET_RECORD.groups.criteria
            });
            yearField.updateBreakType({ breakType: 'STARTCOL' })
            yearField.isMandatory = true;

            let yearArray = Search.createAccountingPeriodYear();

            yearArray.forEach(node => {
                yearField.addSelectOption({ value: node.id, text: node.text });
            });

            if (formContext.params.year) {
                yearField.defaultValue = formContext.params.year;
            }

            //Period Month Field
            let monthField = formContext.form.addField({
                id: SUITELET_RECORD.fields.month,
                label: formContext.dao.get(SUITELET_RECORD.fields.month),
                type: 'select',
                container: SUITELET_RECORD.groups.criteria
            });
            monthField.updateBreakType({ breakType: 'STARTCOL' })

            if (formContext.params.view && formContext.params.view != 1 && formContext.params.view != 3) {
                monthField.updateDisplayType({ displayType: 'DISABLED' })
            } else {
                let selectedYear = formContext.params.year;
                selectedYear = selectedYear ? selectedYear : yearArray[0].id;

                if (selectedYear) {
                    Search.createAccountingPeriodByYear(selectedYear).forEach(node => {
                        monthField.addSelectOption({ value: node.id, text: node.text });
                    });
                    if (formContext.params.month) {
                        monthField.defaultValue = formContext.params.month;
                    }
                }
            }
        }

        /**
         * Create HTML Container Field
         */
        function createViewerModel(htmlReport) {

            let viewerModelField = formContext.form.addField({
                id: 'custpage_report_viewer_html',
                label: ' ',
                type: 'inlinehtml'
            });
            viewerModelField.updateLayoutType({
                layoutType: serverWidget.FieldLayoutType.OUTSIDEBELOW
            });

            let htmlContainer = new String();
            htmlContainer = htmlContainer.concat(Helper.getDefaultStyle());
            htmlContainer = htmlContainer.concat(htmlReport);
            viewerModelField.defaultValue = htmlContainer;
        }

        /**
         * Return form
         */
        function getForm() {
            return formContext.form;
        }

        /**
         * Redirect to the same suitelet
         */
        function loadReportForm(params) {

            let getParams = {};
            for (var x in SUITELET_RECORD.fields) {
                let value = params[SUITELET_RECORD.fields[x]];
                if (value) {
                    getParams[x] = value;
                }
            }
            getParams['report'] = 1;

            redirect.toSuitelet({
                scriptId: runtime.getCurrentScript().id,
                deploymentId: runtime.getCurrentScript().deploymentId,
                parameters: getParams
            });
        }

        return {
            setInput,
            selectedReport,
            createReportForm,
            createCriteriaGroup,
            createViewerModel,
            getForm,
            loadReportForm
        }

    });
