export const secret = process.env.SECRET || 'some-secret-shit-goes-here'
export const secretToken = process.env.SECRETOKEN || 'some-secret-refresh-token-shit'
export const mongoUrl = 'mongodb://adrianhorizon:luna@market-shard-00-00-ptfko.mongodb.net:27017,market-shard-00-01-ptfko.mongodb.net:27017,market-shard-00-02-ptfko.mongodb.net:27017/test?ssl=true&replicaSet=market-shard-0&authSource=admin&retryWrites=true'
export const port = process.env.PORT || 3000
