ServiceConfiguration.configurations.update(
    {"service": "spotify"},
    {
        $set: {
            "clientId": "5db482c4aec94cee98b76ad6d78e0661",
            "secret": "64852922d828466fb885dd712d5cb371",
        }
    },
    {upsert: true}
);