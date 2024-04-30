/**
 * @NApiVersion 2.1
 */
let path_ = '../../../Reporte Ventas con Costo Estandar/lib/';
define(['./Lib.Basic', `${path_}data/Lib.Search`, `${path_}data/Lib.Process`, './Lib.Search', './Lib.Helper', 'N'],

    function (Basic, Search, Process, SearchMe, Helper, N) {

        function getDataBonDto_Completo(params) {

            // Obtener parametros
            let { subsidiary, view, year, month } = params;

            // Declarar variables
            let headersList = [];
            let arrayCenters = [];
            let totalBottomPeriodMap = {};
            let summaryBottomYearMap = {};
            let percentTotalBottomPeriodMap = {};
            let percentSummaryBottomYearMap = {};

            if (view == Basic.DATA.View.DETAILED || view == Basic.DATA.View.ANNUAL || view == Basic.DATA.View.MONTHLY) {

                // Declarar variables
                let currentPositionYear = -1;
                let currentYearContext = null;
                let currentYear = year;
                let lastYearContext = null;
                let lastYear = null;

                // Obtener periodos contables (Todos los años de forma descendente: 2023, 2022, 2021)
                let yearList = SearchMe.createAccountingPeriodYear();

                // Obtener periodo contable del año actual
                for (var i = 0; i < yearList.length; i++) {
                    let lineYear = yearList[i].id;
                    if (currentYear == lineYear) {
                        currentYearContext = yearList[i];
                        currentPositionYear = i;
                        break;
                    }
                }

                // Obtener periodo contable del año pasado
                lastYearContext = yearList[currentPositionYear + 1];
                lastYear = yearList[currentPositionYear + 1].id;

                // Debug
                // Helper.error_log('debug', { yearList, currentYearContext, currentYear, lastYearContext, lastYear });

                /****************** HEADERS LIST ******************/
                // Declarar variables
                let currentPeriods = [];
                let lastPeriods = [];
                headersList = [];

                // Obtener peridos contables (Todos los meses de año actual y año pasado)
                let auxCurrentPeriods = SearchMe.createAccountingPeriodByYear(currentYear).reverse();
                let auxLastPeriods = SearchMe.createAccountingPeriodByYear(lastYear).reverse();
                let currentMonth = month;

                if (view == Basic.DATA.View.DETAILED) {
                    // Cortar los meses de la matriz, primero busque la posición de un mes
                    for (var i = 0; i < auxCurrentPeriods.length; i++) {
                        currentPeriods.push(auxCurrentPeriods[i]);
                        lastPeriods.push(auxLastPeriods[i]);

                        if (auxCurrentPeriods[i].id == currentMonth) {
                            break;
                        }
                    }
                } else if (view == Basic.DATA.View.MONTHLY) {
                    // Obtener mes en la matriz
                    for (var i = 0; i < auxCurrentPeriods.length; i++) {
                        if (auxCurrentPeriods[i].id == currentMonth) {
                            currentPeriods.push(auxCurrentPeriods[i]);
                            lastPeriods.push(auxLastPeriods[i]);
                        }
                    }
                } else { // ANNUAL
                    // Obtener todos los meses en la matriz
                    for (var i = 0; i < auxCurrentPeriods.length; i++) {
                        currentPeriods.push(auxCurrentPeriods[i]);
                        lastPeriods.push(auxLastPeriods[i]);
                    }
                }

                // Obtener headersList
                for (var i = 0; i < currentPeriods.length; i++) {
                    headersList.push({
                        current: currentPeriods[i],
                        last: lastPeriods[i],
                    });
                }

                // Debug
                // Helper.error_log('debug', { currentPeriods, lastPeriods, headersList });

                /****************** PROCESAR INFORMACION ******************/
                // Obtener ids de periodos
                let totalPeriods_current = headersList.map(element => { return element.current.id });
                let totalPeriods_last = headersList.map(element => { return element.last.id });
                let totalPeriods = totalPeriods_current.concat(totalPeriods_last);

                // Obtener datos para enviar
                let dataVentas = Search.getDataVentasDetalladasByPeriodo(subsidiary, totalPeriods);
                let dataRevaluacion = Search.getDataRevaluacion(subsidiary);
                let dataVentas_Completo = Process.getDataVentas_Completo(dataVentas, dataRevaluacion);
                let dataVentas_Agrupada = agruparVentas(dataVentas_Completo, currentYearContext, lastYearContext, currentPeriods, lastPeriods, headersList);

                // Debug
                // Helper.error_log('totalPeriods', totalPeriods);
                // Helper.error_log('dataVentas', dataVentas);
                // Helper.error_log('dataRevaluacion', dataRevaluacion);
                // Helper.error_log('dataVentas_Completo', dataVentas_Completo);
                // Helper.error_log('dataVentas_Agrupada', dataVentas_Agrupada);

                /****************** ARRAY CENTERS ******************/
                arrayCenters = dataVentas_Agrupada.arrayCenters;

                /****************** TOTAL PERIOD MAP ******************/
                totalBottomPeriodMap = dataVentas_Agrupada.totalBottomPeriodMap;

                /****************** SUMARY YEAR MAP ******************/
                summaryBottomYearMap = dataVentas_Agrupada.summaryBottomYearMap;

                /****************** PERCENT TOTAL PERIOD MAP ******************/
                percentTotalBottomPeriodMap = dataVentas_Agrupada.percentTotalBottomPeriodMap;

                /****************** PERCENT SUMMARY YEAR MAP ******************/
                percentSummaryBottomYearMap = dataVentas_Agrupada.percentSummaryBottomYearMap;
            }

            return { headersList, arrayCenters, totalBottomPeriodMap, summaryBottomYearMap, percentTotalBottomPeriodMap, percentSummaryBottomYearMap };
        }

        function agruparVentas(dataVentas_Completo, currentYearContext, lastYearContext, currentPeriods, lastPeriods, headersList) {

            // Declarar variables
            let currentYearMap = {};
            let lastYearMap = {};

            // Declarar variables
            let arrayCenters = [];
            let totalBottomPeriodMap = {};
            let summaryBottomYearMap = {};
            let percentTotalBottomPeriodMap = {};
            let percentSummaryBottomYearMap = {};

            /******************/

            // Obtener json para almacenar totales por tipo y periodo
            // Parte "Central" de la tabla, es decir todo abajo de la cabecera | Ene 2023 | Ene 2022 | Feb 2023 | Feb 2022 | ... | FY 2023 | FY 2022 |
            let currentPeriods_ = {};
            headersList.forEach(node => {
                currentPeriods_[node.current.id] = {
                    periodo_contable_id_interno: node.current.id,
                    periodo_contable_nombre: node.current.text,
                    cantidad: 0,
                    costo: 0,
                };
                currentPeriods_[node.last.id] = {
                    periodo_contable_id_interno: node.last.id,
                    periodo_contable_nombre: node.last.text,
                    cantidad: 0,
                    costo: 0,
                };
            });

            // Obtener json para almacenar totales por tipo y año
            let current = {
                cantidad: 0,
                costo: 0,
            }
            let last = {
                cantidad: 0,
                costo: 0,
            }

            // Obtener json para almacenar totales por tipo y periodo
            // Parte "Central" de la tabla, es decir todo abajo de la cabecera | Ene 2023 | Ene 2022 | Feb 2023 | Feb 2022 | ... | FY 2023 | FY 2022 |
            let dataVentasAgrupada = {
                'boni_ventas_mes': { id: 'boni_ventas_mes', name: 'BONIF DE VENTAS DEL MES', period: JSON.parse(JSON.stringify(currentPeriods_)), current: JSON.parse(JSON.stringify(current)), last: JSON.parse(JSON.stringify(last)) },
                'mues_nacional_mes': { id: 'mues_nacional_mes', name: 'MUESTRA NACIONAL DEL MES', period: JSON.parse(JSON.stringify(currentPeriods_)), current: JSON.parse(JSON.stringify(current)), last: JSON.parse(JSON.stringify(last)) },
                'mues_exterior_mes': { id: 'mues_exterior_mes', name: 'MUESTRA EXTERIOR DEL MES', period: JSON.parse(JSON.stringify(currentPeriods_)), current: JSON.parse(JSON.stringify(current)), last: JSON.parse(JSON.stringify(last)) },
                'predaglio_belmont': { id: 'predaglio_belmont', name: 'ACCIONISTAS', period: JSON.parse(JSON.stringify(currentPeriods_)), current: JSON.parse(JSON.stringify(current)), last: JSON.parse(JSON.stringify(last)) },
                'rebate': { id: 'rebate', name: 'REBATE', period: JSON.parse(JSON.stringify(currentPeriods_)), current: JSON.parse(JSON.stringify(current)), last: JSON.parse(JSON.stringify(last)) }
            };

            /******************/

            // Obtener periodos del año actual
            currentPeriods.forEach(node => {
                currentYearMap[node.id] = true;
            });

            // Obtener periodos del año pasado
            lastPeriods.forEach(node => {
                lastYearMap[node.id] = true;
            })

            // Obtener json para almacenar totales por periodo - Parte "Totales" de la tabla
            for (var i = 0; i < currentPeriods.length; i++) {
                totalBottomPeriodMap[currentPeriods[i].id] = { cantidad: 0, costo: 0 };
                totalBottomPeriodMap[lastPeriods[i].id] = { cantidad: 0, costo: 0 };
            }

            // Obtener json para almacenar totales por año - Parte "Totales" de la tabla
            summaryBottomYearMap = {
                current: {
                    ...currentYearContext,
                    cantidad: 0,
                    costo: 0
                }, last: {
                    ...lastYearContext,
                    cantidad: 0,
                    costo: 0
                }
            };

            // Debug
            // Helper.error_log('debug', { currentYearMap, lastYearMap, totalBottomPeriodMap, summaryBottomYearMap });

            /******************/

            // Recorrer ventas
            dataVentas_Completo.forEach(element => {

                let fDecimal = 2;

                // Obtener variables
                let periodo_contable_id_interno = element.periodo_contable_id_interno;
                let periodo_contable_nombre = element.periodo_contable_nombre;

                let tipo_impuesto = element.tipo_impuesto;
                let tipo_operacion = element.tipo_operacion;
                let tipo_operacion_biomont = element.tipo_operacion_biomont;
                let sector = element.sector;
                // let cantidad = parseFloat(element.cantidad || 0);
                // let costo = parseFloat(element.costo_total_estandar || 0);
                let cantidad = Math.round10(parseFloat(element.cantidad || 0), -fDecimal); // Procesar reporte
                let costo = Math.round10(parseFloat(element.costo_total_estandar || 0), -fDecimal); // Procesar reporte

                let es_reg_mues_pre_pub_don_pt = false
                if (tipo_operacion_biomont.id == 28 || tipo_operacion_biomont.nombre == 'Reg. Mues.Pre.Pub.Don - PT') {
                    es_reg_mues_pre_pub_don_pt = true;
                }

                let es_boni_ventas_mes = false;
                if ((tipo_impuesto.id == 16 || tipo_impuesto.nombre == 'Inafecto – Retiro por Bonificacion') && !es_reg_mues_pre_pub_don_pt) {
                    es_boni_ventas_mes = true;
                }

                let es_mues_nacional_mes = false;
                if ((tipo_operacion.id == 33 || tipo_operacion.nombre == 'Muestras Médicas') && sector == 'NACIONAL' && !es_reg_mues_pre_pub_don_pt) {
                    es_mues_nacional_mes = true;
                }

                let es_mues_exterior_mes = false;
                if ((tipo_operacion.id == 33 || tipo_operacion.nombre == 'Muestras Médicas') && sector == 'EXTRANJERO' && !es_reg_mues_pre_pub_don_pt) {
                    es_mues_exterior_mes = true;
                }

                let es_predaglio_belmont = false;
                if ((tipo_operacion.id == 33 || tipo_operacion.nombre == 'Muestras Médicas') && (tipo_operacion_biomont.id == 28 || tipo_operacion_biomont.nombre == 'Reg. Mues.Pre.Pub.Don - PT')) {
                    es_predaglio_belmont = true;
                }

                let es_rebate = false;
                if ((tipo_operacion_biomont.id == 13 || tipo_operacion_biomont.nombre == 'Rebate') && !es_reg_mues_pre_pub_don_pt) {
                    es_rebate = true;
                }

                if (es_boni_ventas_mes || es_mues_nacional_mes || es_mues_exterior_mes || es_predaglio_belmont || es_rebate) {

                    // Agrupar ventas por tipo y periodo
                    if (es_boni_ventas_mes) {

                        if (dataVentasAgrupada['boni_ventas_mes']['period'][periodo_contable_id_interno]) {
                            dataVentasAgrupada['boni_ventas_mes']['period'][periodo_contable_id_interno].cantidad += cantidad;
                            dataVentasAgrupada['boni_ventas_mes']['period'][periodo_contable_id_interno].costo += costo;
                        } else {
                            dataVentasAgrupada['boni_ventas_mes']['period'][periodo_contable_id_interno] = {
                                periodo_contable_id_interno,
                                periodo_contable_nombre,
                                cantidad,
                                costo
                            };
                        }

                        if (currentYearMap[periodo_contable_id_interno]) {
                            dataVentasAgrupada['boni_ventas_mes']['current'].cantidad += cantidad;
                            dataVentasAgrupada['boni_ventas_mes']['current'].costo += costo;
                        }
                        if (lastYearMap[periodo_contable_id_interno]) {
                            dataVentasAgrupada['boni_ventas_mes']['last'].cantidad += cantidad;
                            dataVentasAgrupada['boni_ventas_mes']['last'].costo += costo;
                        }
                    }

                    if (es_mues_nacional_mes) {

                        if (dataVentasAgrupada['mues_nacional_mes']['period'][periodo_contable_id_interno]) {
                            dataVentasAgrupada['mues_nacional_mes']['period'][periodo_contable_id_interno].cantidad += cantidad;
                            dataVentasAgrupada['mues_nacional_mes']['period'][periodo_contable_id_interno].costo += costo;
                        } else {
                            dataVentasAgrupada['mues_nacional_mes']['period'][periodo_contable_id_interno] = {
                                periodo_contable_id_interno,
                                periodo_contable_nombre,
                                cantidad,
                                costo
                            };
                        }

                        if (currentYearMap[periodo_contable_id_interno]) {
                            dataVentasAgrupada['mues_nacional_mes']['current'].cantidad += cantidad;
                            dataVentasAgrupada['mues_nacional_mes']['current'].costo += costo;
                        }
                        if (lastYearMap[periodo_contable_id_interno]) {
                            dataVentasAgrupada['mues_nacional_mes']['last'].cantidad += cantidad;
                            dataVentasAgrupada['mues_nacional_mes']['last'].costo += costo;
                        }
                    }

                    if (es_mues_exterior_mes) {

                        if (dataVentasAgrupada['mues_exterior_mes']['period'][periodo_contable_id_interno]) {
                            dataVentasAgrupada['mues_exterior_mes']['period'][periodo_contable_id_interno].cantidad += cantidad;
                            dataVentasAgrupada['mues_exterior_mes']['period'][periodo_contable_id_interno].costo += costo;
                        } else {
                            dataVentasAgrupada['mues_exterior_mes']['period'][periodo_contable_id_interno] = {
                                periodo_contable_id_interno,
                                periodo_contable_nombre,
                                cantidad,
                                costo
                            };
                        }

                        if (currentYearMap[periodo_contable_id_interno]) {
                            dataVentasAgrupada['mues_exterior_mes']['current'].cantidad += cantidad;
                            dataVentasAgrupada['mues_exterior_mes']['current'].costo += costo;
                        }
                        if (lastYearMap[periodo_contable_id_interno]) {
                            dataVentasAgrupada['mues_exterior_mes']['last'].cantidad += cantidad;
                            dataVentasAgrupada['mues_exterior_mes']['last'].costo += costo;
                        }
                    }

                    if (es_predaglio_belmont) {

                        if (dataVentasAgrupada['predaglio_belmont']['period'][periodo_contable_id_interno]) {
                            dataVentasAgrupada['predaglio_belmont']['period'][periodo_contable_id_interno].cantidad += cantidad;
                            dataVentasAgrupada['predaglio_belmont']['period'][periodo_contable_id_interno].costo += costo;
                        } else {
                            dataVentasAgrupada['predaglio_belmont']['period'][periodo_contable_id_interno] = {
                                periodo_contable_id_interno,
                                periodo_contable_nombre,
                                cantidad,
                                costo
                            };
                        }

                        if (currentYearMap[periodo_contable_id_interno]) {
                            dataVentasAgrupada['predaglio_belmont']['current'].cantidad += cantidad;
                            dataVentasAgrupada['predaglio_belmont']['current'].costo += costo;
                        }
                        if (lastYearMap[periodo_contable_id_interno]) {
                            dataVentasAgrupada['predaglio_belmont']['last'].cantidad += cantidad;
                            dataVentasAgrupada['predaglio_belmont']['last'].costo += costo;
                        }
                    }

                    if (es_rebate) {

                        if (dataVentasAgrupada['rebate']['period'][periodo_contable_id_interno]) {
                            dataVentasAgrupada['rebate']['period'][periodo_contable_id_interno].cantidad += cantidad;
                            dataVentasAgrupada['rebate']['period'][periodo_contable_id_interno].costo += costo;
                        } else {
                            dataVentasAgrupada['rebate']['period'][periodo_contable_id_interno] = {
                                periodo_contable_id_interno,
                                periodo_contable_nombre,
                                cantidad,
                                costo
                            };
                        }

                        if (currentYearMap[periodo_contable_id_interno]) {
                            dataVentasAgrupada['rebate']['current'].cantidad += cantidad;
                            dataVentasAgrupada['rebate']['current'].costo += costo;
                        }
                        if (lastYearMap[periodo_contable_id_interno]) {
                            dataVentasAgrupada['rebate']['last'].cantidad += cantidad;
                            dataVentasAgrupada['rebate']['last'].costo += costo;
                        }
                    }

                    totalBottomPeriodMap[periodo_contable_id_interno].cantidad += cantidad;
                    totalBottomPeriodMap[periodo_contable_id_interno].costo += costo;

                    if (currentYearMap[periodo_contable_id_interno]) {
                        summaryBottomYearMap['current'].cantidad += cantidad;
                        summaryBottomYearMap['current'].costo += costo;
                    }
                    if (lastYearMap[periodo_contable_id_interno]) {
                        summaryBottomYearMap['last'].cantidad += cantidad;
                        summaryBottomYearMap['last'].costo += costo;
                    }
                }
            });

            // Convertir JSON en Array
            arrayCenters = Object.values(dataVentasAgrupada);

            /******************/

            // Obtener json para almacenar porcentajes de totales por periodo - Parte "Totales" de la tabla
            for (var i = 0; i < currentPeriods.length; i++) {
                percentTotalBottomPeriodMap[currentPeriods[i].id] = { variacion_anual: 0, variacion_mensual: 0 };
            }

            headersList.forEach((header, key) => {
                let current = totalBottomPeriodMap[header.current.id];
                let last = totalBottomPeriodMap[header.last.id];

                // Obtener variacion anual
                let variacion_anual = 0;
                if (last.costo > 0) { // Validar division entre 0
                    variacion_anual = (current.costo - last.costo) / last.costo;
                }

                // Obtener variacion mensual
                let variacion_mensual = 0;
                if (key != 0) { // No es Enero
                    let header_ = headersList[key - 1];
                    let current_ = totalBottomPeriodMap[header_.current.id];
                    if (current_.costo > 0) { // Validar division entre 0
                        variacion_mensual = (current.costo - current_.costo) / current_.costo;
                    }
                }

                percentTotalBottomPeriodMap[header.current.id].variacion_anual = variacion_anual;
                percentTotalBottomPeriodMap[header.current.id].variacion_mensual = variacion_mensual;
            });

            /******************/

            // Obtener json para almacenar porcentajes de totales por año - Parte "Totales" de la tabla
            percentSummaryBottomYearMap = {
                current: {
                    ...currentYearContext,
                    variacion_anual_acumulada: 0
                }
            };

            // Obtener variacion anual acumulada
            let variacion_anual_acumulada = 0;
            if (summaryBottomYearMap['last'].costo > 0) {
                variacion_anual_acumulada = (summaryBottomYearMap['current'].costo - summaryBottomYearMap['last'].costo) / summaryBottomYearMap['last'].costo;
            }

            percentSummaryBottomYearMap['current'].variacion_anual_acumulada = variacion_anual_acumulada;

            /******************/

            return { arrayCenters, totalBottomPeriodMap, summaryBottomYearMap, percentTotalBottomPeriodMap, percentSummaryBottomYearMap };
        }

        function getReporteFreeMarker(dataReporte) {

            // Convertir valores nulos en un objeto JavaScript a string - Al parecer FreeMarker no acepta valores nulos
            // dataReporte = Helper.convertObjectValuesToStrings(dataReporte);

            return dataReporte;
        }

        return { getDataBonDto_Completo, getReporteFreeMarker }

    });
