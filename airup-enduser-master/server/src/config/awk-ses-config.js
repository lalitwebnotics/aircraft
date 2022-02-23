module.exports = {
    'aws': {
        'key': process.env.SES_USERNAME,
        'secret': process.env.SES_PASSWORD,
        'ses': {
            'from': {
                // replace with actual email address
                'default': 'newletter@airplaneupgrade.com',
            },
            // e.g. us-west-2
            'region': 'eu-central-1'
        }
    }
};
