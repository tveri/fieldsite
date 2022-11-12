import axios from "axios";

export const domain = 'https://digital-order.ru'

export class PostService {
    static async login(password, login, setUserData) {
        const response = await axios.post(domain + '/api/login/', {
            data: {
                password,
                login
            }
        })
        setUserData(response.data)
    }

    static async sendAdminpanelAction({action, userData}) {
        const response = await axios.post(domain + '/api/sendadminpanelaction/', {
            ...userData,
            data: {
                action
            }
        })
    }
    
    static async sendTableChanges({changes, date, tableName, setTableData, userData}) {
        const response = await axios.post(domain + '/api/sendtablechanges/', {
            data: {
                tableName,
                changes
            },
            date,
            ...userData
        })
        console.log(response.data);
        !!response.data && setTableData(response.data)
    }
    
    static async getGraphics(func, setWorkData, field, userData) {
        const response = await axios.post(domain + '/api/getgraphics/', {
            ...userData,
            data: {
                field: field
            }
        })
        func(response.data)
        setWorkData(response.data)
    }

    static async getTable(func, setFirst, field, userData) {
        const response = await axios.post(domain + '/api/gettable/', {
            ...userData,
            data: {
                field: field
            }
        })
        console.log('getTable ' + field)
        const data = response.data
        setFirst(data)
        func(data)
    }

    static async getDashboardTable(func, setHeader, setDate, userData) {
        const response = await axios.post(domain + '/api/getdashboardtable/', {
            ...userData
        })
        console.log('getDashboardTable')
        console.log(response.data);
        func(response.data)
        setHeader(response.data.header)
        setDate(response.data.date)
    }
    
    static async getMapData(setMapData, setIsDataLoaded, userData) {
        const response = await axios.post(domain + '/api/getmapdata/', {
            ...userData
        })
        console.log('getMapData')
        console.log(response.data);
        setMapData(response.data)
        setIsDataLoaded(true)
    }

    static async getMapFields(setMapFields, setIsDataLoaded, userData) {
        const response = await axios.post(domain + '/api/getmapfields/', {
            ...userData
        })
        console.log('getMapFields')
        console.log(response.data);
        setMapFields(response.data)
        setIsDataLoaded(true)
    }

    static async getSettingsTable(setDataGlobal, setFirstDataGlobal, setData, setFirstData) {
        const response = await axios.get(domain + '/api/getsettingstable/')
        console.log('getSettingsTable')
        console.log(response.data);
        setDataGlobal(response.data[0])
        setFirstDataGlobal(response.data[0])
        setData(response.data[1])
        setFirstData(response.data[1])
    }

    static async getMapParams(setMapSettings, setObjects) {
        const response = await axios.get(domain + '/api/getmapparams')
        console.log('getMapParams')
        console.log(response.data);
        setMapSettings(response.data.settings)
        setObjects(response.data.objects)
    }

    static async getGlobalData(setGlobalData, setGlobalData1, setGlobalData2, setSelections, field, userData) {
        const response = await axios.post(domain + '/api/getglobaldata/', {
            ...userData,
            data: {
                field: field
            }
        })
        console.log('getGlobalData')
        console.log(response.data);
        setGlobalData(response.data.table)
        setGlobalData1([[response.data.table[0][0]]])
        setGlobalData2([[response.data.table[0][1]],[response.data.table[0][2]],[response.data.table[0][3]],[response.data.table[0][4]],[response.data.table[0][5]],])
        setSelections(response.data.selection)
    }

    static async sendGlobalDataChange(changes, field, userData) {
        console.log(changes);
        const response = await axios.post(domain + '/api/sendglobaldatachange/', {
            ...userData,
            data: {
                changes: {
                    ...changes
                },
                field: field
            }
        }) 
    }

    static async sendDashboardTableChanges(data, setData) {
        console.log(data)
        const response = await axios.post(domain + '/api/senddashboardtablechanges/', data)
        !!response.data.tables && setData(response.data.tables)
    }

    static async sendSettingsTableChanges(data) {
        console.log(data)
        const response = await axios.post(domain + '/api/sendsettigstablechanges/', data)
    }

    static async sendTableChange(func, change, field, tableName, userData) {
        console.log(change)
        console.log(field);
        const response = await axios.post(domain + '/api/settablechange', {
            ...userData,
            data: {
                ...change,
                tableName,
                field: field
            }
        })
        if (!!response.data) {
            console.log(response.data[change.row])
            func(response.data)
        }
    }
    
    static async sendFilledTemplate(data, func, setFirstData, setVisible) {
        console.log(data)
        const response = await axios.post(domain + '/api/sendtemplate/', data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        func(response.data)
        setFirstData(response.data)
        setVisible(false)
    }
}