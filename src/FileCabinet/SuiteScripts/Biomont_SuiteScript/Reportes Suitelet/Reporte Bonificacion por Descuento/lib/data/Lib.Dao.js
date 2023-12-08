/**
 * @NApiVersion 2.1
 */
define(['N'],

    function (N) {

        const { runtime } = N;

        /******************/

        const LANGUAGE = {
            'es': 2,
            'sp': 2,
            'en': 1
        }

        const DEFAULT = {
            2: '- No Definido -',
            1: '- Undefined -'
        }

        const LABELS = [
            ['custpage_report_title', 'Discount Bonus Report', 'Reporte Bonificacion por Descuento'],
            ['custpage_report_group_criteria_1', 'Main', 'Inicio'],
            ['custpage_report_group_criteria_2', 'Filters', 'Filtros'],
            ['custpage_report_criteria_report', 'Report', 'Presentación'],
            ['custpage_report_criteria_subsidiary', 'Subsidiary', 'Subsidiaria'],
            ['custpage_report_criteria_view', 'View', 'Vista'],
            ['custpage_report_criteria_year', 'Year', 'Año'],
            ['custpage_report_criteria_month', 'Month', 'Mes'],
            ['custpage_report_button_visualize', 'Generate', 'Generar'],
            ['custpage_report_button_export_xls', 'Export Excel', 'Exportar Excel'],
            ['custpage_report_button_export_csv', 'Export CSV', 'Exportar CSV']
        ]

        class DAO {

            constructor() {
                let currentLanguage = runtime.getCurrentUser().getPreference('language');
                currentLanguage = LANGUAGE[currentLanguage];

                if (!currentLanguage) currentLanguage = LANGUAGE['es'];

                let data = {};
                LABELS.forEach(currentLabel => {
                    let id = currentLabel[0];
                    let label = currentLabel[currentLanguage];
                    data[id] = label;
                })
                this.translate = data;
                this.undefined = DEFAULT[currentLanguage];
            }

            get(id) {
                return this.translate[id] ? this.translate[id] : this.undefined;
            }
        }

        return DAO;

    });
