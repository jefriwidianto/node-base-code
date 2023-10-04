exports.ping = async(req,res) => {
    res.status(200).send({ message: 'OK', env_setting: process.env.NODE_ENV })
}