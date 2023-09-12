export const doc = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Cenicero.com.ar',
            version: '1.0.0',
            description: 'Ecommerce realizado con: Node, Express, MongoDB y React JS'
        },
        servers: [
            { url: 'https://cenicero-backend-khts-dev.fl0.io' }
        ]
    },
    apis: ['./src/docs/*.yml']
}