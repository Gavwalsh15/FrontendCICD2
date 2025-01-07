async function handler(req, res) {
    const response = await fetch(`http://localhost:8080/api/customer/get-orders/${req.body.username}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await response.json();
    res.json(data)
}

export default handler;