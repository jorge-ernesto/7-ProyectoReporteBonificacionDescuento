<#function generateVariationPercent current last>
    <#assign percent=0 />
    <#attempt>

        <#if (current> 0 && last = 0)>
            <#assign percent=0 />
        <#else>
            <#assign percent=(current-last)/last />
        </#if>

        <#recover>
            <#assign percent=0 />
    </#attempt>
    <#return percent />
</#function>
<?xml version="1.0"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:o="urn:schemas-microsoft-com:office:office"
    xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
    xmlns:html="http://www.w3.org/TR/REC-html40">
    <ss:Styles>
        <ss:Style ss:ID="header">
            <ss:Alignment ss:Horizontal="Left" />
            <ss:Font ss:Bold="1" />
            <Borders>
                <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
            </Borders>
        </ss:Style>
        <ss:Style ss:ID="header-red">
            <ss:Alignment ss:Horizontal="Left" />
            <ss:Font ss:Bold="1" ss:Color="#ff0000" />
        </ss:Style>
        <ss:Style ss:ID="t1">
            <#--  <ss:Alignment ss:Horizontal="Left" />  -->
            <ss:Font ss:Bold="1" />
            <Borders>
                <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
            </Borders>
            <ss:Interior ss:Color="#E0E6EF" ss:Pattern="Solid" />
            <NumberFormat ss:Format="0.00" />
        </ss:Style>
        <ss:Style ss:ID="t1-percent">
            <ss:Font ss:Bold="1" />
            <Borders>
                <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
            </Borders>
            <ss:Interior ss:Color="#E0E6EF" ss:Pattern="Solid" />
            <NumberFormat ss:Format="0%" />
        </ss:Style>
        <ss:Style ss:ID="t1-number">
            <ss:Font ss:Bold="1" />
            <Borders>
                <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
            </Borders>
            <ss:Interior ss:Color="#E0E6EF" ss:Pattern="Solid" />
        </ss:Style>
        <ss:Style ss:ID="t1-currency">
            <ss:Font ss:Bold="1" />
            <Borders>
                <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
            </Borders>
            <ss:Interior ss:Color="#E0E6EF" ss:Pattern="Solid" />
            <NumberFormat ss:Format="Currency" />
        </ss:Style>
        <ss:Style ss:ID="background">
            <Alignment ss:Horizontal="Right" ss:Vertical="Bottom" />
            <Borders>
                <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#FFFFFF" />
                <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#FFFFFF" />
                <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#FFFFFF" />
                <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#FFFFFF" />
            </Borders>
        </ss:Style>
        <ss:Style ss:ID="cell">
            <Borders>
                <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
            </Borders>
            <NumberFormat ss:Format="0.00" />
        </ss:Style>
        <ss:Style ss:ID="cell-percent">
            <Borders>
                <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
            </Borders>
            <NumberFormat ss:Format="0%" />
        </ss:Style>
        <ss:Style ss:ID="cell-currency">
            <Borders>
                <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
            </Borders>
            <NumberFormat ss:Format="Currency" />
        </ss:Style>
    </ss:Styles>
    <Worksheet ss:Name="Reporte Comparativo">
        <Table ss:StyleID="background">

            <!-- TAMAÑO DE COLUMNAS -->
            <Column ss:Width="200" />
            <Column ss:Width="20" />
            <#list context.headers as header>
                <Column ss:Width="80" />
                <Column ss:Width="80" />
                <Column ss:Width="80" />
                <Column ss:Width="80" />
                <Column ss:Width="20" />
            </#list>
            <Column ss:Width="80" />
            <Column ss:Width="80" />
            <Column ss:Width="80" />
            <Column ss:Width="80" />
            <Row>
            </Row>

            <!-- PRESENTACION -->
            <Row>
                <Cell ss:StyleID="header-red">
                    <Data ss:Type="String">LABORATORIOS BIOMONT S.A.</Data>
                </Cell>
            </Row>
            <Row>
                <Cell ss:StyleID="header">
                    <Data ss:Type="String">Presentacion :</Data>
                </Cell>
                <Cell ss:StyleID="cell" ss:MergeAcross="2">
                    <Data ss:Type="String">${context.name}</Data>
                </Cell>
            </Row>
            <!--
            <Row>
                <Cell ss:StyleID="header">
                    <Data ss:Type="String">Año :</Data>
                </Cell>
                <Cell ss:StyleID="cell" ss:MergeAcross="2">
                    <Data ss:Type="String">${context.year}</Data>
                </Cell>
            </Row>
            <Row>
                <Cell ss:StyleID="header">
                    <Data ss:Type="String">Mes :</Data>
                </Cell>
                <Cell ss:StyleID="cell" ss:MergeAcross="2">
                    <Data ss:Type="String">${context.month}</Data>
                </Cell>
            </Row>
            -->
            <Row>
            </Row>

            <!-- CABECERA -->
            <Row>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String"></Data>
                </Cell>
                <Cell>
                </Cell>

                <#list context.headers as header>
                    <Cell ss:StyleID="t1">
                        <Data ss:Type="String"></Data>
                    </Cell>
                    <Cell ss:StyleID="t1">
                        <Data ss:Type="String">${header.current.text}</Data>
                    </Cell>
                    <Cell ss:StyleID="t1">
                        <Data ss:Type="String"></Data>
                    </Cell>
                    <Cell ss:StyleID="t1">
                        <Data ss:Type="String">${header.last.text}</Data>
                    </Cell>
                    <Cell>
                    </Cell>
                </#list>

                <Cell ss:StyleID="t1">
                    <Data ss:Type="String"></Data>
                </Cell>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String">${context.summary.current.text}</Data>
                </Cell>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String"></Data>
                </Cell>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String">${context.summary.last.text}</Data>
                </Cell>
            </Row>

            <Row>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String">Concepto</Data>
                </Cell>
                <Cell>
                </Cell>

                <#list context.headers as header>
                    <Cell ss:StyleID="t1">
                        <Data ss:Type="String">Cantidad</Data>
                    </Cell>
                    <Cell ss:StyleID="t1">
                        <Data ss:Type="String">Costo</Data>
                    </Cell>
                    <Cell ss:StyleID="t1">
                        <Data ss:Type="String">Cantidad</Data>
                    </Cell>
                    <Cell ss:StyleID="t1">
                        <Data ss:Type="String">Costo</Data>
                    </Cell>
                    <Cell>
                    </Cell>
                </#list>

                <Cell ss:StyleID="t1">
                    <Data ss:Type="String">Cantidad</Data>
                </Cell>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String">Costo</Data>
                </Cell>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String">Cantidad</Data>
                </Cell>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String">Costo</Data>
                </Cell>
            </Row>

            <!-- CUERPO -->
            <#list context.centers as center>
                <Row>
                    <!-- CONCEPTO - BONIF DE VENTAS DEL MES -->
                    <Cell ss:StyleID="cell">
                        <Data ss:Type="String">${center.name}</Data>
                    </Cell>
                    <Cell>
                    </Cell>

                    <!-- TOTALES POR CONCEPTO Y PERIODO (ACTUAL VS ULTIMO) -->
                    <#list context.headers as header>
                        <#assign current=center.period[header.current.id] />
                        <#assign last=center.period[header.last.id] />
                        <Cell ss:StyleID="cell">
                            <Data ss:Type="Number">${current.cantidad}</Data>
                        </Cell>
                        <Cell ss:StyleID="cell-currency">
                            <Data ss:Type="Number">${current.costo}</Data>
                        </Cell>
                        <Cell ss:StyleID="cell">
                            <Data ss:Type="Number">${last.cantidad}</Data>
                        </Cell>
                        <Cell ss:StyleID="cell-currency">
                            <Data ss:Type="Number">${last.costo}</Data>
                        </Cell>
                        <Cell>
                        </Cell>
                    </#list>

                    <!-- TOTALES POR CONCEPTO Y AÑO (ACTUAL VS ULTIMO) -->
                    <#assign p_var=generateVariationPercent(center.current.costo,center.last.costo) />
                    <Cell ss:StyleID="cell">
                        <Data ss:Type="Number">${center.current.cantidad}</Data>
                    </Cell>
                    <Cell ss:StyleID="cell-currency">
                        <Data ss:Type="Number">${center.current.costo}</Data>
                    </Cell>
                    <Cell ss:StyleID="cell">
                        <Data ss:Type="Number">${center.last.cantidad}</Data>
                    </Cell>
                    <Cell ss:StyleID="cell-currency">
                        <Data ss:Type="Number">${center.last.costo}</Data>
                    </Cell>
                    <Cell ss:StyleID="t1-percent"
                        ss:Formula="=${(p_var?string.percent)?replace('%','')?replace(',','')?replace('.','')}/100">
                        <Data ss:Type="Number"></Data>
                    </Cell>
                </Row>
            </#list>

            <!-- TOTALES -->
            <Row>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String">Totales</Data>
                </Cell>
                <Cell>
                </Cell>

                <#list context.headers as header>
                    <#assign current=context.total[header.current.id] />
                    <#assign last=context.total[header.last.id] />
                    <Cell ss:StyleID="t1">
                        <Data ss:Type="Number">${current.cantidad}</Data>
                    </Cell>
                    <Cell ss:StyleID="t1-currency">
                        <Data ss:Type="Number">${current.costo}</Data>
                    </Cell>
                    <Cell ss:StyleID="t1">
                        <Data ss:Type="Number">${last.cantidad}</Data>
                    </Cell>
                    <Cell ss:StyleID="t1-currency">
                        <Data ss:Type="Number">${last.costo}</Data>
                    </Cell>
                    <Cell>
                    </Cell>
                </#list>

                <#assign p_var=generateVariationPercent(context.summary.current.costo,context.summary.last.costo) />
                <Cell ss:StyleID="t1">
                    <Data ss:Type="Number">${context.summary.current.cantidad}</Data>
                </Cell>
                <Cell ss:StyleID="t1-currency">
                    <Data ss:Type="Number">${context.summary.current.costo}</Data>
                </Cell>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="Number">${context.summary.last.cantidad}</Data>
                </Cell>
                <Cell ss:StyleID="t1-currency">
                    <Data ss:Type="Number">${context.summary.last.costo}</Data>
                </Cell>
                <Cell ss:StyleID="t1-percent"
                    ss:Formula="=${(p_var?string.percent)?replace('%','')?replace(',','')?replace('.','')}/100">
                    <Data ss:Type="Number"></Data>
                </Cell>
            </Row>
            <Row>
            </Row>

            <!-- PORCENTAJES -->
            <Row>
                <Cell>
                </Cell>
                <Cell>
                </Cell>

                <#list context.headers as header>
                    <#assign current=context.percentTotal[header.current.id] />
                    <#assign last=context.percentTotal[header.last.id] />
                    <Cell ss:StyleID="t1">
                        <Data ss:Type="String">VAR. ANUAL</Data>
                    </Cell>
                    <Cell ss:StyleID="t1-percent">
                        <Data ss:Type="Number">${current.variacion_anual}</Data>
                    </Cell>
                    <Cell ss:StyleID="t1">
                        <Data ss:Type="String"></Data>
                    </Cell>
                    <Cell ss:StyleID="t1">
                        <Data ss:Type="String"></Data>
                    </Cell>
                    <Cell>
                    </Cell>
                </#list>

                <Cell ss:StyleID="t1">
                    <Data ss:Type="String">VAR. ANUAL ACUM.</Data>
                </Cell>
                <Cell ss:StyleID="t1-percent">
                    <Data ss:Type="Number">${context.percentSummary.current.variacion_anual_acumulada}</Data>
                </Cell>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String"></Data>
                </Cell>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String"></Data>
                </Cell>
            </Row>
            <Row>
                <Cell>
                </Cell>
                <Cell>
                </Cell>

                <#list context.headers as header>
                    <#assign current=context.percentTotal[header.current.id] />
                    <#assign last=context.percentTotal[header.last.id] />
                    <Cell ss:StyleID="t1">
                        <Data ss:Type="String">VAR. MENSUAL</Data>
                    </Cell>
                    <Cell ss:StyleID="t1-percent">
                        <Data ss:Type="Number">${current.variacion_mensual}</Data>
                    </Cell>
                    <Cell ss:StyleID="t1">
                        <Data ss:Type="String"></Data>
                    </Cell>
                    <Cell ss:StyleID="t1">
                        <Data ss:Type="String"></Data>
                    </Cell>
                    <Cell>
                    </Cell>
                </#list>

                <Cell ss:StyleID="t1">
                    <Data ss:Type="String"></Data>
                </Cell>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String"></Data>
                </Cell>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String"></Data>
                </Cell>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String"></Data>
                </Cell>
            </Row>

        </Table>
    </Worksheet>
</Workbook>