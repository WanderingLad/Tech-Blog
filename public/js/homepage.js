const list = $('#list');

fetch('api/tech', {
    method: 'GET'
})
    .then(res => {
        res.json()
            .then(data => {
                for (let i in data) {
                    fetch('api/users', {
                        method: 'GET'
                    })
                        .then(res => {
                            res.json()
                                .then(dat => {
                                    for (let j in dat) {
                                        ({ title, description, user_id } = data[i]);
                                        ({ id, name } = dat[j]);
                                        if (id === user_id) {
                                            let li = $("<li>");

                                            li.append(`<h2>Title: ${title}</p><p>Descriptions: ${description}</p><p>User: ${name}</p>`);

                                            $('#list').append(li);
                                        }
                                    };
                                })
                        })
                };

            })
    })