/**
 * @NApiVersion 2.1
 */
let path = '../../../Reporte Ventas con Costo Estandar/lib/';
define(['./Class.ReportRenderer', '../data/Lib.Basic', `${path}data/Lib.Search`, `${path}data/Lib.Process`, '../data/Lib.Process', '../data/Lib.Helper', 'N'],

    function (ReportRenderer, Basic, Search, Process, ProcessMe, Helper, N) {

        const { log } = N;

        /******************/

        class BonificacionDescuento extends ReportRenderer {

            constructor(params) {
                // Enviamos template a ReportRenderer
                if (params.xls === 'T') {
                    super(Basic.DATA.Report.BONIFICACION_DESCUENTO_XLS);
                } else {
                    super(Basic.DATA.Report.BONIFICACION_DESCUENTO);
                }

                // Obtener parametros
                let { subsidiary, view, year, month } = params;

                // Debug
                // Helper.error_log('params', params);

                // Obtener datos para enviar
                let dataBonDto_Completo = ProcessMe.getDataBonDto_Completo(params);

                // Procesar reporte
                let dataReporte = ProcessMe.getReporteFreeMarker(dataBonDto_Completo);

                // Debug
                // Helper.error_log('dataBonDto_Completo', dataBonDto_Completo);
                // Helper.error_log('dataReporte', dataReporte);

                // Enviar data a archivos HTML o Excel
                let titleDocument = 'Reporte Bonificacion por Descuento';
                this.addInput('name', titleDocument);
                this.addInput('year', params.year);
                this.addInput('month', params.month);
                this.addInput('headers', dataReporte.headersList);
                this.addInput('centers', dataReporte.arrayCenters);
                this.addInput('total', dataReporte.totalBottomPeriodMap);
                this.addInput('summary', dataReporte.summaryBottomYearMap);
                this.addInput('percentTotal', dataReporte.percentTotalBottomPeriodMap);
                this.addInput('percentSummary', dataReporte.percentSummaryBottomYearMap);
            }
        }

        return BonificacionDescuento

    });
