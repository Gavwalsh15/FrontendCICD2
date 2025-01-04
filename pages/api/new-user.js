async function handler(req, res) { // can be called anything you like
    const response = await fetch('http://localhost:8080/api/customer/create', {
        method: 'POST',
        body: JSON.stringify(req.body),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    console.log(data);
    res.json(data)
}

export default handler;